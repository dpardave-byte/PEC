const CONFIG = {
  rootFolderName: 'PEC - Programa Economia Circular',
  sheetName: 'PEC_indice_maestro',
  indexTabName: 'indice',
  maxFilesPerScan: 1500,
  aiDefaultModel: 'gpt-5-mini',
  aiMaxRecords: 16,
  aiVariables: [
    'CAPEX y OPEX',
    'Consumo energetico',
    'Complejidad de O&M',
    'Disponibilidad de repuestos',
    'Calidad del efluente',
    'Reuso y economia circular',
    'Gestion de lodos',
    'Huella de carbono',
    'Riesgo social y predial',
    'Permisos y salvaguardas',
    'Madurez tecnologica',
    'Escalabilidad Puno/Lima',
    'Plazo de implementacion',
    'Riesgo contractual'
  ],
  aiSpecialties: [
    'Ingenieria sanitaria y PTAR',
    'Economia circular y reuso',
    'Estructuras y geotecnia',
    'Electromecanica y energia',
    'Ambiental y salvaguardas',
    'Social y predial',
    'Legal y contrataciones',
    'Finanzas publicas y MEF',
    'Adquisiciones Banco Mundial',
    'Operacion y mantenimiento',
    'Gestion documental y datos'
  ],
  headers: [
    'id', 'edt', 'actividad', 'macro_actividad', 'territorio', 'categoria',
    'responsable', 'inicio', 'final', 'duracion', 'estado', 'alerta',
    'tipo_documento', 'tecnologia', 'proveedor', 'criterio_comparacion',
    'puntaje', 'url_drive', 'resumen', 'tags'
  ],
  folders: [
    '00_Donacion_Preparatoria',
    '01_Efectividad_Prestamo',
    '02_Puno',
    '03_Lima',
    '04_Comparacion_Tecnologias',
    '05_Evidencias',
    '02_Puno/PTAR',
    '02_Puno/Convenios',
    '02_Puno/Ambiental',
    '02_Puno/Tecnologias',
    '03_Lima/PASLC',
    '03_Lima/Tecnologias',
    '03_Lima/Legal',
    '04_Comparacion_Tecnologias/MBR',
    '04_Comparacion_Tecnologias/SBR',
    '04_Comparacion_Tecnologias/Lagunas',
    '04_Comparacion_Tecnologias/Lodos_Activados'
  ],
  seedRows: [
    ['D0','0','Donacion / fase preparatoria previa al prestamo','Donacion preparatoria','Puno y Lima','Gobernanza','DGPPCS/BM/PNSU/PASLC','2026-03-07','2026-06-17','103','En Proceso','','Carpeta Drive','','','','','','Condicion habilitante para iniciar el prestamo y el programa','donacion;preparacion;BM'],
    ['P1','1','DS de aprobacion de endeudamiento','Efectividad del prestamo','Nacional','Legal','DGPPCS/MEF','2026-03-07','2026-03-07','1','Completado','','Norma','','','','','','Aprobacion de endeudamiento','prestamo;legal'],
    ['PU1','2.4','Evaluacion de la intervencion en las lagunas de la PTAR Puno','Donacion preparatoria','Puno','Tecnica','Teresa Arana','2026-04-13','2026-04-22','10','En Proceso','','Informe tecnico','Lagunas / PTAR','','aplicabilidad en Puno/Lima','4','','Evaluacion tecnica ambiental y predial de la PTAR Puno','Puno;PTAR;lagunas'],
    ['L1','2.2.2','Convenio Lima PASLC','Efectividad del prestamo','Lima','Convenios','PASLC','2026-03-09','2026-05-20','73','En Proceso','','Convenio','','','','','','Convenio interinstitucional para Lima','Lima;PASLC'],
    ['T1','4.1','Comparacion tecnologia MBR','Comparacion tecnologias','Puno y Lima','Tecnologia','Equipo tecnico','2026-04-01','2026-04-30','30','En Proceso','','Ficha tecnica','MBR','Referencial','costo','3','','Alta calidad de efluente mayor costo y O&M especializado','MBR;costo;O&M'],
    ['T2','4.2','Comparacion tecnologia SBR','Comparacion tecnologias','Puno y Lima','Tecnologia','Equipo tecnico','2026-04-01','2026-04-30','30','En Proceso','','Ficha tecnica','SBR','Referencial','madurez','4','','Tecnologia madura con operacion secuencial y flexibilidad','SBR;madurez']
  ]
};

const LOADER_PROPERTY_KEYS = {
  rootFolderId: 'PEC_LOADER_ROOT_FOLDER_ID',
  spreadsheetId: 'PEC_LOADER_SPREADSHEET_ID',
  seedExampleRows: 'PEC_LOADER_SEED_EXAMPLE_ROWS'
};

const OPERATIONAL_DEFAULTS = {
  sharedTrackingAdminEmails: ['dpardave@gmail.com'],
  sharedTrackingOperationalEmails: [],
  sharedTrackingDocumentOperatorEmails: [],
  sharedTrackingPmoEmails: [],
  sharedTrackingAuditorEmails: [],
  dgppcsSummaryRecipients: ['mmelletp@yahoo.com'],
  dailyReportMode: 'REAL',
  dailyReportSendHour: 9,
  adminSummarySendHour: 21,
  dailyReportConfirmRealSend: true,
  weekdayAutoSendHour: 18,
  actorEmailDirectory: {
    'pec@vivienda.gob.pe': 'Marjorie Mellet'
  }
};

