# Instrucciones de trabajo para Codex - PEC Repo Limpio

## 1. Objetivo general

Este proyecto debe ser trabajado con orden, claridad y control.

Antes de modificar archivos, Codex debe analizar el contexto, proponer un plan breve y explicar que archivos tocara y por que.

El objetivo no es producir cambios rapidos sin control, sino construir codigo, documentos, reportes, automatizaciones o visores de forma segura, verificable y util.

Cuando el trabajo corresponda al visor PEC, Codex debe aplicar las reglas especificas del visor y usar los skills definidos en `.agents/skills/`.

---

## 2. Alcance

Este archivo aplica principalmente al repositorio:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio\

Si existe otro AGENTS.md en una carpeta superior, este archivo tiene prioridad para este repositorio porque es la guia especifica del proyecto PEC.

---

## 3. Reglas generales de trabajo

- No modificar archivos sin explicar previamente el cambio propuesto.
- No eliminar archivos sin autorizacion expresa.
- No cambiar la estructura principal del proyecto si no se ha pedido.
- No instalar dependencias nuevas sin explicar su necesidad.
- No ejecutar comandos que puedan borrar, sobrescribir o mover informacion sin confirmacion previa.
- Priorizar cambios pequenos, claros y reversibles.
- Mantener siempre un resumen de lo realizado.
- Si hay dudas, formularlas antes de avanzar con cambios importantes.
- No asumir que una tarea es solo visual si puede afectar datos, logica, persistencia, filtros, busqueda o estructura.
- No hacer parches aislados cuando el problema exige revisar flujo, datos, interfaz y pruebas.
- No reescribir todo el proyecto si solo se necesita corregir una parte.
- Trabajar por etapas cuando la tarea sea compleja.

---

## 4. Uso obligatorio de skills para el visor PEC

Para cualquier tarea relacionada con el visor PEC, tablero ejecutivo, Gantt, alertas, fichas por caso, bloques, fases, responsables, busqueda, persistencia, exportacion o reportes, Codex debe iniciar aplicando el skill:

- pec-orquestador

Luego debe determinar automaticamente si corresponde aplicar uno o varios de estos skills:

- pec-analisis-funcional
- pec-frontend-ux
- pec-persistencia-datos
- pec-qa-regresion
- pec-git-entrega

Codex no debe limitarse a un solo skill si la tarea requiere varias dimensiones.

Ejemplos:

- Si el cambio afecta fases, bloques o jerarquia:
  - usar pec-analisis-funcional
  - usar pec-frontend-ux
  - usar pec-qa-regresion

- Si el cambio afecta responsables, unidades, listas desplegables o registros:
  - usar pec-persistencia-datos
  - usar pec-qa-regresion

- Si el cambio afecta interfaz, alineacion, tarjetas, Gantt, buscador o experiencia de usuario:
  - usar pec-frontend-ux
  - usar pec-qa-regresion

- Si el cambio ya esta listo para cierre:
  - usar pec-git-entrega

---

## 5. Reglas funcionales criticas del visor PEC

Estas reglas son obligatorias para cualquier trabajo sobre el visor PEC:

- La busqueda debe priorizar bloques, fases, hitos y casos.
- La busqueda no debe estar centrada solo en responsables ni unidades.
- Los bloques 1, 2, 3 y 4 deben mantenerse como raices visuales.
- Los bloques raiz deben aparecer alineados a la izquierda.
- Inicio de Efectividad del Prestamo debe tratarse como raiz 4, no como subnivel.
- La DGPPCS debe estar considerada como responsable cuando corresponda.
- Al crear un nuevo responsable, debe guardarse en el registro general.
- Todo responsable nuevo debe aparecer luego como opcion reutilizable en cualquier cuadro o formulario.
- No deben duplicarse responsables por diferencias menores de escritura.
- Las listas desplegables deben actualizarse con la informacion registrada.
- La estructura visual debe facilitar toma de decisiones ejecutivas.
- Las alertas deben ser claras y estar asociadas a fechas de vencimiento o riesgo.
- El Gantt debe mantener coherencia con las fases, bloques e hitos.
- La ficha por caso debe permitir notas o informacion local sin romper el visor general.
- La exportacion de reportes no debe alterar los datos base.

---

## 6. Forma de trabajar con codigo

Cuando se trabaje con codigo, Codex debe:

1. Revisar primero la estructura del proyecto.
2. Identificar archivos principales.
3. Explicar el flujo general antes de modificar.
4. Proponer un plan breve de cambios.
5. Indicar que archivos tocara y por que.
6. Aplicar cambios por etapas.
7. Verificar errores despues de modificar.
8. Usar Git o diferencias de archivos cuando sea posible.
9. No cambiar muchas cosas a la vez.
10. No reescribir todo el proyecto si solo se necesita corregir una parte.
11. Revisar impacto en datos, interfaz y persistencia cuando corresponda.
12. Ejecutar o proponer pruebas manuales razonables.

Para el visor PEC, Codex debe revisar especialmente estos archivos cuando correspondan:

- visor_seguimiento_pec.html
- apps_script/Visor.html
- archivos relacionados con datos, configuracion, persistencia local, estilos, scripts o exportacion.

