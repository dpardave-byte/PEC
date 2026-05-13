# pec-integridad-drive-sustentos

## Propósito

Esta skill gobierna la reconciliación entre lo que el Visor PEC registra sobre sustentos documentales y lo que realmente existe en Google Drive. Su objetivo es detectar divergencias entre metadata, archivos físicos, carpetas por registro, estado compartido y evidencia visible para el usuario, con énfasis en integridad, trazabilidad, recuperación operativa y saneamiento controlado.

No se limita a decir si un archivo “está o no está”; debe identificar inconsistencias por tipo, estimar impacto institucional, proponer inventario de hallazgos y priorizar acciones correctivas seguras. El foco es que el visor no afirme que hay un sustento activo cuando el archivo falta, ni pierda la referencia a un archivo válido que sí existe en Drive.

## Cuándo usar esta skill

Usar cuando se requiera:

- reconciliar Drive con `shared_tracking_state.json` o estado compartido equivalente;
- investigar archivos en Drive sin metadata asociada;
- investigar metadata documental cuyo `fileId` o `folderId` ya no existe;
- revisar carpetas duplicadas por registro;
- revisar registros sin carpeta de sustentos;
- revisar archivos retirados que siguen visibles o archivos visibles que ya no deben estar activos;
- construir inventario de inconsistencias y plan de saneamiento;
- auditar permisos Drive en relación con rol y visibilidad en el visor;
- diseñar controles operativos para evitar deriva documental futura.

## Cuándo no usar esta skill

No usar para:

- redefinir el modelo de permisos por rol;
- rediseño visual general del drawer o dashboard sin foco documental;
- publicación Apps Script como tarea principal;
- mover o borrar archivos de Drive sin una estrategia aprobada de saneamiento;
- corregir catálogos no documentales sin coordinar con la skill de calidad de datos.

## Contexto del proyecto

Repositorio esperado:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio

No trabajar en:

C:\Users\Dpard\Documents\Master\Liderazgo\tools\transcriptor360-studio

La arquitectura relevante combina Apps Script, estado compartido, Drive, inventario documental y visualización dentro del visor. Por eso cualquier evaluación de integridad debe considerar backend, UI, rutas lógicas, carpeta por registro, auditoría y exportaciones.

## Archivos relevantes

- apps_script/Code.gs
- apps_script/Visor.html
- visor_seguimiento_pec.html
- docs/AUDITORIA_PERMISOS_CARGA_SUSTENTOS_VISOR_PEC.md
- docs/MATRIZ_PERMISOS_VISOR_PEC.md
- CHECKLIST_OPERATIVO_VISOR_PEC.md
- cualquier referencia a `shared_tracking_state.json` o estructuras equivalentes documentadas en el backend

## Relación con legend-pec-orchestrator-v2.2

`legend-pec-orchestrator-v2.2` define el marco general de implementación y control. Esta skill aporta el análisis especializado sobre integridad Drive-documental dentro de ese marco. No autoriza saneamientos destructivos; solo clasifica inconsistencias, sugiere reconciliaciones y ayuda a priorizar parches o procesos.

Si se detecta conflicto con `pec-orquestador`, prevalece LEGEND. Las conclusiones de esta skill deben coordinarse con sustentos documentales, concurrencia, QA y supervisor de calidad.

## Skills relacionadas

- pec-sustentos-documentales
- pec-concurrencia-estado-compartido
- pec-reportes-inventarios
- pec-permisos-roles-operativos
- pec-qa-regresion
- pec-supervisor-calidad

## Reglas duras

- No borrar archivos de Drive durante la auditoría salvo autorización explícita y plan de rollback.
- No modificar `folderId`, `fileId` ni metadata productiva sin evidencias suficientes.
- No confiar solo en nombres de archivos; la referencia fuerte debe incluir `fileId` y estado.
- No considerar “retirado” como eliminado si la evidencia histórica debe conservarse.
- No ocultar duplicados por conveniencia operativa; deben quedar inventariados.
- Si se revisan vistas HTML, validar espejo con el frontend local.
- No hacer deploy, no enviar correos y no tocar triggers dentro de esta skill.