const SHARED_VISOR_CANONICAL_WEBAPP_BASE = 'https://script.google.com/macros/s/AKfycbwDO41v2ncg7p2rjvEjTCICeu8fJoAySOgSNAPe5arZnkK-gYtCH-FioX-jexhfW0k0/exec';
const PANEL_PUBLIC_URL = 'https://dpardave-byte.github.io/PEC/';
const PANEL_PUBLIC_VISOR_URL = 'https://dpardave-byte.github.io/PEC/visor_seguimiento_pec.html';
const PANEL_PUBLIC_SHARED_VIEW_URL = 'https://dpardave-byte.github.io/PEC/visor_seguimiento_pec.html?channel=public';
const PANEL_PUBLIC_VISOR_GUIDE_URL = 'https://dpardave-byte.github.io/PEC/guia-rapida-visor-pec-dgppcs.html';
const SHARED_TRACKING_DOCUMENT_TYPE_CATALOG = [
  'Informe',
  'Oficio',
  'Acta',
  'Convenio',
  'Evidencia',
  'Norma',
  'Ficha técnica',
  'Resolución Ministerial',
  'Resolución Directoral',
  'Decreto Supremo',
  'Expediente técnico',
  'Otro'
];
const SHARED_TRACKING_DOCUMENT_TYPE_ALIASES = {
  'informe': 'Informe',
  'informe tecnico': 'Informe',
  'oficio': 'Oficio',
  'acta': 'Acta',
  'convenio': 'Convenio',
  'convenio marco': 'Convenio',
  'evidencia': 'Evidencia',
  'foto': 'Evidencia',
  'fotografia': 'Evidencia',
  'imagen': 'Evidencia',
  'captura': 'Evidencia',
  'norma': 'Norma',
  'ficha tecnica': 'Ficha técnica',
  'ficha': 'Ficha técnica',
  'resolucion ministerial': 'Resolución Ministerial',
  'resol ministerial': 'Resolución Ministerial',
  'rm': 'Resolución Ministerial',
  'resolucion directoral': 'Resolución Directoral',
  'resol directoral': 'Resolución Directoral',
  'rd': 'Resolución Directoral',
  'decreto supremo': 'Decreto Supremo',
  'ds': 'Decreto Supremo',
  'expediente tecnico': 'Expediente técnico',
  'exp tecnico': 'Expediente técnico',
  'exp. tecnico': 'Expediente técnico',
  'otro': 'Otro',
  'otros': 'Otro',
  'archivo': 'Otro',
  'adjunto': 'Otro',
  'pdf': 'Otro',
  'word / doc': 'Otro',
  'excel / sheet': 'Otro',
  'plano': 'Otro'
};

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  ensureOperationalDailyReportDelivery_();
  ensureOperationalAdminExecutiveSummaryDelivery_();
  if (params.view === 'visor') {
    return renderSharedVisor_();
  }
  if (params.action === 'ai') {
    return outputPayload_(runAiAnalysis_(params), params);
  }
  if (params.action === 'ai_status') {
    return outputPayload_(getAiConfigStatus(), params);
  }
  if (params.action === 'visor_state') {
    return outputPayload_(getSharedTrackingState(), params);
  }
  if (params.action === 'visor_analytics') {
    return outputPayload_(getSharedTrackingAnalyticalSummary(params.recordId), params);
  }
  if (params.action === 'visor_public_state') {
    return outputPayload_(getSharedTrackingPublicState(), params);
  }
  if (params.action === 'visor_audit') {
    return outputPayload_(getSharedTrackingAudit(params.limit), params);
  }
  if (params.action === 'visor_audit_daily_report') {
    return outputPayload_(getSharedTrackingDailyAuditReport(params.date, params.limit), params);
  }
  if (params.action === 'visor_send_daily_report_now') {
    var sendDailyReportStatus = sendSharedTrackingDailyAuditReportEmail(params.date);
    if (params.callback || String(params.format || '').trim().toLowerCase() === 'json') {
      return outputPayload_(sendDailyReportStatus, params);
    }
    return buildSharedTrackingActionHtml_(sendDailyReportStatus, getTrackingWebAppUrl_(), {
      actionLabel: 'Cierre diario del visor PEC',
      successTitle: 'Cierre diario procesado',
      failureTitle: 'No se pudo procesar el cierre diario'
    });
  }
  if (params.action === 'visor_admin_summary_status') {
    var adminSummaryStatus = getSharedTrackingAdminExecutiveSummaryStatus();
    if (params.callback || String(params.format || '').trim().toLowerCase() === 'json') {
      return outputPayload_(adminSummaryStatus, params);
    }
    return buildSharedTrackingActionHtml_(adminSummaryStatus, getTrackingWebAppUrl_(), {
      actionLabel: 'Resumen ejecutivo admin del visor PEC',
      successTitle: 'Estado del resumen admin consultado',
      failureTitle: 'No se pudo consultar el resumen admin'
    });
  }
  if (params.action === 'visor_send_admin_summary_now') {
    var sendAdminSummaryStatus = sendSharedTrackingAdminExecutiveSummaryEmail(params.date);
    if (params.callback || String(params.format || '').trim().toLowerCase() === 'json') {
      return outputPayload_(sendAdminSummaryStatus, params);
    }
    return buildSharedTrackingActionHtml_(sendAdminSummaryStatus, getTrackingWebAppUrl_(), {
      actionLabel: 'Resumen ejecutivo admin del visor PEC',
      successTitle: 'Resumen ejecutivo admin procesado',
      failureTitle: 'No se pudo procesar el resumen ejecutivo admin'
    });
  }
  if (params.action === 'visor_send_due_tracking_now') {
    var sendDueTrackingStatus = sendDueTrackingEmails();
    if (params.callback || String(params.format || '').trim().toLowerCase() === 'json') {
      return outputPayload_(sendDueTrackingStatus, params);
    }
    return buildSharedTrackingActionHtml_(sendDueTrackingStatus, getTrackingWebAppUrl_(), {
      actionLabel: 'Correos operativos del visor PEC',
      successTitle: 'Correos operativos procesados',
      failureTitle: 'No se pudieron procesar los correos operativos'
    });
  }
  if (params.action === 'visor_send_access_guide_now') {
    var sendAccessGuideStatus = sendSharedVisorAccessGuideEmail_();
    if (params.callback || String(params.format || '').trim().toLowerCase() === 'json') {
      return outputPayload_(sendAccessGuideStatus, params);
    }
    return buildSharedTrackingActionHtml_(sendAccessGuideStatus, getTrackingWebAppUrl_(), {
      actionLabel: 'Acceso y guía del visor PEC',
      successTitle: 'Correo de acceso enviado',
      failureTitle: 'No se pudo enviar el correo de acceso'
    });
  }
  if (params.action === 'visor_due_tracking_status') {
    var dueTrackingStatus = getDueTrackingNotificationStatus();
    if (params.callback || String(params.format || '').trim().toLowerCase() === 'json') {
      return outputPayload_(dueTrackingStatus, params);
    }
    return buildSharedTrackingActionHtml_(dueTrackingStatus, getTrackingWebAppUrl_(), {
      actionLabel: 'Configuración de correos operativos PEC',
      successTitle: 'Estado de correos operativos consultado',
      failureTitle: 'No se pudo consultar la configuración de correos operativos'
    });
  }
  if (params.action === 'visor_activate_due_tracking_live_now') {
    var liveDueTrackingStatus = activateLiveDueTrackingNotificationsAndSendNow_();
    if (params.callback || String(params.format || '').trim().toLowerCase() === 'json') {
      return outputPayload_(liveDueTrackingStatus, params);
    }
    return buildSharedTrackingActionHtml_(liveDueTrackingStatus, getTrackingWebAppUrl_(), {
      actionLabel: 'Activación real de correos operativos PEC',
      successTitle: 'Configuración real aplicada',
      failureTitle: 'No se pudo activar el envío real de correos operativos'
    });
  }
  if (params.action === 'visor_apply_due_tracking_summary_cc_only') {
    var summaryOnlyStatus = setDueTrackingNotificationCcScope_('SUMMARY_ONLY');
    if (params.callback || String(params.format || '').trim().toLowerCase() === 'json') {
      return outputPayload_(summaryOnlyStatus, params);
    }
    return buildSharedTrackingActionHtml_(summaryOnlyStatus, getTrackingWebAppUrl_(), {
      actionLabel: 'Configuración de CC operativos PEC',
      successTitle: 'CC restringido al consolidado DGPPCS',
      failureTitle: 'No se pudo ajustar el alcance del CC operativo'
    });
  }
  if (params.action === 'visor_reset_due_tracking_weekday_trigger') {
    var weekdayTriggerStatus = createDailyNotificationTrigger();
    if (params.callback || String(params.format || '').trim().toLowerCase() === 'json') {
      return outputPayload_(weekdayTriggerStatus, params);
    }
    return buildSharedTrackingActionHtml_(weekdayTriggerStatus, getTrackingWebAppUrl_(), {
      actionLabel: 'Reconfiguración del trigger operativo PEC',
      successTitle: 'Trigger operativo reconfigurado',
      failureTitle: 'No se pudo reconfigurar el trigger operativo'
    });
  }
  if (params.action === 'visor_reset_daily_report_weekday_trigger') {
    var dailyReportTriggerStatus = resetDailyAuditReportWeekdayTrigger_();
    if (params.callback || String(params.format || '').trim().toLowerCase() === 'json') {
      return outputPayload_(dailyReportTriggerStatus, params);
    }
    return buildSharedTrackingActionHtml_(dailyReportTriggerStatus, getTrackingWebAppUrl_(), {
      actionLabel: 'Reconfiguración del cierre diario PEC',
      successTitle: 'Cierre diario reconfigurado',
      failureTitle: 'No se pudo reconfigurar el cierre diario'
    });
  }
  if (/^visor_/i.test(String(params.action || ''))) {
    var unsupportedVisorAction = {
      ok: false,
      sent: false,
      mode: 'app_script',
      reportDate: formatDate_(new Date()),
      message: 'La acción solicitada del visor no está disponible en este despliegue.'
    };
    if (params.callback || String(params.format || '').trim().toLowerCase() === 'json') {
      return outputPayload_(unsupportedVisorAction, params);
    }
    return buildSharedTrackingActionHtml_(unsupportedVisorAction, getTrackingWebAppUrl_(), {
      actionLabel: 'Acción del visor PEC',
      successTitle: 'Acción del visor procesada',
      failureTitle: 'Acción del visor no disponible',
      note: 'Esta ruta del visor no debe redirigir al PEC Drive Loader.'
    });
  }
  if (params.action === 'loader_status') {
    var loaderStatus = getEnvironmentStatus();
    if (params.callback || String(params.format || '').trim().toLowerCase() === 'json') {
      return outputPayload_(loaderStatus, params);
    }
    return buildLoaderActionHtml_(loaderStatus, {
      actionLabel: 'PEC Drive Loader',
      successTitle: 'Estado del loader consultado',
      summary: 'Se consultó el estado actual del entorno Drive + Google Sheets.'
    });
  }
  if (params.action === 'loader_setup') {
    var setupStatus = setupEnvironment();
    if (params.callback || String(params.format || '').trim().toLowerCase() === 'json') {
      return outputPayload_(setupStatus, params);
    }
    return buildLoaderActionHtml_(setupStatus, {
      actionLabel: 'PEC Drive Loader',
      successTitle: 'Estructura base preparada',
      summary: 'Se creó o reutilizó la carpeta raíz, el spreadsheet y la pestaña operativa del índice.'
    });
  }
  if (params.action === 'loader_scan') {
    var scanStatus = scanDriveToIndex();
    if (params.callback || String(params.format || '').trim().toLowerCase() === 'json') {
      return outputPayload_(scanStatus, params);
    }
    return buildLoaderActionHtml_(scanStatus, {
      actionLabel: 'PEC Drive Loader',
      successTitle: 'Escaneo de Drive completado',
      summary: 'Se escaneó la carpeta raíz y se actualizaron registros nuevos del índice maestro.'
    });
  }
  if (params.action === 'loader_setup_and_scan') {
    var preparedStatus = setupEnvironment();
    var scannedStatus = scanDriveToIndex();
    var combinedStatus = Object.assign({}, scannedStatus, {
      ok: true,
      setupCompleted: true,
      scanCompleted: true,
      seedRowsInserted: preparedStatus.seedRowsInserted || 0
    });
    if (params.callback || String(params.format || '').trim().toLowerCase() === 'json') {
      return outputPayload_(combinedStatus, params);
    }
    return buildLoaderActionHtml_(combinedStatus, {
      actionLabel: 'PEC Drive Loader',
      successTitle: 'Estructura y escaneo completados',
      summary: 'Se preparó el entorno y luego se ejecutó el escaneo de Drive sobre el índice maestro.'
    });
  }
  const payload = { updatedAt: new Date().toISOString(), records: getRecords_() };
  if (params.format === 'csv') {
    return ContentService
      .createTextOutput(recordsToCsv(getRecords_()))
      .setMimeType(ContentService.MimeType.CSV);
  }
  if (params.format === 'json' || params.callback) {
    return outputPayload_(payload, params);
  }
  return HtmlService
    .createHtmlOutputFromFile('Index')
    .setTitle('PEC Drive Loader')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function outputPayload_(payload, params) {
  if (params && params.callback) {
    return ContentService
      .createTextOutput(params.callback + '(' + JSON.stringify(payload) + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function buildSharedTrackingActionHtml_(status, webappUrl, options) {
  var result = status && typeof status === 'object' ? status : {};
  var uiOptions = options && typeof options === 'object' ? options : {};
  var ok = Boolean(result.ok && result.sent !== false);
  var safeUrl = ensureSharedVisorViewUrl_(webappUrl || getTrackingWebAppUrl_());
  var summary = result.message || (ok ? 'La acción se ejecutó correctamente.' : 'No se pudo completar el envío.');
  var actionLabel = String(uiOptions.actionLabel || 'Acción del visor PEC');
  var successTitle = String(uiOptions.successTitle || 'Acción del visor procesada');
  var failureTitle = String(uiOptions.failureTitle || 'No se pudo procesar la acción del visor');
  var note = String(uiOptions.note || 'Esta pantalla reemplaza la respuesta JSON cruda cuando la acción se abre desde el navegador.');
  var detailLines = [
    'Modo: ' + String(result.mode || '-'),
    'Fecha del reporte: ' + String(result.reportDate || '-'),
    'Destinatarios efectivos: ' + ((Array.isArray(result.effectiveRecipients) && result.effectiveRecipients.length) ? result.effectiveRecipients.join(', ') : 'Sin destinatarios'),
    'Enviado: ' + (ok ? 'Sí' : 'No')
  ];
  var html = [
    '<!doctype html>',
    '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
    '<title>' + escapeHtmlEmail_(actionLabel) + '</title>',
    '<style>',
    'body{margin:0;font-family:Arial,sans-serif;background:#eef5fb;color:#16324f;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px;}',
    '.card{max-width:720px;width:100%;background:#fff;border:1px solid #d7e2ef;border-radius:18px;box-shadow:0 24px 70px rgba(24,56,88,.12);padding:24px;}',
    '.badge{display:inline-block;padding:6px 10px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;background:' + (ok ? '#e6f4ea;color:#166534' : '#fdeaea;color:#991b1b') + ';}',
    'h1{margin:14px 0 8px;font-size:24px;}',
    'p{margin:0 0 12px;line-height:1.5;color:#4d6379;}',
    'ul{margin:0 0 18px;padding-left:18px;color:#16324f;}',
    'li{margin:6px 0;}',
    '.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px;}',
    '.btn{display:inline-block;padding:11px 16px;border-radius:10px;text-decoration:none;font-weight:700;}',
    '.btn-primary{background:#1d5f8f;color:#fff;}',
    '.btn-secondary{background:#edf4fb;color:#16324f;border:1px solid #d7e2ef;}',
    '.note{margin-top:14px;font-size:12px;color:#6b7d90;}',
    '</style></head><body>',
    '<div class="card">',
    '<span class="badge">' + escapeHtmlEmail_(ok ? 'Operación completada' : 'Revisión requerida') + '</span>',
    '<h1>' + escapeHtmlEmail_(ok ? successTitle : failureTitle) + '</h1>',
    '<p>' + escapeHtmlEmail_(summary) + '</p>',
    '<ul>' + detailLines.map(function(line) { return '<li>' + escapeHtmlEmail_(line) + '</li>'; }).join('') + '</ul>',
    '<div class="actions">',
    '<a class="btn btn-primary" href="' + escapeHtmlEmail_(safeUrl) + '">Volver al visor</a>',
    '<a class="btn btn-secondary" href="' + escapeHtmlEmail_(safeUrl) + '" onclick="window.close();return false;">Cerrar esta ventana</a>',
    '</div>',
    '<p class="note">' + escapeHtmlEmail_(note) + '</p>',
    '</div>',
    '<script>',
    '(function(){',
    'var target=' + JSON.stringify(safeUrl) + ';',
    'setTimeout(function(){',
    'try{ window.close(); }catch(e){}',
    'if(!window.closed){ window.location.replace(target); }',
    '}, 2200);',
    '})();',
    '</script>',
    '</body></html>'
  ].join('');
  return HtmlService
    .createHtmlOutput(html)
    .setTitle(actionLabel)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function buildSharedTrackingDailyReportActionHtml_(status, webappUrl) {
  return buildSharedTrackingActionHtml_(status, webappUrl, {
    actionLabel: 'Cierre diario del visor PEC',
    successTitle: 'Cierre diario procesado',
    failureTitle: 'No se pudo procesar el cierre diario'
  });
}

function buildLoaderActionHtml_(status, options) {
  var result = status && typeof status === 'object' ? status : {};
  var uiOptions = options && typeof options === 'object' ? options : {};
  var actionLabel = String(uiOptions.actionLabel || 'PEC Drive Loader');
  var successTitle = String(uiOptions.successTitle || 'Operación del loader completada');
  var failureTitle = String(uiOptions.failureTitle || 'No se pudo completar la operación del loader');
  var summary = String(uiOptions.summary || result.message || 'La operación del loader finalizó.');
  var rootUrl = String(result.rootFolderUrl || '').trim();
  var spreadsheetUrl = String(result.spreadsheetUrl || '').trim();
  var safeLoaderUrl = String(ScriptApp.getService().getUrl() || '').trim();
  var safePanelUrl = PANEL_PUBLIC_URL;
  var safePublishedVisorUrl = PANEL_PUBLIC_VISOR_URL;
  var safeSharedVisorUrl = String(getTrackingWebAppUrl_() || '').trim();
  var detailLines = [
    'Carpeta raíz: ' + String(result.rootFolderName || CONFIG.rootFolderName),
    'Root folder ID: ' + String(result.rootFolderId || '-'),
    'Fuente de resolución carpeta: ' + String(result.rootFolderSource || '-'),
    'Spreadsheet: ' + String(result.spreadsheetName || CONFIG.sheetName),
    'Spreadsheet ID: ' + String(result.spreadsheetId || '-'),
    'Fuente de resolución spreadsheet: ' + String(result.spreadsheetSource || '-'),
    'Pestaña operativa: ' + String(result.indexTabName || CONFIG.indexTabName),
    'Filas semilla habilitadas: ' + (result.seedExampleRowsEnabled ? 'Sí' : 'No'),
    'Filas semilla insertadas: ' + String(result.seedRowsInserted == null ? 0 : result.seedRowsInserted),
    'Registros en índice: ' + String(result.records == null ? '-' : result.records),
    'Registros importados: ' + String(result.importedFiles == null ? '-' : result.importedFiles)
  ];
  var html = [
    '<!doctype html>',
    '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
    '<title>' + escapeHtmlEmail_(actionLabel) + '</title>',
    '<style>',
    'body{margin:0;font-family:Arial,sans-serif;background:#eef5fb;color:#16324f;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px;}',
    '.card{max-width:780px;width:100%;background:#fff;border:1px solid #d7e2ef;border-radius:18px;box-shadow:0 24px 70px rgba(24,56,88,.12);padding:24px;}',
    '.badge{display:inline-block;padding:6px 10px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;background:#e6f4ea;color:#166534;}',
    'h1{margin:14px 0 8px;font-size:24px;}',
    'p{margin:0 0 12px;line-height:1.5;color:#4d6379;}',
    'ul{margin:0 0 18px;padding-left:18px;color:#16324f;}',
    'li{margin:6px 0;}',
    '.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px;}',
    '.btn{display:inline-block;padding:11px 16px;border-radius:10px;text-decoration:none;font-weight:700;}',
    '.btn-primary{background:#1d5f8f;color:#fff;}',
    '.btn-secondary{background:#edf4fb;color:#16324f;border:1px solid #d7e2ef;}',
    '.warn{margin:0 0 16px;padding:12px 14px;border-left:4px solid #b45309;border-radius:10px;background:#fff7ed;color:#7c2d12;}',
    '.note{margin-top:14px;font-size:12px;color:#6b7d90;}',
    '</style></head><body>',
    '<div class="card">',
    '<span class="badge">Operación completada</span>',
    '<h1>' + escapeHtmlEmail_(successTitle || failureTitle) + '</h1>',
    '<p>' + escapeHtmlEmail_(summary) + '</p>',
    '<p class="warn">Esta pantalla pertenece al backend administrativo del PEC Drive Loader. No reemplaza el panel público del programa ni el visor ejecutivo.</p>',
    '<ul>' + detailLines.map(function(line) { return '<li>' + escapeHtmlEmail_(line) + '</li>'; }).join('') + '</ul>',
    '<div class="actions">',
    safePanelUrl ? '<a class="btn btn-primary" href="' + escapeHtmlEmail_(safePanelUrl) + '">Abrir panel público</a>' : '',
    safePublishedVisorUrl ? '<a class="btn btn-secondary" href="' + escapeHtmlEmail_(safePublishedVisorUrl) + '">Abrir visor publicado</a>' : '',
    safeSharedVisorUrl ? '<a class="btn btn-secondary" href="' + escapeHtmlEmail_(safeSharedVisorUrl) + '">Abrir visor compartido</a>' : '',
    safeLoaderUrl ? '<a class="btn btn-primary" href="' + escapeHtmlEmail_(safeLoaderUrl) + '">Volver al loader</a>' : '',
    rootUrl ? '<a class="btn btn-secondary" href="' + escapeHtmlEmail_(rootUrl) + '">Abrir carpeta raíz</a>' : '',
    spreadsheetUrl ? '<a class="btn btn-secondary" href="' + escapeHtmlEmail_(spreadsheetUrl) + '">Abrir spreadsheet</a>' : '',
    '</div>',
    '<p class="note">La operación se ejecutó en el backend del PEC Drive Loader usando tu sesión autenticada actual.</p>',
    '</div></body></html>'
  ].join('');
  return HtmlService
    .createHtmlOutput(html)
    .setTitle(actionLabel)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function setOpenAiConfig(apiKey, model, token) {
  const props = PropertiesService.getScriptProperties();
  if (apiKey) props.setProperty('OPENAI_API_KEY', apiKey);
  if (model) props.setProperty('OPENAI_MODEL', model);
  if (token) props.setProperty('PEC_AI_TOKEN', token);
  return getAiConfigStatus();
}

function getAiConfigStatus() {
  const props = PropertiesService.getScriptProperties();
  return {
    ok: true,
    hasOpenAiKey: Boolean(props.getProperty('OPENAI_API_KEY')),
    hasAccessToken: Boolean(props.getProperty('PEC_AI_TOKEN')),
    model: props.getProperty('OPENAI_MODEL') || CONFIG.aiDefaultModel
  };
}

function runAiAnalysis_(params) {
  try {
    const props = PropertiesService.getScriptProperties();
    const apiKey = props.getProperty('OPENAI_API_KEY');
    const expectedToken = props.getProperty('PEC_AI_TOKEN');
    if (!apiKey) {
      return {
        ok: false,
        code: 'OPENAI_KEY_MISSING',
        message: 'Falta configurar OPENAI_API_KEY en Script Properties. Ejecuta setOpenAiConfig(apiKey, model, token).'
      };
    }
    if (!expectedToken) {
      return {
        ok: false,
        code: 'PEC_AI_TOKEN_MISSING',
        message: 'Falta configurar PEC_AI_TOKEN en Script Properties para proteger el endpoint publico.'
      };
    }
    const incomingToken = String(params.token || '').trim();
    const configuredToken = String(expectedToken || '').trim();
    if (incomingToken !== configuredToken) {
      return {
        ok: false,
        code: 'PEC_AI_TOKEN_INVALID',
        message: 'Token IA invalido o ausente. Configura el token en el panel.'
      };
    }

    const request = parseAiRequest_(params.request);
    const model = props.getProperty('OPENAI_MODEL') || CONFIG.aiDefaultModel;
    const body = {
      model,
      store: false,
      reasoning: { effort: 'medium' },
      max_output_tokens: 7000,
      tools: [{ type: 'web_search' }],
      include: ['web_search_call.action.sources'],
      instructions: [
        'Eres el Copiloto LLM especializado en investigacion documental del Programa de Economia Circular del MVCS, con foco en trazabilidad, evidencia, riesgos, brechas de informacion, priorizacion ejecutiva y lenguaje institucional.',
        'Responde en espanol, con tono tecnico-gerencial claro y orientado a decisiones para alta direccion y equipos tecnicos.',
        'Distingue siempre entre evidencia disponible del panel PEC, evidencia web citada, evidencia local de sesion e inferencia controlada del modelo.',
        'Separa claramente informacion nueva 2026 (MOP, donacion, prestamo, UGP-PEC) de informacion historica Titicaca anterior a 2020.',
        'Cuando uses informacion mundial o reciente de tecnologias, usa busqueda web y deja citas visibles por afirmacion relevante.',
        'Penaliza fuentes debiles, grises o comerciales: puedes usarlas, pero etiquetalas como referencia secundaria y no como sustento principal.',
        'No inventes datos, costos, fechas, enlaces, lecturas de archivo ni supuestos tecnicos. Si falta evidencia, declaralo de forma explicita y propone el dato que debe levantarse.',
        'No afirmes que revisaste un archivo si solo existe el registro del indice. Si un registro no tiene url_drive, advierte que no es verificable desde Drive.',
        'Cuando existan registros, cita IDs, EDT, actividades o enlaces disponibles para sostener la respuesta.',
        'No devuelvas solo listados de variables: responde con lectura ejecutiva, evidencia encontrada, analisis, riesgos, acciones y preguntas pendientes.',
        'La salida debe ayudar a un equipo directivo a decidir o a pedir informacion adicional con precision.'
      ].join('\n'),
      input: buildAiPrompt_(request)
    };

    const response = UrlFetchApp.fetch('https://api.openai.com/v1/responses', {
      method: 'post',
      contentType: 'application/json',
      headers: { Authorization: 'Bearer ' + apiKey },
      payload: JSON.stringify(body),
      muteHttpExceptions: true
    });
    const status = response.getResponseCode();
    const raw = response.getContentText();
    const parsed = JSON.parse(raw);
    if (status < 200 || status >= 300) {
      return {
        ok: false,
        code: 'OPENAI_HTTP_' + status,
        message: parsed.error && parsed.error.message ? parsed.error.message : raw.slice(0, 500)
      };
    }

    return {
      ok: true,
      model,
      output: extractOpenAiText_(parsed),
      sources: extractOpenAiSources_(parsed),
      responseId: parsed.id || '',
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    return {
      ok: false,
      code: 'AI_ANALYSIS_ERROR',
      message: error && error.message ? error.message : String(error)
    };
  }
}

function parseAiRequest_(raw) {
  const request = parseAiRequestPayload_(raw);
  const records = Array.isArray(request.records) && request.records.length
    ? request.records
    : selectAiRecords_(request);
  request.records = records.slice(0, CONFIG.aiMaxRecords).map(row => ({
    id: row.id || '',
    edt: row.edt || '',
    actividad: row.actividad || '',
    macro_actividad: row.macro_actividad || '',
    territorio: row.territorio || '',
    categoria: row.categoria || '',
    responsable: row.responsable || '',
    inicio: row.inicio || '',
    final: row.final || '',
    estado: row.estado || '',
    alerta: row.alerta || '',
    tipo_documento: row.tipo_documento || '',
    tecnologia: row.tecnologia || '',
    proveedor: row.proveedor || '',
    criterio_comparacion: row.criterio_comparacion || '',
    puntaje: row.puntaje || '',
    resumen: String(row.resumen || '').slice(0, 600),
    tags: row.tags || ''
  }));
  return request;
}

function parseAiRequestPayload_(raw) {
  if (!raw) return {};
  if (typeof raw === 'object') return raw;
  try {
    return JSON.parse(String(raw));
  } catch (error) {
    throw new Error('Parametro request invalido: debe ser un JSON valido.');
  }
}

function selectAiRecords_(request) {
  const filters = request.filters || {};
  const allRecords = dedupeAiRecords_(defaultAiProgramRows_().concat(getRecords_()));
  const q = String(filters.q || '').toLowerCase();
  const fieldMap = {
    macro: 'macro_actividad',
    tipo: 'tipo_documento'
  };

  return allRecords
    .filter(row => {
      if (q && Object.keys(row).map(key => String(row[key] || '')).join(' ').toLowerCase().indexOf(q) < 0) return false;
      return ['macro', 'territorio', 'categoria', 'tecnologia', 'proveedor', 'tipo', 'estado'].every(filterKey => {
        const expected = String(filters[filterKey] || '');
        if (!expected) return true;
        const rowKey = fieldMap[filterKey] || filterKey;
        return String(row[rowKey] || '') === expected;
      });
    })
    .sort((a, b) => {
      const aHist = isAiHistorical_(a) ? 1 : 0;
      const bHist = isAiHistorical_(b) ? 1 : 0;
      return aHist - bHist;
    });
}

function dedupeAiRecords_(rows) {
  const seen = {};
  return rows.filter(row => {
    const key = String(row.id || row.actividad || '') + '|' + String(row.url_drive || '');
    if (seen[key]) return false;
    seen[key] = true;
    return true;
  });
}

function isAiHistorical_(row) {
  return /historico|hist[oó]rico/i.test(String(row.tags || '') + ' ' + String(row.resumen || '')) || /^APP\d+/i.test(String(row.id || ''));
}

function defaultAiProgramRows_() {
  return [
    {
      id: 'MOP2026',
      edt: 'MOP',
      actividad: 'Manual de Operaciones del Programa de Economia Circular (MOP 2026)',
      macro_actividad: 'Programa Economia Circular 2026',
      territorio: 'Puno y Lima',
      categoria: 'Gobernanza',
      responsable: 'DGPPCS',
      inicio: '2026-04-09',
      final: '2026-04-12',
      estado: 'En Proceso',
      tipo_documento: 'Word / Doc',
      tecnologia: '',
      proveedor: '',
      criterio_comparacion: 'documento rector 2026',
      puntaje: '',
      resumen: 'MOP 2026 como documento rector nuevo del Programa de Economia Circular; no pertenece al historico Titicaca.',
      tags: 'nuevo_2026;mop;programa;prestamo;gobernanza'
    },
    {
      id: 'D0',
      edt: '0',
      actividad: 'Donacion / fase preparatoria previa al prestamo',
      macro_actividad: 'Donacion preparatoria',
      territorio: 'Puno y Lima',
      categoria: 'Gobernanza',
      responsable: 'DGPPCS/BM/PNSU/PASLC',
      inicio: '2026-03-07',
      final: '2026-06-17',
      estado: 'En Proceso',
      tipo_documento: 'Carpeta Drive',
      tecnologia: '',
      proveedor: '',
      criterio_comparacion: '',
      puntaje: '',
      resumen: 'Condicion habilitante para iniciar el prestamo y el programa.',
      tags: 'donacion;preparacion;BM'
    }
  ];
}

function buildAiPrompt_(request) {
  const variables = request.variables || CONFIG.aiVariables;
  const specialties = request.specialties || CONFIG.aiSpecialties;
  const filters = request.filters || {};
  const counts = request.counts || {};
  const modeLabel = request.modeLabel || request.type || 'analisis documental';
  const modeHint = request.modeHint || '';
  return [
    'Pregunta de decision del usuario:',
    request.question || 'Analizar los siguientes pasos del Programa de Economia Circular.',
    '',
    'Modo de analisis solicitado:',
    modeLabel,
    modeHint ? 'Descripcion del modo: ' + modeHint : '',
    '',
    'Contexto filtrado actualmente en el panel:',
    JSON.stringify({
      filters: filters,
      counts: counts
    }, null, 2),
    '',
    'Variables que deben razonarse:',
    JSON.stringify(variables, null, 2),
    '',
    'Especialidades requeridas:',
    JSON.stringify(specialties, null, 2),
    '',
    'Registros filtrados del tablero PEC:',
    JSON.stringify(request.records || [], null, 2),
    '',
    'Contrato de salida obligatorio:',
    '- Usa exactamente estas secciones en mayusculas cuando apliquen: PREGUNTA / DECISION, CONTEXTO FILTRADO ACTUALMENTE EN EL PANEL, RESUMEN EJECUTIVO, EVIDENCIA ENCONTRADA, ANALISIS, RIESGOS O ALERTAS, ACCIONES RECOMENDADAS, PREGUNTAS PENDIENTES, FUENTES Y CITAS.',
    '- Responde de forma directa la pregunta del usuario y evita introducciones largas.',
    '- En EVIDENCIA ENCONTRADA distingue claramente: evidencia del panel, evidencia web citada, evidencias locales de sesion e inferencias controladas cuando sea necesario.',
    '- Incluye matriz comparativa de tecnologias o alternativas dentro de ANALISIS si aplica (CAPEX, OPEX, energia, O&M, permisos, riesgo social, plazo, madurez, facilidad operativa).',
    '- Desarrolla el analisis por especialidad, no como simple listado: sanitaria/PTAR, O&M, ambiental/salvaguardas, social/predial, legal/contrataciones y financiera.',
    '- Ajusta el analisis al contexto Puno/Lima y separa claramente informacion 2026 vs historico.',
    '- Si counts.withoutLink o documentos sin enlace son mayores a cero, advierte expresamente que esos registros no son verificables desde Drive.',
    '- Si falta evidencia, no cierres una recomendacion tajante: marca la brecha, el supuesto y el siguiente dato requerido.',
    '- Cierra con acciones concretas, responsables sugeridos y preguntas pendientes para el siguiente corte.',
    '- Incluye fuentes/citas visibles cuando uses informacion web o mundial.'
  ].join('\n');
}

function extractOpenAiText_(response) {
  if (response.output_text) return response.output_text;
  const output = response.output || [];
  const chunks = [];
  output.forEach(item => {
    (item.content || []).forEach(content => {
      if (content.type === 'output_text' && content.text) chunks.push(content.text);
    });
  });
  return chunks.join('\n\n') || 'La respuesta no incluyo texto visible.';
}

function extractOpenAiSources_(response) {
  const sources = [];
  const seen = {};
  (response.output || []).forEach(item => {
    (item.content || []).forEach(content => {
      (content.annotations || []).forEach(annotation => {
        const citation = annotation.url_citation || annotation;
        if (!citation.url || seen[citation.url]) return;
        seen[citation.url] = true;
        sources.push({ title: citation.title || citation.url, url: citation.url });
      });
    });
  });
  return sources;
}

function setupEnvironment() {
  const root = getOrCreateRoot_();
  CONFIG.folders.forEach(path => getOrCreatePath_(root, path));
  const sheet = getOrCreateIndexSheet_();
  const seedRowsInserted = seedIndexIfEmpty_(sheet) ? CONFIG.seedRows.length : 0;
  return Object.assign(getEnvironmentStatus(), { seedRowsInserted: seedRowsInserted });
}

function scanDriveToIndex() {
  const root = getOrCreateRoot_();
  const sheet = getOrCreateIndexSheet_();
  const existing = getExistingIds_(sheet);
  const rows = [];
  scanFolder_(root, '', rows, existing);
  if (rows.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, CONFIG.headers.length).setValues(rows);
  }
  return Object.assign(getEnvironmentStatus(), { importedFiles: rows.length });
}

function syncDriveUrlsToIndex() {
  const root = getOrCreateRoot_();
  const sheet = getOrCreateIndexSheet_();
  const range = sheet.getDataRange();
  const values = range.getValues();
  if (values.length < 2) {
    return Object.assign(getEnvironmentStatus(), { updatedRows: 0, scannedFiles: 0, unmatchedFiles: 0 });
  }

  const headers = values[0].map(String);
  const idCol = headers.indexOf('id');
  const activityCol = headers.indexOf('actividad');
  const typeCol = headers.indexOf('tipo_documento');
  const urlCol = headers.indexOf('url_drive');
  const resumenCol = headers.indexOf('resumen');
  const tagsCol = headers.indexOf('tags');
  if (activityCol < 0 || urlCol < 0 || resumenCol < 0) {
    throw new Error('No se encontraron las columnas actividad, url_drive y resumen en la hoja indice.');
  }

  const rows = [];
  for (let index = 1; index < values.length; index++) {
    const row = values[index];
    const summaryPath = extractHistoricalPath_(row[resumenCol]);
    const activityKey = normalizeFileKey_(row[activityCol]);
    rows.push({
      sheetRow: index + 1,
      activityKey,
      pathKey: normalizeFileKey_(summaryPath),
      currentUrl: row[urlCol],
      values: row
    });
  }

  const driveFiles = [];
  collectDriveFiles_(root, '', driveFiles);
  const usedRows = new Set();
  let updatedRows = 0;

  driveFiles.forEach(entry => {
    const pathKey = normalizeFileKey_(entry.relativePath + '/' + entry.file.getName());
    const nameKey = normalizeFileKey_(entry.file.getName());
    let match = rows.find(candidate =>
      !usedRows.has(candidate.sheetRow) &&
      !candidate.currentUrl &&
      candidate.pathKey &&
      (pathKey.endsWith(candidate.pathKey) || candidate.pathKey.endsWith(pathKey))
    );

    if (!match) {
      const nameMatches = rows.filter(candidate =>
        !usedRows.has(candidate.sheetRow) &&
        !candidate.currentUrl &&
        candidate.activityKey === nameKey
      );
      if (nameMatches.length === 1) match = nameMatches[0];
    }

    if (!match) return;

    usedRows.add(match.sheetRow);
    sheet.getRange(match.sheetRow, urlCol + 1).setValue(entry.file.getUrl());
    if (idCol >= 0 && !match.values[idCol]) sheet.getRange(match.sheetRow, idCol + 1).setValue('FILE_' + entry.file.getId());
    if (typeCol >= 0 && !match.values[typeCol]) sheet.getRange(match.sheetRow, typeCol + 1).setValue(mimeTypeToType_(entry.file.getMimeType(), entry.file.getName()));
    if (tagsCol >= 0) {
      const currentTags = String(match.values[tagsCol] || '');
      if (!currentTags.includes('drive')) sheet.getRange(match.sheetRow, tagsCol + 1).setValue([currentTags, 'drive'].filter(Boolean).join(';'));
    }
    updatedRows++;
  });

  return Object.assign(getEnvironmentStatus(), {
    updatedRows,
    scannedFiles: driveFiles.length,
    unmatchedFiles: Math.max(driveFiles.length - updatedRows, 0)
  });
}

function organizeTiticacaFilesIntoDriveFolder() {
  const target = getOrCreatePath_(getOrCreateRoot_(), '02_Puno/APP Titicaca');
  const sheet = getOrCreateIndexSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) {
    return { targetFolderUrl: target.getUrl(), organizedFiles: 0, skippedRows: 0 };
  }

  const headers = values[0].map(String);
  const idCol = headers.indexOf('id');
  const urlCol = headers.indexOf('url_drive');
  const tagsCol = headers.indexOf('tags');
  if (urlCol < 0) throw new Error('No se encontro la columna url_drive.');

  let organizedFiles = 0;
  let skippedRows = 0;

  values.slice(1).forEach(row => {
    const id = idCol >= 0 ? String(row[idCol] || '') : '';
    const tags = tagsCol >= 0 ? String(row[tagsCol] || '') : '';
    const url = String(row[urlCol] || '');
    const isTiticacaRow = id.indexOf('APP') === 0 || tags.indexOf('historico') >= 0 || tags.indexOf('puno') >= 0;
    const fileId = extractDriveFileId_(url);
    if (!isTiticacaRow || !fileId) {
      skippedRows++;
      return;
    }

    try {
      const file = DriveApp.getFileById(fileId);
      target.addFile(file);
      organizedFiles++;
    } catch (error) {
      skippedRows++;
    }
  });

  return {
    targetFolderName: 'PEC - Programa Economia Circular/02_Puno/APP Titicaca',
    targetFolderUrl: target.getUrl(),
    organizedFiles,
    skippedRows
  };
}

function backupAndRemoveAutoScanRows() {
  const sheet = getOrCreateIndexSheet_();
  const spreadsheet = sheet.getParent();
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) {
    return Object.assign(getEnvironmentStatus(), { removedRows: 0, backupSheetName: '' });
  }

  const headers = values[0].map(String);
  const idCol = headers.indexOf('id');
  if (idCol < 0) throw new Error('No se encontro la columna id.');

  const rowsToBackup = [];
  const rowsToDelete = [];
  for (let index = 1; index < values.length; index++) {
    const id = String(values[index][idCol] || '');
    if (id.indexOf('FILE_') === 0) {
      rowsToBackup.push(values[index]);
      rowsToDelete.push(index + 1);
    }
  }

  if (!rowsToDelete.length) {
    return Object.assign(getEnvironmentStatus(), { removedRows: 0, backupSheetName: '' });
  }

  const backupSheetName = 'backup_FILE_rows_' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
  const backupSheet = spreadsheet.insertSheet(backupSheetName);
  backupSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  backupSheet.getRange(2, 1, rowsToBackup.length, headers.length).setValues(rowsToBackup);

  rowsToDelete.reverse().forEach(rowNumber => sheet.deleteRow(rowNumber));

  return Object.assign(getEnvironmentStatus(), {
    removedRows: rowsToDelete.length,
    backupSheetName
  });
}

function getEnvironmentStatus() {
  const loaderConfig = getLoaderEnvironmentConfig_();
  const rootState = resolveLoaderRootFolder_({ createIfMissing: false, persist: false });
  const sheetState = resolveLoaderSpreadsheet_({ createIfMissing: false, persist: false });
  const records = sheetState.spreadsheet ? getRecords_() : [];
  return {
    rootFolderName: CONFIG.rootFolderName,
    rootFolderId: rootState.folder ? rootState.folder.getId() : '',
    rootFolderUrl: rootState.folder ? rootState.folder.getUrl() : '',
    rootFolderSource: rootState.source || '',
    configuredRootFolderId: loaderConfig.rootFolderId || '',
    spreadsheetName: CONFIG.sheetName,
    spreadsheetId: sheetState.spreadsheet ? sheetState.spreadsheet.getId() : '',
    spreadsheetUrl: sheetState.spreadsheet ? sheetState.spreadsheet.getUrl() : '',
    spreadsheetSource: sheetState.source || '',
    configuredSpreadsheetId: loaderConfig.spreadsheetId || '',
    indexTabName: CONFIG.indexTabName,
    seedExampleRowsEnabled: loaderConfig.seedExampleRows,
    records: records.length,
    webJsonHint: ScriptApp.getService().getUrl() ? ScriptApp.getService().getUrl() + '?format=json' : 'Deploy as Web App first',
    webCsvHint: ScriptApp.getService().getUrl() ? ScriptApp.getService().getUrl() + '?format=csv' : 'Deploy as Web App first'
  };
}

function getRecords_() {
  const sheet = getOrCreateIndexSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(String);
  return values.slice(1).filter(row => row.some(Boolean)).map(row => {
    const out = {};
    headers.forEach((header, index) => out[header] = row[index] == null ? '' : String(row[index]));
    return out;
  });
}

function getOrCreateRoot_() {
  return resolveLoaderRootFolder_({ createIfMissing: true, persist: true }).folder;
}

function getOrCreatePath_(root, path) {
  return path.split('/').reduce((folder, name) => {
    const children = folder.getFoldersByName(name);
    return children.hasNext() ? children.next() : folder.createFolder(name);
  }, root);
}

function findFolderByName_(name) {
  const folders = DriveApp.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : null;
}

function findSpreadsheetByName_(name) {
  const files = DriveApp.getFilesByName(name);
  while (files.hasNext()) {
    const file = files.next();
    if (file.getMimeType() === MimeType.GOOGLE_SHEETS) return SpreadsheetApp.openById(file.getId());
  }
  return null;
}

function getOrCreateIndexSheet_() {
  const spreadsheet = resolveLoaderSpreadsheet_({ createIfMissing: true, persist: true }).spreadsheet;
  const sheet = spreadsheet.getSheetByName(CONFIG.indexTabName) || spreadsheet.insertSheet(CONFIG.indexTabName);
  if (sheet.getLastRow() === 0) sheet.appendRow(CONFIG.headers);
  const currentHeaders = sheet.getRange(1, 1, 1, CONFIG.headers.length).getValues()[0];
  if (currentHeaders.join('|') !== CONFIG.headers.join('|')) {
    sheet.getRange(1, 1, 1, CONFIG.headers.length).setValues([CONFIG.headers]);
  }
  return sheet;
}

function seedIndexIfEmpty_(sheet) {
  if (!shouldSeedLoaderExampleRows_()) return false;
  if (sheet.getLastRow() > 1) return;
  sheet.getRange(2, 1, CONFIG.seedRows.length, CONFIG.headers.length).setValues(CONFIG.seedRows);
  return true;
}

function setLoaderResourceIds(rootFolderId, spreadsheetId) {
  const props = PropertiesService.getScriptProperties();
  const safeRootFolderId = String(rootFolderId == null ? '' : rootFolderId).trim();
  const safeSpreadsheetId = String(spreadsheetId == null ? '' : spreadsheetId).trim();
  if (safeRootFolderId) {
    const folder = DriveApp.getFolderById(safeRootFolderId);
    props.setProperty(LOADER_PROPERTY_KEYS.rootFolderId, folder.getId());
  } else if (rootFolderId === '') {
    props.deleteProperty(LOADER_PROPERTY_KEYS.rootFolderId);
  }
  if (safeSpreadsheetId) {
    const spreadsheet = SpreadsheetApp.openById(safeSpreadsheetId);
    props.setProperty(LOADER_PROPERTY_KEYS.spreadsheetId, spreadsheet.getId());
  } else if (spreadsheetId === '') {
    props.deleteProperty(LOADER_PROPERTY_KEYS.spreadsheetId);
  }
  return getEnvironmentStatus();
}

function setLoaderSeedExampleRows(enabled) {
  const parsed = parseBooleanFlag_(enabled, null);
  if (parsed == null) {
    throw new Error('El valor de seedExampleRows debe ser true o false.');
  }
  PropertiesService.getScriptProperties().setProperty(LOADER_PROPERTY_KEYS.seedExampleRows, parsed ? 'true' : 'false');
  return getEnvironmentStatus();
}

function getLoaderEnvironmentConfig_() {
  const props = PropertiesService.getScriptProperties();
  return {
    rootFolderId: String(props.getProperty(LOADER_PROPERTY_KEYS.rootFolderId) || '').trim(),
    spreadsheetId: String(props.getProperty(LOADER_PROPERTY_KEYS.spreadsheetId) || '').trim(),
    seedExampleRows: parseBooleanFlag_(props.getProperty(LOADER_PROPERTY_KEYS.seedExampleRows), false)
  };
}

function shouldSeedLoaderExampleRows_() {
  return getLoaderEnvironmentConfig_().seedExampleRows;
}

function resolveLoaderRootFolder_(options) {
  const settings = options && typeof options === 'object' ? options : {};
  const createIfMissing = Boolean(settings.createIfMissing);
  const persist = settings.persist !== false;
  const configuredId = getLoaderEnvironmentConfig_().rootFolderId;
  if (configuredId) {
    try {
      const folderById = DriveApp.getFolderById(configuredId);
      if (persist) persistLoaderRootFolderId_(folderById);
      return { folder: folderById, source: 'script_property_id' };
    } catch (error) {}
  }
  const namedFolder = findFolderByName_(CONFIG.rootFolderName);
  if (namedFolder) {
    if (persist) persistLoaderRootFolderId_(namedFolder);
    return { folder: namedFolder, source: 'name_match' };
  }
  if (!createIfMissing) return { folder: null, source: '' };
  const createdFolder = DriveApp.createFolder(CONFIG.rootFolderName);
  if (persist) persistLoaderRootFolderId_(createdFolder);
  return { folder: createdFolder, source: 'created' };
}

function resolveLoaderSpreadsheet_(options) {
  const settings = options && typeof options === 'object' ? options : {};
  const createIfMissing = Boolean(settings.createIfMissing);
  const persist = settings.persist !== false;
  const configuredId = getLoaderEnvironmentConfig_().spreadsheetId;
  if (configuredId) {
    try {
      const spreadsheetById = SpreadsheetApp.openById(configuredId);
      if (persist) persistLoaderSpreadsheetId_(spreadsheetById);
      return { spreadsheet: spreadsheetById, source: 'script_property_id' };
    } catch (error) {}
  }
  const namedSpreadsheet = findSpreadsheetByName_(CONFIG.sheetName);
  if (namedSpreadsheet) {
    if (persist) persistLoaderSpreadsheetId_(namedSpreadsheet);
    return { spreadsheet: namedSpreadsheet, source: 'name_match' };
  }
  if (!createIfMissing) return { spreadsheet: null, source: '' };
  const createdSpreadsheet = SpreadsheetApp.create(CONFIG.sheetName);
  if (persist) persistLoaderSpreadsheetId_(createdSpreadsheet);
  return { spreadsheet: createdSpreadsheet, source: 'created' };
}

function persistLoaderRootFolderId_(folder) {
  if (!folder || !folder.getId) return;
  PropertiesService.getScriptProperties().setProperty(LOADER_PROPERTY_KEYS.rootFolderId, folder.getId());
}

function persistLoaderSpreadsheetId_(spreadsheet) {
  if (!spreadsheet || !spreadsheet.getId) return;
  PropertiesService.getScriptProperties().setProperty(LOADER_PROPERTY_KEYS.spreadsheetId, spreadsheet.getId());
}

function parseBooleanFlag_(value, fallback) {
  if (value == null || value === '') return fallback;
  const normalized = String(value).trim().toLowerCase();
  if (['1', 'true', 'yes', 'si', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false;
  return fallback;
}

function getExistingIds_(sheet) {
  if (sheet.getLastRow() < 2) return new Set();
  return new Set(sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues().flat().filter(Boolean));
}

function scanFolder_(folder, relativePath, rows, existing) {
  if (rows.length >= CONFIG.maxFilesPerScan) return;
  const files = folder.getFiles();
  while (files.hasNext() && rows.length < CONFIG.maxFilesPerScan) {
    const file = files.next();
    const id = 'FILE_' + file.getId();
    if (!existing.has(id)) rows.push(fileToRow_(file, relativePath));
  }
  const folders = folder.getFolders();
  while (folders.hasNext() && rows.length < CONFIG.maxFilesPerScan) {
    const child = folders.next();
    const path = relativePath ? relativePath + '/' + child.getName() : child.getName();
    scanFolder_(child, path, rows, existing);
  }
}

function collectDriveFiles_(folder, relativePath, rows) {
  if (rows.length >= CONFIG.maxFilesPerScan) return;
  const files = folder.getFiles();
  while (files.hasNext() && rows.length < CONFIG.maxFilesPerScan) {
    const file = files.next();
    if (file.getMimeType() !== MimeType.GOOGLE_SHEETS || file.getName() !== CONFIG.sheetName) {
      rows.push({ file, relativePath });
    }
  }
  const folders = folder.getFolders();
  while (folders.hasNext() && rows.length < CONFIG.maxFilesPerScan) {
    const child = folders.next();
    const path = relativePath ? relativePath + '/' + child.getName() : child.getName();
    collectDriveFiles_(child, path, rows);
  }
}

function fileToRow_(file, relativePath) {
  const inferred = inferMetadata_(relativePath, file.getName(), file.getMimeType());
  return [
    'FILE_' + file.getId(),
    '',
    file.getName(),
    inferred.macro,
    inferred.territorio,
    inferred.categoria,
    '',
    formatDate_(file.getDateCreated()),
    formatDate_(file.getLastUpdated()),
    '',
    '',
    '',
    inferred.tipo,
    inferred.tecnologia,
    '',
    inferred.criterio,
    '',
    file.getUrl(),
    'Documento importado automaticamente desde Drive: ' + relativePath,
    inferred.tags
  ];
}

function inferMetadata_(path, name, mimeType) {
  const lower = (path + '/' + name).toLowerCase();
  const macro = lower.includes('comparacion') || lower.includes('tecnologia') ? 'Comparacion tecnologias'
    : lower.includes('donacion') ? 'Donacion preparatoria'
    : lower.includes('efectividad') || lower.includes('prestamo') ? 'Efectividad del prestamo'
    : 'Repositorio documental';
  const territorio = lower.includes('puno') ? 'Puno' : lower.includes('lima') ? 'Lima' : 'Puno y Lima';
  const tecnologia = lower.includes('mbr') ? 'MBR'
    : lower.includes('sbr') ? 'SBR'
    : lower.includes('laguna') ? 'Lagunas / PTAR'
    : lower.includes('lodos') ? 'Lodos Activados'
    : '';
  const tipo = mimeTypeToType_(mimeType, name);
  const categoria = tecnologia ? 'Tecnologia'
    : lower.includes('legal') || lower.includes('convenio') ? 'Legal / Convenios'
    : lower.includes('ambiental') ? 'Ambiental'
    : 'Documento';
  return {
    macro,
    territorio,
    categoria,
    tipo,
    tecnologia,
    criterio: tecnologia ? 'evidencia documental' : '',
    tags: [macro, territorio, categoria, tecnologia, tipo].filter(Boolean).join(';')
  };
}

function extractHistoricalPath_(summary) {
  const text = String(summary || '');
  const match = text.match(/Archivo historico:\s*(.*?)\s*\|\s*Tamano/i);
  return match ? match[1] : '';
}

function normalizeFileKey_(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\\/g, '/')
    .replace(/\.[a-z0-9]+$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9/]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\/+/g, '/')
    .trim();
}

function extractDriveFileId_(url) {
  const text = String(url || '');
  const patterns = [
    /\/d\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
    /\/file\/d\/([a-zA-Z0-9_-]+)/
  ];
  for (let index = 0; index < patterns.length; index++) {
    const match = text.match(patterns[index]);
    if (match) return match[1];
  }
  return '';
}

function mimeTypeToType_(mimeType, name) {
  const lowerName = name.toLowerCase();
  if (mimeType === MimeType.PDF || lowerName.endsWith('.pdf')) return 'PDF';
  if (mimeType === MimeType.GOOGLE_SHEETS || lowerName.match(/\.xlsx?$/)) return 'Excel / Sheet';
  if (mimeType === MimeType.GOOGLE_DOCS || lowerName.match(/\.docx?$/)) return 'Word / Doc';
  if (mimeType.indexOf('image/') === 0) return 'Imagen';
  if (lowerName.match(/\.(dwg|dxf)$/)) return 'Plano';
  return 'Archivo';
}

function formatDate_(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

function recordsToCsv(records) {
  const rows = [CONFIG.headers].concat(records.map(record => CONFIG.headers.map(header => record[header] || '')));
  return rows.map(row => row.map(csvEscape_).join(',')).join('\n');
}

function csvEscape_(value) {
  const text = String(value == null ? '' : value);
  return /[",\n\r]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
}

function renderSharedVisor_() {
  const template = HtmlService.createTemplateFromFile('Visor');
  template.visorBootstrapJson = JSON.stringify(getSharedTrackingState());
  return template
    .evaluate()
    .setTitle('Visor de Seguimiento PEC')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getSharedTrackingState() {
  const state = loadSharedTrackingState_();
  return buildSharedTrackingEnvelope_(state);
}

function getSharedTrackingPublicState() {
  const state = loadSharedTrackingState_();
  const safeState = buildSharedTrackingPublicState_(state);
  return buildSharedTrackingEnvelope_(safeState, {
    actor: '',
    actorVerified: false,
    actorSource: 'public_view',
    declaredActor: '',
    analytics: buildSharedTrackingAnalyticalSummary_(state, {}),
    backend: buildSharedTrackingPublicBackendMeta_()
  });
}

function saveSharedTrackingState(bundle, actorName, action) {
  const previous = loadSharedTrackingState_();
  const actorInfo = resolveSharedTrackingPermissionContext_(actorName);
  if (!actorInfo.canEditShared) {
    return buildSharedTrackingPermissionDeniedEnvelope_(
      previous,
      actorInfo,
      actorInfo.reasonCode === 'declared_actor_only'
        ? 'El actor fue declarado por URL. Puedes consultar el visor, pero la edición compartida requiere correo verificado y permiso operativo.'
        : 'No se pudo autorizar el guardado compartido. Inicia sesión con una cuenta Google autorizada para editar el visor.',
      {
        action: 'intento_guardar_estado_bloqueado',
        origin: String(action || 'guardar_estado_compartido')
      }
    );
  }
  const requestedRevision = Number(bundle && bundle.revision || 0);
  if (requestedRevision < Number(previous.revision || 0)) {
    const conflictActor = buildAuditActorMeta_(actorInfo);
    appendSharedTrackingAudit_({
      at: new Date().toISOString(),
      actor: conflictActor.actor,
      actorEmail: conflictActor.actorEmail,
      actorSource: conflictActor.actorSource,
      actorVerified: conflictActor.actorVerified,
      declaredActor: conflictActor.declaredActor,
      action: 'conflicto_guardado',
      origin: String(action || 'guardar_estado_compartido'),
      revision: Number(previous.revision || 0),
      requestedRevision: requestedRevision,
      message: 'Se detectó una versión más reciente del estado compartido y no se sobrescribieron los cambios.',
      sourceMode: previous.sourceMode || '',
      records: previous.payload && Array.isArray(previous.payload.records) ? previous.payload.records.length : 0
    });
    return buildSharedTrackingEnvelope_(previous, {
      ok: false,
      conflict: true,
      message: 'El estado compartido cambió desde tu última sincronización. Revisa la versión más reciente antes de volver a guardar.',
      requestedRevision: requestedRevision,
      currentRevision: Number(previous.revision || 0),
      actor: conflictActor.actor,
      actorVerified: conflictActor.actorVerified,
      actorSource: conflictActor.actorSource,
      declaredActor: conflictActor.declaredActor,
      backend: getSharedTrackingBackendMeta_(actorInfo)
    });
  }
  writeSharedTrackingSnapshot_(previous, actorInfo, String(action || 'guardar_estado_compartido'), 'before_save');
  const next = normalizeSharedTrackingStateBundle_(bundle, previous);
  next.revision = Number(previous.revision || 0) + 1;
  next.savedAt = new Date().toISOString();
  next.savedBy = actorInfo.actor;
  writeSharedTrackingState_(next);
  appendSharedTrackingAudit_(buildSharedTrackingAuditEntry_(previous, next, actorInfo, action, requestedRevision));
  writeSharedTrackingBackup_(next);
  return buildSharedTrackingEnvelope_(next, {
    actor: actorInfo.actor,
    actorVerified: actorInfo.verified,
    actorSource: actorInfo.source,
    declaredActor: actorInfo.declaredActor,
    backend: getSharedTrackingBackendMeta_(actorInfo)
  });
}

function withSharedTrackingAttachmentMutationLock_(state, actorInfo, origin, callback) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
  } catch (error) {
    const currentState = loadSharedTrackingState_();
    const actorMeta = buildAuditActorMeta_(actorInfo);
    if (actorMeta.actor || actorMeta.actorEmail || actorMeta.declaredActor) {
      appendSharedTrackingAudit_({
        at: new Date().toISOString(),
        actor: actorMeta.actor,
        actorEmail: actorMeta.actorEmail,
        actorSource: actorMeta.actorSource,
        actorVerified: actorMeta.actorVerified,
        declaredActor: actorMeta.declaredActor,
        action: 'conflicto_sustento_en_curso',
        origin: String(origin || 'mutacion_sustento').trim() || 'mutacion_sustento',
        permissionRole: String(actorInfo && actorInfo.permissionRole || 'viewer').trim() || 'viewer',
        message: 'Otra operación documental sigue en curso para el visor compartido. Intenta nuevamente en unos segundos.'
      });
    }
    return buildSharedTrackingEnvelope_(currentState, {
      ok: false,
      busy: true,
      actor: actorMeta.actor,
      actorVerified: actorMeta.actorVerified,
      actorSource: actorMeta.actorSource,
      declaredActor: actorMeta.declaredActor,
      message: 'Otra operación documental sigue en curso. Intenta nuevamente en unos segundos.',
      backend: getSharedTrackingBackendMeta_(actorInfo)
    });
  }
  try {
    return callback();
  } finally {
    try {
      lock.releaseLock();
    } catch (error) {}
  }
}

function buildSharedTrackingAttachmentMergeKey_(value) {
  const attachment = normalizeSharedTrackingAttachmentMeta_(value);
  if (!attachment) return '';
  return String(attachment.fileId || attachment.id || attachment.url || attachment.name || '').trim();
}

function mergeSharedTrackingAttachmentList_(currentValues, nextValues) {
  const merged = [];
  const indexByKey = {};
  normalizeSharedTrackingAttachmentList_(currentValues).forEach(function(item) {
    const key = buildSharedTrackingAttachmentMergeKey_(item);
    if (!key || Object.prototype.hasOwnProperty.call(indexByKey, key)) return;
    indexByKey[key] = merged.length;
    merged.push(item);
  });
  normalizeSharedTrackingAttachmentList_(nextValues).forEach(function(item) {
    const key = buildSharedTrackingAttachmentMergeKey_(item);
    if (!key) return;
    if (Object.prototype.hasOwnProperty.call(indexByKey, key)) {
      merged[indexByKey[key]] = item;
      return;
    }
    indexByKey[key] = merged.length;
    merged.push(item);
  });
  return normalizeSharedTrackingAttachmentList_(merged);
}

function uploadSharedTrackingAttachments(recordId, uploads, actorName) {
  const previous = loadSharedTrackingState_();
  const actorInfo = resolveSharedTrackingPermissionContext_(actorName);
  if (!actorInfo.canManageAttachments) {
    return buildSharedTrackingPermissionDeniedEnvelope_(
      previous,
      actorInfo,
      actorInfo.reasonCode === 'declared_actor_only'
        ? 'El actor fue declarado por URL. Puedes consultar el visor, pero la carga de sustento requiere correo verificado y permiso operativo.'
        : 'No se pudo autorizar la carga de sustento. Inicia sesión con una cuenta Google autorizada para esta operación.',
      {
        action: 'intento_cargar_sustento_bloqueado',
        origin: 'cargar_sustento'
      }
    );
  }
  const safeRecordId = String(recordId || '').trim();
  if (!safeRecordId) {
    return buildSharedTrackingEnvelope_(previous, {
      ok: false,
      message: 'No se identificó el bloque o la subactividad donde se cargará el sustento.',
      actor: actorInfo.actor,
      actorVerified: actorInfo.verified,
      actorSource: actorInfo.source,
      declaredActor: actorInfo.declaredActor,
      backend: getSharedTrackingBackendMeta_(actorInfo)
    });
  }
  const safeUploads = normalizeSharedTrackingUploadPayload_(uploads);
  if (!safeUploads.length) {
    return buildSharedTrackingEnvelope_(previous, {
      ok: false,
      message: 'Selecciona al menos un archivo antes de cargar sustento en el visor.',
      actor: actorInfo.actor,
      actorVerified: actorInfo.verified,
      actorSource: actorInfo.source,
      declaredActor: actorInfo.declaredActor,
      backend: getSharedTrackingBackendMeta_(actorInfo)
    });
  }
  if (safeUploads.length > 6) {
    return buildSharedTrackingEnvelope_(previous, {
      ok: false,
      message: 'La carga múltiple admite hasta 6 archivos por operación para proteger la estabilidad del visor compartido.',
      actor: actorInfo.actor,
      actorVerified: actorInfo.verified,
      actorSource: actorInfo.source,
      declaredActor: actorInfo.declaredActor,
      backend: getSharedTrackingBackendMeta_(actorInfo)
    });
  }
  var totalBytes = 0;
  for (var index = 0; index < safeUploads.length; index += 1) {
    var item = safeUploads[index];
    totalBytes += Number(item.size || 0);
    if (Number(item.size || 0) > 5 * 1024 * 1024) {
      return buildSharedTrackingEnvelope_(previous, {
        ok: false,
        message: 'Cada sustento debe pesar como máximo 5 MB en esta versión del visor compartido. Archivo rechazado: ' + item.name,
        actor: actorInfo.actor,
        actorVerified: actorInfo.verified,
        actorSource: actorInfo.source,
        declaredActor: actorInfo.declaredActor,
        backend: getSharedTrackingBackendMeta_(actorInfo)
      });
    }
  }
  if (totalBytes > 12 * 1024 * 1024) {
    return buildSharedTrackingEnvelope_(previous, {
      ok: false,
      message: 'La carga total de sustento no puede superar 12 MB por operación en esta versión del visor compartido.',
      actor: actorInfo.actor,
      actorVerified: actorInfo.verified,
      actorSource: actorInfo.source,
      declaredActor: actorInfo.declaredActor,
      backend: getSharedTrackingBackendMeta_(actorInfo)
    });
  }
  return withSharedTrackingAttachmentMutationLock_(previous, actorInfo, 'cargar_sustento', function() {
    const latest = loadSharedTrackingState_();
    writeSharedTrackingSnapshot_(latest, actorInfo, 'cargar_sustento', 'before_mutation');
    const recordMeta = getSharedTrackingRecordMetaForState_(latest, safeRecordId);
    const noteEntry = normalizeSharedTrackingNoteEntry_(latest.notes && latest.notes[safeRecordId]);
    const folder = getOrCreateBackendRecordAttachmentFolder_(recordMeta);
    const folderMeta = buildSharedTrackingAttachmentFolderMeta_(folder, recordMeta, actorInfo, noteEntry.attachmentFolder);
    const uploadedAt = new Date().toISOString();
    const uploaded = safeUploads.map(function(upload) {
      const storedName = buildSharedTrackingStoredAttachmentName_(upload.name);
      const file = folder.createFile(Utilities.newBlob(Utilities.base64Decode(upload.contentBase64), upload.mimeType || 'application/octet-stream', storedName));
      try {
        file.setDescription([
          'Visor PEC',
          'Registro: ' + safeRecordId,
          recordMeta && recordMeta.label ? ('Etiqueta: ' + recordMeta.label) : '',
          'Actor: ' + actorInfo.actor,
          'Fecha: ' + uploadedAt
        ].filter(Boolean).join(' | '));
      } catch (error) {}
      return {
        id: Utilities.getUuid(),
        name: upload.name,
        mimeType: String(file.getMimeType() || upload.mimeType || 'application/octet-stream'),
        size: Number(upload.size || file.getSize() || 0),
        fileId: file.getId(),
        folderId: folderMeta && folderMeta.folderId ? folderMeta.folderId : '',
        folderUrl: folderMeta && folderMeta.folderUrl ? folderMeta.folderUrl : '',
        url: file.getUrl(),
        logicalPath: buildSharedTrackingLogicalPath_(folderMeta && folderMeta.folderName ? folderMeta.folderName : '', storedName),
        documentType: normalizeSharedTrackingDocumentType_(upload.documentType),
        status: 'active',
        uploadedAt: uploadedAt,
        uploadedBy: actorInfo.actor,
        uploadedByEmail: String(actorInfo.email || '').trim(),
        actorSource: String(actorInfo.source || '').trim(),
        actorVerified: Boolean(actorInfo.verified),
        removedAt: '',
        removedBy: '',
        removedReason: ''
      };
    });
    const nextNotes = Object.assign({}, latest.notes || {});
    const nextNoteEntry = Object.assign({}, noteEntry, {
      attachmentFolder: folderMeta,
      attachments: mergeSharedTrackingAttachmentList_(noteEntry.attachments || [], uploaded)
    });
    nextNotes[safeRecordId] = nextNoteEntry;
    const next = normalizeSharedTrackingStateBundle_(Object.assign({}, latest, { notes: nextNotes }), latest);
    next.revision = Number(latest.revision || 0) + 1;
    next.savedAt = uploadedAt;
    next.savedBy = actorInfo.actor;
    writeSharedTrackingState_(next);
    appendSharedTrackingAudit_(buildSharedTrackingAttachmentAuditEntry_(actorInfo, 'cargar_sustento', recordMeta, uploaded, next));
    writeSharedTrackingBackup_(next);
    return buildSharedTrackingEnvelope_(next, {
      actor: actorInfo.actor,
      actorVerified: actorInfo.verified,
      actorSource: actorInfo.source,
      declaredActor: actorInfo.declaredActor,
      message: uploaded.length === 1
        ? 'Se cargó 1 sustento en ' + (recordMeta.label || safeRecordId) + '.'
        : 'Se cargaron ' + uploaded.length + ' sustento(s) en ' + (recordMeta.label || safeRecordId) + '.',
      backend: getSharedTrackingBackendMeta_(actorInfo)
    });
  });
}

function ensureSharedTrackingAttachmentFolder(recordId, actorName) {
  const previous = loadSharedTrackingState_();
  const actorInfo = resolveSharedTrackingPermissionContext_(actorName);
  if (!actorInfo.canManageAttachments) {
    return buildSharedTrackingPermissionDeniedEnvelope_(
      previous,
      actorInfo,
      actorInfo.reasonCode === 'declared_actor_only'
        ? 'El actor fue declarado por URL. Puedes consultar el visor, pero preparar la carpeta de sustento requiere correo verificado y permiso operativo.'
        : 'No se pudo autorizar la preparación de la carpeta de sustento para este registro.',
      {
        action: 'intento_preparar_carpeta_sustento_bloqueado',
        origin: 'preparar_carpeta_sustento'
      }
    );
  }
  const safeRecordId = String(recordId || '').trim();
  if (!safeRecordId) {
    return buildSharedTrackingEnvelope_(previous, {
      ok: false,
      message: 'No se identificó el bloque o la subactividad para preparar su carpeta de sustento.',
      actor: actorInfo.actor,
      actorVerified: actorInfo.verified,
      actorSource: actorInfo.source,
      declaredActor: actorInfo.declaredActor,
      backend: getSharedTrackingBackendMeta_(actorInfo)
    });
  }
  return withSharedTrackingAttachmentMutationLock_(previous, actorInfo, 'preparar_carpeta_sustento', function() {
    const latest = loadSharedTrackingState_();
    writeSharedTrackingSnapshot_(latest, actorInfo, 'preparar_carpeta_sustento', 'before_mutation');
    const recordMeta = getSharedTrackingRecordMetaForState_(latest, safeRecordId);
    const noteEntry = normalizeSharedTrackingNoteEntry_(latest.notes && latest.notes[safeRecordId]);
    const folder = getOrCreateBackendRecordAttachmentFolder_(recordMeta);
    const folderMeta = buildSharedTrackingAttachmentFolderMeta_(folder, recordMeta, actorInfo, noteEntry.attachmentFolder);
    const currentFolderId = String(noteEntry.attachmentFolder && noteEntry.attachmentFolder.folderId || '').trim();
    if (currentFolderId === folderMeta.folderId) {
      return buildSharedTrackingEnvelope_(latest, {
        actor: actorInfo.actor,
        actorVerified: actorInfo.verified,
        actorSource: actorInfo.source,
        declaredActor: actorInfo.declaredActor,
        message: 'La carpeta de sustento ya estaba preparada para ' + (recordMeta.label || safeRecordId) + '.',
        backend: getSharedTrackingBackendMeta_(actorInfo)
      });
    }
    const nextNotes = Object.assign({}, latest.notes || {});
    nextNotes[safeRecordId] = Object.assign({}, noteEntry, {
      attachmentFolder: folderMeta
    });
    const next = normalizeSharedTrackingStateBundle_(Object.assign({}, latest, { notes: nextNotes }), latest);
    next.revision = Number(latest.revision || 0) + 1;
    next.savedAt = new Date().toISOString();
    next.savedBy = actorInfo.actor;
    writeSharedTrackingState_(next);
    appendSharedTrackingAudit_(buildSharedTrackingAttachmentFolderAuditEntry_(actorInfo, recordMeta, folderMeta, next));
    writeSharedTrackingBackup_(next);
    return buildSharedTrackingEnvelope_(next, {
      actor: actorInfo.actor,
      actorVerified: actorInfo.verified,
      actorSource: actorInfo.source,
      declaredActor: actorInfo.declaredActor,
      message: 'La carpeta de sustento quedó preparada para ' + (recordMeta.label || safeRecordId) + '.',
      backend: getSharedTrackingBackendMeta_(actorInfo)
    });
  });
}

function deleteSharedTrackingAttachment(recordId, attachmentId, actorName, removedReason) {
  const previous = loadSharedTrackingState_();
  const actorInfo = resolveSharedTrackingPermissionContext_(actorName);
  if (!actorInfo.canRemoveAttachments) {
    return buildSharedTrackingPermissionDeniedEnvelope_(
      previous,
      actorInfo,
      actorInfo.reasonCode === 'declared_actor_only'
        ? 'El actor fue declarado por URL. Puedes consultar el visor, pero retirar sustento requiere correo verificado y permiso operativo.'
        : 'No se pudo autorizar el retiro de sustento de este registro.',
      {
        action: 'intento_retirar_sustento_bloqueado',
        origin: 'retirar_sustento'
      }
    );
  }
  const safeRecordId = String(recordId || '').trim();
  const safeAttachmentId = String(attachmentId || '').trim();
  if (!safeRecordId || !safeAttachmentId) {
    return buildSharedTrackingEnvelope_(previous, {
      ok: false,
      message: 'No se identificó el sustento que debe retirarse del visor compartido.',
      actor: actorInfo.actor,
      actorVerified: actorInfo.verified,
      actorSource: actorInfo.source,
      declaredActor: actorInfo.declaredActor,
      backend: getSharedTrackingBackendMeta_(actorInfo)
    });
  }
  return withSharedTrackingAttachmentMutationLock_(previous, actorInfo, 'retirar_sustento', function() {
    const latest = loadSharedTrackingState_();
    writeSharedTrackingSnapshot_(latest, actorInfo, 'retirar_sustento', 'before_mutation');
    const noteEntry = normalizeSharedTrackingNoteEntry_(latest.notes && latest.notes[safeRecordId]);
    const attachments = Array.isArray(noteEntry.attachments) ? noteEntry.attachments.slice() : [];
    const targetIndex = attachments.findIndex(function(item) {
      return String(item && item.id || '').trim() === safeAttachmentId;
    });
    if (targetIndex < 0) {
      return buildSharedTrackingEnvelope_(latest, {
        ok: false,
        message: 'El sustento solicitado ya no está disponible en esta ficha.',
        actor: actorInfo.actor,
        actorVerified: actorInfo.verified,
        actorSource: actorInfo.source,
        declaredActor: actorInfo.declaredActor,
        backend: getSharedTrackingBackendMeta_(actorInfo)
      });
    }
    const currentRemoved = normalizeSharedTrackingAttachmentMeta_(attachments[targetIndex]);
    if (currentRemoved && currentRemoved.status === 'removed') {
      return buildSharedTrackingEnvelope_(latest, {
        ok: false,
        message: 'El sustento solicitado ya fue retirado previamente de esta ficha.',
        actor: actorInfo.actor,
        actorVerified: actorInfo.verified,
        actorSource: actorInfo.source,
        declaredActor: actorInfo.declaredActor,
        backend: getSharedTrackingBackendMeta_(actorInfo)
      });
    }
    const removalStamp = new Date().toISOString();
    const safeRemovedReason = String(removedReason || '').trim() || 'Retirado desde el visor compartido';
    const removed = Object.assign({}, currentRemoved || {}, {
      status: 'removed',
      removedAt: removalStamp,
      removedBy: String(actorInfo.actor || '').trim(),
      removedReason: safeRemovedReason
    });
    attachments[targetIndex] = removed;
    const nextNotes = Object.assign({}, latest.notes || {});
    if (attachments.length || String(noteEntry.note || '').trim() || String(noteEntry.action || '').trim() || hasSharedTrackingAttachmentFolderMeta_(noteEntry.attachmentFolder)) {
      nextNotes[safeRecordId] = Object.assign({}, noteEntry, {
        attachments: normalizeSharedTrackingAttachmentList_(attachments)
      });
    } else {
      delete nextNotes[safeRecordId];
    }
    const next = normalizeSharedTrackingStateBundle_(Object.assign({}, latest, { notes: nextNotes }), latest);
    next.revision = Number(latest.revision || 0) + 1;
    next.savedAt = removalStamp;
    next.savedBy = actorInfo.actor;
    const recordMeta = getSharedTrackingRecordMetaForState_(latest, safeRecordId);
    writeSharedTrackingState_(next);
    if (removed && removed.fileId) {
      try {
        DriveApp.getFileById(String(removed.fileId)).setTrashed(true);
      } catch (error) {}
    }
    appendSharedTrackingAudit_(buildSharedTrackingAttachmentAuditEntry_(actorInfo, 'retirar_sustento', recordMeta, [removed], next));
    writeSharedTrackingBackup_(next);
    return buildSharedTrackingEnvelope_(next, {
      actor: actorInfo.actor,
      actorVerified: actorInfo.verified,
      actorSource: actorInfo.source,
      declaredActor: actorInfo.declaredActor,
      message: 'Se retiró el sustento ' + String(removed && removed.name || 'seleccionado') + ' de ' + (recordMeta.label || safeRecordId) + '.',
      backend: getSharedTrackingBackendMeta_(actorInfo)
    });
  });
}

function getSharedTrackingAudit(limit) {
  const permission = resolveSharedTrackingPermissionContext_('');
  if (!permission.canViewSensitiveAudit) {
    if (permission.actor || permission.email || permission.declaredActor) {
      appendSharedTrackingAudit_({
        at: new Date().toISOString(),
        actor: String(permission.actor || '').trim(),
        actorEmail: String(permission.email || '').trim(),
        actorSource: String(permission.source || 'missing').trim() || 'missing',
        actorVerified: Boolean(permission.verified),
        declaredActor: String(permission.declaredActor || '').trim(),
        action: 'intento_ver_auditoria_bloqueado',
        origin: 'visor_audit',
        permissionRole: String(permission.permissionRole || 'viewer'),
        reasonCode: String(permission.reasonCode || ''),
        message: 'La auditoría detallada solo está disponible para administradores verificados del visor compartido.'
      });
    }
    return {
      ok: false,
      permissionDenied: true,
      actor: String(permission.actor || '').trim(),
      actorVerified: Boolean(permission.verified),
      actorSource: String(permission.source || 'missing').trim() || 'missing',
      declaredActor: String(permission.declaredActor || '').trim(),
      admin: false,
      message: 'La auditoría detallada solo está disponible para administradores verificados del visor compartido.',
      backend: getSharedTrackingBackendMeta_(permission)
    };
  }
  return {
    ok: true,
    actor: String(permission.actor || '').trim(),
    actorVerified: Boolean(permission.verified),
    actorSource: String(permission.source || 'missing').trim() || 'missing',
    declaredActor: String(permission.declaredActor || '').trim(),
    admin: Boolean(permission.isAdmin),
    items: loadSharedTrackingAudit_().slice(0, Math.max(1, Number(limit || 100))),
    backend: getSharedTrackingBackendMeta_(permission)
  };
}

function getSharedTrackingDailyAuditReport(date, limit) {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      actorVerified: Boolean(getSharedTrackingActor_()),
      actorSource: getSharedTrackingActor_() ? 'session_email' : 'missing',
      admin: false,
      message: 'No autorizado para ver el reporte diario de cambios.'
    };
  }
  const timezone = Session.getScriptTimeZone();
  const normalizedDate = normalizeRequestedAuditReportDate_(date, timezone);
  const safeLimit = Math.max(1, Math.min(1000, Number(limit || 1000)));
  const items = loadSharedTrackingAudit_().slice(0, safeLimit);
  const report = buildAuditDailyReportFromItems_(items, normalizedDate, timezone, {
    mode: 'apps_script',
    actor: getSharedTrackingActor_()
  });
  report.actor = getSharedTrackingActor_();
  report.actorVerified = Boolean(getSharedTrackingActor_());
  report.actorSource = getSharedTrackingActor_() ? 'session_email' : 'missing';
  report.admin = true;
  report.ok = true;
  return report;
}

function normalizeRequestedAuditReportDate_(value, timezone) {
  const raw = String(value == null ? '' : value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  return Utilities.formatDate(new Date(), timezone || Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

function formatAuditReportDateLabel_(value, timezone) {
  const date = parseTrackingDate_(value);
  if (!date) return String(value == null ? '' : value).trim();
  return Utilities.formatDate(date, timezone || Session.getScriptTimeZone(), 'dd/MM/yyyy');
}

function getAuditDateKeyInTimezone_(value, timezone) {
  const date = value instanceof Date ? value : parseTrackingDateTime_(value);
  if (!date) return '';
  return Utilities.formatDate(date, timezone || Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

function getAuditItemTouchedRecords_(item) {
  const summaryRecords = item && item.summary && Array.isArray(item.summary.touchedRecords)
    ? item.summary.touchedRecords
    : [];
  const changeRecords = Array.isArray(item && item.changes)
    ? item.changes.map(function(change) { return String(change && change.id || '').trim(); }).filter(Boolean)
    : [];
  return Array.from(new Set(summaryRecords.concat(changeRecords).map(function(value) {
    return String(value == null ? '' : value).trim();
  }).filter(Boolean))).sort();
}

function getAuditItemSections_(item) {
  const buckets = item && item.summary && item.summary.bySection && typeof item.summary.bySection === 'object'
    ? item.summary.bySection
    : {};
  return Object.keys(buckets)
    .map(function(name) {
      return { name: String(name || '').trim(), count: Number(buckets[name] || 0) };
    })
    .filter(function(section) { return section.name && section.count > 0; })
    .sort(function(a, b) { return b.count - a.count || a.name.localeCompare(b.name, 'es'); });
}

function getAuditItemChangeTotal_(item) {
  const direct = Number(item && item.changeCount);
  if (isFinite(direct) && direct > 0) return direct;
  const summaryTotal = Number(item && item.summary && item.summary.total);
  return isFinite(summaryTotal) && summaryTotal > 0 ? summaryTotal : 0;
}

function getAuditItemDetailText_(item, recordLabels) {
  const detail = String(item && (item.detail || item.message) || '').trim();
  if (detail) return detail;
  const parts = [];
  const total = getAuditItemChangeTotal_(item);
  const records = Array.isArray(recordLabels) ? recordLabels.filter(Boolean) : [];
  if (total) parts.push('Impactos auditados: ' + total);
  if (records.length) parts.push('Registros: ' + formatAuditRecordLabelListText_(records, 4));
  return parts.join(' | ') || 'Sin detalle.';
}

function humanizeAuditAction_(action) {
  switch (String(action == null ? '' : action).trim()) {
    case 'cargar_sustento': return 'Cargar sustento';
    case 'retirar_sustento': return 'Retirar sustento';
    case 'preparar_carpeta_sustento': return 'Preparar carpeta de sustento';
    case 'configurar_reporte_diario': return 'Configurar recordatorio operativo matutino';
    case 'enviar_reporte_diario_correo': return 'Enviar recordatorio operativo por correo';
    case 'configurar_resumen_admin_nocturno': return 'Configurar resumen ejecutivo admin';
    case 'enviar_resumen_ejecutivo_admin': return 'Enviar resumen ejecutivo admin';
    case 'omitir_resumen_ejecutivo_admin': return 'Omitir resumen ejecutivo admin';
    case 'enviar_alertas_correo': return 'Enviar alertas por correo';
    case 'omitir_alertas_correo': return 'Omitir alertas por correo';
    case 'guardar_estado_compartido': return 'Guardar estado compartido';
    default: {
      const label = String(action == null ? '' : action).trim().replace(/_/g, ' ');
      return label ? (label.charAt(0).toUpperCase() + label.slice(1)) : 'Cambio';
    }
  }
}

function humanizeAuditActorSource_(source) {
  switch (String(source || '').trim()) {
    case 'session_email': return 'Correo verificado por Apps Script';
    case 'client_query': return 'Actor declarado por URL';
    case 'legacy_email': return 'Correo histórico del visor';
    case 'legacy_actor': return 'Actor histórico del visor';
    case 'missing': return 'Sin identificación confiable';
    default: return 'Origen no especificado';
  }
}

function inferAuditActorSource_(item) {
  const explicit = String(item && item.actorSource || '').trim();
  if (explicit) return explicit;
  const actor = String(item && item.actor || '').trim();
  if (item && item.actorVerified === true) return 'session_email';
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(actor)) return 'legacy_email';
  if (actor) return 'legacy_actor';
  return 'missing';
}

function inferAuditActorVerified_(item, source) {
  if (typeof (item && item.actorVerified) !== 'undefined') return Boolean(item.actorVerified);
  const safeSource = String(source || '').trim();
  return safeSource === 'session_email' || safeSource === 'legacy_email';
}

function summarizeAuditActorIdentity_(bucket) {
  const verified = Number(bucket && bucket.verifiedEntries || 0);
  const declared = Number(bucket && bucket.declaredEntries || 0);
  const unknown = Number(bucket && bucket.unknownEntries || 0);
  const sources = mapAuditSummaryPairs_(bucket && bucket.sourcesMap instanceof Map ? bucket.sourcesMap : new Map())
    .map(function(item) { return humanizeAuditActorSource_(item.name) + ' (' + item.count + ')'; });
  let label = 'Sin identificación confiable';
  if (verified && !declared && !unknown) {
    label = 'Correo verificado por Apps Script';
  } else if (!verified && declared && !unknown) {
    label = 'Actor declarado por URL';
  } else if (verified || declared || unknown) {
    const parts = [];
    if (verified) parts.push(verified + ' verificado(s)');
    if (declared) parts.push(declared + ' declarado(s)');
    if (unknown) parts.push(unknown + ' sin identificar');
    label = 'Identidad mixta: ' + parts.join(' | ');
  }
  return {
    label: label,
    sources: sources,
    verifiedEntries: verified,
    declaredEntries: declared,
    unknownEntries: unknown
  };
}

function mapAuditSummaryPairs_(sourceMap) {
  return Array.from(sourceMap.entries())
    .map(function(entry) {
      return {
        name: String(entry[0] == null ? '' : entry[0]).trim(),
        count: Number(entry[1] || 0)
      };
    })
    .filter(function(item) { return item.name && item.count > 0; })
    .sort(function(a, b) { return b.count - a.count || a.name.localeCompare(b.name, 'es'); });
}

function buildSharedTrackingAuditRecordIndex_() {
  const state = loadSharedTrackingState_();
  const payload = state && state.payload && Array.isArray(state.payload.records) ? state.payload.records : [];
  const customRecords = Array.isArray(state && state.customRecords) ? state.customRecords : [];
  const edits = state && state.edits && typeof state.edits === 'object' ? state.edits : {};
  const aliases = state && state.aliases && typeof state.aliases === 'object' ? state.aliases : {};
  const notes = state && state.notes && typeof state.notes === 'object' ? state.notes : {};
  const index = {};
  payload.concat(customRecords).forEach(function(record) {
    const id = String(record && record.id || '').trim();
    if (!id) return;
    const edit = edits[id] && typeof edits[id] === 'object' ? edits[id] : {};
    const merged = Object.assign({}, record || {}, edit || {});
    index[id] = buildSharedTrackingAuditRecordLabelMeta_(id, merged, aliases[id], Boolean(edit.__deleted));
  });
  Object.keys(edits).forEach(function(id) {
    if (index[id]) return;
    index[id] = buildSharedTrackingAuditRecordLabelMeta_(id, edits[id], aliases[id], Boolean(edits[id] && edits[id].__deleted));
  });
  Object.keys(aliases).forEach(function(id) {
    if (index[id]) return;
    index[id] = buildSharedTrackingAuditRecordLabelMeta_(id, null, aliases[id], false);
  });
  Object.keys(notes).forEach(function(id) {
    if (index[id]) return;
    index[id] = buildSharedTrackingAuditRecordLabelMeta_(id, notes[id], '', false);
  });
  return index;
}

function getSharedTrackingRecordMetaForState_(state, recordId) {
  const safeState = state && typeof state === 'object' ? state : buildDefaultSharedTrackingState_();
  const safeRecordId = String(recordId || '').trim();
  const payload = safeState.payload && Array.isArray(safeState.payload.records) ? safeState.payload.records : [];
  const customRecords = Array.isArray(safeState.customRecords) ? safeState.customRecords : [];
  const edits = safeState.edits && typeof safeState.edits === 'object' ? safeState.edits : {};
  const aliases = safeState.aliases && typeof safeState.aliases === 'object' ? safeState.aliases : {};
  const source = payload.concat(customRecords).filter(function(record) {
    return String(record && record.id || '').trim() === safeRecordId;
  }).slice(-1)[0] || null;
  const edit = edits[safeRecordId] && typeof edits[safeRecordId] === 'object' ? edits[safeRecordId] : {};
  const merged = Object.assign({}, source || {}, edit || {});
  return buildSharedTrackingAuditRecordLabelMeta_(safeRecordId, merged, aliases[safeRecordId], Boolean(edit.__deleted));
}

function buildSharedTrackingAuditRecordLabelMeta_(id, record, alias, deleted) {
  const safeRecord = record && typeof record === 'object' ? record : {};
  const safeId = String(id || '').trim();
  const edt = String(safeRecord.edt || '').trim();
  const aliasText = String(alias || '').trim();
  const activity = String(aliasText || safeRecord.actividad || safeRecord.resumen || safeRecord.note || safeRecord.action || '').trim();
  let label = '';
  if (edt && activity) {
    label = edt + ' - ' + activity;
  } else if (activity) {
    label = activity;
  } else if (edt) {
    label = 'EDT ' + edt;
  } else if (/^case-\d+/i.test(safeId)) {
    label = 'Caso ' + safeId.replace(/^case-/i, '');
  } else if (/^local-/i.test(safeId)) {
    label = 'Registro local creado desde el visor';
  } else {
    label = safeId || 'Registro sin identificar';
  }
  if (deleted) label += ' [retirado]';
  return {
    id: safeId,
    edt: edt,
    activity: activity,
    alias: aliasText,
    deleted: Boolean(deleted),
    label: label
  };
}

function getSharedTrackingEffectiveRecordsForState_(state) {
  const safeState = state && typeof state === 'object' ? state : buildDefaultSharedTrackingState_();
  const payload = safeState.payload && Array.isArray(safeState.payload.records) ? safeState.payload.records : [];
  const customRecords = Array.isArray(safeState.customRecords) ? safeState.customRecords : [];
  const edits = safeState.edits && typeof safeState.edits === 'object' ? safeState.edits : {};
  const aliases = safeState.aliases && typeof safeState.aliases === 'object' ? safeState.aliases : {};
  const notes = safeState.notes && typeof safeState.notes === 'object' ? safeState.notes : {};
  const sourceById = {};
  payload.concat(customRecords).forEach(function(record) {
    const id = String(record && record.id || '').trim();
    if (!id) return;
    sourceById[id] = record;
  });
  const ids = {};
  Object.keys(sourceById).forEach(function(id) { ids[id] = true; });
  Object.keys(edits).forEach(function(id) { ids[id] = true; });
  Object.keys(aliases).forEach(function(id) { ids[id] = true; });
  Object.keys(notes).forEach(function(id) { ids[id] = true; });
  return Object.keys(ids).map(function(id) {
    const source = sourceById[id] && typeof sourceById[id] === 'object' ? sourceById[id] : {};
    const edit = edits[id] && typeof edits[id] === 'object' ? edits[id] : {};
    const noteEntry = normalizeSharedTrackingNoteEntry_(notes[id]);
    const recordMeta = buildSharedTrackingAuditRecordLabelMeta_(id, Object.assign({}, source, edit), aliases[id], Boolean(edit.__deleted));
    if (edit.__deleted && !(noteEntry.attachments && noteEntry.attachments.length) && !hasSharedTrackingAttachmentFolderMeta_(noteEntry.attachmentFolder)) {
      return null;
    }
    return {
      id: id,
      edt: String(recordMeta.edt || '').trim(),
      actividad: String(recordMeta.activity || source.actividad || source.resumen || '').trim(),
      tituloVisible: String(recordMeta.label || '').trim(),
      parentEdt: String(edit.parent_edt || source.parent_edt || '').trim(),
      group: String(edit.grupo || source.grupo || '').trim(),
      seguimientoDgppcs: String(edit.seguimiento_dgppcs || source.seguimiento_dgppcs || '').trim(),
      territorio: String(edit.territorio || source.territorio || '').trim(),
      responsable: String(edit.responsable || source.responsable || '').trim(),
      estado: String(edit.estado || source.estado || '').trim(),
      deleted: Boolean(edit.__deleted),
      attachmentFolder: normalizeSharedTrackingAttachmentFolderMeta_(noteEntry.attachmentFolder),
      attachments: normalizeSharedTrackingAttachmentList_(noteEntry.attachments)
    };
  }).filter(Boolean);
}

function buildSharedTrackingSupportInventoryRows_(state, recordId) {
  const safeRecordId = String(recordId || '').trim();
  const rows = [];
  getSharedTrackingEffectiveRecordsForState_(state).forEach(function(record) {
    if (safeRecordId && record.id !== safeRecordId) return;
    const scoreMeta = computeSharedTrackingDocumentScore_(record);
    const attachments = Array.isArray(record.attachments) ? record.attachments : [];
    const rootBlock = getSharedTrackingRootBlock_(record.edt);
    const rootBlockLabel = buildSharedTrackingRootBlockLabel_(rootBlock, record);
    attachments.forEach(function(item) {
      rows.push({
        recordId: String(record.id || '').trim(),
        EDT: String(record.edt || '').trim(),
        rootBlock: rootBlock,
        rootBlockLabel: rootBlockLabel,
        actividad: String(record.actividad || '').trim(),
        territorio: String(record.territorio || '').trim(),
        responsable: String(record.responsable || '').trim(),
        seguimientoDgppcs: String(record.seguimientoDgppcs || '').trim(),
        estadoRegistro: String(record.estado || '').trim(),
        scoreDocumental: Number(scoreMeta.score || 0),
        clasificacionDocumental: String(scoreMeta.classification || '').trim(),
        brechasDocumentales: (Array.isArray(scoreMeta.missing) ? scoreMeta.missing : []).join('; '),
        fileName: String(item.name || '').trim(),
        documentType: String(item.documentType || 'unknown').trim(),
        documentTypeLabel: describeSharedTrackingDocumentType_(item.documentType),
        status: String(item.status || 'active').trim(),
        fileUrl: String(item.url || '').trim(),
        folderUrl: String(item.folderUrl || (record.attachmentFolder && record.attachmentFolder.folderUrl) || '').trim(),
        logicalPath: String(item.logicalPath || (record.attachmentFolder && record.attachmentFolder.logicalPath) || '').trim(),
        uploadedAt: String(item.uploadedAt || '').trim(),
        uploadedBy: String(item.uploadedBy || '').trim(),
        uploadedByEmail: String(item.uploadedByEmail || '').trim(),
        removedAt: String(item.removedAt || '').trim(),
        removedBy: String(item.removedBy || '').trim(),
        removedReason: String(item.removedReason || '').trim()
      });
    });
  });
  return rows;
}

function computeSharedTrackingDocumentScore_(record) {
  const safeRecord = record && typeof record === 'object' ? record : {};
  const folderMeta = normalizeSharedTrackingAttachmentFolderMeta_(safeRecord.attachmentFolder);
  const attachments = normalizeSharedTrackingAttachmentList_(safeRecord.attachments);
  const activeAttachments = attachments.filter(function(item) {
    return normalizeSharedTrackingAttachmentStatus_(item && item.status) === 'active';
  });
  const missing = [];
  let score = 0;
  if (folderMeta && folderMeta.folderId) {
    score += 20;
  } else {
    missing.push('sin_carpeta_drive');
  }
  if (activeAttachments.length) {
    score += 20;
  } else {
    missing.push('sin_sustento_activo');
  }
  if (activeAttachments.length && activeAttachments.every(function(item) { return normalizeSharedTrackingDocumentType_(item.documentType) !== 'unknown'; })) {
    score += 15;
  } else {
    missing.push('sin_tipo_documental');
  }
  if (activeAttachments.length && activeAttachments.every(function(item) { return String(item.uploadedBy || '').trim() && String(item.uploadedByEmail || '').trim(); })) {
    score += 15;
  } else {
    missing.push('sin_actor_correo');
  }
  if (activeAttachments.length && activeAttachments.every(function(item) { return String(item.uploadedAt || '').trim(); })) {
    score += 10;
  } else {
    missing.push('sin_fecha_carga');
  }
  if ((folderMeta && String(folderMeta.logicalPath || '').trim()) || (activeAttachments.length && activeAttachments.every(function(item) { return String(item.logicalPath || '').trim(); }))) {
    score += 10;
  } else {
    missing.push('sin_ruta_logica');
  }
  if (activeAttachments.length && activeAttachments.every(function(item) {
    return String(item.fileId || '').trim() &&
      String(item.url || '').trim() &&
      String(item.folderId || (folderMeta && folderMeta.folderId) || '').trim() &&
      String(item.folderUrl || (folderMeta && folderMeta.folderUrl) || '').trim();
  })) {
    score += 10;
  } else {
    missing.push('metadata_critica_incompleta');
  }
  let classification = 'critico';
  if (score >= 80) {
    classification = 'completo';
  } else if (score >= 60) {
    classification = 'aceptable';
  } else if (score >= 40) {
    classification = 'incompleto';
  }
  return {
    score: score,
    classification: classification,
    missing: missing,
    activeAttachments: activeAttachments.length,
    retiredAttachments: attachments.filter(function(item) {
      return normalizeSharedTrackingAttachmentStatus_(item && item.status) === 'removed';
    }).length,
    totalAttachments: attachments.length,
    hasFolder: Boolean(folderMeta && folderMeta.folderId)
  };
}

function getSharedTrackingDocumentScores() {
  const state = loadSharedTrackingState_();
  const permission = resolveSharedTrackingPermissionContext_('');
  const analytics = buildSharedTrackingAnalyticalSummary_(state, {});
  return buildSharedTrackingEnvelope_(state, {
    records: analytics.records,
    actor: permission.actor,
    actorVerified: permission.verified,
    actorSource: permission.source,
    declaredActor: permission.declaredActor,
    analytics: analytics,
    backend: getSharedTrackingBackendMeta_(permission)
  });
}

function getSharedTrackingAnalyticalSummary(recordId) {
  const state = loadSharedTrackingState_();
  const permission = resolveSharedTrackingPermissionContext_('');
  const analytics = buildSharedTrackingAnalyticalSummary_(state, { recordId: recordId });
  return {
    ok: true,
    mode: 'apps_script',
    actor: permission.actor,
    actorVerified: permission.verified,
    actorSource: permission.source,
    declaredActor: permission.declaredActor,
    analytics: analytics,
    backend: getSharedTrackingBackendMeta_(permission)
  };
}

function getSharedTrackingSupportInventory(recordId) {
  const state = loadSharedTrackingState_();
  const permission = resolveSharedTrackingPermissionContext_('');
  if (!permission.canExportSupportInventory) {
    return buildSharedTrackingPermissionDeniedEnvelope_(
      state,
      permission,
      'El inventario de sustentos solo está disponible para administradores, PMO o auditoría verificada.',
      {
        action: 'intento_exportar_inventario_sustentos_bloqueado',
        origin: 'inventario_sustentos'
      }
    );
  }
  const rows = buildSharedTrackingSupportInventoryRows_(state, recordId);
  appendSharedTrackingAudit_({
    at: new Date().toISOString(),
    actor: String(permission.actor || '').trim(),
    actorEmail: String(permission.email || '').trim(),
    actorSource: String(permission.source || 'missing').trim() || 'missing',
    actorVerified: Boolean(permission.verified),
    declaredActor: String(permission.declaredActor || '').trim(),
    action: 'exportar_inventario_sustentos',
    origin: 'inventario_sustentos',
    permissionRole: String(permission.permissionRole || 'viewer').trim() || 'viewer',
    message: 'Se generó el inventario de sustentos ' + (recordId ? ('para ' + String(recordId)) : 'global') + '.',
    summary: { total: rows.length, bySection: { attachments: rows.length } }
  });
  return buildSharedTrackingEnvelope_(state, {
    rows: rows,
    actor: permission.actor,
    actorVerified: permission.verified,
    actorSource: permission.source,
    declaredActor: permission.declaredActor,
    backend: getSharedTrackingBackendMeta_(permission)
  });
}

function exportSharedTrackingSupportInventory(format, recordId) {
  const response = getSharedTrackingSupportInventory(recordId);
  if (!response || response.ok === false) return response;
  const rows = Array.isArray(response.rows) ? response.rows : [];
  const safeFormat = String(format || 'json').trim().toLowerCase();
  const scope = String(recordId || '').trim() ? ('caso_' + String(recordId || '').trim()) : 'global';
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
  let content = '';
  let mimeType = 'application/json;charset=utf-8';
  let extension = 'json';
  if (safeFormat === 'csv') {
    mimeType = 'text/csv;charset=utf-8';
    extension = 'csv';
    content = buildSharedTrackingSupportInventoryCsv_(rows);
  } else if (safeFormat === 'html') {
    mimeType = 'text/html;charset=utf-8';
    extension = 'html';
    content = buildSharedTrackingSupportInventoryHtml_(rows, scope);
  } else {
    content = JSON.stringify(rows, null, 2);
  }
  return {
    ok: true,
    content: content,
    mimeType: mimeType,
    fileName: 'inventario_sustentos_pec_' + scope + '_' + stamp + '.' + extension,
    rows: rows,
    backend: response.backend
  };
}

function buildSharedTrackingSupportInventoryCsv_(rows) {
  const headers = [
    'recordId', 'EDT', 'rootBlock', 'rootBlockLabel', 'actividad', 'territorio', 'responsable', 'seguimientoDgppcs', 'estadoRegistro',
    'scoreDocumental', 'clasificacionDocumental', 'brechasDocumentales', 'fileName', 'documentType', 'documentTypeLabel', 'status',
    'fileUrl', 'folderUrl', 'logicalPath', 'uploadedAt', 'uploadedBy', 'uploadedByEmail',
    'removedAt', 'removedBy', 'removedReason'
  ];
  return [headers.join(',')].concat((Array.isArray(rows) ? rows : []).map(function(row) {
    return headers.map(function(key) {
      const value = row && Object.prototype.hasOwnProperty.call(row, key) ? row[key] : '';
      const text = String(value == null ? '' : value).replace(/"/g, '""');
      return '"' + text + '"';
    }).join(',');
  })).join('\n');
}

function buildSharedTrackingSupportInventoryHtml_(rows, scope) {
  const safeRows = Array.isArray(rows) ? rows : [];
  const heading = String(scope || 'global').trim() === 'global'
    ? 'Inventario global de sustentos PEC'
    : 'Inventario de sustentos por caso PEC';
  const tableRows = safeRows.map(function(row) {
    return '<tr>' + [
      'recordId', 'EDT', 'rootBlock', 'rootBlockLabel', 'actividad', 'territorio', 'responsable', 'seguimientoDgppcs', 'estadoRegistro',
      'scoreDocumental', 'clasificacionDocumental', 'brechasDocumentales', 'fileName', 'documentTypeLabel', 'status',
      'logicalPath', 'uploadedAt', 'uploadedBy', 'uploadedByEmail', 'removedAt', 'removedBy', 'removedReason'
    ].map(function(key) {
      return '<td>' + escapeHtmlEmail_(row && row[key] != null ? row[key] : '') + '</td>';
    }).join('') + '</tr>';
  }).join('');
  return '<!doctype html><html><head><meta charset="utf-8"><title>' + escapeHtmlEmail_(heading) + '</title>' +
    '<style>body{font-family:Arial,Helvetica,sans-serif;padding:24px;color:#102132}table{border-collapse:collapse;width:100%}th,td{border:1px solid #d9e2ec;padding:8px;font-size:12px;text-align:left;vertical-align:top}th{background:#eef4f8}</style>' +
    '</head><body><h1>' + escapeHtmlEmail_(heading) + '</h1><p>Total de filas: ' + safeRows.length + '</p><table><thead><tr>' +
    ['Record ID', 'EDT', 'Bloque raíz', 'Etiqueta bloque raíz', 'Actividad', 'Territorio', 'Responsable', 'Seguimiento DGPPCS', 'Estado registro', 'Score', 'Clasificación', 'Brechas documentales', 'Archivo', 'Tipo documental', 'Estado', 'Ruta lógica', 'Subido el', 'Subido por', 'Correo verificado', 'Retirado el', 'Retirado por', 'Motivo retiro']
      .map(function(label) { return '<th>' + escapeHtmlEmail_(label) + '</th>'; }).join('') +
    '</tr></thead><tbody>' + tableRows + '</tbody></table></body></html>';
}

function buildSharedTrackingAnalyticalSummary_(state, options) {
  const safeState = normalizeSharedTrackingStateBundle_(state, buildDefaultSharedTrackingState_());
  const settings = options && typeof options === 'object' ? options : {};
  const safeRecordId = String(settings.recordId || '').trim();
  const records = getSharedTrackingEffectiveRecordsForState_(safeState)
    .filter(function(record) { return !safeRecordId || String(record.id || '').trim() === safeRecordId; });
  const rootLabelMap = buildSharedTrackingRootBlockLabelMap_(records);
  const recordSummaries = records.map(function(record) {
    return buildSharedTrackingRecordAnalyticalSummary_(record, rootLabelMap);
  });
  const inventoryRows = buildSharedTrackingSupportInventoryRows_(safeState, safeRecordId);
  return {
    generatedAt: new Date().toISOString(),
    documentTypeCatalog: getSharedTrackingDocumentTypeCatalog_().concat(['Sin clasificar']),
    inventorySummary: {
      totalRows: inventoryRows.length,
      activeRows: inventoryRows.filter(function(row) { return String(row.status || 'active').trim() === 'active'; }).length,
      retiredRows: inventoryRows.filter(function(row) { return String(row.status || 'active').trim() === 'removed'; }).length
    },
    records: recordSummaries,
    aggregatesByDocumentType: aggregateSharedTrackingByDocumentType_(inventoryRows),
    aggregatesByResponsible: aggregateSharedTrackingByAssignment_(recordSummaries, 'responsable', splitTrackingEntities_, 'Sin responsable'),
    aggregatesBySeguimiento: aggregateSharedTrackingByAssignment_(recordSummaries, 'seguimientoDgppcs', splitTrackingPeople_, 'Sin seguimiento DGPPCS'),
    aggregatesByRootBlock: aggregateSharedTrackingByRootBlock_(recordSummaries, rootLabelMap)
  };
}

function buildSharedTrackingRecordAnalyticalSummary_(record, rootLabelMap) {
  const safeRecord = record && typeof record === 'object' ? record : {};
  const scoreMeta = computeSharedTrackingDocumentScore_(safeRecord);
  const rootBlock = getSharedTrackingRootBlock_(safeRecord.edt);
  return {
    recordId: String(safeRecord.id || '').trim(),
    edt: String(safeRecord.edt || '').trim(),
    actividad: String(safeRecord.actividad || safeRecord.tituloVisible || '').trim(),
    responsable: String(safeRecord.responsable || '').trim(),
    seguimientoDgppcs: String(safeRecord.seguimientoDgppcs || '').trim(),
    rootBlock: rootBlock,
    rootBlockLabel: String((rootLabelMap && rootLabelMap[rootBlock]) || buildSharedTrackingRootBlockLabel_(rootBlock, safeRecord)).trim(),
    scoreDocumental: Number(scoreMeta.score || 0),
    clasificacionDocumental: String(scoreMeta.classification || '').trim() || 'critico',
    brechasDocumentales: Array.isArray(scoreMeta.missing) ? scoreMeta.missing.slice() : [],
    totalAttachments: Number(scoreMeta.totalAttachments || 0),
    activeAttachments: Number(scoreMeta.activeAttachments || 0),
    retiredAttachments: Number(scoreMeta.retiredAttachments || 0)
  };
}

function aggregateSharedTrackingByDocumentType_(rows) {
  const map = {};
  (Array.isArray(rows) ? rows : []).forEach(function(row) {
    const label = describeSharedTrackingDocumentType_(row && row.documentType);
    if (!map[label]) {
      map[label] = {
        label: label,
        totalAttachments: 0,
        activeAttachments: 0,
        retiredAttachments: 0,
        recordIds: {}
      };
    }
    const bucket = map[label];
    bucket.totalAttachments += 1;
    if (String(row && row.status || 'active').trim() === 'removed') {
      bucket.retiredAttachments += 1;
    } else {
      bucket.activeAttachments += 1;
    }
    const recordId = String(row && row.recordId || '').trim();
    if (recordId) bucket.recordIds[recordId] = true;
  });
  return Object.keys(map).map(function(label) {
    const bucket = map[label];
    return {
      label: label,
      totalAttachments: bucket.totalAttachments,
      activeAttachments: bucket.activeAttachments,
      retiredAttachments: bucket.retiredAttachments,
      recordCount: Object.keys(bucket.recordIds).length
    };
  }).sort(function(left, right) {
    return right.activeAttachments - left.activeAttachments ||
      right.totalAttachments - left.totalAttachments ||
      String(left.label || '').localeCompare(String(right.label || ''), 'es');
  });
}

function aggregateSharedTrackingByAssignment_(records, key, splitter, fallbackLabel) {
  const map = {};
  (Array.isArray(records) ? records : []).forEach(function(record) {
    const items = typeof splitter === 'function'
      ? splitter(record && record[key])
      : [String(record && record[key] || '').trim()].filter(Boolean);
    const safeItems = items.length ? items : [String(fallbackLabel || 'Sin dato').trim() || 'Sin dato'];
    safeItems.forEach(function(label) {
      const safeLabel = String(label || '').trim() || String(fallbackLabel || 'Sin dato').trim() || 'Sin dato';
      map[safeLabel] = (map[safeLabel] || 0) + 1;
    });
  });
  return Object.keys(map).map(function(label) {
    return { label: label, count: map[label] };
  }).sort(function(left, right) {
    return right.count - left.count || String(left.label || '').localeCompare(String(right.label || ''), 'es');
  });
}

function aggregateSharedTrackingByRootBlock_(records, rootLabelMap) {
  const map = {};
  (Array.isArray(records) ? records : []).forEach(function(record) {
    const rootBlock = String(record && record.rootBlock || '').trim();
    if (!rootBlock) return;
    if (!map[rootBlock]) {
      map[rootBlock] = {
        rootBlock: rootBlock,
        label: String((rootLabelMap && rootLabelMap[rootBlock]) || buildSharedTrackingRootBlockLabel_(rootBlock, record)).trim(),
        count: 0,
        scoreTotal: 0,
        criticalCount: 0,
        withoutSupportCount: 0,
        withoutFolderCount: 0
      };
    }
    const bucket = map[rootBlock];
    bucket.count += 1;
    bucket.scoreTotal += Number(record && record.scoreDocumental || 0);
    if (String(record && record.clasificacionDocumental || '').trim() === 'critico') bucket.criticalCount += 1;
    if (!(Number(record && record.activeAttachments || 0) > 0)) bucket.withoutSupportCount += 1;
    if (Array.isArray(record && record.brechasDocumentales) && record.brechasDocumentales.indexOf('sin_carpeta_drive') >= 0) {
      bucket.withoutFolderCount += 1;
    }
  });
  return Object.keys(map).map(function(rootBlock) {
    const bucket = map[rootBlock];
    return {
      rootBlock: bucket.rootBlock,
      label: bucket.label,
      count: bucket.count,
      avgScoreDocumental: bucket.count ? Math.round(bucket.scoreTotal / bucket.count) : 0,
      criticalCount: bucket.criticalCount,
      withoutSupportCount: bucket.withoutSupportCount,
      withoutFolderCount: bucket.withoutFolderCount
    };
  }).sort(function(left, right) {
    return Number(left.rootBlock || 0) - Number(right.rootBlock || 0) ||
      String(left.rootBlock || '').localeCompare(String(right.rootBlock || ''), 'es');
  });
}

function buildSharedTrackingRootBlockLabelMap_(records) {
  const map = {};
  (Array.isArray(records) ? records : []).forEach(function(record) {
    const edt = String(record && record.edt || '').trim();
    const rootBlock = getSharedTrackingRootBlock_(edt);
    if (!rootBlock || map[rootBlock]) return;
    if (edt === rootBlock) {
      map[rootBlock] = buildSharedTrackingRootBlockLabel_(rootBlock, record);
    }
  });
  return map;
}

function buildSharedTrackingRootBlockLabel_(rootBlock, record) {
  const safeRoot = String(rootBlock || '').trim();
  if (!safeRoot) return '';
  const safeRecord = record && typeof record === 'object' ? record : {};
  const activity = String(safeRecord.actividad || safeRecord.tituloVisible || '').trim().replace(/^\d+(?:\.\d+)*\s*-\s*/, '');
  return activity ? (safeRoot + ' - ' + activity) : ('Bloque ' + safeRoot);
}

function getSharedTrackingRootBlock_(edt) {
  return String(edt || '').trim().split('.')[0] || '';
}

function buildAuditItemRecordHintMap_(item) {
  const hints = {};
  (Array.isArray(item && item.changes) ? item.changes : []).forEach(function(change) {
    const id = String(change && change.id || '').trim();
    if (!id) return;
    if (!hints[id]) hints[id] = { id: id, edt: '', actividad: '', resumen: '', alias: '', deleted: false };
    const bucket = hints[id];
    const section = String(change && change.section || '').trim();
    const field = String(change && change.field || '').trim();
    const before = String(change && change.before || '').trim();
    const after = String(change && change.after || '').trim();
    const candidate = after || before;
    if (field === 'edt' && candidate && !bucket.edt) bucket.edt = candidate;
    if (field === 'actividad' && candidate && !bucket.actividad) bucket.actividad = candidate;
    if (field === 'resumen' && candidate && !bucket.resumen) bucket.resumen = candidate;
    if (field === 'value' && section === 'aliases' && candidate && !bucket.alias) bucket.alias = candidate;
    if (field === '__deleted' && String(after).trim().toLowerCase() === 'true') bucket.deleted = true;
  });
  return hints;
}

function resolveAuditRecordLabels_(recordIds, recordIndex, hintMap) {
  return (Array.isArray(recordIds) ? recordIds : []).map(function(recordId) {
    const id = String(recordId || '').trim();
    if (!id) return '';
    if (recordIndex && recordIndex[id] && recordIndex[id].label) return recordIndex[id].label;
    const hint = hintMap && hintMap[id] ? hintMap[id] : null;
    if (hint) {
      return buildSharedTrackingAuditRecordLabelMeta_(id, {
        edt: hint.edt,
        actividad: hint.actividad || hint.resumen,
        resumen: hint.resumen
      }, hint.alias, hint.deleted).label;
    }
    if (/^local-/i.test(id)) return 'Registro local creado desde el visor';
    if (/^case-\d+/i.test(id)) return 'Caso ' + id.replace(/^case-/i, '');
    return id;
  }).filter(Boolean);
}

function formatAuditRecordLabelListText_(labels, maxItems) {
  const unique = Array.from(new Set((Array.isArray(labels) ? labels : []).map(function(label) {
    return String(label || '').trim();
  }).filter(Boolean)));
  if (!unique.length) return 'Sin registros asociados';
  const limit = Math.max(1, Number(maxItems || 6));
  const visible = unique.slice(0, limit);
  const hidden = unique.length - visible.length;
  return visible.join('; ') + (hidden > 0 ? ' | +' + hidden + ' más' : '');
}

function renderSharedTrackingDailyAuditLabelListHtml_(labels, maxItems, emptyLabel) {
  const unique = Array.from(new Set((Array.isArray(labels) ? labels : []).map(function(label) {
    return String(label || '').trim();
  }).filter(Boolean)));
  if (!unique.length) return '<span style="color:#4d6379;">' + escapeHtmlEmail_(emptyLabel || 'Sin registros asociados') + '</span>';
  const limit = Math.max(1, Number(maxItems || 6));
  const visible = unique.slice(0, limit);
  const hidden = unique.length - visible.length;
  return [
    '<div style="display:grid;gap:4px;">',
    visible.map(function(label) {
      return '<div style="line-height:1.35;">' + escapeHtmlEmail_(label) + '</div>';
    }).join(''),
    hidden > 0 ? '<div style="color:#4d6379;font-size:12px;">+' + hidden + ' registro(s) adicional(es)</div>' : '',
    '</div>'
  ].join('');
}

function buildDailyAuditReportPlainText_(report, timezone) {
  const summary = report && typeof report === 'object' ? report : {};
  const lines = [
    'Reporte diario de cambios - ' + (summary.dateLabel || summary.date || ''),
    'Modo: ' + (summary.mode === 'apps_script' ? 'Apps Script compartido' : 'Local standalone'),
    'Usuarios con cambios: ' + Number(summary.totalActors || 0),
    'Movimientos auditados: ' + Number(summary.totalEntries || 0),
    'Impactos auditados: ' + Number(summary.totalChanges || 0),
    'Registros tocados: ' + Number(summary.totalTouchedRecords || 0),
    ''
  ];
  const actors = Array.isArray(summary.actors) ? summary.actors : [];
  if (!actors.length) {
    lines.push('Sin cambios auditados para la fecha seleccionada.');
    return lines.join('\n').trim();
  }
  actors.forEach(function(actor) {
    lines.push(actor.actor || 'Usuario sin identificar');
    lines.push('- Movimientos: ' + Number(actor.totalEntries || 0) + ' | Impactos: ' + Number(actor.totalChanges || 0) + ' | Último cambio: ' + (formatTrackingDateTime_(actor.lastChangeAt) || 'Sin hora'));
    if (actor.identityLabel) {
      lines.push('- Identidad: ' + actor.identityLabel);
    }
    if (Array.isArray(actor.identitySources) && actor.identitySources.length) {
      lines.push('- Origen de identidad: ' + actor.identitySources.join('; '));
    }
    if (Array.isArray(actor.actions) && actor.actions.length) {
      lines.push('- Acciones: ' + actor.actions.map(function(item) {
        return humanizeAuditAction_(item.name) + ' (' + item.count + ')';
      }).join('; '));
    }
    if (Array.isArray(actor.touchedRecords) && actor.touchedRecords.length) {
      lines.push('- Registros: ' + formatAuditRecordLabelListText_(actor.touchedRecords, 6));
    }
    (Array.isArray(actor.entries) ? actor.entries : []).forEach(function(entry) {
      lines.push('  * ' + [
        formatTrackingDateTime_(entry.at) || 'Sin hora',
        entry.actionLabel || humanizeAuditAction_(entry.action),
        entry.detail || 'Sin detalle.'
      ].filter(Boolean).join(' | '));
    });
    lines.push('');
  });
  return lines.join('\n').trim();
}

function buildAuditDailyReportFromItems_(items, reportDate, timezone, options) {
  const selectedDate = normalizeRequestedAuditReportDate_(reportDate, timezone);
  const recordIndex = buildSharedTrackingAuditRecordIndex_();
  const grouped = new Map();
  const touchedRecords = new Map();
  const filteredItems = (Array.isArray(items) ? items : [])
    .filter(function(item) {
      return getAuditDateKeyInTimezone_(item && item.at, timezone) === selectedDate;
    })
    .sort(function(a, b) {
      return String(b && b.at || '').localeCompare(String(a && a.at || ''));
    });

  filteredItems.forEach(function(item) {
    const actor = String(item && item.actor || (options && options.actor) || 'Usuario sin identificar').trim();
    if (!grouped.has(actor)) {
      grouped.set(actor, {
        actor: actor,
        totalEntries: 0,
        totalChanges: 0,
        lastChangeAt: '',
        actionsMap: new Map(),
        sectionsMap: new Map(),
        sourcesMap: new Map(),
        recordsMap: new Map(),
        emailsMap: new Map(),
        verifiedEntries: 0,
        declaredEntries: 0,
        unknownEntries: 0,
        entries: []
      });
    }
    const bucket = grouped.get(actor);
    const action = String(item && item.action || 'cambio').trim() || 'cambio';
    const changeTotal = getAuditItemChangeTotal_(item);
    const records = getAuditItemTouchedRecords_(item);
    const recordHints = buildAuditItemRecordHintMap_(item);
    const recordLabels = resolveAuditRecordLabels_(records, recordIndex, recordHints);
    const sections = getAuditItemSections_(item);
    const actorSource = inferAuditActorSource_(item);
    const actorVerified = inferAuditActorVerified_(item, actorSource);
    const actorEmail = String(item && item.actorEmail || '').trim().toLowerCase();
    bucket.totalEntries += 1;
    bucket.totalChanges += changeTotal;
    bucket.actionsMap.set(action, (bucket.actionsMap.get(action) || 0) + 1);
    bucket.sourcesMap.set(actorSource, (bucket.sourcesMap.get(actorSource) || 0) + 1);
    if (actorVerified) bucket.verifiedEntries += 1;
    else if (actorSource === 'client_query' || actorSource === 'legacy_actor') bucket.declaredEntries += 1;
    else bucket.unknownEntries += 1;
    if (isEmailLike_(actorEmail)) {
      bucket.emailsMap.set(actorEmail, actorEmail);
    } else if (isEmailLike_(actor)) {
      bucket.emailsMap.set(String(actor).trim().toLowerCase(), String(actor).trim().toLowerCase());
    }
    sections.forEach(function(section) {
      bucket.sectionsMap.set(section.name, (bucket.sectionsMap.get(section.name) || 0) + section.count);
    });
    records.forEach(function(record, index) {
      const label = recordLabels[index] || String(record || '').trim();
      bucket.recordsMap.set(record, label);
      touchedRecords.set(record, label);
    });
    if (String(item && item.at || '').trim() && (!bucket.lastChangeAt || String(item.at).trim() > bucket.lastChangeAt)) {
      bucket.lastChangeAt = String(item.at).trim();
    }
    bucket.entries.push({
      at: String(item && item.at || '').trim(),
      action: action,
      actionLabel: humanizeAuditAction_(action),
      detail: getAuditItemDetailText_(item, recordLabels),
      changeCount: changeTotal,
      touchedRecordIds: records,
      touchedRecords: recordLabels,
      sections: sections
    });
  });

  const actors = Array.from(grouped.values())
    .map(function(bucket) {
      const identity = summarizeAuditActorIdentity_(bucket);
      return {
        actor: bucket.actor,
        totalEntries: bucket.totalEntries,
        totalChanges: bucket.totalChanges,
        lastChangeAt: bucket.lastChangeAt,
        actions: mapAuditSummaryPairs_(bucket.actionsMap),
        sections: mapAuditSummaryPairs_(bucket.sectionsMap),
        identityLabel: identity.label,
        identitySources: identity.sources,
        emails: Array.from(bucket.emailsMap.keys()).slice(0, 12),
        verifiedEntries: identity.verifiedEntries,
        declaredEntries: identity.declaredEntries,
        unknownEntries: identity.unknownEntries,
        touchedRecordIds: Array.from(bucket.recordsMap.keys()).slice(0, 18),
        touchedRecords: Array.from(bucket.recordsMap.values()).slice(0, 18),
        entries: bucket.entries
      };
    })
    .sort(function(a, b) {
      return b.totalEntries - a.totalEntries || String(b.lastChangeAt || '').localeCompare(String(a.lastChangeAt || '')) || a.actor.localeCompare(b.actor, 'es');
    });

  const report = {
    ok: true,
    mode: String(options && options.mode || 'apps_script').trim() || 'apps_script',
    timezone: timezone || Session.getScriptTimeZone(),
    date: selectedDate,
    dateLabel: formatAuditReportDateLabel_(selectedDate, timezone),
    generatedAt: new Date().toISOString(),
    totalActors: actors.length,
    totalEntries: actors.reduce(function(sum, actor) { return sum + Number(actor.totalEntries || 0); }, 0),
    totalChanges: actors.reduce(function(sum, actor) { return sum + Number(actor.totalChanges || 0); }, 0),
    totalTouchedRecords: touchedRecords.size,
    actors: actors
  };
  report.plainText = buildDailyAuditReportPlainText_(report, timezone);
  return report;
}

function getSharedTrackingLatestBackup() {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para exportar el backup compartido.'
    };
  }
  const state = loadSharedTrackingState_();
  const backup = writeSharedTrackingBackup_(state);
  return {
    ok: true,
    actor: getSharedTrackingActor_(),
    admin: true,
    backup: backup,
    backend: getSharedTrackingBackendMeta_()
  };
}

function restoreSharedTrackingLatestSnapshot(actorName, restoreReason) {
  const actorInfo = resolveSharedTrackingPermissionContext_(actorName);
  if (!actorInfo.isAdmin) {
    return buildSharedTrackingPermissionDeniedEnvelope_(
      loadSharedTrackingState_(),
      actorInfo,
      'No se pudo autorizar la restauración del último snapshot compartido.',
      {
        action: 'intento_restaurar_snapshot_bloqueado',
        origin: 'restaurar_snapshot'
      }
    );
  }
  const latestSnapshot = getLatestSharedTrackingSnapshotMeta_();
  if (!latestSnapshot || !latestSnapshot.fileId) {
    return buildSharedTrackingEnvelope_(loadSharedTrackingState_(), {
      ok: false,
      actor: actorInfo.actor,
      actorVerified: actorInfo.verified,
      actorSource: actorInfo.source,
      declaredActor: actorInfo.declaredActor,
      message: 'No existe un snapshot versionado disponible para restaurar.',
      backend: getSharedTrackingBackendMeta_(actorInfo)
    });
  }
  const snapshotState = readSharedTrackingSnapshotStateById_(latestSnapshot.fileId);
  if (!snapshotState) {
    return buildSharedTrackingEnvelope_(loadSharedTrackingState_(), {
      ok: false,
      actor: actorInfo.actor,
      actorVerified: actorInfo.verified,
      actorSource: actorInfo.source,
      declaredActor: actorInfo.declaredActor,
      message: 'No se pudo leer el último snapshot compartido para restaurar el visor.',
      backend: getSharedTrackingBackendMeta_(actorInfo)
    });
  }
  const previous = loadSharedTrackingState_();
  writeSharedTrackingSnapshot_(previous, actorInfo, 'restaurar_snapshot', 'before_restore');
  const next = normalizeSharedTrackingStateBundle_(snapshotState, previous);
  next.revision = Number(previous.revision || 0) + 1;
  next.savedAt = new Date().toISOString();
  next.savedBy = actorInfo.actor;
  writeSharedTrackingState_(next);
  appendSharedTrackingAudit_({
    at: next.savedAt,
    actor: String(actorInfo.actor || '').trim(),
    actorEmail: String(actorInfo.email || '').trim(),
    actorSource: String(actorInfo.source || 'missing').trim() || 'missing',
    actorVerified: Boolean(actorInfo.verified),
    declaredActor: String(actorInfo.declaredActor || '').trim(),
    action: 'restaurar_snapshot',
    origin: 'restaurar_snapshot',
    revision: Number(next.revision || 0),
    snapshotFile: String(latestSnapshot.fileName || '').trim(),
    snapshotUpdatedAt: String(latestSnapshot.updatedAt || '').trim(),
    message: String(restoreReason || 'Se restauró el último snapshot compartido del visor.').trim()
  });
  writeSharedTrackingBackup_(next);
  writeSharedTrackingSnapshot_(next, actorInfo, 'restaurar_snapshot', 'after_restore');
  return buildSharedTrackingEnvelope_(next, {
    actor: actorInfo.actor,
    actorVerified: actorInfo.verified,
    actorSource: actorInfo.source,
    declaredActor: actorInfo.declaredActor,
    message: 'Se restauró el último snapshot compartido del visor.',
    backend: getSharedTrackingBackendMeta_(actorInfo)
  });
}

function getSharedTrackingDailyReportDeliveryStatus() {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para revisar el recordatorio operativo matutino.'
    };
  }
  const config = getDailyAuditReportConfig_();
  const triggers = getDailyAuditReportTriggers_();
  const recipients = config.mode === 'TEST_REDIRECT' ? config.testRecipients : config.to;
  const markerState = readOperationalMarkerState_('DAILY_REPORT');
  return {
    ok: true,
    actor: getSharedTrackingActor_(),
    actorVerified: Boolean(getSharedTrackingActor_()),
    actorSource: getSharedTrackingActor_() ? 'session_email' : 'missing',
    admin: true,
    mode: config.mode,
    recipients: config.to,
    configuredRecipients: config.configuredTo,
    adminRecipients: config.adminRecipients,
    usingAdminRecipients: config.usingAdminFallback,
    effectiveRecipients: recipients,
    cc: config.cc,
    testRecipients: config.testRecipients,
    realSendConfirmed: config.realSendConfirmed,
    sendHour: config.sendHour,
    scheduleLabel: 'Lunes a viernes | ' + String(config.sendHour).padStart(2, '0') + ':00',
    triggerCount: triggers.length,
    triggerEnabled: triggers.length > 0,
    lastExecutionAt: markerState.lastExecutionAt,
    lastExecutionOrigin: markerState.lastExecutionOrigin,
    lastDeliveryAt: markerState.lastDeliveryAt,
    lastDeliveryOrigin: markerState.lastDeliveryOrigin,
    lastDeliveryRecipients: markerState.lastDeliveryRecipients,
    lastDeliveryRecipientsCount: markerState.lastDeliveryRecipients.length,
    hasConfiguredRecipients: config.to.length > 0,
    webappUrl: getTrackingWebAppUrl_(),
    message: recipients.length
      ? ('Recordatorio operativo matutino preparado para ' + recipients.join(', ') + (config.usingAdminFallback ? ' usando PEC_VISOR_ADMIN_EMAILS.' : '.'))
      : 'Configura los destinatarios del recordatorio matutino antes del envío operativo.'
  };
}

function getSharedTrackingAdminExecutiveSummaryStatus() {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para revisar el resumen ejecutivo nocturno admin.'
    };
  }
  var config = getAdminExecutiveSummaryConfig_();
  var triggers = getAdminExecutiveSummaryTriggers_();
  var markerState = readOperationalMarkerState_('ADMIN_SUMMARY');
  var audience = buildSharedTrackingOperationalAudience_();
  return {
    ok: true,
    actor: getSharedTrackingActor_(),
    actorVerified: Boolean(getSharedTrackingActor_()),
    actorSource: getSharedTrackingActor_() ? 'session_email' : 'missing',
    admin: true,
    recipients: config.recipients.slice(),
    sendHour: config.sendHour,
    scheduleLabel: 'Lunes a viernes | ' + String(config.sendHour).padStart(2, '0') + ':00',
    triggerCount: triggers.length,
    triggerEnabled: triggers.length > 0,
    lastExecutionAt: markerState.lastExecutionAt,
    lastExecutionOrigin: markerState.lastExecutionOrigin,
    lastDeliveryAt: markerState.lastDeliveryAt,
    lastDeliveryOrigin: markerState.lastDeliveryOrigin,
    lastDeliveryRecipients: markerState.lastDeliveryRecipients,
    lastDeliveryRecipientsCount: markerState.lastDeliveryRecipients.length,
    expectedAudienceCount: audience.length,
    expectedAudience: audience,
    webappUrl: getTrackingWebAppUrl_(),
    message: config.recipients.length
      ? 'Resumen ejecutivo admin listo para enviarse a los administradores con respaldo de auditoría y backup.'
      : 'No se detectaron correos administradores para enviar el resumen ejecutivo nocturno.'
  };
}

function addSharedTrackingAdminEmails(adminEmails) {
  const caller = String(getSharedTrackingActor_() || '').trim().toLowerCase();
  const requested = splitEmailList_(adminEmails || '');
  const current = getSharedTrackingAdminEmailList_();
  const callerIsCurrentAdmin = Boolean(caller && current.indexOf(caller) >= 0);
  const callerIncludedInBootstrap = Boolean(caller && requested.indexOf(caller) >= 0);
  if (!requested.length) {
    return {
      ok: false,
      actor: caller,
      admin: callerIsCurrentAdmin,
      message: 'No se recibió ningún correo administrador para agregar.'
    };
  }
  if (current.length ? !callerIsCurrentAdmin : !callerIncludedInBootstrap) {
    return {
      ok: false,
      actor: caller,
      admin: callerIsCurrentAdmin,
      message: current.length
        ? 'Solo un administrador vigente puede agregar nuevos administradores.'
        : 'La carga inicial de administradores debe incluir el correo del operador autenticado.'
    };
  }
  const merged = Array.from(new Set(current.concat(requested)));
  PropertiesService.getScriptProperties().setProperty('PEC_VISOR_ADMIN_EMAILS', merged.join(';'));
  const actorMeta = buildAuditActorMeta_(resolveSharedTrackingActorInfo_(caller));
  appendSharedTrackingAudit_({
    at: new Date().toISOString(),
    actor: actorMeta.actor || caller || 'admin_bootstrap',
    actorEmail: actorMeta.actorEmail,
    actorSource: actorMeta.actorSource,
    actorVerified: actorMeta.actorVerified,
    declaredActor: actorMeta.declaredActor,
    action: 'configurar_admins_visores',
    origin: 'addSharedTrackingAdminEmails',
    detail: 'Administradores actualizados. Total: ' + merged.length + ' | Nuevos: ' + requested.join(', '),
    summary: {
      total: requested.length,
      bySection: { adminEmails: requested.length },
      adminEmails: merged
    }
  });
  return {
    ok: true,
    actor: actorMeta.actor || caller,
    admin: true,
    added: requested,
    adminEmails: merged,
    message: 'Administradores actualizados: ' + merged.join(', ') + '.'
  };
}

function updateSharedTrackingDailyReportConfig(config) {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para actualizar el recordatorio operativo matutino.'
    };
  }
  const current = getDailyAuditReportConfig_();
  const input = config && typeof config === 'object' ? config : {};
  const allowed = { PREVIEW_ONLY: true, TEST_REDIRECT: true, REAL: true };
  const rawMode = String(input.mode != null ? input.mode : current.mode || 'PREVIEW_ONLY').trim().toUpperCase();
  const mode = allowed[rawMode] ? rawMode : 'PREVIEW_ONLY';
  const to = Object.prototype.hasOwnProperty.call(input, 'to')
    ? splitEmailList_(input.to)
    : current.configuredTo.slice();
  const cc = Object.prototype.hasOwnProperty.call(input, 'cc')
    ? splitEmailList_(input.cc)
    : current.cc.slice();
  const testRecipients = Object.prototype.hasOwnProperty.call(input, 'testRecipients')
    ? splitEmailList_(input.testRecipients)
    : current.testRecipients.slice();
  const realSendConfirmed = Object.prototype.hasOwnProperty.call(input, 'realSendConfirmed')
    ? String(input.realSendConfirmed).trim().toUpperCase() === 'TRUE' || input.realSendConfirmed === true || String(input.realSendConfirmed).trim().toUpperCase() === 'SI'
    : current.realSendConfirmed;
  const sendHour = normalizeDailyAuditReportSendHour_(
    Object.prototype.hasOwnProperty.call(input, 'sendHour') ? input.sendHour : current.sendHour
  );
  const properties = PropertiesService.getScriptProperties();
  setOrDeleteScriptProperty_(properties, 'PEC_VISOR_DAILY_REPORT_MODE', mode);
  setOrDeleteScriptProperty_(properties, 'PEC_VISOR_DAILY_REPORT_TO', to.join(';'));
  setOrDeleteScriptProperty_(properties, 'PEC_VISOR_DAILY_REPORT_CC', cc.join(';'));
  setOrDeleteScriptProperty_(properties, 'PEC_VISOR_DAILY_REPORT_TEST_RECIPIENTS', testRecipients.join(';'));
  setOrDeleteScriptProperty_(properties, 'PEC_VISOR_DAILY_REPORT_CONFIRM_REAL_SEND', realSendConfirmed ? 'SI' : '');
  setOrDeleteScriptProperty_(properties, 'PEC_VISOR_DAILY_REPORT_HOUR', String(sendHour));
  const actorMeta = buildAuditActorMeta_(resolveSharedTrackingActorInfo_(getSharedTrackingActor_()));
  appendSharedTrackingAudit_({
    at: new Date().toISOString(),
    actor: actorMeta.actor || getSharedTrackingActor_() || 'admin_config',
    actorEmail: actorMeta.actorEmail,
    actorSource: actorMeta.actorSource,
    actorVerified: actorMeta.actorVerified,
    declaredActor: actorMeta.declaredActor,
    action: 'configurar_reporte_diario',
    origin: 'updateSharedTrackingDailyReportConfig',
    detail: 'Configuración del recordatorio operativo matutino actualizada | Modo: ' + mode + ' | Destinatarios: ' + (to.join(', ') || 'usar admins') + ' | Hora: ' + String(sendHour).padStart(2, '0') + ':00',
    summary: {
      total: 1,
      bySection: { dailyReportDelivery: 1 },
      mode: mode,
      recipients: to,
      cc: cc,
      testRecipients: testRecipients,
      sendHour: sendHour,
      realSendConfirmed: realSendConfirmed,
      usingAdminFallback: !to.length
    }
  });
  const status = getSharedTrackingDailyReportDeliveryStatus();
  status.saved = true;
  status.message = 'Configuración del recordatorio operativo matutino guardada.';
  return status;
}

