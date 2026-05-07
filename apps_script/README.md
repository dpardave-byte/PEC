# Apps Script - PEC Drive Loader y Visor PEC Compartido

Este proyecto Apps Script hoy publica dos superficies distintas:

- `PEC Drive Loader`, para crear estructura en Drive, mantener el indice maestro y exponer endpoints `json/csv`.
- `Visor PEC Compartido`, para seguimiento operativo con estado centralizado, auditoria, backup y panel administrador.

Ambas conviven en la misma Web App, pero deben entenderse como componentes funcionales diferentes.

## Dos superficies publicadas desde el mismo Apps Script

- `.../exec`
  - muestra la interfaz `PEC Drive Loader`.
- `.../exec?format=json`
  - expone el endpoint JSON compatible con el panel GitHub Pages.
- `.../exec?format=csv`
  - expone el endpoint CSV compatible con el panel GitHub Pages.
- `.../exec?view=visor`
  - abre el `Visor PEC Compartido`.
- `.../exec?action=visor_state&format=json`
  - expone diagnostico del estado compartido del visor.

## Que hace el PEC Drive Loader

- Crea la carpeta raiz `PEC - Programa Economia Circular`.
- Crea subcarpetas para donacion, efectividad, Puno, Lima, comparacion tecnologica y evidencias.
- Crea un spreadsheet `PEC_indice_maestro` y trabaja sobre la pestaña `indice`.
- Puede insertar filas base de ejemplo si el indice esta vacio y la siembra fue habilitada explicitamente.
- Escanea la carpeta raiz de Drive y agrega documentos nuevos al indice.

## Que hace el Visor PEC Compartido

- Publica `?view=visor` para el seguimiento compartido.
- Guarda estado centralizado en Drive.
- Mantiene auditoria y backup diario.
- Expone acciones y endpoints auxiliares del visor.
- Soporta cierre diario por usuario, entrega diaria y correos operativos.
- Puede convivir con el loader en el mismo despliegue sin que eso implique que sean el mismo producto.

## Instalacion manual

1. Ve a <https://script.google.com/>.
2. Crea un proyecto nuevo llamado `PEC Drive Loader`.
3. Copia `Code.gs`, `Index.html` y `appsscript.json` en el proyecto.
4. Guarda.
5. Ejecuta `setupEnvironment` una vez y autoriza permisos.
   - Este paso crea la estructura base.
   - Las filas de ejemplo del indice ahora son opcionales y vienen desactivadas por defecto.
   - Si quieres habilitarlas temporalmente, usa `setLoaderSeedExampleRows(true)` o define `PEC_LOADER_SEED_EXAMPLE_ROWS=true` en `Script Properties`.
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
   - Si la abres sin `?view=visor`, veras la interfaz del `PEC Drive Loader`.
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

14. Si quieres fijar de forma determinista la carpeta y el spreadsheet del loader, define en `Script Properties`:

   ```text
   PEC_LOADER_ROOT_FOLDER_ID=<folderId>
   PEC_LOADER_SPREADSHEET_ID=<spreadsheetId>
   ```

   Tambien puedes usar en el editor:

   ```javascript
   setLoaderResourceIds('folderId', 'spreadsheetId')
   ```

## Visor compartido PEC

El visor compartido usa la misma Web App, pero en la vista:

```text
.../exec?view=visor
```

Para el visor web publicado por GitHub Pages, la URL esperada es:

```text
https://dpardave-byte.github.io/PEC/visor_seguimiento_pec.html
```

Si el navegador mantiene una versión anterior, usar:

```text
https://dpardave-byte.github.io/PEC/visor_seguimiento_pec.html?v=<commit>
```

En ese modo:

- la fuente visual sigue siendo el mismo visor PEC;
- los cambios se guardan en un estado central JSON en Drive;
- la auditoria compartida se guarda en un archivo separado;
- el backup diario se guarda en la carpeta `backups`;
- el guardado compartido exige actor identificado por correo de Apps Script o por `?actor=correo@dominio`;
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
- ver el cierre diario por usuario;
- configurar desde el visor la entrega diaria por correo;
- exportar el reporte diario por usuario;
- exportar la auditoria cargada en el panel admin;
- descargar el backup mas reciente del estado compartido;
- ver quien guardo y cuando se actualizo el backend.

Checklist operativo detallado:

- [CHECKLIST_OPERATIVO_VISOR_PEC.md](/C:/Users/Dpard/OneDrive/Escritorio/EC/PEC_repo_limpio/CHECKLIST_OPERATIVO_VISOR_PEC.md)

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

## Guia de despliegue rapido del visor compartido

1. Abrir el proyecto Apps Script.
2. Actualizar `Code.gs`.
3. Crear o actualizar el archivo HTML `Visor`.
4. Pegar el contenido de `apps_script/Visor.html`.
5. Revisar que se mantenga el bootstrap:

   ```javascript
   window.PEC_SERVER_BOOTSTRAP = <?!= visorBootstrapJson ?>;
   ```

6. Configurar administradores si aplica:

   ```text
   PEC_VISOR_ADMIN_EMAILS=darwin@dominio.com;otro@dominio.com
   ```

7. Implementar como `Web App`.
8. Definir permisos de acceso del despliegue.
9. Abrir la URL `.../exec?view=visor`.
10. Validar:
    - carga inicial;
    - edición de ficha;
    - guardado compartido con actor identificado;
    - auditoría;
    - cierre diario por usuario;
    - configuración de entrega diaria desde panel admin;
    - exportación del reporte diario;
    - backup;
    - acceso admin;
    - acceso no admin.

### Reporte diario por usuario

En el panel administrador del visor compartido:

- seleccionar la fecha del cierre;
- revisar el bloque `Cierre diario por usuario`;
- confirmar actores, movimientos, impactos y registros tocados;
- revisar el bloque `Entrega del reporte diario`;
- definir destinatarios, CC, lista de pruebas, modo y hora diaria;
- guardar la configuración y activar el trigger solo cuando el envío REAL ya esté validado;
- usar `Exportar reporte diario` antes del envío operativo a DGPPCS.

Si el reporte se enviará por correo, verificar además que el Web App sea accesible para los destinatarios previstos con sus cuentas Google autorizadas.

Si el campo de destinatarios queda vacío, el backend usa como respaldo los correos de `PEC_VISOR_ADMIN_EMAILS`.

Para las alertas operativas a usuarios:

- `PEC_VISOR_NOTIFY_EMAILS_JSON` sigue siendo el mapa nombre -> correo por persona de seguimiento.
- `PEC_VISOR_NOTIFY_DGPPCS_EMAILS` permite definir un reparto colectivo para todo el equipo DGPPCS.
- El backend envía un correo individual a cada persona mapeada. Si una persona no tiene alertas directas en el corte, recibe un correo con `0 alerta(s)`.
- El consolidado DGPPCS se envía al conjunto de correos mapeados en `PEC_VISOR_NOTIFY_EMAILS_JSON`, más cualquier correo extra definido en `PEC_VISOR_NOTIFY_DGPPCS_EMAILS`.
- El destinatario operativo por defecto del consolidado sigue existiendo como respaldo adicional.

En la publicación validada en este repositorio, la URL pública responde con redirección a `accounts.google.com`, por lo que la comprobación final debe hacerse iniciando sesión con una cuenta DGPPCS autorizada.

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
