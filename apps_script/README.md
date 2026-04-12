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
  - `?action=ai&format=json` para analisis IA protegido con token

## Instalacion manual

1. Ve a <https://script.google.com/>.
2. Crea un proyecto nuevo llamado `PEC Drive Loader`.
3. Copia `Code.gs`, `Index.html` y `appsscript.json` en el proyecto.
4. Guarda.
5. Ejecuta `setupEnvironment` una vez y autoriza permisos.
6. Si vas a usar la capa IA, ejecuta una vez en el editor:

   ```javascript
   setOpenAiConfig('TU_OPENAI_API_KEY', 'gpt-5-mini', 'TU_TOKEN_PRIVADO_PEC')
   ```

   - `TU_OPENAI_API_KEY` queda guardada en `Script Properties`, no en GitHub Pages.
   - `TU_TOKEN_PRIVADO_PEC` es el token que luego pegaras en el panel con el boton `Configurar token IA`.
   - Si quieres cambiar de modelo despues, vuelve a ejecutar `setOpenAiConfig('', 'NUEVO_MODELO', '')`.

7. Despliega como `Web app`:
   - Execute as: `Me`
   - Who has access: `Anyone with the link` o el nivel que prefieras.
8. Abre la URL del Web App.
9. Usa los botones para crear estructura y escanear Drive.
10. Copia la URL con `?format=json` o `?format=csv` y pegala en el panel GitHub Pages.
11. En la pestana `Inteligencia PEC`, usa `Configurar token IA` y pega el token privado PEC.

## Flujo de trabajo recomendado

1. Sube carpetas y documentos a `PEC - Programa Economia Circular`.
2. Ejecuta `Escanear Drive y actualizar indice`.
3. Revisa y completa metadatos en `PEC_indice_maestro`.
4. Abre el panel `https://dpardave-byte.github.io/PEC/`.
5. Pega el endpoint JSON/CSV de Apps Script en el campo de fuente.
6. Para analisis con IA, primero confirma que el despliegue de Apps Script sea una version nueva y que `OPENAI_API_KEY` y `PEC_AI_TOKEN` esten configurados.

## Nota

Este proyecto debe ejecutarse dentro de tu cuenta Google para poder crear carpetas reales en tu Drive. Codex no tiene en esta sesion un conector de Drive autenticado para hacerlo directamente.
