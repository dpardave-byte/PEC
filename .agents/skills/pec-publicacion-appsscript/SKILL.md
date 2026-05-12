# pec-publicacion-appsscript

## Propósito

Esta skill gobierna la publicación segura del Visor PEC en Google Apps Script.

Su objetivo es evitar desalineaciones entre el repositorio GitHub, GitHub Pages y el Web App compartido de Apps Script.

Debe usarse cada vez que se vaya a:

- copiar `Code.gs` desde el repo local a Apps Script;
- copiar `Visor.html` desde el repo local a Apps Script;
- revisar `appsscript.json`;
- crear una nueva versión del Web App;
- actualizar una implementación existente;
- validar `?view=visor`;
- validar permisos reales por cuenta Google;
- revisar Script Properties;
- evitar envíos reales accidentales;
- recrear triggers;
- preparar rollback.

---

## Cuándo usar esta skill

Usar esta skill cuando el usuario pida:

- publicar Apps Script;
- actualizar el Web App;
- llevar cambios de GitHub a Apps Script;
- sincronizar `Code.gs` y `Visor.html`;
- validar despliegue compartido;
- revisar si Apps Script quedó con versión antigua;
- validar que `?view=visor` abre el visor y no el Drive Loader;
- validar actor, correo verificado y admin real;
- configurar o revisar triggers;
- revisar modo REAL, TEST o PREVIEW;
- preparar rollback de Apps Script;
- hacer checklist post-deploy.

No usar esta skill para:

- rediseñar el visor;
- cambiar permisos sin coordinar con `pec-permisos-roles-operativos`;
- cambiar sustentos sin coordinar con `pec-sustentos-documentales`;
- cambiar concurrencia sin coordinar con `pec-concurrencia-estado-compartido`;
- cambiar reportes sin coordinar con `pec-reportes-inventarios`;
- hacer push a GitHub sin autorización;
- desplegar Apps Script sin validación previa.

---

## Contexto del proyecto

Repositorio esperado:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio

No trabajar en:

C:\Users\Dpard\Documents\Master\Liderazgo\tools\transcriptor360-studio

Archivos principales:

- apps_script/Code.gs
- apps_script/Visor.html
- apps_script/appsscript.json
- visor_seguimiento_pec.html
- README.md
- CHECKLIST_OPERATIVO_VISOR_PEC.md

Superficies del sistema:

1. GitHub Pages:
   - visor público/local.
2. Apps Script Web App:
   - visor compartido real.
3. Apps Script Backend:
   - Drive;
   - Sheets;
   - estado compartido;
   - auditoría;
   - backup;
   - correos;
   - triggers;
   - permisos por sesión Google.
4. Google Drive:
   - archivos de sustentos;
   - estado compartido;
   - auditorías;
   - backups.

---

## Regla central

GitHub Pages y Apps Script no se actualizan igual.

`git push origin main` actualiza el repositorio y GitHub Pages, pero no actualiza automáticamente el Web App de Apps Script.

Para actualizar el visor compartido real hay que copiar manualmente o sincronizar:

- `apps_script/Code.gs`
- `apps_script/Visor.html`

y luego crear o actualizar una versión del despliegue Web App.

---

## Principios obligatorios

### 1. No publicar con archivos incompletos

Nunca desplegar Apps Script si no se confirma que:

- `Code.gs` local está completo;
- `Visor.html` local está completo;
- ambos fueron copiados completos al editor Apps Script;
- se guardaron los cambios;
- se creó nueva versión del despliegue.

---

### 2. No confundir guardar con desplegar

Guardar en Apps Script no basta.

Se debe:

1. Guardar `Code.gs`.
2. Guardar `Visor.html`.
3. Ir a `Implementar`.
4. Ir a `Administrar implementaciones`.
5. Editar implementación.
6. Seleccionar `Nueva versión`.
7. Implementar.

Si no se crea nueva versión, el Web App puede seguir sirviendo código anterior.

---

### 3. No probar envíos reales accidentalmente

Antes de presionar cualquier botón de envío, revisar:

- modo actual;
- destinatarios;
- confirmación REAL;
- lista de pruebas;
- hora;
- trigger;
- actor/admin.

No presionar:

- Enviar recordatorio ahora;
- Enviar resumen ahora;
- Enviar alertas ahora;

si el modo está en `REAL` y no se desea enviar correo real.

---

### 4. `?actor=` no reemplaza sesión verificada

Validar siempre:

