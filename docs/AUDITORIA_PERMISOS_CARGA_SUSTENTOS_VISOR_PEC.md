# Auditoría de permisos y carga de sustentos - Visor PEC

## Resumen ejecutivo

La estrategia vigente del Visor PEC cambió de una clasificación fina por subroles operativos a un modelo de doble canal:

- una `URL de trabajo` para operación DGPPCS, con edición compartida, creación, carga documental y retiro documental;
- una `URL pública de consulta`, estrictamente de solo lectura, sincronizada contra el mismo estado compartido.

En este modelo, `?actor=` sigue sin conceder admin ni permisos sensibles. La URL pública no puede mutar aunque se manipule la UI. La URL de trabajo conserva auditoría y ahora debe mantener snapshots versionados previos a mutaciones críticas para permitir rollback por administrador.

La separación entre admin y operación cambia así:

- el trabajo diario ya no se bloquea por subroles finos PMO, operador documental o auditor dentro del canal de trabajo;
- el administrador sigue siendo un rol especial solo para rollback, centro operativo sensible, auditoría sensible, publicación y funciones institucionales equivalentes.

La brecha más seria pasa a ser asegurar que:

1. la URL pública permanezca realmente en solo lectura;
2. el canal de trabajo conserve trazabilidad completa;
3. los snapshots y el rollback no rompan concurrencia ni auditoría.

## Estado vigente del modelo auditado

### Canal de trabajo

- permite edición compartida;
- permite carga y retiro documental;
- mantiene auditoría;
- prepara snapshots antes de mutaciones críticas;
- no concede admin por URL.

### Canal público

- solo lectura;
- mismo dataset compartido;
- sin edición;
- sin creación ni eliminación;
- sin carga ni retiro documental;
- sin centro operativo sensible;
- sin rollback.

### Tipificación documental mínima

La carga múltiple debe aceptar al menos:

- `Informe`
- `Oficio`
- `Acta`
- `Convenio`
- `Evidencia`
- `Norma`
- `Ficha técnica`
- `Resolución Ministerial`
- `Resolución Directoral`
- `Decreto Supremo`
- `Expediente técnico`
- `Otro`

### Actualización de fase analítica mínima

La versión vigente ya cerró una parte de las brechas documentales que en este mismo documento aparecen como riesgos históricos:

- existe inventario exportable de sustentos por archivo y por caso;
- existe clasificación documental mínima canónica;
- existe score de completitud documental por registro;
- existen brechas documentales explícitas y agregados por tipo documental, responsable, seguimiento DGPPCS y bloque raíz.

Por eso, los hallazgos posteriores que indiquen "no existe inventario", "falta clasificación mínima" o "falta score documental" deben interpretarse como diagnóstico previo a esta actualización.

## Alcance

Esta auditoría cubre:

- visor público/local;
- visor compartido Apps Script;
- panel admin;
- backend de estado compartido, auditoría y carga de sustentos;
- permisos de usuario relacionados con:
  - ver;
  - editar;
  - cargar sustento;
  - retirar sustento;
  - ver auditoría;
  - administrar operación.

No cubre:

- despliegue o push;
- reconfiguración efectiva de permisos Drive en producción;
- cambios de lógica funcional fuera de permisos y sustentos.

## Base de evidencia

Esta auditoría cruza dos fuentes:

1. Evidencia visual previamente validada:
   - `?view=visor` abre el visor compartido.
   - `?actor=` no concede admin.
   - el centro de control operativo existe y aparece al abrir correctamente el modal admin con cuenta admin real.

2. Código actual del repositorio local:
   - [apps_script/Code.gs](/C:/Users/Dpard/OneDrive/Escritorio/EC/PEC_repo_limpio/apps_script/Code.gs:1291)
   - [apps_script/Visor.html](/C:/Users/Dpard/OneDrive/Escritorio/EC/PEC_repo_limpio/apps_script/Visor.html:3080)
   - [visor_seguimiento_pec.html](/C:/Users/Dpard/OneDrive/Escritorio/EC/PEC_repo_limpio/visor_seguimiento_pec.html:3080)

Nota de control:

- el repositorio local está `ahead 2` respecto de `origin/main`;
- por tanto, esta auditoría describe el **estado actual del código local** y no asume automáticamente que todo ya esté desplegado en el Web App productivo.

## Metodología LEGEND

