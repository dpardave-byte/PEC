const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

function loadPlaywright() {
  const candidates = [
    'playwright',
    process.env.CODEX_NODE_MODULES ? path.join(process.env.CODEX_NODE_MODULES, 'playwright') : '',
    process.env.NODE_PATH ? path.join(process.env.NODE_PATH, 'playwright') : ''
  ].filter(Boolean);
  for (const candidate of candidates) {
    try {
      return require(candidate);
    } catch (error) {}
  }
  throw new Error('No se pudo cargar playwright desde el runtime disponible.');
}

const { chromium } = loadPlaywright();

const repoRoot = path.resolve(__dirname, '..');
const outputDir = path.join(__dirname, 'validation-artifacts');
const targets = [
  { name: 'local', file: path.join(repoRoot, 'visor_seguimiento_pec.html') },
  { name: 'apps_script', file: path.join(repoRoot, 'apps_script', 'Visor.html') }
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function safeWrite(file, content) {
  fs.writeFileSync(file, content, 'utf8');
}

function resolveChromiumExecutable() {
  const preferred = typeof chromium.executablePath === 'function' ? chromium.executablePath() : '';
  if (preferred && fs.existsSync(preferred)) return preferred;
  const fallbacks = [
    path.join(process.env.LOCALAPPDATA || '', 'ms-playwright', 'chromium-1217', 'chrome-win64', 'chrome.exe'),
    path.join(process.env['ProgramFiles(x86)'] || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    path.join(process.env.ProgramFiles || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    path.join(process.env.ProgramFiles || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env['ProgramFiles(x86)'] || '', 'Google', 'Chrome', 'Application', 'chrome.exe')
  ].filter(Boolean);
  return fallbacks.find(candidate => fs.existsSync(candidate)) || '';
}

async function collectChecks(page) {
  return page.evaluate(async () => {
    const sampleAudit = [
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

    const out = { checks: {}, metrics: {} };
    const setCheck = (name, value) => { out.checks[name] = Boolean(value); };
    const textOf = (node) => String(node && (node.innerText || node.textContent) || '').trim();
    const hasOption = (selectId, regex) => {
      const select = document.getElementById(selectId);
      if (!select || !select.options) return false;
      return Array.from(select.options).some(option => regex.test(String(option.textContent || option.innerText || option.value || '')));
    };

    const timelinePanel = document.getElementById('timelinePanel');
    const reportPanel = document.getElementById('reportAnalyticsPanel');
    const operationsPanel = document.getElementById('operationsPanel');
    const tablePanel = document.getElementById('tablePanel');
    const ganttRows = Array.from(document.querySelectorAll('#ganttList .timeline-row'));

    setCheck('gantt_before_report_analytics', Boolean(timelinePanel && reportPanel && timelinePanel.compareDocumentPosition(reportPanel) & Node.DOCUMENT_POSITION_FOLLOWING));
    setCheck('report_analytics_before_complementary', Boolean(reportPanel && operationsPanel && reportPanel.compareDocumentPosition(operationsPanel) & Node.DOCUMENT_POSITION_FOLLOWING) && (!tablePanel || Boolean(operationsPanel.compareDocumentPosition(tablePanel) & Node.DOCUMENT_POSITION_FOLLOWING)));
    setCheck('complementary_collapsed_by_default', Boolean(operationsPanel && operationsPanel.classList.contains('collapsed')));
    setCheck('data_rows_loaded', ganttRows.length > 0);
    setCheck('responsible_catalog_loaded', Array.from(document.querySelectorAll('#responsibleFilter option')).length > 1);
    setCheck('owner_catalog_loaded', Array.from(document.querySelectorAll('#ownerFilter option')).length > 1);
    setCheck('dgppcs_visible', /DGPPCS/i.test(textOf(document.body)));
    setCheck('notes_ui_present', Boolean(document.getElementById('localNote') && document.getElementById('saveCaseNoteBtn')));

    if (typeof buildExecutiveReport === 'function') buildExecutiveReport();
    const reportText = textOf(document.getElementById('reportPreview'));
    setCheck('block_4_present_in_report', /4\s*-\s*Inicio de Efectividad del Pr/i.test(reportText));

    const rootRows = Array.from(document.querySelectorAll('#ganttList .timeline-row.level-1'));
    const block4Root = rootRows.find(row => /^4\b/.test(textOf(row.querySelector('.timeline-kind')) || textOf(row)));
    const rootsAligned = rootRows.length >= 4 && rootRows.every(row => {
      const cell = row.querySelector('.edt-cell');
      return !cell || /padding-left:\s*0px/i.test(String(cell.getAttribute('style') || ''));
    });
    setCheck('block_4_root_visible_in_gantt', Boolean(block4Root));
    setCheck('root_blocks_left_aligned', rootsAligned && Boolean(block4Root));

    if (typeof applyFilters === 'function' && typeof findSearchTargetRecord === 'function' && typeof appState !== 'undefined') {
      document.getElementById('searchInput').value = 'bloque 4';
      applyFilters();
      const blockTarget = findSearchTargetRecord('bloque 4');
      setCheck('search_block_reveals_root4', Boolean(blockTarget && appState.filtered.some(record => record.id === blockTarget.id)));

      document.getElementById('searchInput').value = 'fase 2.1';
      applyFilters();
      const phaseTarget = findSearchTargetRecord('fase 2.1');
      setCheck('search_phase_reveals_record', Boolean(phaseTarget && appState.filtered.some(record => record.id === phaseTarget.id)));

      document.getElementById('searchInput').value = 'caso 3.6.9';
      applyFilters();
      const caseTarget = findSearchTargetRecord('caso 3.6.9');
      setCheck('search_case_reveals_record', Boolean(caseTarget && appState.filtered.some(record => record.id === caseTarget.id)));

      document.getElementById('searchInput').value = '';
      applyFilters();
    } else {
      setCheck('search_block_reveals_root4', false);
      setCheck('search_phase_reveals_record', false);
      setCheck('search_case_reveals_record', false);
    }

    if (typeof appState !== 'undefined') {
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
    }

    if (typeof setSelectedAuditReportDate === 'function') {
      setSelectedAuditReportDate('2026-05-05');
    } else if (document.getElementById('adminAuditDate')) {
      document.getElementById('adminAuditDate').value = '2026-05-05';
    }

    if (typeof buildDailyAuditReportFromItems === 'function' && typeof renderAdminDailyAuditReport === 'function' && typeof appState !== 'undefined') {
      const report = buildDailyAuditReportFromItems(sampleAudit, '2026-05-05', { mode: 'local', timezone: 'qa' });
      appState.adminDailyReport = report;
      renderAdminDailyAuditReport(report);
    }
    if (typeof renderDailyAuditDeliveryState === 'function' && typeof appState !== 'undefined') {
      renderDailyAuditDeliveryState(appState.dailyReportDelivery);
    }
    if (typeof renderAdminAudit === 'function') {
      renderAdminAudit();
    }
    if (typeof renderAdminStatus === 'function') {
      renderAdminStatus();
    }

    const adminModal = document.getElementById('adminModal');
    if (adminModal) adminModal.classList.add('open');

    const dailyReportHost = document.getElementById('adminDailyAuditSummary');
    const dailyReportMeta = document.getElementById('adminDailyAuditMeta');
    const dailyReportText = textOf(dailyReportHost);
    const dailyReportMetaText = textOf(dailyReportMeta);
    const deliveryMeta = document.getElementById('adminDailyDeliveryMeta');
    const deliverySummary = document.getElementById('adminDailyDeliverySummary');
    const adminActor = document.getElementById('adminActorValue');

    setCheck('daily_report_present', Boolean(dailyReportHost));
    setCheck('daily_report_has_two_actors', /alice@dgpccs\.gob\.pe/i.test(dailyReportText) && /bob@dgpccs\.gob\.pe/i.test(dailyReportText));
    setCheck('daily_report_filters_selected_day', /3 movimiento\(s\)/i.test(dailyReportMetaText));
    setCheck('daily_report_export_ready', typeof exportDailyAuditReport === 'function' && typeof appState !== 'undefined' && Boolean(appState.adminDailyReport && /Reporte diario de cambios/i.test(String(appState.adminDailyReport.plainText || ''))) && !document.getElementById('exportDailyAuditBtn').disabled);
    setCheck('daily_report_identity_labels_visible', /Correo verificado por Apps Script/i.test(dailyReportText) && /Actor declarado por URL/i.test(dailyReportText));
    setCheck('daily_delivery_panel_present', Boolean(deliveryMeta && deliverySummary));
    setCheck('daily_delivery_controls_present', Boolean(document.getElementById('saveDailyDeliveryConfigBtn') && document.getElementById('sendDailyAuditMailBtn') && document.getElementById('createDailyAuditTriggerBtn') && document.getElementById('deleteDailyAuditTriggerBtn')));
    setCheck('daily_delivery_form_present', Boolean(document.getElementById('dailyDeliveryModeSelect') && document.getElementById('dailyDeliveryToInput') && document.getElementById('dailyDeliveryHourInput') && document.getElementById('dailyDeliveryConfirmReal')));
    setCheck('daily_delivery_status_rendered', /QA delivery ready/i.test(textOf(deliverySummary)) && /Hora diaria: 18:00/i.test(textOf(deliveryMeta)));
    setCheck('shared_actor_identity_visible', /darwin@dgpccs\.gob\.pe/i.test(textOf(adminActor)) && /Correo verificado/i.test(textOf(adminActor)));
    setCheck('dgppcs_available_as_responsible', hasOption('responsibleFilter', /DGPPCS/i));

    if (typeof openPendingModal === 'function') {
      openPendingModal();
      let pendingModal = document.getElementById('pendingModal');
      let pendingCard = pendingModal ? pendingModal.querySelector('.alert-item[data-open-context][data-open]') : null;
      if (pendingCard) pendingCard.click();
      setCheck('pending_modal_opens_drawer', Boolean(document.getElementById('drawer') && document.getElementById('drawer').classList.contains('open')));
      setCheck('pending_modal_closes_after_open', !pendingModal || !pendingModal.classList.contains('open'));
      setCheck('pending_modal_loads_same_editor', /Seguimiento DGPPCS|Responsable/i.test(textOf(document.getElementById('detailGrid'))));
      if (typeof closeDrawer === 'function') closeDrawer();
      openPendingModal();
      pendingModal = document.getElementById('pendingModal');
      const directOpenTarget = pendingModal ? pendingModal.querySelector('.alert-item[data-open]') : null;
      if (directOpenTarget && typeof openDrawer === 'function') openDrawer(directOpenTarget.getAttribute('data-open'));
      setCheck('pending_modal_closes_on_direct_open', !pendingModal || !pendingModal.classList.contains('open'));
      if (typeof closeDrawer === 'function') closeDrawer();
    } else {
      setCheck('pending_modal_opens_drawer', false);
      setCheck('pending_modal_closes_after_open', false);
      setCheck('pending_modal_loads_same_editor', false);
      setCheck('pending_modal_closes_on_direct_open', false);
    }

    if (typeof openMonitoringModal === 'function') {
      openMonitoringModal();
      const monitoringModal = document.getElementById('monitoringModal');
      const monitoringCard = monitoringModal ? monitoringModal.querySelector('.alert-item[data-open-context][data-open]') : null;
      if (monitoringCard) monitoringCard.click();
      setCheck('monitoring_modal_opens_drawer', Boolean(document.getElementById('drawer') && document.getElementById('drawer').classList.contains('open')));
      setCheck('monitoring_modal_closes_after_open', !monitoringModal || !monitoringModal.classList.contains('open'));
      if (typeof closeDrawer === 'function') closeDrawer();
    } else {
      setCheck('monitoring_modal_opens_drawer', false);
      setCheck('monitoring_modal_closes_after_open', false);
    }

    out.metrics.gantt_rows = ganttRows.length;
    out.metrics.report_text_length = dailyReportText.length;
    out.metrics.admin_actor = textOf(adminActor);
    out.metrics.delivery_summary = textOf(deliverySummary);
    return out;
  });
}

async function run() {
  ensureDir(outputDir);
  const executablePath = resolveChromiumExecutable();
  if (!executablePath) {
    throw new Error('No se encontro un ejecutable Chromium utilizable para Playwright.');
  }
  const browser = await chromium.launch({
    headless: true,
    chromiumSandbox: false,
    executablePath
  });
  const results = [];
  try {
    for (const target of targets) {
      const pageErrors = [];
      const context = await browser.newContext({
        viewport: { width: 1600, height: 2600 }
      });
      const page = await context.newPage();
      page.on('pageerror', error => pageErrors.push(String(error && error.message || error)));
      page.on('console', message => {
        if (message.type() === 'error') pageErrors.push(message.text());
      });
      const targetUrl = pathToFileURL(target.file).toString();
      await page.goto(targetUrl, { waitUntil: 'load' });
      await page.waitForTimeout(1800);
      const evaluation = await collectChecks(page);
      evaluation.checks.console_errors_empty = pageErrors.length === 0;
      evaluation.metrics.consoleErrors = pageErrors;

      const screenshotPath = path.join(outputDir, `${target.name}.playwright.png`);
      const domPath = path.join(outputDir, `${target.name}.playwright.rendered.html`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      safeWrite(domPath, await page.content());

      results.push({
        target: target.name,
        file: target.file,
        screenshot: screenshotPath,
        renderedDom: domPath,
        checks: evaluation.checks,
        metrics: evaluation.metrics
      });

      await context.close();
    }
  } finally {
    await browser.close();
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    browser: 'playwright-chromium',
    outputDir,
    results
  };
  const summaryPath = path.join(outputDir, 'summary.playwright.json');
  safeWrite(summaryPath, JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
}

run().catch(error => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exitCode = 1;
});
