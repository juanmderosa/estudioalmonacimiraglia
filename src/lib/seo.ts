export function getSiteUrl(value?: string): string | undefined {
  if (!value?.trim()) return undefined;
  const url = new URL(value.trim());
  if (
    !["https:", "http:"].includes(url.protocol) ||
    ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "PUBLIC_SITE_URL debe ser el dominio público completo, sin rutas, credenciales ni parámetros.",
    );
  }
  return url.href;
}
export function getCanonicalUrl(
  pathname: string,
  site?: URL,
): string | undefined {
  if (!site) return undefined;
  const url = new URL(pathname, site);
  url.search = "";
  url.hash = "";
  return url.href;
}
