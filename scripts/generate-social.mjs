import sharp from "sharp";
import { business } from "../src/data/business.ts";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const output = (name) =>
  fileURLToPath(new URL(`../public/${name}`, import.meta.url));
// Tarjeta de marca determinista, sin servicios externos ni fotografías ficticias.

const source = await readFile(
  new URL("../src/assets/logo.png", import.meta.url),
);

const circle = Buffer.from(
  '<svg width="240" height="240"><circle cx="120" cy="120" r="119" fill="white"/></svg>',
);

const logo = await sharp(source)
  .resize(240, 240)
  .composite([{ input: circle, blend: "dest-in" }])
  .png()
  .toBuffer();

const svg =
  Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#faf6ee"/>
  <rect y="590" width="1200" height="40" fill="#007858"/>
  <path d="M850 540V250a140 140 0 0 1 280 0v290Z" fill="#d99480"/>
  <text x="70" y="145" font-family="Arial,sans-serif" font-size="22" fill="#173d32" letter-spacing="4">ESTUDIO JURÍDICO</text>
  <text x="70" y="240" font-family="Georgia,serif" font-size="43" fill="#173d32">${business.name.replaceAll("&", "&amp;").replaceAll("<", "&lt;")}</text>
  <text x="70" y="325" font-family="Georgia,serif" font-size="42" fill="#007858">Tus derechos, nuestra prioridad.</text>
  <text x="70" y="425" font-family="Arial,sans-serif" font-size="24" fill="#173d32">Penal · Familia · Civil y Comercial · Laboral</text>
  <text x="70" y="482" font-family="Arial,sans-serif" font-size="23" fill="#173d32">Defensa comprometida. Atención cercana.</text>
</svg>`);

await sharp(svg)
  .composite([{ input: logo, left: 870, top: 205 }])
  .png()
  .toFile(output("social.png"));

await sharp(source).resize(256, 256).png().toFile(output("favicon.png"));

await sharp(source)
  .resize(180, 180)
  .png()
  .toFile(output("apple-touch-icon.png"));
