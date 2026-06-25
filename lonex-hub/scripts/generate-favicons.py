#!/usr/bin/env python3
"""Generate Lonex LX favicons from source logo photo."""

from __future__ import annotations

import struct
import zlib
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(
    r"C:\Users\FORYOUCOM\.cursor\projects\g-lonexcdms\assets"
    r"\c__Users_FORYOUCOM_AppData_Roaming_Cursor_User_workspaceStorage_fd654b38752cd5fd969cbe21bd823be6_images______2026-06-26_041825-30eee692-c1f8-41dc-92f4-ba9ae0433494.png"
)

OUT_APP = ROOT / "src" / "app"
OUT_PUBLIC = ROOT / "public"
CDMS_APP = ROOT.parent / "_asar_extract" / "main" / "app"


def extract_logo_rgba(src: Path) -> Image.Image:
    im = Image.open(src).convert("RGBA")
    arr = np.array(im)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]

    blue = (b > 130) & (r < 110) & (g < 130)
    gold = (r > 160) & (g > 130) & (b < 90) & (r > g)
    logo = blue | gold

    ys, xs = np.where(logo)
    if len(xs) == 0:
        raise RuntimeError("Logo mask empty — check source image")

    pad = 12
    x0, x1 = max(0, xs.min() - pad), min(arr.shape[1] - 1, xs.max() + pad)
    y0, y1 = max(0, ys.min() - pad), min(arr.shape[0] - 1, ys.max() + pad)

    cropped = im.crop((x0, y0, x1 + 1, y1 + 1))
    c_arr = np.array(cropped)
    cr, cg, cb = c_arr[:, :, 0], c_arr[:, :, 1], c_arr[:, :, 2]
    c_blue = (cb > 130) & (cr < 110) & (cg < 130)
    c_gold = (cr > 160) & (cg > 130) & (cb < 90) & (cr > cg)
    c_logo = c_blue | c_gold

    alpha = np.where(c_logo, 255, 0).astype(np.uint8)
    # soften halo edges from backlight photo
    alpha_img = Image.fromarray(alpha, mode="L").filter(ImageFilter.GaussianBlur(radius=0.6))
    alpha = np.array(alpha_img)
    alpha = np.where(alpha > 40, np.minimum(alpha * 1.2, 255), 0).astype(np.uint8)

    out = np.dstack([c_arr[:, :, 0], c_arr[:, :, 1], c_arr[:, :, 2], alpha]).astype(np.uint8)
    logo_im = Image.fromarray(out, mode="RGBA")

    # square canvas, centered
    w, h = logo_im.size
    side = max(w, h)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(logo_im, ((side - w) // 2, (side - h) // 2), logo_im)

    # slight contrast boost for small-size legibility
    rgb = canvas.convert("RGB")
    rgb = ImageEnhance.Contrast(rgb).enhance(1.12)
    rgb = ImageEnhance.Sharpness(rgb).enhance(1.15)
    final = Image.merge("RGBA", (*rgb.split(), canvas.split()[3]))
    return final


def save_png(img: Image.Image, path: Path, size: int, bg: tuple | None = None) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    resized = img.resize((size, size), Image.Resampling.LANCZOS)
    if bg:
        base = Image.new("RGBA", (size, size), bg)
        base.paste(resized, (0, 0), resized)
        base.convert("RGB").save(path, optimize=True)
    else:
        resized.save(path, optimize=True)


def save_ico(img: Image.Image, path: Path, sizes: tuple[int, ...] = (16, 32, 48)) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    frames = [img.resize((s, s), Image.Resampling.LANCZOS).convert("RGBA") for s in sizes]
    frames[0].save(path, format="ICO", sizes=[(s, s) for s in sizes], append_images=frames[1:])


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Source logo not found: {SOURCE}")

    logo = extract_logo_rgba(SOURCE)

    # Next.js App Router metadata files
    save_ico(logo, OUT_APP / "favicon.ico")
    save_png(logo, OUT_APP / "icon.png", 512)
    save_png(logo, OUT_APP / "apple-icon.png", 180, bg=(15, 20, 25, 255))

    # public/ for static URLs & PWA
    save_ico(logo, OUT_PUBLIC / "favicon.ico")
    save_png(logo, OUT_PUBLIC / "icon-192.png", 192, bg=(15, 20, 25, 255))
    save_png(logo, OUT_PUBLIC / "icon-512.png", 512, bg=(15, 20, 25, 255))
    save_png(logo, OUT_PUBLIC / "apple-touch-icon.png", 180, bg=(15, 20, 25, 255))

    # packaged CDMS static app
    if CDMS_APP.exists():
        save_ico(logo, CDMS_APP / "favicon.ico")
        save_png(logo, CDMS_APP / "icon-192.png", 192, bg=(15, 20, 25, 255))

    print("Generated Lonex favicons:")
    for p in [
        OUT_APP / "favicon.ico",
        OUT_APP / "icon.png",
        OUT_APP / "apple-icon.png",
        OUT_PUBLIC / "favicon.ico",
    ]:
        print(" ", p)


if __name__ == "__main__":
    main()