function updateSharedTrackingAdminExecutiveSummaryConfig(config) {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para actualizar el resumen ejecutivo nocturno admin.'
    };
  }
  var current = getAdminExecutiveSummaryConfig_();
  var input = config && typeof config === 'object' ? config : {};
  var sendHour = normalizeAdminExecutiveSummarySendHour_(
    Object.prototype.hasOwnProperty.call(input, 'sendHour') ? input.sendHour : current.sendHour
  );
  var properties = PropertiesService.getScriptProperties();
  setOrDeleteScriptProperty_(properties, 'PEC_VISOR_ADMIN_SUMMARY_HOUR', String(sendHour));
  var actorMeta = buildAuditActorMeta_(resolveSharedTrackingActorInfo_(getSharedTrackingActor_()));
  appendSharedTrackingAudit_({
    at: new Date().toISOString(),
    actor: actorMeta.actor || getSharedTrackingActor_() || 'admin_config',
    actorEmail: actorMeta.actorEmail,
    actorSource: actorMeta.actorSource,
    actorVerified: actorMeta.actorVerified,
    declaredActor: actorMeta.declaredActor,
    action: 'configurar_resumen_admin_nocturno',
    origin: 'updateSharedTrackingAdminExecutiveSummaryConfig',
    detail: 'Configuración del resumen ejecutivo admin actualizada | Hora: ' + String(sendHour).padStart(2, '0') + ':00',
    summary: {
      total: 1,
      bySection: { adminExecutiveSummary: 1 },
      sendHour: sendHour,
      recipients: getSharedTrackingAdminEmailList_()
    }
  });
  var status = getSharedTrackingAdminExecutiveSummaryStatus();
  status.saved = true;
  status.message = 'Configuración del resumen ejecutivo admin guardada.';
  return status;
}

