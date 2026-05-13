# pec-documentacion-operativa

## Propósito

Esta skill crea, ordena y mantiene la documentación operativa del Visor PEC para que el sistema pueda sostenerse como producto institucional, incluso cuando cambien personas, roles o rutinas de trabajo. Su objetivo es transformar conocimiento disperso en guías, instructivos, manuales, protocolos y checklists utilizables por admin, PMO, operador documental, auditor y personal de soporte.

La skill no se limita a redactar “manuales”. Debe traducir el comportamiento real del visor, sus restricciones, rutas de publicación, protocolos documentales y respuestas ante incidentes en material claro, verificable y alineado con la operación diaria.

## Cuándo usar esta skill

Usar cuando se requiera:

- redactar o actualizar manual admin, PMO, operador documental o auditor;
- preparar guía de carga de sustentos;
- documentar publicación Apps Script;
- dejar checklist semanal o protocolo de cierre diario;
- formalizar protocolo de rollback, soporte o respuesta a incidencias;
- convertir hallazgos técnicos en instrucciones operativas comprensibles;
- ordenar documentación dispersa del proyecto.

## Cuándo no usar esta skill

No usar para:

- aplicar cambios de código como objetivo principal;
- resolver por sí sola un fallo de permisos o despliegue;
- producir material decorativo sin uso operativo;
- documentar información que aún no fue validada;
- inventar procedimientos inexistentes o datos no comprobados.

## Contexto del proyecto

Repositorio esperado:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio

No trabajar en:

C:\Users\Dpard\Documents\Master\Liderazgo\tools\transcriptor360-studio

La documentación operativa del Visor PEC debe considerar tanto el producto local como el Apps Script compartido, la carga documental, el panel admin, las rutas de despliegue, la matriz de permisos, la auditoría y la convivencia entre perfiles institucionales y usuarios con enlace.

## Archivos relevantes

- CHECKLIST_OPERATIVO_VISOR_PEC.md
- docs/AUDITORIA_PERMISOS_CARGA_SUSTENTOS_VISOR_PEC.md
- docs/MATRIZ_PERMISOS_VISOR_PEC.md
- apps_script/Code.gs como referencia funcional
- apps_script/Visor.html
- visor_seguimiento_pec.html

## Relación con legend-pec-orchestrator-v2.2

LEGEND define la secuencia de trabajo y las decisiones institucionales. Esta skill organiza la capa documental dentro de ese marco, sin sustituir el orquestador. Su papel es convertir acuerdos, controles y flujos reales en documentación mantenible y útil.

Si existe conflicto con `pec-orquestador`, prevalece LEGEND. La skill debe coordinarse con publicación Apps Script, permisos, sustentos, QA y supervisor de calidad.

## Skills relacionadas

- pec-publicacion-appsscript
- pec-permisos-roles-operativos
- pec-sustentos-documentales
- pec-pruebas-manuales-roles
- pec-qa-regresion
- pec-supervisor-calidad

## Reglas duras

- No documentar como vigente algo que no fue validado.
- Distinguir claramente entre comportamiento real, recomendación y restricción.
- No imprimir secretos, credenciales ni valores sensibles de Script Properties.
- Mantener lenguaje institucional, claro y accionable.
- Si una guía depende de rol, explicitarlo.
- Si una operación tiene riesgo, incluir advertencia y rollback.
- No convertir una brecha no resuelta en “proceso normal”.

## Tipos de documento que debe cubrir

1. Manual admin.
2. Manual PMO.
3. Manual operador documental.
4. Manual auditor.
5. Guía de carga de sustentos.
6. Guía de publicación Apps Script.
7. Guía de solución de problemas frecuentes.
8. Checklist semanal.
9. Protocolo de cierre diario.
10. Protocolo documental y de rollback.

## Flujo obligatorio

1. Confirmar qué parte del sistema está validada y qué parte sigue en ajuste.
2. Identificar público objetivo del documento.
3. Separar procedimientos por rol.
4. Redactar pasos claros, precondiciones y resultados esperados.
5. Incluir validaciones, advertencias y escalamiento.
6. Añadir checklist operativo cuando el proceso lo requiera.
7. Revisar consistencia con permisos, despliegue, QA y soporte.
8. Marcar explícitamente si una guía depende de Apps Script compartido o del visor local.

## Riesgos críticos

- la documentación afirma permisos o flujos que el sistema real no soporta;
- una guía expone secretos o rutas sensibles;
- el documento omite advertencias en acciones con impacto institucional;
- operadores ejecutan pasos erróneos por redacción ambigua;
- un proceso de rollback queda incompleto y agrava una incidencia.

Riesgo alto:

- manuales de roles mezclados y poco diferenciados;
- checklist operativo sin criterios de aprobación;
- guía de publicación sin validación posterior al deploy;
- protocolo documental sin evidencia mínima requerida.

## Validaciones técnicas

- revisar coherencia con matriz de permisos vigente;
- revisar que la guía no contradiga el comportamiento del backend o la UI;
- validar que manuales por rol incluyan capacidades y límites;
- validar que publicación Apps Script incluya pasos de rollback;
- revisar claridad institucional y ausencia de vacíos críticos.

## Entregables obligatorios

1. Resumen ejecutivo.
2. Público objetivo.
3. Documentos o guías creadas o revisadas.
4. Procedimientos por rol.
5. Checklists incluidos.
6. Riesgos y advertencias.
7. Validaciones aún abiertas.
8. Recomendación de mantenimiento documental.

## Criterio de éxito

La skill cumple su objetivo si:

- la operación puede sostenerse con instrucciones claras y reutilizables;
- cada rol entiende qué puede hacer y cómo hacerlo;
- despliegue, rollback, carga documental y validaciones tienen guía accionable;
- la documentación acompaña al producto real y no a un diseño imaginario.
