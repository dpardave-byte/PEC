# Roadmap Ejecutivo del Visor PEC

## Propósito

Formalizar la evolución del Visor PEC como plataforma institucional de seguimiento ejecutivo y operativo del Programa de Economía Circular, sin alterar en esta fase la lógica productiva del visor ni sus automatizaciones.

## Alcance

Este roadmap ordena la consolidación del visor en tres horizontes:

- `0-30 días`: estabilización operativa y cierre del núcleo confiable.
- `31-60 días`: fortalecimiento documental, calidad de datos y experiencia operativa.
- `61-90 días`: institucionalización de productos, trazabilidad avanzada y preparación controlada de capacidades LLM.

## Estado base considerado

### Funcionalidad actual

- visor público/local y visor compartido por Apps Script;
- panel administrador con auditoría, cierre diario, respaldos y operación de correos;
- módulo de sustento con carga múltiple y carpeta visible por registro;
- productos operativos ya encaminados:
  - cierre diario por usuario;
  - reporte ejecutivo;
  - matriz operativa por responsables y seguimiento.

### Brechas

- arquitectura todavía concentrada en archivos grandes;
- falta de catálogo institucional formal de productos;
- calidad documental y completitud de registros aún heterogénea;
- multiusuario con trazabilidad útil, pero reversión todavía parcial;
- adopción dependiente de acompañamiento operativo;
- IA útil todavía en fase de apoyo, no de expediente institucional.

### Recomendación

Consolidar primero confiabilidad, productos institucionales y trazabilidad; ampliar IA solo después.

### Inferencia estratégica

Si el visor cierra bien esta fase, puede pasar de tablero operativo a plataforma institucional ligera de seguimiento.

## Horizonte 0-30 días

### Objetivo

Estabilizar el visor como sistema confiable de seguimiento.

### Acciones

- Cerrar el núcleo funcional del visor y congelar alcance base.
- Formalizar el mapa de superficies:
  - panel público;
  - visor público/local;
  - visor compartido Apps Script;
  - panel admin.
- Consolidar operación diaria:
  - triggers;
  - correos;
  - backups;
  - cierre diario;
  - auditoría.
- Validar el módulo de sustento:
  - carga múltiple;
  - carpeta por registro;
  - retiro de archivos;
  - trazabilidad por actor.
- Definir productos base oficiales:
  - cierre diario por usuario;
  - reporte ejecutivo semanal;
  - matriz de pendientes por responsable / DGPPCS.

### Entregables

- mapa de producto;
- checklist operativo definitivo;
- auditoría diaria usable;
- catálogo mínimo de productos institucionales.

### Criterios de éxito

- el visor opera sin ambigüedad funcional;
- el panel admin permite control operativo real;
- los sustentos quedan trazables por actor, registro y fecha.

### Dependencias

- Product Owner institucional;
- arquitecto Apps Script / frontend;
- PMO funcional;
- responsable operativo del panel admin.

### Riesgos

- expansión de alcance sin congelar núcleo;
- mezcla entre operación real y mejoras exploratorias;
- dependencia de validación manual sin disciplina de checklist.

## Horizonte 31-60 días

### Objetivo

Elevar calidad documental, calidad de datos y experiencia operativa.

### Acciones

- Implementar score de completitud por registro.
- Estandarizar responsables, actores y correos reutilizables.
- Incorporar clasificación mínima de sustento:
  - tipo documental;
  - fecha;
  - actor;
  - carpeta.
- Mejorar la ficha por caso:
  - estado;
  - responsable;
  - seguimiento DGPPCS;
  - nota;
  - próximo paso;
  - sustento.
- Separar mejor vista ejecutiva y vista operativa.

### Entregables

- matriz de calidad por registro;
- directorio consolidado de responsables y actores;
- ficha fortalecida;
- guía de uso por perfil.

### Criterios de éxito

- los registros críticos ya no aparecen incompletos sin señal visible;
- los usuarios pueden operar sin acompañamiento constante.

### Dependencias

- definición de campos críticos;
- disponibilidad de responsables funcionales;
- consistencia entre visor público y visor compartido.

### Riesgos

- crecimiento de catálogos sin normalización;
- sustento cargado sin clasificación suficiente;
- UX operativa aún dependiente de usuarios expertos.

## Horizonte 61-90 días

### Objetivo

Convertir el visor en una plataforma institucional con productos estables.

### Acciones

- Formalizar reporte ejecutivo semanal automático o semiautomático.
- Añadir bitácora de decisiones por actividad o expediente.
- Exportar inventario de sustento por caso.
- Mejorar reversibilidad operativa:
  - auditoría filtrable;
  - rastreo de acciones sobre sustento;
  - soporte para corrección guiada.
- Preparar la capa LLM solo como apoyo trazable:
  - resumen por expediente;
  - vacíos documentales;
  - ayuda memoria;
  - separación evidencia / inferencia.

### Entregables

- paquete ejecutivo semanal;
- bitácora de decisiones;
- inventario exportable de sustento;
- especificación de copiloto LLM controlado.

### Criterios de éxito

- el visor produce salidas institucionales consistentes y auditables;
- la IA complementa, pero no sustituye, la trazabilidad.

### Dependencias

- productos oficiales previamente aprobados;
- calidad documental mínima por registro;
- reglas de decisión sobre evidencia y trazabilidad.

### Riesgos

- sobredimensionar la IA antes de consolidar datos;
- confundir líneas futuras con el núcleo actual del visor;
- pretender automatizar decisiones sin gobierno funcional.

## Decisión LEGEND-PEC

La ruta correcta es:

1. consolidar primero el visor como sistema confiable;
2. convertir sus salidas en productos institucionales claros;
3. y solo después ampliar investigación avanzada o capacidades LLM más profundas.

## Restricción estratégica

`Wastewater Research 360` queda como línea complementaria y futura de investigación técnica. No forma parte del núcleo actual del Visor PEC ni debe redefinir su roadmap base.
