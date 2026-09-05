import sharp from "sharp";

const SRC = "tmp-assets/hero-mockup-target.jpg";
const OUT = "public/images/hero-speaker-scene.png";

const meta = await sharp(SRC).metadata();
const W = meta.width || 1024;
const H = meta.height || 576;

// Right visual: speaker + glass + servers (exclude left copy + bottom partners)
const left = Math.floor(W * 0.46);
const top = Math.floor(H * 0.1);
const width = W - left;
const height = Math.floor(H * 0.72);

const plateW = 920;
const plateH = 760;

const plate = await sharp(SRC)
  .extract({ left, top, width, height })
  .resize(plateW, plateH, { fit: "cover", position: "right" })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { data, info } = plate;
const out = Buffer.from(data);

// Soft left + bottom alpha dissolve so it blends into light hero (no hard rectangle)
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    const nx = x / info.width;
    const ny = y / info.height;

    let a = 1;
    // Left dissolve into page
    if (nx < 0.14) a *= nx / 0.14;
    else if (nx < 0.22) a *= 0.55 + ((nx - 0.14) / 0.08) * 0.45;

    // Bottom dissolve into white shelf
    if (ny > 0.78) a *= 1 - (ny - 0.78) / 0.22;
    if (ny > 0.92) a *= Math.max(0, 1 - (ny - 0.92) / 0.08);

    // Slight top soften
    if (ny < 0.04) a *= ny / 0.04;

    out[i + 3] = Math.round(Math.max(0, Math.min(1, a)) * 255);
  }
}

await sharp(out, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png({ compressionLevel: 8 })
  .toFile(OUT);

console.log("scene", await sharp(OUT).metadata());

// Also rebuild a cleaner speaker cutout from black-bg clear asset for mobile fallback
const clear = "public/images/hero-speaker-clear.png";
const { data: sd, info: si } = await sharp(clear)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const sOut = Buffer.from(sd);
for (let i = 0; i < sOut.length; i += 4) {
  const r = sOut[i];
  const g = sOut[i + 1];
  const b = sOut[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  // Knock black bg; protect dark watch/clicker/lanyard (higher chroma or mid gray with neighbors later)
  if (max < 32 && max - min < 12) {
    sOut[i + 3] = 0;
  } else if (max < 48 && max - min < 10) {
    sOut[i + 3] = Math.round(sOut[i + 3] * ((max - 20) / 28));
  }
}
await sharp(sOut, {
  raw: { width: si.width, height: si.height, channels: 4 },
})
  .png()
  .toFile("public/images/hero-speaker-cutout.png");
console.log("cutout", await sharp("public/images/hero-speaker-cutout.png").metadata());
