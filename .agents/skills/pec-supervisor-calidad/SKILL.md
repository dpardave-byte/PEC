---
description: Activa este skill cuando una tarea del visor PEC requiera validar calidad funcional, visual, persistencia, Gantt, busqueda, reportes, analitica, Apps Script, estado compartido, correos, automatizaciones, o cuando exista riesgo de que una correccion se declare resuelta sin prueba visual suficiente.
---

# Skill: PEC Supervisor de Calidad

Este skill actua como auditor transversal del visor PEC.

Debe usarse antes de cerrar cualquier tarea que afecte:
- visor_seguimiento_pec.html
- apps_script/Visor.html
- apps_script/Code.gs
- Gantt
- busqueda
- filtros
- responsables
- seguimiento DGPPCS
- subactividades
- reportes
- analitica
- exportaciones
- Apps Script
- estado compartido
- correos automaticos
- persistencia local o compartida

## Proposito

Evitar errores repetitivos como:
- cambios que se declaran corregidos pero no se ven en pantalla;
- pruebas simuladas que no coinciden con la validacion visual;
- botones que existen pero no estan conectados al flujo real;
- registros que existen en appState.raw, customRecords o edits, pero no aparecen en el Gantt;
- busqueda que muestra registros que no se pueden revelar;
- subactividades duplicadas;
- cambios de EDT que no persisten;
- filtros que ocultan silenciosamente registros recien creados;
- reportes o analitica que usan datos antiguos;
- cambios que requieren actualizar Apps Script pero no se advierte;
- commits sugeridos antes de validar visualmente.

## Regla principal

Una correccion no esta lista para commit si no pasa el flujo completo:

usuario acciona -> estado interno cambia -> hidratacion conserva el cambio -> filtros lo incluyen -> render lo muestra -> persistencia lo guarda -> exportacion/reporte/analitica lo reflejan.

## Validacion visual obligatoria

Si el cambio afecta interfaz, Gantt, filtros, busqueda, botones, modales, reportes o analitica, no basta con:
- sintaxis OK;
- funcion existente;
- clase CSS existente;
- simulacion aislada;
- SANITIZED_EQUAL=true.

Debe verificarse ademas:
- que el elemento aparece en pantalla;
- que el DOM contiene el resultado;
- que el usuario puede interactuar;
- que el resultado se ve donde debe verse;
- que no se oculta por filtros activos;
- que persiste al recargar cuando corresponde.

## Validacion de fuente unica

Cuando haya busqueda, Gantt, reportes, analitica o exportacion, verificar que todos usen la misma fuente efectiva de registros.

Debe confirmarse que:
- la busqueda no muestra registros eliminados;
- la busqueda no muestra registros huerfanos;
- la busqueda no muestra duplicados historicos;
- el Gantt puede revelar todo resultado buscable;
- el reporte no cuenta registros eliminados;
- la analitica no cuenta duplicados;
- la exportacion no incluye registros descartados.

## Registros invisibles prohibidos

No debe quedar ningun registro que:
- exista en customRecords, appState.raw, appState.edits o estado compartido;
- bloquee nuevas creaciones por duplicado;
- pero no aparezca en Gantt, reporte o exportacion.

Si un registro no puede mostrarse, debe:
- corregirse su jerarquia;
- limpiarse su filtro incompatible;
- marcarse como eliminado;
- o excluirse de busqueda/exportacion.

## Subactividades

Toda creacion de subactividad debe validar:
- padre activo real;
- parent_edt;
- EDT siguiente correcto;
- nivel;
- grupo;
- source_order;
- duplicados bajo el mismo padre;
- filtros activos;
- render en Gantt;
- expansion de ancestros;
- scroll y resaltado;
- persistencia local o compartida;
- exportacion.

Casos minimos:
- crear hija de raiz: 3 -> 3.1;
- crear hija de nodo intermedio: 3.4 -> 3.4.6;
- crear hija de subactividad: 3.4.6 -> 3.4.6.1;
- crear hija profunda: 2.2.1 -> 2.2.1.1.

