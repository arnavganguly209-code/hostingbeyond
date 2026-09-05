import sharp from "sharp";

const SRC = "tmp-assets/hero-mockup-target.jpg";
const OUT = "public/images/hero-speaker-scene.png";

const meta = await sharp(SRC).metadata();
const W = meta.width || 1024;
const H = meta.height || 576;

const left = Math.floor(W * 0.45);
const top = Math.floor(H * 0.08);
const width = W - left;
const height = Math.floor(H * 0.74);

const plateW = 980;
const plateH = 800;

const { data, info } = await sharp(SRC)
  .extract({ left, top, width, height })
  .resize(plateW, plateH, { fit: "cover", position: "right" })
  .modulate({ brightness: 1.04, saturation: 1.02 })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const out = Buffer.from(data);

for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    const nx = x / info.width;
    const ny = y / info.height;

    let a = 1;
    // Stronger left dissolve into light hero
    if (nx < 0.2) a *= Math.pow(nx / 0.2, 1.35);
    // Soft top
    if (ny < 0.06) a *= ny / 0.06;
    // Soft right
    if (nx > 0.94) a *= (1 - nx) / 0.06;
    // Soft bottom into white shelf
    if (ny > 0.72) a *= 1 - Math.pow((ny - 0.72) / 0.28, 1.1);
    if (ny > 0.9) a *= Math.max(0, 1 - (ny - 0.9) / 0.1);

    out[i + 3] = Math.round(Math.max(0, Math.min(1, a)) * 255);
  }
}

await sharp(out, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png({ compressionLevel: 8 })
  .toFile(OUT);

console.log(await sharp(OUT).metadata());
