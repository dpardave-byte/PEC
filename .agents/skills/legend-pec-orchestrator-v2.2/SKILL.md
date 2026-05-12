# LEGEND-PEC Orchestrator v2.2

## Propósito

Esta skill convierte la auditoría de permisos y carga de sustento del Visor PEC en un plan de implementación mínimo, seguro y trazable.

Debe usarse después de la auditoría generada por LEGEND-PEC Orchestrator v2.1.

La skill NO aplica parches directamente. Primero diseña, delimita, prioriza y prepara el parche mínimo para una fase posterior.

---

## Cuándo usar esta skill

Usar esta skill cuando el usuario pida:

- Convertir la auditoría de permisos en plan de implementación.
- Diseñar roles operativos para carga documental.
- Separar permiso de carga de sustento y permiso administrativo.
- Preparar cambios mínimos de backend/frontend para carga de archivos.
- Mejorar trazabilidad de sustento.
- Mejorar mensajes UX sobre permisos.
- Diseñar pruebas de carga de sustento.
- Preparar prompt para aplicar parche mínimo posterior.
- Evolucionar el Visor PEC sin romper producción.

No usar esta skill para:

- Rediseñar todo el visor.
- Reimplementar el Centro de control operativo.
- Conceder admin por URL.
- Hacer push automático.
- Aplicar cambios sin autorización.
- Modificar triggers, correos o backup salvo que la brecha esté directamente relacionada.

---

## Contexto permanente del proyecto

Proyecto: Visor PEC – Programa de Economía Circular.

Repositorio local esperado:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio

No trabajar en:

C:\Users\Dpard\Documents\Master\Liderazgo\tools\transcriptor360-studio

Ese directorio corresponde a Transcriptor 360 Studio y no al repositorio del Visor PEC.

Archivos principales:

- apps_script/Code.gs
- apps_script/Visor.html
- visor_seguimiento_pec.html
- README.md
- CHECKLIST_OPERATIVO_VISOR_PEC.md
- docs/AUDITORIA_PERMISOS_CARGA_SUSTENTOS_VISOR_PEC.md
- docs/MATRIZ_PERMISOS_VISOR_PEC.md

Superficies del sistema:

1. Panel público GitHub Pages.
2. Visor público/local.
3. Visor compartido Apps Script.
4. Panel admin.
5. Backend Apps Script.
6. Google Drive como repositorio documental.
7. Auditoría, backups, triggers y correos operativos.

---

## Estado validado hasta esta fase

Usar como baseline:

1. GitHub Pages carga el visor público.
2. El visor local carga correctamente.
3. ?view=visor abre el Visor PEC compartido y no el PEC Drive Loader.
4. El Centro de control operativo ya existe en:
   - visor_seguimiento_pec.html
   - apps_script/Visor.html
   - apps_script/Code.gs
5. El Centro de control operativo fue validado en DOM con:
   - #adminOperationalMeta
   - #adminOperationalSummary
   - #adminOperationalTags
   - #adminOperationalEntries
   - #adminOperationalProducts
6. El modal admin y el centro operativo se vuelven visibles si el modal se abre correctamente.
7. En GitHub Pages/local se observó:
   - Local standalone
   - Usuario estándar
8. El centro operativo completo depende de Apps Script compartido y usuario admin reconocido.
9. ?actor=correo declara actor, pero NO concede admin.
10. El admin real depende de:
    - Session.getActiveUser().getEmail()
    - PEC_VISOR_ADMIN_EMAILS
11. No reimplementar el Centro de control operativo salvo bug real confirmado.
12. No incluir temporales en commit:
    - node_modules/
    - capturas .png
    - scripts .js de Playwright.

---

## Regla de oro de identidad y permisos

Nunca confundir estos niveles:

### 1. Actor declarado por URL

Ejemplo:

?actor=dpardave@gmail.com

Sirve para trazabilidad declarativa si el backend no expone correo.

No concede admin.

No debe habilitar acciones sensibles por sí solo.

### 2. Correo verificado por Apps Script

Proviene de:

Session.getActiveUser().getEmail()

Es la identidad fuerte para permisos.

### 3. Admin real

Debe ser un correo verificado incluido en:

PEC_VISOR_ADMIN_EMAILS

o en defaults explícitos del backend.

Nunca debe obtenerse por query param.

Cualquier confusión entre actor declarado, correo verificado y admin real es brecha crítica.

---

## Objetivo de LEGEND-PEC Orchestrator v2.2

Continuar desde la auditoría de permisos y carga de sustento generada por LEGEND-PEC v2.1.

Convertir esa auditoría en un diseño mínimo de implementación para corregir brechas confirmadas sobre:

- carga de archivos/sustentos;
- roles operativos;
- trazabilidad;
- permisos diferenciados;
- mensajes UX;
- auditoría de carga/retiro;
- pruebas de validación.

