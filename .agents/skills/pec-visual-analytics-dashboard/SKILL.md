# pec-visual-analytics-dashboard

## Propósito

Esta skill gobierna el diseño, auditoría, mejora y validación de la capa visual, analítica y ejecutiva del Visor PEC.

Su objetivo es convertir el visor en una plataforma institucional de seguimiento con gráficos, cards KPI, distribución clara de la maqueta, score visual, lectura por territorio, actividad por usuario, alertas y análisis documental.

Debe usarse para diseñar, revisar o implementar:

- gráficos ejecutivos;
- cards KPI;
- dashboard institucional;
- distribución de la maqueta;
- score visual;
- avance por estado;
- sustentos por tipo;
- registros sin sustento;
- actividad por usuario;
- riesgos por territorio;
- brechas documentales;
- indicadores operativos;
- vistas diferenciadas por rol;
- lectura ejecutiva para dirección;
- lectura operativa para PMO;
- lectura documental para operadores y auditoría.

---

## Cuándo usar esta skill

Usar esta skill cuando se requiera:

- rediseñar o mejorar el dashboard principal;
- agregar gráficos;
- agregar cards KPI;
- mejorar la maqueta del visor;
- proponer layout ejecutivo;
- ordenar la vista por secciones;
- diseñar visualización por rol;
- mostrar score documental;
- mostrar avance por estado;
- mostrar sustentos por tipo documental;
- mostrar registros sin sustento;
- mostrar actividad por usuario;
- mostrar riesgos por territorio;
- diseñar semáforos visuales;
- diseñar panel de brechas;
- diseñar panel de reportes;
- validar que la UI no se sobrecargue;
- mejorar la lectura ejecutiva sin romper operación.

No usar esta skill para:

- modificar permisos sin coordinar con `pec-permisos-roles-operativos`;
- modificar sustentos sin coordinar con `pec-sustentos-documentales`;
- modificar concurrencia sin coordinar con `pec-concurrencia-estado-compartido`;
- crear reportes exportables sin coordinar con `pec-reportes-inventarios`;
- modificar triggers, correos o backups;
- hacer commit, push o despliegue sin autorización.

---

## Contexto del proyecto

Repositorio esperado:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio

No trabajar en:

C:\Users\Dpard\Documents\Master\Liderazgo\tools\transcriptor360-studio

Archivos principales:

- apps_script/Code.gs
- apps_script/Visor.html
- visor_seguimiento_pec.html
- CHECKLIST_OPERATIVO_VISOR_PEC.md
- docs/AUDITORIA_PERMISOS_CARGA_SUSTENTOS_VISOR_PEC.md
- docs/MATRIZ_PERMISOS_VISOR_PEC.md

Skills relacionadas:

- legend-pec-orchestrator-v2.2
- pec-sustentos-documentales
- pec-permisos-roles-operativos
- pec-concurrencia-estado-compartido
- pec-reportes-inventarios
- pec-frontend-ux
- pec-qa-regresion
- pec-supervisor-calidad

---

## Principios obligatorios

### 1. Visualizar para decidir

Cada gráfico o card debe responder una pregunta de gestión.

Ejemplos:

- ¿Qué está vencido?
- ¿Qué no tiene sustento?
- ¿Qué territorio concentra más riesgos?
- ¿Qué responsable tiene más pendientes?
- ¿Qué registros requieren decisión?
- ¿Qué sustentos están incompletos?
- ¿Qué usuarios actualizaron el visor hoy?

No agregar gráficos decorativos sin utilidad operativa.

---

### 2. Separar vista ejecutiva, operativa y documental

El visor debe distinguir tres niveles:

#### Vista ejecutiva

Para dirección y toma de decisiones:

- avance general;
- riesgos críticos;
- brechas principales;
- próximos hitos;
- decisiones requeridas;
- estado de Puno y Lima.

#### Vista operativa

Para PMO y seguimiento diario:

- responsables;
- fechas;
- alertas;
- estado;
- próximo paso;
- cambios recientes;
- pendientes por usuario.

#### Vista documental

Para operadores documentales y auditoría:

- sustentos;
- carpetas Drive;
- metadata;
- score documental;
- registros sin sustento;
- inventario documental.

