# pec-permisos-roles-operativos

## Propósito

Esta skill gobierna el diseño, auditoría, mejora y validación del modelo de permisos y roles operativos del Visor PEC.

Su objetivo es separar claramente los perfiles de usuario, impedir que `?actor=` conceda permisos, mostrar al usuario sus permisos actuales y asegurar que cada acción sensible del visor dependa de identidad verificada y rol autorizado.

Roles mínimos:

- lector
- operador documental
- responsable PMO
- administrador
- auditor

---

## Cuándo usar esta skill

Usar esta skill cuando se requiera:

- diseñar o auditar roles del Visor PEC;
- separar permiso documental de permiso administrativo;
- verificar que `?actor=` no conceda permisos;
- mostrar el rol actual del usuario;
- mostrar si el usuario puede editar, cargar, retirar o auditar;
- revisar `Session.getActiveUser()`;
- revisar `PEC_VISOR_ADMIN_EMAILS`;
- revisar `PEC_VISOR_DOCUMENT_OPERATOR_EMAILS`;
- revisar `PEC_VISOR_PMO_EMAILS`;
- revisar `PEC_VISOR_AUDITOR_EMAILS`;
- mantener compatibilidad con `PEC_VISOR_OPERATIONAL_EMAILS`;
- auditar acceso a panel admin, auditoría, sustentos, edición compartida y centro operativo;
- mejorar mensajes UX de permisos;
- preparar pruebas por rol.

No usar esta skill para:

- rediseñar todo el visor;
- cambiar lógica documental profunda sin coordinar con `pec-sustentos-documentales`;
- resolver concurrencia de estado sin coordinar con `pec-concurrencia-estado-compartido`;
- modificar triggers, correos o backups salvo relación directa con permisos;
- conceder admin por URL;
- hacer commit, push o despliegue sin autorización.

---

## Contexto del proyecto

Repositorio esperado:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio

No trabajar en:

C:\Users\Dpard\Documents\Master\Liderazgo\tools\transcriptor360-studio

Archivos relevantes:

- apps_script/Code.gs
- apps_script/Visor.html
- visor_seguimiento_pec.html
- docs/AUDITORIA_PERMISOS_CARGA_SUSTENTOS_VISOR_PEC.md
- docs/MATRIZ_PERMISOS_VISOR_PEC.md
- CHECKLIST_OPERATIVO_VISOR_PEC.md

---

## Regla de oro

`?actor=` nunca concede permisos.

El parámetro `?actor=correo` solo puede servir como identidad declarada o referencia operativa cuando Apps Script no expone correo de sesión.

No debe habilitar:

- admin;
- edición compartida;
- carga de sustento;
- retiro de sustento;
- creación de carpeta;
- auditoría sensible;
- centro operativo;
- configuración de correos;
- configuración de triggers.

Las acciones sensibles requieren:

1. correo verificado por Apps Script;
2. rol autorizado;
3. auditoría de la acción.

---

## Identidades que deben distinguirse

### 1. Actor declarado por URL

Ejemplo:

?actor=dpardave@gmail.com

Uso permitido:

- mostrar identidad referencial;
- registrar actor declarado cuando no hay correo verificado;
- ayudar a trazabilidad básica.

Uso prohibido:

- conceder admin;
- conceder permiso documental;
- conceder permiso PMO;
- conceder permiso auditor.

### 2. Correo verificado

Proviene de:

Session.getActiveUser().getEmail()

Es la identidad confiable para permisos.

### 3. Rol operativo

Deriva de listas controladas en Script Properties o defaults explícitos.

### 4. Admin real

Debe ser correo verificado incluido en:

PEC_VISOR_ADMIN_EMAILS

o lista default explícita.

---

## Roles mínimos

### lector

Puede:

- ver visor;
- ver registros;
- exportar reportes no sensibles, si el visor lo permite.

No puede:

- editar ficha;
- cargar sustento;
- retirar sustento;
- ver auditoría sensible;
- operar centro admin.

### operador documental

Puede:

- cargar sustento;
- preparar carpeta documental;
- retirar sustento si la política lo permite;
- ver metadata documental básica.

No puede:

- editar ficha compartida;
- administrar correos;
- activar triggers;
- ver centro operativo completo;
- modificar configuración admin.

### responsable PMO

Puede:

- editar ficha compartida;
- cargar sustento;
- preparar carpeta;
- retirar sustento;
- dar seguimiento operativo.

No puede:

- configurar correos/triggers, salvo autorización admin;
- acceder a centro operativo admin, salvo regla explícita.

### administrador

Puede:

- editar ficha;
- cargar sustento;
- retirar sustento;
- ver auditoría sensible;
- ver centro operativo;
- configurar correos;
- configurar triggers;
- ver backup y estado operativo.

### auditor

Puede:

- ver auditoría sensible;
- revisar trazabilidad;
- exportar inventarios o reportes de control si existe la función.

No puede:

- editar ficha;
- cargar sustento;
- retirar sustento;
- configurar correos;
- activar triggers.

---

## Script Properties recomendadas

Usar estas propiedades:

- PEC_VISOR_ADMIN_EMAILS
- PEC_VISOR_DOCUMENT_OPERATOR_EMAILS
- PEC_VISOR_PMO_EMAILS
- PEC_VISOR_AUDITOR_EMAILS
- PEC_VISOR_OPERATIONAL_EMAILS

Compatibilidad:

`PEC_VISOR_OPERATIONAL_EMAILS` puede mantenerse temporalmente como lista heredada equivalente a PMO o rol operativo amplio, pero la recomendación es migrar gradualmente a roles explícitos.

---

## Flags de permisos recomendados

El backend debe exponer al frontend flags claros:

- permissionRole
- permissionReasonCode
- permissionReasonMessage
- actor
- actorEmail
- actorSource
- actorVerified
- declaredActor
- isAdmin
- isPmo
- isDocumentOperator
- isAuditor
- canEditShared
- canManageAttachments
- canRemoveAttachments
- canViewSensitiveAudit
- canViewOperationalCenter
- canExportSupportInventory

---

## Funciones backend a revisar

En `apps_script/Code.gs`, localizar o proponer:

- resolveSharedTrackingPermissionContext_
- getSharedTrackingAdminEmailList_
- getSharedTrackingOperationalEmailList_
- getSharedTrackingDocumentOperatorEmailList_
- getSharedTrackingPmoEmailList_
- getSharedTrackingAuditorEmailList_
- getSharedTrackingActor_
- resolveSharedTrackingActorInfo_
- buildAuditActorMeta_
- getSharedTrackingBackendMeta_
- buildSharedTrackingPermissionDeniedEnvelope_

Si no existen, proponer equivalentes con nombres consistentes.

---

## Funciones frontend a revisar

En `apps_script/Visor.html` y `visor_seguimiento_pec.html`, localizar o proponer:

- getCurrentPermissionState
- getCurrentActorIdentity
- describeCurrentActorIdentity
- canCurrentUserEditShared
- canCurrentUserManageAttachments
- canCurrentUserRemoveAttachments
- renderAdminAccess
- updateServerInfoFromEnvelope
- renderCaseAttachments
- describeCurrentAttachmentPermissionSummary

Ambos HTML deben mantenerse sincronizados.

---

## UX obligatoria de permisos

La interfaz debe mostrar de forma clara:

- rol actual;
- identidad actual;
- si el correo fue verificado;
- si el actor fue declarado por URL;
- si puede editar ficha;
- si puede cargar sustento;
- si puede retirar sustento;
- si puede ver auditoría;
- si puede acceder al centro operativo.

Mensajes recomendados:

- Estás identificado solo como actor declarado por URL; eso no habilita acciones sensibles.
- Tu correo fue verificado, pero no está autorizado para editar ni cargar sustento.
- Tu correo está autorizado como operador documental.
- Tu correo está autorizado como responsable PMO.
- Tu correo está autorizado como auditor.
- Tu correo está autorizado como administrador.
- El modo local no ejecuta permisos reales de Apps Script.

---

## Matriz de permisos recomendada

