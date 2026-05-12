# pec-sustentos-documentales

## Propósito

Esta skill gobierna el diseño, auditoría, mejora y validación del módulo de sustentos documentales del Visor PEC.

Debe usarse para asegurar que cada archivo cargado quede asociado a un registro, actividad, hito o caso, con trazabilidad, ubicación Drive recuperable, metadata persistente, historial de carga/retiro, carpeta por registro, inventario documental y visualización clara dentro del visor.

## Cuándo usar esta skill

Usar cuando se requiera:

- mejorar carga de sustentos;
- mostrar dónde se almacenan archivos cargados;
- guardar `fileId`, `folderId`, URL y ruta lógica;
- crear o validar carpeta por registro;
- retirar o desvincular archivos;
- auditar carga/retiro;
- mostrar sustentos dentro de la ficha o drawer del caso;
- exportar inventario de sustentos;
- revisar consistencia entre Drive y `shared_tracking_state.json`;
- corregir pérdida de metadata documental;
- clasificar sustentos por tipo documental.

No usar para:

- rediseñar todo el visor;
- conceder admin;
- cambiar reglas generales de roles sin coordinar con `pec-permisos-roles-operativos`;
- resolver concurrencia sin coordinar con `pec-concurrencia-estado-compartido`;
- modificar triggers, correos o backups salvo relación directa con sustentos;
- hacer commit, push o despliegue sin autorización.

## Contexto del proyecto

Repositorio esperado:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio

No trabajar en:

C:\Users\Dpard\Documents\Master\Liderazgo\tools\transcriptor360-studio

Archivos relevantes:

- apps_script/Code.gs
- apps_script/Visor.html
- visor_seguimiento_pec.html
- docs/AUDITORIA_PERMISOS_CARGA_SUSTENTOS_VISOR_PEC.md
- docs/MATRIZ_PERMISOS_VISOR_PEC.md
- CHECKLIST_OPERATIVO_VISOR_PEC.md

## Reglas duras

- `?actor=` no concede permisos.
- La carga documental requiere correo verificado y rol autorizado.
- Guardar siempre `fileId`, `folderId`, `fileUrl`, `folderUrl` y ruta lógica visible.
- No depender solo de una ruta textual de Drive.
- Toda carga, retiro o error debe quedar auditado.
- No perder metadata por concurrencia.
- Si se toca `apps_script/Visor.html`, replicar en `visor_seguimiento_pec.html`.
- No hacer commit ni push sin autorización.

## Metadata mínima por sustento

Cada sustento debe registrar, como mínimo:

- id único del sustento;
- recordId / id / EDT;
- actividad o hito asociado;
- fileName;
- fileId;
- fileUrl;
- folderId;
- folderUrl;
- logicalPath;
- mimeType;
- sizeBytes, si está disponible;
- documentType;
- uploadedAt;
- uploadedBy;
- uploadedByEmail;
- actorSource;
- actorVerified;
- status: active / removed;
- removedAt;
- removedBy;
- removedReason.

Si un dato no está disponible, debe quedar como vacío, `null` o `unknown`; nunca inventado.

## Modelo recomendado de carpeta por registro

Modelo lógico recomendado:

PEC - Programa Economía Circular / _VisorSeguimientoPEC / attachments / <recordId> - <nombre corto actividad>

Cada carpeta por registro debe guardar:

- recordId;
- folderId;
- folderUrl;
- logicalPath;
- createdAt;
- createdBy;
- createdByEmail.

La creación debe ser idempotente:

- si existe, reutilizar;
- si no existe, crear;
- si hay duplicados, advertir;
- si falla, reportar brecha.

## Funciones backend a revisar

En `apps_script/Code.gs`, localizar o proponer:

- uploadSharedTrackingAttachments
- ensureSharedTrackingAttachmentFolder
- deleteSharedTrackingAttachment
- getSharedTrackingState
- saveSharedTrackingState
- appendSharedTrackingAudit_
- resolveSharedTrackingPermissionContext_
- getSharedTrackingActor_
- resolveSharedTrackingActorInfo_
- buildAuditActorMeta_

## Bloques frontend a revisar

En `apps_script/Visor.html` y `visor_seguimiento_pec.html`, localizar o proponer:

- sección de sustentos;
- input de archivos;
- botón de carga;
- botón de retiro;
- botón abrir archivo;
- botón abrir carpeta;
- ruta lógica visible;
- lista de sustentos;
- estado de permisos del usuario;
- mensajes de bloqueo.

