#!/usr/bin/env python3
"""Generate Lonex LX-branded icons from lonexlogo.png for all target specs."""
from __future__ import annotations

import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    import subprocess

    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow", "-q"])
    from PIL import Image

ROOT = Path(__file__).resolve().parents[1]

LOGO_CANDIDATES = [
    ROOT / "lonexlogo.png",
    ROOT / "lonexicon.png",
    Path(
        r"C:\Users\FORYOUCOM\.cursor\projects\g-lonexcdmsbeta-lonexcdms\assets"
        r"\c__Users_FORYOUCOM_AppData_Roaming_Cursor_User_workspaceStorage"
        r"_aefa0914b12f20114de9fe103c22b37c_images_image-e749f0b6-4bee-b04a-be3f5bd6be22.png"
    ),
    Path(r"G:\내 드라이브\lonexeim\lonexlogo.png"),
]

# ICO must include 256 for Windows exe embedding (electron-builder / rcedit)
TARGETS = {
    "lonexlogo.png": "master_png",
    "lonexicon.png": "icon_png",
    "lonex-hub/public/favicon.ico": [(16, 16), (32, 32), (48, 48)],
    "lonex-hub/src/app/favicon.ico": [(16, 16), (32, 32), (48, 48)],
    "lonex-hub/public/icon-512.png": [(512, 512)],
    "lonex-hub/public/apple-touch-icon.png": [(180, 180)],
    "lonex-hub/src/app/icon.png": [(512, 512)],
    "lonex-hub/src/app/apple-icon.png": [(180, 180)],
    "lonex-workforce/desktop/assets/icon.png": [(512, 512)],
    "lonex-workforce/desktop/electron/favicon.ico": [(16, 16), (32, 32), (48, 48), (256, 256)],
    "_asar_extract/main/assets/icon.ico": [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    "_asar_extract/main/app/favicon.ico": [(16, 16), (32, 32), (48, 48)],
    "_asar_extract/lonex-erp/assets/icon.ico": [(16, 16), (32, 32), (48, 48), (256, 256)],
    "lonex-eim-desktop/build/icon.ico": [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    "lonex-eim-desktop/build/uninstallerIcon.ico": [(16, 16), (32, 32), (48, 48), (256, 256)],
    "uninstallerIcon.ico": [(16, 16), (32, 32), (48, 48), (256, 256)],
    "lonex-erp/uninstallerIcon.ico": [(16, 16), (32, 32), (48, 48), (256, 256)],
}


def find_logo() -> Path:
    for p in LOGO_CANDIDATES:
        if p.exists():
            return p
    raise FileNotFoundError("lonexlogo.png not found")


def extract_lx_monogram(src: Image.Image) -> Image.Image:
    """Crop to LX block only (exclude 'Lonex' wordmark below)."""
    src = src.convert("RGBA")
    w, h = src.size
    # Wordmark sits in bottom ~22%; keep upper LX monogram
    crop_h = int(h * 0.78)
    mono = src.crop((0, 0, w, crop_h))
    # Trim horizontal whitespace
    bbox = mono.getbbox()
    if bbox:
        mono = mono.crop(bbox)
    return mono


def make_square_icon(src: Image.Image, size: int, *, monogram_only: bool = True) -> Image.Image:
    base = extract_lx_monogram(src) if monogram_only else src.convert("RGBA")
    canvas = Image.new("RGBA", (size, size), (255, 255, 255, 255))
    sw, sh = base.size
    pad = 0.88 if size >= 128 else 0.92 if size >= 48 else 0.96
    scale = min(size * pad / sw, size * pad / sh)
    nw, nh = max(1, int(sw * scale)), max(1, int(sh * scale))
    resized = base.resize((nw, nh), Image.Resampling.LANCZOS)
    ox, oy = (size - nw) // 2, (size - nh) // 2
    canvas.paste(resized, (ox, oy), resized)
    return canvas


def save_png(path: Path, img: Image.Image, size: tuple[int, int]):
    path.parent.mkdir(parents=True, exist_ok=True)
    out = make_square_icon(img, size[0])
    out.save(path, format="PNG")
    print(f"PNG {path}")


def save_ico(path: Path, img: Image.Image, sizes: list[tuple[int, int]]):
    path.parent.mkdir(parents=True, exist_ok=True)
    icons = [make_square_icon(img, s[0]) for s in sizes]
    icons[-1].save(path, format="ICO", sizes=[(i.size[0], i.size[1]) for i in icons])
    print(f"ICO {path} sizes={[s[0] for s in sizes]}")


def main():
    logo_path = find_logo()
    print(f"Using logo: {logo_path}")
    logo = Image.open(logo_path)

    for rel, spec in TARGETS.items():
        dest = ROOT / rel
        if spec == "master_png":
            logo.save(dest, format="PNG")
            print(f"PNG master {dest}")
        elif spec == "icon_png":
            save_png(dest, logo, (512, 512))
        elif rel.endswith(".png"):
            save_png(dest, logo, spec[0])
        else:
            save_ico(dest, logo, spec)

    print("Done.")


if __name__ == "__main__":
    main()