### Visionary
- Define el criterio institucional:
  - la carga documental no debe ser pública ni anónima;
  - debe ser operativa, trazable y sostenible.

### Architect
- Revisa la separación entre:
  - modo local;
  - modo compartido;
  - actor declarado;
  - correo verificado;
  - operativo;
  - admin.

### Security & Permissions Lead
- Audita:
  - `Session.getActiveUser()`;
  - `PEC_VISOR_ADMIN_EMAILS`;
  - `PEC_VISOR_OPERATIONAL_EMAILS`;
  - rutas backend de mutación y auditoría.

### Documentary Intelligence Lead
- Revisa:
  - carga múltiple;
  - carpeta por registro;
  - retiro de archivo;
  - persistencia de metadata;
  - riesgo de pérdida documental.

### PMO Analyst
- Evalúa si el flujo permite operación diaria sin convertir a todos los usuarios en administradores.

### UX Operational Lead
- Revisa claridad de mensajes para:
  - usuario estándar;
  - actor declarado por URL;
  - usuario verificado sin permiso operativo;
  - operador verificado;
  - admin.

### QA Lead
- Diseña escenarios por perfil y marca como limitación esperada la caída a login Google en pruebas automatizadas del Web App compartido.

### Red Team Critic
- Busca:
  - suplantación;
  - carga anónima;
  - fuga de metadata o URLs;
  - pérdida de evidencia;
  - inconsistencia con permisos Drive.

### LEGEND Orchestrator
- Integra hallazgos y separa:
  - funcionalidad actual verificada;
  - brecha;
  - recomendación;
  - inferencia estratégica.

## Funcionalidad actual verificada

### Identidad y permisos

- `?view=visor` abre el visor compartido Apps Script.
- `?actor=correo` sirve para declarar actor, pero no concede admin ni permisos operativos de mutación.
- El backend resuelve permisos en `resolveSharedTrackingPermissionContext_()` con estas reglas:
  - admin real:
    - correo verificado;
    - incluido en `PEC_VISOR_ADMIN_EMAILS`;
  - operativo:
    - correo verificado;
    - incluido en `PEC_VISOR_OPERATIONAL_EMAILS` o heredado por lista admin;
  - viewer verificado:
    - correo verificado, pero sin permiso operativo;
  - viewer declarado:
    - actor solo declarado por URL.

Referencias:

- [resolveSharedTrackingPermissionContext_()](/C:/Users/Dpard/OneDrive/Escritorio/EC/PEC_repo_limpio/apps_script/Code.gs:5163)
- [getSharedTrackingAdminEmailList_()](/C:/Users/Dpard/OneDrive/Escritorio/EC/PEC_repo_limpio/apps_script/Code.gs:4495)
- [getSharedTrackingOperationalEmailList_()](/C:/Users/Dpard/OneDrive/Escritorio/EC/PEC_repo_limpio/apps_script/Code.gs:4500)

### Carga y retiro de sustentos

- La carga se guarda en Google Drive, en carpeta backend y carpeta por registro.
- El registro guarda metadata de sustento en el estado compartido:
  - id;
  - nombre;
  - mime type;
  - tamaño;
  - fileId;
  - url;
  - fecha de carga;
  - actor de carga.
- El retiro envía el archivo a papelera de Drive y elimina su referencia del registro.
- Ambas acciones dejan auditoría.

Referencias:

- [uploadSharedTrackingAttachments()](/C:/Users/Dpard/OneDrive/Escritorio/EC/PEC_repo_limpio/apps_script/Code.gs:1354)
- [ensureSharedTrackingAttachmentFolder()](/C:/Users/Dpard/OneDrive/Escritorio/EC/PEC_repo_limpio/apps_script/Code.gs:1485)
- [deleteSharedTrackingAttachment()](/C:/Users/Dpard/OneDrive/Escritorio/EC/PEC_repo_limpio/apps_script/Code.gs:1549)
- [buildSharedTrackingAttachmentAuditEntry_()](/C:/Users/Dpard/OneDrive/Escritorio/EC/PEC_repo_limpio/apps_script/Code.gs:5327)

### Auditoría sensible

- La auditoría detallada backend ahora es admin-only.
- Si un no-admin intenta verla, el backend devuelve rechazo y registra intento bloqueado.

Referencia:

- [getSharedTrackingAudit()](/C:/Users/Dpard/OneDrive/Escritorio/EC/PEC_repo_limpio/apps_script/Code.gs:1627)

