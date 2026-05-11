# Matriz RACI del Visor PEC

## Propósito

Definir responsabilidades mínimas para gobernar, operar y evolucionar el Visor PEC como producto institucional.

## Roles

- `DIR`: Dirección / Product Owner institucional.
- `ARQ`: Arquitecto full-stack / Apps Script.
- `PMO`: Analista funcional PMO.
- `DOC`: Especialista documental.
- `UX`: UX / experiencia operativa.
- `DAT`: Data & reporting lead.
- `AUT`: Automation lead.
- `QA`: QA regresión.
- `SEC`: Especialista sectorial.
- `LLM`: LLM product lead.

## Leyenda

- `R`: Responsible.
- `A`: Accountable.
- `C`: Consulted.
- `I`: Informed.

## Matriz RACI

| Frente | DIR | ARQ | PMO | DOC | UX | DAT | AUT | QA | SEC | LLM |
|---|---|---|---|---|---|---|---|---|---|---|
| Mapa de producto y alcance núcleo | A | R | C | I | C | I | I | C | C | I |
| Modularidad técnica y contratos de datos | C | A/R | C | I | I | C | C | C | I | I |
| Operación diaria, triggers, backups, correos | I | C | C | I | I | I | A/R | C | I | I |
| Panel admin y centro de control operativo | I | A/R | C | I | C | C | R | C | I | I |
| Calidad de datos y responsables reutilizables | C | R | A/R | C | I | R | I | C | C | I |
| Sustento documental y carpeta por registro | I | R | C | A/R | C | C | I | C | C | I |
| Score de completitud y alertas visibles | C | R | R | C | C | A/R | I | C | C | I |
| Cierre diario por usuario | I | C | R | C | I | R | A/R | C | I | I |
| Reporte ejecutivo semanal | A | C | R | C | C | A/R | C | C | C | I |
| Matriz de pendientes DGPPCS | C | C | A/R | I | C | R | C | C | C | I |
| Bitácora de decisiones | C | C | A/R | R | I | I | I | C | C | I |
| Copiloto LLM trazable | C | C | C | R | I | C | I | C | C | A/R |

## Notas de uso

- La matriz no reemplaza decisiones de dirección; ordena responsabilidades.
- Un mismo rol puede ser asumido por una misma persona en etapas iniciales, pero la matriz debe mantenerse igual para no perder claridad.
- Si un frente cambia de núcleo a fase futura, debe actualizarse esta matriz antes de ejecutar trabajo técnico relevante.

## Criterio de actualización

Actualizar esta matriz cuando ocurra al menos una de estas condiciones:

- se agregue un producto institucional oficial nuevo;
- se abra una línea funcional nueva en el panel admin o en el visor compartido;
- se incorporen capacidades LLM con impacto en trazabilidad;
- se redefina el alcance núcleo del Visor PEC.
