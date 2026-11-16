from pathlib import Path
import json, re
ROOT = Path(__file__).parent
ASSETS = ROOT / "assets"
items = []
for folder in sorted(p for p in ASSETS.iterdir() if p.is_dir()):
    for path in sorted(folder.rglob("*")):
        if path.is_file() and path.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp", ".gif"}:
            rel = path.relative_to(ROOT).as_posix()
            parts = rel.split("/")
            items.append({
                "src": rel,
                "name": path.stem,
                "folder": parts[1],
                "subcategory": parts[2] if len(parts) > 3 else ""
            })
(ROOT / "portfolio-data.js").write_text(
    "window.PORTFOLIO_ITEMS = " + json.dumps(items, ensure_ascii=False, indent=2) +
    ';\nwindow.PORTFOLIO_CONTACT = { email: "your.email@example.com", resume: "downloads/resume.pdf" };\n',
    encoding="utf-8"
)
print(f"Updated portfolio-data.js with {len(items)} images.")