### UX actual de permisos

- El frontend muestra estados distintos de permiso:
  - modo local;
  - admin;
  - operador verificado;
  - usuario verificado sin permiso operativo;
  - actor declarado por URL;
  - usuario estándar.

Referencias:

- [getCurrentPermissionState()](/C:/Users/Dpard/OneDrive/Escritorio/EC/PEC_repo_limpio/apps_script/Visor.html:3080)
- [renderCaseAttachments()](/C:/Users/Dpard/OneDrive/Escritorio/EC/PEC_repo_limpio/apps_script/Visor.html:7860)

## Respuesta a la auditoría principal

### ¿Quién puede cargar archivos hoy?

En el código actual del repositorio local:

- sí pueden cargar:
  - admin real;
  - usuario operativo con correo verificado y autorizado;
- no pueden cargar:
  - actor declarado por URL sin correo verificado;
  - usuario verificado sin permiso operativo;
  - usuario estándar sin sesión verificada;
  - modo local standalone.

Conclusión:

- la carga ya **no** está limitada solo a administradores;
- la carga ya **no** depende solo de `?actor=`;
- la carga sí depende de:
  - Apps Script compartido;
  - correo verificado;
  - rol operativo o admin;
  - y luego, para abrir archivos o carpetas, de permisos Drive.

### ¿Qué pasa si el usuario no está identificado?

- la mutación se bloquea;
- el backend devuelve envelope de permiso denegado;
- si existe identidad parcial o declarada, deja auditoría del intento bloqueado.

### ¿Qué pasa si dos usuarios cargan al mismo registro?

- ambos archivos pueden crearse en Drive;
- pero el estado compartido de `attachments` se escribe sin control de revisión equivalente al guardado general;
- eso abre riesgo de que una operación sobrescriba la referencia de otra en el JSON compartido.

Conclusión:

- existe riesgo de pérdida de referencia documental por concurrencia;
- el archivo físico puede seguir en Drive, pero el visor puede dejar de listarlo si la metadata fue pisada.

## Hallazgos

### Hallazgo 1 - La separación entre admin y operativo ya existe

Funcionalidad verificada:

- `PEC_VISOR_OPERATIONAL_EMAILS` ya existe como lista separada.
- `canEditShared` y `canManageAttachments` dependen de rol admin u operativo.

Brecha:

- esta separación existe en código, pero no estaba reflejada en la auditoría previa ni en toda la documentación operativa.

Recomendación:

- documentar oficialmente el rol operativo como rol institucional mínimo.

Inferencia estratégica:

- el visor ya dejó de ser “admin-only para operar” y está más cerca de un modelo multiusuario controlado.

### Hallazgo 2 - `?actor=` ya no permite mutaciones compartidas

Funcionalidad verificada:

- el actor declarado por URL queda como `declared_viewer`;
- no puede editar ni gestionar sustentos.

Brecha:

- aún puede quedar confusión de usuario porque la identidad declarada sigue visible y algunos usuarios pueden asumir que eso basta para operar.

Recomendación:

- reforzar mensajes de bloqueo y manual operativo por perfil.

Inferencia estratégica:

- la brecha crítica previa de “operación por URL” quedó cerrada en código local.

### Hallazgo 3 - La auditoría sensible está protegida, pero la metadata documental visible sigue amplia

Funcionalidad verificada:

- la auditoría detallada es admin-only.
- la ficha sigue mostrando la lista sincronizada de sustentos si ya existen:
  - nombre;
  - tamaño;
  - tipo;
  - fecha;
  - actor;
  - botón de apertura si hay URL.

Brecha:

- la metadata y el enlace pueden quedar visibles para usuarios sin permiso documental, aunque la apertura real del archivo dependa luego de Drive.

Recomendación:

- decidir institucionalmente si:
  - todos los lectores pueden ver metadata documental;
  - o si la lista de sustentos debe limitarse por rol.

Inferencia estratégica:

- hoy el modelo es más permisivo para consulta documental que para mutación documental.

### Hallazgo 4 - El mayor riesgo real es la concurrencia documental

Funcionalidad verificada:

- `saveSharedTrackingState()` sí maneja conflicto por revisión.
- `uploadSharedTrackingAttachments()`, `ensureSharedTrackingAttachmentFolder()` y `deleteSharedTrackingAttachment()` no usan el mismo control de revisión.

