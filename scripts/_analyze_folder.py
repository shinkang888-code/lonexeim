#!/usr/bin/env python3
from pathlib import Path
from collections import defaultdict
import json
import re

ROOT = Path(r"g:\내 드라이브\lonexeim")

ext_stats = defaultdict(lambda: {"count": 0, "size": 0})
dir_stats = defaultdict(lambda: {"count": 0, "size": 0})
all_files = []

for p in ROOT.rglob("*"):
    if not p.is_file() or ".git" in p.parts:
        continue
    rel = p.relative_to(ROOT)
    size = p.stat().st_size
    ext = p.suffix.lower() or "(no ext)"
    ext_stats[ext]["count"] += 1
    ext_stats[ext]["size"] += size
    top = rel.parts[0] if len(rel.parts) > 1 else "(root)"
    dir_stats[top]["count"] += 1
    dir_stats[top]["size"] += size
    all_files.append((str(rel).replace("\\", "/"), size, ext))

total_size = sum(v["size"] for v in ext_stats.values())
total_count = sum(v["count"] for v in ext_stats.values())

report = {
    "total_files": total_count,
    "total_mb": round(total_size / 1024 / 1024, 2),
    "top_dirs": [
        {"name": d, "files": v["count"], "mb": round(v["size"] / 1024 / 1024, 2)}
        for d, v in sorted(dir_stats.items(), key=lambda x: -x[1]["size"])
    ],
    "extensions": [
        {"ext": e, "files": v["count"], "mb": round(v["size"] / 1024 / 1024, 2)}
        for e, v in sorted(ext_stats.items(), key=lambda x: -x[1]["size"])
    ],
    "largest_files": [
        {"path": rel, "mb": round(size / 1024 / 1024, 2)}
        for rel, size, _ in sorted(all_files, key=lambda x: -x[1])[:20]
    ],
}

out = ROOT / "scripts" / "_analysis_report.json"
out.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(report, ensure_ascii=False, indent=2))
