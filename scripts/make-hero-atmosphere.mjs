import sharp from "sharp";

const m = await sharp("tmp-assets/hero-mockup-target.jpg").metadata();
const left = Math.floor(m.width * 0.46);
const top = Math.floor(m.height * 0.1);
const width = m.width - left;
const height = Math.floor(m.height * 0.74);

const w = 900;
const h = 720;

const base = await sharp("tmp-assets/hero-mockup-target.jpg")
  .extract({ left, top, width, height })
  .resize(w, h, { fit: "cover" })
  .blur(40)
  .modulate({ brightness: 1.14, saturation: 0.72 })
  .toBuffer();

const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <radialGradient id="g" cx="48%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#eef5ff" stop-opacity="0.95"/>
      <stop offset="40%" stop-color="#dbeafe" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#93c5fd" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#eff6ff" stop-opacity="0.25"/>
      <stop offset="70%" stop-color="#ffffff" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#b)"/>
</svg>`);

await sharp(base)
  .composite([{ input: svg, blend: "over" }])
  .jpeg({ quality: 86 })
  .toFile("public/images/hero-atmosphere.jpg");

console.log(await sharp("public/images/hero-atmosphere.jpg").metadata());