Brecha:

- operaciones simultáneas pueden pisar metadata documental del mismo registro.

Recomendación:

- introducir `LockService` o chequeo de revisión/merge para operaciones de sustento.

Inferencia estratégica:

- el problema ya no es identidad débil; es consistencia transaccional del repositorio documental por registro.

## Brechas por severidad

### Críticas

- Posible pérdida de referencia documental por concurrencia en:
  - carga de sustento;
  - preparación de carpeta;
  - retiro de sustento.
- El estado JSON de sustentos puede quedar desalineado respecto a Drive si dos mutaciones ocurren sobre la misma ficha al mismo tiempo.

### Altas

- La visibilidad de metadata/URL de sustento para perfiles solo lectores requiere decisión explícita; hoy puede ser más amplia que la política deseada.
- No existe inventario exportable de sustento por caso.
- No existe clasificación documental mínima obligatoria.
- La documentación operativa todavía no refleja por completo el modelo `operativo != admin`.

### Medias

- Falta estado visible `sin sustento` en la lectura ejecutiva general.
- Falta score de completitud documental por registro.
- Falta último actor / último cambio documental visible de forma más directa en la ficha.

### Bajas

- Algunos textos aún pueden simplificarse más.
- Se puede reforzar ayuda contextual en modo local vs compartido.

## Riesgos

### Seguridad

- `?actor=` ya no escala privilegios sensibles, lo cual es correcto.
- El riesgo actual está en exponer metadata o URLs documentales más allá de lo que la política institucional quiera permitir.

### Trazabilidad

- La carga y el retiro sí registran actor, fecha, registro y acción.
- La reversión sigue siendo manual:
  - papelera de Drive;
  - backup compartido;
  - auditoría del día.

### Operación

- si `PEC_VISOR_OPERATIONAL_EMAILS` no está bien configurado, usuarios operativos verificados quedarán solo en lectura.
- si Drive restringe archivo/carpeta, el visor puede mostrarlo pero la apertura fallará fuera del control del frontend.

## Recomendaciones

### A. Sin cambio de código

- validar `PEC_VISOR_ADMIN_EMAILS`;
- validar `PEC_VISOR_OPERATIONAL_EMAILS`;
- confirmar cuenta Google real de cada operador;
- validar permisos Drive de carpeta raíz y carpetas por registro;
- documentar protocolo de:
  - carga;
  - retiro;
  - revisión de auditoría;
  - recuperación manual.

### B. Cambio mínimo seguro

- decidir si la lista de sustentos y sus URLs deben seguir visibles para lectores;
- si no, ocultar o degradar esa visibilidad por rol;
- agregar señal más visible de:
  - `sin sustento`;
  - `último actor`;
  - `último cambio documental`.

### C. Cambio estructural futuro

- inventario exportable de sustentos por caso;
- clasificación documental mínima;
- score de completitud documental;
- filtro de auditoría por documento, actor y registro;
- reversión guiada desde auditoría.

## Pruebas recomendadas

### Admin real
- abrir panel admin;
- ver centro operativo;
- cargar sustento;
- retirar sustento;
- ver auditoría detallada.

### Operativo no admin
- editar ficha;
- cargar sustento;
- preparar carpeta;
- retirar sustento;
- confirmar que no puede configurar correos ni triggers.

### Usuario verificado sin permiso operativo
- ver ficha;
- ver lista de sustentos sincronizada;
- confirmar bloqueo de edición y carga.

### Actor declarado por URL
- abrir con `?actor=...`;
- confirmar identidad declarada;
- confirmar bloqueo de edición, carga, carpeta y retiro.

### Sin sesión Google
- confirmar lectura;
- confirmar bloqueo de mutaciones.

### Concurrencia
- dos usuarios operativos sobre el mismo registro:
  - subir casi en paralelo;
  - retirar mientras otro sube;
  - revisar si la lista final conserva ambos archivos o pierde referencias.

## Decisión LEGEND-PEC

Estado del código local:

- separación admin / operativo: correcta;
- bloqueo de mutación por `?actor=`: correcto;
- auditoría sensible admin-only: correcta;
- concurrencia documental: insuficiente.

Decisión:

- **OK parcial**.
- El modelo de permisos ya es razonable.
- La siguiente prioridad técnica debe ser blindar la concurrencia de sustentos y decidir la política de visibilidad documental para lectores.
