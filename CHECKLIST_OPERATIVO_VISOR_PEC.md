# Checklist Operativo del Visor PEC

Este documento resume el uso operativo del visor PEC en sus tres modos:

- local standalone;
- publicado en GitHub Pages;
- compartido por Apps Script.

## 1. Apertura del visor

### Modo local

Abrir:

`C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio\visor_seguimiento_pec.html`

Uso recomendado:

- pruebas funcionales;
- edición individual;
- revisión de estructura;
- preparación de cargas.

### Modo web publicado

URL esperada:

`https://dpardave-byte.github.io/PEC/visor_seguimiento_pec.html`

Si el navegador muestra una versión antigua, usar:

`https://dpardave-byte.github.io/PEC/visor_seguimiento_pec.html?v=<commit>`

Ejemplo:

`https://dpardave-byte.github.io/PEC/visor_seguimiento_pec.html?v=ce7bcb9`

### Modo compartido Apps Script

Abrir la URL del Web App con:

`.../exec?view=visor`

Uso recomendado:

- trabajo compartido entre usuarios;
- estado centralizado;
- auditoría;
- backup operativo.
- acceso con cuenta Google autorizada cuando el despliegue redirige a Sign-In.

## 2. Carga e importación de información

### Leer Excel o CSV

Sirve para cargar cronograma operativo desde:

- `.xlsx`
- `.xls`
- `.csv`
- `.json` operativo

Verificar después de cargar:

- mensaje de éxito o error;
- cantidad de actividades cargadas;
- filas auxiliares omitidas;
- actualización de KPIs, Gantt, analítica, filtros y reporte.

### Leer estructura

Sirve para cargar una estructura exportada por el propio visor.

Formatos esperados:

- `.json` con formato de estructura del visor;
- `.xlsx` de estructura exportada.

Verificar después:

- estado de fuente `ESTRUCTURA EDITABLE`;
- mensaje `Fuente lista` o equivalente;
- recalculo de Gantt, KPIs, analítica, filtros, catálogo y reporte.

## 3. Exportaciones disponibles

Confirmar que siguen accesibles:

- `Exportar JSON filtrado`
- `Exportar TXT`
- `Exportar estructura XLSX`
- `Exportar estructura JSON`
- `Exportar backup del día`

Uso recomendado:

- JSON/TXT para reporte y revisión rápida;
- estructura XLSX/JSON para mover la estructura entre entornos;
- backup del día antes de cambios relevantes.

## 4. Uso operativo del visor

### Ver analítica

Abrir `Ver analítica` para revisar:

- KPIs ejecutivos;
- curva S o equivalente;
- distribución por bloque;
- distribución por estado;
- carga por responsable;
- carga por Seguimiento DGPPCS;
- alertas, vencimientos y atrasos.

### Generar y ver reporte ejecutivo

1. Presionar `Generar reporte ejecutivo`.
2. Abrir `Ver reporte`.
3. Si se requiere salida física o PDF, usar `Imprimir reporte`.

### Editar portada

Usar `Editar portada` para actualizar:

- título;
- subtítulo;
- etiquetas;
- etiquetas adicionales.

Verificar que el cambio se vea reflejado en el hero principal.

### Editar una ficha

Abrir una actividad o caso y confirmar:

- alias o nombre operativo;
- responsable;
- Seguimiento DGPPCS;
- estado;
- fechas;
- notas;
- siguiente acción.

Guardar y verificar que el cambio reaparece al reabrir la ficha.

## 5. Responsable y Seguimiento DGPPCS

### Responsable

Debe mostrar unidades, por ejemplo:

- `DGPPCS`
- `PNSU`
- `PASLC`
- `BM`
- `VMCS`
- `OGAJ`
- `SG`
- `OGPP`

No debe mostrar personas.

### Seguimiento DGPPCS

Debe mostrar personas, por ejemplo:

- `Darwin Pardavé`
- `Teresa Arana`
- `Betsabé Araindia`
- `Rolando Carpio`

No debe mostrar unidades.

Si se agrega una persona o unidad nueva desde una ficha, verificar que luego quede disponible en otras fichas.

## 6. Auditoría y backup

### Modo local

- la auditoría local es ayuda operativa del navegador actual;
- no es seguridad real;
- el backup del día se guarda localmente.

### Modo Apps Script

Verificar en el panel admin:

- actor;
- modo;
- sincronización;
- último backup;
- cierre diario por usuario;
- auditoría compartida.

Acciones esperadas:

- ver auditoría;
- ver cierre diario por usuario;
- exportar reporte diario;
- exportar auditoría;
- exportar backup;
- revisar último guardado central.

## 7. Qué hacer si los datos se ven desactualizados

1. Revisar el estado de fuente.
2. Verificar si el visor está en modo local o Apps Script.
3. Si es GitHub Pages, recargar con `?v=<commit>`.
4. Si es Apps Script, esperar el polling periódico o refrescar la página.
5. Si el backend falla, revisar el mensaje de fallback local.

## 8. Qué hacer si hay conflicto o concurrencia

En Apps Script:

- el visor usa refresco periódico, no tiempo real puro;
- si dos usuarios editan a la vez, existe control básico por revisión;
- si aparece conflicto, refrescar el estado compartido antes de volver a guardar.

## 9. Diferencias por modo

### Local standalone

- guarda en el navegador;
- no depende de Apps Script;
- útil para pruebas y edición individual.

### GitHub Pages

- sirve como visor publicado;
- puede requerir `?v=<commit>` para evitar caché;
- no reemplaza el backend compartido de Apps Script.

### Apps Script compartido

- usa estado centralizado;
- soporta auditoría y backup;
- soporta cierre diario por usuario desde la bitácora central;
- puede validar admins por correo con `PEC_VISOR_ADMIN_EMAILS`;
- usa polling de 30 segundos.

## 10. Checklist de validación rápida antes de operar

- El visor abre.
- El Gantt carga.
- Los bloques 1, 2, 3 y 4 se ven como raíz.
- La búsqueda responde por bloque/EDT.
- `DGPPCS` aparece en Responsable.
- `Darwin Pardavé` aparece en Seguimiento DGPPCS.
- `Ver analítica` abre.
- `Ver reporte` abre.
- `Leer estructura` sigue disponible.
- `Exportar JSON filtrado` y `Exportar TXT` siguen disponibles.
- En Apps Script, `?view=visor` abre el visor correcto.
- En Apps Script, si la URL redirige a Google Sign-In, la cuenta autenticada pertenece al grupo autorizado para DGPPCS.
- En Apps Script, el panel admin muestra auditoría, cierre diario por usuario y último backup si el usuario es admin.
- El reporte diario por usuario se puede exportar antes del envío a DGPPCS.

## 11. Regla operativa del cierre diario

- El cierre diario automático debe enviarse de lunes a viernes.
- La hora operativa base es `18:00`.
- El modo para operación real debe quedar en `REAL`.
- Si el trigger diario quedó desfasado o venía de una configuración antigua, reconfigurarlo con:
  - `.../exec?action=visor_reset_daily_report_weekday_trigger`
- Después de reconfigurarlo, validar:
  - que el panel admin siga mostrando la hora `18:00`;
  - que el trigger esté habilitado;
  - que el próximo envío no salga fuera de horario.

## 12. Fase 1 - consolidación del visor como sistema confiable

Objetivo:

- tratar el visor como sistema operativo institucional, no solo como tablero visual.

Núcleo de confiabilidad que debe mantenerse:

- guardado compartido;
- auditoría central;
- backup diario;
- cierre diario por usuario;
- correos operativos;
- acceso administrador;
- exportación de reporte diario;
- lectura ejecutiva por bloques, fases, hitos y casos.

### Control de apertura diaria del admin

- Abrir `?view=visor`.
- Confirmar actor autenticado.
- Revisar estado de sincronización.
- Revisar último guardado central.
- Revisar último backup.
- Revisar estado de `Entrega del reporte diario`.
- Confirmar que la hora visible sea `18:00`.

### Regresión mínima semanal

- Confirmar búsqueda por bloque.
- Confirmar búsqueda por fase.
- Confirmar búsqueda por caso o hito.
- Confirmar que la búsqueda no depende solo de responsables o unidades.
- Confirmar que los bloques raíz siguen alineados a la izquierda.
- Confirmar que `Inicio de Efectividad del Prestamo` sigue como raíz 4.
- Confirmar que `DGPPCS` aparece en `Responsable` cuando corresponde.
- Confirmar que una edición de ficha se guarda en el estado compartido.
- Confirmar que el movimiento aparece en auditoría y cierre diario.
- Confirmar que `Ver analítica`, `Ver reporte` y exportaciones siguen disponibles.
- Confirmar que el reporte diario y los correos operativos mantienen su ventana de operación.

## 13. Checklist de consolidación 0-30 días

- Validar mapa de superficies:
  - panel público;
  - visor público/local;
  - visor compartido Apps Script;
  - panel admin.
- Validar cierre diario.
- Validar trigger diario.
- Validar correos.
- Validar backup.
- Validar auditoría.
- Validar módulo de sustento:
  - carga múltiple;
  - carpeta por registro;
  - retiro;
  - trazabilidad por actor.
- Validar productos base oficiales:
  - cierre diario por usuario;
  - reporte ejecutivo semanal;
  - matriz de pendientes por responsable / DGPPCS.
