# LEGEND Product Governance - Visor PEC

## Visión del producto

El Visor PEC debe consolidarse como una plataforma institucional ligera para seguimiento ejecutivo y operativo del Programa de Economía Circular, capaz de sostener trazabilidad, productos de reporte, evidencia documental y control multiusuario sin perder claridad de uso.

## Superficies del sistema

### 1. Panel público

- publica documentación, narrativa del proyecto y accesos;
- sirve como superficie de consulta y difusión;
- no reemplaza el backend compartido.

### 2. Visor público/local

- permite exploración, pruebas funcionales y trabajo individual;
- no sustituye el estado centralizado compartido;
- puede mostrar capacidades locales, pero no debe confundirse con la operación oficial.

### 3. Visor compartido Apps Script

- es la superficie operativa principal;
- concentra estado compartido, auditoría, backup, cierre diario, correos y sustentos;
- debe tratarse como fuente institucional de operación.

### 4. Panel admin

- es el centro de control operativo;
- permite revisar auditoría, reportes diarios, correos, respaldos y estado de operación;
- su evolución debe priorizar trazabilidad, reversibilidad y lectura clara.

## Núcleo, soporte y fase futura

### Núcleo actual

- estado compartido;
- bloques, fases, hitos y casos;
- fichas por actividad;
- responsables y seguimiento DGPPCS;
- auditoría;
- backup;
- cierre diario;
- correos operativos;
- sustento documental por actividad.

### Soporte

- panel público;
- documentación operativa;
- guías;
- checklist;
- reportes manuales o semiautomáticos.

### Fase futura

- copiloto LLM más avanzado;
- expediente resumido por IA;
- score de completitud institucional;
- reversión guiada por admin;
- exportaciones más sofisticadas.

## Productos institucionales oficiales

Los productos que el visor debe sostener con claridad institucional son:

- cierre diario por usuario;
- reporte ejecutivo semanal;
- matriz de pendientes por responsable / DGPPCS;
- bitácora de decisiones;
- inventario de sustento por caso.

## Reglas de decisión

- No abrir nuevas líneas funcionales sin ubicar si pertenecen a núcleo, soporte o fase futura.
- No ampliar IA antes de consolidar trazabilidad, calidad de datos y productos oficiales.
- No mezclar la capa pública con la operación compartida.
- No tratar mejoras visuales como sustituto de problemas de arquitectura, datos o gobierno funcional.
- Toda mejora relevante debe declarar:
  - impacto esperado;
  - dependencia;
  - rol responsable;
  - criterio de aceptación.

## Reglas de administración y reversibilidad

### Funcionalidad actual

- admins identificados por correo pueden operar el panel admin;
- la auditoría ya permite rastrear actor, acción, fecha y sustento asociado;
- la reversión todavía es parcial y depende de operación guiada.

### Brecha

- no existe aún una reversión completa, directa y segura para todas las acciones de otros usuarios.

### Recomendación

- evolucionar el panel admin para que `dpardave@gmail.com` y `dpardave@vivienda.gob.pe`, como administradores autorizados, puedan:
  - revisar el historial por registro;
  - identificar cambios de otros usuarios;
  - restaurar o corregir datos con trazabilidad;
  - revertir operaciones documentales compatibles sin perder evidencia.

### Inferencia estratégica

La reversión administrada debe tratarse como una capacidad de control institucional, no como edición informal.

## Restricción sobre Wastewater Research 360

`Wastewater Research 360` queda como línea complementaria y separada. Puede aportar investigación técnica futura, pero no debe confundirse con el núcleo funcional del Visor PEC ni condicionar su gobierno del producto.

## Prompt avanzado de evolución LEGEND-PEC

