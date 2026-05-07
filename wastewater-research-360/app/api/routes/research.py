from fastapi import APIRouter

from app.models.job import JobDetail
from app.models.research import CreateResearchJobRequest, CreateStagedResearchJobRequest
from app.services.job_service import job_service


router = APIRouter(tags=["research"])


@router.post("/research/jobs", response_model=JobDetail, status_code=201)
def create_research_job(payload: CreateResearchJobRequest) -> JobDetail:
    return job_service.create_research_job(payload)


@router.post("/research/jobs/staged", response_model=JobDetail, status_code=201)
def create_staged_research_job(payload: CreateStagedResearchJobRequest) -> JobDetail:
    return job_service.create_staged_research_job(payload)
