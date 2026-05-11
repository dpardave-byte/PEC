# PEC - Panel, Drive Loader y Visor de Seguimiento

Este repositorio contiene dos superficies funcionales principales y un backend Apps Script que hoy puede soportar ambas:

- `Panel PEC / GitHub Pages`, orientado a publicar y consumir datos desde Google Drive y Google Sheets.
- `Visor PEC`, orientado al seguimiento ejecutivo y operativo de bloques, fases, hitos, responsables, alertas, Gantt y reportes.

URL esperada:

https://dpardave-byte.github.io/PEC/

Visor publicado esperado:

https://dpardave-byte.github.io/PEC/visor_seguimiento_pec.html

Si necesitas forzar recarga por caché, usa:

```text
https://dpardave-byte.github.io/PEC/visor_seguimiento_pec.html?v=<commit>
```

## Mapa del proyecto

- `Panel PEC - Drive + Google Sheets`
  - URL: <https://dpardave-byte.github.io/PEC/>
  - uso: consumir una fuente publicada en CSV o JSON desde Google Sheets o Apps Script.
- `Visor PEC`
  - URL: <https://dpardave-byte.github.io/PEC/visor_seguimiento_pec.html>
  - uso: seguimiento ejecutivo y operativo del portafolio, con modo local y modo compartido.
- `PEC Drive Loader / Apps Script`
  - uso: crear estructura Drive + Sheet, escanear Drive, publicar `?format=json` o `?format=csv` y, si se desea, exponer tambien el visor compartido con `?view=visor`.

Nota operativa: hoy el mismo Apps Script puede exponer tanto el `PEC Drive Loader` como el `Visor PEC Compartido`. Aunque conviven en un mismo despliegue, deben tratarse como superficies distintas.

## Panel PEC - GitHub Pages

El panel publico se aloja en GitHub Pages y espera una fuente viva publicada desde Google Sheets o Apps Script.

## Estructura recomendada en Drive

Crear la carpeta raiz `PEC - Programa Economia Circular` con estas subcarpetas:

- `00_Donacion_Preparatoria`
- `01_Efectividad_Prestamo`
- `02_Puno`
- `03_Lima`
- `04_Comparacion_Tecnologias`
- `05_Evidencias`

## Indice maestro en Google Sheets

Crear un spreadsheet llamado `PEC_indice_maestro` usando la plantilla `PEC_indice_maestro_plantilla.csv`.

Dentro de ese archivo, la pestaña operativa esperada por el loader es `indice`.

Columnas esperadas:

```csv
id,edt,actividad,macro_actividad,territorio,categoria,responsable,inicio,final,duracion,estado,alerta,tipo_documento,tecnologia,proveedor,criterio_comparacion,puntaje,url_drive,resumen,tags
```

## Publicar como CSV

1. Abrir la Sheet.
2. Ir a `Archivo > Compartir > Publicar en la web`.
3. Seleccionar la hoja del indice.
4. Elegir formato `Valores separados por comas (.csv)`.
5. Copiar la URL publicada.
6. Pegar la URL en el campo `URL publica CSV/JSON de Google Sheets o Drive` del panel.
7. Presionar `Actualizar desde URL`.

## Opcion avanzada: Apps Script

Se agrego un proyecto listo en `apps_script/` para automatizar la carga desde Drive.

1. Crear un proyecto en <https://script.google.com/> llamado `PEC Drive Loader`.
2. Copiar `apps_script/Code.gs`, `apps_script/Index.html` y `apps_script/appsscript.json`.
3. Ejecutar `setupEnvironment` y autorizar permisos.
   - `setupEnvironment` crea la estructura base.
   - Las filas semilla de ejemplo ahora son opcionales y vienen desactivadas por defecto.
   - Si quieres habilitarlas temporalmente, usar `setLoaderSeedExampleRows(true)` en el editor de Apps Script o definir `PEC_LOADER_SEED_EXAMPLE_ROWS=true` en `Script Properties`.
4. Desplegar como Web App.
5. Abrir la Web App y usar:
   - `Crear estructura Drive + Sheet`
   - `Escanear Drive y actualizar indice`
