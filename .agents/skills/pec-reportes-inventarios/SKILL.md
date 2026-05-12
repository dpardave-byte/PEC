# pec-reportes-inventarios

## Propósito

Esta skill gobierna el diseño, auditoría, mejora y validación de reportes, inventarios y productos institucionales del Visor PEC.

Su objetivo es convertir los datos operativos del visor en salidas útiles para gestión, seguimiento, control documental y toma de decisiones.

Debe usarse para diseñar, revisar o implementar:

- inventario exportable de sustentos;
- reporte por caso;
- reporte ejecutivo semanal;
- matriz de pendientes DGPPCS;
- matriz de pendientes por responsable;
- bitácora de decisiones;
- reporte de brechas documentales;
- reporte de calidad de datos;
- reporte de actividad por usuario;
- reporte de auditoría;
- exportaciones CSV, JSON, HTML o XLSX;
- productos ejecutivos para dirección.

---

## Cuándo usar esta skill

Usar esta skill cuando se requiera:

- generar inventario de sustentos;
- exportar sustentos por caso;
- exportar sustentos globales;
- crear reporte semanal ejecutivo;
- crear matriz de pendientes;
- crear reporte de brechas;
- crear bitácora de decisiones;
- resumir avances por territorio;
- generar productos institucionales desde el visor;
- diseñar reportes para DGPPCS;
- revisar consistencia de reportes;
- validar que los reportes no expongan información sensible;
- mejorar formato de reportes;
- generar salidas CSV, JSON, HTML o XLSX.

No usar esta skill para:

- cambiar permisos sin coordinar con `pec-permisos-roles-operativos`;
- cambiar metadata documental sin coordinar con `pec-sustentos-documentales`;
- cambiar concurrencia sin coordinar con `pec-concurrencia-estado-compartido`;
- rediseñar toda la UI sin coordinar con `pec-frontend-ux`;
- configurar correos/triggers salvo que el reporte dependa directamente de ellos;
- hacer commit, push o despliegue sin autorización.

---

## Contexto del proyecto

Repositorio esperado:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio

No trabajar en:

C:\Users\Dpard\Documents\Master\Liderazgo\tools\transcriptor360-studio

Archivos relevantes:

- apps_script/Code.gs
- apps_script/Visor.html
- visor_seguimiento_pec.html
- CHECKLIST_OPERATIVO_VISOR_PEC.md
- docs/AUDITORIA_PERMISOS_CARGA_SUSTENTOS_VISOR_PEC.md
- docs/MATRIZ_PERMISOS_VISOR_PEC.md
- docs/ si existe documentación adicional

Datos base relevantes:

- registros del visor;
- estado compartido;
- notas por registro;
- sustentos;
- auditoría;
- backup;
- responsables;
- territorios;
- estados;
- alertas;
- fechas;
- roles y permisos.

---

## Principios obligatorios

### 1. Reporte institucional, no solo exportación técnica

Todo reporte debe tener una finalidad clara:

- decisión ejecutiva;
- seguimiento operativo;
- control documental;
- auditoría;
- gestión de pendientes;
- trazabilidad;
- rendición de cuentas.

No generar reportes sin propósito.

---

### 2. No inventar datos

Si un campo no existe, debe mostrarse como:

- sin dato;
- no registrado;
- no verificable;
- pendiente de completar.

Nunca inventar fechas, responsables, sustentos, rutas, porcentajes ni conclusiones.

---

### 3. Separar evidencia, inferencia y recomendación

Todo reporte debe distinguir:

- dato registrado en el visor;
- evidencia documental;
- inferencia del sistema;
- recomendación operativa.

---

### 4. Respetar permisos

Los reportes sensibles deben respetar roles.

Reglas mínimas:

- auditoría sensible: admin/auditor;
- centro operativo: admin;
- inventario documental completo: admin, PMO, auditor;
- inventario parcial por caso: según permisos definidos;
- exportación pública: sin datos sensibles.

---

### 5. Reportes trazables

Todo reporte debe indicar:

- fecha de generación;
- actor que generó;
- rol del actor;
- fuente de datos;
- alcance;
- filtros aplicados;
- limitaciones.

---

## Productos institucionales prioritarios