function sendSharedTrackingDailyAuditReportEmail(date) {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para enviar el recordatorio operativo matutino por correo.'
    };
  }
  return dispatchSharedTrackingDailyAuditReportEmail_({
    actor: getSharedTrackingActor_() || 'admin_manual',
    origin: 'envio_manual_reporte_diario',
    reportDate: date
  });
}

function sendSharedTrackingAdminExecutiveSummaryEmail(date) {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para enviar el resumen ejecutivo admin.'
    };
  }
  return dispatchSharedTrackingAdminExecutiveSummaryEmail_({
    actor: getSharedTrackingActor_() || 'admin_manual',
    origin: 'envio_manual_resumen_admin',
    reportDate: date
  });
}

function createDailyAuditReportTrigger() {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para crear el trigger del recordatorio operativo matutino.'
    };
  }
  const config = getDailyAuditReportConfig_();
  if (config.mode !== 'REAL') {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: true,
      created: false,
      mode: config.mode,
      realSendConfirmed: config.realSendConfirmed,
      sendHour: config.sendHour,
      message: 'No se creó el trigger matutino porque PEC_VISOR_DAILY_REPORT_MODE no está en REAL.'
    };
  }
  if (!config.realSendConfirmed) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: true,
      created: false,
      mode: config.mode,
      realSendConfirmed: config.realSendConfirmed,
      sendHour: config.sendHour,
      message: 'No se creó el trigger matutino porque falta PEC_VISOR_DAILY_REPORT_CONFIRM_REAL_SEND=SI.'
    };
  }
  if (!config.to.length) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: true,
      created: false,
      mode: config.mode,
      realSendConfirmed: config.realSendConfirmed,
      sendHour: config.sendHour,
      message: 'No se creó el trigger matutino porque faltan destinatarios en PEC_VISOR_DAILY_REPORT_TO.'
    };
  }
  const replaced = recreateDailyAuditReportTrigger_();
  return {
    ok: true,
    actor: getSharedTrackingActor_(),
    admin: true,
    created: true,
    mode: config.mode,
    realSendConfirmed: config.realSendConfirmed,
    sendHour: config.sendHour,
    replacedTriggerCount: replaced,
    triggerCount: getDailyAuditReportTriggers_().length,
    message: replaced
      ? 'Trigger del recordatorio matutino reconfigurado para las ' + String(config.sendHour).padStart(2, '0') + ':00 de lunes a viernes.'
      : 'Trigger del recordatorio matutino creado para las ' + String(config.sendHour).padStart(2, '0') + ':00 de lunes a viernes.'
  };
}

function deleteDailyAuditReportTriggers() {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para eliminar el trigger del recordatorio operativo matutino.'
    };
  }
  let removed = 0;
  getDailyAuditReportTriggers_().forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
    removed += 1;
  });
  return {
    ok: true,
    actor: getSharedTrackingActor_(),
    admin: true,
    removed: removed,
    message: removed
      ? 'Se eliminaron los triggers del recordatorio operativo matutino.'
      : 'No había triggers del recordatorio operativo matutino para eliminar.'
  };
}

function createAdminExecutiveSummaryTrigger() {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para crear el trigger del resumen ejecutivo admin.'
    };
  }
  var config = getAdminExecutiveSummaryConfig_();
  if (!config.recipients.length) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: true,
      created: false,
      sendHour: config.sendHour,
      message: 'No se creó el trigger nocturno porque faltan correos administradores.'
    };
  }
  var replaced = recreateAdminExecutiveSummaryTrigger_();
  return {
    ok: true,
    actor: getSharedTrackingActor_(),
    admin: true,
    created: true,
    sendHour: config.sendHour,
    replacedTriggerCount: replaced,
    triggerCount: getAdminExecutiveSummaryTriggers_().length,
    message: replaced
      ? 'Trigger nocturno admin reconfigurado para las ' + String(config.sendHour).padStart(2, '0') + ':00 de lunes a viernes.'
      : 'Trigger nocturno admin creado para las ' + String(config.sendHour).padStart(2, '0') + ':00 de lunes a viernes.'
  };
}

