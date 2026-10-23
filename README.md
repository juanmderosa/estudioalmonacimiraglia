# Almonaci & Miraglia

Landing estática con Astro 7, Tailwind 4 y TypeScript. Diseño editorial cálido, logo original optimizado y formulario hacia WhatsApp. No almacena consultas ni requiere backend. Los textos institucionales son provisionales.

## Desarrollo y verificación

Usar Node.js 24 LTS (`.node-version`) y pnpm 10.18.3, registrado en `packageManager`. La terminal debe mostrar una versión compatible en `node --version`.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm test
pnpm build
pnpm preview
```

`pnpm test:watch` mantiene Vitest en modo observación. El único lockfile del proyecto es `pnpm-lock.yaml`; no mezclar instalaciones de npm. Los scripts conservan llamadas directas a Node por el problema del lanzador de Windows con `&` en la ruta, pero usan el host y puerto predeterminados de Astro.

TypeScript permanece en 6.0.3 porque `@astrojs/check` 0.9.12 todavía no declara soporte para TypeScript 7. No se fuerzan peers ni versiones de Vite con overrides.

## Dominio y SEO antes de publicar

Todavía no existe un dominio confirmado. Por defecto el sitio genera `noindex, nofollow` y un `robots.txt` que impide rastrearlo; no emite canonical, URLs sociales ni sitemap con una dirección inventada.

Cuando exista el dominio, copiar `.env.example` a `.env` y completar `PUBLIC_SITE_URL` con su origen HTTPS real, sin rutas, parámetros ni fragmentos. Después ejecutar `pnpm build` de nuevo. También puede definirse esa variable en el entorno del proveedor de hosting.

Con la variable configurada, Astro genera:

- Canonical y `og:url` absolutos, con la URL de la página sin tracking.
- Título, descripción, Open Graph y Twitter Card; imagen social PNG de 1200 × 630 y su texto alternativo.
- Datos estructurados `LegalService` con nombre, teléfonos y red social confirmados; sin inventar dirección, horarios ni reseñas.
- `sitemap-index.xml`, sitemap de la página pública y robots que permite indexación. La ruta de QA no se incluye.

La tarjeta social, favicon y apple-touch-icon se regeneran al compilar. `pnpm generate:social` permite regenerarlos por separado. El sitio no está publicado: las vistas previas sociales reales requieren un dominio público accesible.

## Organización

- `src/layouts/SiteLayout.astro`: documento HTML, idioma, head y estilos compartidos.
- `src/components/Head.astro`: metadatos por página con defaults del negocio.
- `src/data/business.ts`: identidad, teléfonos, servicios y enlaces compartidos.
- `src/components/`: secciones con sus estilos e interacción; `Brand` y `Logo` se reutilizan en cabecera, hero y footer.
- `src/assets/logo.png`: original usado por `Picture` de `astro:assets`, con variantes AVIF, WebP y PNG responsive.
- `src/styles/global.css`: tokens, tipografía, foco y utilidades comunes.

## Accesibilidad y contacto

El menú móvil se superpone al hero sin desplazarlo y funciona con teclado y Escape. Los enlaces de WhatsApp y el formulario abren otra pestaña e informan ese cambio de contexto. El formulario prepara el mensaje, que la persona revisa y envía desde WhatsApp; no se envían consultas automáticamente. Sin JavaScript hay un enlace de contacto directo.

Objetivo WCAG 2.2 AA: etiquetas, errores asociados, foco visible, movimiento reducido, reflujo y contraste. Texto sobre salmón: 6,13:1. Los archivos internos de auditoría se retiraron del sitio; las comprobaciones históricas y los límites reales de esta revisión están en `VALIDACION.md`.

`pnpm verify:build` valida el HTML de `dist/`: metadatos, datos estructurados, imagen social, variantes del logo y estado de indexación según `PUBLIC_SITE_URL`. Debe ejecutarse con la misma configuración de dominio usada en el build.
