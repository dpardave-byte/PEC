from pydantic import BaseModel, Field


class ResearchConfig(BaseModel):
    territory: str = "city-puno"
    scope: str = "municipal-domestic"
    source_policy: str = "broad"
    ranking_focus: str = "opex-energy-ops"
    technology_bias: str = "neutral"


class CreateResearchJobRequest(BaseModel):
    label: str
    territory: str = "city-puno"
    scope: str = "municipal-domestic"
    source_policy: str = "broad"
    ranking_focus: str = "opex-energy-ops"
    technology_bias: str = "neutral"
    reference_paths: list[str] = Field(default_factory=list)
    pdf_session_ids: list[str] = Field(default_factory=list)
    force: bool = False


class CreateStagedResearchJobRequest(CreateResearchJobRequest):
    pdf_session_ids: list[str] = Field(default_factory=list)
