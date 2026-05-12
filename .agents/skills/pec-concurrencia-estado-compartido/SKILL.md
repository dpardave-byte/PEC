# pec-concurrencia-estado-compartido

## Propósito

Esta skill gobierna el diseño, auditoría, mejora y validación de la concurrencia, consistencia y persistencia del estado compartido del Visor PEC.

Su objetivo es evitar pérdida de datos, sobrescrituras silenciosas, conflictos no detectados y corrupción del estado compartido cuando varios usuarios operan el visor al mismo tiempo.

Debe usarse para proteger:

- shared_tracking_state.json;
- shared_tracking_audit.json;
- carga y retiro de sustentos;
- guardado de fichas;
- notas;
- acciones;
- carpeta por registro;
- auditoría;
- backups;
- operaciones simultáneas;
- merges de estado;
- revisión o versionado del estado compartido.

---

## Cuándo usar esta skill

Usar esta skill cuando se requiera:

- revisar o mejorar concurrencia;
- proteger cargas simultáneas de archivos;
- proteger retiros simultáneos de sustentos;
- evitar que un guardado pise otro;
- revisar `LockService`;
- revisar control de revisión;
- revisar merge de estado;
- revisar escritura de `shared_tracking_state.json`;
- revisar auditoría de conflictos;
- diseñar rollback;
- validar consistencia entre estado, auditoría y backup;
- diseñar pruebas con dos usuarios simultáneos.

No usar esta skill para:

- rediseñar todo el visor;
- cambiar permisos sin coordinar con `pec-permisos-roles-operativos`;
- cambiar metadata documental sin coordinar con `pec-sustentos-documentales`;
- modificar triggers, correos o backup salvo que el problema sea concurrencia/persistencia;
- hacer commit, push o despliegue sin autorización.

---

## Contexto del proyecto

Repositorio esperado:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio

No trabajar en:

C:\Users\Dpard\Documents\Master\Liderazgo\tools\transcriptor360-studio

Archivos principales:

- apps_script/Code.gs
- apps_script/Visor.html
- visor_seguimiento_pec.html
- CHECKLIST_OPERATIVO_VISOR_PEC.md
- docs/AUDITORIA_PERMISOS_CARGA_SUSTENTOS_VISOR_PEC.md
- docs/MATRIZ_PERMISOS_VISOR_PEC.md

Archivos lógicos del backend Apps Script:

- shared_tracking_state.json
- shared_tracking_audit.json
- backups/shared_tracking_backup_YYYYMMDD.json

---

## Principios obligatorios

### 1. No sobrescribir estado sin recargar

Antes de cualquier mutación sensible, el backend debe recargar el estado más reciente.

Nunca se debe escribir usando una copia antigua si existe posibilidad de concurrencia.

---

### 2. Usar LockService en mutaciones críticas

Toda operación que escriba estado compartido o modifique sustentos debe usar bloqueo.

Casos críticos:

- cargar sustento;
- retirar sustento;
- crear carpeta de sustento;
- guardar ficha compartida;
- actualizar notas;
- modificar acciones;
- actualizar estado con cambios de usuario;
- escribir auditoría crítica;
- escribir backup posterior a mutación.

---

### 3. Merge antes que reemplazo

Cuando se modifique una parte del estado, no se debe reemplazar la estructura completa sin preservar cambios concurrentes.

Usar merge por claves estables:

- recordId;
- id;
- fileId;
- folderId;
- attachmentId;
- revision;
- updatedAt.

---

### 4. Control de revisión

El estado compartido debe tener o respetar:

- revision;
- savedAt;
- savedBy;
- actor;
- actorVerified;
- actorSource.

Si la revisión del cliente es antigua, se debe evitar sobrescritura silenciosa.

---

### 5. Auditoría de conflicto

Si ocurre conflicto, lock ocupado o estado desactualizado, debe registrarse auditoría cuando sea seguro hacerlo.

Acciones sugeridas:

- conflicto_guardado_compartido;
- conflicto_sustento_en_curso;
- conflicto_revision_estado;
- mutacion_reintentada;
- mutacion_abortada.

---

## Funciones backend a revisar

En `apps_script/Code.gs`, localizar o proponer:

- saveSharedTrackingState
- writeSharedTrackingState_
- loadSharedTrackingState_
- normalizeSharedTrackingStateBundle_
- buildSharedTrackingEnvelope_
- appendSharedTrackingAudit_
- writeSharedTrackingBackup_
- uploadSharedTrackingAttachments
- ensureSharedTrackingAttachmentFolder
- deleteSharedTrackingAttachment
- withSharedTrackingAttachmentMutationLock_
- mergeSharedTrackingAttachmentList_
- buildSharedTrackingAttachmentMergeKey_
- getSharedTrackingBackendMeta_
- getSharedTrackingState

---

## Funciones frontend a revisar

En `apps_script/Visor.html` y `visor_seguimiento_pec.html`, localizar o proponer:

- sharedSyncInFlight
- sharedAttachmentActionInFlight
- appState.hasUnsyncedSharedChanges
- applySharedStateBundle
- saveSharedState
- refreshSharedState
- uploadCaseAttachments
- removeCaseAttachment
- prepareCaseAttachmentFolder
- renderCaseAttachments
- setSharedError
- setCaseAttachmentFeedback

Ambos HTML deben mantenerse sincronizados.

---

## Operaciones críticas

### Guardado compartido de ficha

Debe verificar:

- estado local;
- revisión actual;
- cambios pendientes;
- actor;
- permisos;
- lock o estrategia equivalente;
- merge de cambios;
- auditoría;
- backup.

### Carga de sustento

Debe verificar:

- permisos;
- lock;
- recarga de estado;
- carpeta actual;
- metadata previa;
- subida Drive;
- merge por fileId/id/url/name;
- auditoría;
- backup;
- respuesta actualizada al cliente.

### Retiro de sustento

Debe verificar:

- permisos;
- lock;
- recarga de estado;
- sustento actual;
- retiro lógico y/o papelera Drive;
- auditoría;
- preservación de otros sustentos;
- backup;
- respuesta actualizada.

### Preparación de carpeta

Debe verificar:

- permisos;
- lock;
- recarga de estado;
- idempotencia;
- no duplicar carpeta;
- guardar folderId/folderUrl;
- auditoría;
- backup.

---

## Riesgos críticos

Clasificar como crítico si se detecta:

- escritura sin recargar estado;
- dos usuarios pueden pisar cambios;
- lista de sustentos se reemplaza sin merge;
- se pierde attachmentFolder;
- se borra metadata de otro usuario;
- se elimina un sustento sin auditoría;
- se escribe estado después de fallar Drive;
- no existe backup posterior a mutación crítica;
- el frontend permite segunda acción mientras una mutación sigue en curso;
- se ignora revisión desactualizada.

---

## Riesgos altos

Clasificar como alto si se detecta:

- lock global demasiado amplio sin mensajes claros;
- lock sin timeout razonable;
- no se informa al usuario que hay otra operación en curso;
- no se muestra estado de sincronización;
- no hay botón de refrescar antes de mutar;
- no se preserva savedAt/savedBy;
- auditoría y estado quedan desalineados.

---

## Riesgos medios

Clasificar como medio si se detecta:

- mensajes UX ambiguos;
- falta indicador de guardado en curso;
- falta feedback tras conflicto;
- falta prueba manual de concurrencia;
- falta documentación de rollback.

---

## Reglas UX de concurrencia

Mensajes sugeridos:

- Otra operación documental sigue en curso. Intenta nuevamente en unos segundos.
- El estado compartido cambió desde tu última carga. Actualiza antes de guardar.
- Primero debe terminar el guardado actual antes de cargar o retirar sustento.
- No se pudo completar la operación sin riesgo de sobrescribir datos. Actualiza y vuelve a intentar.
- La operación fue registrada, pero se recomienda revisar la lista final de sustentos.

---

## Estrategia mínima recomendada

Para mutaciones críticas:

1. Validar permisos.
2. Tomar lock con `LockService`.
3. Recargar estado actual.
4. Recalcular recordMeta desde estado actual.
5. Aplicar cambio puntual.
6. Mergear listas por clave estable.
7. Incrementar revision.
8. Escribir estado.
9. Auditar.
10. Escribir backup.
11. Devolver envelope actualizado.
12. Liberar lock.

---

## Pruebas obligatorias

Diseñar pruebas para:

1. Dos usuarios editan fichas distintas.
2. Dos usuarios editan la misma ficha.
3. Dos usuarios cargan sustentos al mismo registro.
4. Usuario A crea carpeta mientras usuario B carga sustento.
5. Usuario A retira sustento mientras usuario B carga otro.
6. Usuario A refresca mientras usuario B guarda.
7. Usuario intenta cargar mientras `sharedAttachmentActionInFlight` está activo.
8. Usuario intenta guardar con estado desactualizado.
9. Lock timeout.
10. Drive falla durante carga.
11. Drive falla durante retiro.
12. Auditoría falla.
13. Backup falla.
14. Modo local sin backend.
15. Apps Script compartido con backend real.

---

## Validaciones técnicas

Antes de recomendar commit:

- `git diff --check`;
- ausencia de conflict markers;
- ausencia de secretos;
- ausencia de `console.log`;
- revisión de `LockService`;
- revisión de merge;
- revisión de revision;
- revisión de auditoría;
- revisión de backup;
- sincronía entre `apps_script/Visor.html` y `visor_seguimiento_pec.html`.

---

## Entregables obligatorios

Toda respuesta usando esta skill debe incluir:

1. Resumen ejecutivo.
2. Archivos revisados.
3. Flujo actual de persistencia.
4. Mutaciones críticas detectadas.
5. Uso actual de LockService.
6. Estrategia actual de merge.
7. Control de revisión.
8. Auditoría y backup.
9. Riesgos de concurrencia.
10. Brechas detectadas.
11. Diseño recomendado.
12. Cambios backend propuestos.
13. Cambios frontend propuestos.
14. Pruebas de concurrencia.
15. Rollback.
16. Decisión:
    - OK actual;
    - OK parcial;
    - requiere parche;
    - riesgo alto;
    - no verificable.
17. Prompt recomendado para la siguiente fase.

---

## Criterio de éxito

La skill cumple su propósito si:

- no hay sobrescritura silenciosa;
- las mutaciones críticas usan lock o estrategia equivalente;
- el estado se recarga antes de escribir;
- se mergean listas críticas;
- no se pierde metadata;
- los conflictos se informan al usuario;
- los conflictos se auditan;
- el estado, auditoría y backup quedan consistentes;
- el frontend bloquea acciones simultáneas peligrosas;
- HTML local y Apps Script están sincronizados;
- no se rompe producción;
- no se hace commit ni push sin autorización.
