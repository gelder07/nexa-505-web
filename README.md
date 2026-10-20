# Nexa505 · sitio web

Sitio de Nexa505: sistemas de inventario, páginas web, apps, automatizaciones e inteligencia artificial para pymes, desde Nicaragua. El contacto es por WhatsApp (+505 8186 7161).

Es un sitio estático, sin frameworks ni dependencias. Las páginas HTML se generan con un script de Node.

## Estructura

| Archivo o carpeta | Qué es |
|---|---|
| `build.mjs` | Genera todas las páginas. Aquí están los textos del inicio, los servicios, los precios, las preguntas y los testimonios. |
| `casos.mjs` | Los casos: textos, imágenes y enlaces de cada uno. |
| `assets/site.css` | Estilos (estilo Shelf: fondo piedra, hojas claras, letra General Sans y acento lima). |
| `assets/site.js` | Demo de inventario, frases, carrusel, inventario paso a paso, cotizador, filtros, galería y reloj. |
| `assets/img/` | Imágenes. `credits.json` guarda la fuente y la licencia de las fotos de terceros. |
| `assets/og.png` | Imagen de vista previa al compartir el enlace. |
| `index.html`, `casos/` | Páginas generadas. No se editan a mano. |
| `PLAN.md` | Plan de mejoras y lo que falta por conseguir. |

## Cambiar algo

1. Edita `build.mjs` o `casos.mjs`.
2. Genera las páginas (necesitas Node 18 o más reciente):

   ```bash
   node build.mjs
   ```

3. Abre `index.html` en el navegador para revisar.

Para agregar un caso, copia un objeto en `casos.mjs`, cambia el `slug` y los textos y vuelve a generar. Su página aparece en `casos/<slug>/`.

## Antes de publicar

- Los textos que empiezan con `PENDIENTE` se muestran resaltados en amarillo hasta que se reemplazan.
- Lo marcado como **[EJEMPLO]** (testimonios y plazos) es provisional y hay que cambiarlo.
- Si el sitio pasa a un dominio propio, cambia `SITE` en `build.mjs`: la imagen de vista previa usa esa dirección completa.

## Publicar

Publicado en GitHub Pages: https://gelder07.github.io/nexa-505-web/ (rama `main`, carpeta raíz). Cada cambio que se sube a `main` se publica solo en uno o dos minutos.