---

### 3. Mantener compatibilidad con el visor actual

No rediseñar toda la aplicación de golpe.

Priorizar mejoras incrementales:

- nuevas cards;
- nuevos bloques visuales;
- nuevos indicadores;
- mejoras del drawer;
- gráficos simples;
- mejor jerarquía visual.

No romper:

- tabla operativa;
- Gantt;
- drawer de caso;
- panel admin;
- carga de sustentos;
- auditoría;
- filtros;
- modo local;
- Apps Script compartido.

---

### 4. Respetar permisos por rol

La visualización debe respetar permisos:

- lector: vista general sin datos sensibles;
- operador documental: vista documental útil;
- PMO: vista operativa y documental;
- admin: centro operativo completo;
- auditor: auditoría e inventarios, sin mutación.

No mostrar auditoría sensible, URLs sensibles o datos operativos restringidos a perfiles no autorizados.

---

### 5. Backend decide, frontend visualiza

La UI no debe inventar permisos ni inferir información sensible.

Los datos visuales deben derivarse de:

- estado del visor;
- backend Apps Script;
- flags de permisos;
- auditoría;
- metadata documental;
- registros cargados.

Si un dato no existe, mostrar:

- sin dato;
- no registrado;
- no verificable;
- pendiente de completar.

No inventar porcentajes ni conclusiones.

---

## Maqueta institucional recomendada

La skill debe proponer o validar una maqueta con estas zonas:

### 1. Cabecera ejecutiva

Debe mostrar:

- nombre del visor;
- modo actual;
- actor actual;
- correo verificado o actor declarado;
- rol actual;
- última sincronización;
- último backup;
- estado del backend.

### 2. Franja de control operativo

Debe mostrar:

- recordatorio operativo matutino;
- resumen ejecutivo nocturno admin;
- alertas DGPPCS;
- estado de triggers;
- estado de correos;
- estado de backend compartido.

Solo mostrar detalles sensibles si el rol lo permite.

### 3. Cards KPI

Cards recomendadas:

- total de registros;
- completados;
- en proceso;
- vencidos;
- sin responsable;
- sin fecha;
- sin sustento;
- sustentos activos;
- sustentos retirados;
- score documental promedio;
- registros críticos;
- cambios del día;
- usuarios activos.

### 4. Zona de gráficos

Gráficos recomendados:

- avance por estado;
- avance por territorio;
- sustentos por tipo documental;
- registros con/sin sustento;
- score documental;
- riesgos por territorio;
- actividad por usuario;
- pendientes por responsable;
- evolución de cambios por día, si existe histórico.

### 5. Tabla / Gantt operativo

Debe mantener:

- búsqueda;
- filtros;
- EDT;
- actividad;
- territorio;
- responsable;
- estado;
- alerta;
- fechas;
- score documental;
- indicador de sustento;
- próximo paso.

### 6. Drawer de caso

Debe mostrar:

- resumen de la actividad;
- estado;
- responsable;
- territorio;
- fechas;
- próximo paso;
- nota DGPPCS;
- sustentos;
- ruta Drive;
- score documental;
- historial;
- permisos actuales;
- acciones disponibles.

### 7. Panel documental

Puede estar dentro del drawer o como bloque específico.

Debe mostrar:

- carpeta del registro;
- lista de sustentos;
- tipo documental;
- estado active/removed;
- metadata faltante;
- botón abrir carpeta;
- botón exportar inventario del caso.

### 8. Panel admin

Debe mantener:

- centro operativo;
- auditoría;
- reportes;
- recordatorio matutino;
- resumen nocturno admin;
- validación de roles;
- inventarios sensibles, si corresponde.

---

## Gráficos ejecutivos recomendados

### 1. Avance por estado

Tipo recomendado:

- barra horizontal;
- dona simple;
- cards agrupadas.

Estados:

- Completado;
- En proceso;
- Pendiente;
- Vencido;
- Sin estado.

Pregunta que responde:

¿Cuál es el estado general del portafolio?

---

### 2. Distribución por territorio

Tipo recomendado:

- barras;
- cards por territorio.

Territorios:

