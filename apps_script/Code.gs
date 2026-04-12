const CONFIG = {
  rootFolderName: 'PEC - Programa Economia Circular',
  sheetName: 'PEC_indice_maestro',
  indexTabName: 'indice',
  maxFilesPerScan: 1500,
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
  if (params.format === 'csv') {
    return ContentService
      .createTextOutput(recordsToCsv(getRecords_()))
      .setMimeType(ContentService.MimeType.CSV);
  }
  if (params.format === 'json') {
    return ContentService
      .createTextOutput(JSON.stringify({ updatedAt: new Date().toISOString(), records: getRecords_() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return HtmlService
    .createHtmlOutputFromFile('Index')
    .setTitle('PEC Drive Loader')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
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