function deleteAdminExecutiveSummaryTriggers() {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para eliminar el trigger del resumen ejecutivo admin.'
    };
  }
  var removed = 0;
  getAdminExecutiveSummaryTriggers_().forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
    removed += 1;
  });
  return {
    ok: true,
    actor: getSharedTrackingActor_(),
    admin: true,
    removed: removed,
    message: removed
      ? 'Se eliminaron los triggers nocturnos del resumen ejecutivo admin.'
      : 'No había triggers nocturnos del resumen ejecutivo admin para eliminar.'
  };
}

function runDailyAuditReportEmail_() {
  if (!isOperationalWeekday_(new Date())) {
    markOperationalExecution_('DAILY_REPORT', 'trigger_diario_reporte');
    return {
      ok: true,
      actor: getSharedTrackingActor_() || 'trigger_reporte_diario',
      admin: true,
      skipped: true,
      weekend: true,
      message: 'El recordatorio operativo matutino no se envió porque hoy no es un día hábil.'
    };
  }
  return dispatchSharedTrackingDailyAuditReportEmail_({
    actor: getSharedTrackingActor_() || 'trigger_reporte_diario',
    origin: 'trigger_diario_reporte'
  });
}

function runNightlyAdminExecutiveSummaryEmail_() {
  if (!isOperationalWeekday_(new Date())) {
    markOperationalExecution_('ADMIN_SUMMARY', 'trigger_nocturno_admin');
    var skippedWeekendAt = new Date().toISOString();
    appendSharedTrackingAudit_({
      at: skippedWeekendAt,
      actor: String(getSharedTrackingActor_() || 'trigger_nocturno_admin').trim(),
      action: 'omitir_resumen_ejecutivo_admin',
      origin: 'trigger_nocturno_admin',
      detail: 'Resumen ejecutivo admin omitido | Motivo: fin de semana',
      summary: {
        sendHour: getAdminExecutiveSummaryConfig_().sendHour
      },
      recipients: [],
      effectiveRecipients: [],
      skipped: true,
      reason: 'automatic_weekend_guard'
    });
    return {
      ok: true,
      actor: String(getSharedTrackingActor_() || 'trigger_nocturno_admin').trim(),
      admin: true,
      skipped: true,
      weekend: true,
      message: 'El resumen ejecutivo admin no se envió porque hoy no es un día hábil.'
    };
  }
  return dispatchSharedTrackingAdminExecutiveSummaryEmail_({
    actor: getSharedTrackingActor_() || 'trigger_nocturno_admin',
    origin: 'trigger_nocturno_admin'
  });
}

function getDailyAuditReportTriggers_() {
  return ScriptApp.getProjectTriggers().filter(function(trigger) {
    return trigger.getHandlerFunction && trigger.getHandlerFunction() === 'runDailyAuditReportEmail_';
  });
}

function resetDailyAuditReportWeekdayTrigger_() {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para reconfigurar el recordatorio operativo matutino.'
    };
  }
  var saved = updateSharedTrackingDailyReportConfig({
    sendHour: OPERATIONAL_DEFAULTS.dailyReportSendHour
  });
  if (!saved || !saved.ok) return saved;
  var trigger = createDailyAuditReportTrigger();
  return {
    ok: Boolean(trigger && trigger.ok),
    actor: getSharedTrackingActor_(),
    admin: true,
    saved: saved,
    trigger: trigger,
    sendHour: OPERATIONAL_DEFAULTS.dailyReportSendHour,
    message: trigger && trigger.ok
      ? 'El recordatorio operativo matutino quedó reconfigurado para las ' + String(OPERATIONAL_DEFAULTS.dailyReportSendHour).padStart(2, '0') + ':00 de lunes a viernes.'
      : 'Se actualizó la hora del recordatorio operativo matutino, pero no se pudo recrear el trigger automático.'
  };
}

function dispatchSharedTrackingDailyAuditReportEmail_(options) {
  const preview = buildSharedTrackingDailyAuditEmailPreview_(
    options && options.reportDate,
    { includeHtml: true }
  );
  if (!preview.ok) return preview;
  markOperationalExecution_('DAILY_REPORT', String(options && options.origin || 'sendSharedTrackingDailyAuditReportEmail').trim());
  if (preview.mode === 'PREVIEW_ONLY') {
    return {
      ok: true,
      actor: String(options && options.actor || getSharedTrackingActor_() || 'admin_manual').trim(),
      admin: isSharedTrackingAdmin_(),
      sent: false,
      mode: preview.mode,
      recipients: preview.recipients,
      effectiveRecipients: preview.effectiveRecipients,
      cc: preview.cc,
      testRecipients: preview.testRecipients,
      realSendConfirmed: preview.realSendConfirmed,
      sendHour: preview.sendHour,
      reportDate: preview.report.date,
      report: preview.report,
      subject: preview.subject,
      message: 'Modo PREVIEW_ONLY activo. No se envió el recordatorio operativo matutino.'
    };
  }
  if (preview.mode === 'REAL' && !preview.realSendConfirmed) {
    return {
      ok: false,
      actor: String(options && options.actor || getSharedTrackingActor_() || 'admin_manual').trim(),
      admin: isSharedTrackingAdmin_(),
      sent: false,
      mode: preview.mode,
      recipients: preview.recipients,
      effectiveRecipients: preview.effectiveRecipients,
      cc: preview.cc,
      testRecipients: preview.testRecipients,
      realSendConfirmed: preview.realSendConfirmed,
      sendHour: preview.sendHour,
      reportDate: preview.report.date,
      report: preview.report,
      subject: preview.subject,
      message: 'Modo REAL solicitado, pero falta PEC_VISOR_DAILY_REPORT_CONFIRM_REAL_SEND=SI para el recordatorio matutino.'
    };
  }
  if (preview.mode === 'TEST_REDIRECT' && !preview.testRecipients.length) {
    return {
      ok: false,
      actor: String(options && options.actor || getSharedTrackingActor_() || 'admin_manual').trim(),
      admin: isSharedTrackingAdmin_(),
      sent: false,
      mode: preview.mode,
      recipients: preview.recipients,
      effectiveRecipients: preview.effectiveRecipients,
      cc: preview.cc,
      testRecipients: preview.testRecipients,
      realSendConfirmed: preview.realSendConfirmed,
      sendHour: preview.sendHour,
      reportDate: preview.report.date,
      report: preview.report,
      subject: preview.subject,
      message: 'Modo TEST_REDIRECT activo, pero faltan destinatarios en PEC_VISOR_DAILY_REPORT_TEST_RECIPIENTS.'
    };
  }
  if (!preview.to) {
    return {
      ok: false,
      actor: String(options && options.actor || getSharedTrackingActor_() || 'admin_manual').trim(),
      admin: isSharedTrackingAdmin_(),
      sent: false,
      mode: preview.mode,
      recipients: preview.recipients,
      effectiveRecipients: preview.effectiveRecipients,
      cc: preview.cc,
      testRecipients: preview.testRecipients,
      realSendConfirmed: preview.realSendConfirmed,
      sendHour: preview.sendHour,
      reportDate: preview.report.date,
      report: preview.report,
      subject: preview.subject,
      message: 'Faltan destinatarios del recordatorio operativo matutino en PEC_VISOR_DAILY_REPORT_TO.'
    };
  }
  const mailOptions = {
    htmlBody: preview.htmlBody,
    name: 'Visor de Seguimiento PEC'
  };
  if (preview.cc.length) mailOptions.cc = preview.cc.join(',');
  MailApp.sendEmail(preview.to, preview.subject, preview.plainBody, mailOptions);
  const sentAt = new Date().toISOString();
  const actorMeta = buildAuditActorMeta_(resolveSharedTrackingActorInfo_(options && options.actor));
  appendSharedTrackingAudit_({
    at: sentAt,
    actor: actorMeta.actor || String(options && options.actor || 'trigger_reporte_diario').trim(),
    actorEmail: actorMeta.actorEmail,
    actorSource: actorMeta.actorSource,
    actorVerified: actorMeta.actorVerified,
    declaredActor: actorMeta.declaredActor,
    action: 'enviar_reporte_diario_correo',
    origin: String(options && options.origin || 'sendSharedTrackingDailyAuditReportEmail').trim(),
    detail: 'Reporte diario enviado para ' + (preview.report.dateLabel || preview.report.date) + ' | Usuarios: ' + Number(preview.report.totalActors || 0) + ' | Movimientos: ' + Number(preview.report.totalEntries || 0) + ' | Modo: ' + preview.mode,
    summary: {
      total: Number(preview.report.totalEntries || 0),
      totalActors: Number(preview.report.totalActors || 0),
      totalChanges: Number(preview.report.totalChanges || 0),
      reportDate: preview.report.date,
      recipients: preview.effectiveRecipients.length,
      effectiveRecipients: preview.effectiveRecipients,
      mode: preview.mode,
      testRecipients: preview.testRecipients,
      realSendConfirmed: preview.realSendConfirmed,
      touchedRecords: preview.report.actors
        .flatMap(function(actor) {
          return Array.isArray(actor.touchedRecordIds)
            ? actor.touchedRecordIds
            : (Array.isArray(actor.touchedRecords) ? actor.touchedRecords : []);
        })
        .slice(0, 20)
    },
    recipients: preview.effectiveRecipients,
    effectiveRecipients: preview.effectiveRecipients,
    mode: preview.mode,
    isTest: preview.mode === 'TEST_REDIRECT',
    reportDate: preview.report.date
  });
  markOperationalDelivery_(
    'DAILY_REPORT',
    String(options && options.origin || 'sendSharedTrackingDailyAuditReportEmail').trim(),
    preview.effectiveRecipients,
    sentAt
  );
  return {
    ok: true,
    actor: actorMeta.actor || String(options && options.actor || 'trigger_reporte_diario').trim(),
    admin: isSharedTrackingAdmin_(),
    sent: true,
    sentAt: sentAt,
    mode: preview.mode,
    recipients: preview.recipients,
    effectiveRecipients: preview.effectiveRecipients,
    cc: preview.cc,
    testRecipients: preview.testRecipients,
    realSendConfirmed: preview.realSendConfirmed,
    sendHour: preview.sendHour,
    reportDate: preview.report.date,
    report: preview.report,
    subject: preview.subject,
    message: 'Reporte diario enviado a ' + preview.effectiveRecipients.join(', ') + '.'
  };
}

function buildSharedTrackingDailyAuditEmailPreview_(date, options) {
  const settings = options || {};
  const config = getDailyAuditReportConfig_();
  const timezone = Session.getScriptTimeZone();
  const normalizedDate = normalizeRequestedAuditReportDate_(date, timezone);
  const report = buildAuditDailyReportFromItems_(loadSharedTrackingAudit_(), normalizedDate, timezone, {
    mode: 'apps_script',
    actor: getSharedTrackingActor_()
  });
  report.actor = getSharedTrackingActor_();
  report.admin = isSharedTrackingAdmin_();
  const recipients = config.mode === 'TEST_REDIRECT' ? config.testRecipients.slice() : config.to.slice();
  const prefix = config.mode === 'TEST_REDIRECT' ? '[PRUEBA PEC] ' : '';
  const subject = prefix + 'PEC | Recordatorio operativo diario | ' + (report.dateLabel || report.date || normalizedDate) + ' | Actualiza el visor hoy';
  const plainBody = buildSharedTrackingDailyAuditEmailPlainText_(report, config, getTrackingWebAppUrl_());
  const preview = {
    ok: true,
    actor: getSharedTrackingActor_(),
    admin: isSharedTrackingAdmin_(),
    preview: true,
    mode: config.mode,
    recipients: config.to.slice(),
    effectiveRecipients: recipients,
    to: recipients.join(','),
    cc: config.cc.slice(),
    testRecipients: config.testRecipients.slice(),
    realSendConfirmed: config.realSendConfirmed,
    sendHour: config.sendHour,
    webappUrl: getTrackingWebAppUrl_(),
    report: report,
    subject: subject,
    plainBody: plainBody
  };
  if (settings.includeHtml !== false) {
    preview.htmlBody = buildSharedTrackingDailyAuditEmailHtml_(report, config, preview.webappUrl);
  }
  return preview;
}

function buildSharedTrackingDailyAuditEmailPlainText_(report, config, webappUrl) {
  return [
    'Visor de Seguimiento PEC',
    config && config.mode === 'TEST_REDIRECT' ? 'Correo de prueba. No enviado al destinatario final.' : '',
    'Recordatorio operativo diario: ' + (report.dateLabel || report.date || ''),
    'Generado: ' + formatTrackingDateTime_(report.generatedAt),
    'Este correo se envía como recordatorio para trabajar y actualizar el visor durante el día, existan o no cambios registrados al momento del envío.',
    '',
    textOrDash_(report.plainText),
    '',
    'Abrir visor compartido: ' + webappUrl,
    '',
    'Este mensaje fue generado automáticamente por el Visor de Seguimiento PEC.'
  ].filter(Boolean).join('\n');
}

function buildSharedTrackingDailyAuditEmailHtml_(report, config, webappUrl) {
  const actors = Array.isArray(report.actors) ? report.actors : [];
  const rows = actors.map(function(actor) {
    return '<tr>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;">' + escapeHtmlEmail_(actor.actor || 'Usuario sin identificar') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;">' + escapeHtmlEmail_(actor.identityLabel || 'Sin identificación confiable') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;text-align:center;">' + escapeHtmlEmail_(String(actor.totalEntries || 0)) + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;text-align:center;">' + escapeHtmlEmail_(String(actor.totalChanges || 0)) + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;">' + escapeHtmlEmail_(formatTrackingDateTime_(actor.lastChangeAt) || 'Sin hora') + '</td>' +
    '</tr>';
  }).join('');
  const detailSections = actors.length
    ? actors.map(renderSharedTrackingDailyAuditActorSectionHtml_).join('')
    : '<div style="padding:14px;border:1px solid #d7e2ef;border-radius:12px;background:#ffffff;color:#4d6379;">Sin cambios auditados para la fecha seleccionada.</div>';
  const introNotice = config && config.mode === 'TEST_REDIRECT'
    ? '<p style="margin:0 0 14px;padding:10px 12px;border:1px solid #e7d8a7;background:#fff7df;color:#6a4a00;border-radius:8px;"><strong>Correo de prueba.</strong> No enviado al destinatario final.</p>'
    : '';
  return [
    '<div style="font-family:Arial,sans-serif;color:#16324f;line-height:1.5;max-width:980px;">',
    '<h2 style="margin:0 0 10px;font-size:20px;">Visor de Seguimiento PEC</h2>',
    '<p style="margin:0 0 12px;">Se remite el recordatorio operativo diario del visor compartido correspondiente al <strong>' + escapeHtmlEmail_(report.dateLabel || report.date || '') + '</strong>.</p>',
    '<p style="margin:0 0 12px;">Este mensaje se envía a primera hora para recordar la actualización del visor durante el día, incluso si todavía no existen movimientos registrados.</p>',
    '<p style="margin:0 0 12px;">Usuarios con cambios hasta el momento: <strong>' + escapeHtmlEmail_(String(report.totalActors || 0)) + '</strong> | Movimientos auditados: <strong>' + escapeHtmlEmail_(String(report.totalEntries || 0)) + '</strong> | Registros tocados: <strong>' + escapeHtmlEmail_(String(report.totalTouchedRecords || 0)) + '</strong></p>',
    introNotice,
    '<p style="margin:0 0 12px;color:#4d6379;font-size:12px;">Generado: ' + escapeHtmlEmail_(formatTrackingDateTime_(report.generatedAt) || report.generatedAt || '') + '</p>',
    '<table style="border-collapse:collapse;width:100%;font-size:13px;background:#ffffff;">',
    '<thead><tr style="background:#edf4fb;color:#16324f;">',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">Usuario</th>',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">Identidad</th>',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:center;">Movimientos</th>',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:center;">Impactos</th>',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">Último cambio</th>',
    '</tr></thead><tbody>',
    rows || '<tr><td colspan="5" style="padding:8px;border:1px solid #d7e2ef;">Sin cambios auditados para la fecha seleccionada.</td></tr>',
    '</tbody></table>',
    '<p style="margin:18px 0 0;"><a href="' + escapeHtmlEmail_(webappUrl) + '" style="display:inline-block;padding:10px 16px;border-radius:8px;background:#1d5f8f;color:#ffffff;text-decoration:none;font-weight:600;">Abrir visor compartido</a></p>',
    '<div style="margin:18px 0 0;padding:16px;border-radius:14px;background:#f7fbff;border:1px solid #d7e2ef;">',
    '<h3 style="margin:0 0 6px;font-size:17px;color:#16324f;">Estado del día al momento del envío</h3>',
    '<p style="margin:0 0 14px;color:#4d6379;font-size:13px;">Se presenta el mismo contenido estructurado por usuario, identidad, acciones y movimientos auditados como base de seguimiento durante la jornada.</p>',
    detailSections,
    '</div>',
    '<p style="margin:16px 0 0;color:#4d6379;font-size:12px;">Este mensaje fue generado automáticamente por el Visor de Seguimiento PEC.</p>',
    '</div>'
  ].join('');
}

function renderSharedTrackingDailyAuditActorSectionHtml_(actor) {
  const safeActor = actor && typeof actor === 'object' ? actor : {};
  const entries = Array.isArray(safeActor.entries) ? safeActor.entries : [];
  const entryRows = entries.map(function(entry) {
    return '<tr>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;vertical-align:top;white-space:nowrap;">' + escapeHtmlEmail_(formatTrackingDateTime_(entry.at) || 'Sin hora') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;vertical-align:top;">' + escapeHtmlEmail_(entry.actionLabel || humanizeAuditAction_(entry.action)) + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;vertical-align:top;">' + escapeHtmlEmail_(entry.detail || 'Sin detalle.') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;vertical-align:top;">' + renderSharedTrackingDailyAuditLabelListHtml_(entry.touchedRecords, 5, 'Sin registros asociados') + '</td>' +
    '</tr>';
  }).join('');
  return [
    '<div style="margin:0 0 14px;padding:14px;border:1px solid #d7e2ef;border-radius:12px;background:#ffffff;">',
    '<h4 style="margin:0 0 10px;font-size:16px;color:#16324f;">' + escapeHtmlEmail_(safeActor.actor || 'Usuario sin identificar') + '</h4>',
    '<table style="border-collapse:collapse;width:100%;font-size:13px;background:#ffffff;margin:0 0 12px;">',
    '<tbody>',
    renderSharedTrackingDailyAuditInfoRowHtml_('Identidad', safeActor.identityLabel || 'Sin identificación confiable'),
    renderSharedTrackingDailyAuditInfoRowHtml_('Origen de identidad', (Array.isArray(safeActor.identitySources) && safeActor.identitySources.length) ? safeActor.identitySources.join(' | ') : 'Sin origen identificado'),
    renderSharedTrackingDailyAuditInfoRowHtml_('Movimientos e impactos', Number(safeActor.totalEntries || 0) + ' movimientos | ' + Number(safeActor.totalChanges || 0) + ' impactos'),
    renderSharedTrackingDailyAuditInfoRowHtml_('Último cambio', formatTrackingDateTime_(safeActor.lastChangeAt) || 'Sin hora'),
    renderSharedTrackingDailyAuditInfoRowHtml_('Acciones registradas', renderSharedTrackingDailyAuditCountListText_(safeActor.actions, humanizeAuditAction_, 'Sin acciones registradas')),
    renderSharedTrackingDailyAuditInfoRowHtml_('Secciones impactadas', renderSharedTrackingDailyAuditCountListText_(safeActor.sections, null, 'Sin secciones consolidadas')),
    renderSharedTrackingDailyAuditInfoRowHtml_('Registros tocados', renderSharedTrackingDailyAuditLabelListHtml_(safeActor.touchedRecords, 8, 'Sin registros asociados'), { allowHtml: true }),
    '</tbody></table>',
    '<table style="border-collapse:collapse;width:100%;font-size:12px;background:#ffffff;">',
    '<thead><tr style="background:#edf4fb;color:#16324f;">',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">Hora</th>',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">Acción</th>',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">Detalle</th>',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">Registros</th>',
    '</tr></thead><tbody>',
    entryRows || '<tr><td colspan="4" style="padding:8px;border:1px solid #d7e2ef;">Sin movimientos auditados para este usuario.</td></tr>',
    '</tbody></table>',
    '</div>'
  ].join('');
}

function renderSharedTrackingDailyAuditInfoRowHtml_(label, value, options) {
  const settings = options && typeof options === 'object' ? options : {};
  const cellContent = settings.allowHtml ? String(value || '') : escapeHtmlEmail_(value);
  return '<tr>' +
    '<td style="padding:6px 8px;border:1px solid #d7e2ef;background:#f7fbff;color:#4d6379;width:180px;font-weight:700;vertical-align:top;">' + escapeHtmlEmail_(label) + '</td>' +
    '<td style="padding:6px 8px;border:1px solid #d7e2ef;vertical-align:top;">' + cellContent + '</td>' +
  '</tr>';
}

function renderSharedTrackingDailyAuditCountListText_(items, labelFormatter, fallback) {
  const list = Array.isArray(items) ? items : [];
  const rendered = list
    .map(function(item) {
      const rawName = String(item && item.name || '').trim();
      const safeName = typeof labelFormatter === 'function' ? labelFormatter(rawName) : rawName;
      const count = Number(item && item.count || 0);
      return safeName ? (safeName + ' (' + count + ')') : '';
    })
    .filter(Boolean);
  return rendered.length ? rendered.join('; ') : fallback;
}

function buildSharedTrackingOperationalAudience_() {
  var dailyConfig = getDailyAuditReportConfig_();
  var emailMap = getTrackingNotificationEmailMap_();
  var recipients = []
    .concat(Array.isArray(dailyConfig.configuredTo) && dailyConfig.configuredTo.length ? dailyConfig.configuredTo : dailyConfig.to)
    .concat(getSharedTrackingOperationalEmailList_())
    .concat(getTrackingNotificationDgppcsRecipients_(emailMap));
  var seen = {};
  return recipients
    .map(function(item) { return String(item || '').trim().toLowerCase(); })
    .filter(function(email) {
      return Boolean(email && !seen[email] && isEmailLike_(email) && (seen[email] = true));
    })
    .map(function(email) {
      return {
        email: email,
        actor: resolveTrackingActorDisplayName_(email, email)
      };
    })
    .sort(function(a, b) {
      return String(a.actor || a.email).localeCompare(String(b.actor || b.email), 'es', { sensitivity: 'base' });
    });
}

function buildAdminExecutiveSummaryAudienceSnapshot_(report) {
  var summary = report && typeof report === 'object' ? report : {};
  var actors = Array.isArray(summary.actors) ? summary.actors : [];
  var audience = buildSharedTrackingOperationalAudience_();
  var activeEmails = {};
  actors.forEach(function(actor) {
    (Array.isArray(actor && actor.emails) ? actor.emails : []).forEach(function(email) {
      var normalized = String(email || '').trim().toLowerCase();
      if (normalized) activeEmails[normalized] = true;
    });
  });
  var inactiveAudience = audience.filter(function(entry) {
    return !activeEmails[String(entry.email || '').trim().toLowerCase()];
  });
  return {
    activeEmails: Object.keys(activeEmails),
    expectedAudience: audience,
    inactiveAudience: inactiveAudience
  };
}

function buildSharedTrackingAdminExecutiveSummaryPreview_(date, options) {
  var settings = options || {};
  var config = getAdminExecutiveSummaryConfig_();
  var timezone = Session.getScriptTimeZone();
  var normalizedDate = normalizeRequestedAuditReportDate_(date, timezone);
  var auditItems = loadSharedTrackingAudit_().filter(function(item) {
    return getAuditDateKeyInTimezone_(item && item.at, timezone) === normalizedDate;
  });
  var report = buildAuditDailyReportFromItems_(auditItems, normalizedDate, timezone, {
    mode: 'apps_script',
    actor: getSharedTrackingActor_()
  });
  var snapshot = buildAdminExecutiveSummaryAudienceSnapshot_(report);
  var recipients = config.recipients.slice();
  var subject = 'PEC | Resumen ejecutivo admin | ' + (report.dateLabel || report.date || normalizedDate) + ' | ' + Number(report.totalActors || 0) + ' usuario(s) con cambios';
  var preview = {
    ok: true,
    actor: getSharedTrackingActor_(),
    admin: isSharedTrackingAdmin_(),
    recipients: recipients,
    effectiveRecipients: recipients.slice(),
    to: recipients.join(','),
    sendHour: config.sendHour,
    webappUrl: getTrackingWebAppUrl_(),
    report: report,
    auditItems: auditItems,
    expectedAudience: snapshot.expectedAudience,
    inactiveAudience: snapshot.inactiveAudience,
    subject: subject
  };
  preview.plainBody = buildSharedTrackingAdminExecutiveSummaryPlainText_(preview);
  if (settings.includeHtml !== false) {
    preview.htmlBody = buildSharedTrackingAdminExecutiveSummaryHtml_(preview);
  }
  return preview;
}

function buildSharedTrackingAdminExecutiveSummaryPlainText_(preview) {
  var safePreview = preview && typeof preview === 'object' ? preview : {};
  var report = safePreview.report || {};
  var inactive = Array.isArray(safePreview.inactiveAudience) ? safePreview.inactiveAudience : [];
  var expected = Array.isArray(safePreview.expectedAudience) ? safePreview.expectedAudience : [];
  var lines = [
    'Visor de Seguimiento PEC',
    'Resumen ejecutivo admin con corte: ' + (report.dateLabel || report.date || ''),
    'Generado: ' + formatTrackingDateTime_(report.generatedAt),
    'Usuarios esperados: ' + expected.length,
    'Usuarios con cambios: ' + Number(report.totalActors || 0),
    'Usuarios sin cambios: ' + inactive.length,
    'Movimientos auditados: ' + Number(report.totalEntries || 0),
    'Impactos auditados: ' + Number(report.totalChanges || 0),
    'Registros tocados: ' + Number(report.totalTouchedRecords || 0),
    '',
    'Este resumen ejecutivo se envía con respaldo de auditoría y backup para facilitar revisión y eventual reversión manual controlada.',
    ''
  ];
  if (inactive.length) {
    lines.push('Usuarios sin cambios registrados:');
    inactive.forEach(function(entry) {
      lines.push('- ' + (entry.actor || entry.email) + ' | ' + entry.email);
    });
    lines.push('');
  }
  lines.push(textOrDash_(report.plainText));
  lines.push('');
  lines.push('Abrir visor compartido: ' + safePreview.webappUrl);
  lines.push('');
  lines.push('Se adjuntan la auditoría del día y el backup compartido más reciente.');
  return lines.filter(Boolean).join('\n');
}

function buildSharedTrackingAdminExecutiveSummaryHtml_(preview) {
  var safePreview = preview && typeof preview === 'object' ? preview : {};
  var report = safePreview.report || {};
  var actors = Array.isArray(report.actors) ? report.actors : [];
  var inactive = Array.isArray(safePreview.inactiveAudience) ? safePreview.inactiveAudience : [];
  var expected = Array.isArray(safePreview.expectedAudience) ? safePreview.expectedAudience : [];
  var inactiveHtml = inactive.length
    ? '<div style="margin:0 0 14px;padding:14px;border:1px solid #f0d7a7;border-radius:12px;background:#fff8e7;">' +
        '<h4 style="margin:0 0 8px;font-size:16px;color:#6a4a00;">Usuarios sin cambios registrados</h4>' +
        '<ul style="margin:0;padding-left:18px;color:#6a4a00;">' +
        inactive.map(function(entry) {
          return '<li>' + escapeHtmlEmail_(String(entry.actor || entry.email || 'Sin identificar')) + ' | ' + escapeHtmlEmail_(String(entry.email || '')) + '</li>';
        }).join('') +
        '</ul>' +
      '</div>'
    : '<div style="margin:0 0 14px;padding:14px;border:1px solid #d7e2ef;border-radius:12px;background:#f7fbff;color:#1d5f8f;"><strong>Todos los usuarios esperados registraron actividad hoy.</strong></div>';
  var detailSections = actors.length
    ? actors.map(renderSharedTrackingDailyAuditActorSectionHtml_).join('')
    : '<div style="padding:14px;border:1px solid #d7e2ef;border-radius:12px;background:#ffffff;color:#4d6379;">No se registraron cambios auditados durante el día.</div>';
  return [
    '<div style="font-family:Arial,sans-serif;color:#16324f;line-height:1.5;max-width:980px;">',
    '<h2 style="margin:0 0 10px;font-size:20px;">Visor de Seguimiento PEC</h2>',
    '<p style="margin:0 0 12px;">Se remite el resumen ejecutivo nocturno para administradores con corte del <strong>' + escapeHtmlEmail_(report.dateLabel || report.date || '') + '</strong>.</p>',
    '<p style="margin:0 0 12px;">Usuarios esperados: <strong>' + escapeHtmlEmail_(String(expected.length || 0)) + '</strong> | Usuarios con cambios: <strong>' + escapeHtmlEmail_(String(report.totalActors || 0)) + '</strong> | Usuarios sin cambios: <strong>' + escapeHtmlEmail_(String(inactive.length || 0)) + '</strong></p>',
    '<p style="margin:0 0 12px;">Movimientos auditados: <strong>' + escapeHtmlEmail_(String(report.totalEntries || 0)) + '</strong> | Impactos: <strong>' + escapeHtmlEmail_(String(report.totalChanges || 0)) + '</strong> | Registros tocados: <strong>' + escapeHtmlEmail_(String(report.totalTouchedRecords || 0)) + '</strong></p>',
    '<p style="margin:0 0 12px;color:#4d6379;font-size:12px;">Generado: ' + escapeHtmlEmail_(formatTrackingDateTime_(report.generatedAt) || report.generatedAt || '') + '</p>',
    '<p style="margin:0 0 14px;padding:10px 12px;border:1px solid #d7e2ef;background:#f7fbff;color:#16324f;border-radius:8px;">Se adjuntan la auditoría del día y el backup compartido más reciente como base para revisión y eventual reversión manual controlada.</p>',
    inactiveHtml,
    '<p style="margin:18px 0 0;"><a href="' + escapeHtmlEmail_(safePreview.webappUrl) + '" style="display:inline-block;padding:10px 16px;border-radius:8px;background:#1d5f8f;color:#ffffff;text-decoration:none;font-weight:600;">Abrir visor compartido</a></p>',
    '<div style="margin:18px 0 0;padding:16px;border-radius:14px;background:#f7fbff;border:1px solid #d7e2ef;">',
    '<h3 style="margin:0 0 6px;font-size:17px;color:#16324f;">Detalle por usuario y acción</h3>',
    '<p style="margin:0 0 14px;color:#4d6379;font-size:13px;">Se presenta el detalle de auditoría por actor, identidad, acciones y registros tocados durante la jornada.</p>',
    detailSections,
    '</div>',
    '<p style="margin:16px 0 0;color:#4d6379;font-size:12px;">Este mensaje fue generado automáticamente por el Visor de Seguimiento PEC.</p>',
    '</div>'
  ].join('');
}

function textOrDash_(value) {
  const raw = String(value == null ? '' : value).trim();
  return raw || '-';
}

function dispatchSharedTrackingAdminExecutiveSummaryEmail_(options) {
  var safeOptions = options || {};
  var preview = buildSharedTrackingAdminExecutiveSummaryPreview_(safeOptions.reportDate, { includeHtml: true });
  if (!preview.ok) return preview;
  markOperationalExecution_('ADMIN_SUMMARY', String(safeOptions.origin || 'sendSharedTrackingAdminExecutiveSummaryEmail').trim());
  if (!preview.to) {
    return {
      ok: false,
      actor: String(safeOptions.actor || getSharedTrackingActor_() || 'admin_manual').trim(),
      admin: isSharedTrackingAdmin_(),
      sent: false,
      sendHour: preview.sendHour,
      recipients: preview.recipients,
      effectiveRecipients: preview.effectiveRecipients,
      reportDate: preview.report.date,
      report: preview.report,
      subject: preview.subject,
      message: 'Faltan administradores configurados para el resumen ejecutivo nocturno.'
    };
  }
  var backup = writeSharedTrackingBackup_(loadSharedTrackingState_());
  var auditFileName = 'auditoria_resumen_admin_' + String(preview.report.date || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd')).replace(/[^0-9-]/g, '') + '.json';
  var attachments = [
    Utilities.newBlob(JSON.stringify({
      generatedAt: new Date().toISOString(),
      reportDate: preview.report.date,
      summary: {
        totalActors: Number(preview.report.totalActors || 0),
        totalEntries: Number(preview.report.totalEntries || 0),
        totalChanges: Number(preview.report.totalChanges || 0),
        totalTouchedRecords: Number(preview.report.totalTouchedRecords || 0),
        inactiveAudience: preview.inactiveAudience
      },
      report: preview.report,
      auditItems: preview.auditItems
    }, null, 2), 'application/json', auditFileName),
    Utilities.newBlob(String(backup.content || ''), 'application/json', String(backup.fileName || 'shared_tracking_backup.json'))
  ];
  MailApp.sendEmail(preview.to, preview.subject, preview.plainBody, {
    htmlBody: preview.htmlBody,
    attachments: attachments,
    name: 'Visor de Seguimiento PEC'
  });
  var sentAt = new Date().toISOString();
  var actorMeta = buildAuditActorMeta_(resolveSharedTrackingActorInfo_(safeOptions.actor));
  appendSharedTrackingAudit_({
    at: sentAt,
    actor: actorMeta.actor || String(safeOptions.actor || 'trigger_nocturno_admin').trim(),
    actorEmail: actorMeta.actorEmail,
    actorSource: actorMeta.actorSource,
    actorVerified: actorMeta.actorVerified,
    declaredActor: actorMeta.declaredActor,
    action: 'enviar_resumen_ejecutivo_admin',
    origin: String(safeOptions.origin || 'sendSharedTrackingAdminExecutiveSummaryEmail').trim(),
    detail: 'Resumen ejecutivo admin enviado para ' + (preview.report.dateLabel || preview.report.date) + ' | Usuarios con cambios: ' + Number(preview.report.totalActors || 0) + ' | Usuarios sin cambios: ' + Number((preview.inactiveAudience || []).length || 0),
    summary: {
      total: Number(preview.report.totalEntries || 0),
      totalActors: Number(preview.report.totalActors || 0),
      inactiveUsers: Number((preview.inactiveAudience || []).length || 0),
      recipients: preview.effectiveRecipients.length,
      effectiveRecipients: preview.effectiveRecipients,
      reportDate: preview.report.date,
      backupFile: backup.fileName,
      backupUpdatedAt: backup.updatedAt
    },
    recipients: preview.effectiveRecipients,
    effectiveRecipients: preview.effectiveRecipients,
    reportDate: preview.report.date
  });
  markOperationalDelivery_(
    'ADMIN_SUMMARY',
    String(safeOptions.origin || 'sendSharedTrackingAdminExecutiveSummaryEmail').trim(),
    preview.effectiveRecipients,
    sentAt
  );
  return {
    ok: true,
    actor: actorMeta.actor || String(safeOptions.actor || 'trigger_nocturno_admin').trim(),
    admin: isSharedTrackingAdmin_(),
    sent: true,
    sentAt: sentAt,
    sendHour: preview.sendHour,
    recipients: preview.recipients,
    effectiveRecipients: preview.effectiveRecipients,
    reportDate: preview.report.date,
    report: preview.report,
    inactiveAudience: preview.inactiveAudience,
    subject: preview.subject,
    backup: {
      fileName: backup.fileName,
      updatedAt: backup.updatedAt
    },
    message: 'Resumen ejecutivo admin enviado a ' + preview.effectiveRecipients.join(', ') + '.'
  };
}

function previewDueTrackingEmails() {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para preparar correos de seguimiento.'
    };
  }
  return buildDueTrackingNotifications_({ preview: true, includeHtml: false });
}

function sendDueTrackingEmails() {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para enviar alertas por correo.'
    };
  }
  return dispatchDueTrackingEmails_({
    actor: getSharedTrackingActor_() || 'admin_manual',
    origin: 'envio_manual_alertas'
  });
}

