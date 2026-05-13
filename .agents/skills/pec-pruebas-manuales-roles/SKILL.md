# pec-pruebas-manuales-roles

## Propósito

Esta skill convierte la validación con usuarios reales en un checklist operativo verificable para el Visor PEC. Su meta es que las pruebas por rol no dependan de memoria informal ni de observaciones ambiguas, sino de pasos claros, cuentas objetivo, resultados esperados, evidencia mínima, criterio de aprobación y registro de fallas.

La skill organiza las pruebas reales que deben ejecutarse sobre el visor compartido Apps Script y, cuando corresponda, sobre el visor local o GitHub Pages. Integra roles, identidad verificada, permisos documentales, edición, auditoría, centro operativo, pruebas negativas con `?actor=` y comportamiento de usuarios externos o sin correo verificable.

## Cuándo usar esta skill

Usar cuando se requiera:

- validar roles con cuentas reales después de un cambio;
- preparar una UAT institucional del visor;
- verificar que admin, PMO, operador documental, auditor y lector ven lo correcto;
- validar que un usuario externo o actor por URL queda en consulta;
- validar flujo documental real en Apps Script compartido;
- registrar resultados manuales después de un deploy;
- convertir experiencia informal en checklist repetible;
- documentar criterio de salida para pasar a commit o a publicación.

## Cuándo no usar esta skill

No usar para:

- redefinir la arquitectura de permisos;
- resolver por sí sola un bug de backend;
- automatizar pruebas end to end;
- desplegar Apps Script;
- limpiar catálogos de datos;
- rediseñar la UI sin componente de prueba por rol.

## Contexto del proyecto

Repositorio esperado:

C:\Users\Dpard\OneDrive\Escritorio\EC\PEC_repo_limpio

No trabajar en:

C:\Users\Dpard\Documents\Master\Liderazgo\tools\transcriptor360-studio

El Visor PEC opera sobre varias superficies: GitHub Pages, visor local y Apps Script compartido. Esta skill se centra sobre el Apps Script compartido, porque allí es donde la identidad verificada y los permisos institucionales adquieren sentido real.

## Archivos relevantes

- apps_script/Code.gs
- apps_script/Visor.html
- visor_seguimiento_pec.html
- CHECKLIST_OPERATIVO_VISOR_PEC.md
- docs/MATRIZ_PERMISOS_VISOR_PEC.md
- docs/AUDITORIA_PERMISOS_CARGA_SUSTENTOS_VISOR_PEC.md
- cualquier guía operativa o instructivo de roles vigente

## Relación con legend-pec-orchestrator-v2.2

LEGEND define la fase, el alcance y la decisión institucional. Esta skill aporta la capa de validación humana real. No reemplaza al orquestador ni decide sola si un cambio se publica, pero sí documenta si la experiencia real por rol coincide con el diseño, la implementación y el despliegue.

Si existe tensión con `pec-orquestador`, prevalece LEGEND. Las pruebas manuales deben coordinarse con QA, permisos, sustentos, publicación y supervisor de calidad.

## Skills relacionadas

- pec-permisos-roles-operativos
- pec-sustentos-documentales
- pec-publicacion-appsscript
- pec-qa-regresion
- pec-supervisor-calidad
- pec-red-team-seguridad-operativa

## Reglas duras

- No considerar validada una capacidad sin cuenta real y resultado observable.
- No asumir rol por `?actor=`.
- No ejecutar pruebas que envíen correos o alteren triggers.
- Si una prueba requiere carga o retiro documental, debe hacerse sobre un registro controlado y con trazabilidad.
- No mezclar resultados de visor local con resultados del Apps Script compartido.
- Si una prueba falla por identidad vacía o despliegue incorrecto, registrar la causa y detener la validación de rol afectado.

## Roles y cuentas que debe cubrir

1. Admin con cuenta Gmail o institucional según política activa.
2. Responsable PMO.
3. Operador documental.
4. Auditor.
5. Lector interno verificado.
6. Actor declarado por URL sin correo verificado.
7. Usuario externo con enlace.
8. Cuenta institucional válida no incluida en listas operativas.

## Flujo obligatorio

1. Confirmar versión o URL exacta que se va a validar.
2. Confirmar la matriz de roles esperada.
3. Definir cuentas de prueba y su clasificación esperada.
4. Ejecutar pruebas base de acceso: abrir visor, abrir caso, observar identidad y rol.
5. Ejecutar pruebas funcionales por rol: edición, carga, retiro, auditoría, centro operativo e inventario.
6. Ejecutar pruebas negativas: actor por URL, usuario no configurado, usuario externo, sesión no verificable.
7. Registrar evidencia mínima: resultado, mensaje, pantalla o texto observado, y fecha.
8. Marcar aprobación, fallo o bloqueo por cada rol.
9. Consolidar hallazgos y elevar decisión a QA y supervisor.

## Casos mínimos por rol

### Admin

- ve panel admin;
- ve centro operativo;
- ve auditoría sensible;
- edita ficha;
- carga sustento;
- retira sustentos según política;
- exporta inventario permitido.

### PMO

- edita ficha;
- carga sustento;
- prepara carpeta;
- retira si la política lo permite;
- no accede a configuración admin.

### Operador documental

- carga sustentos;
- prepara carpeta;
- retira si aplica;
- no edita ficha compartida;
- no administra correos ni triggers.

### Auditor

- ve auditoría e inventario permitido;
- no edita ni retira;
- no accede a centro operativo pleno salvo política explícita.

### Lector interno y usuario externo

- abre visor;
- consulta información permitida;
- no ejecuta mutaciones;
- recibe mensaje claro de bloqueo.

### Actor declarado por URL

- puede quedar como actor referencial;
- no obtiene permisos sensibles;
- no aparece como admin, PMO ni operador.

## Riesgos críticos

- un rol obtiene permiso mayor al esperado;
- un rol autorizado no puede operar por falla de identidad;
- se aprueba una publicación sin pruebas reales suficientes;
- los mensajes UX inducen al usuario a creer que tiene un rol distinto;
- el checklist no diferencia entre bloqueo por despliegue y bloqueo por Script Properties.

## Validaciones técnicas

- revisar versión o deployment usado en la prueba;
- revisar identidad mostrada por el diagnóstico de permisos, si existe;
- validar que los mensajes observados coincidan con `permissionRole`, `verified` y `reasonCode`;
- validar que el registro usado para carga o retiro quede auditado;
- revisar que la prueba no rompa Gantt, dashboard, drawer ni exports;
- preparar una matriz de resultados por rol y por acción.

## Entregables obligatorios

1. Resumen ejecutivo.
2. URL o versión validada.
3. Matriz de cuentas probadas.
4. Resultado por rol.
5. Resultado por acción.
6. Pruebas negativas ejecutadas.
7. Fallas confirmadas.
8. Bloqueos de despliegue o configuración.
9. Riesgos residuales.
10. Recomendación: apto, apto parcial o requiere ajuste.

## Criterio de éxito

La skill cumple su objetivo si:

- transforma pruebas humanas en checklist repetible;
- distingue con claridad entre validado, fallido y bloqueado;
- cubre roles internos, actor por URL y usuario externo;
- deja evidencia útil para QA y decisión LEGEND;
- evita aprobar un rol solo por percepción o suposición.