- Puno;
- Lima;
- Nacional;
- Puno y Lima;
- No definido.

Pregunta que responde:

¿Dónde se concentran actividades y riesgos?

---

### 3. Sustentos por tipo documental

Tipo recomendado:

- barras;
- lista con conteo.

Tipos:

- informe;
- oficio;
- acta;
- convenio;
- evidencia;
- contrato;
- otro;
- sin clasificar.

Pregunta que responde:

¿Qué tipo de evidencia sostiene el seguimiento?

---

### 4. Registros con/sin sustento

Tipo recomendado:

- barra apilada;
- semáforo documental.

Categorías:

- con sustento activo;
- sin sustento;
- solo sustentos retirados;
- metadata incompleta.

Pregunta que responde:

¿Qué tan trazable es el avance reportado?

---

### 5. Score documental

Tipo recomendado:

- cards por nivel;
- barra de distribución.

Niveles:

- completo;
- aceptable;
- incompleto;
- crítico.

Pregunta que responde:

¿Qué registros requieren completar evidencia?

---

### 6. Actividad por usuario

Tipo recomendado:

- tabla compacta;
- barras.

Métricas:

- cambios del día;
- registros tocados;
- cargas de sustento;
- retiros;
- última actividad.

Pregunta que responde:

¿Quién actualizó el visor y qué hizo?

---

### 7. Riesgos por territorio

Tipo recomendado:

- matriz;
- heatmap simple.

Riesgos:

- vencido;
- sin responsable;
- sin fecha;
- sin sustento;
- sin próximo paso;
- sin actualización reciente.

Pregunta que responde:

¿Qué territorio necesita atención inmediata?

---

## Score visual recomendado

Si no existe score documental, proponer uno simple.

Score de 100 puntos:

- 20: tiene carpeta Drive asociada;
- 20: tiene al menos un sustento activo;
- 15: sustentos con tipo documental;
- 15: sustentos con actor/correo;
- 10: fecha de carga registrada;
- 10: ruta lógica o folderUrl visible;
- 10: sin metadata crítica faltante.

Niveles:

- 80-100: completo;
- 60-79: aceptable;
- 40-59: incompleto;
- 0-39: crítico.

El score debe mostrarse como:

- texto;
- semáforo;
- barra;
- badge.

No debe usarse como verdad absoluta; es indicador operativo.

---

## Datos requeridos para visual analytics

Para gráficos y cards, revisar si existen estos campos:

- estado;
- alerta;
- territorio;
- responsable;
- fecha inicio;
- fecha final;
- EDT;
- actividad;
- sustento;
- attachments;
- attachmentFolder;
- documentType;
- uploadedAt;
- uploadedBy;
- uploadedByEmail;
- removedAt;
- removedBy;
- status;
- audit;
- lastChangeAt;
- permissionRole.

Si faltan, marcar como brecha.

---

## Funciones backend a revisar

En `apps_script/Code.gs`, localizar o proponer:

- getSharedTrackingState
- getSharedTrackingAudit
- getSharedTrackingOperationalControlStatus
- buildAuditDailyReportFromItems_
- buildSharedTrackingAdminExecutiveSummaryPreview_
- getRecords_
- normalizeSharedTrackingStateBundle_
- getSharedTrackingBackendMeta_

Funciones posibles futuras:

- buildVisualAnalyticsSummary_
- buildDocumentScoreSummary_
- buildTerritoryRiskSummary_
- buildUserActivitySummary_
- buildSupportTypeSummary_
- buildExecutiveDashboardPayload_

No crear nuevas funciones sin justificar fuente de datos y permisos.

---

## Funciones frontend a revisar

En `apps_script/Visor.html` y `visor_seguimiento_pec.html`, localizar o proponer:

- renderDashboard
- renderCards
- renderSummary
- renderOperationalControlState
- renderCaseAttachments
- renderGantt
- renderTable
- renderAdminDailyReport
- filtros actuales
- cards actuales
- bloques de panel
- drawer de caso

Si se toca frontend, mantener sincronía entre ambos HTML.

---

## Reglas UX

La visualización debe:

- evitar saturación;
- priorizar información crítica;
- usar labels institucionales claros;
- evitar jerga técnica innecesaria;
- explicar indicadores;
- mostrar fuente o alcance del dato;
- ser legible en pantalla amplia;
- ser tolerante a datos incompletos;
- no esconder alertas críticas;
- no mostrar datos sensibles a usuarios sin rol.

Mensajes sugeridos:

- Datos calculados con la información disponible en el visor.
- Existen registros sin sustento.
- Existen sustentos sin tipo documental.
- Algunos archivos pueden requerir permisos Drive adicionales.
- El score documental es orientativo y debe validarse por el equipo responsable.
- No hay datos suficientes para construir este gráfico.

---

## Reglas de seguridad

Antes de mostrar información:

- validar rol actual;
- evitar exponer URLs sensibles a lectores si la política no está definida;
- no mostrar auditoría sensible a lectores;
- no mostrar centro operativo a no admins;
- no mostrar fileId/folderId salvo en vista admin, PMO o auditor;
- no habilitar acciones desde gráficos;
- no usar gráficos como mecanismo de permiso.

---

## Priorización recomendada

### Fase inmediata

- cards KPI ejecutivas;
- indicador de registros sin sustento;
- score documental simple;
- visualización de ruta/carpeta en drawer;
- badges de permisos actuales;
- alerta de metadata incompleta.

### Siguiente fase

- gráficos por estado;
- gráficos por territorio;
- sustentos por tipo documental;
- actividad por usuario;
- inventario visual de sustentos;
- matriz de riesgos por territorio.

### Fase avanzada

- dashboard configurable por rol;
- comparativas históricas;
- línea de tiempo avanzada;
- heatmap integral;
- reportes visuales exportables;
- integración con reportes semanales.

---

## Pruebas obligatorias

Diseñar pruebas para:

1. Lector ve dashboard sin datos sensibles.
2. PMO ve indicadores operativos y documentales.
3. Operador documental ve sustentos y brechas documentales.
4. Auditor ve auditoría y métricas de control.
5. Admin ve centro operativo completo.
6. Registro sin sustento se marca correctamente.
7. Registro con sustento activo se marca correctamente.
8. Sustento retirado no cuenta como activo.
9. Score documental cambia con metadata.
10. Gráficos toleran datos vacíos.
11. Filtros por territorio afectan cards y gráficos.
12. Filtros por responsable afectan cards y gráficos.
13. Apps Script compartido carga dashboard.
14. Visor local no promete datos backend.
15. Ambos HTML quedan sincronizados.

---

## Validaciones técnicas

Antes de recomendar commit:

- `git diff --check`;
- ausencia de conflict markers;
- ausencia de secretos;
- ausencia de `console.log`;
- sincronía entre `apps_script/Visor.html` y `visor_seguimiento_pec.html`;
- revisión de permisos;
- revisión de datos sensibles;
- prueba visual manual;
- prueba en modo local;
- prueba en Apps Script compartido.

---

## Entregables obligatorios

Toda respuesta usando esta skill debe incluir:

1. Resumen ejecutivo.
2. Archivos revisados.
3. Estado visual actual.
4. Brechas de dashboard.
5. Propuesta de maqueta.
6. Cards KPI propuestas.
7. Gráficos propuestos.
8. Score visual/documental.
9. Datos requeridos.
10. Permisos por visualización.
11. Riesgos UX y seguridad.
12. Cambios backend propuestos.
13. Cambios frontend propuestos.
14. Priorización por fases.
15. Pruebas obligatorias.
16. Rollback.
17. Decisión:
    - OK actual;
    - OK parcial;
    - requiere parche;
    - riesgo alto;
    - no verificable.
18. Prompt recomendado para la siguiente fase.

---

## Criterio de éxito

La skill cumple su propósito si:

- los gráficos responden preguntas de gestión;
- las cards KPI muestran información accionable;
- el dashboard es legible;
- el score documental es comprensible;
- los datos incompletos no rompen la UI;
- las vistas respetan permisos;
- no se expone información sensible;
- la maqueta mejora la toma de decisiones;
- HTML local y Apps Script están sincronizados;
- no se rompe producción;
- no se hace commit ni push sin autorización.