// Correo manual de orientación para que el equipo DGPPCS entre al visor con el
// enlace compartido y una guía ligera alojada en GitHub Pages.
function sendSharedVisorAccessGuideEmail_() {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para enviar la guía de acceso al visor.'
    };
  }
  var emailDirectory = getTrackingNotificationEmailDirectory_();
  var emailMap = getTrackingNotificationEmailMap_();
  var recipients = Array.from(new Set(
    emailDirectory.map(function(entry) { return String(entry && entry.email || '').trim().toLowerCase(); })
      .concat(getTrackingNotificationDgppcsRecipients_(emailMap))
      .filter(Boolean)
  ));
  if (!recipients.length) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: true,
      sentCount: 0,
      recipients: [],
      message: 'No hay correos configurados para enviar la guía de acceso al visor.'
    };
  }
  var webappUrl = getTrackingWebAppUrl_();
  var guideUrl = PANEL_PUBLIC_VISOR_GUIDE_URL;
  var sentAt = new Date();
  var generatedAtLabel = formatTrackingDateTime_(sentAt);
  var subject = 'PEC | Acceso al visor compartido y guía rápida de uso';
  var htmlBody = buildSharedVisorAccessGuideHtml_(webappUrl, guideUrl, generatedAtLabel);
  var plainBody = buildSharedVisorAccessGuidePlainText_(webappUrl, guideUrl, generatedAtLabel);
  recipients.forEach(function(recipient) {
    MailApp.sendEmail(recipient, subject, plainBody, {
      htmlBody: htmlBody,
      name: 'Visor de Seguimiento PEC'
    });
  });
  appendSharedTrackingAudit_({
    at: sentAt.toISOString(),
    actor: String(getSharedTrackingActor_() || 'admin_manual').trim(),
    action: 'enviar_guia_acceso_visor',
    origin: 'sendSharedVisorAccessGuideEmail',
    detail: 'Guía de acceso al visor enviada | Destinatarios: ' + recipients.length,
    summary: {
      total: recipients.length,
      recipients: recipients,
      webappUrl: webappUrl,
      guideUrl: guideUrl
    },
    recipients: recipients,
    effectiveRecipients: recipients
  });
  return {
    ok: true,
    actor: String(getSharedTrackingActor_() || 'admin_manual').trim(),
    admin: true,
    sentAt: sentAt.toISOString(),
    sentCount: recipients.length,
    recipients: recipients,
    webappUrl: webappUrl,
    guideUrl: guideUrl,
    message: 'Se envió el acceso al visor y la guía rápida a los correos DGPPCS configurados.'
  };
}

function getDueTrackingNotificationStatus() {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para revisar la configuración de alertas por correo.'
    };
  }
  var config = getTrackingNotificationConfig_();
  var emailDirectory = getTrackingNotificationEmailDirectory_();
  var emailMap = getTrackingNotificationEmailMap_();
  var dgppcsRecipients = getTrackingNotificationDgppcsRecipients_(emailMap);
  var triggers = getDueTrackingNotificationTriggers_();
  var markerState = readOperationalMarkerState_('DUE_TRACKING');
  return {
    ok: true,
    actor: getSharedTrackingActor_(),
    admin: true,
    mode: config.mode,
    testRecipients: config.testRecipients.slice(),
    realSendConfirmed: config.realSendConfirmed,
    liveModeReady: isLiveDueTrackingNotificationMode_(config),
    mappedRecipientCount: emailDirectory.length,
    mappedRecipients: emailDirectory.map(function(entry) { return entry.email; }),
    dgppcsRecipients: dgppcsRecipients.slice(),
    cc: getTrackingNotificationCcList_(),
    ccScope: getTrackingNotificationCcScope_(),
    sendHour: OPERATIONAL_DEFAULTS.weekdayAutoSendHour,
    scheduleLabel: 'Lunes a viernes | ' + String(OPERATIONAL_DEFAULTS.weekdayAutoSendHour).padStart(2, '0') + ':00',
    triggerCount: triggers.length,
    triggerEnabled: triggers.length > 0,
    lastExecutionAt: markerState.lastExecutionAt,
    lastExecutionOrigin: markerState.lastExecutionOrigin,
    lastDeliveryAt: markerState.lastDeliveryAt,
    lastDeliveryOrigin: markerState.lastDeliveryOrigin,
    lastDeliveryRecipients: markerState.lastDeliveryRecipients,
    lastDeliveryRecipientsCount: markerState.lastDeliveryRecipients.length,
    message: isLiveDueTrackingNotificationMode_(config)
      ? 'El envío operativo está listo para despacho real a los responsables DGPPCS.'
      : 'El envío operativo no está listo para despacho real. Revisa el modo y la confirmación REAL.'
  };
}

function getSharedTrackingOperationalControlStatus() {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para revisar el centro de control operativo.'
    };
  }
  var dailyReport = getSharedTrackingDailyReportDeliveryStatus();
  var dueTracking = getDueTrackingNotificationStatus();
  var adminSummary = getSharedTrackingAdminExecutiveSummaryStatus();
  var backend = getSharedTrackingBackendMeta_();
  var products = buildSharedTrackingOperationalProducts_(dailyReport, dueTracking);
  var controlReady = Boolean(
    dailyReport && dailyReport.ok !== false &&
    dueTracking && dueTracking.ok !== false &&
    adminSummary && adminSummary.ok !== false &&
    dailyReport.triggerEnabled &&
    dueTracking.triggerEnabled &&
    adminSummary.triggerEnabled
  );
  return {
    ok: true,
    actor: getSharedTrackingActor_(),
    admin: true,
    backend: backend,
    dailyReport: dailyReport,
    dueTracking: dueTracking,
    adminSummary: adminSummary,
    products: products,
    controlReady: controlReady,
    message: controlReady
      ? 'Centro de control operativo listo para recordatorio matutino, resumen admin y correos automáticos.'
      : 'Centro de control operativo con puntos por revisar antes del siguiente corte automático.'
  };
}

function buildSharedTrackingOperationalProducts_(dailyReport, dueTracking) {
  var dailyReady = Boolean(dailyReport && dailyReport.ok !== false && dailyReport.triggerEnabled);
  var dueReady = Boolean(dueTracking && dueTracking.ok !== false && dueTracking.triggerEnabled);
  return [
    {
      key: 'daily_audit_report',
      title: 'Cierre diario por usuario',
      cadence: 'Diario',
      source: 'Auditoría central del visor compartido',
      output: 'Resumen por usuario, impactos, registros tocados y trazabilidad del día.',
      status: dailyReady ? 'Operativo' : 'Revisar'
    },
    {
      key: 'weekly_executive_report',
      title: 'Reporte ejecutivo semanal',
      cadence: 'Semanal',
      source: 'Vista ejecutiva, analítica y reporte del visor',
      output: 'Resumen de bloques, alertas, hitos críticos y decisiones para dirección.',
      status: 'Operativo bajo demanda'
    },
    {
      key: 'pending_matrix',
      title: 'Matriz de pendientes por responsable / DGPPCS',
      cadence: 'Diario',
      source: 'Filtros, fichas y seguimiento del visor',
      output: 'Pendientes, responsables, alertas y presión operativa por seguimiento.',
      status: dueReady ? 'Lista para operación' : 'Lista con revisión pendiente'
    }
  ];
}

function buildOperationalMarkerKeys_(namespace) {
  var base = 'PEC_VISOR_' + String(namespace || '').trim().toUpperCase();
  return {
    lastExecutionAt: base + '_LAST_EXECUTION_AT',
    lastExecutionOrigin: base + '_LAST_EXECUTION_ORIGIN',
    lastDeliveryAt: base + '_LAST_DELIVERY_AT',
    lastDeliveryOrigin: base + '_LAST_DELIVERY_ORIGIN',
    lastDeliveryRecipients: base + '_LAST_DELIVERY_RECIPIENTS'
  };
}

function readOperationalMarkerState_(namespace) {
  var props = PropertiesService.getScriptProperties();
  var keys = buildOperationalMarkerKeys_(namespace);
  return {
    lastExecutionAt: String(props.getProperty(keys.lastExecutionAt) || '').trim(),
    lastExecutionOrigin: String(props.getProperty(keys.lastExecutionOrigin) || '').trim(),
    lastDeliveryAt: String(props.getProperty(keys.lastDeliveryAt) || '').trim(),
    lastDeliveryOrigin: String(props.getProperty(keys.lastDeliveryOrigin) || '').trim(),
    lastDeliveryRecipients: splitEmailList_(props.getProperty(keys.lastDeliveryRecipients) || '')
  };
}

function markOperationalExecution_(namespace, origin) {
  var props = PropertiesService.getScriptProperties();
  var keys = buildOperationalMarkerKeys_(namespace);
  props.setProperty(keys.lastExecutionAt, new Date().toISOString());
  props.setProperty(keys.lastExecutionOrigin, String(origin || '').trim());
}

function markOperationalDelivery_(namespace, origin, recipients, sentAt) {
  var props = PropertiesService.getScriptProperties();
  var keys = buildOperationalMarkerKeys_(namespace);
  props.setProperty(keys.lastDeliveryAt, String(sentAt || new Date().toISOString()).trim());
  props.setProperty(keys.lastDeliveryOrigin, String(origin || '').trim());
  props.setProperty(keys.lastDeliveryRecipients, splitEmailList_(recipients || []).join(';'));
}

function setDueTrackingNotificationCcScope_(scope) {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para actualizar el alcance del CC operativo.'
    };
  }
  var normalizedScope = String(scope || '').trim().toUpperCase();
  var allowed = { SUMMARY_ONLY: true, ALL: true, NONE: true };
  if (!allowed[normalizedScope]) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: true,
      message: 'Alcance de CC no permitido. Usa SUMMARY_ONLY, ALL o NONE.'
    };
  }
  var properties = PropertiesService.getScriptProperties();
  setOrDeleteScriptProperty_(properties, 'PEC_VISOR_NOTIFY_CC_SCOPE', normalizedScope);
  appendSharedTrackingAudit_({
    at: new Date().toISOString(),
    actor: String(getSharedTrackingActor_() || 'admin_config').trim(),
    action: 'configurar_cc_alertas_correo',
    origin: 'setDueTrackingNotificationCcScope',
    detail: 'Alcance del CC operativo actualizado | Scope: ' + normalizedScope,
    summary: {
      ccScope: normalizedScope
    },
    mode: getTrackingNotificationConfig_().mode
  });
  var status = getDueTrackingNotificationStatus();
  status.saved = true;
  status.message = 'El alcance del CC operativo quedó en ' + normalizedScope + '.';
  return status;
}

function updateDueTrackingNotificationConfig_(input) {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para actualizar la configuración de alertas por correo.'
    };
  }
  var current = getTrackingNotificationConfig_();
  var safeInput = input && typeof input === 'object' ? input : {};
  var allowed = { PREVIEW_ONLY: true, TEST_REDIRECT: true, REAL: true };
  var rawMode = String(Object.prototype.hasOwnProperty.call(safeInput, 'mode') ? safeInput.mode : current.mode).trim().toUpperCase();
  var mode = allowed[rawMode] ? rawMode : current.mode;
  var testRecipients = Object.prototype.hasOwnProperty.call(safeInput, 'testRecipients')
    ? splitEmailList_(safeInput.testRecipients)
    : current.testRecipients.slice();
  var realSendConfirmed = Object.prototype.hasOwnProperty.call(safeInput, 'realSendConfirmed')
    ? (safeInput.realSendConfirmed === true || String(safeInput.realSendConfirmed).trim().toUpperCase() === 'SI' || String(safeInput.realSendConfirmed).trim().toUpperCase() === 'TRUE')
    : current.realSendConfirmed;
  var properties = PropertiesService.getScriptProperties();
  setOrDeleteScriptProperty_(properties, 'PEC_VISOR_NOTIFY_MODE', mode);
  setOrDeleteScriptProperty_(properties, 'PEC_VISOR_NOTIFY_TEST_RECIPIENTS', testRecipients.join(';'));
  setOrDeleteScriptProperty_(properties, 'PEC_VISOR_CONFIRM_REAL_SEND', realSendConfirmed ? 'SI' : '');
  appendSharedTrackingAudit_({
    at: new Date().toISOString(),
    actor: String(getSharedTrackingActor_() || 'admin_config').trim(),
    action: 'configurar_alertas_correo',
    origin: 'updateDueTrackingNotificationConfig',
    detail: 'Configuración de alertas por correo actualizada | Modo: ' + mode + ' | Confirmación REAL: ' + (realSendConfirmed ? 'SI' : 'NO'),
    summary: {
      mode: mode,
      testRecipients: testRecipients.slice(),
      realSendConfirmed: realSendConfirmed
    },
    mode: mode,
    isTest: mode === 'TEST_REDIRECT'
  });
  var status = getDueTrackingNotificationStatus();
  status.saved = true;
  status.message = 'Configuración de alertas operativas guardada.';
  return status;
}

function activateLiveDueTrackingNotificationsAndSendNow_() {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para activar el envío real de correos operativos.'
    };
  }
  var before = getDueTrackingNotificationStatus();
  var saved = updateDueTrackingNotificationConfig_({
    mode: 'REAL',
    realSendConfirmed: true
  });
  if (!saved.ok) return saved;
  var trigger = createDailyNotificationTrigger();
  var dispatch = dispatchDueTrackingEmails_({
    actor: getSharedTrackingActor_() || 'admin_manual',
    origin: 'activar_envio_real_alertas'
  });
  return {
    ok: Boolean(dispatch && dispatch.ok),
    actor: String(getSharedTrackingActor_() || 'admin_manual').trim(),
    admin: true,
    previousMode: before.mode,
    currentMode: saved.mode,
    realSendConfirmed: saved.realSendConfirmed,
    trigger: trigger,
    dispatch: dispatch,
    message: dispatch && dispatch.ok
      ? 'El modo REAL quedó activado y se ejecutó un envío manual de correos operativos.'
      : 'El modo REAL quedó activado, pero el envío manual no pudo completarse.'
  };
}

function createDailyNotificationTrigger() {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para crear triggers de notificacion.'
    };
  }
  var config = getTrackingNotificationConfig_();
  if (config.mode !== 'REAL') {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: true,
      created: false,
      mode: config.mode,
      realSendConfirmed: config.realSendConfirmed,
      message: 'No se creo el trigger diario porque PEC_VISOR_NOTIFY_MODE no esta en REAL.'
    };
  }
  if (!config.realSendConfirmed) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: true,
      created: false,
      mode: config.mode,
      realSendConfirmed: config.realSendConfirmed,
      message: 'No se creo el trigger diario porque falta PEC_VISOR_CONFIRM_REAL_SEND=SI.'
    };
  }
  var existing = getDueTrackingNotificationTriggers_();
  var removed = 0;
  existing.forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
    removed += 1;
  });
  ScriptApp.newTrigger('runDailyDueTrackingNotifications_')
    .timeBased()
    .everyDays(1)
    .atHour(OPERATIONAL_DEFAULTS.weekdayAutoSendHour)
    .create();
  return {
    ok: true,
    actor: getSharedTrackingActor_(),
    admin: true,
    created: true,
    mode: config.mode,
    realSendConfirmed: config.realSendConfirmed,
    replacedTriggerCount: removed,
    triggerCount: getDueTrackingNotificationTriggers_().length,
    message: removed
      ? 'Trigger automático reconfigurado para las ' + String(OPERATIONAL_DEFAULTS.weekdayAutoSendHour).padStart(2, '0') + ':00 de lunes a viernes.'
      : 'Trigger automático creado para las ' + String(OPERATIONAL_DEFAULTS.weekdayAutoSendHour).padStart(2, '0') + ':00 de lunes a viernes.'
  };
}

function deleteNotificationTriggers() {
  if (!isSharedTrackingAdmin_()) {
    return {
      ok: false,
      actor: getSharedTrackingActor_(),
      admin: false,
      message: 'No autorizado para eliminar triggers de notificacion.'
    };
  }
  var removed = 0;
  getDueTrackingNotificationTriggers_().forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
    removed += 1;
  });
  return {
    ok: true,
    actor: getSharedTrackingActor_(),
    admin: true,
    removed: removed,
    message: removed
      ? 'Se eliminaron los triggers diarios de notificacion.'
      : 'No habia triggers diarios de notificacion para eliminar.'
  };
}

function runDailyDueTrackingNotifications_() {
  var config = getTrackingNotificationConfig_();
  if (!isOperationalWeekday_(new Date())) {
    markOperationalExecution_('DUE_TRACKING', 'trigger_diario_alertas');
    var skippedWeekendAt = new Date().toISOString();
    appendSharedTrackingAudit_({
      at: skippedWeekendAt,
      actor: String(getSharedTrackingActor_() || 'trigger_diario').trim(),
      action: 'omitir_alertas_correo',
      origin: 'trigger_diario_alertas',
      detail: 'Envio automatico omitido | Motivo: fin de semana',
      summary: {
        mode: config.mode,
        realSendConfirmed: config.realSendConfirmed,
        testRecipients: config.testRecipients.slice()
      },
      recipients: [],
      effectiveRecipients: [],
      mode: config.mode,
      skipped: true,
      reason: 'automatic_weekend_guard'
    });
    return {
      ok: true,
      actor: String(getSharedTrackingActor_() || 'trigger_diario').trim(),
      admin: true,
      skipped: true,
      weekend: true,
      mode: config.mode,
      testRecipients: config.testRecipients.slice(),
      realSendConfirmed: config.realSendConfirmed,
      message: 'El trigger automático no envió alertas porque hoy no es un día hábil.'
    };
  }
  // El trigger diario nunca debe comportarse como buzón de pruebas: si el modo
  // no está listo para envío real confirmado, se omite el despacho.
  if (!isLiveDueTrackingNotificationMode_(config)) {
    markOperationalExecution_('DUE_TRACKING', 'trigger_diario_alertas');
    var skippedAt = new Date().toISOString();
    appendSharedTrackingAudit_({
      at: skippedAt,
      actor: String(getSharedTrackingActor_() || 'trigger_diario').trim(),
      action: 'omitir_alertas_correo',
      origin: 'trigger_diario_alertas',
      detail: 'Envio automatico omitido | Modo: ' + config.mode + ' | Confirmacion REAL: ' + (config.realSendConfirmed ? 'SI' : 'NO'),
      summary: {
        mode: config.mode,
        realSendConfirmed: config.realSendConfirmed,
        testRecipients: config.testRecipients.slice()
      },
      recipients: [],
      effectiveRecipients: [],
      mode: config.mode,
      skipped: true,
      reason: 'automatic_mode_guard'
    });
    return {
      ok: false,
      actor: String(getSharedTrackingActor_() || 'trigger_diario').trim(),
      admin: true,
      skipped: true,
      mode: config.mode,
      testRecipients: config.testRecipients.slice(),
      realSendConfirmed: config.realSendConfirmed,
      message: 'El trigger diario no envio correos porque el modo operativo no esta en REAL confirmado.'
    };
  }
  return dispatchDueTrackingEmails_({
    actor: getSharedTrackingActor_() || 'trigger_diario',
    origin: 'trigger_diario_alertas'
  });
}

function getDueTrackingNotificationTriggers_() {
  return ScriptApp.getProjectTriggers().filter(function(trigger) {
    return trigger.getHandlerFunction && trigger.getHandlerFunction() === 'runDailyDueTrackingNotifications_';
  });
}

function dispatchDueTrackingEmails_(options) {
  var safeOptions = options || {};
  var preview = buildDueTrackingNotifications_({ preview: false, includeHtml: true });
  if (!preview.ok) return preview;
  markOperationalExecution_('DUE_TRACKING', String(safeOptions.origin || 'sendDueTrackingEmails').trim());
  if (isAutomaticDueTrackingOrigin_(safeOptions) && !isLiveDueTrackingNotificationMode_(preview)) {
    return {
      ok: false,
      actor: String(safeOptions.actor || getSharedTrackingActor_() || 'trigger_diario').trim(),
      admin: isSharedTrackingAdmin_(),
      preview: false,
      skipped: true,
      mode: preview.mode,
      testRecipients: preview.testRecipients,
      realSendConfirmed: preview.realSendConfirmed,
      sentCount: 0,
      notifiedActivities: 0,
      groups: preview.groups.map(function(group) {
        return {
          person: group.person,
          to: group.to,
          realTo: group.realTo,
          itemCount: group.items.length,
          subject: group.subject
        };
      }),
      missingEmails: preview.missingEmails,
      cc: preview.cc,
      webappUrl: preview.webappUrl,
      message: 'Envio automatico bloqueado: PEC_VISOR_NOTIFY_MODE debe estar en REAL y PEC_VISOR_CONFIRM_REAL_SEND=SI.'
    };
  }
  if (preview.mode === 'PREVIEW_ONLY') {
    return {
      ok: true,
      actor: String(safeOptions.actor || getSharedTrackingActor_() || 'admin_manual').trim(),
      admin: isSharedTrackingAdmin_(),
      preview: false,
      mode: preview.mode,
      testRecipients: preview.testRecipients,
      realSendConfirmed: preview.realSendConfirmed,
      sentCount: 0,
      notifiedActivities: 0,
      groups: preview.groups.map(function(group) {
        return {
          person: group.person,
          to: group.to,
          realTo: group.realTo,
          itemCount: group.items.length,
          subject: group.subject
        };
      }),
      missingEmails: preview.missingEmails,
      cc: preview.cc,
      webappUrl: preview.webappUrl,
      message: 'Modo PREVIEW_ONLY activo. No se enviaron correos.'
    };
  }
  if (preview.mode === 'REAL' && !preview.realSendConfirmed) {
    return {
      ok: false,
      actor: String(safeOptions.actor || getSharedTrackingActor_() || 'admin_manual').trim(),
      admin: isSharedTrackingAdmin_(),
      preview: false,
      mode: preview.mode,
      testRecipients: preview.testRecipients,
      realSendConfirmed: preview.realSendConfirmed,
      sentCount: 0,
      notifiedActivities: 0,
      groups: preview.groups.map(function(group) {
        return {
          person: group.person,
          to: group.to,
          realTo: group.realTo,
          itemCount: group.items.length,
          subject: group.subject
        };
      }),
      missingEmails: preview.missingEmails,
      cc: preview.cc,
      webappUrl: preview.webappUrl,
      message: 'Modo REAL solicitado, pero falta PEC_VISOR_CONFIRM_REAL_SEND=SI.'
    };
  }
  if (preview.mode === 'TEST_REDIRECT' && !preview.testRecipients.length) {
    return {
      ok: false,
      actor: String(safeOptions.actor || getSharedTrackingActor_() || 'admin_manual').trim(),
      admin: isSharedTrackingAdmin_(),
      preview: false,
      mode: preview.mode,
      testRecipients: preview.testRecipients,
      realSendConfirmed: preview.realSendConfirmed,
      sentCount: 0,
      notifiedActivities: 0,
      groups: preview.groups.map(function(group) {
        return {
          person: group.person,
          to: group.to,
          realTo: group.realTo,
          itemCount: group.items.length,
          subject: group.subject
        };
      }),
      missingEmails: preview.missingEmails,
      cc: preview.cc,
      webappUrl: preview.webappUrl,
      message: 'Modo TEST_REDIRECT activo, pero faltan destinatarios en PEC_VISOR_NOTIFY_TEST_RECIPIENTS.'
    };
  }
  var recipients = [];
  var mailCount = 0;
  var totalActivities = 0;
  preview.groups.forEach(function(group) {
    if (!group.to) return;
    var mailOptions = {
      htmlBody: group.htmlBody,
      name: 'Visor de Seguimiento PEC'
    };
    if (preview.cc.length && shouldApplyTrackingNotificationCc_(preview.ccScope, group)) {
      mailOptions.cc = preview.cc.join(',');
    }
    MailApp.sendEmail(group.to, group.subject, group.plainBody, mailOptions);
    (Array.isArray(group.effectiveRecipients) ? group.effectiveRecipients : String(group.to || '').split(/[;,]/))
      .map(function(item) { return String(item || '').trim(); })
      .filter(Boolean)
      .forEach(function(item) { recipients.push(item); });
    mailCount += 1;
    totalActivities += group.items.length;
  });
  var sentAt = new Date().toISOString();
  var effectiveRecipients = Array.from(new Set(recipients));
  var auditEntry = {
    at: sentAt,
    actor: String(safeOptions.actor || getSharedTrackingActor_() || 'trigger_diario').trim(),
    action: 'enviar_alertas_correo',
    origin: String(safeOptions.origin || 'sendDueTrackingEmails').trim(),
    detail: 'Correos enviados: ' + mailCount + ' | Actividades notificadas: ' + totalActivities + ' | Modo: ' + preview.mode,
    summary: {
      total: totalActivities,
      recipients: mailCount,
      effectiveRecipients: effectiveRecipients,
      mode: preview.mode,
      testRecipients: preview.testRecipients,
      realSendConfirmed: preview.realSendConfirmed,
      missingEmails: preview.missingEmails.map(function(item) { return item.person; }),
      touchedRecords: preview.groups.flatMap(function(group) {
        return group.items.map(function(item) { return item.edt; });
      }).slice(0, 20)
    },
    recipients: effectiveRecipients,
    effectiveRecipients: effectiveRecipients,
    mode: preview.mode,
    isTest: preview.mode === 'TEST_REDIRECT',
    notifiedActivities: totalActivities
  };
  appendSharedTrackingAudit_(auditEntry);
  markOperationalDelivery_(
    'DUE_TRACKING',
    String(safeOptions.origin || 'sendDueTrackingEmails').trim(),
    effectiveRecipients,
    sentAt
  );
  return {
    ok: true,
    actor: auditEntry.actor,
    admin: isSharedTrackingAdmin_(),
    preview: false,
    sentAt: sentAt,
    mode: preview.mode,
    testRecipients: preview.testRecipients,
    realSendConfirmed: preview.realSendConfirmed,
    redirectModeActive: preview.mode === 'TEST_REDIRECT',
    groups: preview.groups.map(function(group) {
      return {
        person: group.person,
        to: group.to,
        realTo: group.realTo,
        itemCount: group.items.length,
        subject: group.subject
      };
    }),
    sentCount: mailCount,
    notifiedActivities: totalActivities,
    missingEmails: preview.missingEmails,
    cc: preview.cc,
    webappUrl: preview.webappUrl,
    redirectModeActive: preview.mode === 'TEST_REDIRECT',
    message: preview.mode === 'TEST_REDIRECT'
      ? ('Correos de prueba enviados solo a ' + preview.testRecipients.join(', ') + '. Los responsables DGPPCS finales no recibieron este envio.')
      : 'Correos enviados a responsables y consolidado DGPPCS segun la configuracion activa.'
  };
}

// Script Properties requeridas para notificaciones:
// - PEC_VISOR_NOTIFY_EMAILS_JSON: {"Darwin Pardave":"correo@dominio", ...}
// - PEC_VISOR_NOTIFY_DGPPCS_EMAILS: correos del grupo DGPPCS separados por coma o punto y coma (opcional)
// - PEC_VISOR_NOTIFY_CC: correos en copia separados por coma o punto y coma
// - PEC_VISOR_NOTIFY_CC_SCOPE: SUMMARY_ONLY | ALL | NONE (por defecto SUMMARY_ONLY)
// - PEC_VISOR_NOTIFY_MODE: PREVIEW_ONLY | TEST_REDIRECT | REAL
// - PEC_VISOR_NOTIFY_TEST_RECIPIENTS: correos de prueba separados por coma o punto y coma
// - PEC_VISOR_CONFIRM_REAL_SEND: SI para habilitar envios reales
// - PEC_VISOR_WEBAPP_URL: URL publica del visor compartido
// - TEST_REDIRECT sirve para pruebas manuales; el trigger automático queda bloqueado fuera de REAL confirmado.
function buildDueTrackingNotifications_(options) {
  var settings = options || {};
  var config = getTrackingNotificationConfig_();
  var state = loadSharedTrackingState_();
  var records = getEffectiveTrackingRecordsForNotifications_(state);
  var emailDirectory = getTrackingNotificationEmailDirectory_();
  var emailMap = getTrackingNotificationEmailMap_();
  var dgppcsRecipients = getTrackingNotificationDgppcsRecipients_(emailMap);
  var cc = getTrackingNotificationCcList_();
  var webappUrl = getTrackingWebAppUrl_();
  var generatedAtDate = new Date();
  var generatedAt = generatedAtDate.toISOString();
  var generatedAtLabel = formatTrackingDateTime_(generatedAtDate);
  var grouped = new Map();
  var missing = new Map();
  var unassigned = [];
  var alertItemsById = new Map();
  records.forEach(function(record) {
    var alertInfo = classifyDueTrackingAlert_(record);
    if (!alertInfo.include) return;
    var people = splitTrackingPeople_(record.seguimiento_dgppcs);
    var item = buildDueTrackingNotificationItem_(record, alertInfo, webappUrl);
    if (item.id && !alertItemsById.has(item.id)) alertItemsById.set(item.id, item);
    if (!people.length) {
      unassigned.push(item);
      return;
    }
    people.forEach(function(person) {
      var key = normalizeNotificationKey_(person);
      var email = emailMap[key] || '';
      var recipients = resolveTrackingNotificationRecipients_(config, email);
      if (!email) {
        if (!missing.has(key)) missing.set(key, { person: person, items: [] });
        missing.get(key).items.push(item);
      }
      if (!recipients.length) return;
      if (!grouped.has(key)) grouped.set(key, {
        person: person,
        to: recipients.join(','),
        effectiveRecipients: recipients.slice(),
        realTo: email,
        items: []
      });
      grouped.get(key).items.push(item);
    });
  });
  emailDirectory.forEach(function(entry) {
    if (!entry || !entry.key || grouped.has(entry.key)) return;
    var recipients = resolveTrackingNotificationRecipients_(config, entry.email);
    if (!recipients.length) return;
    grouped.set(entry.key, {
      person: entry.person,
      to: recipients.join(','),
      effectiveRecipients: recipients.slice(),
      realTo: entry.email,
      items: []
    });
  });
  var alertItems = Array.from(alertItemsById.values()).sort(compareDueTrackingItems_);
  var groups = Array.from(grouped.values())
    .sort(function(a, b) { return a.person.localeCompare(b.person, 'es'); })
    .map(function(group) {
      group.items.sort(compareDueTrackingItems_);
      group.subject = buildDueTrackingNotificationSubject_(group.person, group.items.length, config);
      group.htmlBody = buildDueTrackingEmailHtml_(group.person, group.items, generatedAtLabel, webappUrl, config);
      group.plainBody = buildDueTrackingEmailPlainText_(group.person, group.items, generatedAtLabel, webappUrl, config);
      if (settings.includeHtml === false) delete group.htmlBody;
      return group;
    });
  if (alertItems.length && dgppcsRecipients.length) {
    var teamRecipients = resolveTrackingNotificationRecipients_(config, dgppcsRecipients);
    if (teamRecipients.length) {
      var teamGroup = {
        person: 'Equipo DGPPCS',
        to: teamRecipients.join(','),
        effectiveRecipients: teamRecipients.slice(),
        realTo: dgppcsRecipients.join(','),
        items: alertItems.slice(),
        subject: buildDueTrackingNotificationSubject_('Equipo DGPPCS', alertItems.length, config, { isTeamSummary: true }),
        htmlBody: buildDueTrackingEmailHtml_('Equipo DGPPCS', alertItems, generatedAtLabel, webappUrl, config, { isTeamSummary: true }),
        plainBody: buildDueTrackingEmailPlainText_('Equipo DGPPCS', alertItems, generatedAtLabel, webappUrl, config, { isTeamSummary: true }),
        summaryKind: 'dgppcs_team'
      };
      if (settings.includeHtml === false) delete teamGroup.htmlBody;
      groups.push(teamGroup);
    }
  }
  return {
    ok: true,
    actor: getSharedTrackingActor_(),
    admin: isSharedTrackingAdmin_(),
    preview: Boolean(settings.preview),
    mode: config.mode,
    testRecipients: config.testRecipients,
    realSendConfirmed: config.realSendConfirmed,
    generatedAt: generatedAt,
    generatedAtLabel: generatedAtLabel,
    totalActivities: alertItems.length,
    groups: groups,
    missingEmails: Array.from(missing.values()).sort(function(a, b) { return a.person.localeCompare(b.person, 'es'); }),
    unassignedActivities: unassigned.sort(compareDueTrackingItems_),
    dgppcsRecipients: dgppcsRecipients,
    cc: cc,
    ccScope: getTrackingNotificationCcScope_(),
    webappUrl: webappUrl
  };
}

function getEffectiveTrackingRecordsForNotifications_(state) {
  var payload = state && state.payload && Array.isArray(state.payload.records) ? state.payload.records : [];
  var customRecords = Array.isArray(state && state.customRecords) ? state.customRecords : [];
  var edits = state && state.edits && typeof state.edits === 'object' ? state.edits : {};
  return payload.concat(customRecords).map(function(record) {
    var edit = edits[record.id] && typeof edits[record.id] === 'object' ? edits[record.id] : {};
    if (edit.__deleted) return null;
    var merged = Object.assign({}, record, edit);
    if (isNotificationCommentRecord_(merged)) return null;
    if (String(merged.estado || '').trim().toLowerCase() === 'completado') return null;
    return merged;
  }).filter(Boolean);
}

function isNotificationCommentRecord_(record) {
  var edt = String(record && record.edt || '').trim();
  var actividad = String(record && record.actividad || '').trim();
  if (!actividad) return true;
  if (edt === '*') return true;
  if (!edt && /comentario|nota|observacion|observaci[oó]n/i.test(actividad)) return true;
  return false;
}

