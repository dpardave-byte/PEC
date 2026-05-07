import json
from pathlib import Path

from app.core.config import JOBS_FILE, ensure_runtime_dirs
from app.models.job import JobDetail


class JsonJobStore:
    def __init__(self, path: Path | None = None) -> None:
        ensure_runtime_dirs()
        self.path = path or JOBS_FILE

    def list_jobs(self) -> list[JobDetail]:
        if not self.path.exists():
            return []
        raw_items = json.loads(self.path.read_text(encoding="utf-8"))
        return [JobDetail.model_validate(item) for item in raw_items]

    def get_job(self, job_id: str) -> JobDetail | None:
        for job in self.list_jobs():
            if job.id == job_id:
                return job
        return None

    def save_job(self, job: JobDetail) -> JobDetail:
        jobs = self.list_jobs()
        replaced = False
        for index, current in enumerate(jobs):
            if current.id == job.id:
                jobs[index] = job
                replaced = True
                break
        if not replaced:
            jobs.append(job)
        payload = [item.model_dump(mode="json") for item in jobs]
        self.path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        return job
