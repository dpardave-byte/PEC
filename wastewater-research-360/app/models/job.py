from datetime import datetime

from pydantic import BaseModel, Field

from app.core.enums import JobFamily, JobStatus


class JobArtifact(BaseModel):
    name: str
    path: str
    mime_type: str


class JobLogEntry(BaseModel):
    stage: str
    message: str
    created_at: datetime


class JobDetail(BaseModel):
    id: str
    job_family: JobFamily
    status: JobStatus
    label: str
    research_config: dict = Field(default_factory=dict)
    source_summary: dict = Field(default_factory=dict)
    score_matrix: list[dict] = Field(default_factory=list)
    top_recommendations: list[dict] = Field(default_factory=list)
    reference_paths: list[str] = Field(default_factory=list)
    pdf_session_ids: list[str] = Field(default_factory=list)
    logs: list[JobLogEntry] = Field(default_factory=list)
    artifacts: list[JobArtifact] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime
