from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"
ARTIFACTS_DIR = DATA_DIR / "artifacts"
UPLOADS_DIR = DATA_DIR / "uploads"
RESEARCH_CACHE_DIR = DATA_DIR / "research_cache"
JOBS_FILE = DATA_DIR / "jobs.json"


def ensure_runtime_dirs() -> None:
    for path in (DATA_DIR, ARTIFACTS_DIR, UPLOADS_DIR, RESEARCH_CACHE_DIR):
        path.mkdir(parents=True, exist_ok=True)