6. Copiar la URL del Web App con `?format=json` o `?format=csv`.
7. Pegar esa URL en el panel GitHub Pages.

Si se abre la Web App base sin `?view=visor` ni una accion del visor, la interfaz visible corresponde al `PEC Drive Loader`.

Para evitar enlazar por error otra carpeta o spreadsheet con el mismo nombre, el loader puede fijar en `Script Properties`:

- `PEC_LOADER_ROOT_FOLDER_ID`
- `PEC_LOADER_SPREADSHEET_ID`

Tambien puede hacerse desde el editor con `setLoaderResourceIds(rootFolderId, spreadsheetId)`.

El endpoint JSON devuelve una forma compatible con el panel:

```json
{ "updatedAt": "2026-04-12T00:00:00.000Z", "records": [] }
```

## Visor PEC local y compartido

El repositorio mantiene dos modos de uso para el visor de seguimiento:

- Local standalone:
  - abrir [visor_seguimiento_pec.html](/C:/Users/Dpard/OneDrive/Escritorio/EC/PEC_repo_limpio/visor_seguimiento_pec.html)
  - usa almacenamiento local del navegador;
  - sirve para pruebas, preparacion de estructura y trabajo individual.

- Compartido por Apps Script:
  - desplegar `apps_script/Code.gs` como Web App;
  - abrir la misma URL con `?view=visor`;
  - usa un estado centralizado JSON en Drive;
  - conserva auditoria y backup diario.

Checklist operativo detallado:

- [CHECKLIST_OPERATIVO_VISOR_PEC.md](/C:/Users/Dpard/OneDrive/Escritorio/EC/PEC_repo_limpio/CHECKLIST_OPERATIVO_VISOR_PEC.md)

### Diferencias operativas

- El modo local no ofrece seguridad centralizada; cualquier “modo admin” local es solo una ayuda operativa del navegador actual.
- El modo compartido usa el correo del usuario activo de Apps Script cuando esta disponible y permite definir administradores con `PEC_VISOR_ADMIN_EMAILS`.
- El refresco del visor compartido es periodico cada 30 segundos; no es colaboracion en tiempo real real.

### Estado compartido, auditoria y backup

En Apps Script se crea una carpeta de backend `\_VisorSeguimientoPEC` con:

- `shared_tracking_state.json`
- `shared_tracking_audit.json`
- carpeta `backups/` con `shared_tracking_backup_YYYYMMDD.json`

### Cierre diario por usuario

En el panel administrador del visor ahora existe un bloque `Cierre diario por usuario` que:

- agrupa los cambios auditados del día por usuario;
- resume movimientos, impactos y registros tocados;
- muestra el detalle reciente por actor;
- permite exportar un reporte diario en texto para remitir a DGPPCS.

En modo local:

- el actor puede declararse con `?actor=correo@dominio` para que la auditoría no quede anónima.

En Apps Script compartido:

- el actor esperado es el correo del usuario autenticado cuando Apps Script lo expone;
- el guardado compartido ya no acepta cambios anónimos; si el despliegue no expone correo de sesión, abrir con `?view=visor&actor=correo@dominio`;
- el reporte diario se construye desde la bitácora central `shared_tracking_audit.json`.

En el mismo panel administrador, el bloque `Entrega del reporte diario` permite:

- definir el modo `PREVIEW_ONLY`, `TEST_REDIRECT` o `REAL`;
- configurar destinatarios, CC, lista de pruebas y hora diaria;
- guardar la configuración sin salir del visor;
- activar o eliminar el trigger diario desde el mismo panel;
- usar `PEC_VISOR_ADMIN_EMAILS` como respaldo si no se define un destinatario explícito.

Regla operativa vigente del cierre diario:

- el envío automático debe quedar en `REAL`;
- corre de lunes a viernes;
- la hora base operativa es `18:00`;
- si el trigger diario queda desfasado, se debe reconfigurar antes del siguiente día hábil con la ruta:
  - `.../exec?action=visor_reset_daily_report_weekday_trigger`