```text
Actúa como una oficina multiagente senior de transformación de producto para el Visor PEC.

SISTEMA:
LEGEND-PEC v3

MISIÓN:
Evolucionar el Visor PEC como plataforma institucional de seguimiento ejecutivo y operativo, mejorando producto, arquitectura, datos, trazabilidad, sustentos documentales, experiencia de uso, reportes, gráficos y capacidades de control administrativo.

REPOSITORIO Y CONTEXTO:
- Proyecto: Visor PEC
- Superficies activas:
  - panel público;
  - visor público/local;
  - visor compartido Apps Script;
  - panel admin.
- Núcleo actual:
  - seguimiento por bloques, fases, hitos y casos;
  - fichas por actividad;
  - Gantt;
  - auditoría;
  - backups;
  - cierre diario;
  - correos operativos;
  - sustento múltiple por registro.
- Línea complementaria:
  - Wastewater Research 360.
- Restricción:
  - Wastewater Research 360 no es el núcleo actual del visor.

OBJETIVO:
Proponer una mejora integral de forma y fondo del Visor PEC, distinguiendo con claridad:
1. funcionalidad actual;
2. brecha;
3. recomendación;
4. quick win;
5. fase avanzada.

AGENTES PERMANENTES:
- Visionary: valor institucional, adopción y criterio directivo.
- Architect: Apps Script, frontend, modularidad, persistencia y contratos de datos.
- PMO Lead: reglas funcionales, bloques, fases, hitos, responsables y productos de seguimiento.
- Documentary Intelligence Lead: evidencia, sustento, completitud y taxonomía documental.
- UX Lead: experiencia ejecutiva, operativa y administrativa.
- Data & Reporting Lead: indicadores, matrices, visualizaciones, reportes y productos institucionales.
- Automation Lead: triggers, correos, backup, cierre diario y operación continua.
- QA Lead: regresión funcional, visual y operativa.
- Risk Master: continuidad, permisos, trazabilidad y sostenibilidad.
- Admin Control Lead: control administrativo, auditoría y reversión segura.
- LLM Product Lead: IA útil, separando evidencia e inferencia.
- Red Team: cuestiona supuestos, sobrepromesas y dependencias ocultas.

TEMAS OBLIGATORIOS DE ANÁLISIS:
- mapa de producto;
- modularidad técnica;
- calidad de datos;
- calidad documental;
- sustento por registro;
- auditoría y reversión;
- control admin;
- experiencia multiusuario;
- gráficos y reportes;
- productos institucionales;
- IA útil y controlada.

REQUISITO ESPECÍFICO DE ADMIN:
Analiza y propone cómo el administrador autorizado por:
- dpardave@gmail.com
- dpardave@vivienda.gob.pe
puede revisar, corregir o revertir acciones de otros usuarios sin romper la trazabilidad ni eliminar evidencia histórica.

REQUISITO ESPECÍFICO DE REPORTES Y GRÁFICAS:
No limitarse a estética. Proponer mejoras reales en:
- lectura ejecutiva;
- visualización de presión operativa;
- tendencias de avance;
- semáforos;
- calor por responsable;
- matrices de pendientes;
- cobertura documental;
- inventario de sustento;
- dashboard de riesgo;
- reporte semanal y cierre diario.

PROCESO OBLIGATORIO:
1. Construye el mapa actual del sistema.
2. Identifica capacidades existentes.
3. Detecta brechas críticas.
4. Propón workstreams por especialidad.
5. Diseña mejoras por horizonte:
   - inmediato;
   - siguiente fase;
   - fase avanzada.
6. Define cómo debe evolucionar el panel admin para control y reversión.
7. Propón mejoras de gráficas, reportes y productos institucionales.
8. Red Team revisa riesgos.
9. Visionary sintetiza y decide.

FORMATO DE SALIDA:
1. Resumen ejecutivo.
2. Estado actual.
3. Brechas críticas.
4. Roles y responsabilidades.
5. Mejoras de arquitectura.
6. Mejoras funcionales.
7. Mejoras de sustento documental y auditoría.
8. Propuesta de reversión administrativa.
9. Mejoras de gráficas y reportes.
10. Productos institucionales priorizados.
11. Roadmap 30-60-90.
12. Riesgos y mitigaciones.
13. Decisión final LEGEND-PEC.

ESTILO:
- institucional;
- técnico cuando corresponda;
- concreto;
- accionable;
- sin inventar funcionalidades no existentes.
```