### 1. Inventario de sustentos por caso

Debe incluir:

- recordId;
- EDT;
- actividad;
- territorio;
- responsable;
- estado del registro;
- score documental, si existe;
- fileName;
- documentType;
- status;
- fileUrl;
- folderUrl;
- logicalPath;
- uploadedAt;
- uploadedBy;
- uploadedByEmail;
- removedAt;
- removedBy;
- removedReason.

Formatos sugeridos:

- CSV;
- JSON;
- HTML;
- XLSX si existe soporte.

---

### 2. Inventario global de sustentos

Debe permitir filtrar por:

- territorio;
- responsable;
- estado;
- alerta;
- tipo documental;
- fecha de carga;
- actor;
- status active/removed;
- registros sin sustento.

---

### 3. Reporte ejecutivo semanal

Debe incluir:

- resumen de avance;
- principales hitos;
- pendientes críticos;
- registros vencidos;
- registros sin sustento;
- registros sin responsable;
- cambios relevantes de la semana;
- decisiones requeridas;
- riesgos;
- próximos pasos.

---

### 4. Matriz de pendientes DGPPCS

Debe incluir:

- registro;
- EDT;
- actividad;
- responsable;
- área;
- estado;
- alerta;
- fecha límite;
- próximo paso;
- dependencia;
- sustento asociado;
- observación DGPPCS.

---

### 5. Bitácora de decisiones

Debe incluir:

- fecha;
- decisión;
- registro o hito asociado;
- actor;
- entidad;
- sustento;
- impacto;
- seguimiento requerido.

---

### 6. Reporte de brechas documentales

Debe incluir:

- registros sin sustento;
- sustentos sin tipo documental;
- sustentos sin folderId;
- sustentos sin fileId;
- archivos retirados;
- registros sin ruta lógica;
- registros con metadata incompleta.

---

### 7. Reporte de actividad por usuario

Debe incluir:

- usuario;
- correo;
- rol;
- cambios realizados;
- registros tocados;
- cargas de sustento;
- retiros de sustento;
- acciones de auditoría;
- última actividad.

---

## Campos mínimos por reporte

Todo reporte debe definir:

- título;
- fecha de generación;
- actor generador;
- rol;
- alcance;
- filtros;
- fuente;
- total de registros;
- total de hallazgos;
- limitaciones;
- detalle;
- recomendación o próximo paso.

---

## Funciones backend a revisar

En `apps_script/Code.gs`, localizar o proponer:

- getSharedTrackingState
- getSharedTrackingAudit
- getSharedTrackingDailyAuditReport
- buildAuditDailyReportFromItems_
- buildSharedTrackingDailyAuditEmailPreview_
- buildSharedTrackingAdminExecutiveSummaryPreview_
- loadSharedTrackingState_
- loadSharedTrackingAudit_
- getRecords_
- recordsToCsv
- normalizeSharedTrackingStateBundle_
- getSharedTrackingBackendMeta_
- resolveSharedTrackingPermissionContext_

Funciones nuevas posibles:

- buildSupportInventoryReport_
- exportSupportInventoryCsv_
- exportSupportInventoryJson_
- buildWeeklyExecutiveReport_
- buildPendingMatrixReport_
- buildDocumentGapReport_
- buildDecisionLogReport_
- buildUserActivityReport_

No crear funciones nuevas sin justificar propósito, permisos y fuente de datos.

---

## Bloques frontend a revisar

En `apps_script/Visor.html` y `visor_seguimiento_pec.html`, localizar o proponer:

- panel admin;
- sección de reportes;
- botones de exportación;
- report output;
- filtros;
- drawer de caso;
- sección de sustentos;
- auditoría;
- reportes diarios;
- matriz de pendientes.

Ambos HTML deben mantenerse sincronizados.

---

## Formatos de exportación

### CSV

Usar para:

- inventario de sustentos;
- matriz de pendientes;
- brechas documentales;
- actividad por usuario.

Debe cuidar:

- separador consistente;
- encabezados claros;
- escape de comillas;
- fechas ISO o formato legible;
- no exponer campos sensibles sin permiso.

### JSON

Usar para:

- respaldo estructurado;
- auditoría;
- integración futura;
- depuración controlada.

