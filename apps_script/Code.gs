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
  if (params.action === 'ai') {
    return outputPayload_(runAiAnalysis_(params), params);
  }
  if (params.action === 'ai_status') {
    return outputPayload_(getAiConfigStatus(), params);
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
    if (params.token !== expectedToken) {
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
      max_output_tokens: 2500,
      tools: [{ type: 'web_search' }],
      include: ['web_search_call.action.sources'],
      instructions: [
        'Eres el analista senior del Programa de Economia Circular PEC para Puno y Lima.',
        'Responde en espanol, con tono tecnico-gerencial y recomendaciones accionables.',
        'Separa claramente informacion nueva 2026 (MOP, donacion, prestamo, UGP-PEC) de informacion historica Titicaca anterior a 2020.',
        'Cuando uses informacion mundial o reciente de tecnologias, usa busqueda web y deja citas visibles.',
        'No inventes datos, costos ni fechas. Si falta evidencia, declara el supuesto o la brecha.',
        'Incluye matriz comparativa, riesgos, especialidades requeridas, decision recomendada y siguientes pasos.'
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
    '- Resumen ejecutivo.',
    '- Matriz comparativa de tecnologias o alternativas si aplica.',
    '- Riesgos y brechas de informacion.',
    '- Roles/especialidades a convocar.',
    '- Siguientes pasos con foco en donacion, prestamo y MOP 2026.',
    '- Fuentes/citas cuando se use informacion mundial.'
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
