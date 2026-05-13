# pec-red-team-seguridad-operativa

## Propósito

Esta skill audita de forma agresiva el abuso, la exposición y el escalamiento de privilegios del Visor PEC como sistema operativo institucional. Su foco es detectar rutas por las que un lector, visitante con enlace, actor declarado por URL, operador documental, PMO, auditor o administrador podría obtener permisos que no le corresponden, acceder a información sensible, filtrar activos de Drive o ejecutar acciones sin trazabilidad suficiente.

La skill debe tratar al visor como una superficie de ataque real y no como una sola interfaz. Por eso revisa backend Apps Script, frontend espejo, panel admin, centro operativo, carga de sustentos, inventarios, exports, acceso por enlace, configuración del Web App, trazabilidad documental y riesgos asociados a Drive, auditoría, correos, triggers y Script Properties.

## Cuándo usar esta skill

Usar cuando se requiera:

- auditar abuso de `?actor=` y cualquier identidad declarativa;
- revisar escalamiento de lector a operador, de operador a PMO o de PMO a admin;
- confirmar que acceso por enlace no concede mutaciones sensibles;
- revisar exposición de `fileId`, `folderId`, URLs Drive o rutas lógicas;
- revisar auditoría sensible, centro operativo y panel admin;
- evaluar publicación Apps Script desde enfoque defensivo;
- preparar una batería Red Team por rol;
- revisar si un cambio documental o de permisos abrió una brecha nueva;
- estimar severidad institucional de una brecha antes de desplegar.

## Cuándo no usar esta skill

No usar para:

- rediseño visual general del visor;
- creación de KPI o dashboards sin componente de riesgo;
- limpieza de catálogos o normalización de datos sin foco de seguridad;
- despliegues automáticos;
- cambios en triggers, correos o Script Properties sin relación con una brecha verificada;
- pruebas invasivas que alteren producción, envíen correos o borren evidencia.

## Contexto del proyecto

Repositorio esperado:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio

No trabajar en:

C:\Users\Dpard\Documents\Master\Liderazgo\tools\transcriptor360-studio

Superficies relevantes del sistema:

1. GitHub Pages y visor local.
2. Visor compartido Apps Script.
3. `apps_script/Code.gs` como backend sensible.
4. `apps_script/Visor.html` y `visor_seguimiento_pec.html` como superficies UX.
5. Google Drive como repositorio documental.
6. `shared_tracking_state.json` y auditoría operativa.
7. panel admin, centro operativo, reportes e inventarios.
8. configuración de publicación y Web App.

## Archivos relevantes

- apps_script/Code.gs
- apps_script/Visor.html
- visor_seguimiento_pec.html
- apps_script/appsscript.json
- docs/AUDITORIA_PERMISOS_CARGA_SUSTENTOS_VISOR_PEC.md
- docs/MATRIZ_PERMISOS_VISOR_PEC.md
- CHECKLIST_OPERATIVO_VISOR_PEC.md

## Relación con legend-pec-orchestrator-v2.2

`legend-pec-orchestrator-v2.2` sigue siendo la autoridad principal. Esta skill actúa como brazo Red Team especializado dentro de ese marco. No reemplaza al orquestador ni decide por sí sola cambios de implementación; su papel es someter el diseño propuesto a escenarios hostiles, clasificar brechas por severidad y proponer mitigaciones mínimas compatibles con el producto institucional.

Si hay conflicto entre esta skill y `pec-orquestador`, prevalece `legend-pec-orchestrator-v2.2`. Las conclusiones Red Team deben integrarse como insumo para decisiones LEGEND y nunca como autorización autónoma para abrir permisos o relajar controles.

## Skills relacionadas

- pec-permisos-roles-operativos
- pec-sustentos-documentales
- pec-concurrencia-estado-compartido
- pec-publicacion-appsscript
- pec-qa-regresion
- pec-supervisor-calidad
- pec-reportes-inventarios

## Reglas duras

- `?actor=` jamás concede admin, PMO, operador, auditor ni permiso documental.
- No exponer correos, `fileId`, `folderId`, URLs Drive ni Script Properties en reportes públicos.
- No ejecutar pruebas que alteren producción más allá de verificaciones controladas.
- No tocar triggers, correos ni backups salvo que el análisis pruebe relación directa con la brecha.
- No usar datos institucionales sensibles en ejemplos públicos.
- No convertir la UI en autoridad de permisos; el backend debe seguir siendo la fuente de verdad.
- Si se revisa `apps_script/Visor.html`, validar espejo con `visor_seguimiento_pec.html`.
- No hacer commit, push ni deploy sin autorización explícita.

