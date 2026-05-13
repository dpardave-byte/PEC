# pec-datos-calidad-catalogos

## Propósito

Esta skill ordena catálogos, calidad de datos y normalización de campos del Visor PEC para reducir ambigüedad, duplicidad y deriva operativa. Su objetivo es que responsables, correos, estados, territorios, tipos documentales, áreas, roles y otros valores reutilizables sigan reglas consistentes que favorezcan búsqueda, filtros, reportes, dashboard y operación documental.

La skill aborda la calidad de datos como un activo institucional. Una interfaz sólida y una buena matriz de permisos pierden valor si los catálogos permiten duplicados, ortografías inconsistentes, correos mal escritos o estados semánticamente equivalentes pero computados como distintos.

## Cuándo usar esta skill

Usar cuando se requiera:

- detectar responsables duplicados o mal escritos;
- revisar correos inconsistentes;
- normalizar estados o territorios;
- diseñar catálogo de tipos documentales;
- ordenar áreas, roles o unidades recurrentes;
- definir campos obligatorios y validaciones mínimas;
- limpiar datos para mejorar reportes, filtros o dashboard;
- reducir ruido operativo en listas reutilizables.

## Cuándo no usar esta skill

No usar para:

- rediseñar permisos como tema principal;
- corregir identidad Apps Script;
- reconciliar Drive sin foco de catálogo;
- modificar producción masivamente sin estrategia de migración;
- asumir que normalizar equivale a borrar histórico sin trazabilidad.

## Contexto del proyecto

Repositorio esperado:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio

No trabajar en:

C:\Users\Dpard\Documents\Master\Liderazgo\tools\transcriptor360-studio

El Visor PEC usa responsables, estados, bloques, fases, tipos documentales y otros campos en búsqueda, filtros, reportes, paneles y formularios. Esta skill se enfoca en que esas listas sean coherentes, reutilizables y comprensibles en escala institucional.

## Archivos relevantes

- visor_seguimiento_pec.html
- apps_script/Visor.html
- apps_script/Code.gs
- CHECKLIST_OPERATIVO_VISOR_PEC.md
- docs/MATRIZ_PERMISOS_VISOR_PEC.md
- cualquier archivo o estructura que almacene listas reutilizables, registros generales o catálogos embebidos

## Relación con legend-pec-orchestrator-v2.2

LEGEND sigue definiendo el marco principal y las fases de intervención. Esta skill aporta la capa de calidad de datos y catálogos para que el producto institucional no se degrade con el uso. No sustituye al orquestador; traduce síntomas de ruido operativo en reglas de normalización y validación.

Si existe conflicto con `pec-orquestador`, prevalece LEGEND. La skill coordina con análisis funcional, persistencia de datos, QA, sustentos documentales y reportes.

## Skills relacionadas

- pec-analisis-funcional
- pec-persistencia-datos
- pec-reportes-inventarios
- pec-qa-regresion
- pec-sustentos-documentales
- pec-supervisor-calidad

## Reglas duras

- No fusionar datos reales sin criterio de trazabilidad.
- No perder variantes históricas relevantes sin mapa de equivalencias.
- No normalizar a costa de romper filtros, reportes o auditoría.
- Cada catálogo debe tener propietario funcional y regla de actualización.
- Si un nuevo valor entra al sistema, debe quedar reutilizable y no como entrada aislada.
- No asumir que diferentes grafías siempre representan personas distintas.
- No dejar que la UI sea el único punto de validación; backend y persistencia deben acompañar el modelo.

## Catálogos y campos que debe cubrir

1. Responsables y correos asociados.
2. Estados y subestados.
3. Territorios.
4. Áreas o unidades.
5. Roles operativos.
6. Tipos documentales.
7. Nombres normalizados para búsquedas.
8. Campos obligatorios para ficha y sustentos.
9. Reglas de deduplicación y equivalencia.

## Flujo obligatorio

1. Confirmar dónde viven los catálogos o listas reutilizables.
2. Detectar duplicados, variantes y errores recurrentes.
3. Definir forma canónica por catálogo.
4. Diseñar reglas de normalización y validación.
5. Separar campos obligatorios de campos opcionales.
6. Estimar impacto en búsqueda, filtros, reportes, Gantt y formularios.
7. Proponer limpieza o migración segura.
8. Diseñar controles preventivos para nuevos registros.

## Riesgos críticos

- responsables duplicados que fragmentan seguimiento y métricas;
- correos mal escritos que impiden validar rol o trazabilidad;
- estados inconsistentes que alteran KPI y alertas;
- territorios con grafías múltiples que distorsionan reportes;
- tipos documentales libres que vuelven inútil el inventario de sustentos;
- limpieza masiva sin rollback ni evidencia de equivalencia.

Riesgo alto:

- campos obligatorios no controlados;
- catálogos embebidos en frontend sin sincronía con backend;
- reportes que agrupan mal por nombre o estado;
- formularios que aceptan valores nuevos sin política.

## Validaciones técnicas

- buscar listas de responsables, estados, territorios y tipos documentales;
- revisar si hay registro general reutilizable para nuevos responsables;
- validar impacto en búsqueda por bloques, fases, hitos y casos;
- validar impacto en reportes, exportaciones y dashboard;
- revisar que las propuestas de normalización no rompan el espejo de HTML ni el backend.

## Entregables obligatorios

1. Resumen ejecutivo.
2. Catálogos revisados.
3. Duplicados o inconsistencias detectadas.
4. Reglas canónicas propuestas.
5. Campos obligatorios sugeridos.
6. Impacto funcional estimado.
7. Plan de limpieza o migración.
8. Riesgos y rollback.
9. Pruebas posteriores recomendadas.

## Criterio de éxito

La skill cumple su objetivo si:

- reduce ambigüedad y duplicidad de catálogos;
- mejora trazabilidad de responsables, roles y tipos documentales;
- protege búsqueda, reportes y paneles frente a datos inconsistentes;
- deja reglas claras para crecimiento institucional del visor.
