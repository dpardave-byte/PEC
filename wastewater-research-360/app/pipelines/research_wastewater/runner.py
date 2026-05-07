from datetime import datetime

from app.models.job import JobLogEntry
from app.pipelines.research_wastewater.stages import RESEARCH_WASTEWATER_STAGES


def build_placeholder_logs() -> list[JobLogEntry]:
    now = datetime.utcnow()
    return [
        JobLogEntry(
            stage=stage.value,
            message=f"Placeholder del pipeline para la etapa: {stage.value}.",
            created_at=now,
        )
        for stage in RESEARCH_WASTEWATER_STAGES
    ]