function classifyDueTrackingAlert_(record) {
  var finalDate = parseTrackingDate_(record && record.final);
  if (!finalDate) {
    return { include: false, code: 'sin_fecha', label: 'Sin fecha final', daysRemaining: null, severity: 0 };
  }
  var state = String(record && record.estado || '').trim().toLowerCase();
  if (state === 'completado') {
    return { include: false, code: 'completed', label: 'Completado', daysRemaining: null, severity: 0 };
  }
  var today = parseTrackingDate_(Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'));
  var daysRemaining = Math.round((finalDate.getTime() - today.getTime()) / 86400000);
  if (daysRemaining < 0) {
    return { include: true, code: 'vencido', label: 'Vencido', daysRemaining: daysRemaining, severity: 3 };
  }
  if (daysRemaining <= 7) {
    return { include: true, code: 'critico', label: 'Vence <= 7 días', daysRemaining: daysRemaining, severity: 3 };
  }
  if (daysRemaining <= 15) {
    return { include: true, code: 'atencion', label: 'Vence <= 15 días', daysRemaining: daysRemaining, severity: 2 };
  }
  return { include: false, code: 'ok', label: 'En control', daysRemaining: daysRemaining, severity: 1 };
}

function buildDueTrackingNotificationItem_(record, alertInfo, webappUrl) {
  return {
    id: String(record.id || ''),
    edt: String(record.edt || '').trim(),
    actividad: String(record.actividad || '').trim(),
    responsable: String(record.responsable || '').trim(),
    seguimiento: String(record.seguimiento_dgppcs || '').trim(),
    final: formatTrackingDateLabel_(record.final),
    estado: String(record.estado || '').trim(),
    alerta: alertInfo.label,
    alertaCodigo: alertInfo.code,
    severity: Number(alertInfo.severity || 0),
    daysRemaining: alertInfo.daysRemaining,
    resumen: String(record.resumen || '').trim(),
    link: webappUrl
  };
}

function compareDueTrackingItems_(left, right) {
  return (Number(right.severity || 0) - Number(left.severity || 0)) ||
    compareNullableDates_(left.final, right.final) ||
    compareNumericEdtStrings_(left.edt, right.edt) ||
    String(left.actividad || '').localeCompare(String(right.actividad || ''), 'es');
}

function compareNullableDates_(left, right) {
  var leftDate = parseTrackingDate_(left);
  var rightDate = parseTrackingDate_(right);
  if (leftDate && rightDate) return leftDate.getTime() - rightDate.getTime();
  if (leftDate) return -1;
  if (rightDate) return 1;
  return 0;
}

function compareNumericEdtStrings_(left, right) {
  var a = String(left || '').trim().split('.').map(function(part) {
    return /^\d+$/.test(part) ? Number(part) : part;
  });
  var b = String(right || '').trim().split('.').map(function(part) {
    return /^\d+$/.test(part) ? Number(part) : part;
  });
  var size = Math.max(a.length, b.length);
  for (var idx = 0; idx < size; idx += 1) {
    if (idx >= a.length) return -1;
    if (idx >= b.length) return 1;
    if (typeof a[idx] === 'number' && typeof b[idx] === 'number') {
      if (a[idx] !== b[idx]) return a[idx] - b[idx];
      continue;
    }
    var cmp = String(a[idx]).localeCompare(String(b[idx]), 'es', { numeric: true, sensitivity: 'base' });
    if (cmp) return cmp;
  }
  return String(left || '').localeCompare(String(right || ''), 'es', { numeric: true, sensitivity: 'base' });
}

function buildDueTrackingEmailHtml_(person, items, generatedAt, webappUrl, config, options) {
  var mailOptions = options || {};
  var safeItems = Array.isArray(items) ? items : [];
  var rows = safeItems.length ? safeItems.map(function(item) {
    var alertStyle = item.alertaCodigo === 'vencido' || item.alertaCodigo === 'critico'
      ? 'color:#8f1d1d;font-weight:600;'
      : item.alertaCodigo === 'atencion'
        ? 'color:#8a5a00;font-weight:600;'
        : 'color:#24415f;';
    return '<tr>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;">' + escapeHtmlEmail_(item.edt || '-') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;">' + escapeHtmlEmail_(item.actividad || '-') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;">' + escapeHtmlEmail_(item.responsable || '-') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;">' + escapeHtmlEmail_(item.seguimiento || '-') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;">' + escapeHtmlEmail_(item.final || '-') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;">' + escapeHtmlEmail_(item.estado || '-') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;' + alertStyle + '">' + escapeHtmlEmail_(item.alerta || '-') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;">' + escapeHtmlEmail_(item.resumen || '-') + '</td>' +
    '</tr>';
  }).join('') : '<tr><td colspan="8" style="padding:10px 12px;border:1px solid #d7e2ef;color:#4d6379;">No se registran alertas directas asignadas en este corte.</td></tr>';
  var introNotice = config && config.mode === 'TEST_REDIRECT'
    ? '<p style="margin:0 0 14px;padding:10px 12px;border:1px solid #e7d8a7;background:#fff7df;color:#6a4a00;border-radius:8px;"><strong>Correo de prueba.</strong> No enviado al responsable final.</p>'
    : '';
  var introText = mailOptions.isTeamSummary
    ? 'Se remite el consolidado de actividades con vencimiento, atraso o atención prioritaria para el equipo de seguimiento DGPPCS.'
    : 'Se remite el resumen de actividades bajo su seguimiento que registran vencimiento, atraso o atención prioritaria en el Visor PEC.';
  var actionText = mailOptions.isTeamSummary
    ? 'Agradeceremos revisar el consolidado y coordinar la actualización del seguimiento correspondiente en el visor compartido.'
    : 'Agradeceremos revisar el estado y actualizar el seguimiento correspondiente en el visor compartido.';
  return [
    '<div style="font-family:Arial,sans-serif;color:#16324f;line-height:1.5;max-width:980px;">',
    '<h2 style="margin:0 0 10px;font-size:20px;">Visor de Seguimiento PEC</h2>',
    '<p style="margin:0 0 14px;">Estimado/a <strong>' + escapeHtmlEmail_(person) + '</strong>:</p>',
    '<p style="margin:0 0 12px;">' + escapeHtmlEmail_(introText) + '</p>',
    '<p style="margin:0 0 16px;">' + escapeHtmlEmail_(actionText) + '</p>',
    introNotice,
    '<p style="margin:0 0 12px;color:#4d6379;font-size:12px;">Fecha de generación: ' + escapeHtmlEmail_(generatedAt) + '</p>',
    '<table style="border-collapse:collapse;width:100%;font-size:13px;background:#ffffff;">',
    '<thead><tr style="background:#edf4fb;color:#16324f;">',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">EDT</th>',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">Actividad</th>',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">Responsable</th>',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">Seguimiento DGPPCS</th>',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">Fecha final</th>',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">Estado</th>',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">Alerta</th>',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">Próximo paso / resumen</th>',
    '</tr></thead><tbody>',
    rows,
    '</tbody></table>',
    '<p style="margin:18px 0 0;"><a href="' + escapeHtmlEmail_(webappUrl) + '" style="display:inline-block;padding:10px 16px;border-radius:8px;background:#1d5f8f;color:#ffffff;text-decoration:none;font-weight:600;">Abrir visor compartido</a></p>',
    '<p style="margin:16px 0 0;color:#4d6379;font-size:12px;">Este mensaje fue generado automáticamente por el Visor de Seguimiento PEC.</p>',
    '</div>'
  ].join('');
}

function buildDueTrackingEmailPlainText_(person, items, generatedAt, webappUrl, config, options) {
  var mailOptions = options || {};
  var safeItems = Array.isArray(items) ? items : [];
  var introText = mailOptions.isTeamSummary
    ? 'Se remite el consolidado de actividades con vencimiento, atraso o atención prioritaria para el equipo de seguimiento DGPPCS.'
    : 'Se remite el resumen de actividades bajo su seguimiento que registran vencimiento, atraso o atención prioritaria en el Visor PEC.';
  var actionText = mailOptions.isTeamSummary
    ? 'Agradeceremos revisar el consolidado y coordinar la actualización del seguimiento correspondiente en el visor compartido.'
    : 'Agradeceremos revisar el estado y actualizar el seguimiento correspondiente en el visor compartido.';
  return [
    'Visor de Seguimiento PEC',
    'Estimado/a ' + person + ':',
    '',
    introText,
    actionText,
    config && config.mode === 'TEST_REDIRECT' ? 'Correo de prueba. No enviado al responsable final.' : '',
    'Fecha de generación: ' + generatedAt,
    '',
    safeItems.length ? safeItems.map(function(item) {
      return [
        item.edt || '-',
        item.actividad || '-',
        'Responsable: ' + (item.responsable || '-'),
        'Seguimiento DGPPCS: ' + (item.seguimiento || '-'),
        'Fecha final: ' + (item.final || '-'),
        'Estado: ' + (item.estado || '-'),
        'Alerta: ' + (item.alerta || '-'),
        'Resumen: ' + (item.resumen || '-')
      ].join(' | ');
    }).join('\n') : 'No se registran alertas directas asignadas en este corte.',
    '',
    'Abrir visor compartido: ' + webappUrl,
    '',
    'Este mensaje fue generado automáticamente por el Visor de Seguimiento PEC.'
  ].filter(Boolean).join('\n');
}

function buildSharedVisorAccessGuideHtml_(webappUrl, guideUrl, generatedAtLabel) {
  var safeVisorUrl = ensureSharedVisorViewUrl_(webappUrl || getTrackingWebAppUrl_());
  var safeGuideUrl = String(guideUrl || PANEL_PUBLIC_VISOR_GUIDE_URL).trim();
  return ''
    + '<div style="font-family:Arial,Helvetica,sans-serif;color:#1f2937;line-height:1.6;background:#f5f7fb;padding:24px;">'
    + '<div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #dbe5f0;border-radius:16px;overflow:hidden;">'
    + '<div style="padding:22px 24px;background:linear-gradient(135deg,#173c5d,#1f6b67);color:#ffffff;">'
    + '<div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.9;">Visor de Seguimiento PEC</div>'
    + '<h1 style="margin:10px 0 8px;font-size:28px;line-height:1.15;">Acceso compartido para actualización operativa</h1>'
    + '<p style="margin:0;font-size:15px;opacity:.95;">Este mensaje te permite ingresar al visor, revisar los pendientes de tu ámbito y registrar actualizaciones en la ficha correspondiente.</p>'
    + '</div>'
    + '<div style="padding:22px 24px;">'
    + '<p style="margin:0 0 14px;">Fecha de envío: <b>' + escapeHtmlEmail_(generatedAtLabel) + '</b></p>'
    + '<div style="padding:14px 16px;border-left:4px solid #1d4ed8;background:#eff6ff;border-radius:12px;margin-bottom:18px;">'
    + '<b>Cómo entrar</b>'
    + '<ol style="margin:10px 0 0 18px;padding:0;">'
    + '<li>Abre el visor compartido desde el botón inferior.</li>'
    + '<li>Si Google solicita autenticación, ingresa con tu cuenta institucional autorizada.</li>'
    + '<li>Ubica tu caso con filtros, abre la ficha, actualiza la información y guarda hasta ver la confirmación de sincronización.</li>'
    + '</ol>'
    + '</div>'
    + '<div style="margin:18px 0 18px;">'
    + '<a href="' + escapeHtmlEmail_(safeVisorUrl) + '" style="display:inline-block;margin:0 10px 10px 0;padding:12px 18px;border-radius:999px;background:#185fa5;color:#ffffff;text-decoration:none;font-weight:700;">Abrir visor compartido</a>'
    + '<a href="' + escapeHtmlEmail_(safeGuideUrl) + '" style="display:inline-block;margin:0 10px 10px 0;padding:12px 18px;border-radius:999px;background:#0f766e;color:#ffffff;text-decoration:none;font-weight:700;">Ver guía rápida</a>'
    + '</div>'
    + '<div style="display:grid;gap:12px;">'
    + '<div style="padding:14px 16px;border:1px solid #dbe5f0;border-radius:12px;background:#fbfdff;">'
    + '<b>Qué encontrarás en el visor</b>'
    + '<ul style="margin:10px 0 0 18px;padding:0;">'
    + '<li>Resumen ejecutivo con vencimientos, atrasos y presión por bloque.</li>'
    + '<li>Filtros por bloque, estado, alerta, responsable y seguimiento DGPPCS.</li>'
    + '<li>Fichas por caso para registrar responsable, seguimiento, notas y próximas acciones.</li>'
    + '</ul>'
    + '</div>'
    + '<div style="padding:14px 16px;border:1px solid #dbe5f0;border-radius:12px;background:#fffbeb;">'
    + '<b>Importante</b>'
    + '<div style="margin-top:8px;">Si el visor no confirma <i>Estado compartido guardado</i>, la actualización puede quedar solo en tu navegador y no en el estado central.</div>'
    + '</div>'
    + '</div>'
    + '<p style="margin:18px 0 0;color:#475569;font-size:13px;">Enlace directo al visor: <a href="' + escapeHtmlEmail_(safeVisorUrl) + '">' + escapeHtmlEmail_(safeVisorUrl) + '</a><br>'
    + 'Guía rápida pública: <a href="' + escapeHtmlEmail_(safeGuideUrl) + '">' + escapeHtmlEmail_(safeGuideUrl) + '</a></p>'
    + '</div></div></div>';
}

function buildSharedVisorAccessGuidePlainText_(webappUrl, guideUrl, generatedAtLabel) {
  var safeVisorUrl = ensureSharedVisorViewUrl_(webappUrl || getTrackingWebAppUrl_());
  var safeGuideUrl = String(guideUrl || PANEL_PUBLIC_VISOR_GUIDE_URL).trim();
  return [
    'ACCESO AL VISOR COMPARTIDO PEC',
    'Fecha de envio: ' + generatedAtLabel,
    '',
    'Como entrar:',
    '1. Abre el visor compartido desde este enlace: ' + safeVisorUrl,
    '2. Si Google solicita autenticacion, ingresa con tu cuenta institucional autorizada.',
    '3. Ubica tu caso con filtros, abre la ficha, actualiza la informacion y guarda hasta ver la confirmacion de sincronizacion.',
    '',
    'Guia rapida:',
    safeGuideUrl,
    '',
    'Que encontraras en el visor:',
    '- Resumen ejecutivo con vencimientos, atrasos y presion por bloque.',
    '- Filtros por bloque, estado, alerta, responsable y seguimiento DGPPCS.',
    '- Fichas por caso para registrar responsable, seguimiento, notas y proximas acciones.',
    '',
    'Importante:',
    'Si el visor no confirma "Estado compartido guardado", la actualizacion puede quedar solo en tu navegador y no en el estado central.',
    '',
    'Este mensaje fue generado automaticamente por el Visor de Seguimiento PEC.'
  ].join('\n');
}

function getTrackingNotificationEmailDirectory_() {
  var raw = String(PropertiesService.getScriptProperties().getProperty('PEC_VISOR_NOTIFY_EMAILS_JSON') || '').trim();
  if (!raw) return [];
  try {
    var parsed = JSON.parse(raw);
    var seen = {};
    var out = [];
    Object.keys(parsed || {}).forEach(function(name) {
      var person = String(name || '').trim().replace(/\s+/g, ' ');
      var key = normalizeNotificationKey_(person);
      var email = String(parsed[name] == null ? '' : parsed[name]).trim().toLowerCase();
      if (!key || !email || seen[key]) return;
      seen[key] = true;
      out.push({ key: key, person: person, email: email });
    });
    return out;
  } catch (error) {
    return [];
  }
}

function getTrackingNotificationEmailMap_() {
  var out = {};
  getTrackingNotificationEmailDirectory_().forEach(function(entry) {
    if (!entry || !entry.key || !entry.email) return;
    out[entry.key] = entry.email;
  });
  return out;
}

function getTrackingActorEmailDirectory_() {
  var out = {};
  var configured = OPERATIONAL_DEFAULTS.actorEmailDirectory && typeof OPERATIONAL_DEFAULTS.actorEmailDirectory === 'object'
    ? OPERATIONAL_DEFAULTS.actorEmailDirectory
    : {};
  Object.keys(configured).forEach(function(email) {
    var normalizedEmail = String(email || '').trim().toLowerCase();
    var person = String(configured[email] || '').trim().replace(/\s+/g, ' ');
    if (!normalizedEmail || !person) return;
    out[normalizedEmail] = person;
  });
  getTrackingNotificationEmailDirectory_().forEach(function(entry) {
    if (!entry || !entry.email || !entry.person) return;
    if (out[entry.email]) return;
    out[entry.email] = entry.person;
  });
  return out;
}

function isEmailLike_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

function resolveTrackingActorDisplayName_(email, fallbackLabel) {
  var normalizedEmail = String(email || '').trim().toLowerCase();
  var normalizedFallback = String(fallbackLabel || '').trim().replace(/\s+/g, ' ');
  var directory = getTrackingActorEmailDirectory_();
  if (normalizedEmail && directory[normalizedEmail]) return directory[normalizedEmail];
  return normalizedFallback || normalizedEmail;
}

function getTrackingNotificationDgppcsRecipients_(emailMap) {
  var configured = splitEmailList_(PropertiesService.getScriptProperties().getProperty('PEC_VISOR_NOTIFY_DGPPCS_EMAILS') || '');
  var mapped = Array.from(new Set(Object.keys(emailMap || {}).map(function(key) {
    return String(emailMap[key] || '').trim().toLowerCase();
  }).filter(Boolean)));
  return Array.from(new Set(configured.concat(mapped, splitEmailList_(OPERATIONAL_DEFAULTS.dgppcsSummaryRecipients.join(';')))));
}

function getTrackingNotificationCcList_() {
  return String(PropertiesService.getScriptProperties().getProperty('PEC_VISOR_NOTIFY_CC') || '')
    .split(/[;,]/)
    .map(function(item) { return item.trim(); })
    .filter(Boolean);
}

function getTrackingNotificationCcScope_() {
  var raw = String(PropertiesService.getScriptProperties().getProperty('PEC_VISOR_NOTIFY_CC_SCOPE') || '')
    .trim()
    .toUpperCase();
  var allowed = { SUMMARY_ONLY: true, ALL: true, NONE: true };
  return allowed[raw] ? raw : 'SUMMARY_ONLY';
}

function shouldApplyTrackingNotificationCc_(scope, group) {
  var normalizedScope = String(scope || 'SUMMARY_ONLY').trim().toUpperCase();
  if (normalizedScope === 'NONE') return false;
  if (normalizedScope === 'ALL') return true;
  return Boolean(group && group.summaryKind === 'dgppcs_team');
}

function isAutomaticDueTrackingOrigin_(options) {
  var origin = String(options && options.origin || '').trim().toLowerCase();
  return origin === 'trigger_diario_alertas';
}

function isLiveDueTrackingNotificationMode_(config) {
  var safeConfig = config || getTrackingNotificationConfig_();
  return safeConfig.mode === 'REAL' && Boolean(safeConfig.realSendConfirmed);
}

function buildDueTrackingNotificationSubject_(person, itemCount, config, options) {
  var safeOptions = options || {};
  var prefix = config && config.mode === 'TEST_REDIRECT' ? '[PRUEBA PEC] ' : '';
  var target = safeOptions.isTeamSummary ? 'Equipo DGPPCS' : person;
  return prefix + 'PEC | Seguimiento DGPPCS | ' + target + ' | ' + itemCount + ' alerta(s)';
}

function resolveTrackingNotificationRecipients_(config, realEmail) {
  var safeConfig = config || getTrackingNotificationConfig_();
  if (safeConfig.mode === 'TEST_REDIRECT') return safeConfig.testRecipients.slice();
  var values = Array.isArray(realEmail) ? realEmail : [realEmail];
  return Array.from(new Set(values.map(function(item) {
    return String(item || '').trim().toLowerCase();
  }).filter(Boolean)));
}

function getTrackingNotificationConfig_() {
  var properties = PropertiesService.getScriptProperties();
  var rawMode = String(properties.getProperty('PEC_VISOR_NOTIFY_MODE') || '').trim().toUpperCase();
  var allowed = { PREVIEW_ONLY: true, TEST_REDIRECT: true, REAL: true };
  var mode = allowed[rawMode] ? rawMode : 'PREVIEW_ONLY';
  var testRecipients = String(properties.getProperty('PEC_VISOR_NOTIFY_TEST_RECIPIENTS') || '')
    .split(/[;,]/)
    .map(function(item) { return String(item || '').trim(); })
    .filter(Boolean);
  var realSendConfirmed = String(properties.getProperty('PEC_VISOR_CONFIRM_REAL_SEND') || '').trim().toUpperCase() === 'SI';
  return {
    mode: mode,
    testRecipients: Array.from(new Set(testRecipients)),
    realSendConfirmed: realSendConfirmed
  };
}

function splitEmailList_(value) {
  var seen = {};
  return String(value == null ? '' : value)
    .split(/[;,]+/)
    .map(function(item) { return String(item || '').trim().toLowerCase(); })
    .filter(Boolean)
    .filter(function(item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
}

function getSharedTrackingAdminEmailList_() {
  const configured = splitEmailList_(PropertiesService.getScriptProperties().getProperty('PEC_VISOR_ADMIN_EMAILS') || '');
  return Array.from(new Set(configured));
}

function getSharedTrackingLegacyOperationalEmailList_() {
  const configured = splitEmailList_(PropertiesService.getScriptProperties().getProperty('PEC_VISOR_OPERATIONAL_EMAILS') || '');
  return Array.from(new Set(configured.concat(splitEmailList_(OPERATIONAL_DEFAULTS.sharedTrackingOperationalEmails.join(';')))));
}

function getSharedTrackingDocumentOperatorEmailList_() {
  const configured = splitEmailList_(PropertiesService.getScriptProperties().getProperty('PEC_VISOR_DOCUMENT_OPERATOR_EMAILS') || '');
  return Array.from(new Set(configured.concat(splitEmailList_(OPERATIONAL_DEFAULTS.sharedTrackingDocumentOperatorEmails.join(';')))));
}

function getSharedTrackingPmoEmailList_() {
  const configured = splitEmailList_(PropertiesService.getScriptProperties().getProperty('PEC_VISOR_PMO_EMAILS') || '');
  return Array.from(new Set(configured.concat(splitEmailList_(OPERATIONAL_DEFAULTS.sharedTrackingPmoEmails.join(';')))));
}

function getSharedTrackingAuditorEmailList_() {
  const configured = splitEmailList_(PropertiesService.getScriptProperties().getProperty('PEC_VISOR_AUDITOR_EMAILS') || '');
  return Array.from(new Set(configured.concat(splitEmailList_(OPERATIONAL_DEFAULTS.sharedTrackingAuditorEmails.join(';')))));
}

function getSharedTrackingOperationalEmailList_() {
  return Array.from(new Set(
    getSharedTrackingAdminEmailList_()
      .concat(getSharedTrackingLegacyOperationalEmailList_())
      .concat(getSharedTrackingDocumentOperatorEmailList_())
      .concat(getSharedTrackingPmoEmailList_())
  ));
}

function setOrDeleteScriptProperty_(properties, key, value) {
  if (value == null || value === '') {
    properties.deleteProperty(key);
    return;
  }
  properties.setProperty(key, String(value));
}

function getDailyAuditReportConfig_() {
  var properties = PropertiesService.getScriptProperties();
  var rawMode = String(properties.getProperty('PEC_VISOR_DAILY_REPORT_MODE') || '').trim().toUpperCase();
  var allowed = { PREVIEW_ONLY: true, TEST_REDIRECT: true, REAL: true };
  var mode = allowed[rawMode] ? rawMode : OPERATIONAL_DEFAULTS.dailyReportMode;
  var configuredTo = splitEmailList_(properties.getProperty('PEC_VISOR_DAILY_REPORT_TO') || '');
  var cc = splitEmailList_(properties.getProperty('PEC_VISOR_DAILY_REPORT_CC') || '');
  var testRecipients = splitEmailList_(properties.getProperty('PEC_VISOR_DAILY_REPORT_TEST_RECIPIENTS') || '');
  var adminRecipients = getSharedTrackingAdminEmailList_();
  var usingAdminFallback = !configuredTo.length && adminRecipients.length > 0;
  var to = usingAdminFallback ? adminRecipients.slice() : configuredTo.slice();
  var rawConfirm = String(properties.getProperty('PEC_VISOR_DAILY_REPORT_CONFIRM_REAL_SEND') || '').trim().toUpperCase();
  var realSendConfirmed = rawConfirm ? rawConfirm === 'SI' : Boolean(OPERATIONAL_DEFAULTS.dailyReportConfirmRealSend);
  var sendHour = normalizeDailyAuditReportSendHour_(properties.getProperty('PEC_VISOR_DAILY_REPORT_HOUR'));
  return {
    mode: mode,
    to: to,
    configuredTo: configuredTo,
    adminRecipients: adminRecipients,
    usingAdminFallback: usingAdminFallback,
    cc: cc,
    testRecipients: testRecipients,
    realSendConfirmed: realSendConfirmed,
    sendHour: sendHour
  };
}

function getAdminExecutiveSummaryConfig_() {
  var properties = PropertiesService.getScriptProperties();
  var recipients = getSharedTrackingAdminEmailList_();
  var sendHour = normalizeAdminExecutiveSummarySendHour_(properties.getProperty('PEC_VISOR_ADMIN_SUMMARY_HOUR'));
  return {
    recipients: recipients,
    sendHour: sendHour
  };
}

function ensureOperationalDailyReportDelivery_() {
  const config = getDailyAuditReportConfig_();
  const recipients = config.mode === 'TEST_REDIRECT' ? config.testRecipients : config.to;
  if (config.mode !== 'REAL' || !config.realSendConfirmed || !recipients.length) return;
  if (!getDailyAuditReportTriggers_().length) {
    recreateDailyAuditReportTrigger_();
  }
  if (!isOperationalWeekday_(new Date())) return;
  const timezone = Session.getScriptTimeZone();
  const now = new Date();
  const currentHour = Number(Utilities.formatDate(now, timezone, 'H'));
  if (!isFinite(currentHour) || currentHour < config.sendHour) return;
  const today = Utilities.formatDate(now, timezone, 'yyyy-MM-dd');
  const alreadySent = loadSharedTrackingAudit_().some(function(entry) {
    if (!entry || entry.action !== 'enviar_reporte_diario_correo') return false;
    const marker = entry.reportDate || entry.at || '';
    return normalizeRequestedAuditReportDate_(marker, timezone) === today;
  });
  if (alreadySent) return;
  dispatchSharedTrackingDailyAuditReportEmail_({
    actor: 'operacion_automatica',
    origin: 'operacion_diaria_recuperacion',
    reportDate: today
  });
}

function ensureOperationalAdminExecutiveSummaryDelivery_() {
  const config = getAdminExecutiveSummaryConfig_();
  if (!config.recipients.length) return;
  if (!getAdminExecutiveSummaryTriggers_().length) {
    recreateAdminExecutiveSummaryTrigger_();
  }
  if (!isOperationalWeekday_(new Date())) return;
  const timezone = Session.getScriptTimeZone();
  const now = new Date();
  const currentHour = Number(Utilities.formatDate(now, timezone, 'H'));
  if (!isFinite(currentHour) || currentHour < config.sendHour) return;
  const today = Utilities.formatDate(now, timezone, 'yyyy-MM-dd');
  const alreadySent = loadSharedTrackingAudit_().some(function(entry) {
    if (!entry || entry.action !== 'enviar_resumen_ejecutivo_admin') return false;
    const marker = entry.reportDate || entry.at || '';
    return normalizeRequestedAuditReportDate_(marker, timezone) === today;
  });
  if (alreadySent) return;
  dispatchSharedTrackingAdminExecutiveSummaryEmail_({
    actor: 'operacion_admin_automatica',
    origin: 'operacion_nocturna_recuperacion',
    reportDate: today
  });
}

function recreateDailyAuditReportTrigger_() {
  var removed = 0;
  getDailyAuditReportTriggers_().forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
    removed += 1;
  });
  ScriptApp.newTrigger('runDailyAuditReportEmail_')
    .timeBased()
    .everyDays(1)
    .atHour(getDailyAuditReportConfig_().sendHour)
    .create();
  return removed;
}

function normalizeDailyAuditReportSendHour_(value) {
  var parsed = Number(value);
  if (!isFinite(parsed)) return OPERATIONAL_DEFAULTS.dailyReportSendHour;
  return Math.max(0, Math.min(23, Math.round(parsed)));
}

function getAdminExecutiveSummaryTriggers_() {
  return ScriptApp.getProjectTriggers().filter(function(trigger) {
    return trigger.getHandlerFunction && trigger.getHandlerFunction() === 'runNightlyAdminExecutiveSummaryEmail_';
  });
}

function recreateAdminExecutiveSummaryTrigger_() {
  var removed = 0;
  getAdminExecutiveSummaryTriggers_().forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
    removed += 1;
  });
  ScriptApp.newTrigger('runNightlyAdminExecutiveSummaryEmail_')
    .timeBased()
    .everyDays(1)
    .atHour(getAdminExecutiveSummaryConfig_().sendHour)
    .create();
  return removed;
}

function normalizeAdminExecutiveSummarySendHour_(value) {
  var parsed = Number(value);
  if (!isFinite(parsed)) return OPERATIONAL_DEFAULTS.adminSummarySendHour;
  return Math.max(0, Math.min(23, Math.round(parsed)));
}

function isOperationalWeekday_(date, timezone) {
  var safeDate = date instanceof Date ? date : new Date();
  var safeTimezone = String(timezone || Session.getScriptTimeZone() || 'America/Lima');
  var weekday = Number(Utilities.formatDate(safeDate, safeTimezone, 'u'));
  return weekday >= 1 && weekday <= 5;
}

function ensureSharedVisorViewUrl_(url) {
  var raw = String(url || '').trim();
  if (!raw) return '';
  if (/[?&]view=visor(?:&|$)/i.test(raw)) return raw;
  return raw + (raw.indexOf('?') >= 0 ? '&view=visor' : '?view=visor');
}

function isCanonicalSharedVisorUrl_(url) {
  return String(url || '').trim().toLowerCase().indexOf(SHARED_VISOR_CANONICAL_WEBAPP_BASE.toLowerCase()) === 0;
}

function getTrackingWebAppUrl_() {
  var configured = String(PropertiesService.getScriptProperties().getProperty('PEC_VISOR_WEBAPP_URL') || '').trim();
  if (isCanonicalSharedVisorUrl_(configured)) return ensureSharedVisorViewUrl_(configured);
  try {
    var serviceUrl = ScriptApp.getService().getUrl();
    if (isCanonicalSharedVisorUrl_(serviceUrl)) return ensureSharedVisorViewUrl_(serviceUrl);
  } catch (error) {}
  return ensureSharedVisorViewUrl_(SHARED_VISOR_CANONICAL_WEBAPP_BASE);
}

function splitTrackingPeople_(value) {
  var seen = {};
  return String(value == null ? '' : value)
    .split(/[\/,;]+/)
    .map(function(item) { return String(item || '').trim().replace(/\s+/g, ' '); })
    .filter(Boolean)
    .filter(function(item) {
      var key = normalizeNotificationKey_(item);
      if (!key || seen[key]) return false;
      seen[key] = true;
      return true;
    });
}

function splitTrackingEntities_(value) {
  var seen = {};
  return String(value == null ? '' : value)
    .replace(/\s+y\s+/gi, '/')
    .split(/[\/,;|]+/)
    .map(function(item) { return String(item || '').trim().replace(/\s+/g, ' '); })
    .filter(Boolean)
    .filter(function(item) {
      var key = normalizeNotificationKey_(item);
      if (!key || seen[key]) return false;
      seen[key] = true;
      return true;
    });
}