## Tipos de inconsistencia que debe cubrir

1. Archivo en Drive sin metadata visible en el visor.
2. Metadata con `fileId` inexistente o inaccesible.
3. `folderId` inválido o carpeta no recuperable.
4. Múltiples carpetas asociadas al mismo registro.
5. Registro con metadata documental pero sin carpeta padre coherente.
6. Archivo retirado que sigue apareciendo como activo.
7. Archivo activo cuyo recurso físico ya no existe.
8. Ruta lógica distinta de la realidad documental.
9. Permisos Drive incompatibles con el rol que ve la UI.
10. Inventario exportado que omite inconsistencias críticas.

## Flujo obligatorio

1. Confirmar repositorio y fuentes documentales.
2. Localizar estructuras de metadata de sustentos y carpeta por registro.
3. Mapear cómo el backend crea, reutiliza y retira carpetas o archivos.
4. Definir la unidad de reconciliación: registro, carpeta, archivo, estado, actor y fecha.
5. Clasificar inconsistencias por tipo e impacto.
6. Separar brechas de integridad lógica, física y de permisos.
7. Diseñar inventario de hallazgos con prioridad de saneamiento.
8. Proponer acciones seguras: reindexar, recalcular, corregir metadata, marcar huérfanos o consolidar duplicados.
9. Diseñar controles preventivos para evitar que reaparezcan las inconsistencias.
10. Preparar plan de rollback y validación posterior.

## Riesgos críticos

- un archivo marcado activo no existe realmente en Drive;
- un archivo sensible sigue accesible por URL tras quedar retirado;
- hay carpetas duplicadas y el visor opera sobre una distinta a la esperada;
- se pierde trazabilidad entre actor, archivo y acción documental;
- se reutiliza un `folderId` incorrecto entre registros distintos;
- el inventario institucional refleja una imagen falsa del repositorio documental;
- la reconciliación propuesta puede destruir evidencia si no se aplica con respaldo.

Riesgo alto:

- varios registros carecen de carpeta y no hay política clara de creación;
- archivos válidos existen en Drive pero no en metadata, generando subregistro;
- `logicalPath` está vacío o ya no representa la estructura vigente;
- hay permisos Drive inconsistentes que exponen archivos a más perfiles de los que el visor muestra.

## Validaciones técnicas

- localizar campos `fileId`, `folderId`, `fileUrl`, `folderUrl`, `logicalPath`, `status`, `removedAt`, `removedBy`, `removedReason`;
- revisar flujos `upload`, `ensure folder`, `delete/remove` y lectura del estado compartido;
- confirmar si la UI distingue archivo activo, retirado, faltante y carpeta ausente;
- validar que los exports documenten inconsistencias y no las oculten;
- revisar sincronía entre frontend Apps Script y frontend local;
- preparar checklist manual para comparar una muestra real de registros con Drive.

## Entregables obligatorios

1. Resumen ejecutivo.
2. Modelo de reconciliación usado.
3. Inventario de inconsistencias.
4. Clasificación por severidad.
5. Riesgos de integridad y de permisos Drive.
6. Casos que requieren saneamiento manual.
7. Casos que requieren parche de backend o UI.
8. Controles preventivos recomendados.
9. Validaciones posteriores sugeridas.
10. Rollback o plan de contención.

## Criterio de éxito

La skill cumple su propósito si:

- distingue con claridad lo que existe en Drive y lo que solo existe en metadata;
- detecta duplicados, huérfanos y referencias inválidas;
- prioriza saneamientos sin destruir evidencia;
- deja un inventario accionable y reutilizable para operación institucional;
- coordina bien con sustentos documentales, inventarios y control de concurrencia.
