---
name: pec-analisis-funcional
description: Usar cuando la tarea afecte reglas de negocio del visor PEC, bloques, fases, hitos, jerarquias, responsables, fichas por caso, alertas, busqueda, exportacion o Gantt.
---

# Skill: PEC Analisis Funcional

Antes de modificar codigo:

1. Identificar la regla funcional afectada.
2. Revisar si el cambio impacta:
   - bloques
   - fases
   - hitos
   - responsables
   - unidades
   - alertas
   - Gantt
   - fichas por caso
   - busqueda
   - exportacion

3. No resolver solo desde la apariencia si existe impacto en datos o logica.
4. Mantener coherencia entre jerarquia visual y estructura de datos.
5. Documentar la regla aplicada.

Reglas criticas:

- Los bloques raiz deben mantenerse como nivel principal.
- Inicio de Efectividad del Prestamo debe ser raiz 4.
- La busqueda debe trabajar sobre bloques, fases, hitos y casos.
- Los responsables son atributos de seguimiento, no el eje principal de busqueda.
- DGPPCS debe aparecer como responsable cuando corresponda.
