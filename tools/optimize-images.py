#!/usr/bin/env python3
"""
Shrinks your big PNG drawings into small WebP pictures and keeps the folder structure,
so the website loads fast and the files fit on GitHub.

Usage (from the website folder):
    python tools/optimize-images.py "D:\\Ashraf\\RVT\\00-MEP-Portfolio\\The Portofolio"

The folder you pass must contain "Projects PNGs", "Certifications" and (optional) "Personal image".
It writes:
    assets/projects/...        (WebP copies of "Projects PNGs", same folders and names)
    assets/certifications/...  (WebP copies of "Certifications")
    assets/img/photo.jpg       (from "Personal image/M.png", if it exists)
Needs Python 3 and Pillow:  pip install pillow
"""
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is missing. Install it with:  pip install pillow")

Image.MAX_IMAGE_PIXELS = None
MAX_SIDE = 2800   # longest side in pixels (drawings stay readable when zoomed)
QUALITY = 82      # WebP quality, 1-100
LANCZOS = Image.Resampling.LANCZOS if hasattr(Image, "Resampling") else Image.LANCZOS


def convert(src, dst):
    im = Image.open(src)
    if im.mode in ("P", "LA"):
        im = im.convert("RGBA")
    elif im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")
    im.thumbnail((MAX_SIDE, MAX_SIDE), LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    im.save(dst, "WEBP", quality=QUALITY, method=6)


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    source = Path(sys.argv[1])
    site = Path(__file__).resolve().parent.parent
    jobs = [(source / "Projects PNGs", site / "assets" / "projects"),
            (source / "Certifications", site / "assets" / "certifications")]
    count = before = after = 0
    for src_dir, dst_dir in jobs:
        if not src_dir.is_dir():
            print("Not found, skipped:", src_dir)
            continue
        for p in sorted(src_dir.rglob("*")):
            if p.suffix.lower() not in (".png", ".jpg", ".jpeg"):
                continue
            out = (dst_dir / p.relative_to(src_dir)).with_suffix(".webp")
            convert(p, out)
            count += 1
            before += p.stat().st_size
            after += out.stat().st_size
            if count % 25 == 0:
                print(count, "pictures done...")
    photo = source / "Personal image" / "M.png"
    if photo.is_file():
        im = Image.open(photo).convert("RGB")
        im.thumbnail((900, 900), LANCZOS)
        (site / "assets" / "img").mkdir(parents=True, exist_ok=True)
        im.save(site / "assets" / "img" / "photo.jpg", "JPEG", quality=90)
        print("Personal photo written to assets/img/photo.jpg")
    mb = lambda n: round(n / 1048576, 1)
    print("Done:", count, "pictures,", mb(before), "MB ->", mb(after), "MB. The site finds the .webp files by itself.")


main()
