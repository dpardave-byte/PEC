# pec-maqueta-producto-institucional

## Propósito

Esta skill gobierna la evolución de la maqueta global del Visor PEC como producto institucional. Su objetivo es ordenar la interfaz completa para que funcione como plataforma ejecutiva de seguimiento, control documental, lectura de riesgos y operación por rol, sin caer en rediseños abruptos que rompan la continuidad del sistema.

La skill trabaja sobre jerarquía visual, cabecera ejecutiva, cards KPI, zona de gráficos, tabla o Gantt, drawer del caso, panel documental, panel admin y experiencia diferenciada por perfil. No persigue una “maqueta bonita” aislada; persigue una maqueta útil, sobria, institucional y sostenible en fases.

## Cuándo usar esta skill

Usar cuando se requiera:

- revisar la arquitectura visual del visor como producto;
- priorizar qué zonas de interfaz deben evolucionar primero;
- diseñar cabecera, KPI y gráficos sin romper la base actual;
- ordenar la relación entre tabla, Gantt, drawer y paneles laterales;
- diferenciar experiencia por rol sin fragmentar el producto;
- evitar saturación visual o redundancias;
- convertir el visor en una plataforma institucional madura.

## Cuándo no usar esta skill

No usar para:

- parchear un bug puntual sin impacto de producto;
- redefinir permisos o despliegue como tarea principal;
- corregir integridad Drive o calidad de datos sin componente visual;
- rehacer toda la interfaz en una sola fase;
- introducir una librería UI nueva sin evaluación institucional.

## Contexto del proyecto

Repositorio esperado:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio

No trabajar en:

C:\Users\Dpard\Documents\Master\Liderazgo\tools\transcriptor360-studio

El Visor PEC convive entre visor local, GitHub Pages y Apps Script compartido. La maqueta de producto debe considerar esa convivencia, la necesidad de espejo HTML, la operación documental, los paneles administrativos y la lectura ejecutiva del seguimiento.

## Archivos relevantes

- apps_script/Visor.html
- visor_seguimiento_pec.html
- apps_script/Code.gs cuando la UI dependa de flags o payloads
- CHECKLIST_OPERATIVO_VISOR_PEC.md
- docs/MATRIZ_PERMISOS_VISOR_PEC.md
- docs/AUDITORIA_PERMISOS_CARGA_SUSTENTOS_VISOR_PEC.md

## Relación con legend-pec-orchestrator-v2.2

LEGEND define fases y controla que la evolución no rompa producción. Esta skill aporta la visión de producto y maqueta institucional dentro de ese marco. No autoriza rediseños masivos por su cuenta; debe traducir necesidades de operación y dirección en cambios secuenciales, compatibles con el visor existente.

Si hay conflicto con `pec-orquestador`, prevalece LEGEND. La skill debe coordinarse especialmente con frontend UX, dashboard, sustentos, QA y supervisor de calidad.

## Skills relacionadas

- pec-frontend-ux
- pec-visual-analytics-dashboard
- pec-sustentos-documentales
- pec-permisos-roles-operativos
- pec-score-documental-alertas
- pec-qa-regresion

## Reglas duras

- No rediseñar de golpe sin fases priorizadas.
- Mantener sincronía entre `apps_script/Visor.html` y `visor_seguimiento_pec.html`.
- No degradar búsqueda, Gantt, drawer ni panel admin en nombre del diseño.
- La maqueta debe servir a lectura ejecutiva y operación diaria, no solo a estética.
- El rol del usuario debe influir en visibilidad y énfasis, no en incoherencias de navegación.
- Evitar saturación, duplicidad de paneles y ruido visual.
- No introducir patrones que oculten riesgos críticos o brechas documentales.

## Zonas que debe cubrir

1. Cabecera ejecutiva.
2. Cards KPI.
3. Zona de gráficos y lectura analítica.
4. Tabla principal o rejilla de seguimiento.
5. Gantt y jerarquía de bloques.
6. Drawer del caso.
7. Panel documental.
8. Panel admin y centro operativo.
9. Experiencia por rol.
10. Distribución desktop y adaptación razonable a pantallas menores.

## Flujo obligatorio

1. Confirmar estado actual de la interfaz y restricciones funcionales.
2. Identificar qué información es prioritaria para dirección, PMO y operación documental.
3. Definir jerarquía visual por zonas.
4. Delimitar fases de evolución de la maqueta.
5. Evaluar dependencias entre UI, backend y permisos.
6. Diseñar cambios incrementales por superficie.
7. Estimar riesgo de regresión visual y funcional.
8. Preparar pruebas y criterios de aceptación.

## Riesgos críticos

- una maqueta nueva rompe la lectura de bloques, fases o Gantt;
- el drawer del caso pierde claridad sobre información crítica;
- el panel documental queda oculto o subordinado de forma inconveniente;
- el panel admin invade la experiencia de roles no admin;
- la cabecera o KPI saturan y desplazan información de seguimiento real;
- la interfaz deja de servir para decisiones ejecutivas rápidas.

Riesgo alto:

- gráficos sin propósito operativo claro;
- cards KPI redundantes o contradictorias;
- exceso de componentes visuales que compiten entre sí;
- jerarquía tipográfica débil o inconsistente;
- experiencia desigual entre Apps Script y visor local.

## Validaciones técnicas

- revisar DOM y secciones actuales de cabecera, KPI, analítica, Gantt, drawer, panel documental y admin;
- confirmar que los cambios visuales propuestos no requieren permisos nuevos no previstos;
- validar espejo entre HTML Apps Script y HTML local;
- revisar no regresión de búsqueda, Gantt, fichas, notas, alertas y exports;
- preparar evaluación visual por rol.

## Entregables obligatorios

1. Resumen ejecutivo.
2. Diagnóstico de la maqueta actual.
3. Jerarquía visual recomendada.
4. Fases de evolución.
5. Zonas a intervenir.
6. Riesgos de saturación o regresión.
7. Cambios visuales recomendados.
8. Dependencias funcionales.
9. Pruebas de aceptación.
10. Criterio de salida por fase.

## Criterio de éxito

La skill cumple su objetivo si:

- convierte el visor en una plataforma institucional más clara y ordenada;
- prioriza cambios por fases y no por impulso visual;
- protege Gantt, seguimiento, drawer y operación documental;
- integra dashboard, paneles y roles bajo una misma lógica de producto;
- deja una hoja de ruta visual realista y defendible.
