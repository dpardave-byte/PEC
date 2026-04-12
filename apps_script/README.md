# Apps Script - PEC Drive Loader

Este proyecto crea el entorno pesado para trabajar con Google Drive como repositorio documental y Google Sheets como indice maestro.

## Que hace

- Crea la carpeta raiz `PEC - Programa Economia Circular`.
- Crea subcarpetas para donacion, efectividad, Puno, Lima, comparacion tecnologica y evidencias.
- Crea la Google Sheet `PEC_indice_maestro` con las columnas esperadas por el panel.
- Inserta filas base de ejemplo.
- Escanea la carpeta raiz de Drive y agrega documentos nuevos al indice.
- Publica endpoints:
  - `?format=json`
  - `?format=csv`

## Instalacion manual

1. Ve a <https://script.google.com/>.
2. Crea un proyecto nuevo llamado `PEC Drive Loader`.
3. Copia `Code.gs`, `Index.html` y `appsscript.json` en el proyecto.
4. Guarda.
5. Ejecuta `setupEnvironment` una vez y autoriza permisos.
6. Despliega como `Web app`:
   - Execute as: `Me`
   - Who has access: `Anyone with the link` o el nivel que prefieras.
7. Abre la URL del Web App.
8. Usa los botones para crear estructura y escanear Drive.
9. Copia la URL con `?format=json` o `?format=csv` y pegala en el panel GitHub Pages.

## Flujo de trabajo recomendado

1. Sube carpetas y documentos a `PEC - Programa Economia Circular`.
2. Ejecuta `Escanear Drive y actualizar indice`.
3. Revisa y completa metadatos en `PEC_indice_maestro`.
4. Abre el panel `https://dpardave-byte.github.io/PEC/`.
5. Pega el endpoint JSON/CSV de Apps Script en el campo de fuente.

## Nota

Este proyecto debe ejecutarse dentro de tu cuenta Google para poder crear carpetas reales en tu Drive. Codex no tiene en esta sesion un conector de Drive autenticado para hacerlo directamente.
