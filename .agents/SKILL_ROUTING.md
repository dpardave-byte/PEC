# Skill Routing PEC

## Orquestador principal

El orquestador principal del Visor PEC es:

`.agents/skills/legend-pec-orchestrator-v2.2/SKILL.md`

Debe usarse para tareas de:

- coordinación multiagente;
- auditoría;
- implementación controlada;
- permisos;
- sustentos documentales;
- concurrencia;
- reportes;
- dashboard;
- publicación Apps Script;
- QA;
- evolución del producto.

## Orquestador legacy

`.agents/skills/pec-orquestador/SKILL.md`

queda como skill legacy o auxiliar.

Si una instrucción menciona `pec-orquestador`, Codex debe interpretar que el flujo debe ser coordinado por `legend-pec-orchestrator-v2.2`, salvo que el usuario pida explícitamente usar la versión antigua.

## Regla de precedencia

En caso de conflicto entre skills:

1. `legend-pec-orchestrator-v2.2` prevalece como autoridad principal.
2. Las skills de dominio aportan análisis especializado:
   - `pec-sustentos-documentales`
   - `pec-permisos-roles-operativos`
   - `pec-concurrencia-estado-compartido`
   - `pec-reportes-inventarios`
   - `pec-visual-analytics-dashboard`
   - `pec-publicacion-appsscript`
3. `pec-orquestador` no debe reemplazar al orquestador LEGEND v2.2.

## Prompt base recomendado

Para cualquier tarea compleja del Visor PEC, iniciar con:

Usa como orquestador principal:

`.agents/skills/legend-pec-orchestrator-v2.2/SKILL.md`

Usa como skills de dominio las que correspondan.

Si existe conflicto con `pec-orquestador`, prevalece `legend-pec-orchestrator-v2.2`.