Si hay archivos espejo, versiones duplicadas o archivos relacionados entre si, Codex debe advertirlo antes de modificar solo uno.

---

## 7. Forma de trabajar con documentos

Cuando se trabaje con documentos en Word, Markdown, texto o presentaciones, Codex debe:

- Respetar la estructura original cuando exista.
- Mantener titulos, subtitulos, cuadros y numeracion si forman parte del formato.
- Mejorar redaccion sin cambiar el sentido.
- Evitar frases artificiales o muy rigidas.
- Mantener un tono institucional cuando el documento lo requiera.
- Senalar inconsistencias antes de corregirlas.
- No inventar datos, cifras, nombres, fechas ni fuentes.
- Si falta informacion, dejar una nota o recomendacion clara.
- Usar una redaccion natural, profesional y ordenada.
- Evitar un estilo mecanico, repetitivo o excesivamente generico.

---

## 8. Uso de terminal y comandos

Antes de ejecutar comandos, Codex debe explicar:

- Que comando ejecutara.
- Para que sirve.
- Que resultado espera.
- Si existe algun riesgo.

No debe ejecutar comandos destructivos sin autorizacion.

Comandos que requieren confirmacion previa:

- del
- Remove-Item
- rm
- rmdir
- git reset --hard
- git clean
- npm uninstall
- pip uninstall
- format

Tambien debe pedir confirmacion antes de instalar paquetes, cambiar variables de entorno, modificar configuraciones globales del sistema, borrar archivos, mover carpetas completas o sobrescribir archivos importantes.

---

## 9. Seguridad y permisos

Codex debe trabajar solo dentro de la carpeta del proyecto, salvo que el usuario indique expresamente otra ruta.

No debe acceder a carpetas personales, descargas, documentos o escritorio completo sin una instruccion clara.

Si necesita acceso adicional, debe explicar por que.

No debe usar acceso completo salvo que el usuario lo autorice expresamente para una tarea concreta.

---

## 10. Git y control de cambios

Cuando el proyecto use Git, Codex debe:

- Revisar el estado con git status antes de cambios relevantes.
- Usar git diff para mostrar diferencias cuando sea util.
- No hacer commit sin autorizacion del usuario.
- Sugerir un mensaje de commit claro al final.
- Advertir si hay archivos modificados previamente por el usuario.
- No sobrescribir cambios existentes sin explicacion.
- No ejecutar git reset --hard ni git clean sin autorizacion expresa.

---

## 11. QA y verificacion para el visor PEC

Antes de cerrar cualquier tarea del visor PEC, Codex debe revisar o proponer una prueba de regresion.

La verificacion minima debe incluir:

1. Confirmar que la busqueda funciona por bloques.
2. Confirmar que la busqueda funciona por fases.
3. Confirmar que la busqueda no depende unicamente de responsables o unidades.
4. Confirmar que los bloques raiz aparecen alineados a la izquierda.
5. Confirmar que Inicio de Efectividad del Prestamo aparece como raiz 4.
6. Confirmar que DGPPCS aparece como responsable cuando corresponda.
7. Confirmar que un nuevo responsable se guarda correctamente.
8. Confirmar que el nuevo responsable aparece como opcion reutilizable.
9. Confirmar que no se rompio el Gantt.
10. Confirmar que no se rompieron fichas, notas, alertas ni exportacion.
11. Revisar errores visibles en consola del navegador cuando corresponda.
12. Revisar que los cambios no generen superposicion visual.

Si no puede ejecutar una prueba automatica, debe proponer una prueba manual concreta.

---

## 12. Entregables esperados

Cuando Codex termine una tarea, debe entregar un resumen con esta estructura:

Resumen de trabajo realizado

1. Archivos revisados:
2. Archivos modificados:
3. Cambios principales:
4. Pruebas realizadas o sugeridas:
5. Riesgos o advertencias:
6. Proximo paso recomendado:
7. Mensaje de commit sugerido:

Si no modifico archivos, debe indicarlo expresamente.

Si detecto inconsistencias pero no las corrigio, debe dejarlas claramente senaladas.

---

## 13. Preferencias de redaccion

Cuando el usuario solicite documentos, informes, correos, guias o presentaciones, Codex debe usar un estilo:

- Claro.
- Natural.
- Profesional.
- Bien estructurado.
- Sin frases innecesariamente adornadas.
- Sin sonar artificial.
- Con lenguaje comprensible para personas no tecnicas cuando corresponda.
- Con precision tecnica cuando el tema lo requiera.
- Con tono institucional si el documento esta dirigido a entidades publicas, multilaterales, equipos tecnicos o autoridades.

Debe priorizar precision, orden y utilidad.

---

## 14. Regla final

Antes de actuar, Codex debe entender el objetivo del usuario.

Si el pedido puede resolverse de varias formas, debe recomendar la mas segura y practica.

Cuando la tarea sea compleja, debe dividirla en pasos y avanzar de forma controlada.

No debe modificar archivos hasta haber explicado primero el plan de trabajo, salvo que el usuario le pida expresamente ejecutar cambios directamente.

Para el visor PEC, Codex debe recordar siempre que el objetivo no es solo que algo se vea bien, sino que el visor funcione como herramienta ejecutiva para seguimiento, alertas, Gantt, fichas por caso, responsables, fases, bloques y reportes.