- actor declarado;
- correo verificado;
- rol actual;
- admin real.

`?actor=correo` no concede admin ni permisos operativos.

---

### 5. Mantener rollback listo

Antes de publicar una nueva versión, identificar:

- versión anterior estable;
- cambios incluidos;
- forma de volver a la versión previa;
- pruebas mínimas para confirmar rollback.

---

## Archivos a copiar

### Backend

Copiar completo:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio\apps_script\Code.gs

A Apps Script:

- archivo `Code.gs`

### Frontend compartido

Copiar completo:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio\apps_script\Visor.html

A Apps Script:

- archivo `Visor.html`

### Manifest

Revisar solo si hay cambios de permisos/scopes:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio\apps_script\appsscript.json

No modificar `appsscript.json` salvo necesidad clara.

---

## Scopes esperados

El manifest debe incluir, según necesidad del visor:

- Drive;
- Sheets;
- envío de correo;
- userinfo.email;
- script external request si aplica;
- script properties si aplica mediante servicios estándar.

Scopes típicos:

- https://www.googleapis.com/auth/drive
- https://www.googleapis.com/auth/spreadsheets
- https://www.googleapis.com/auth/script.send_mail
- https://www.googleapis.com/auth/userinfo.email

No agregar scopes innecesarios.

---

## Script Properties críticas

Antes o después del despliegue, revisar sin imprimir secretos completos:

### Roles

- PEC_VISOR_ADMIN_EMAILS
- PEC_VISOR_DOCUMENT_OPERATOR_EMAILS
- PEC_VISOR_PMO_EMAILS
- PEC_VISOR_AUDITOR_EMAILS
- PEC_VISOR_OPERATIONAL_EMAILS

### Correos y reportes

- PEC_VISOR_DAILY_REPORT_MODE
- PEC_VISOR_DAILY_REPORT_CONFIRM_REAL_SEND
- PEC_VISOR_DAILY_REPORT_TO
- PEC_VISOR_DAILY_REPORT_CC
- PEC_VISOR_DAILY_REPORT_TEST_TO
- PEC_VISOR_ADMIN_SUMMARY_HOUR
- PEC_VISOR_NOTIFY_EMAILS_JSON
- PEC_VISOR_NOTIFY_DGPPCS_EMAILS

### Recursos

- PEC_LOADER_ROOT_FOLDER_ID
- PEC_LOADER_SPREADSHEET_ID

### IA si aplica

- OPENAI_API_KEY
- OPENAI_MODEL
- PEC_AI_TOKEN

No mostrar valores sensibles completos.

---

## Validaciones previas al despliegue

Antes de copiar a Apps Script:

1. Confirmar repo:

git status --short

2. Confirmar último commit:

git log --oneline -5

3. Confirmar que `Code.gs` contiene cambios esperados.

Ejemplos de búsqueda:

- resolveSharedTrackingPermissionContext_
- uploadSharedTrackingAttachments
- withSharedTrackingAttachmentMutationLock_
- getSharedTrackingAdminExecutiveSummaryStatus
- runNightlyAdminExecutiveSummaryEmail_
- adminSummarySendHour

4. Confirmar que `Visor.html` contiene cambios esperados.

Ejemplos de búsqueda:

- Recordatorio operativo matutino
- Resumen ejecutivo nocturno admin
- adminNightlySummary
- canRemoveAttachments
- describeCurrentAttachmentPermissionSummary
- Operador documental
- Responsable PMO

5. Confirmar que `appsscript.json` no requiere cambios.

---

## Checklist de publicación manual

### Paso 1 — Copiar backend

1. Abrir local `apps_script/Code.gs`.
2. Seleccionar todo.
3. Copiar.
4. Abrir Apps Script.
5. Abrir `Code.gs`.
6. Seleccionar todo.
7. Pegar.
8. Guardar.

### Paso 2 — Copiar frontend

1. Abrir local `apps_script/Visor.html`.
2. Seleccionar todo.
3. Copiar.
4. Abrir Apps Script.
5. Abrir `Visor.html`.
6. Seleccionar todo.
7. Pegar.
8. Guardar.

### Paso 3 — Revisar manifest

1. Abrir `appsscript.json`.
2. Confirmar scopes.
3. No cambiar si no es necesario.
4. Guardar solo si hubo cambios.

### Paso 4 — Crear nueva versión