La salida debe ser un plan de implementación, no un parche aplicado.

---

## Reglas obligatorias

- No conceder admin por URL.
- No convertir a todos los usuarios en admin.
- Separar permiso de carga documental de permiso administrativo.
- Mantener trazabilidad por:
  - actor;
  - correo verificado;
  - fecha;
  - registro;
  - acción.
- No romper:
  - visor local;
  - GitHub Pages;
  - Apps Script compartido;
  - panel admin;
  - centro de control operativo;
  - carga de estructura;
  - edición de fichas;
  - auditoría;
  - backups;
  - triggers;
  - correos.
- No tocar triggers/correos/backup salvo que la brecha esté directamente relacionada.
- No hacer push sin autorización.
- No aplicar parche todavía.
- No modificar código antes de leer la auditoría.
- No incluir temporales, capturas ni node_modules en commit.

---

## Sistema multiagente LEGEND-PEC v2.2

Aplicar los agentes en este orden:

1. Visionary
   - Define criterio institucional.
   - Determina qué roles deben existir para uso real del visor.
   - Evita sobreingeniería.

2. Architect
   - Diseña la solución mínima compatible con Apps Script, HTML espejo, GitHub Pages y Drive.
   - Identifica archivos a tocar y dependencias.

3. Security & Permissions Lead
   - Separa permiso documental de permiso admin.
   - Evalúa riesgos de ?actor, sesión Google, Drive y Script Properties.

4. Documentary Intelligence Lead
   - Define trazabilidad documental mínima:
     - carga;
     - retiro;
     - carpeta;
     - tipo documental;
     - registro;
     - actor;
     - fecha;
     - URL Drive.

5. PMO Analyst
   - Asegura que el modelo sirva para operación diaria DGPPCS.
   - Valida roles como operador documental y responsable PMO.

6. UX Operational Lead
   - Define mensajes claros para:
     - puede cargar;
     - no puede cargar;
     - actor declarado;
     - correo verificado;
     - sin sesión;
     - sin permiso Drive;
     - modo local;
     - backend no disponible.

7. QA Lead
   - Diseña pruebas obligatorias por perfil.
   - Incluye carga fallida, retiro y modo local.

8. Red Team Critic
   - Busca bypass, escalamiento, carga anónima, suplantación por URL, pérdida de evidencia y exposición Drive.

9. LEGEND Orchestrator
   - Integra hallazgos.
   - Elimina contradicciones.
   - Prioriza implementación.
   - Emite Decisión LEGEND-PEC.

---

## Flujo de trabajo obligatorio

### Fase 1 — Confirmar repositorio

Ejecutar:

git status

Reportar:

- path;
- rama;
- remote;
- estado inicial;
- temporales detectados.

Si no es repositorio Git, detenerse.

No ejecutar git init.

---

### Fase 2 — Leer auditoría y documentos base

Leer:

- docs/AUDITORIA_PERMISOS_CARGA_SUSTENTOS_VISOR_PEC.md
- docs/MATRIZ_PERMISOS_VISOR_PEC.md
- CHECKLIST_OPERATIVO_VISOR_PEC.md
- apps_script/Code.gs
- apps_script/Visor.html
- visor_seguimiento_pec.html

Si alguno de los documentos de auditoría no existe, reportarlo y reconstruir la información desde el código, pero marcarlo como brecha documental.

---

### Fase 3 — Identificar brechas confirmadas

Clasificar:

1. Brechas que sí requieren código.
2. Brechas que no requieren código.
3. Brechas que solo requieren configuración.
4. Brechas que requieren validación manual.
5. Brechas no verificables.

No proponer código para brechas no confirmadas.

---

### Fase 4 — Diseñar modelo mínimo de roles

Roles base:

1. Lector.
2. Operador documental.
3. Responsable PMO.
4. Administrador.
5. Auditor.

Para cada rol definir:

- ve visor;
- ve registros;
- edita ficha;
- carga sustento;
- retira sustento;
- ve auditoría;
- ve centro operativo;
- configura triggers/correos;
- exporta reportes;
- exporta inventario de sustento.

Regla clave:

El operador documental puede cargar sustento sin ser administrador, siempre que exista identidad y trazabilidad suficiente.

---

### Fase 5 — Definir configuración de usuarios operativos

Evaluar opciones:

1. Script Properties.
2. Lista controlada en Code.gs.
3. Archivo JSON de configuración.
4. Hoja de configuración.
5. Fuente externa controlada.

Recomendación preferente para fase mínima:

Usar Script Properties:

- PEC_VISOR_DOCUMENT_OPERATOR_EMAILS
- PEC_VISOR_PMO_EMAILS
- PEC_VISOR_AUDITOR_EMAILS
- PEC_VISOR_ADMIN_EMAILS

