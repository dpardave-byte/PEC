# Plan de Mejora Integral del Visor PEC

## Objetivo general

Consolidar el Visor PEC como plataforma institucional confiable de seguimiento ejecutivo y operativo, con trazabilidad documental, control multiusuario, productos formales de salida y una evolución técnica mantenible.

## Regla de lectura

En este documento se distingue siempre entre:

1. funcionalidad actual;
2. brecha;
3. recomendación;
4. inferencia estratégica.

## 1. Gobierno de producto

### Funcionalidad actual

- el visor ya opera como herramienta de seguimiento compartido;
- existen panel público, visor local, visor compartido y panel admin.

### Brecha

- no existe todavía un mapa de producto formal con límites estables entre superficies.

### Recomendación

- congelar el núcleo funcional;
- separar backlog operativo, backlog documental y backlog exploratorio.

### Resultado esperado

- menos ambigüedad;
- menor expansión desordenada del visor.

### Dependencias

- definición de Product Owner institucional;
- validación de dirección y PMO.

## 2. Arquitectura y mantenibilidad

### Funcionalidad actual

- Apps Script y los HTML espejo ya sostienen operación real.

### Brecha

- demasiada lógica concentrada en archivos grandes;
- contratos de datos poco explícitos.

### Recomendación

- modularizar por bloques funcionales;
- documentar contratos de estado compartido;
- separar mejor la capa pública y la capa operativa.

### Resultado esperado

- cambios más seguros;
- QA más controlable;
- menor riesgo de regresión.

### Dependencias

- arquitecto Apps Script;
- tiempo de estabilización técnica sin abrir nuevas funciones.

## 3. Calidad documental

### Funcionalidad actual

- ya existe sustento múltiple y carpeta por registro.

### Brecha

- falta clasificación documental y lectura institucional de completitud.

### Recomendación

- clasificar archivos por tipo;
- marcar registros sin sustento suficiente;
- preparar exportación de inventario documental.

### Resultado esperado

- mayor trazabilidad;
- mejor defensa técnica de avances y decisiones.

### Dependencias

- especialista documental;
- campos mínimos acordados.

## 4. Calidad de datos

### Funcionalidad actual

- hay responsables, seguimiento DGPPCS, catálogos y persistencia compartida.

### Brecha

- responsables, actores y correos aún pueden divergir o quedar incompletos.

### Recomendación

- consolidar directorios reutilizables;
- introducir score de completitud por registro;
- hacer visible qué falta en cada actividad crítica.

### Resultado esperado

- datos más confiables;
- mejores reportes;
- menos corrección manual.

### Dependencias

- PMO;
- data lead;
- disciplina operativa del equipo.

## 5. Operación multiusuario

### Funcionalidad actual

- hay guardado compartido, auditoría, backup y trazabilidad por actor.

### Brecha

- la reversión operativa aún es parcial;
- el control de conflictos todavía es básico.

### Recomendación

- fortalecer reportes de auditoría;
- exponer mejor último actor y último cambio;
- preparar ruta de reversión controlada para admins autorizados.

### Resultado esperado

- menor riesgo de pérdida o corrección manual ciega;
- más control de lo que hace cada usuario.

### Dependencias

- backend de auditoría;
- panel admin;
- criterios de privilegio por admin.

## 6. UX ejecutiva y operativa

### Funcionalidad actual

- el visor ya ofrece lectura ejecutiva, filtros, Gantt, fichas y panel admin.

### Brecha

- la experiencia sigue mezclando lectura ejecutiva, operación y administración.

### Recomendación

- separar mejor vistas por perfil;
- resaltar estados críticos y registros incompletos;
- reducir carga cognitiva en ficha y panel admin.

### Resultado esperado

- uso más autónomo;
- lectura más rápida;
- menos soporte manual.

### Dependencias

- UX;
- PMO;
- pruebas de regresión visual y funcional.

## 7. Productos institucionales

### Funcionalidad actual

- existen cierre diario, reporte ejecutivo y analítica, pero no todos están formalizados como catálogo institucional.

### Brecha

- no hay aún una definición oficial completa de productos, destinatarios, periodicidad y uso.

### Recomendación

- formalizar como mínimo:
  - cierre diario por usuario;
  - reporte ejecutivo semanal;
  - matriz de pendientes por responsable / DGPPCS;
  - bitácora de decisiones;
  - inventario de sustento por caso.

### Resultado esperado

- salidas más estables, auditables y reutilizables.

### Dependencias

- dirección;
- PMO;
- data lead.

## 8. IA útil y controlada

### Funcionalidad actual

- existe una capa inicial de copiloto y análisis asistido.

### Brecha

- la IA todavía no debe operar como expediente institucional principal.

### Recomendación

- usar IA solo para:
  - resumir expediente;
  - identificar vacíos documentales;
  - producir ayudas memoria;
  - separar evidencia e inferencia.

### Resultado esperado

- productividad sin perder trazabilidad.

### Dependencias

- calidad documental mínima;
- reglas de validación institucional.

## Priorización

### Inmediata

- gobierno de producto;
- arquitectura mínima de control;
- operación multiusuario;
- productos base oficiales.

### Siguiente fase

- calidad documental;
- calidad de datos;
- UX por perfil;
- bitácora de decisiones.

### Fase avanzada

- copiloto LLM trazable;
- productos ejecutivos más automatizados;
- reversión operativa guiada.

## Restricción estratégica

`Wastewater Research 360` queda como línea complementaria, no como núcleo del visor actual.