### HTML

Usar para:

- reporte ejecutivo;
- revisión visual;
- impresión;
- correo o vista institucional.

### XLSX

Usar solo si existe soporte confiable o se implementa explícitamente.

---

## Reglas de seguridad

Antes de exponer o exportar información, verificar:

- rol del usuario;
- alcance del reporte;
- sensibilidad de URLs Drive;
- inclusión de correos;
- inclusión de auditoría;
- inclusión de archivos retirados;
- si el reporte puede compartirse fuera del equipo.

No exportar auditoría sensible a perfiles no autorizados.

No exponer fileId o folderId si no es necesario para un lector.

---

## Reglas UX

La UI debe explicar:

- qué reporte se generará;
- qué filtros se aplican;
- si contiene información sensible;
- quién puede descargarlo;
- cuándo fue generado;
- qué limitaciones tiene.

Mensajes sugeridos:

- Este inventario contiene URLs de Drive y debe compartirse solo con usuarios autorizados.
- No tienes permiso para exportar auditoría sensible.
- El reporte se generó con datos disponibles al momento de la consulta.
- Existen registros sin sustento o con metadata incompleta.
- Algunos archivos pueden requerir permisos Drive adicionales para abrirse.

---

## Priorización recomendada

### Fase inmediata

- Inventario de sustentos por caso.
- Inventario global de sustentos.
- Reporte de brechas documentales.
- Matriz de pendientes DGPPCS.

### Siguiente fase

- Reporte ejecutivo semanal.
- Bitácora de decisiones.
- Actividad por usuario.
- Reporte de completitud documental.

### Fase avanzada

- Exportación XLSX avanzada.
- Gráficos ejecutivos integrados.
- Reportes automáticos por correo.
- Comparativas históricas.
- Panel de inteligencia documental.

---

## Pruebas obligatorias

Diseñar pruebas para:

1. Admin exporta inventario global.
2. PMO exporta inventario de sustentos permitido.
3. Auditor exporta auditoría/inventario sensible.
4. Lector no puede exportar datos sensibles.
5. Actor por URL no puede exportar información restringida.
6. Reporte por caso incluye sustentos activos.
7. Reporte por caso incluye o excluye retirados según configuración.
8. Registros sin sustento aparecen en brechas.
9. URLs Drive son correctas.
10. Filtros por territorio funcionan.
11. Filtros por responsable funcionan.
12. Exportación CSV abre correctamente.
13. Exportación JSON es válida.
14. HTML es legible e imprimible.
15. No se rompe visor local.
16. Apps Script compartido respeta permisos.

---

## Validaciones técnicas

Antes de recomendar commit:

- `git diff --check`;
- ausencia de conflict markers;
- ausencia de secretos;
- ausencia de `console.log`;
- revisión de permisos;
- revisión de campos exportados;
- revisión de sensibilidad de URLs;
- sincronía entre `apps_script/Visor.html` y `visor_seguimiento_pec.html`;
- pruebas manuales por rol.

---

## Entregables obligatorios

Toda respuesta usando esta skill debe incluir:

1. Resumen ejecutivo.
2. Archivos revisados.
3. Reportes actuales detectados.
4. Brechas de reportes.
5. Inventarios propuestos.
6. Campos por reporte.
7. Permisos por reporte.
8. Riesgos de exposición.
9. Diseño recomendado.
10. Cambios backend propuestos.
11. Cambios frontend propuestos.
12. Formatos de exportación.
13. Pruebas obligatorias.
14. Rollback.
15. Decisión:
    - OK actual;
    - OK parcial;
    - requiere parche;
    - riesgo alto;
    - no verificable.
16. Prompt recomendado para la siguiente fase.

---

## Criterio de éxito

La skill cumple su propósito si:

- los reportes tienen objetivo institucional claro;
- los inventarios incluyen campos suficientes;
- las exportaciones respetan permisos;
- no se exponen URLs o auditoría indebidamente;
- se identifican brechas documentales;
- se puede generar inventario de sustentos por caso;
- se puede generar matriz de pendientes;
- se proponen reportes ejecutivos útiles;
- HTML local y Apps Script están sincronizados;
- no se rompe producción;
- no se hace commit ni push sin autorización.
