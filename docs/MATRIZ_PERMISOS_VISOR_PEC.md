# Matriz de permisos del Visor PEC

## Objetivo

Documentar el estado actual de permisos del visor según el código local del repositorio y proponer un modelo recomendado, distinguiendo dependencias de Apps Script, Drive y propiedades de script.

## Notas de interpretación

- `Permitido`: la acción está habilitada por la lógica actual.
- `Bloqueado`: la acción no está disponible para ese perfil.
- `Parcial`: depende de contexto adicional o de otra capa externa.
- `Depende de Apps Script`: requiere backend compartido activo.
- `Depende de Drive`: requiere permisos reales sobre archivos o carpetas.
- `No verificable`: no hay evidencia suficiente en esta fase.

## Matriz actual

| Acción | Local standalone | Usuario estándar sin sesión verificada | Actor declarado por URL | Correo verificado sin permiso operativo | Usuario operativo autorizado no admin | Admin por `PEC_VISOR_ADMIN_EMAILS` | Usuario con permisos Drive pero no admin del visor | Notas |
|---|---|---|---|---|---|---|---|---|
| Ver visor | Permitido | Permitido | Permitido | Permitido | Permitido | Permitido | Permitido | La lectura base no exige admin. |
| Ver registros | Permitido | Permitido | Permitido | Permitido | Permitido | Permitido | Permitido | La lectura base no exige admin. |
| Editar ficha en compartido | No aplica | Bloqueado | Bloqueado | Bloqueado | Permitido | Permitido | Bloqueado | Depende de Apps Script, correo verificado y rol operativo o admin. |
| Cargar archivo / sustento | Informativo solamente | Bloqueado | Bloqueado | Bloqueado | Permitido | Permitido | Bloqueado | Requiere Apps Script y permiso documental. |
| Crear carpeta por registro | Informativo solamente | Bloqueado | Bloqueado | Bloqueado | Permitido | Permitido | Bloqueado | La apertura posterior depende de Drive. |
| Retirar archivo / sustento | Informativo solamente | Bloqueado | Bloqueado | Bloqueado | Permitido | Permitido | Bloqueado | Envía archivo a papelera de Drive y deja auditoría. |
| Ver historial / lista de sustento | Parcial | Permitido | Permitido | Permitido | Permitido | Permitido | Permitido | La lista sincronizada puede verse; abrir archivo depende de Drive. |
| Abrir archivo / carpeta de sustento | No aplica real | Parcial | Parcial | Parcial | Parcial | Parcial | Permitido | Depende de Drive aunque el visor muestre el enlace. |
| Ver auditoría detallada | Bloqueado | Bloqueado | Bloqueado | Bloqueado | Bloqueado | Permitido | Bloqueado | Backend protegido para admin real. |
| Ver cierre diario / recordatorio matutino | Bloqueado | Bloqueado | Bloqueado | Bloqueado | Bloqueado | Permitido | Bloqueado | Admin-only. |
| Ver centro de control operativo | Bloqueado | Bloqueado | Bloqueado | Bloqueado | Bloqueado | Permitido | Bloqueado | Admin-only. |
| Configurar correos | Bloqueado | Bloqueado | Bloqueado | Bloqueado | Bloqueado | Permitido | Bloqueado | Admin-only y depende de Apps Script. |
| Activar triggers | Bloqueado | Bloqueado | Bloqueado | Bloqueado | Bloqueado | Permitido | Bloqueado | Admin-only y depende de Apps Script. |
| Exportar reportes ejecutivos generales | Permitido | Permitido | Permitido | Permitido | Permitido | Permitido | Permitido | No es exportación admin. |
| Exportar auditoría sensible | Bloqueado | Bloqueado | Bloqueado | Bloqueado | Bloqueado | Permitido | Bloqueado | Admin-only. |
| Exportar inventario de sustento | No implementado | No implementado | No implementado | No implementado | No implementado | No implementado | No implementado | Brecha funcional vigente. |

## Riesgos de la matriz actual

### Riesgos críticos

- Las mutaciones documentales no usan control de revisión equivalente al guardado general.
- Dos operaciones simultáneas pueden pisar la metadata de sustentos del mismo registro.

