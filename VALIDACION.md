# Verificación de la entrega

## Actualización del 23 de octubre de 2026

- Migración a pnpm 10.18.3, importando las versiones del lockfile previo; `pnpm install --frozen-lockfile` correcto. Se eliminó el lockfile de npm.
- Layout de documento y head reutilizable, datos del negocio compartidos y estilos de cada sección en su componente. Marca compartida en cabecera y footer.
- Logo original en `src/assets/`, optimizado mediante `Picture` con AVIF, WebP y respaldo PNG, tamaños responsive y dimensiones explícitas. Tarjeta social PNG de 1200 × 630 revisada visualmente.
- Cinco pruebas de Vitest aprobadas: contacto y resolución segura de URLs públicas. Comprobación de tipos sin errores, advertencias ni sugerencias.
- Verificador de HTML de producción aprobado sin dominio y con un dominio `.test` usado únicamente para verificación: títulos, descripciones, OG/Twitter, datos estructurados, imágenes, robots, canonical y sitemap.
- La entrega final se regenera sin dominio ficticio. Hasta completar `PUBLIC_SITE_URL`, no se permite indexación ni se emiten canonical, URLs sociales o sitemap con una dirección inventada.
- Revisión en navegador a 1280, 768 y 320 píxeles, sin desbordamiento horizontal. En móvil, el hero permanece en la misma coordenada al abrir el menú; cierre con Escape y foco de retorno verificados. Botón de menú de al menos 44 × 44 px.
- Formulario vacío verificado en móvil: errores visibles y foco en el primer campo. No se enviaron mensajes de prueba a WhatsApp.
- Se preservó la retirada de los archivos internos de auditoría realizada durante la revisión. No se volvió a ejecutar axe en esta actualización. Los resultados automáticos anteriores se conservan abajo como históricos.

## Comprobaciones de la migración anterior

- Migración del 22 de octubre de 2026: Astro 7.4.2, Vite 8.3.5, Tailwind 4.3.3, Vitest 5.0.5 y TypeScript 6.0.3. Se eliminó el override que forzaba Vite 7 y se actualizó el lockfile.
- TypeScript 7.0.2 está disponible, pero `@astrojs/check` 0.9.12 declara soporte para TypeScript 5 y 6. Se mantiene la última estable compatible de la línea 6, sin omitir ni forzar los requisitos de peers.
- Verificación ejecutada con Node.js 24.19.0. `.node-version` indica Node 24; el Node 22.17.1 anterior del equipo no cumple los nuevos requisitos.
- Astro check final: 19 archivos revisados, sin errores, advertencias ni sugerencias.
- Compilación estática: correcta con Astro 7 y Vite 8, sin advertencias.
- La salida contiene una sola página y no incluye axe ni la ruta de auditoría.
- Pruebas del mensaje de WhatsApp con Vitest: 2 casos aprobados, incluyendo tildes, signos, saltos de línea, teléfono opcional y codificación de parámetros. No se enviaron mensajes reales.

## Revisión de interfaz previa a la migración

Los resultados siguientes corresponden a la revisión inicial del diseño. No se volvió a ejecutar la auditoría de navegador tras actualizar las dependencias; en esta migración se verificaron dependencias, pruebas unitarias, tipos y compilación.

- Auditoría axe con reglas WCAG 2 A/AA, 2.1 AA y 2.2 AA: cero infracciones detectadas a 1280, 768, 640 y 320 píxeles, tanto en estado inicial como con errores visibles.
- Sin desbordamiento horizontal en los cuatro anchos, incluyendo 640 y 320 píxeles como comprobación del reflujo equivalente al ampliar una ventana de 1280 al 200 % y 400 %.
- Formulario vacío: tres campos inválidos, resumen visible y foco en el nombre. Etiquetas, ayudas y errores expuestos en el árbol de accesibilidad.
- Menú móvil a 320 píxeles: apertura con Enter, cierre con Escape y devolución del foco al botón.
- Enlace para saltar al contenido: mueve el foco al contenido principal.
- Foco del botón de envío visible por encima de la franja de WhatsApp, sin quedar tapado al completar el desplazamiento.
- Revisión visual en navegador del hero, formulario, pie y vista móvil.

## Contrastes

Ratios calculados con luminancia relativa sRGB; no se redondean para decidir si pasan el umbral.

| Uso | Colores | Ratio aproximado |
| --- | --- | --- |
| Texto sobre salmón | #0D2B22 / #D99480 | 6,13:1 |
| Botones y pie | #FFFFFF / #007858 | 5,49:1 |
| Enlaces sobre marfil | #007858 / #FAF6EE | 5,09:1 |
| Texto principal | #173D32 / #FAF6EE | 11,13:1 |

Axe dejó para revisión manual los símbolos decorativos de flecha y menú. Utilizan los mismos colores de alto contraste que sus etiquetas; están ocultos a tecnologías de asistencia y acompañados de texto visible. El logo mantiene su diseño original.

## Límites de la comprobación

La revisión del árbol de accesibilidad no sustituye una prueba con una persona usando NVDA, Narrador o VoiceOver. No se realizó una sesión con lector de pantalla ni una prueba de zoom real de navegador: se comprobaron los anchos CSS equivalentes. No se certifica conformidad completa únicamente con la auditoría automática. Antes de publicar conviene completar esas pruebas y revisar los textos institucionales provisionales.