## Flujo obligatorio

1. Confirmar repositorio y rama con `git status --short --branch`.
2. Identificar superficies de ataque: enlace público, Apps Script, Drive, exports, panel admin, inventarios y sustento.
3. Revisar funciones de identidad, roles, auditoría y mutación sensible en backend.
4. Revisar cómo el frontend interpreta y comunica permisos.
5. Construir una matriz de abuso por rol: lector, viewer declarado, PMO, operador, auditor y admin.
6. Clasificar hallazgos por criticidad: crítica, alta, media o baja.
7. Diferenciar brechas de código, despliegue, Script Properties y operación.
8. Diseñar pruebas manuales de abuso sin generar daño ni enviar correos.
9. Proponer mitigaciones mínimas y rollback.
10. Elevar decisión final a LEGEND con evidencia clara.

## Riesgos críticos

Clasificar como riesgo crítico cualquiera de estos escenarios:

- un usuario con enlace obtiene edición o carga documental sin correo verificado;
- `?actor=` permite simular admin, PMO, auditor u operador documental;
- un operador puede alcanzar centro operativo o auditoría sensible sin respaldo de rol;
- se filtran `fileId` o `folderId` en HTML, exportaciones o mensajes de error;
- una URL Drive expone documentos a terceros no autorizados;
- un retiro de sustento puede ejecutarse sin motivo, sin auditoría o sin conservar rastro;
- un cambio de despliegue Apps Script deja de verificar el correo de sesión y la organización no lo detecta;
- Script Properties operativas quedan visibles o inferibles desde frontend;
- correos y triggers pueden dispararse desde una superficie no admin;
- el centro operativo revela información sensible a lectores o actores declarados.

Riesgo alto:

- el frontend comunica un rol mayor que el backend;
- la auditoría existe pero no liga actor, correo verificado, acción y registro;
- el inventario documental filtra rutas o URLs completas a perfiles no autorizados;
- el Web App usa configuración que impide validar identidad y fuerza a los usuarios a operar como lectores.

Riesgo medio:

- mensajes UX ambiguos que ocultan por qué se bloqueó una acción;
- diferencia entre HTML local y HTML Apps Script que haga creer que un control existe cuando en producción no existe;
- catálogos de roles mal normalizados que permiten errores de asignación.

## Validaciones técnicas

- buscar referencias a `?actor`, `Session.getActiveUser()`, `permissionRole`, `canEditShared`, `canManageAttachments`, `canRemoveAttachments`, `canViewSensitiveAudit` y `canViewOperationalCenter`;
- revisar `appsscript.json` para `executeAs`, `access` y `userinfo.email`;
- validar que backend y frontend compartan el mismo modelo de identidad y motivo de bloqueo;
- validar sincronía entre `apps_script/Visor.html` y `visor_seguimiento_pec.html`;
- confirmar ausencia de rutas de mutación expuestas por UI sin control backend;
- revisar que exports e inventarios respeten rol y no revelen datos críticos;
- revisar `git diff --check` y ausencia de conflict markers cuando haya cambios;
- preparar checklist manual para URL pública, sesión institucional, Gmail admin y usuario externo.

## Entregables obligatorios

Toda respuesta apoyada en esta skill debe incluir:

1. Resumen ejecutivo.
2. Superficies auditadas.
3. Escenarios de abuso analizados.
4. Hallazgos confirmados.
5. Hallazgos descartados.
6. Riesgos por severidad.
7. Brechas de código.
8. Brechas de despliegue o configuración.
9. Pruebas manuales de abuso propuestas.
10. Mitigaciones mínimas.
11. Rollback o contención.
12. Decisión Red Team integrada a LEGEND.

## Criterio de éxito

La skill cumple su objetivo si:

- detecta rutas reales o plausibles de escalamiento y exposición;
- distingue entre actor declarado, correo verificado y rol efectivo;
- identifica si el problema es código, despliegue, Script Properties o práctica operativa;
- no abre permisos como forma de resolver una brecha;
- deja un checklist Red Team reutilizable por rol y superficie;
- documenta mitigaciones defensivas compatibles con el Visor PEC como producto institucional.
