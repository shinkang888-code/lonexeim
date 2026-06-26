#!/usr/bin/env python3
"""Generate Lonex-branded icons from lonexlogo.png for all target specs."""
from __future__ import annotations

import os
import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'Pillow', '-q'])
    from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]

LOGO_CANDIDATES = [
    ROOT / 'lonexlogo.png',
    Path(r'G:\내 드라이브\lonexeim\lonexlogo.png'),
    Path(r'C:\Users\FORYOUCOM\.cursor\projects\g-lonexeimbeta-lonexeim\assets\c__Users_FORYOUCOM_AppData_Roaming_Cursor_User_workspaceStorage_aefa0914b12f20114de9fe103c22b37c_images_lonexlogo-33d086da-d558-45d1-a8d8-407abe26c87d.png'),
]

TARGETS = {
    'lonex-hub/public/favicon.ico': [(16, 16), (32, 32), (48, 48)],
    'lonex-hub/src/app/favicon.ico': [(16, 16), (32, 32), (48, 48)],
    'lonex-hub/public/icon-512.png': [(512, 512)],
    'lonex-hub/public/apple-touch-icon.png': [(180, 180)],
    'lonex-workforce/desktop/assets/icon.png': [(512, 512)],
    'lonex-workforce/desktop/electron/favicon.ico': [(16, 16), (32, 32), (48, 48), (256, 256)],
    '_asar_extract/main/assets/icon.ico': [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    '_asar_extract/main/app/favicon.ico': [(16, 16), (32, 32), (48, 48)],
    '_asar_extract/lonex-erp/assets/icon.ico': [(16, 16), (32, 32), (48, 48), (256, 256)],
    'uninstallerIcon.ico': [(48, 48), (256, 256)],
    'lonex-erp/uninstallerIcon.ico': [(48, 48), (256, 256)],
}


def find_logo() -> Path:
    for p in LOGO_CANDIDATES:
        if p.exists():
            return p
    raise FileNotFoundError('lonexlogo.png not found')


def make_square_icon(src: Image.Image, size: int) -> Image.Image:
    src = src.convert('RGBA')
    canvas = Image.new('RGBA', (size, size), (255, 255, 255, 255))
    sw, sh = src.size
    scale = min(size * 0.82 / sw, size * 0.82 / sh)
    nw, nh = int(sw * scale), int(sh * scale)
    resized = src.resize((nw, nh), Image.Resampling.LANCZOS)
    ox, oy = (size - nw) // 2, (size - nh) // 2
    canvas.paste(resized, (ox, oy), resized)
    return canvas


def save_png(path: Path, img: Image.Image, size: tuple[int, int]):
    path.parent.mkdir(parents=True, exist_ok=True)
    out = make_square_icon(img, size[0])
    out.save(path, format='PNG')
    print(f'PNG {path}')


def save_ico(path: Path, img: Image.Image, sizes: list[tuple[int, int]]):
    path.parent.mkdir(parents=True, exist_ok=True)
    icons = [make_square_icon(img, s[0]) for s in sizes]
    icons[-1].save(path, format='ICO', sizes=[(i.size[0], i.size[1]) for i in icons])
    print(f'ICO {path} sizes={[s[0] for s in sizes]}')


def main():
    logo_path = find_logo()
    print(f'Using logo: {logo_path}')
    logo = Image.open(logo_path)

    for rel, sizes in TARGETS.items():
        dest = ROOT / rel
        if rel.endswith('.png'):
            save_png(dest, logo, sizes[0])
        else:
            save_ico(dest, logo, sizes)

    # Copy master logo
    master = ROOT / 'lonexlogo.png'
    if logo_path != master:
        logo.save(master)
    print('Done.')


if __name__ == '__main__':
    main()
