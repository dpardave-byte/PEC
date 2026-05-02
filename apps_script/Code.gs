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

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
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
  if (params.action === 'visor_audit') {
    return outputPayload_(getSharedTrackingAudit(params.limit), params);
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
      reasoning: { effort: 'low' },
      max_output_tokens: 7000,
      tools: [{ type: 'web_search' }],
      include: ['web_search_call.action.sources'],
      instructions: [
        'Eres el analista senior del Programa de Economia Circular PEC para Puno y Lima.',
        'Responde en espanol, con tono tecnico-gerencial y recomendaciones accionables.',
        'Separa claramente informacion nueva 2026 (MOP, donacion, prestamo, UGP-PEC) de informacion historica Titicaca anterior a 2020.',
        'Cuando uses informacion mundial o reciente de tecnologias, usa busqueda web y deja citas visibles.',
        'No inventes datos, costos ni fechas. Si falta evidencia, declara el supuesto o la brecha.',
        'No devuelvas solo listados de especialidades o variables: responde la pregunta con analisis tecnico por especialidad.',
        'Incluye matriz comparativa, analisis por especialidad, decision recomendada y siguientes pasos accionables.'
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
  return [
    'Objetivo del usuario:',
    request.question || 'Analizar los siguientes pasos del Programa de Economia Circular.',
    '',
    'Tipo de producto solicitado:',
    request.type || 'gerencial',
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
    'Entrega requerida:',
    '- Responde de forma directa la pregunta del usuario.',
    '- Incluye matriz comparativa de tecnologias o alternativas si aplica (CAPEX, OPEX, energia, O&M, permisos, riesgo social, plazo).',
    '- Analisis desarrollado por especialidad (no solo listado): sanitaria/PTAR, O&M, ambiental/salvaguardas, social/predial, legal/contrataciones y financiera.',
    '- Ajusta el analisis al contexto Puno/Lima y separa claramente informacion 2026 vs historico.',
    '- Cierra con recomendacion concreta, supuestos y siguientes pasos con responsables.',
    '- Incluye fuentes/citas cuando se use informacion mundial.'
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
  seedIndexIfEmpty_(sheet);
  return getEnvironmentStatus();
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
  const root = findFolderByName_(CONFIG.rootFolderName);
  const sheetFile = findSpreadsheetByName_(CONFIG.sheetName);
  const records = sheetFile ? getRecords_() : [];
  return {
    rootFolderName: CONFIG.rootFolderName,
    rootFolderUrl: root ? root.getUrl() : '',
    spreadsheetName: CONFIG.sheetName,
    spreadsheetUrl: sheetFile ? sheetFile.getUrl() : '',
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
  return findFolderByName_(CONFIG.rootFolderName) || DriveApp.createFolder(CONFIG.rootFolderName);
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
  const spreadsheet = findSpreadsheetByName_(CONFIG.sheetName) || SpreadsheetApp.create(CONFIG.sheetName);
  const sheet = spreadsheet.getSheetByName(CONFIG.indexTabName) || spreadsheet.insertSheet(CONFIG.indexTabName);
  if (sheet.getLastRow() === 0) sheet.appendRow(CONFIG.headers);
  const currentHeaders = sheet.getRange(1, 1, 1, CONFIG.headers.length).getValues()[0];
  if (currentHeaders.join('|') !== CONFIG.headers.join('|')) {
    sheet.getRange(1, 1, 1, CONFIG.headers.length).setValues([CONFIG.headers]);
  }
  return sheet;
}

function seedIndexIfEmpty_(sheet) {
  if (sheet.getLastRow() > 1) return;
  sheet.getRange(2, 1, CONFIG.seedRows.length, CONFIG.headers.length).setValues(CONFIG.seedRows);
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

function saveSharedTrackingState(bundle, actorName, action) {
  const previous = loadSharedTrackingState_();
  const requestedRevision = Number(bundle && bundle.revision || 0);
  if (requestedRevision < Number(previous.revision || 0)) {
    const conflictActor = String(actorName || getSharedTrackingActor_() || 'usuario_web').trim();
    appendSharedTrackingAudit_({
      at: new Date().toISOString(),
      actor: conflictActor,
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
      currentRevision: Number(previous.revision || 0)
    });
  }
  const next = normalizeSharedTrackingStateBundle_(bundle, previous);
  next.revision = Number(previous.revision || 0) + 1;
  next.savedAt = new Date().toISOString();
  next.savedBy = String(actorName || getSharedTrackingActor_() || 'usuario_web').trim();
  writeSharedTrackingState_(next);
  appendSharedTrackingAudit_(buildSharedTrackingAuditEntry_(previous, next, next.savedBy, action, requestedRevision));
  writeSharedTrackingBackup_(next);
  return buildSharedTrackingEnvelope_(next);
}

function getSharedTrackingAudit(limit) {
  return {
    ok: true,
    actor: getSharedTrackingActor_(),
    admin: isSharedTrackingAdmin_(),
    items: loadSharedTrackingAudit_().slice(0, Math.max(1, Number(limit || 100)))
  };
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
  if (existing.length) {
    return {
      ok: true,
      actor: getSharedTrackingActor_(),
      admin: true,
      created: false,
      mode: config.mode,
      realSendConfirmed: config.realSendConfirmed,
      triggerCount: existing.length,
      message: 'Ya existe al menos un trigger diario para runDailyDueTrackingNotifications_.'
    };
  }
  ScriptApp.newTrigger('runDailyDueTrackingNotifications_')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
  return {
    ok: true,
    actor: getSharedTrackingActor_(),
    admin: true,
    created: true,
    mode: config.mode,
    realSendConfirmed: config.realSendConfirmed,
    triggerCount: getDueTrackingNotificationTriggers_().length,
    message: 'Trigger diario creado para las 08:00.'
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
  var preview = buildDueTrackingNotifications_({ preview: false, includeHtml: true });
  if (!preview.ok) return preview;
  if (preview.mode === 'PREVIEW_ONLY') {
    return {
      ok: true,
      actor: String(options && options.actor || getSharedTrackingActor_() || 'admin_manual').trim(),
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
      actor: String(options && options.actor || getSharedTrackingActor_() || 'admin_manual').trim(),
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
      actor: String(options && options.actor || getSharedTrackingActor_() || 'admin_manual').trim(),
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
    if (preview.cc.length) mailOptions.cc = preview.cc.join(',');
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
    actor: String(options && options.actor || getSharedTrackingActor_() || 'trigger_diario').trim(),
    action: 'enviar_alertas_correo',
    origin: String(options && options.origin || 'sendDueTrackingEmails').trim(),
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
  return {
    ok: true,
    actor: auditEntry.actor,
    admin: isSharedTrackingAdmin_(),
    preview: false,
    sentAt: sentAt,
    mode: preview.mode,
    testRecipients: preview.testRecipients,
    realSendConfirmed: preview.realSendConfirmed,
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
    webappUrl: preview.webappUrl
  };
}

// Script Properties requeridas para notificaciones:
// - PEC_VISOR_NOTIFY_EMAILS_JSON: {"Darwin Pardave":"correo@dominio", ...}
// - PEC_VISOR_NOTIFY_CC: correos separados por coma o punto y coma
// - PEC_VISOR_NOTIFY_MODE: PREVIEW_ONLY | TEST_REDIRECT | REAL
// - PEC_VISOR_NOTIFY_TEST_RECIPIENTS: correos de prueba separados por coma o punto y coma
// - PEC_VISOR_CONFIRM_REAL_SEND: SI para habilitar envios reales
// - PEC_VISOR_WEBAPP_URL: URL publica del visor compartido
function buildDueTrackingNotifications_(options) {
  var settings = options || {};
  var config = getTrackingNotificationConfig_();
  var state = loadSharedTrackingState_();
  var records = getEffectiveTrackingRecordsForNotifications_(state);
  var emailMap = getTrackingNotificationEmailMap_();
  var cc = getTrackingNotificationCcList_();
  var webappUrl = getTrackingWebAppUrl_();
  var generatedAtDate = new Date();
  var generatedAt = generatedAtDate.toISOString();
  var generatedAtLabel = formatTrackingDateTime_(generatedAtDate);
  var grouped = new Map();
  var missing = new Map();
  var unassigned = [];
  records.forEach(function(record) {
    var alertInfo = classifyDueTrackingAlert_(record);
    if (!alertInfo.include) return;
    var people = splitTrackingPeople_(record.seguimiento_dgppcs);
    var item = buildDueTrackingNotificationItem_(record, alertInfo, webappUrl);
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
    totalActivities: groups.reduce(function(sum, group) { return sum + group.items.length; }, 0),
    groups: groups,
    missingEmails: Array.from(missing.values()).sort(function(a, b) { return a.person.localeCompare(b.person, 'es'); }),
    unassignedActivities: unassigned.sort(compareDueTrackingItems_),
    cc: cc,
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

function buildDueTrackingEmailHtml_(person, items, generatedAt, webappUrl, config) {
  var rows = items.map(function(item) {
    var alertStyle = item.alertaCodigo === 'vencido' || item.alertaCodigo === 'critico'
      ? 'color:#8f1d1d;font-weight:600;'
      : item.alertaCodigo === 'atencion'
        ? 'color:#8a5a00;font-weight:600;'
        : 'color:#24415f;';
    return '<tr>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;">' + escapeHtmlEmail_(item.edt || '-') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;">' + escapeHtmlEmail_(item.actividad || '-') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;">' + escapeHtmlEmail_(item.responsable || '-') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;">' + escapeHtmlEmail_(item.final || '-') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;">' + escapeHtmlEmail_(item.estado || '-') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;' + alertStyle + '">' + escapeHtmlEmail_(item.alerta || '-') + '</td>' +
      '<td style="padding:6px 8px;border:1px solid #d7e2ef;">' + escapeHtmlEmail_(item.resumen || '-') + '</td>' +
    '</tr>';
  }).join('');
  var introNotice = config && config.mode === 'TEST_REDIRECT'
    ? '<p style="margin:0 0 14px;padding:10px 12px;border:1px solid #e7d8a7;background:#fff7df;color:#6a4a00;border-radius:8px;"><strong>Correo de prueba.</strong> No enviado al responsable final.</p>'
    : '';
  return [
    '<div style="font-family:Arial,sans-serif;color:#16324f;line-height:1.5;max-width:980px;">',
    '<h2 style="margin:0 0 10px;font-size:20px;">Visor de Seguimiento PEC</h2>',
    '<p style="margin:0 0 14px;">Estimado/a <strong>' + escapeHtmlEmail_(person) + '</strong>:</p>',
    '<p style="margin:0 0 12px;">Se remite el resumen de actividades bajo su seguimiento que registran vencimiento, atraso o atención prioritaria en el Visor PEC.</p>',
    '<p style="margin:0 0 16px;">Agradeceremos revisar el estado y actualizar el seguimiento correspondiente en el visor compartido.</p>',
    introNotice,
    '<p style="margin:0 0 12px;color:#4d6379;font-size:12px;">Fecha de generación: ' + escapeHtmlEmail_(generatedAt) + '</p>',
    '<table style="border-collapse:collapse;width:100%;font-size:13px;background:#ffffff;">',
    '<thead><tr style="background:#edf4fb;color:#16324f;">',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">EDT</th>',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">Actividad</th>',
    '<th style="padding:6px 8px;border:1px solid #d7e2ef;text-align:left;">Responsable</th>',
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

function buildDueTrackingEmailPlainText_(person, items, generatedAt, webappUrl, config) {
  return [
    'Visor de Seguimiento PEC',
    'Estimado/a ' + person + ':',
    '',
    'Se remite el resumen de actividades bajo su seguimiento que registran vencimiento, atraso o atención prioritaria en el Visor PEC.',
    'Agradeceremos revisar el estado y actualizar el seguimiento correspondiente en el visor compartido.',
    config && config.mode === 'TEST_REDIRECT' ? 'Correo de prueba. No enviado al responsable final.' : '',
    'Fecha de generación: ' + generatedAt,
    '',
    items.map(function(item) {
      return [
        item.edt || '-',
        item.actividad || '-',
        'Responsable: ' + (item.responsable || '-'),
        'Fecha final: ' + (item.final || '-'),
        'Estado: ' + (item.estado || '-'),
        'Alerta: ' + (item.alerta || '-'),
        'Resumen: ' + (item.resumen || '-')
      ].join(' | ');
    }).join('\n'),
    '',
    'Abrir visor compartido: ' + webappUrl,
    '',
    'Este mensaje fue generado automáticamente por el Visor de Seguimiento PEC.'
  ].filter(Boolean).join('\n');
}

function getTrackingNotificationEmailMap_() {
  var raw = String(PropertiesService.getScriptProperties().getProperty('PEC_VISOR_NOTIFY_EMAILS_JSON') || '').trim();
  if (!raw) return {};
  try {
    var parsed = JSON.parse(raw);
    var out = {};
    Object.keys(parsed || {}).forEach(function(name) {
      var email = String(parsed[name] == null ? '' : parsed[name]).trim();
      if (!email) return;
      out[normalizeNotificationKey_(name)] = email;
    });
    return out;
  } catch (error) {
    return {};
  }
}

function getTrackingNotificationCcList_() {
  return String(PropertiesService.getScriptProperties().getProperty('PEC_VISOR_NOTIFY_CC') || '')
    .split(/[;,]/)
    .map(function(item) { return item.trim(); })
    .filter(Boolean);
}

function buildDueTrackingNotificationSubject_(person, itemCount, config) {
  var prefix = config && config.mode === 'TEST_REDIRECT' ? '[PRUEBA PEC] ' : '';
  return prefix + 'PEC | Seguimiento DGPPCS | ' + person + ' | ' + itemCount + ' alerta(s)';
}

function resolveTrackingNotificationRecipients_(config, realEmail) {
  var safeConfig = config || getTrackingNotificationConfig_();
  if (safeConfig.mode === 'TEST_REDIRECT') return safeConfig.testRecipients.slice();
  var trimmed = String(realEmail || '').trim();
  return trimmed ? [trimmed] : [];
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

function getTrackingWebAppUrl_() {
  return String(PropertiesService.getScriptProperties().getProperty('PEC_VISOR_WEBAPP_URL') || '').trim() ||
    'https://script.google.com/macros/s/AKfycbxLpfDE3-ttlXKlGgKto16_2RuLk5w1Kbpclf_BFtMQBdfUQZrZQomANDaZzIaeR2Yq/exec?view=visor';
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
  const meta = getSharedTrackingBackendMeta_();
  const payload = {
    ok: true,
    mode: 'apps_script',
    actor: meta.actor,
    admin: meta.admin,
    savedAt: safeState.savedAt || '',
    revision: Number(safeState.revision || 0),
    state: safeState,
    backend: meta
  };
  return Object.assign(payload, extra || {});
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
    notes: normalizeObjectMap_(data.notes || base.notes || {}),
    edits: normalizeObjectMap_(data.edits || base.edits || {}),
    customRecords: Array.isArray(data.customRecords) ? data.customRecords : (Array.isArray(base.customRecords) ? base.customRecords : []),
    payload: normalizeSharedPayload_(data.payload || base.payload || null)
  };
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

function isSharedTrackingAdmin_() {
  const actor = String(getSharedTrackingActor_() || '').toLowerCase();
  if (!actor) return false;
  const configured = String(PropertiesService.getScriptProperties().getProperty('PEC_VISOR_ADMIN_EMAILS') || '')
    .split(/[;,]/)
    .map(function(item) { return item.trim().toLowerCase(); })
    .filter(Boolean);
  return configured.indexOf(actor) >= 0;
}

function getSharedTrackingBackendMeta_() {
  const latestBackup = getLatestSharedTrackingBackupMeta_() || {};
  return {
    mode: 'apps_script',
    storage: 'drive_json',
    actor: getSharedTrackingActor_(),
    admin: isSharedTrackingAdmin_(),
    pollIntervalSeconds: 30,
    backendFolder: '_VisorSeguimientoPEC',
    backupFolder: 'backups',
    lastBackupAt: String(latestBackup.updatedAt || ''),
    lastBackupFile: String(latestBackup.fileName || ''),
    lastBackupId: String(latestBackup.fileId || '')
  };
}

function buildSharedTrackingAuditEntry_(previous, next, actor, action, requestedRevision) {
  const changes = collectSharedTrackingAuditChanges_(previous, next);
  return {
    at: next.savedAt,
    actor: actor,
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