## UX obligatoria

La ficha del caso debe mostrar, cuando exista:

- carpeta del registro;
- ruta lógica;
- botón abrir carpeta Drive;
- lista de archivos;
- nombre del archivo;
- tipo documental;
- fecha de carga;
- actor/correo;
- estado active/removed;
- acción de retiro si el usuario tiene permiso.

Mensajes recomendados:

- No puedes cargar sustento porque no hay correo verificado de Apps Script.
- Estás identificado solo como actor declarado por URL; eso no habilita carga documental.
- Tu correo no está autorizado como operador documental, responsable PMO o administrador.
- El modo local no ejecuta carga real en Drive.
- No se pudo verificar o crear la carpeta de sustento en Drive.
- El retiro de sustento será auditado. Indica un motivo antes de retirar el archivo.

## Inventario de sustentos

Debe diseñarse o validarse un inventario exportable con:

- recordId;
- edt;
- actividad;
- territorio;
- responsable;
- fileName;
- documentType;
- fileUrl;
- folderUrl;
- logicalPath;
- status;
- uploadedAt;
- uploadedBy;
- uploadedByEmail;
- removedAt;
- removedBy;
- removedReason.

Formatos recomendados:

- CSV;
- XLSX;
- JSON;
- reporte ejecutivo HTML/texto.

## Riesgos documentales

Crítico:

- carga anónima;
- retiro sin auditoría;
- pérdida de metadata por concurrencia;
- carga o retiro permitido solo por `?actor=`;
- referencias Drive huérfanas;
- archivos sensibles visibles sin política.

Alto:

- usuario operativo autorizado no puede cargar;
- no se guarda `fileId`;
- no se guarda `folderId`;
- no hay carpeta por registro;
- no hay inventario exportable;
- no hay clasificación documental mínima.

Medio:

- no se muestra ruta lógica;
- no se muestra actor/correo;
- no hay motivo de retiro;
- no hay señal de “sin sustento”.

Bajo:

- textos confusos;
- botones poco claros;
- falta ayuda contextual.

## Flujo obligatorio

1. Confirmar repo con `git status`.
2. Localizar funciones de sustento en backend.
3. Localizar bloques de sustento en frontend.
4. Mapear flujo actual:
   - dónde se carga;
   - dónde se guarda;
   - qué metadata se persiste;
   - cómo se muestra;
   - cómo se retira;
   - cómo se audita.
5. Evaluar permisos.
6. Evaluar concurrencia.
7. Proponer diseño mínimo.
8. Diseñar pruebas.
9. No aplicar cambios sin autorización.

## Pruebas obligatorias

Diseñar pruebas para:

- carga simple;
- carga múltiple;
- creación de carpeta;
- carga con actor URL no verificado;
- carga con correo verificado sin rol;
- carga con operador documental;
- carga con responsable PMO;
- carga con admin;
- retiro permitido;
- retiro bloqueado;
- retiro con motivo;
- carga simultánea;
- carga fallida;
- Drive sin permiso;
- visualización de ruta;
- inventario de sustentos.

## Formato final obligatorio

Responder con:

1. Resumen ejecutivo.
2. Archivos revisados.
3. Flujo actual de sustentos.
4. Metadata actual detectada.
5. Carpeta por registro.
6. Rutas Drive y ruta lógica.
7. Permisos actuales.
8. Auditoría actual.
9. Riesgos y brechas.
10. Diseño recomendado.
11. Cambios backend propuestos.
12. Cambios frontend propuestos.
13. Inventario de sustentos.
14. Pruebas obligatorias.
15. Rollback.
16. Decisión:
    - OK actual;
    - OK parcial;
    - requiere parche;
    - riesgo alto;
    - no verificable.
17. Prompt recomendado para la siguiente fase.

## Criterio de éxito

La skill cumple su propósito si:

- todo archivo tiene metadata suficiente;
- se guarda `fileId`;
- se guarda `folderId`;
- se muestra carpeta o ruta lógica en el visor;
- la carga queda auditada;
- el retiro queda auditado;
- no se permite carga sensible solo por `?actor`;
- no se pierde metadata por concurrencia;
- se propone inventario de sustentos;
- se mantiene sincronía entre HTML local y Apps Script;
- no se rompe producción;
- no se hace commit ni push sin autorización.
