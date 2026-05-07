import argparse
import json
from pathlib import Path

from app.core.config import ARTIFACTS_DIR, ensure_runtime_dirs
from app.pipelines.research_wastewater.stages import RESEARCH_WASTEWATER_STAGES


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Placeholder runner for research_wastewater jobs.")
    parser.add_argument("--job-id", required=True, help="Research job identifier.")
    parser.add_argument("--payload-path", help="Path to the serialized research payload.")
    parser.add_argument("--output-dir", default=str(ARTIFACTS_DIR), help="Directory for generated artifacts.")
    return parser


def main() -> None:
    ensure_runtime_dirs()
    parser = build_parser()
    args = parser.parse_args()
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    manifest = {
        "job_id": args.job_id,
        "payload_path": args.payload_path,
        "stages": [stage.value for stage in RESEARCH_WASTEWATER_STAGES],
        "status": "placeholder",
    }
    manifest_path = output_dir / f"{args.job_id}_manifest.json"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(manifest, ensure_ascii=False))


if __name__ == "__main__":
    main()
