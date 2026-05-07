from fastapi import FastAPI

from app.api.routes.jobs import router as jobs_router
from app.api.routes.research import router as research_router


app = FastAPI(
    title="Wastewater Research 360",
    version="0.1.0",
    description="Independent API scaffold for PTAR Puno technical research jobs.",
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(jobs_router, prefix="/api")
app.include_router(research_router, prefix="/api")
