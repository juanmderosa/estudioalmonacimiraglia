import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import { loadEnv } from "vite";
import { getSiteUrl } from "../src/lib/seo.ts";

const site = getSiteUrl(
  loadEnv("production", process.cwd(), "PUBLIC_").PUBLIC_SITE_URL,
);
const html = await readFile("dist/index.html", "utf8");
const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map((match) => match[0]);
function meta(key) {
  const tags = metas.filter(
    (tag) => tag.includes(`name="${key}"`) || tag.includes(`property="${key}"`),
  );
  assert.ok(tags.length <= 1, `Meta duplicada: ${key}`);
  return tags[0]?.match(/content="([^"]*)"/)?.[1];
}
assert.equal([...html.matchAll(/<title>/g)].length, 1);
assert.ok(meta("description"));
assert.ok(meta("og:title"));
assert.equal(meta("og:title"), meta("twitter:title"));
assert.equal(meta("description"), meta("og:description"));
assert.equal(meta("description"), meta("twitter:description"));
assert.equal(meta("og:type"), "website");
assert.equal(meta("og:locale"), "es_AR");
assert.equal(meta("twitter:card"), "summary_large_image");
const jsonLd = html.match(
  /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/,
)?.[1];
assert.ok(jsonLd, "Faltan datos estructurados");
assert.equal(JSON.parse(jsonLd)["@type"], "LegalService");
assert.ok(!html.includes("run-audit"), "Código de auditoría en producción");
assert.equal([...html.matchAll(/<picture\b/g)].length, 3);
assert.ok(html.includes("image/avif") && html.includes("image/webp"));
for (const match of html.matchAll(/(?:src|href)="(\/_astro\/[^"?#]+)"/g)) {
  await access(resolve("dist", decodeURIComponent(match[1].slice(1))));
}
const image = await sharp("dist/social.png").metadata();
assert.equal(image.width, 1200);
assert.equal(image.height, 630);
assert.equal(image.format, "png");
await access("dist/favicon.png");
await access("dist/apple-touch-icon.png");
const robots = await readFile("dist/robots.txt", "utf8");
const canonical = html.match(
  /<link\b[^>]*rel="canonical"[^>]*href="([^"]*)"/,
)?.[1];
if (site) {
  assert.equal(canonical, site);
  assert.equal(meta("og:url"), site);
  assert.equal(meta("og:image"), new URL("social.png", site).href);
  assert.equal(meta("twitter:image"), meta("og:image"));
  assert.equal(meta("og:image:width"), "1200");
  assert.equal(meta("og:image:height"), "630");
  assert.ok(meta("og:image:alt"));
  assert.equal(meta("robots"), "index, follow");
  assert.ok(robots.includes(`Sitemap: ${site}sitemap-index.xml`));
  const index = await readFile("dist/sitemap-index.xml", "utf8");
  assert.ok(index.includes(site));
  const pages = await readFile("dist/sitemap-0.xml", "utf8");
  assert.ok(pages.includes(`<loc>${site}</loc>`));
  assert.ok(!pages.includes("__accessibility"));
} else {
  assert.equal(canonical, undefined);
  assert.equal(meta("og:url"), undefined);
  assert.equal(meta("og:image"), undefined);
  assert.equal(meta("robots"), "noindex, nofollow");
  assert.ok(robots.includes("Disallow: /"));
  await assert.rejects(access("dist/sitemap-index.xml"));
}
console.log(
  `Build verificado: SEO, imagen social, recursos y estado ${site ? "con dominio" : "sin dominio"}.`,
);
