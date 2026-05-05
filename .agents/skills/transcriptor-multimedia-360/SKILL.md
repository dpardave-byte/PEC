---
name: transcriptor-multimedia-360
description: Usar cuando el usuario pida transcribir audio o video, resumir una grabación, responder preguntas sobre una transcripción, extraer citas, decisiones, tareas o crear entregables como minuta, informe, subtítulos o JSON. En este repo, este skill funciona como guía local y debe alinearse con el skill global transcriptor-multimedia-360 cuando esté disponible.
---

# Skill: Transcriptor Multimedia 360

## Propósito

Convertir audio, video o transcripciones crudas en entregables útiles y trazables, sin inventar contenido y separando claramente:

- transcripción;
- evidencia;
- análisis;
- recomendaciones.

## Cuándo usarlo

Activar cuando el usuario pida cualquiera de estas tareas:

- transcribir audio o video;
- limpiar o mejorar una transcripción;
- resumir una clase, entrevista, reunión, podcast o audiencia;
- responder preguntas sobre una grabación con base en evidencia;
- extraer citas, decisiones, tareas, riesgos o preguntas abiertas;
- generar minuta, informe, subtítulos, tabla o JSON.

## Regla de integración

Si en la sesión está disponible el skill global `transcriptor-multimedia-360`, seguir primero ese flujo. Este skill local no reemplaza ese pipeline: solo deja una versión operativa y versionable dentro del repo.

No asumir scripts locales de transcripción dentro de este repositorio si no existen aquí.

## Flujo mínimo

1. Diagnóstico inicial

- identificar idioma principal;
- estimar si el contenido es clase, reunión, entrevista, podcast o video narrativo;
- identificar si el usuario quiere versión literal, versión editada, análisis o varios entregables.

2. Transcripción base

- usar timestamps por segmento cuando estén disponibles;
- usar `Hablante 1`, `Hablante 2`, etc., salvo nombres confirmados;
- marcar incertidumbre con etiquetas como `[inaudible]`, `[palabra dudosa]`, `[ruido]`.

3. Limpieza y mejora

- si ayuda, entregar dos versiones:
  - literal;
  - editada.
- nunca reemplazar un fragmento dudoso por contenido inventado.

4. Análisis

Extraer, según el pedido:

- resumen ejecutivo;
- temas principales;
- citas clave con timestamp;
- decisiones;
- tareas y responsables si aparecen;
- riesgos;
- preguntas abiertas.

5. Preguntas y respuestas

Responder solo con evidencia del material.

Formato recomendado:

```text
Respuesta: ...
Evidencia: [00:12:31–00:13:08] ...
Nivel de confianza: alto / medio / bajo
Notas: ...
```

Si no hay evidencia suficiente, decirlo explícitamente.

## Reglas de calidad

- No inventar contenido.
- No asignar nombres de hablantes sin confirmación.
- No transformar opiniones en hechos.
- Citar timestamps cuando la afirmación sea relevante.
- Separar evidencia de interpretación.
- Anonimizar datos personales si el usuario lo pide o si el entregable será público.

## Entregables típicos

- transcripción completa;
- transcripción editada;
- resumen ejecutivo;
- minuta;
- informe;
- subtítulos SRT o VTT;
- JSON o tabla de segmentos;
- respuesta conversacional basada en evidencia.

## Formato breve de salida

```markdown
## Diagnóstico
- Tipo de contenido:
- Idioma:
- Calidad estimada:
- Hablantes detectados:

## Transcripción o evidencia
...

## Resumen ejecutivo
...

## Citas clave
...

## Acciones / decisiones
...

## Preguntas abiertas
...
```

## Checklist final

Antes de entregar, revisar:

- ¿el resumen está sustentado por el material?
- ¿las citas relevantes tienen timestamp?
- ¿se separó evidencia de análisis?
- ¿se marcaron partes dudosas?
- ¿el formato final coincide con lo que pidió el usuario?