No usar query params como autorización.

---

### Fase 6 — Proponer cambios mínimos backend

Diseñar, sin aplicar aún:

1. Función para normalizar correos.
2. Función para leer listas de roles desde Script Properties.
3. Función para construir permisos del usuario actual.
4. Función canUploadEvidence o equivalente.
5. Función canRemoveEvidence o equivalente.
6. Estado de permisos del usuario actual para frontend.
7. Auditoría explícita de:
   - carga;
   - retiro;
   - error;
   - actor;
   - correo verificado;
   - registro;
   - timestamp.
8. Mensajes de error seguros.

No tocar envío de correos, triggers ni backups salvo relación directa.

---

### Fase 7 — Proponer cambios mínimos frontend

Diseñar, sin aplicar aún:

1. Mostrar estado del usuario:
   - actor declarado;
   - correo verificado;
   - rol;
   - puede cargar sustento;
   - puede editar;
   - puede administrar.
2. Deshabilitar acciones no permitidas con explicación.
3. No ocultar completamente el motivo del bloqueo.
4. Diferenciar:
   - ver;
   - editar;
   - cargar sustento;
   - retirar sustento;
   - administrar.

Mensajes UX sugeridos:

- No puedes cargar sustento porque no hay sesión Google verificada.
- No puedes cargar sustento porque tu correo no está autorizado como operador documental o PMO.
- Estás identificado solo como actor declarado por URL; eso no habilita carga documental.
- El modo local no ejecuta carga documental real en Drive.
- No se pudo verificar permiso Drive para la carpeta de sustento.

---

### Fase 8 — Diseñar pruebas obligatorias

Perfiles:

1. Admin real.
2. Operador documental.
3. Responsable PMO.
4. Auditor.
5. Usuario estándar.
6. Actor declarado por URL.
7. Usuario sin sesión Google.
8. Modo local.
9. Usuario con Drive compartido pero sin rol en visor.

Escenarios:

- carga correcta;
- carga bloqueada;
- retiro correcto;
- retiro bloqueado;
- carga fallida;
- actor no verificado;
- backend no disponible;
- conflicto o carga simultánea;
- auditoría posterior;
- exportación de inventario.

---

### Fase 9 — Red Team

Evaluar:

- ¿?actor puede simular un operador documental?
- ¿Un usuario estándar puede cargar evidencia?
- ¿Un usuario puede retirar evidencia sin auditoría?
- ¿Un usuario con link puede ver archivos Drive sensibles?
- ¿La UI induce a creer que actor URL equivale a correo verificado?
- ¿Hay rutas públicas peligrosas?
- ¿Hay pérdida de evidencia por sobrescritura?
- ¿Hay forma de ocultar retiro de sustento?

---

### Fase 10 — Proponer rollback

Para cada cambio sugerido, proponer rollback:

- archivo;
- función;
- cómo revertir;
- qué prueba confirma reversión;
- riesgo residual.

---

### Fase 11 — Preparar prompt para aplicar parche mínimo

No aplicar el parche.

Entregar un prompt listo para la fase LEGEND-PEC v2.3, orientado a aplicar solo el parche mínimo aprobado.

---

## Entregables obligatorios

Responder siempre con estas secciones:

1. Resumen ejecutivo.
2. Repositorio confirmado.
3. Brechas que requieren código.
4. Brechas que no requieren código.
5. Brechas que requieren configuración.
6. Diseño mínimo propuesto.
7. Modelo de roles.
8. Cambios backend propuestos.
9. Cambios frontend propuestos.
10. Cambios documentales propuestos.
11. Archivos a tocar.
12. Diff esperado.
13. Pruebas obligatorias.
14. Riesgos y mitigación.
15. Rollback.
16. Red Team.
17. Decisión LEGEND-PEC.
18. Prompt para aplicar parche mínimo v2.3.

---

## Decisiones LEGEND permitidas

Elegir una:

1. OK para diseño
   - La auditoría es suficiente para diseñar parche mínimo.

2. OK parcial
   - Hay diseño posible, pero faltan pruebas manuales o datos de sesión real.

3. Riesgo alto
   - Hay brechas de seguridad o trazabilidad que deben corregirse antes de uso institucional.

4. No verificable
   - No hay evidencia suficiente para diseñar cambios seguros.

5. Requiere auditoría adicional
   - La auditoría v2.1 es incompleta o contradictoria.

---

## Criterio de éxito

La skill cumple su objetivo si:

- no aplica cambios todavía;
- identifica brechas confirmadas;
- separa permisos documentales de permisos admin;
- propone roles mínimos;
- define backend mínimo;
- define frontend mínimo;
- define pruebas;
- define rollback;
- deja listo el prompt v2.3 para parche mínimo;
- no concede admin por URL;
- no rompe producción;
- no hace push sin autorización.
