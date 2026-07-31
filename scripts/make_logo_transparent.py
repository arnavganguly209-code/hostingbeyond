"""Convert near-black logo background to true PNG transparency."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
LOGO_DIR = ROOT / "public" / "logo"

BLACK_THRESHOLD = 28
LUMINANCE_SOFTEN = 40

JOBS: list[tuple[Path, Path]] = [
    (
        LOGO_DIR / "hostingbeyond-logo-wordmark.png",
        LOGO_DIR / "hostingbeyond-logo-wordmark.png",
    ),
    (
        LOGO_DIR / "hostingbeyond-logo-header.png",
        LOGO_DIR / "hostingbeyond-logo-header.png",
    ),
    (
        LOGO_DIR / "hostingbeyond-logo-wordmark.png",
        LOGO_DIR / "hostingbeyond-logo-transparent.png",
    ),
]


def luminance(r: int, g: int, b: int) -> float:
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def process_image(img: Image.Image) -> tuple[Image.Image, int]:
    rgba = img.convert("RGBA")
    pixels = rgba.load()
    w, h = rgba.size
    transparent_count = 0

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if r <= BLACK_THRESHOLD and g <= BLACK_THRESHOLD and b <= BLACK_THRESHOLD:
                pixels[x, y] = (r, g, b, 0)
                transparent_count += 1
                continue

            lum = luminance(r, g, b)
            if lum < LUMINANCE_SOFTEN:
                scale = lum / LUMINANCE_SOFTEN
                new_a = int(a * scale)
                if new_a == 0:
                    transparent_count += 1
                pixels[x, y] = (r, g, b, new_a)

    return rgba, transparent_count


def count_transparent_alpha(img: Image.Image) -> int:
    data = img.convert("RGBA").get_flattened_data()
    return sum(1 for px in data if px[3] == 0)


def has_any_transparent_pixel(img: Image.Image) -> bool:
    return any(px[3] == 0 for px in img.convert("RGBA").get_flattened_data())


def main() -> None:
    last_size: tuple[int, int] | None = None
    last_transparent = 0
    saved: list[Path] = []

    for source, dest in JOBS:
        if not source.is_file():
            raise SystemExit(f"Source not found: {source}")
        processed, transparent_count = process_image(Image.open(source))
        dest.parent.mkdir(parents=True, exist_ok=True)
        processed.save(dest, format="PNG")
        last_size = processed.size
        last_transparent = transparent_count
        saved.append(dest)

    assert last_size is not None
    w, h = last_size
    verify = Image.open(saved[0]).convert("RGBA")
    has_fully_transparent = has_any_transparent_pixel(verify)

    print(f"Size: {w} x {h}")
    print(f"Approx transparent pixels (alpha=0): {last_transparent}")
    print(f"Verification alpha=0 present: {has_fully_transparent}")
    print("Saved:")
    for p in saved:
        print(f"  {p}")


if __name__ == "__main__":
    main()
