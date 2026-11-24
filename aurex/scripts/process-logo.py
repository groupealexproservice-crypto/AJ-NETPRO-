"""Derives transparent brand assets from the official AUREX logo (assets-brand/aurex-logo-original.png).
The logo is light-on-black; brightness becomes opacity, so the glow and metal sheen sit on any dark surface unchanged.
  python3 scripts/process-logo.py
"""
from PIL import Image, ImageDraw
import numpy as np

SRC = "assets-brand/aurex-logo-original.png"
BG_FLOOR = 24.0  # the logo's own near-black background level

src = Image.open(SRC).convert("RGB")

def to_alpha(box, name, scale=1.0):
    crop = np.asarray(src.crop(box)).astype(float)
    rgb = np.clip(crop - BG_FLOOR, 0, None)
    peak = rgb.max(axis=2)
    alpha = np.clip(peak / (255.0 - BG_FLOOR), 0, 1)
    color = np.where(peak[..., None] > 0, rgb / np.maximum(peak[..., None], 1e-6) * 255.0, 0)
    out = np.dstack([np.clip(color, 0, 255), alpha * 255]).astype(np.uint8)
    img = Image.fromarray(out, "RGBA")
    if scale != 1.0:
        img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    img.save(f"public/brand/{name}.png", optimize=True)
    return img.size

print("mark", to_alpha((400, 60, 1230, 482), "aurex-mark"))
print("wordmark", to_alpha((286, 494, 1372, 726), "aurex-wordmark"))
print("lockup", to_alpha((270, 56, 1400, 730), "aurex-lockup"))

# App icons: the pyramid on the brand black.
mark = src.crop((505, 62, 1175, 482)).convert("RGB")
for size in (512, 192, 180, 64):
    canvas = Image.new("RGB", (size, size), (11, 13, 18))
    w = int(size * 0.8); h = int(mark.height * w / mark.width)
    canvas.paste(mark.resize((w, h), Image.LANCZOS), ((size - w) // 2, (size - h) // 2 + int(size * 0.02)))
    canvas.save(f"public/icons/icon-{size}.png" if size in (512, 192) else f"public/brand/icon-{size}.png", optimize=True)

# Vector favicon: the pyramid and its orbit, drawn from the logo's own geometry.
open("public/icons/aurex-mark.svg", "w").write('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#0b0d12"/><path d="M32 9 52 47H12z" fill="#c9ced6"/><path d="M32 9 52 47H32z" fill="#e4b04a"/><path d="M6 44C22 38 44 26 58 14" fill="none" stroke="#f0c46a" stroke-width="2.4" stroke-linecap="round"/></svg>''')
print("done")
