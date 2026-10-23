import { expect, test } from "vitest";
import { getCanonicalUrl, getSiteUrl } from "../src/lib/seo";

test("sin dominio no fabrica una URL pública", () => {
  expect(getSiteUrl(" ")).toBeUndefined();
  expect(getCanonicalUrl("/")).toBeUndefined();
});

test("normaliza un dominio y elimina tracking y fragmentos del canonical", () => {
  const site = getSiteUrl(" https://estudio.test ");
  expect(site).toBe("https://estudio.test/");
  expect(getCanonicalUrl("/?utm_source=prueba#contacto", new URL(site!))).toBe(
    "https://estudio.test/",
  );
});

test("rechaza URLs locales, credenciales y rutas usadas como dominio público", () => {
  for (const input of [
    "http://localhost:4321",
    "http://127.0.0.1:4321",
    "ftp://estudio.test",
    "https://usuario:clave@estudio.test",
    "https://estudio.test/contacto",
    "https://estudio.test/?utm_source=prueba",
  ]) {
    expect(() => getSiteUrl(input)).toThrow();
  }
});
