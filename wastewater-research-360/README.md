# Wastewater Research 360

Proyecto independiente para jobs de investigacion tecnica sobre tratamiento de aguas residuales municipales. Este scaffold no se integra todavia con el panel PEC ni con el visor PEC; solo prepara la base para una app separada.

## Objetivo del v1

- Crear jobs `research_wastewater` para PTAR Puno.
- Separar busqueda web, PDFs del usuario, scoring y exportacion de artifacts.
- Mantener una API simple sobre FastAPI para crear y consultar jobs.
- Preparar un CLI desacoplado para el pipeline por etapas.

## Alcance actual del scaffold

- `FastAPI` con endpoints base.
- Modelos Pydantic para jobs y requests de investigacion.
- Servicio de jobs con almacenamiento JSON simple para no bloquear el arranque.
- Pipeline placeholder con las 5 etapas requeridas.
- CLI placeholder `run_wastewater_research.py`.

## Rutas disponibles

- `GET /health`
- `GET /api/jobs`
- `GET /api/jobs/{job_id}`
- `POST /api/research/jobs`
- `POST /api/research/jobs/staged`

## Estructura

```text
wastewater-research-360/
  app/
    api/
    core/
    models/
    pipelines/
    services/
  data/
    artifacts/
    research_cache/
    uploads/
  tools/
    wastewater_research_360/
  pyproject.toml
```

## Ejecutar en local

1. Crear un entorno virtual de Python 3.11+.
2. Instalar dependencias del `pyproject.toml`.
3. Desde esta carpeta ejecutar:

```bash
uvicorn app.main:app --reload
```

## Decisiones provisionales

- El storage actual usa `data/jobs.json` solo como placeholder operativo.
- La migracion a `SQLite` debe ser el siguiente paso tecnico.
- Los uploads resumables, la autenticacion y la ejecucion real de subprocess quedan pendientes.

## Proximos pasos sugeridos

1. Sustituir el store JSON por SQLite.
2. Implementar el launcher de subprocess para `research_wastewater`.
3. Añadir cache de fuentes y documentos en `data/research_cache`.
4. Implementar scoring determinista y exportadores `DOCX/CSV/JSON`.