### Riesgos altos

- La lista de sustentos y sus URLs pueden quedar visibles para perfiles de solo lectura.
- La política de visibilidad documental para lectores no está formalizada.
- No existe inventario exportable de sustentos por caso.

### Riesgos medios

- No existe clasificación documental mínima obligatoria.
- Falta score de completitud documental.
- Falta señal ejecutiva de `sin sustento`.

## Matriz recomendada

### Roles recomendados

- `Lector`
- `Operador documental`
- `Responsable PMO`
- `Administrador`
- `Auditor`

| Acción | Lector | Operador documental | Responsable PMO | Administrador | Auditor | Validación necesaria | Trazabilidad requerida | Mensaje UX |
|---|---|---|---|---|---|---|---|---|
| Ver visor | Permitido | Permitido | Permitido | Permitido | Permitido | Acceso al visor | No aplica | `Modo lectura` |
| Ver registros | Permitido | Permitido | Permitido | Permitido | Permitido | Acceso al visor | No aplica | `Lectura habilitada` |
| Editar ficha | Bloqueado | Parcial | Permitido | Permitido | Bloqueado | Correo verificado y rol operativo/PMO/admin | Actor, fecha, registro, acción | `Puede editar ficha` |
| Cargar sustento | Bloqueado | Permitido | Permitido | Permitido | Bloqueado | Correo verificado y permiso documental | Actor, fecha, registro, archivo, carpeta | `Puede cargar sustento` |
| Clasificar sustento | Bloqueado | Permitido | Permitido | Permitido | Bloqueado | Correo verificado y metadata mínima | Tipo documental, actor, fecha | `Clasificación requerida` |
| Crear carpeta por registro | Bloqueado | Permitido | Permitido | Permitido | Bloqueado | Correo verificado y Apps Script | Actor, fecha, registro, carpeta | `Carpeta preparada` |
| Retirar sustento | Bloqueado | Parcial | Permitido | Permitido | Bloqueado | Correo verificado y política de retiro | Actor, fecha, archivo, motivo | `Retiro auditado` |
| Ver historial de sustento | Parcial | Permitido | Permitido | Permitido | Permitido | Política documental definida | Actor, fecha, acción | `Historial documental` |
| Ver auditoría detallada | Bloqueado | Bloqueado | Parcial | Permitido | Permitido | Rol admin o auditor | No aplica | `Acceso a auditoría` |
| Ver centro operativo | Bloqueado | Bloqueado | Bloqueado | Permitido | Parcial | Rol admin o auditor | No aplica | `Centro operativo restringido` |
| Configurar correos y triggers | Bloqueado | Bloqueado | Bloqueado | Permitido | Bloqueado | Admin real | No aplica | `Solo administrador` |
| Exportar reportes ejecutivos | Permitido | Permitido | Permitido | Permitido | Permitido | Acceso al visor | Contexto del reporte | `Exportación disponible` |
| Exportar inventario de sustento | Bloqueado | Parcial | Permitido | Permitido | Permitido | Rol documental, PMO, admin o auditor | Actor, fecha, registro, tipo, archivo | `Inventario documental` |

## Dependencias Apps Script / Drive

### Apps Script

- La operación compartida depende de:
  - Web App activo;
  - `Session.getActiveUser()` cuando se requiere correo verificado;
  - `PEC_VISOR_ADMIN_EMAILS` para admin real;
  - `PEC_VISOR_OPERATIONAL_EMAILS` para rol operativo;
  - estado compartido y auditoría activos.

### Drive

- La carga y la carpeta por registro se crean desde Apps Script en Drive.
- Abrir un archivo o carpeta desde el visor depende después de permisos reales del recurso en Drive.
- El retiro actual usa papelera, no borrado definitivo inmediato.

## Notas de implementación

- No usar `?actor=` como mecanismo admin ni operativo.
- Mantener separados:
  - permiso de lectura;
  - permiso de edición;
  - permiso documental;
  - permiso admin;
  - permiso de auditoría.
- Prioridad técnica siguiente:
  - cerrar concurrencia en carga/retiro de sustentos;
  - decidir si la metadata documental debe ser visible para lectores;
  - implementar inventario exportable por caso.