Si el estado compartido se daña:

1. exporta una copia del estado actual;
2. revisa la auditoria;
3. compara con el ultimo backup diario;
4. restaura manualmente solo despues de validar el contenido.

### Estructura e importacion

- `Leer Excel o CSV` carga cronograma operativo.
- `Leer estructura` carga una estructura exportada por el propio visor.
- `Exportar estructura JSON/XLSX` permite mover la estructura entre visores.
- Despues de importar, el visor recalcula Gantt, KPIs, analitica, filtros, reporte y catalogos.

### Despliegue rapido de Apps Script

1. Abrir el proyecto Apps Script.
2. Actualizar `Code.gs`.
3. Crear o actualizar el HTML `Visor`.
4. Pegar el contenido de `apps_script/Visor.html`.
5. Configurar `PEC_VISOR_ADMIN_EMAILS` si corresponde.
6. Si las alertas operativas deben llegar también al grupo completo DGPPCS, mantener actualizado `PEC_VISOR_NOTIFY_EMAILS_JSON` y usar `PEC_VISOR_NOTIFY_DGPPCS_EMAILS` solo para agregar destinatarios extra del consolidado.
7. Desplegar como Web App.
8. Probar la URL `.../exec?view=visor`.
9. Validar:
   - carga inicial;
   - edición de ficha;
   - guardado compartido con actor identificado;
   - auditoría;
   - cierre diario por usuario;
   - configuración de entrega diaria desde panel admin;
   - exportación del reporte diario;
   - backup;
   - acceso admin y no admin.

## Fase 1 de consolidacion del visor

La fase 1 se enfoca en tratar el visor como sistema confiable de seguimiento, no solo como interfaz.

Nucleo que no debe romperse:

- guardado compartido de fichas;
- auditoría central;
- backup diario;
- cierre diario por usuario;
- correos operativos;
- acceso admin y no admin;
- exportación del reporte diario;
- lectura ejecutiva por bloques, fases, hitos y casos.

Entregables operativos de esta fase:

- checklist admin de apertura, validación y cierre;
- programación estable de correos y cierre diario;
- regresión mínima semanal del visor;
- productos institucionales base:
  - cierre diario por usuario;
  - reporte ejecutivo semanal;
  - matriz de pendientes por responsable y Seguimiento DGPPCS.

## Gobierno del producto y roadmap

La base institucional del Visor PEC quedó documentada en:

- [Roadmap Ejecutivo del Visor PEC](docs/ROADMAP_EJECUTIVO_VISOR_PEC.md)
- [Matriz RACI del Visor PEC](docs/RACI_VISOR_PEC.md)
- [Plan de Mejora Integral del Visor PEC](docs/PLAN_MEJORA_INTEGRAL_VISOR_PEC.md)
- [LEGEND Product Governance del Visor PEC](docs/LEGEND_PRODUCT_GOVERNANCE.md)

Estos documentos distinguen entre funcionalidad actual, brechas, recomendaciones e inferencias estratégicas. También fijan que `Wastewater Research 360` es una línea complementaria, no el núcleo actual del visor.

### Validación de acceso para DGPPCS

Si el visor se enviará por correo:

1. Abrir la URL publicada del Web App con una cuenta autorizada.
2. Confirmar si el despliegue pide Google Sign-In.
3. Si aparece Google Sign-In, validar que los destinatarios DGPPCS usarán cuentas Google autorizadas antes del envío.
4. Verificar que el panel administrador muestre:
   - actor;
   - sincronización;
   - último backup;
   - cierre diario por usuario.
5. Exportar un reporte diario de prueba antes del envío operativo.
6. Si se requiere acceso sin autenticación adicional, ajustar la configuración del Web App antes de compartir la URL final.

## Notas de seguridad

- Los documentos sensibles deben quedar protegidos por permisos de Drive.
- El panel puede mostrar metadatos y enlaces, pero Drive controla quien puede abrir cada documento.
- No subir documentos pesados al repositorio GitHub; subirlos a Drive y registrar el enlace en `url_drive`.
