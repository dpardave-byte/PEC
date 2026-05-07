from datetime import datetime
from uuid import uuid4

from app.core.enums import JobFamily, JobStatus
from app.models.job import JobDetail
from app.models.research import CreateResearchJobRequest, CreateStagedResearchJobRequest, ResearchConfig
from app.pipelines.research_wastewater.runner import build_placeholder_logs
from app.services.store import JsonJobStore


class JobService:
    def __init__(self, store: JsonJobStore | None = None) -> None:
        self.store = store or JsonJobStore()

    def list_jobs(self) -> list[JobDetail]:
        return self.store.list_jobs()

    def get_job(self, job_id: str) -> JobDetail | None:
        return self.store.get_job(job_id)

    def create_research_job(self, payload: CreateResearchJobRequest) -> JobDetail:
        return self._create_job(payload)

    def create_staged_research_job(self, payload: CreateStagedResearchJobRequest) -> JobDetail:
        return self._create_job(payload)

    def _create_job(
        self,
        payload: CreateResearchJobRequest | CreateStagedResearchJobRequest,
    ) -> JobDetail:
        now = datetime.utcnow()
        config = ResearchConfig(
            territory=payload.territory,
            scope=payload.scope,
            source_policy=payload.source_policy,
            ranking_focus=payload.ranking_focus,
            technology_bias=payload.technology_bias,
        )
        job = JobDetail(
            id=f"rsh_{uuid4().hex[:12]}",
            job_family=JobFamily.RESEARCH_WASTEWATER,
            status=JobStatus.QUEUED,
            label=payload.label,
            research_config=config.model_dump(),
            source_summary={"status": "pending", "policy": payload.source_policy},
            score_matrix=[],
            top_recommendations=[],
            reference_paths=payload.reference_paths,
            pdf_session_ids=payload.pdf_session_ids,
            logs=build_placeholder_logs(),
            artifacts=[],
            created_at=now,
            updated_at=now,
        )
        return self.store.save_job(job)


job_service = JobService()
