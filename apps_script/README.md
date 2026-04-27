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
  - `?view=visor` para el visor compartido de seguimiento
  - `?action=visor_state&format=json` para diagnostico del estado compartido

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
12. Para usar el visor compartido, abre la misma URL del Web App con `?view=visor`.
13. Si quieres habilitar auditoria de administrador por correo, agrega en `Script Properties`:

   ```text
   PEC_VISOR_ADMIN_EMAILS=darwin@dominio.com;otro@dominio.com
   ```

   El backend compartido guardara:
   - estado central del visor
   - bitacora compartida de cambios
   - backup diario JSON en Drive

## Visor compartido PEC

El visor compartido usa la misma Web App, pero en la vista:

```text
.../exec?view=visor
```

En ese modo:

- la fuente visual sigue siendo el mismo visor PEC;
- los cambios se guardan en un estado central JSON en Drive;
- la auditoria compartida se guarda en un archivo separado;
- el backup diario se guarda en la carpeta `backups`;
- el refresco es periodico, no tiempo real real.

### Donde se guarda cada cosa

Dentro de la carpeta de backend `\_VisorSeguimientoPEC` se crean o reutilizan:

- `shared_tracking_state.json`: ultimo estado compartido del visor
- `shared_tracking_audit.json`: bitacora compartida de cambios
- `backups/shared_tracking_backup_YYYYMMDD.json`: backup diario

### Modo local vs modo compartido

- `file:///.../visor_seguimiento_pec.html`
  - funciona solo con almacenamiento local del navegador;
  - sirve para pruebas, preparacion y trabajo individual;
  - el modo admin local no es seguridad real.

- `.../exec?view=visor`
  - usa Apps Script y Drive como backend compartido;
  - muestra estado de sincronizacion, ultimo guardado central y ultimo backup;
  - refresca el estado compartido cada 30 segundos cuando el backend responde.

### Administradores

Para habilitar privilegios administrativos reales en Apps Script, define en `Script Properties`:

```text
PEC_VISOR_ADMIN_EMAILS=darwin@dominio.com;otro@dominio.com
```

Los administradores pueden:

- ver la auditoria compartida;
- exportar la auditoria cargada en el panel admin;
- descargar el backup mas reciente del estado compartido;
- ver quien guardo y cuando se actualizo el backend.

### Si se danan los datos compartidos

1. Abre el folder `\_VisorSeguimientoPEC` en Drive.
2. Revisa `shared_tracking_state.json`.
3. Contrasta con el ultimo archivo en `backups/`.
4. Exporta primero una copia manual antes de restaurar cualquier contenido.
5. Si vas a reponer el estado, hazlo de forma guiada y nunca sobrescribas sin respaldo.

### Importacion y estructura

- `Leer Excel o CSV` actualiza el payload operativo.
- `Leer estructura` aplica una estructura exportada por el visor.
- Ambos flujos recalculan Gantt, KPIs, analitica, filtros, reporte ejecutivo y catalogos globales.
- Si faltan columnas obligatorias o el formato no corresponde, el visor muestra un mensaje claro al usuario.

### Limitaciones

- Apps Script no ofrece colaboracion en tiempo real real en este visor; se usa polling de 30 segundos.
- Si dos usuarios editan al mismo tiempo, el backend detecta conflicto basico por revision y evita sobrescribir silenciosamente la version mas reciente.
- Si el backend no responde, el visor mantiene fallback local y lo informa en el estado de la fuente.

## Flujo de trabajo recomendado

1. Sube carpetas y documentos a `PEC - Programa Economia Circular`.
2. Ejecuta `Escanear Drive y actualizar indice`.
3. Revisa y completa metadatos en `PEC_indice_maestro`.
4. Abre el panel `https://dpardave-byte.github.io/PEC/`.
5. Pega el endpoint JSON/CSV de Apps Script en el campo de fuente.
6. Para analisis con IA, primero confirma que el despliegue de Apps Script sea una version nueva y que `OPENAI_API_KEY` y `PEC_AI_TOKEN` esten configurados.
7. Para el visor compartido, usa siempre la URL del Web App con `?view=visor` y no el archivo local `file:///`.

## Nota

Este proyecto debe ejecutarse dentro de tu cuenta Google para poder crear carpetas reales en tu Drive. Codex no tiene en esta sesion un conector de Drive autenticado para hacerlo directamente.
