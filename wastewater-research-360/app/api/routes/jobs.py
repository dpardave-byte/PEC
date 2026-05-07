from fastapi import APIRouter, HTTPException

from app.models.job import JobDetail
from app.services.job_service import job_service


router = APIRouter(tags=["jobs"])


@router.get("/jobs", response_model=list[JobDetail])
def list_jobs() -> list[JobDetail]:
    return job_service.list_jobs()


@router.get("/jobs/{job_id}", response_model=JobDetail)
def get_job(job_id: str) -> JobDetail:
    job = job_service.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job
