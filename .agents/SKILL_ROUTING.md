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
- evolución del producto;
- madurez institucional;
- documentación operativa;
- revisión Red Team;
- integridad Drive;
- calidad de datos y catálogos.

## Orquestador legacy

`.agents/skills/pec-orquestador/SKILL.md`

queda como skill legacy o auxiliar.

Si una instrucción menciona `pec-orquestador`, Codex debe interpretar que el flujo debe ser coordinado por `legend-pec-orchestrator-v2.2`, salvo que el usuario pida explícitamente usar la versión antigua.

## Skills de dominio

Las skills de dominio disponibles para el Visor PEC son:

- `pec-analisis-funcional`
- `pec-concurrencia-estado-compartido`
- `pec-frontend-ux`
- `pec-git-entrega`
- `pec-permisos-roles-operativos`
- `pec-persistencia-datos`
- `pec-publicacion-appsscript`
- `pec-qa-regresion`
- `pec-reportes-inventarios`
- `pec-supervisor-calidad`
- `pec-sustentos-documentales`
- `pec-visual-analytics-dashboard`
- `pec-red-team-seguridad-operativa`
- `pec-integridad-drive-sustentos`
- `pec-pruebas-manuales-roles`
- `pec-score-documental-alertas`
- `pec-maqueta-producto-institucional`
- `pec-documentacion-operativa`
- `pec-datos-calidad-catalogos`

## Regla de precedencia

En caso de conflicto entre skills:

1. `legend-pec-orchestrator-v2.2` prevalece como autoridad principal.
2. Las skills de dominio aportan análisis especializado y no deben reemplazar al orquestador principal.
3. `pec-orquestador` permanece como skill legacy y no debe desplazar a LEGEND.
4. Si hay tensión entre una skill de dominio y el control institucional del visor, prevalece la decisión emitida por LEGEND.

## Uso recomendado

Para tareas complejas del Visor PEC, iniciar con:

Usa como orquestador principal:

`.agents/skills/legend-pec-orchestrator-v2.2/SKILL.md`

Lee también:

`.agents/SKILL_ROUTING.md`

Activa después las skills de dominio aplicables según el problema. Ejemplos frecuentes:

- permisos + identidad + despliegue:
  - `pec-permisos-roles-operativos`
  - `pec-publicacion-appsscript`
  - `pec-red-team-seguridad-operativa`
  - `pec-pruebas-manuales-roles`
- sustentos + Drive + score:
  - `pec-sustentos-documentales`
  - `pec-integridad-drive-sustentos`
  - `pec-score-documental-alertas`
  - `pec-reportes-inventarios`
- evolución visual e institucional:
  - `pec-maqueta-producto-institucional`
  - `pec-frontend-ux`
  - `pec-visual-analytics-dashboard`
- calidad de datos y catálogos:
  - `pec-datos-calidad-catalogos`
  - `pec-persistencia-datos`
  - `pec-analisis-funcional`
- documentación y cierre:
  - `pec-documentacion-operativa`
  - `pec-qa-regresion`
  - `pec-supervisor-calidad`
  - `pec-git-entrega`

## Regla final

Si existe conflicto con `pec-orquestador`, prevalece `legend-pec-orchestrator-v2.2`.
Las nuevas skills creadas en esta fase se consideran skills de dominio y deben coordinarse con LEGEND, no competir con él.
