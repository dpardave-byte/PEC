# pec-score-documental-alertas

## Propósito

Esta skill diseña, audita y valida el score documental del Visor PEC junto con sus semáforos, etiquetas de brecha y alertas operativas. Su meta es convertir la calidad documental de cada registro en una señal ejecutiva y accionable, de modo que el visor pueda priorizar casos críticos, visibilizar brechas y conectar la situación documental con la lectura del dashboard institucional.

El score no debe verse como una cifra decorativa. Debe reflejar integridad mínima de carpeta, sustentos activos, metadata esencial, trazabilidad de actor y coherencia entre estado documental y estado operativo del caso.

## Cuándo usar esta skill

Usar cuando se requiera:

- diseñar o revisar score documental 0-100;
- clasificar registros como completo, aceptable, incompleto o crítico;
- crear semáforos y alertas de sustentos;
- detectar registros sin sustento o con metadata insuficiente;
- vincular score con KPI y dashboard;
- priorizar brechas documentales por territorio, responsable o bloque;
- validar que la UI represente bien el riesgo documental.

## Cuándo no usar esta skill

No usar para:

- revisar permisos por rol como foco principal;
- reconciliar físicamente Drive sin coordinar con integridad documental;
- rehacer el dashboard completo sin enfoque documental;
- cambiar catálogos generales de datos sin relación con el score;
- hacer despliegue o commit sin autorización.

## Contexto del proyecto

Repositorio esperado:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio

No trabajar en:

C:\Users\Dpard\Documents\Master\Liderazgo\tools\transcriptor360-studio

El score documental opera sobre la estructura del Visor PEC, los sustentos por registro, la carpeta Drive, la metadata persistida, la visualización en el drawer y la consolidación de KPI o reportes. Debe coordinarse con inventarios y dashboard sin romper el flujo actual del visor.

## Archivos relevantes

- apps_script/Code.gs
- apps_script/Visor.html
- visor_seguimiento_pec.html
- docs/AUDITORIA_PERMISOS_CARGA_SUSTENTOS_VISOR_PEC.md
- docs/MATRIZ_PERMISOS_VISOR_PEC.md
- CHECKLIST_OPERATIVO_VISOR_PEC.md

## Relación con legend-pec-orchestrator-v2.2

LEGEND fija la fase, el alcance y la decisión institucional. Esta skill aporta el análisis documental y de alertas dentro de ese marco. No reemplaza al orquestador; transforma la situación documental en un modelo legible para operación, QA y dirección del producto.

Si existe conflicto con `pec-orquestador`, prevalece LEGEND. El score debe coordinarse con sustentos documentales, dashboard, frontend UX, QA y supervisor de calidad.

## Skills relacionadas

- pec-sustentos-documentales
- pec-visual-analytics-dashboard
- pec-frontend-ux
- pec-reportes-inventarios
- pec-qa-regresion
- pec-supervisor-calidad

## Reglas duras

- El score no debe inventar metadata inexistente.
- Un sustento retirado no debe contarse como evidencia activa.
- Una carpeta ausente debe impactar explícitamente el score.
- La UI debe mostrar la causa del score, no solo la cifra.
- No ocultar casos críticos dentro de promedios globales.
- Mantener consistencia entre backend, drawer, KPI y exportes.
- No convertir el score en autoridad de permisos.

## Componentes mínimos del score

La skill debe cubrir al menos estas señales:

- registro sin carpeta asociada;
- carpeta existente pero sin sustentos activos;
- sustento sin tipo documental;
- sustento sin `folderId` o `fileId`;
- sustento sin ruta lógica;
- sustento sin actor o correo verificable;
- sustentos retirados con motivo y fecha;
- metadata crítica vacía;
- porcentaje de completitud documental por registro.

Puede usar ponderaciones, pero debe dejar claro por qué una señal vale más que otra y cómo se interpreta el resultado final.

## Flujo obligatorio

1. Confirmar modelo documental vigente.
2. Definir variables mínimas que nutren el score.
3. Separar señales de completitud, trazabilidad y riesgo.
4. Diseñar fórmula clara y explicable.
5. Definir clases: completo, aceptable, incompleto y crítico.
6. Diseñar etiquetas de alerta visibles en drawer y KPI.
7. Revisar relación con reportes y dashboard.
8. Preparar casos de prueba representativos.
9. Proponer visualización mínima sin recargar la interfaz.

## Riesgos críticos

- un registro sin sustento aparece con score sano;
- un archivo retirado sigue aportando puntaje activo;
- el score es opaco y no permite entender la brecha;
- se mezclan faltas menores y críticas sin distinción;
- el dashboard promedia y oculta focos urgentes;
- el score induce decisiones erróneas por falta de trazabilidad.

Riesgo alto:

- la UI muestra colores o etiquetas inconsistentes con el valor real;
- el score no considera carpeta ausente o metadata crítica vacía;
- exportaciones e inventarios no incluyen el estado documental resumido.

## Validaciones técnicas

- localizar campos de metadata documental usados por el score;
- confirmar que frontend y backend coincidan en la clasificación;
- validar presencia de textos o tags como `Sin sustento`, `Sin carpeta Drive`, `Crítico`, `Aceptable` y equivalentes institucionales;
- revisar impacto en KPI y dashboard sin romper Gantt o drawer;
- preparar muestras para score 0, score medio y score alto.

## Entregables obligatorios

1. Resumen ejecutivo.
2. Fórmula propuesta o detectada.
3. Señales consideradas.
4. Clasificación por rangos.
5. Alertas visuales recomendadas.
6. Riesgos y sesgos del score.
7. Integración con dashboard y reportes.
8. Casos de prueba.
9. Rollback o simplificación recomendada si el modelo es excesivo.

## Criterio de éxito

La skill cumple su objetivo si:

- el score representa brechas documentales reales;
- las alertas son claras y accionables;
- la clasificación es estable y explicable;
- dashboard, drawer e inventarios pueden usar el mismo modelo sin contradicción;
- el equipo puede priorizar registros críticos con base objetiva.