function normalizeNotificationKey_(value) {
  return String(value == null ? '' : value)
    .trim()
    .replace(/\s+/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function parseTrackingDate_(value) {
  var raw = String(value == null ? '' : value).trim();
  if (!raw) return null;
  var date = new Date(raw + 'T00:00:00');
  return isNaN(date.getTime()) ? null : date;
}

function parseTrackingDateTime_(value) {
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
  var raw = String(value == null ? '' : value).trim();
  if (!raw) return null;
  var date = new Date(raw);
  return isNaN(date.getTime()) ? null : date;
}

function formatTrackingDateTime_(value) {
  var date = value instanceof Date ? value : parseTrackingDateTime_(value);
  if (!date) return '';
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm');
}

function formatTrackingDateLabel_(value) {
  var date = parseTrackingDate_(value);
  if (!date) return String(value == null ? '' : value).trim();
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'dd/MM/yyyy');
}

function escapeHtmlEmail_(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildSharedTrackingEnvelope_(state, extra) {
  const safeState = normalizeSharedTrackingStateBundle_(state, buildDefaultSharedTrackingState_());
  const overrides = extra && typeof extra === 'object' ? extra : {};
  const meta = Object.assign(
    {},
    getSharedTrackingBackendMeta_(),
    overrides.backend && typeof overrides.backend === 'object' ? overrides.backend : {}
  );
  const payload = {
    ok: true,
    mode: 'apps_script',
    actor: String(overrides.actor != null ? overrides.actor : (meta.actor || '')).trim(),
    actorVerified: typeof overrides.actorVerified !== 'undefined'
      ? Boolean(overrides.actorVerified)
      : Boolean(meta.actorVerified),
    actorSource: String(overrides.actorSource != null ? overrides.actorSource : (meta.actorSource || '')).trim(),
    declaredActor: String(overrides.declaredActor != null ? overrides.declaredActor : (meta.declaredActor || '')).trim(),
    admin: meta.admin,
    savedAt: safeState.savedAt || '',
    revision: Number(safeState.revision || 0),
    state: safeState,
    analytics: typeof overrides.analytics !== 'undefined'
      ? overrides.analytics
      : buildSharedTrackingAnalyticalSummary_(safeState, {}),
    backend: meta
  };
  return Object.assign(payload, overrides, { backend: meta, analytics: payload.analytics });
}

function buildSharedTrackingPublicBackendMeta_() {
  const latestBackup = getLatestSharedTrackingBackupMeta_() || {};
  const latestSnapshot = getLatestSharedTrackingSnapshotMeta_() || {};
  return {
    mode: 'public_readonly',
    storage: 'drive_json',
    actor: '',
    actorEmail: '',
    actorVerified: false,
    actorSource: 'public_view',
    declaredActor: '',
    admin: false,
    canEditShared: false,
    canManageAttachments: false,
    canRemoveAttachments: false,
    canViewSensitiveAudit: false,
    canViewOperationalCenter: false,
    canExportSupportInventory: false,
    canRestoreSharedState: false,
    permissionRole: 'public_viewer',
    permissionReasonCode: 'public_readonly',
    permissionReasonMessage: 'Esta URL es de solo lectura. Usa el visor de trabajo para editar, crear o administrar sustentos.',
    pollIntervalSeconds: 30,
    backendFolder: '_VisorSeguimientoPEC',
    backupFolder: 'backups',
    snapshotFolder: 'snapshots',
    lastBackupAt: String(latestBackup.updatedAt || ''),
    lastBackupFile: String(latestBackup.fileName || ''),
    lastBackupId: '',
    lastSnapshotAt: String(latestSnapshot.updatedAt || ''),
    lastSnapshotFile: String(latestSnapshot.fileName || ''),
    workViewerUrl: ensureSharedVisorViewUrl_(SHARED_VISOR_CANONICAL_WEBAPP_BASE),
    publicViewerUrl: PANEL_PUBLIC_SHARED_VIEW_URL
  };
}

function normalizeSharedTrackingStateBundle_(bundle, fallback) {
  const data = bundle && typeof bundle === 'object' ? bundle : {};
  const base = fallback && typeof fallback === 'object' ? fallback : {};
  return {
    format: 'pec-shared-state-v1',
    revision: Number(data.revision != null ? data.revision : (base.revision || 0)),
    savedAt: String(data.savedAt != null ? data.savedAt : (base.savedAt || '')),
    savedBy: String(data.savedBy != null ? data.savedBy : (base.savedBy || '')),
    sourceMode: String(data.sourceMode || base.sourceMode || 'embedded'),
    hero: normalizeHeroState_(data.hero, base.hero || {}),
    customPeople: normalizeStringArray_(data.customPeople || base.customPeople || []),
    customEntities: normalizeStringArray_(data.customEntities || base.customEntities || []),
    aliases: normalizeObjectMap_(data.aliases || base.aliases || {}),
    notes: normalizeSharedTrackingNotesMap_(data.notes || base.notes || {}),
    edits: normalizeObjectMap_(data.edits || base.edits || {}),
    customRecords: Array.isArray(data.customRecords) ? data.customRecords : (Array.isArray(base.customRecords) ? base.customRecords : []),
    payload: normalizeSharedPayload_(data.payload || base.payload || null)
  };
}

function normalizeSharedTrackingNotesMap_(value) {
  const raw = normalizeObjectMap_(value);
  const out = {};
  Object.keys(raw).forEach(function(id) {
    const entry = normalizeSharedTrackingNoteEntry_(raw[id]);
    if (entry.note || entry.action || (entry.attachments && entry.attachments.length) || hasSharedTrackingAttachmentFolderMeta_(entry.attachmentFolder)) {
      out[String(id || '').trim()] = entry;
    }
  });
  return out;
}

function normalizeSharedTrackingNoteEntry_(value) {
  const raw = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  const out = Object.assign({}, raw);
  out.note = String(raw.note || '');
  out.action = String(raw.action || '');
  out.attachmentFolder = normalizeSharedTrackingAttachmentFolderMeta_(raw.attachmentFolder);
  out.attachments = normalizeSharedTrackingAttachmentList_(raw.attachments);
  return out;
}

function normalizeSharedTrackingAttachmentFolderMeta_(value) {
  const raw = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  const folderId = String(raw.folderId || raw.id || '').trim();
  const url = String(raw.folderUrl || raw.url || '').trim();
  const name = String(raw.folderName || raw.name || '').trim();
  if (!folderId && !url && !name) return null;
  return {
    folderId: folderId,
    folderUrl: url,
    url: url,
    folderName: name,
    name: name,
    recordId: String(raw.recordId || '').trim(),
    recordLabel: String(raw.recordLabel || '').trim(),
    logicalPath: String(raw.logicalPath || '').trim(),
    createdAt: String(raw.createdAt || '').trim(),
    createdBy: String(raw.createdBy || '').trim(),
    createdByEmail: String(raw.createdByEmail || '').trim(),
    updatedAt: String(raw.updatedAt || '').trim()
  };
}

function redactSharedTrackingAttachmentFolderMetaForPublic_(value) {
  const safe = normalizeSharedTrackingAttachmentFolderMeta_(value);
  if (!safe) return null;
  return {
    folderId: '',
    folderUrl: '',
    url: '',
    folderName: String(safe.folderName || safe.name || '').trim(),
    name: String(safe.name || safe.folderName || '').trim(),
    recordId: String(safe.recordId || '').trim(),
    recordLabel: String(safe.recordLabel || '').trim(),
    logicalPath: '',
    createdAt: String(safe.createdAt || '').trim(),
    createdBy: '',
    createdByEmail: '',
    updatedAt: ''
  };
}

function hasSharedTrackingAttachmentFolderMeta_(value) {
  return Boolean(value && typeof value === 'object' && (String(value.folderId || '').trim() || String(value.folderUrl || value.url || '').trim() || String(value.folderName || value.name || '').trim()));
}

function normalizeSharedTrackingAttachmentList_(values) {
  const out = [];
  const seen = {};
  (Array.isArray(values) ? values : []).forEach(function(item) {
    const normalized = normalizeSharedTrackingAttachmentMeta_(item);
    if (!normalized || seen[normalized.id]) return;
    seen[normalized.id] = true;
    out.push(normalized);
  });
  return out;
}

function redactSharedTrackingAttachmentForPublic_(value) {
  const safe = normalizeSharedTrackingAttachmentMeta_(value);
  if (!safe) return null;
  return Object.assign({}, safe, {
    fileId: '',
    folderId: '',
    folderUrl: '',
    url: '',
    logicalPath: '',
    uploadedByEmail: '',
    removedBy: ''
  });
}

function buildSharedTrackingPublicState_(state) {
  const safeState = normalizeSharedTrackingStateBundle_(state, buildDefaultSharedTrackingState_());
  const nextNotes = {};
  Object.keys(safeState.notes || {}).forEach(function(recordId) {
    const entry = normalizeSharedTrackingNoteEntry_(safeState.notes[recordId]);
    nextNotes[recordId] = {
      note: String(entry.note || ''),
      action: String(entry.action || ''),
      attachmentFolder: redactSharedTrackingAttachmentFolderMetaForPublic_(entry.attachmentFolder),
      attachments: (Array.isArray(entry.attachments) ? entry.attachments : [])
        .map(redactSharedTrackingAttachmentForPublic_)
        .filter(Boolean)
    };
  });
  return Object.assign({}, safeState, { notes: nextNotes });
}

function normalizeSharedTrackingAttachmentMeta_(value) {
  const raw = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  const id = String(raw.id || raw.fileId || raw.url || raw.name || '').trim();
  const name = sanitizeSharedTrackingAttachmentName_(raw.name || '');
  if (!id || !name) return null;
  const size = Number(raw.size || 0);
  return {
    id: id,
    name: name,
    mimeType: String(raw.mimeType || 'application/octet-stream').trim() || 'application/octet-stream',
    size: isFinite(size) && size > 0 ? Math.round(size) : 0,
    fileId: String(raw.fileId || '').trim(),
    folderId: String(raw.folderId || '').trim(),
    folderUrl: String(raw.folderUrl || '').trim(),
    url: String(raw.url || '').trim(),
    logicalPath: String(raw.logicalPath || '').trim(),
    documentType: normalizeSharedTrackingDocumentType_(raw.documentType),
    status: normalizeSharedTrackingAttachmentStatus_(raw.status),
    uploadedAt: String(raw.uploadedAt || '').trim(),
    uploadedBy: String(raw.uploadedBy || '').trim(),
    uploadedByEmail: String(raw.uploadedByEmail || '').trim(),
    actorSource: String(raw.actorSource || '').trim(),
    actorVerified: Boolean(raw.actorVerified),
    removedAt: String(raw.removedAt || '').trim(),
    removedBy: String(raw.removedBy || '').trim(),
    removedReason: String(raw.removedReason || '').trim()
  };
}

function normalizeSharedTrackingUploadPayload_(uploads) {
  return (Array.isArray(uploads) ? uploads : []).map(function(item) {
    const raw = item && typeof item === 'object' ? item : {};
    const name = sanitizeSharedTrackingAttachmentName_(raw.name || '');
    const contentBase64 = String(raw.contentBase64 || '').trim();
    if (!name || !contentBase64) return null;
    const size = Number(raw.size || 0);
    return {
      name: name,
      mimeType: String(raw.mimeType || 'application/octet-stream').trim() || 'application/octet-stream',
      size: isFinite(size) && size > 0 ? Math.round(size) : 0,
      documentType: normalizeSharedTrackingDocumentType_(raw.documentType),
      contentBase64: contentBase64
    };
  }).filter(Boolean);
}

function normalizeSharedTrackingDocumentType_(value) {
  const raw = String(value == null ? '' : value).trim();
  if (!raw) return 'unknown';
  const key = normalizeNotificationKey_(raw).replace(/\.+/g, '').replace(/\s+/g, ' ');
  if (!key || key === 'unknown' || key === 'sin clasificar' || key === 'sin clasificacion' || key === 'n/a') {
    return 'unknown';
  }
  if (Object.prototype.hasOwnProperty.call(SHARED_TRACKING_DOCUMENT_TYPE_ALIASES, key)) {
    return SHARED_TRACKING_DOCUMENT_TYPE_ALIASES[key];
  }
  const canonical = SHARED_TRACKING_DOCUMENT_TYPE_CATALOG.find(function(item) {
    return normalizeNotificationKey_(item) === key;
  });
  return canonical || 'Otro';
}

function describeSharedTrackingDocumentType_(value) {
  const safe = normalizeSharedTrackingDocumentType_(value);
  return safe === 'unknown' ? 'Sin clasificar' : safe;
}

function getSharedTrackingDocumentTypeCatalog_() {
  return SHARED_TRACKING_DOCUMENT_TYPE_CATALOG.slice();
}

function normalizeSharedTrackingAttachmentStatus_(value) {
  const raw = String(value == null ? '' : value).trim().toLowerCase();
  return raw === 'removed' ? 'removed' : 'active';
}

function buildSharedTrackingLogicalPath_(folderName, fileName) {
  const parts = ['_VisorSeguimientoPEC', 'adjuntos'];
  const safeFolder = String(folderName || '').trim();
  const safeFile = String(fileName || '').trim();
  if (safeFolder) parts.push(safeFolder);
  if (safeFile) parts.push(safeFile);
  return parts.join('/');
}

function sanitizeSharedTrackingAttachmentName_(value) {
  const raw = String(value == null ? '' : value).trim().replace(/[\\\/:*?"<>|]+/g, '_').replace(/\s+/g, ' ');
  return raw ? raw.slice(0, 180) : '';
}

function normalizeHeroState_(hero, fallbackHero) {
  const saved = hero && typeof hero === 'object' ? hero : {};
  const fallback = fallbackHero && typeof fallbackHero === 'object' ? fallbackHero : {};
  return {
    title: saved.title != null ? String(saved.title) : (fallback.title != null ? String(fallback.title) : 'Visor de Seguimiento PEC'),
    subtitle: saved.subtitle != null ? String(saved.subtitle) : (fallback.subtitle != null ? String(fallback.subtitle) : 'Programa de Economia Circular para Puno y Lima.'),
    meta1: saved.meta1 != null ? String(saved.meta1) : (fallback.meta1 != null ? String(fallback.meta1) : 'DGPPCS'),
    meta2: saved.meta2 != null ? String(saved.meta2) : (fallback.meta2 != null ? String(fallback.meta2) : 'Puno y Lima'),
    meta3: saved.meta3 != null ? String(saved.meta3) : (fallback.meta3 != null ? String(fallback.meta3) : 'Seguimiento operativo'),
    extras: Array.isArray(saved.extras) ? normalizeStringArray_(saved.extras) : (Array.isArray(fallback.extras) ? normalizeStringArray_(fallback.extras) : [])
  };
}

function normalizeSharedPayload_(payload) {
  if (!payload || typeof payload !== 'object') return null;
  return {
    meta: payload.meta && typeof payload.meta === 'object' ? payload.meta : {},
    summary: payload.summary && typeof payload.summary === 'object' ? payload.summary : {},
    records: Array.isArray(payload.records) ? payload.records : []
  };
}

function normalizeStringArray_(values) {
  const out = [];
  (Array.isArray(values) ? values : []).forEach(function(value) {
    const text = String(value == null ? '' : value).trim();
    if (text && out.indexOf(text) < 0) out.push(text);
  });
  return out;
}

function normalizeObjectMap_(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function buildDefaultSharedTrackingState_() {
  return {
    format: 'pec-shared-state-v1',
    revision: 0,
    savedAt: '',
    savedBy: '',
    sourceMode: 'embedded',
    hero: normalizeHeroState_({}),
    customPeople: [],
    customEntities: [],
    aliases: {},
    notes: {},
    edits: {},
    customRecords: [],
    payload: null
  };
}

function loadSharedTrackingState_() {
  const file = getOrCreateBackendFile_(
    'PEC_VISOR_SHARED_STATE_FILE_ID',
    'shared_tracking_state.json',
    JSON.stringify(buildDefaultSharedTrackingState_(), null, 2)
  );
  return normalizeSharedTrackingStateBundle_(readJsonFile_(file, buildDefaultSharedTrackingState_()), buildDefaultSharedTrackingState_());
}

function writeSharedTrackingState_(state) {
  const file = getOrCreateBackendFile_(
    'PEC_VISOR_SHARED_STATE_FILE_ID',
    'shared_tracking_state.json',
    JSON.stringify(buildDefaultSharedTrackingState_(), null, 2)
  );
  file.setContent(JSON.stringify(state, null, 2));
}

function loadSharedTrackingAudit_() {
  const file = getOrCreateBackendFile_(
    'PEC_VISOR_AUDIT_FILE_ID',
    'shared_tracking_audit.json',
    '[]'
  );
  const audit = readJsonFile_(file, []);
  return Array.isArray(audit) ? audit : [];
}

function appendSharedTrackingAudit_(entry) {
  const file = getOrCreateBackendFile_(
    'PEC_VISOR_AUDIT_FILE_ID',
    'shared_tracking_audit.json',
    '[]'
  );
  const audit = loadSharedTrackingAudit_();
  audit.unshift(entry);
  file.setContent(JSON.stringify(audit.slice(0, 1000), null, 2));
}

function writeSharedTrackingBackup_(state) {
  const folder = getOrCreateBackendBackupFolder_();
  const fileName = 'shared_tracking_backup_' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd') + '.json';
  const files = folder.getFilesByName(fileName);
  const content = JSON.stringify(state, null, 2);
  let file = null;
  if (files.hasNext()) {
    file = files.next();
    file.setContent(content);
  } else {
    file = folder.createFile(fileName, content, MimeType.PLAIN_TEXT);
  }
  return {
    fileId: file.getId(),
    fileName: file.getName(),
    updatedAt: file.getLastUpdated().toISOString(),
    content: content
  };
}

function sanitizeSharedTrackingSnapshotSegment_(value, fallback) {
  const safe = String(value == null ? '' : value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return safe || String(fallback || 'snapshot');
}

function getOrCreateBackendSnapshotFolder_() {
  const props = PropertiesService.getScriptProperties();
  const cachedId = props.getProperty('PEC_VISOR_SNAPSHOT_FOLDER_ID');
  if (cachedId) {
    try {
      return DriveApp.getFolderById(cachedId);
    } catch (error) {}
  }
  const backupRoot = getOrCreateBackendBackupFolder_();
  const folders = backupRoot.getFoldersByName('snapshots');
  const folder = folders.hasNext() ? folders.next() : backupRoot.createFolder('snapshots');
  props.setProperty('PEC_VISOR_SNAPSHOT_FOLDER_ID', folder.getId());
  return folder;
}

function writeSharedTrackingSnapshot_(state, actorInfo, action, phase) {
  const folder = getOrCreateBackendSnapshotFolder_();
  const safeState = normalizeSharedTrackingStateBundle_(state, buildDefaultSharedTrackingState_());
  const actorMeta = buildAuditActorMeta_(actorInfo);
  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
  const revision = Number(safeState.revision || 0);
  const fileName = [
    'shared_tracking_snapshot',
    String(revision).padStart(5, '0'),
    sanitizeSharedTrackingSnapshotSegment_(action, 'accion'),
    sanitizeSharedTrackingSnapshotSegment_(phase, 'before'),
    timestamp
  ].join('__') + '.json';
  const content = JSON.stringify({
    meta: {
      capturedAt: new Date().toISOString(),
      revision: revision,
      action: String(action || '').trim(),
      phase: String(phase || '').trim(),
      actor: actorMeta.actor,
      actorEmail: actorMeta.actorEmail,
      actorSource: actorMeta.actorSource,
      actorVerified: actorMeta.actorVerified,
      declaredActor: actorMeta.declaredActor
    },
    state: safeState
  }, null, 2);
  const file = folder.createFile(fileName, content, MimeType.PLAIN_TEXT);
  return {
    fileId: file.getId(),
    fileName: file.getName(),
    updatedAt: file.getLastUpdated().toISOString()
  };
}

function getLatestSharedTrackingSnapshotMeta_() {
  const folder = getOrCreateBackendSnapshotFolder_();
  const files = folder.getFiles();
  let latest = null;
  while (files.hasNext()) {
    const file = files.next();
    const updatedAt = file.getLastUpdated();
    if (!latest || updatedAt.getTime() > latest._date.getTime()) {
      latest = {
        fileId: file.getId(),
        fileName: file.getName(),
        updatedAt: updatedAt.toISOString(),
        _date: updatedAt
      };
    }
  }
  if (!latest) return null;
  delete latest._date;
  return latest;
}

function readSharedTrackingSnapshotStateById_(fileId) {
  if (!fileId) return null;
  try {
    const file = DriveApp.getFileById(String(fileId));
    const parsed = readJsonFile_(file, null);
    if (!parsed || typeof parsed !== 'object') return null;
    if (parsed.state && typeof parsed.state === 'object') {
      return normalizeSharedTrackingStateBundle_(parsed.state, buildDefaultSharedTrackingState_());
    }
    return normalizeSharedTrackingStateBundle_(parsed, buildDefaultSharedTrackingState_());
  } catch (error) {
    return null;
  }
}

function getOrCreateBackendAttachmentsFolder_() {
  const props = PropertiesService.getScriptProperties();
  const cachedId = props.getProperty('PEC_VISOR_ATTACHMENTS_FOLDER_ID');
  if (cachedId) {
    try {
      return DriveApp.getFolderById(cachedId);
    } catch (error) {}
  }
  const root = getOrCreateBackendRootFolder_();
  const folders = root.getFoldersByName('adjuntos');
  const folder = folders.hasNext() ? folders.next() : root.createFolder('adjuntos');
  props.setProperty('PEC_VISOR_ATTACHMENTS_FOLDER_ID', folder.getId());
  return folder;
}

function getOrCreateBackendRecordAttachmentFolder_(recordMeta) {
  const root = getOrCreateBackendAttachmentsFolder_();
  const folderName = buildSharedTrackingAttachmentFolderName_(recordMeta);
  const folders = root.getFoldersByName(folderName);
  return folders.hasNext() ? folders.next() : root.createFolder(folderName);
}

function buildSharedTrackingAttachmentFolderMeta_(folder, recordMeta, actorInfo, previousMeta) {
  const safeFolder = folder || null;
  const meta = recordMeta && typeof recordMeta === 'object' ? recordMeta : {};
  const actor = actorInfo && typeof actorInfo === 'object' ? actorInfo : {};
  const previous = normalizeSharedTrackingAttachmentFolderMeta_(previousMeta);
  if (!safeFolder) return null;
  var createdAt = '';
  try {
    createdAt = safeFolder.getDateCreated ? safeFolder.getDateCreated().toISOString() : '';
  } catch (error) {}
  const folderName = String(safeFolder.getName() || '').trim();
  const folderUrl = String(safeFolder.getUrl() || '').trim();
  const folderId = String(safeFolder.getId() || '').trim();
  const finalCreatedAt = String(previous && previous.createdAt || createdAt || '').trim();
  const finalCreatedBy = String(previous && previous.createdBy || actor.actor || '').trim();
  const finalCreatedByEmail = String(previous && previous.createdByEmail || actor.email || '').trim();
  return {
    folderId: folderId,
    folderUrl: folderUrl,
    url: folderUrl,
    folderName: folderName,
    name: folderName,
    recordId: String(meta.id || '').trim(),
    recordLabel: String(meta.label || '').trim(),
    logicalPath: buildSharedTrackingLogicalPath_(folderName, ''),
    createdAt: finalCreatedAt,
    createdBy: finalCreatedBy,
    createdByEmail: finalCreatedByEmail,
    updatedAt: ''
  };
}

function buildSharedTrackingAttachmentFolderName_(recordMeta) {
  const meta = recordMeta && typeof recordMeta === 'object' ? recordMeta : {};
  const recordId = String(meta.id || 'record').trim().replace(/[^a-zA-Z0-9._-]+/g, '_').slice(0, 60) || 'record';
  const edt = String(meta.edt || '').trim().replace(/[^a-zA-Z0-9._-]+/g, '_').replace(/\./g, '_').slice(0, 40);
  return ['record', recordId, edt ? ('EDT_' + edt) : ''].filter(Boolean).join('__');
}

function buildSharedTrackingStoredAttachmentName_(name) {
  const safeName = sanitizeSharedTrackingAttachmentName_(name) || 'archivo';
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss') + '__' + safeName;
}

function getOrCreateBackendRootFolder_() {
  const props = PropertiesService.getScriptProperties();
  const cachedId = props.getProperty('PEC_VISOR_BACKEND_FOLDER_ID');
  if (cachedId) {
    try {
      return DriveApp.getFolderById(cachedId);
    } catch (error) {}
  }
  const root = getOrCreateRoot_();
  const folders = root.getFoldersByName('_VisorSeguimientoPEC');
  const folder = folders.hasNext() ? folders.next() : root.createFolder('_VisorSeguimientoPEC');
  props.setProperty('PEC_VISOR_BACKEND_FOLDER_ID', folder.getId());
  return folder;
}

function getOrCreateBackendBackupFolder_() {
  const props = PropertiesService.getScriptProperties();
  const cachedId = props.getProperty('PEC_VISOR_BACKUP_FOLDER_ID');
  if (cachedId) {
    try {
      return DriveApp.getFolderById(cachedId);
    } catch (error) {}
  }
  const root = getOrCreateBackendRootFolder_();
  const folders = root.getFoldersByName('backups');
  const folder = folders.hasNext() ? folders.next() : root.createFolder('backups');
  props.setProperty('PEC_VISOR_BACKUP_FOLDER_ID', folder.getId());
  return folder;
}

function getLatestSharedTrackingBackupMeta_() {
  const folder = getOrCreateBackendBackupFolder_();
  const files = folder.getFiles();
  let latest = null;
  while (files.hasNext()) {
    const file = files.next();
    const updatedAt = file.getLastUpdated();
    if (!latest || updatedAt.getTime() > latest._date.getTime()) {
      latest = {
        fileId: file.getId(),
        fileName: file.getName(),
        updatedAt: updatedAt.toISOString(),
        _date: updatedAt
      };
    }
  }
  if (!latest) return null;
  delete latest._date;
  return latest;
}

function getOrCreateBackendFile_(propertyKey, fileName, defaultContent) {
  const props = PropertiesService.getScriptProperties();
  const cachedId = props.getProperty(propertyKey);
  if (cachedId) {
    try {
      return DriveApp.getFileById(cachedId);
    } catch (error) {}
  }
  const folder = getOrCreateBackendRootFolder_();
  const files = folder.getFilesByName(fileName);
  const file = files.hasNext()
    ? files.next()
    : folder.createFile(fileName, defaultContent || '', MimeType.PLAIN_TEXT);
  props.setProperty(propertyKey, file.getId());
  return file;
}

function readJsonFile_(file, fallback) {
  try {
    const raw = file.getBlob().getDataAsString('UTF-8');
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function getSharedTrackingActor_() {
  try {
    return Session.getActiveUser().getEmail() || '';
  } catch (error) {
    return '';
  }
}

function normalizeSharedTrackingDeclaredActor_(value) {
  const raw = String(value == null ? '' : value).trim().replace(/\s+/g, ' ');
  if (!raw) return '';
  if (isEmailLike_(raw)) return raw.toLowerCase();
  return raw.slice(0, 160);
}

function resolveSharedTrackingActorInfo_(clientActorName) {
  const serverActor = String(getSharedTrackingActor_() || '').trim().toLowerCase();
  const declaredActor = normalizeSharedTrackingDeclaredActor_(clientActorName);
  if (serverActor) {
    const displayActor = resolveTrackingActorDisplayName_(serverActor, serverActor);
    return {
      actor: displayActor,
      email: serverActor,
      source: 'session_email',
      verified: true,
      declaredActor: declaredActor
    };
  }
  if (declaredActor) {
    const declaredEmail = isEmailLike_(declaredActor) ? declaredActor.toLowerCase() : '';
    return {
      actor: declaredEmail ? resolveTrackingActorDisplayName_(declaredEmail, declaredActor) : declaredActor,
      email: declaredEmail,
      source: 'client_query',
      verified: false,
      declaredActor: declaredActor
    };
  }
  return {
    actor: '',
    email: '',
    source: 'missing',
    verified: false,
    declaredActor: ''
  };
}

function resolveSharedTrackingPermissionContext_(clientActorName) {
  const actorInfo = resolveSharedTrackingActorInfo_(clientActorName);
  const email = String(actorInfo.email || '').trim().toLowerCase();
  const verified = Boolean(actorInfo.verified && email);
  const adminEmails = getSharedTrackingAdminEmailList_()
    .map(function(item) { return String(item || '').trim().toLowerCase(); })
    .filter(Boolean);
  const isAdmin = Boolean(verified && adminEmails.indexOf(email) >= 0);
  const safeActor = String(actorInfo.actor || '').trim() || String(actorInfo.declaredActor || '').trim() || 'Usuario de trabajo';
  let permissionRole = 'work_operator';
  let reasonCode = verified ? 'work_channel_verified' : 'work_channel_open';
  let reasonMessage = verified
    ? 'Canal de trabajo DGPPCS habilitado. Tu correo fue reconocido y puedes editar la ficha compartida y administrar sustentos.'
    : 'Canal de trabajo DGPPCS habilitado. Puedes editar la ficha compartida y administrar sustentos desde esta URL. Todas las acciones quedan auditadas.';
  if (isAdmin) {
    permissionRole = 'admin';
    reasonCode = 'admin_verified';
    reasonMessage = 'Correo verificado con acceso administrador al visor compartido.';
  }
  return Object.assign({}, actorInfo, {
    actor: safeActor,
    email: email,
    verified: verified,
    isAdmin: isAdmin,
    isPmo: false,
    isDocumentOperator: false,
    isAuditor: false,
    isOperational: true,
    canEditShared: true,
    canManageAttachments: true,
    canRemoveAttachments: true,
    canViewSensitiveAudit: Boolean(isAdmin),
    canViewOperationalCenter: Boolean(isAdmin),
    canExportSupportInventory: true,
    canRestoreSharedState: Boolean(isAdmin),
    permissionRole: permissionRole,
    reasonCode: reasonCode,
    reasonMessage: reasonMessage
  });
}

function buildSharedTrackingPermissionDeniedEnvelope_(state, permission, message, auditMeta) {
  const safePermission = permission && typeof permission === 'object'
    ? permission
    : resolveSharedTrackingPermissionContext_('');
  const finalMessage = String(message || safePermission.reasonMessage || 'Acción bloqueada por permisos.').trim() || 'Acción bloqueada por permisos.';
  if (safePermission.actor || safePermission.email || safePermission.declaredActor) {
    const meta = auditMeta && typeof auditMeta === 'object' ? auditMeta : {};
    appendSharedTrackingAudit_({
      at: new Date().toISOString(),
      actor: String(safePermission.actor || '').trim(),
      actorEmail: String(safePermission.email || '').trim(),
      actorSource: String(safePermission.source || 'missing').trim() || 'missing',
      actorVerified: Boolean(safePermission.verified),
      declaredActor: String(safePermission.declaredActor || '').trim(),
      action: String(meta.action || 'intento_bloqueado').trim() || 'intento_bloqueado',
      origin: String(meta.origin || 'control_permisos').trim() || 'control_permisos',
      permissionRole: String(safePermission.permissionRole || 'viewer').trim() || 'viewer',
      reasonCode: String(safePermission.reasonCode || '').trim(),
      message: finalMessage
    });
  }
  return buildSharedTrackingEnvelope_(state, {
    ok: false,
    missingActor: !safePermission.actor,
    permissionDenied: true,
    permissionReasonCode: String(safePermission.reasonCode || '').trim(),
    actor: String(safePermission.actor || '').trim(),
    actorVerified: Boolean(safePermission.verified),
    actorSource: String(safePermission.source || 'missing').trim() || 'missing',
    declaredActor: String(safePermission.declaredActor || '').trim(),
    message: finalMessage,
    backend: getSharedTrackingBackendMeta_(safePermission)
  });
}

function buildAuditActorMeta_(actorInfo) {
  const info = actorInfo && typeof actorInfo === 'object'
    ? actorInfo
    : {
        actor: String(actorInfo == null ? '' : actorInfo).trim(),
        email: '',
        source: 'legacy_actor',
        verified: false,
        declaredActor: ''
      };
  return {
    actor: String(info.actor || '').trim(),
    actorEmail: String(info.email || '').trim(),
    actorSource: String(info.source || 'legacy_actor').trim() || 'legacy_actor',
    actorVerified: Boolean(info.verified),
    declaredActor: String(info.declaredActor || '').trim()
  };
}

function isSharedTrackingAdmin_() {
  const actor = String(getSharedTrackingActor_() || '').trim().toLowerCase();
  if (!actor) return false;
  const configured = getSharedTrackingAdminEmailList_();
  if (!configured.length) return true;
  return configured
    .map(function(item) { return String(item || '').trim().toLowerCase(); })
    .filter(Boolean)
    .indexOf(actor) >= 0;
}

function getSharedTrackingBackendMeta_(actorInfo) {
  const latestBackup = getLatestSharedTrackingBackupMeta_() || {};
  const latestSnapshot = getLatestSharedTrackingSnapshotMeta_() || {};
  const identity = actorInfo && typeof actorInfo === 'object' ? actorInfo : null;
  const permission = identity && typeof identity.canEditShared !== 'undefined'
    ? identity
    : resolveSharedTrackingPermissionContext_(identity && identity.declaredActor ? identity.declaredActor : '');
  return {
    mode: 'apps_script',
    storage: 'drive_json',
    actor: String(permission.actor || '').trim(),
    actorEmail: String(permission.email || '').trim(),
    actorVerified: Boolean(permission.verified),
    actorSource: String(permission.source || 'missing').trim() || 'missing',
    declaredActor: String(permission.declaredActor || '').trim(),
    admin: Boolean(permission.isAdmin),
    canEditShared: Boolean(permission.canEditShared),
    canManageAttachments: Boolean(permission.canManageAttachments),
    canRemoveAttachments: Boolean(permission.canRemoveAttachments),
    canViewSensitiveAudit: Boolean(permission.canViewSensitiveAudit),
    canViewOperationalCenter: Boolean(permission.canViewOperationalCenter),
    canExportSupportInventory: Boolean(permission.canExportSupportInventory),
    canRestoreSharedState: Boolean(permission.canRestoreSharedState),
    permissionRole: String(permission.permissionRole || 'viewer').trim() || 'viewer',
    permissionReasonCode: String(permission.reasonCode || '').trim(),
    permissionReasonMessage: String(permission.reasonMessage || '').trim(),
    pollIntervalSeconds: 30,
    backendFolder: '_VisorSeguimientoPEC',
    backupFolder: 'backups',
    snapshotFolder: 'snapshots',
    lastBackupAt: String(latestBackup.updatedAt || ''),
    lastBackupFile: String(latestBackup.fileName || ''),
    lastBackupId: String(latestBackup.fileId || ''),
    lastSnapshotAt: String(latestSnapshot.updatedAt || ''),
    lastSnapshotFile: String(latestSnapshot.fileName || ''),
    workViewerUrl: ensureSharedVisorViewUrl_(SHARED_VISOR_CANONICAL_WEBAPP_BASE),
    publicViewerUrl: PANEL_PUBLIC_SHARED_VIEW_URL
  };
}

function buildSharedTrackingAuditEntry_(previous, next, actor, action, requestedRevision) {
  const changes = collectSharedTrackingAuditChanges_(previous, next);
  const actorMeta = buildAuditActorMeta_(actor);
  return {
    at: next.savedAt,
    actor: actorMeta.actor,
    actorEmail: actorMeta.actorEmail,
    actorSource: actorMeta.actorSource,
    actorVerified: actorMeta.actorVerified,
    declaredActor: actorMeta.declaredActor,
    action: String(action || 'guardar_estado_compartido'),
    origin: String(action || 'guardar_estado_compartido'),
    revision: Number(next.revision || 0),
    requestedRevision: Number(requestedRevision || 0),
    sourceMode: next.sourceMode || '',
    records: next.payload && Array.isArray(next.payload.records) ? next.payload.records.length : 0,
    changeCount: changes.length,
    summary: summarizeSharedTrackingAuditChanges_(changes),
    changes: changes.slice(0, 120)
  };
}

function buildSharedTrackingAttachmentAuditEntry_(actorInfo, action, recordMeta, attachments, state) {
  const actorMeta = buildAuditActorMeta_(actorInfo);
  const safeRecordMeta = recordMeta && typeof recordMeta === 'object'
    ? recordMeta
    : buildSharedTrackingAuditRecordLabelMeta_('', {}, '', false);
  const safeAttachments = normalizeSharedTrackingAttachmentList_(attachments);
  const safeState = state && typeof state === 'object' ? state : {};
  const stateNoteEntry = normalizeSharedTrackingNoteEntry_(safeState.notes && safeState.notes[safeRecordMeta.id]);
  const folderMeta = normalizeSharedTrackingAttachmentFolderMeta_(stateNoteEntry.attachmentFolder) || {};
  const attachmentNames = safeAttachments
    .map(function(item) { return String(item && item.name || '').trim(); })
    .filter(Boolean)
    .slice(0, 8);
  return {
    at: String(safeState.savedAt || new Date().toISOString()),
    actor: actorMeta.actor,
    actorEmail: actorMeta.actorEmail,
    actorSource: actorMeta.actorSource,
    actorVerified: actorMeta.actorVerified,
    declaredActor: actorMeta.declaredActor,
    action: String(action || 'cargar_sustento'),
    actionLabel: humanizeAuditAction_(action),
    origin: String(action || 'cargar_sustento'),
    revision: Number(safeState.revision || 0),
    requestedRevision: Number(safeState.revision || 0),
    sourceMode: String(safeState.sourceMode || 'embedded'),
    records: safeState.payload && Array.isArray(safeState.payload.records) ? safeState.payload.records.length : 0,
    changeCount: safeAttachments.length,
    detail: [
      'Registro: ' + (safeRecordMeta.label || safeRecordMeta.id || 'Sin registro'),
      attachmentNames.length
        ? ((action === 'retirar_sustento' ? 'Sustento(s) retirado(s)' : 'Sustento(s) cargado(s)') + ': ' + attachmentNames.join(', '))
        : '',
      folderMeta.folderName ? 'Carpeta: ' + folderMeta.folderName : '',
      actorMeta.actorEmail ? 'Correo verificado: ' + actorMeta.actorEmail : ''
    ].filter(Boolean).join(' | '),
    message: safeAttachments.length
      ? (safeAttachments.length === 1
          ? 'Se procesó 1 sustento para ' + (safeRecordMeta.label || safeRecordMeta.id || 'el registro.')
          : 'Se procesaron ' + safeAttachments.length + ' sustento(s) para ' + (safeRecordMeta.label || safeRecordMeta.id || 'el registro.'))
      : 'No se registraron sustento(s) nuevos.',
    summary: {
      total: safeAttachments.length,
      bySection: { attachments: safeAttachments.length },
      touchedRecords: safeRecordMeta.id ? [safeRecordMeta.id] : []
    },
    changes: safeAttachments.map(function(item) {
      return {
        section: 'attachments',
        id: String(safeRecordMeta.id || ''),
        field: String(action || 'cargar_sustento'),
        before: action === 'retirar_sustento' ? String(item.name || '') : '',
        after: action === 'retirar_sustento' ? '' : String(item.name || '')
      };
    }).slice(0, 40)
  };
}

function buildSharedTrackingAttachmentFolderAuditEntry_(actorInfo, recordMeta, folderMeta, state) {
  const actorMeta = buildAuditActorMeta_(actorInfo);
  const safeRecordMeta = recordMeta && typeof recordMeta === 'object'
    ? recordMeta
    : buildSharedTrackingAuditRecordLabelMeta_('', {}, '', false);
  const safeFolder = normalizeSharedTrackingAttachmentFolderMeta_(folderMeta) || {};
  const safeState = state && typeof state === 'object' ? state : {};
  return {
    at: String(safeState.savedAt || new Date().toISOString()),
    actor: actorMeta.actor,
    actorEmail: actorMeta.actorEmail,
    actorSource: actorMeta.actorSource,
    actorVerified: actorMeta.actorVerified,
    declaredActor: actorMeta.declaredActor,
    action: 'preparar_carpeta_sustento',
    actionLabel: humanizeAuditAction_('preparar_carpeta_sustento'),
    origin: 'preparar_carpeta_sustento',
    revision: Number(safeState.revision || 0),
    requestedRevision: Number(safeState.revision || 0),
    sourceMode: String(safeState.sourceMode || 'embedded'),
    records: safeState.payload && Array.isArray(safeState.payload.records) ? safeState.payload.records.length : 0,
    changeCount: 1,
    detail: [
      'Registro: ' + (safeRecordMeta.label || safeRecordMeta.id || 'Sin registro'),
      safeFolder.folderName ? 'Carpeta: ' + safeFolder.folderName : '',
      safeFolder.folderId ? 'ID carpeta: ' + safeFolder.folderId : '',
      actorMeta.actorEmail ? 'Correo verificado: ' + actorMeta.actorEmail : ''
    ].filter(Boolean).join(' | '),
    message: 'Se preparó la carpeta de sustento para ' + (safeRecordMeta.label || safeRecordMeta.id || 'el registro.'),
    summary: {
      total: 1,
      bySection: { attachmentFolder: 1 },
      touchedRecords: safeRecordMeta.id ? [safeRecordMeta.id] : []
    },
    changes: [{
      section: 'attachmentFolder',
      id: String(safeRecordMeta.id || ''),
      field: 'folderId',
      before: '',
      after: String(safeFolder.folderId || '')
    }]
  };
}

function collectSharedTrackingAuditChanges_(previous, next) {
  const out = [];
  pushAuditDiff_(out, 'state', '', 'sourceMode', previous && previous.sourceMode, next && next.sourceMode);
  collectAuditRecordDiffs_('hero', mapAuditFields_((previous && previous.hero) || {}, ['title', 'subtitle', 'meta1', 'meta2', 'meta3', 'extras']), mapAuditFields_((next && next.hero) || {}, ['title', 'subtitle', 'meta1', 'meta2', 'meta3', 'extras']), out);
  collectAuditRecordDiffs_('customPeople', mapAuditList_((previous && previous.customPeople) || []), mapAuditList_((next && next.customPeople) || []), out);
  collectAuditRecordDiffs_('customEntities', mapAuditList_((previous && previous.customEntities) || []), mapAuditList_((next && next.customEntities) || []), out);
  collectAuditRecordDiffs_('aliases', mapAuditObjectValues_((previous && previous.aliases) || {}), mapAuditObjectValues_((next && next.aliases) || {}), out);
  collectAuditRecordDiffs_('notes', mapAuditObjectValues_((previous && previous.notes) || {}), mapAuditObjectValues_((next && next.notes) || {}), out);
  collectAuditRecordDiffs_('edits', normalizeAuditRecordMap_((previous && previous.edits) || {}), normalizeAuditRecordMap_((next && next.edits) || {}), out);
  collectAuditRecordDiffs_('customRecords', normalizeAuditArrayRecordMap_((previous && previous.customRecords) || []), normalizeAuditArrayRecordMap_((next && next.customRecords) || []), out);
  collectAuditRecordDiffs_('payload', normalizeAuditPayloadRecords_(previous && previous.payload), normalizeAuditPayloadRecords_(next && next.payload), out);
  return out;
}

function summarizeSharedTrackingAuditChanges_(changes) {
  const buckets = {};
  changes.forEach(function(change) {
    buckets[change.section] = (buckets[change.section] || 0) + 1;
  });
  return {
    total: changes.length,
    bySection: buckets,
    touchedRecords: Object.keys(changes.reduce(function(acc, change) {
      if (change.id) acc[change.id] = true;
      return acc;
    }, {})).slice(0, 40)
  };
}

function collectAuditRecordDiffs_(section, beforeMap, afterMap, out) {
  const keys = {};
  Object.keys(beforeMap || {}).forEach(function(key) { keys[key] = true; });
  Object.keys(afterMap || {}).forEach(function(key) { keys[key] = true; });
  Object.keys(keys).forEach(function(key) {
    const beforeRecord = beforeMap && beforeMap[key] ? beforeMap[key] : {};
    const afterRecord = afterMap && afterMap[key] ? afterMap[key] : {};
    const fields = {};
    Object.keys(beforeRecord).forEach(function(field) { fields[field] = true; });
    Object.keys(afterRecord).forEach(function(field) { fields[field] = true; });
    Object.keys(fields).forEach(function(field) {
      pushAuditDiff_(out, section, key, field, beforeRecord[field], afterRecord[field]);
    });
  });
}

function pushAuditDiff_(out, section, id, field, beforeValue, afterValue) {
  const beforeText = normalizeAuditValue_(beforeValue);
  const afterText = normalizeAuditValue_(afterValue);
  if (beforeText === afterText) return;
  out.push({
    section: section,
    id: String(id || ''),
    field: String(field || ''),
    before: beforeText,
    after: afterText
  });
}

function normalizeAuditValue_(value) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  try {
    return JSON.stringify(value);
  } catch (error) {
    return String(value);
  }
}

function mapAuditFields_(source, fields) {
  return {
    bundle: fields.reduce(function(acc, field) {
      acc[field] = source && source[field] != null ? source[field] : '';
      return acc;
    }, {})
  };
}

function mapAuditList_(values) {
  const map = {};
  (Array.isArray(values) ? values : []).forEach(function(value) {
    const text = String(value == null ? '' : value).trim();
    if (text) map[text] = { value: text };
  });
  return map;
}

function mapAuditObjectValues_(source) {
  const map = {};
  Object.keys(source || {}).forEach(function(key) {
    map[key] = { value: source[key] };
  });
  return map;
}

function normalizeAuditRecordMap_(source) {
  const map = {};
  Object.keys(source || {}).forEach(function(key) {
    const record = source[key];
    map[key] = record && typeof record === 'object' && !Array.isArray(record)
      ? record
      : { value: record };
  });
  return map;
}

function normalizeAuditArrayRecordMap_(rows) {
  const map = {};
  (Array.isArray(rows) ? rows : []).forEach(function(record, index) {
    const key = String(record && (record.id || record.edt) || ('custom_' + index));
    map[key] = record && typeof record === 'object' && !Array.isArray(record)
      ? {
          edt: record.edt || '',
          parent_edt: record.parent_edt || '',
          actividad: record.actividad || '',
          responsable: record.responsable || '',
          seguimiento_dgppcs: record.seguimiento_dgppcs || '',
          inicio: record.inicio || '',
          final: record.final || '',
          estado: record.estado || '',
          alerta: record.alerta || '',
          resumen: record.resumen || ''
        }
      : { value: record };
  });
  return map;
}

function normalizeAuditPayloadRecords_(payload) {
  const map = {};
  const records = payload && Array.isArray(payload.records) ? payload.records : [];
  records.forEach(function(record, index) {
    const key = String(record && (record.id || record.edt || record.actividad) || ('payload_' + index));
    map[key] = {
      edt: record && record.edt || '',
      parent_edt: record && record.parent_edt || '',
      nivel: record && record.nivel || '',
      grupo: record && record.grupo || '',
      actividad: record && record.actividad || '',
      responsable: record && record.responsable || '',
      seguimiento_dgppcs: record && record.seguimiento_dgppcs || '',
      inicio: record && record.inicio || '',
      final: record && record.final || '',
      estado: record && record.estado || '',
      alerta: record && record.alerta || '',
      resumen: record && record.resumen || ''
    };
  });
  return map;
}
