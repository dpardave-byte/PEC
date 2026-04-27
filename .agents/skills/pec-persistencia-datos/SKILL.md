---
name: pec-persistencia-datos
description: Usar cuando la tarea afecte almacenamiento local, responsables, unidades, bloques, fases, opciones reutilizables, listas desplegables, notas, fichas por caso, importacion o exportacion de datos.
---

# Skill: PEC Persistencia de Datos

Reglas de datos:

- Todo responsable nuevo debe guardarse en el registro general.
- Las listas desplegables deben actualizarse con los registros existentes.
- No duplicar responsables por diferencias menores de escritura.
- Mantener compatibilidad con datos previamente guardados.
- Si se cambia la estructura de datos, incluir compatibilidad hacia atras.
- No perder notas locales ni informacion de fichas por caso.
- No alterar datos base al exportar reportes.
- No mezclar unidades, responsables, bloques y fases como si fueran el mismo tipo de dato.

Para responsables:

1. Normalizar texto.
2. Guardar el nuevo responsable.
3. Actualizar opciones reutilizables.
4. Confirmar que aparece en cualquier cuadro donde corresponda.