No aceptar una prueba si el registro se crea internamente pero no aparece en el Gantt.

## Duplicados

Debe validarse:
- mismo nombre bajo el mismo padre: bloqueado;
- mismo nombre bajo otro padre: permitido si corresponde;
- duplicados historicos: depurados o excluidos;
- duplicados eliminados: no aparecen en busqueda, Gantt, reportes ni exportacion.

La comparacion debe normalizar:
- mayusculas/minusculas;
- tildes;
- espacios dobles;
- espacios al inicio/final;
- caracteres invisibles.

## EDT y jerarquia

Todo cambio de EDT debe validar:
- conflicto con EDT existente;
- parent_edt;
- nivel;
- grupo;
- source_order;
- orden visual;
- ancestros;
- render en Gantt;
- reporte;
- analitica;
- exportacion;
- persistencia tras recarga.

Si hay conflicto, debe mostrarse un mensaje claro y no guardar un estado incoherente.

## Filtros

Si un cambio crea o modifica registros, verificar que filtros activos no oculten silenciosamente el resultado.

Si el filtro oculta el registro recien creado, se debe:
- heredar valores del padre cuando sea coherente; o
- limpiar el filtro incompatible; y
- mostrar mensaje claro al usuario.

## Apps Script

Si se modifica apps_script/Visor.html o apps_script/Code.gs, recordar siempre:
- copiar el archivo actualizado al editor de Apps Script;
- guardar;
- crear nueva version de implementacion;
- probar el enlace ?view=visor.

Tambien debe verificarse:
- BOOTSTRAP_PRESENT=true;
- no romper visorBootstrapJson;
- no romper estado compartido;
- no romper auditoria;
- no romper backup;
- no romper modo admin;
- no romper fallback local.

## Correos y automatizaciones

Si se agregan o modifican correos:
- no enviar correos reales en pruebas automaticas;
- preview no debe enviar;
- envio manual debe requerir admin o contexto autorizado;
- trigger diario no debe duplicarse;
- debe existir auditoria del envio;
- debe reportar personas sin correo configurado;
- debe excluir actividades completadas o eliminadas.

## Checklist obligatorio antes de recomendar commit

Antes de decir "listo para commit", verificar:
1. git status -sb.
2. Archivos modificados.
3. Que no existan archivos temporales:
   - .codex-edge-profile/
   - .bak
   - .tmp
   - respaldos no autorizados
   - archivos de prueba no solicitados
4. Si se tocaron ambos visores:
   - SANITIZED_EQUAL=true
5. Si se toco Apps Script:
   - BOOTSTRAP_PRESENT=true
6. Si hay imagenes:
   - URLs absolutas preservadas cuando aplique
7. Validacion visual o DOM real.
8. Validacion de persistencia.
9. Validacion de busqueda.
10. Validacion de Gantt.
11. Validacion de reportes.
12. Validacion de analitica.
13. Validacion de exportacion.
14. Validacion de Apps Script si aplica.
15. Riesgos pendientes.
16. Veredicto:
   - listo para commit; o
   - no listo para commit.

## Prevalencia de la prueba visual del usuario

Si el usuario reporta con evidencia visual que algo no funciona, esa evidencia prevalece sobre una simulacion de Codex.

En ese caso:
- no recomendar commit;
- reabrir diagnostico;
- pedir una prueba real de DOM o navegador;
- corregir el flujo completo.

## Formato obligatorio de cierre

Toda evaluacion debe cerrar asi:

### Evaluacion de calidad

1. La correccion esta conectada al flujo real de usuario?
2. Se valido visualmente o en DOM real?
3. Se valido persistencia?
4. Se valido que no hay registros invisibles?
5. Se valido que busqueda, Gantt, reporte, analitica y exportacion usan fuente consistente?
6. Se valido Apps Script si aplica?
7. Hay archivos temporales o no rastreados?
8. Que regresiones se probaron?
9. Riesgos pendientes.
10. Veredicto:
   - listo para commit; o
   - no listo para commit.