1. Ir a `Implementar`.
2. Seleccionar `Administrar implementaciones`.
3. Editar la implementación Web App.
4. En versión, seleccionar `Nueva versión`.
5. Escribir descripción.
6. Implementar.

### Paso 5 — Abrir Web App

Abrir:

.../exec?view=visor&actor=correo

Validar que abre el visor y no el Drive Loader.

---

## Validación post-despliegue

### Carga básica

Validar:

- `?view=visor` abre visor;
- no abre Drive Loader;
- no aparece pantalla antigua;
- no faltan estilos;
- no hay errores visuales graves.

### Identidad

Validar:

- actor visible;
- correo verificado;
- actor declarado por URL;
- rol actual;
- admin real si corresponde.

### Panel admin

Validar:

- centro de control operativo;
- recordatorio matutino;
- resumen nocturno admin;
- auditoría;
- backup;
- triggers;
- destinatarios.

### Sustentos

Validar:

- carga de archivo;
- carpeta por registro;
- retiro;
- auditoría;
- feedback de permisos;
- no mutación con `?actor=` sin sesión verificada.

### Roles

Validar con cuentas reales:

- admin;
- PMO;
- operador documental;
- auditor;
- lector;
- actor URL.

### Triggers y correos

Validar sin enviar accidentalmente:

- modo;
- destinatarios;
- confirmación REAL;
- trigger matutino;
- resumen nocturno;
- alertas DGPPCS.

No ejecutar envíos reales salvo autorización explícita.

---

## Rollback

Si falla el despliegue:

1. Volver a `Administrar implementaciones`.
2. Editar implementación.
3. Seleccionar versión anterior estable.
4. Implementar.
5. Abrir Web App.
6. Confirmar recuperación.
7. Registrar causa del rollback.

Rollback también puede incluir:

- restaurar `Code.gs`;
- restaurar `Visor.html`;
- eliminar triggers nuevos si fueron creados por error;
- restaurar Script Properties si fueron modificadas.

---

## Riesgos críticos

Clasificar como crítico si ocurre:

- Web App sirve versión antigua después de deploy;
- `Code.gs` y `Visor.html` están desalineados;
- se envía correo real accidentalmente;
- `?actor=` concede permisos;
- admin no es reconocido con correo verificado;
- los triggers se duplican;
- se pierde acceso al visor compartido;
- se rompe carga de sustentos;
- se rompe guardado compartido;
- se rompe auditoría o backup.

---

## Riesgos altos

Clasificar como alto si ocurre:

- GitHub Pages actualizado pero Apps Script no;
- Apps Script actualizado pero sin nueva versión;
- roles no coinciden con Script Properties;
- hora de trigger vuelve a valor antiguo;
- frontend muestra etiquetas antiguas;
- usuarios no admin ven centro operativo;
- auditor no puede ver auditoría;
- PMO no puede cargar o editar;
- operador documental no puede cargar.

---

## Validaciones técnicas sugeridas

Antes de recomendar cierre:

- `git status --short`;
- `git log --oneline -5`;
- revisión visual de Web App;
- prueba con `?view=visor`;
- prueba con `?view=visor&actor=...`;
- confirmación de correo verificado;
- revisión de Script Properties;
- revisión de triggers existentes;
- prueba de rol admin;
- prueba de rol no admin;
- prueba de carga de sustento;
- prueba de rollback documental si aplica.

---

## Entregables obligatorios

Toda respuesta usando esta skill debe incluir:

1. Resumen ejecutivo.
2. Estado del repositorio.
3. Último commit confirmado.
4. Archivos que deben copiarse.
5. Checklist de publicación.
6. Script Properties a revisar.
7. Validaciones post-despliegue.
8. Riesgos críticos.
9. Riesgos altos.
10. Plan de rollback.
11. Pruebas por rol.
12. Decisión:
    - listo para publicar;
    - listo con advertencias;
    - no publicar;
    - requiere corrección;
    - no verificable.
13. Prompt recomendado para la siguiente fase.

---

## Criterio de éxito

La skill cumple su propósito si:

- Code.gs y Visor.html se copian completos;
- se guarda el proyecto Apps Script;
- se crea nueva versión del Web App;
- `?view=visor` abre el visor compartido;
- actor/correo/rol se muestran correctamente;
- no se envían correos reales por accidente;
- los triggers quedan en horarios esperados;
- los roles operan según matriz;
- carga/retiro de sustentos funciona;
- auditoría y backup siguen operativos;
- existe rollback claro;
- no se hace push, commit o deploy sin autorización.