| Acción | Lector | Operador documental | Responsable PMO | Admin | Auditor |
|---|---|---|---|---|---|
| Ver visor | Sí | Sí | Sí | Sí | Sí |
| Ver registros | Sí | Sí | Sí | Sí | Sí |
| Editar ficha | No | No | Sí | Sí | No |
| Cargar sustento | No | Sí | Sí | Sí | No |
| Preparar carpeta | No | Sí | Sí | Sí | No |
| Retirar sustento | No | Según política | Sí | Sí | No |
| Ver auditoría sensible | No | No | Parcial | Sí | Sí |
| Ver centro operativo | No | No | No | Sí | Parcial |
| Configurar correos | No | No | No | Sí | No |
| Configurar triggers | No | No | No | Sí | No |
| Exportar inventario | No | Parcial | Sí | Sí | Sí |

---

## Riesgos críticos

Clasificar como crítico si ocurre cualquiera de estos casos:

- `?actor=` habilita admin.
- `?actor=` habilita carga o retiro documental.
- usuario estándar puede mutar estado compartido.
- auditor puede editar o retirar sustentos.
- operador documental puede configurar correos o triggers.
- usuario sin correo verificado puede realizar mutaciones.
- frontend muestra permisos mayores que backend.
- backend permite acciones que frontend oculta.
- roles no quedan auditados en acciones sensibles.

---

## Flujo obligatorio

1. Confirmar repositorio con `git status`.
2. Localizar funciones de permisos.
3. Localizar bloques frontend de permisos.
4. Mapear roles actuales.
5. Mapear flags actuales.
6. Verificar que `?actor=` no concede permisos.
7. Verificar que cada acción sensible exige correo verificado.
8. Verificar que frontend y backend coinciden.
9. Verificar mensajes UX.
10. Diseñar pruebas por rol.
11. No aplicar cambios sin autorización.

---

## Pruebas obligatorias por rol

Diseñar pruebas para:

### Admin

Debe poder:

- abrir panel admin;
- ver centro operativo;
- ver auditoría;
- editar ficha;
- cargar sustento;
- retirar sustento;
- configurar correos/triggers.

### PMO

Debe poder:

- editar ficha;
- cargar sustento;
- retirar sustento.

No debe:

- configurar correos/triggers;
- operar centro admin si no es admin.

### Operador documental

Debe poder:

- cargar sustento;
- preparar carpeta;
- retirar sustento si la política lo permite.

No debe:

- editar ficha;
- configurar admin;
- ver centro operativo.

### Auditor

Debe poder:

- ver auditoría sensible;
- revisar trazabilidad.

No debe:

- editar;
- cargar;
- retirar;
- configurar.

### Lector / actor URL

Debe poder:

- ver visor.

No debe:

- mutar nada;
- cargar;
- retirar;
- administrar.

---

## Validaciones técnicas

Antes de commit o recomendación final, validar:

- `git diff --check`;
- ausencia de conflict markers;
- ausencia de secretos;
- ausencia de `console.log`;
- sincronía entre `apps_script/Visor.html` y `visor_seguimiento_pec.html`;
- consistencia entre flags backend y UX frontend.

---

## Entregables obligatorios

Toda respuesta usando esta skill debe incluir:

1. Resumen ejecutivo.
2. Archivos revisados.
3. Modelo de roles actual.
4. Matriz de permisos actual.
5. Brechas de permisos.
6. Riesgos Red Team.
7. Modelo recomendado.
8. Cambios backend propuestos.
9. Cambios frontend propuestos.
10. Mensajes UX propuestos.
11. Pruebas obligatorias por rol.
12. Validaciones técnicas.
13. Rollback.
14. Decisión:
    - OK actual;
    - OK parcial;
    - requiere parche;
    - riesgo alto;
    - no verificable.
15. Prompt recomendado para la siguiente fase.

---

## Criterio de éxito

La skill cumple su propósito si:

- `?actor=` no concede permisos;
- el rol actual se muestra claramente;
- los permisos están separados por rol;
- el backend decide permisos;
- el frontend refleja permisos, no los inventa;
- los roles PMO, operador documental, admin y auditor están separados;
- la carga documental no requiere admin innecesariamente;
- auditoría sensible está restringida a admin/auditor;
- centro operativo está restringido a admin;
- HTML local y Apps Script están sincronizados;
- no se rompe producción;
- no se hace commit ni push sin autorización.
