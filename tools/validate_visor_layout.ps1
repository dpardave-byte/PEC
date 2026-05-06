param(
  [string]$BrowserPath = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
  [string]$OutputDir = ''
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
if(-not $OutputDir){
  $OutputDir = Join-Path $PSScriptRoot 'validation-artifacts'
}

$targets = @(
  [PSCustomObject]@{
    Name = 'local'
    Path = Join-Path $repoRoot 'visor_seguimiento_pec.html'
  },
  [PSCustomObject]@{
    Name = 'apps_script'
    Path = Join-Path $repoRoot 'apps_script\Visor.html'
  }
)

if(-not (Test-Path -LiteralPath $BrowserPath)){
  throw "No se encontro el navegador en: $BrowserPath"
}

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

function Invoke-HeadlessCapture {
  param(
    [Parameter(Mandatory = $true)][string]$TargetPath,
    [Parameter(Mandatory = $true)][string]$DomFile,
    [Parameter(Mandatory = $true)][string]$ScreenshotFile,
    [Parameter(Mandatory = $true)][string]$BrowserPath
  )

  $resolvedPath = (Resolve-Path -LiteralPath $TargetPath).Path
  $uri = [System.Uri]::new($resolvedPath).AbsoluteUri
  $profileDir = Join-Path $env:TEMP ('pec-edge-profile-' + [System.Guid]::NewGuid().ToString('N'))
  New-Item -ItemType Directory -Force -Path $profileDir | Out-Null
  $commonArgs = @(
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    '--no-sandbox',
    '--disable-crashpad',
    '--disable-breakpad',
    '--window-size=1600,7000',
    '--virtual-time-budget=12000',
    '--no-first-run',
    '--no-default-browser-check',
    "--user-data-dir=$profileDir"
  )

  $domStdOut = [System.IO.Path]::GetTempFileName()
  $domStdErr = [System.IO.Path]::GetTempFileName()
  $shotStdOut = [System.IO.Path]::GetTempFileName()
  $shotStdErr = [System.IO.Path]::GetTempFileName()

  try{
    $domProcess = Start-Process -FilePath $BrowserPath -ArgumentList ($commonArgs + @('--dump-dom', $uri)) -NoNewWindow -Wait -PassThru -RedirectStandardOutput $domStdOut -RedirectStandardError $domStdErr
    $domText = (Get-Content -LiteralPath $domStdOut -Raw) + (Get-Content -LiteralPath $domStdErr -Raw)
    if($domProcess.ExitCode -ne 0){
      throw "No se pudo renderizar $TargetPath.`n$domText"
    }

    Set-Content -LiteralPath $DomFile -Value $domText -Encoding UTF8

    $shotProcess = Start-Process -FilePath $BrowserPath -ArgumentList ($commonArgs + @("--screenshot=$ScreenshotFile", $uri)) -NoNewWindow -Wait -PassThru -RedirectStandardOutput $shotStdOut -RedirectStandardError $shotStdErr
    $shotText = (Get-Content -LiteralPath $shotStdOut -Raw) + (Get-Content -LiteralPath $shotStdErr -Raw)
    if($shotProcess.ExitCode -ne 0){
      throw "No se pudo capturar screenshot de $TargetPath.`n$shotText"
    }
  } finally {
    @($domStdOut,$domStdErr,$shotStdOut,$shotStdErr) | ForEach-Object {
      if(Test-Path -LiteralPath $_){
        Remove-Item -LiteralPath $_ -Force
      }
    }
    if(Test-Path -LiteralPath $profileDir){
      Remove-Item -LiteralPath $profileDir -Recurse -Force
    }
  }

  return $domText
}

function ConvertTo-HtmlDocument {
  param([Parameter(Mandatory = $true)][string]$Html)

  $document = New-Object -ComObject 'HTMLFile'
  $document.write($Html)
  $document.close()
  return $document
}

function Get-OptionCount {
  param($Element)
  if(-not $Element){ return 0 }
  try{
    return [int]$Element.options.length
  }catch{
    return 0
  }
}

function Get-OptionCountFromMarkup {
  param(
    [Parameter(Mandatory = $true)][string]$Html,
    [Parameter(Mandatory = $true)][string]$SelectId
  )

  $match = [regex]::Match($Html, '(?is)<select[^>]*id="' + [regex]::Escape($SelectId) + '"[^>]*>(.*?)</select>')
  if(-not $match.Success){ return 0 }
  return ([regex]::Matches($match.Groups[1].Value, '(?is)<option\b')).Count
}

function Get-Segment {
  param(
    [Parameter(Mandatory = $true)][string]$Text,
    [Parameter(Mandatory = $true)][string]$StartMarker,
    [string]$EndMarker = ''
  )

  $start = $Text.IndexOf($StartMarker)
  if($start -lt 0){ return '' }
  if(-not $EndMarker){
    return $Text.Substring($start)
  }
  $end = $Text.IndexOf($EndMarker, $start)
  if($end -lt 0){
    return $Text.Substring($start)
  }
  return $Text.Substring($start, $end - $start)
}

function New-QaHarnessFile {
  param(
    [Parameter(Mandatory = $true)][string]$TargetPath,
    [Parameter(Mandatory = $true)][string]$HarnessPath
  )

  $html = Get-Content -LiteralPath $TargetPath -Raw
  $injectedScript = @"
<script>
window.addEventListener('load', function(){
  try{
    var sampleAudit = [
      {
        at: '2026-05-05T13:00:00.000Z',
        actor: 'alice@dgpccs.gob.pe',
        actorVerified: true,
        actorSource: 'session_email',
        action: 'guardar_ficha',
        detail: 'Actualizacion de nota operativa',
        summary: {
          total: 2,
          bySection: { notes: 2 },
          touchedRecords: ['2.1.1']
        }
      },
      {
        at: '2026-05-05T15:30:00.000Z',
        actor: 'bob@dgpccs.gob.pe',
        actorVerified: false,
        actorSource: 'client_query',
        action: 'agregar_subactividad',
        detail: 'Registro nuevo para seguimiento operativo',
        summary: {
          total: 3,
          bySection: { customRecords: 1, payload: 2 },
          touchedRecords: ['3.6.9']
        }
      },
      {
        at: '2026-05-05T18:10:00.000Z',
        actor: 'alice@dgpccs.gob.pe',
        actorVerified: true,
        actorSource: 'session_email',
        action: 'editar_portada',
        detail: 'Ajuste de portada ejecutiva',
        summary: {
          total: 1,
          bySection: { hero: 1 },
          touchedRecords: []
        }
      },
      {
        at: '2026-05-04T18:10:00.000Z',
        actor: 'legacy@dgpccs.gob.pe',
        actorVerified: false,
        actorSource: 'legacy_actor',
        action: 'guardar_ficha',
        detail: 'Movimiento historico fuera del dia validado',
        summary: {
          total: 1,
          bySection: { notes: 1 },
          touchedRecords: ['1']
        }
      }
    ];

    function mark(name, value){
      document.body.setAttribute('data-qa-' + name, value ? '1' : '0');
    }

    function markText(name, value){
      document.body.setAttribute('data-qa-' + name, String(value == null ? '' : value));
    }

    function hasOption(selectId, regex){
      var select = document.getElementById(selectId);
      if(!select || !select.options) return false;
      return Array.prototype.some.call(select.options, function(option){
        return regex.test(String(option.textContent || option.innerText || option.value || ''));
      });
    }

    if(window.localStorage){
      try{
        localStorage.setItem('pec_tracking_audit_v1', JSON.stringify(sampleAudit));
      }catch(error){}
    }

    if(typeof appState !== 'undefined'){
      appState.adminEnabled = true;
      appState.audit = sampleAudit;
      appState.serverInfo = {
        mode: 'apps_script',
        actor: 'darwin@dgpccs.gob.pe',
        actorVerified: true,
        actorSource: 'session_email',
        admin: true,
        pollIntervalSeconds: 30,
        savedAt: '2026-05-05T18:10:00.000Z',
        savedBy: 'darwin@dgpccs.gob.pe',
        syncState: 'synced',
        syncMessage: 'QA sync ok'
      };
    }

    if(typeof setSelectedAuditReportDate === 'function'){
      setSelectedAuditReportDate('2026-05-05');
    }else{
      var reportField = document.getElementById('adminAuditDate');
      if(reportField) reportField.value = '2026-05-05';
    }

    if(typeof buildDailyAuditReportFromItems === 'function' && typeof renderAdminDailyAuditReport === 'function'){
      var report = buildDailyAuditReportFromItems(sampleAudit, '2026-05-05', {mode:'local', timezone:'qa'});
      if(typeof appState !== 'undefined'){
        appState.adminDailyReport = report;
      }
      renderAdminDailyAuditReport(report);
    }
    if(typeof renderDailyAuditDeliveryState === 'function' && typeof appState !== 'undefined'){
      appState.dailyReportDelivery = {
        ok: true,
        mode: 'PREVIEW_ONLY',
        recipients: ['darwin@dgpccs.gob.pe'],
        configuredRecipients: ['darwin@dgpccs.gob.pe'],
        adminRecipients: ['darwin@dgpccs.gob.pe'],
        usingAdminRecipients: false,
        effectiveRecipients: ['darwin@dgpccs.gob.pe'],
        cc: ['control@dgpccs.gob.pe'],
        testRecipients: [],
        realSendConfirmed: false,
        sendHour: 18,
        triggerCount: 0,
        triggerEnabled: false,
        message: 'QA delivery ready'
      };
      renderDailyAuditDeliveryState(appState.dailyReportDelivery);
    }
    if(typeof renderAdminAudit === 'function'){
      renderAdminAudit();
    }

    var adminModal = document.getElementById('adminModal');
    if(adminModal) adminModal.classList.add('open');

    var reportHost = document.getElementById('adminDailyAuditSummary');
    var reportMeta = document.getElementById('adminDailyAuditMeta');
    var reportText = reportHost ? String(reportHost.innerText || '') : '';
    var reportMetaText = reportMeta ? String(reportMeta.textContent || '') : '';
    var deliveryMeta = document.getElementById('adminDailyDeliveryMeta');
    var deliverySummary = document.getElementById('adminDailyDeliverySummary');
    var adminActor = document.getElementById('adminActorValue');

    mark('daily_report_present', !!reportHost);
    mark('daily_report_has_two_actors', /alice@dgpccs\.gob\.pe/i.test(reportText) && /bob@dgpccs\.gob\.pe/i.test(reportText));
    mark('daily_report_filters_selected_day', /3 movimiento\(s\)/i.test(reportMetaText));
    mark('daily_report_export_ready', typeof exportDailyAuditReport === 'function' && typeof appState !== 'undefined' && !!(appState.adminDailyReport && /Reporte diario de cambios/i.test(String(appState.adminDailyReport.plainText || ''))) && !document.getElementById('exportDailyAuditBtn').disabled);
    mark('daily_report_identity_labels_visible', /Correo verificado por Apps Script/i.test(reportText) && /Actor declarado por URL/i.test(reportText));
    mark('daily_delivery_panel_present', !!deliveryMeta && !!deliverySummary);
    mark('daily_delivery_controls_present', !!document.getElementById('saveDailyDeliveryConfigBtn') && !!document.getElementById('sendDailyAuditMailBtn') && !!document.getElementById('createDailyAuditTriggerBtn') && !!document.getElementById('deleteDailyAuditTriggerBtn'));
    mark('daily_delivery_form_present', !!document.getElementById('dailyDeliveryModeSelect') && !!document.getElementById('dailyDeliveryToInput') && !!document.getElementById('dailyDeliveryHourInput') && !!document.getElementById('dailyDeliveryConfirmReal'));
    mark('daily_delivery_status_rendered', /QA delivery ready/i.test(String(deliverySummary && deliverySummary.textContent || '')) && /Hora diaria: 18:00/i.test(String(deliveryMeta && deliveryMeta.textContent || '')));
    mark('shared_actor_identity_visible', /darwin@dgpccs\.gob\.pe/i.test(String(adminActor && adminActor.textContent || '')) && /Correo verificado/i.test(String(adminActor && adminActor.textContent || '')));
    mark('dgppcs_available_as_responsible', hasOption('responsibleFilter', /DGPPCS/i));

    if(typeof openPendingModal === 'function'){
      openPendingModal();
      var pendingModal = document.getElementById('pendingModal');
      var pendingCard = pendingModal ? pendingModal.querySelector('.alert-item[data-open-context][data-open]') : null;
      if(pendingCard) pendingCard.click();
      mark('pending_modal_opens_drawer', !!document.getElementById('drawer') && document.getElementById('drawer').classList.contains('open'));
      mark('pending_modal_closes_after_open', !pendingModal || !pendingModal.classList.contains('open'));
      mark('pending_modal_loads_same_editor', !!document.getElementById('detailGrid') && /Seguimiento DGPPCS|Responsable/i.test(String(document.getElementById('detailGrid').innerText || '')));
      if(typeof closeDrawer === 'function') closeDrawer();
      openPendingModal();
      pendingModal = document.getElementById('pendingModal');
      var directOpenTarget = pendingModal ? pendingModal.querySelector('.alert-item[data-open]') : null;
      if(directOpenTarget && typeof openDrawer === 'function') openDrawer(directOpenTarget.getAttribute('data-open'));
      mark('pending_modal_closes_on_direct_open', !pendingModal || !pendingModal.classList.contains('open'));
      if(typeof closeDrawer === 'function') closeDrawer();
    }else{
      mark('pending_modal_opens_drawer', false);
      mark('pending_modal_closes_after_open', false);
      mark('pending_modal_loads_same_editor', false);
      mark('pending_modal_closes_on_direct_open', false);
    }

    if(typeof openMonitoringModal === 'function'){
      openMonitoringModal();
      var monitoringModal = document.getElementById('monitoringModal');
      var monitoringCard = monitoringModal ? monitoringModal.querySelector('.alert-item[data-open-context][data-open]') : null;
      if(monitoringCard) monitoringCard.click();
      mark('monitoring_modal_opens_drawer', !!document.getElementById('drawer') && document.getElementById('drawer').classList.contains('open'));
      mark('monitoring_modal_closes_after_open', !monitoringModal || !monitoringModal.classList.contains('open'));
      if(typeof closeDrawer === 'function') closeDrawer();
    }else{
      mark('monitoring_modal_opens_drawer', false);
      mark('monitoring_modal_closes_after_open', false);
    }

    var rootRows = Array.prototype.slice.call(document.querySelectorAll('#ganttList .timeline-row.level-1'));
    var block4Root = rootRows.filter(function(row){
      var rowText = String(row.innerText || row.textContent || '').trim();
      var kind = row.querySelector('.timeline-kind');
      var kindText = kind ? String(kind.innerText || kind.textContent || '').trim() : '';
      return /^4\b/.test(kindText) || /^4\b/.test(rowText);
    })[0];
    var rootsAligned = rootRows.length >= 4 && rootRows.every(function(row){
      var cell = row.querySelector('.edt-cell');
      return !cell || /padding-left:\s*0px/i.test(String(cell.getAttribute('style') || ''));
    });
    mark('block4_root_visible_in_gantt', !!block4Root);
    mark('root_blocks_left_aligned', rootsAligned && !!block4Root);

    if(document.getElementById('searchInput') && typeof applyFilters === 'function' && typeof findSearchTargetRecord === 'function' && typeof appState !== 'undefined'){
      document.getElementById('searchInput').value = 'bloque 4';
      applyFilters();
      var blockTarget = findSearchTargetRecord('bloque 4');
      mark('search_block_reveals_root4', !!(blockTarget && Array.isArray(appState.filtered) && appState.filtered.some(function(record){ return record.id === blockTarget.id; })));

      document.getElementById('searchInput').value = 'fase 2.1';
      applyFilters();
      var phaseTarget = findSearchTargetRecord('fase 2.1');
      mark('search_phase_reveals_record', !!(phaseTarget && Array.isArray(appState.filtered) && appState.filtered.some(function(record){ return record.id === phaseTarget.id; })));

      document.getElementById('searchInput').value = 'caso 3.6.9';
      applyFilters();
      var caseTarget = findSearchTargetRecord('caso 3.6.9');
      mark('search_case_reveals_record', !!(caseTarget && Array.isArray(appState.filtered) && appState.filtered.some(function(record){ return record.id === caseTarget.id; })));

      document.getElementById('searchInput').value = '';
      applyFilters();
    }else{
      mark('search_block_reveals_root4', false);
      mark('search_phase_reveals_record', false);
      mark('search_case_reveals_record', false);
    }
  }catch(error){
    document.body.setAttribute('data-qa-error', String(error && error.message || error));
  }
});
</script>
"@

  $bodyCloseIndex = $html.LastIndexOf('</body>')
  if($bodyCloseIndex -ge 0){
    $html = $html.Insert($bodyCloseIndex, "`r`n" + $injectedScript + "`r`n")
  } else {
    $html += "`r`n" + $injectedScript
  }

  Set-Content -LiteralPath $HarnessPath -Value $html -Encoding UTF8
}

function Get-QAFlag {
  param(
    [Parameter(Mandatory = $true)][string]$Html,
    [Parameter(Mandatory = $true)][string]$Name
  )

  return [bool]($Html -match ('data-qa-' + [regex]::Escape($Name) + '="1"'))
}

function Get-QAValue {
  param(
    [Parameter(Mandatory = $true)][string]$Html,
    [Parameter(Mandatory = $true)][string]$Name
  )

  $match = [regex]::Match($Html, 'data-qa-' + [regex]::Escape($Name) + '="([^"]*)"')
  if($match.Success){
    return $match.Groups[1].Value
  }
  return ''
}

$results = foreach($target in $targets){
  $domPath = Join-Path $OutputDir ($target.Name + '.rendered.html')
  $shotPath = Join-Path $OutputDir ($target.Name + '.png')
  $qaHarnessPath = Join-Path $OutputDir ($target.Name + '.qa.html')
  $qaDomPath = Join-Path $OutputDir ($target.Name + '.qa.rendered.html')
  $qaShotPath = Join-Path $OutputDir ($target.Name + '.qa.png')
  $rawDom = Invoke-HeadlessCapture -TargetPath $target.Path -DomFile $domPath -ScreenshotFile $shotPath -BrowserPath $BrowserPath
  New-QaHarnessFile -TargetPath $target.Path -HarnessPath $qaHarnessPath
  $qaDom = Invoke-HeadlessCapture -TargetPath $qaHarnessPath -DomFile $qaDomPath -ScreenshotFile $qaShotPath -BrowserPath $BrowserPath
  $pageMarkup = if($rawDom -match '(?s)<body[^>]*>(.*?)(?:<script\b)'){ $Matches[1] } else { $rawDom }
  $timelineIndex = $pageMarkup.IndexOf('id="timelinePanel"')
  $reportIndex = $pageMarkup.IndexOf('id="reportAnalyticsPanel"')
  $operationsIndex = $pageMarkup.IndexOf('id="operationsPanel"')
  $tableIndex = $pageMarkup.IndexOf('id="tablePanel"')
  $ganttSegment = Get-Segment -Text $pageMarkup -StartMarker 'id="ganttList"' -EndMarker 'id="reportAnalyticsPanel"'
  $betweenTimelineAndReport = if($timelineIndex -ge 0 -and $reportIndex -gt $timelineIndex){ $pageMarkup.Substring($timelineIndex, $reportIndex - $timelineIndex) } else { '' }
  $betweenReportAndOperations = if($reportIndex -ge 0 -and $operationsIndex -gt $reportIndex){ $pageMarkup.Substring($reportIndex, $operationsIndex - $reportIndex) } else { '' }
  $reportSegment = Get-Segment -Text $pageMarkup -StartMarker 'id="reportPreview"' -EndMarker 'id="analyticsModal"'

  $ganttRows = ([regex]::Matches($ganttSegment, 'class="timeline-row(?:\s|")')).Count
  $reportText = [regex]::Replace($reportSegment, '<[^>]+>', ' ')
  $responsibleOptions = Get-OptionCountFromMarkup -Html $pageMarkup -SelectId 'responsibleFilter'
  $ownerOptions = Get-OptionCountFromMarkup -Html $pageMarkup -SelectId 'ownerFilter'
  $operationsCollapsed = [bool](
    ($pageMarkup -match '<section[^>]*id="operationsPanel"[^>]*class="[^"]*\bcollapsed\b') -or
    ($pageMarkup -match '<section[^>]*class="[^"]*\bcollapsed\b[^"]*"[^>]*id="operationsPanel"')
  )
  $tablePanelHidden = [bool]($pageMarkup -match 'id="tablePanel"[^>]*\shidden(?:=|>)')
  $notesUiPresent = [bool]($pageMarkup -match 'id="localNote"' -and $pageMarkup -match 'id="saveCaseNoteBtn"')

  [PSCustomObject]@{
    target = $target.Name
    file = $target.Path
    screenshot = $shotPath
    renderedDom = $domPath
    qaRenderedDom = $qaDomPath
    qaScreenshot = $qaShotPath
    checks = [PSCustomObject]@{
      gantt_before_report_analytics = [bool]($timelineIndex -ge 0 -and $reportIndex -gt $timelineIndex -and $betweenTimelineAndReport -notmatch 'id="tablePanel"|id="operationsPanel"')
      report_analytics_before_complementary = [bool]($reportIndex -ge 0 -and $operationsIndex -gt $reportIndex -and ($tableIndex -lt 0 -or $operationsIndex -lt $tableIndex) -and $betweenReportAndOperations -notmatch 'id="tablePanel"')
      complementary_collapsed_by_default = $operationsCollapsed
      data_rows_loaded = [bool]($ganttRows -gt 0)
      responsible_catalog_loaded = [bool]($responsibleOptions -gt 1)
      owner_catalog_loaded = [bool]($ownerOptions -gt 1)
      dgppcs_visible = [bool]($pageMarkup -match 'DGPPCS')
      dgppcs_available_as_responsible = Get-QAFlag -Html $qaDom -Name 'dgppcs_available_as_responsible'
      notes_ui_present = $notesUiPresent
      block_4_present_in_report = [bool]($reportSegment -match '4\s*-\s*Inicio de Efectividad del Pr')
      block_4_root_visible_in_gantt = Get-QAFlag -Html $qaDom -Name 'block4_root_visible_in_gantt'
      root_blocks_left_aligned = Get-QAFlag -Html $qaDom -Name 'root_blocks_left_aligned'
      search_block_reveals_root4 = Get-QAFlag -Html $qaDom -Name 'search_block_reveals_root4'
      search_phase_reveals_record = Get-QAFlag -Html $qaDom -Name 'search_phase_reveals_record'
      search_case_reveals_record = Get-QAFlag -Html $qaDom -Name 'search_case_reveals_record'
      pending_modal_opens_drawer = Get-QAFlag -Html $qaDom -Name 'pending_modal_opens_drawer'
      pending_modal_closes_after_open = Get-QAFlag -Html $qaDom -Name 'pending_modal_closes_after_open'
      pending_modal_loads_same_editor = Get-QAFlag -Html $qaDom -Name 'pending_modal_loads_same_editor'
      pending_modal_closes_on_direct_open = Get-QAFlag -Html $qaDom -Name 'pending_modal_closes_on_direct_open'
      monitoring_modal_opens_drawer = Get-QAFlag -Html $qaDom -Name 'monitoring_modal_opens_drawer'
      monitoring_modal_closes_after_open = Get-QAFlag -Html $qaDom -Name 'monitoring_modal_closes_after_open'
      daily_report_present = Get-QAFlag -Html $qaDom -Name 'daily_report_present'
      daily_report_has_two_actors = Get-QAFlag -Html $qaDom -Name 'daily_report_has_two_actors'
      daily_report_filters_selected_day = Get-QAFlag -Html $qaDom -Name 'daily_report_filters_selected_day'
      daily_report_export_ready = Get-QAFlag -Html $qaDom -Name 'daily_report_export_ready'
      daily_report_identity_labels_visible = Get-QAFlag -Html $qaDom -Name 'daily_report_identity_labels_visible'
      daily_delivery_panel_present = Get-QAFlag -Html $qaDom -Name 'daily_delivery_panel_present'
      daily_delivery_controls_present = Get-QAFlag -Html $qaDom -Name 'daily_delivery_controls_present'
      daily_delivery_form_present = Get-QAFlag -Html $qaDom -Name 'daily_delivery_form_present'
      daily_delivery_status_rendered = Get-QAFlag -Html $qaDom -Name 'daily_delivery_status_rendered'
      shared_actor_identity_visible = Get-QAFlag -Html $qaDom -Name 'shared_actor_identity_visible'
    }
    metrics = [PSCustomObject]@{
      gantt_rows = $ganttRows
      responsible_options = $responsibleOptions
      owner_options = $ownerOptions
      report_text_length = $reportText.Length
      timeline_next_id = if($betweenTimelineAndReport -match 'id="reportAnalyticsPanel"'){ 'reportAnalyticsPanel' } else { '' }
      report_next_id = if($betweenReportAndOperations -match 'id="operationsPanel"'){ 'operationsPanel' } else { '' }
      table_panel_hidden = $tablePanelHidden
      qa_error = Get-QAValue -Html $qaDom -Name 'error'
    }
  }
}

$summary = [PSCustomObject]@{
  generatedAt = (Get-Date).ToString('s')
  browser = $BrowserPath
  outputDir = $OutputDir
  results = $results
}

$summaryPath = Join-Path $OutputDir 'summary.json'
$summary | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $summaryPath -Encoding UTF8
$summary | ConvertTo-Json -Depth 8
