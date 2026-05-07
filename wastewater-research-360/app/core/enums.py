from enum import Enum


class JobFamily(str, Enum):
    TRANSCRIPTION = "transcription"
    RESEARCH_WASTEWATER = "research_wastewater"


class JobStatus(str, Enum):
    QUEUED = "queued"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class ResearchStage(str, Enum):
    GATHERING_SOURCES = "Reuniendo fuentes"
    DOWNLOADING_DOCUMENTS = "Descargando documentos"
    EXTRACTING_EVIDENCE = "Extrayendo evidencia"
    COMPARING_TECHNOLOGIES = "Comparando tecnologias"
    EXPORTING_REPORT = "Exportando informe"
