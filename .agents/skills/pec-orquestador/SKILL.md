---
name: pec-orquestador
description: Activa este skill cuando el usuario solicite cambios integrales en el visor PEC, tablero ejecutivo, Gantt, alertas, fichas por caso, responsables, bloques, fases, busqueda, persistencia local, exportacion o mejoras de interfaz. Este skill debe coordinar analisis funcional, frontend UX, persistencia de datos, QA de regresion y entrega git.
---

# Skill: PEC Orquestador

Cuando una tarea afecte el visor PEC, primero identifica el tipo de cambio:

1. Cambio funcional o reglas de negocio:
   - Usar el skill pec-analisis-funcional.

2. Cambio visual, jerarquia, tablero, Gantt, cuadros, filtros, UX o disposicion:
   - Usar el skill pec-frontend-ux.

3. Cambio que afecte responsables, unidades, bloques, fases, registros, almacenamiento local o actualizacion de opciones:
   - Usar el skill pec-persistencia-datos.

4. Cambio que pueda romper comportamiento existente:
   - Usar el skill pec-qa-regresion.

5. Supervisión de calidad, regresión visual o validación final:
   - Usar el skill `pec-supervisor-calidad`.

6. Antes de cerrar la tarea:
   - Usar el skill `pec-supervisor-calidad`.
   - Si el veredicto es “listo para commit”, usar el skill `pec-git-entrega`.
   - Si el veredicto es “no listo para commit”, no recomendar `git add`, `git commit` ni `push`.

Reglas obligatorias para el visor PEC:

- La busqueda debe estar referida principalmente a bloques, fases, hitos o casos, no a responsables ni unidades.
- Los bloques raiz deben mantenerse alineados a la izquierda.
- Inicio de Efectividad del Prestamo debe tratarse como raiz 4, no como subnivel.
- Cuando se agregue un responsable, debe actualizarse el registro para que aparezca como opcion en cualquier cuadro posterior.
- La DGPPCS debe aparecer como responsable cuando corresponda.
- No modificar funcionalidades existentes sin revisar regresion.
- Antes de finalizar, explicar que archivos se tocaron, que se corrigio y que pruebas se realizaron.
## Regla de supervisión obligatoria

- Si una corrección no se valida visualmente o no pasa el flujo completo usuario → estado → hidratación → filtros → render → persistencia, no está lista para commit.
- Si el usuario contradice una validación de Codex con evidencia visual, prevalece la evidencia visual del usuario y debe reabrirse el diagnóstico.
- No se debe recomendar commit si existen registros invisibles, duplicados persistidos, botones sin conexión real, errores de Apps Script o archivos temporales no rastreados.
