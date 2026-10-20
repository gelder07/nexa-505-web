// Genera el sitio estático: index.html, casos/index.html y casos/<slug>/index.html.
// Uso: node build.mjs   (Node 18+, sin dependencias)
import { writeFileSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { casos } from './casos.mjs';

const WA = 'https://wa.me/50581867161?text=';
const MSG = 'Hola, vi Nexa505 y quiero contarles lo que necesita mi negocio.';
const wa = (msg = MSG) => WA + encodeURIComponent(msg);
const ext = 'target="_blank" rel="noopener"';
// Dirección pública del sitio. WhatsApp necesita la dirección completa de la imagen de vista previa; cámbiala si pasa a un dominio propio.
const SITE = 'https://gelder07.github.io/nexa-505-web/';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Los textos que empiezan por PENDIENTE se marcan para que nadie los publique sin querer.
const t = (s) => (/^PENDIENTE/.test(s) ? `<span class="pend">[${esc(s)}]</span>` : esc(s));
// Contenido provisional de la fase 1: va en la web para ver el diseño, pero se cambia antes de publicar.
const EJ = '<span class="pend">[EJEMPLO]</span>';

const img = (p, src, w, h, alt, { sm = false, eager = false, cls = 'cover', pos } = {}) =>
  `<img class="${cls}" src="${p}assets/img/${sm ? 'sm/' : ''}${src}" width="${sm ? Math.min(w, 560) : w}" height="${sm ? Math.round(h * Math.min(w, 560) / w) : h}" alt="${esc(alt)}"${pos ? ` style="object-position:${pos}"` : ''}${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;

const credits = JSON.parse(readFileSync('assets/img/credits.json', 'utf8'));
// Créditos solo de las fotos que aparecen en cada página.
const creditList = (html) => credits
  .filter((c) => html.includes(c.file.split('/').pop()))
  .map((c) => `<a href="${esc(c.page)}">“${esc(c.title)}”</a> de ${esc(c.creator)}, <a href="${esc(c.licenseUrl)}">${esc(c.license)}</a>, vía ${esc(c.via)}`)
  .join('; ');

const NAV = [
  ['Servicios', 'index.html#servicios'],
  ['Casos', 'casos/index.html'],
  ['Precios', 'index.html#precios'],
  ['Preguntas', 'index.html#preguntas'],
];

function layout({ p, title, desc, body, current }) {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_NI">
<meta property="og:image" content="${SITE}assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#efeee9">
<link rel="icon" href="${p}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://api.fontshare.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${p}assets/site.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<a class="skip" href="#contenido">Saltar al contenido</a>
<header class="top">
  <a class="mark" href="${p}index.html" aria-label="Nexa505, inicio">Nexa505</a>
  <nav class="nav" aria-label="Principal">
    ${NAV.map(([l, h]) => `<a class="link" href="${p}${h}"${current === l ? ' aria-current="page"' : ''}>${l}</a>`).join('\n    ')}
  </nav>
  <a class="button button-sm top-cta" href="${wa()}" ${ext}>Escríbenos por WhatsApp</a>
  <details class="menu">
    <summary>Menú</summary>
    <nav aria-label="Principal en celular">
      <a href="${p}index.html">Inicio</a>
      ${NAV.map(([l, h]) => `<a href="${p}${h}">${l}</a>`).join('\n      ')}
      <a href="${wa()}" ${ext}>Escríbenos por WhatsApp</a>
    </nav>
  </details>
</header>
<main id="contenido">
${body}
</main>
${footer(p, body)}
<script src="${p}assets/site.js" defer></script>
</body>
</html>
`;
}

function footer(p, body) {
  const cr = creditList(body);
  return `<footer class="foot">
  <div class="foot-cols">
    <nav aria-label="Sitio"><h2>Sitio</h2><a class="link" href="${p}index.html">Inicio</a>${NAV.map(([l, h]) => `<a class="link" href="${p}${h}">${l}</a>`).join('')}</nav>
    <nav aria-label="Casos"><h2>Casos</h2>${casos.map((c) => `<a class="link" href="${p}casos/${c.slug}/index.html">${esc(c.titulo)}</a>`).join('')}</nav>
    <div><h2>Contacto</h2>
      <a class="link" href="${wa()}" ${ext}>WhatsApp +505 8186 7161</a>
      <span>Desde Nicaragua, para pymes de aquí y de fuera</span>
    </div>
  </div>
  <p class="foot-name" aria-hidden="true">Nexa505</p>
  <div class="foot-last">
    <span>© ${new Date().getFullYear()} Nexa505</span>
    ${cr ? `<p class="credits">Fotos: ${cr}.</p>` : ''}
  </div>
</footer>`;
}

// ---------- datos del inicio ----------
// Inventario de ejemplo de una ferretería: alimenta la demo de la primera pantalla.
const PRODUCTOS = [
  ['Cemento gris 42.5 kg', 340, 'bolsas', 'Bodega 1 · Pasillo B · Estante 2', 390],
  ['Cemento blanco 20 kg', 46, 'bolsas', 'Bodega 1 · Pasillo B · Estante 4', 610],
  ['Mortero premezclado 40 kg', 8, 'bolsas', 'Bodega 2 · Pasillo A · Estante 1', 285],
  ['Pegamento para cerámica 20 kg', 122, 'bolsas', 'Bodega 2 · Pasillo C · Estante 3', 330],
  ['Varilla corrugada 3/8 × 6 m', 915, 'unid.', 'Patio · Rack 5', 168],
  ['Varilla corrugada 1/2 × 6 m', 430, 'unid.', 'Patio · Rack 6', 298],
  ['Bloque de concreto 15 cm', 2400, 'unid.', 'Patio · Zona A', 32],
  ['Arena de río', 18, 'm³', 'Patio · Zona C', 950],
  ['Lámina de zinc cal. 26 × 12 pies', 260, 'unid.', 'Bodega 3 · Pasillo A · Estante 1', 520],
  ['Clavo de 3 pulgadas', 96, 'lb', 'Bodega 1 · Pasillo D · Gaveta 7', 45],
  ['Tubo PVC 1/2 pulgada × 6 m', 7, 'unid.', 'Bodega 3 · Pasillo B · Estante 2', 115],
  ['Pintura de aceite blanca', 64, 'galones', 'Bodega 2 · Pasillo D · Estante 1', 780],
  ['Tabla de pino 1 × 12 × 12 pies', 150, 'unid.', 'Bodega 3 · Pasillo C · Estante 4', 410],
  ['Alambre de amarre', 210, 'lb', 'Bodega 1 · Pasillo D · Gaveta 2', 52],
];
const BAJO = 10;
const num = (n) => n.toLocaleString('en-US');
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const ESPARCIDO = ['Excel de inventario', 'Cuaderno de ventas', 'Grupo de WhatsApp', 'Fotos de facturas', 'La memoria del encargado', 'Notas en el celular', 'Pedidos por correo'];

const PROBLEMAS = [
  { frase: 'No sabemos cuánto stock tenemos.', servicio: 'Sistema de inventario', detalle: 'Existencias al día, por producto y por bodega.', precio: 'desde $950' },
  { frase: 'Cuando un cliente pregunta, hay que ir a contar de nuevo.', servicio: 'Sistema de inventario', detalle: 'Buscas el producto y ves cuántos hay y en qué estante están.', precio: 'desde $950' },
  { frase: 'Todo lo llevamos en Excel.', servicio: 'Sistema de inventario', detalle: 'Tus hojas pasan a un sistema que todo el equipo usa al mismo tiempo.', precio: 'desde $950' },
  { frase: 'Pasamos horas haciendo lo mismo a mano.', servicio: 'Automatizaciones', detalle: 'Correos, reportes y tareas repetitivas que se hacen solas.', precio: 'desde $350' },
  { frase: 'Nuestra web está vieja y no podemos cambiarla.', servicio: 'Web autoadministrable', detalle: 'Cambias textos, precios y fotos tú mismo, sin esperar a un técnico.', precio: '$650 a $750' },
];

// Servicios: alimentan el carrusel, la lista de precios y el cotizador.
// min/max en dólares (null = según alcance); sem = plazo en semanas [EJEMPLO].
const SERVICIOS = [
  { id: 'inventario', n: 'Sistema de inventario', d: 'Existencias y ubicación de cada producto, al día.', precio: 'desde $950', min: 950, sem: [6, 8], color: 'lima', caso: 0, dibujo: 'inventario' },
  { id: 'web', n: 'Web autoadministrable', d: 'Cambias textos, precios y fotos tú mismo.', precio: '$650 a $750', min: 650, max: 750, sem: [3, 4], color: 'cielo', caso: 2, dibujo: 'web' },
  { id: 'landing', n: 'Landing page', d: 'Una página enfocada en que te escriban o te compren.', precio: 'desde $350', min: 350, sem: [1, 2], color: 'arena', caso: null, dibujo: 'landing' },
  { id: 'auto', n: 'Automatizaciones', d: 'Correos, reportes y tareas que se hacen solas.', precio: 'desde $350', min: 350, sem: [1, 3], color: 'menta', caso: null, dibujo: 'auto' },
  { id: 'app', n: 'App móvil', d: 'Pensada para cómo trabaja tu equipo.', precio: 'desde $750', min: 750, sem: [8, 12], color: 'coral', caso: 4, dibujo: 'app' },
  { id: 'ia', n: 'Inteligencia artificial', d: 'Asistentes que buscan, resumen y arman documentos.', precio: 'Según alcance', min: null, sem: null, color: 'tinta', caso: 1, dibujo: 'ia' },
  { id: 'mant', n: 'Mantenimiento mensual', d: 'Soporte, respaldos y mejoras cada mes.', precio: 'Según alcance', min: null, sem: null, color: 'amarillo', caso: null, dibujo: 'mant' },
];
const plazo = (s) => (s.sem ? `${s.sem[0]} a ${s.sem[1]} semanas` : 'Según alcance');

const TESTIMONIOS = [
  ['Antes contábamos el cemento a mano cada vez que alguien preguntaba. Ahora lo vemos en el celular en dos segundos.', 'María López', 'administradora, Ferretería El Pilar'],
  ['Cambiamos precios y fotos nosotros mismos, sin esperar a nadie.', 'Carlos Ruiz', 'gerente, Distribuidora Ruiz'],
  ['Siempre supe a quién escribirle. La misma persona hizo todo, de principio a fin.', 'Ana Morales', 'dueña, Óptica Morales'],
];

const PASOS = [
  ['Conversamos 15 minutos', 'Por WhatsApp o videollamada. Nos cuentas cómo trabajas hoy y qué te quita más tiempo.', 'charla'],
  ['Propuesta con precio cerrado', 'Recibes por escrito qué incluye, cuánto cuesta y cuándo se entrega. Sin sorpresas después.', 'propuesta'],
  ['Pagas el 50% y entregamos por fases', 'Ves avances reales, pruebas cada parte y pides ajustes antes de seguir.', 'fases'],
  ['El otro 50% al entregar', 'Te enseñamos a usarlo y a administrarlo. El soporte queda disponible para dudas y mejoras.', 'entrega'],
];

const FAQ = [
  ['¿Dependo de ustedes para actualizar mi web o sistema?', 'No. Todo se entrega autoadministrable y te capacitamos para que cambies textos, precios, fotos y datos por tu cuenta.'],
  ['¿Cuánto tarda un proyecto?', 'Depende del servicio: una landing page, de 1 a 2 semanas; una web autoadministrable, de 3 a 4; un sistema de inventario, de 6 a 8; una app móvil, de 8 a 12. El plazo exacto va por escrito en la propuesta.'],
  ['¿Cómo se paga?', 'El 50% al empezar y el otro 50% al entregar. El precio es cerrado: lo que dice la propuesta es lo que pagas.'],
  ['¿Trabajan con negocios fuera de Nicaragua?', 'Sí. Trabajamos por videollamada y WhatsApp con negocios de otros países.'],
  ['¿Y si no sé qué necesito?', 'Empezamos con una conversación de 15 minutos y te decimos por dónde conviene comenzar, aunque sea algo pequeño.'],
  ['¿Cuánto cuesta el mantenimiento?', 'Según el alcance: no es lo mismo cuidar una landing page que un sistema de inventario con varias bodegas. Te lo cotizamos junto con el proyecto.'],
];

const TECH = ['React', 'Next.js', 'Angular', 'React Native', 'Laravel', 'Python', 'Django', 'AWS', 'PostgreSQL'];

// ---------- piezas de interfaz dibujadas en HTML (data-ui) ----------
const invRow = ([n, q, u, loc, pr]) =>
  `<tr data-k="${esc(fold(n))}"><td>${esc(n)}</td><td class="n${q < BAJO ? ' low' : ''}">${num(q)} ${u}</td><td><span class="loc">${esc(loc)}</span></td><td class="n">C$ ${num(pr)}</td></tr>`;

const DIBUJOS = {
  inventario: `<div class="d-search">cemento</div><div class="d-row"><span>Cemento gris 42.5 kg</span><b>340</b></div><div class="d-row"><span>Cemento blanco 20 kg</span><b>46</b></div><span class="loc">Bodega 1 · Pasillo B · Estante 2</span>`,
  web: `<div class="d-browser"><div class="d-bar">ferreteriaelpilar.com</div><div class="d-page"><strong>Materiales para tu obra</strong><span>Entregas en Managua el mismo día</span><div class="d-prods"><span>Cemento<b>C$ 390</b></span><span>Zinc<b>C$ 520</b></span><span>Pintura<b>C$ 780</b></span></div></div></div>`,
  landing: `<div class="d-phone"><strong>Pintura a domicilio</strong><span>Cotiza tu casa en un minuto</span><span class="d-btn">Pedir por WhatsApp</span></div>`,
  auto: `<div class="d-flow"><span>Venta registrada</span><i aria-hidden="true">↓</i><span>Factura enviada por correo</span><i aria-hidden="true">↓</i><span class="on">Reporte de ventas cada viernes</span></div>`,
  app: `<div class="d-phone"><strong>Pedidos de hoy</strong><div class="d-row"><span>Óptica Morales</span><b>3</b></div><div class="d-row"><span>Bodega Norte</span><b>7</b></div><div class="d-row"><span>Ruta Masaya</span><b>12</b></div></div>`,
  ia: `<div class="d-chat"><p class="q">Resume el capítulo de insuficiencia cardiaca</p><p class="a">Listo: resumen de 1 página y presentación de 12 diapositivas, con 3 fuentes.</p></div>`,
  mant: `<div class="d-check"><span>Respaldo diario<b>2:00 a. m.</b></span><span>Actualizaciones<b>Al día</b></span><span>Cambio pedido: precio del cemento<b>Hecho</b></span></div>`,
};

// Pantallas de "Inventario paso a paso": misma tienda, mismos números que la demo de arriba.
const VENDIDOS = [['Cemento gris 42.5 kg', 64, 390], ['Varilla corrugada 3/8', 80, 168], ['Lámina de zinc', 15, 520], ['Bloque de concreto 15 cm', 200, 32], ['Pintura de aceite blanca', 4, 780]];
const totalVentas = VENDIDOS.reduce((s, [, q, pr]) => s + q * pr, 0);
const maxVenta = Math.max(...VENDIDOS.map(([, q, pr]) => q * pr));
const PANTALLAS = [
  `<div class="s-search"><span class="s-input">cem<span class="caret"></span></span>
    <ul class="s-sug"><li class="on">Cemento gris 42.5 kg</li><li>Cemento blanco 20 kg</li><li>Mortero premezclado 40 kg</li></ul></div>`,
  `<div class="s-detail"><p class="s-title">Cemento gris 42.5 kg</p>
    <p class="s-big">340 <span>bolsas</span></p>
    <p class="loc loc-big">Bodega 1 · Pasillo B · Estante 2</p>
    <dl class="s-facts"><div><dt>Precio</dt><dd>C$ 390</dd></div><div><dt>Vendidas este mes</dt><dd>512 bolsas</dd></div><div><dt>Última entrada</dt><dd>15 de octubre</dd></div></dl></div>`,
  `<div class="s-form"><p class="s-title">Nueva entrada</p>
    <div class="s-field"><span>Producto</span><b>Cemento gris 42.5 kg</b></div>
    <div class="s-field"><span>Cantidad</span><b>+ 120 bolsas</b></div>
    <div class="s-field"><span>Proveedor</span><b>Cementera del Norte</b></div>
    <p class="s-toast">Entrada guardada: de 340 a 460 bolsas</p></div>`,
  `<div class="s-report"><p class="s-title">Ventas de hoy <b>C$ ${num(totalVentas)}</b></p>
    <ul class="s-bars">${VENDIDOS.map(([n, q, pr]) => `<li><span>${esc(n)}</span><i style="--w:${((q * pr) / maxVenta * 100).toFixed(1)}%"></i><b>C$ ${num(q * pr)}</b></li>`).join('')}</ul>
    <p class="s-note">Por reponer: Mortero premezclado (8 bolsas) y Tubo PVC (7 unid.)</p></div>`,
];
const PASOS_INV = [
  ['Buscas un producto', 'Escribes las primeras letras y el sistema te sugiere el producto, aunque no recuerdes el nombre exacto.'],
  ['Ves cuánto hay y dónde está', 'Existencias, precio y el estante exacto. Ya nadie tiene que ir a la bodega a contar.'],
  ['Registras una entrada', 'Llega el camión, anotas la cantidad y el número se actualiza para todo el equipo al mismo tiempo.'],
  ['Ves el reporte del día', 'Qué se vendió, cuánto entró y qué hay que reponer antes de que se acabe.'],
];
const ventana = (inner, titulo = 'Inventario') => `<div class="win" data-ui><div class="win-bar"><strong>${titulo}</strong><span>${titulo === 'Inventario' ? 'Ferretería El Pilar · Bodega central' : 'Fuentes filtradas'}</span></div><div class="win-body">${inner}</div></div>`;

// Teléfono con Contollo: la sala en 3D y los muebles que caen en su lugar.
const PHONE_CONTOLLO = `<div class="phone" data-ui><div class="phone-in contollo">
        <p class="ph-h">Sala principal<span>Espacio escaneado · 4.2 × 3.6 m</span></p>
        <p class="ph-tabs"><span>2D</span><span class="on">3D</span><span>Decorar</span></p>
        <svg class="room" viewBox="0 -20 340 300" role="img" aria-label="Sala en 3D con sofá, mesa y planta">
          <polygon points="170,110 320,195 170,280 20,195" fill="#e4e3dc"/>
          <polygon points="20,195 20,75 170,-10 170,110" fill="#d2d1c9"/>
          <polygon points="170,110 170,-10 320,75 320,195" fill="#bebdb4"/>
          <polygon points="220,52 270,80 270,140 220,112" fill="#f4f4ef"/>
          <g class="drop d1"><polygon points="60,200 60,172 140,127 140,155" fill="#7fbf4f"/><polygon points="60,200 140,155 190,183 110,228" fill="#6aa83e"/><polygon points="60,200 110,228 110,244 60,216" fill="#4f8a2b"/><polygon points="110,228 190,183 190,199 110,244" fill="#467c26"/></g>
          <g class="drop d2"><polygon points="200,220 240,197 270,214 230,237" fill="#a7835d"/><polygon points="230,237 270,214 270,226 230,249" fill="#866645"/><polygon points="200,220 230,237 230,249 200,232" fill="#6e5236"/></g>
          <g class="drop d3"><polygon points="250,150 268,160 268,200 250,190" fill="#55524a"/><circle cx="259" cy="140" r="16" fill="#3f6b33"/></g>
        </svg>
        <p class="ph-cat"><span>Sofá 3 plazas</span><span>Mesa de centro</span><span>Planta</span></p>
      </div></div>`;

// Pantallas de la plataforma de IA: pregunta, respuesta con fuentes y presentación generada.
const IA_SCREENS = [
  `<div class="s-chat"><p class="q">¿Cuáles son los signos de alarma de la insuficiencia cardiaca?</p>
    <p class="a">Disnea de reposo, edema que progresa, ganancia de peso rápida y síncope. Resumen en 1 página.</p>
    <ul class="s-src"><li>Harrison, cap. 257</li><li>Guía ESC 2023</li><li>Manual MSD</li></ul></div>`,
  `<div class="s-slides"><p class="s-title">Presentación lista <b>12 diapositivas</b></p>
    <ol class="s-deck"><li>Definición</li><li>Fisiopatología</li><li>Signos de alarma</li><li>Diagnóstico</li><li>Tratamiento</li><li>Fuentes</li></ol>
    <p class="s-toast">Descargar en PowerPoint</p></div>`,
];

// ---------- INICIO ----------
function home() {
  const p = '';
  const caseLink = (s) => (s.caso === null
    ? `<a class="srv-go" href="${wa(`Hola, me interesa: ${s.n}. ¿Podemos conversar?`)}" ${ext}>Preguntar por WhatsApp</a>`
    : `<a class="srv-go" href="casos/${casos[s.caso].slug}/index.html">Ver el caso</a>`);

  const body = `
<section class="hero sheet" aria-labelledby="h1">
  <div class="hero-text">
    <h1 id="h1" data-rise>Tu negocio, en un solo lugar</h1>
    <p class="hero-sub" data-rise style="--i:1">Sistemas de inventario, páginas web, apps y automatizaciones para pymes. Una sola persona te atiende de principio a fin.</p>
    <div class="hero-actions" data-rise style="--i:2">
      <a class="button" href="${wa()}" ${ext}>Escríbenos por WhatsApp</a>
      <a class="button button-soft" href="casos/index.html">Ver casos</a>
    </div>
  </div>
  <div class="demo" data-rise style="--i:3">
    <div class="win win-demo" data-ui>
      <div class="win-bar"><strong>Inventario</strong><span>Ferretería El Pilar · Bodega central</span><span class="win-tag">Demo en vivo</span></div>
      <div class="demo-grid">
        <ul class="demo-side" aria-label="Menú de la demo">
          <li class="on">Productos <b>1,284</b></li><li>Entradas <b>38</b></li><li>Salidas <b>211</b></li><li>Bodegas <b>3</b></li><li>Reportes</li>
        </ul>
        <div class="demo-main">
          <label class="demo-search"><span class="sr">Buscar un producto</span>
            <input id="inv-q" type="search" placeholder="Escribe un producto: cemento, varilla, pintura…" autocomplete="off" spellcheck="false">
          </label>
          <p class="demo-count" aria-live="polite"><span id="inv-n">${PRODUCTOS.length} productos</span> · existencias en tiempo real</p>
          <p class="demo-empty" hidden>Ese producto no está en la demo. En tu sistema estarían todos los tuyos.</p>
          <div class="demo-table"><table>
            <thead><tr><th>Producto</th><th>Existencia</th><th>Ubicación</th><th>Precio</th></tr></thead>
            <tbody id="inv-rows">${PRODUCTOS.map(invRow).join('')}</tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="mess sec" aria-labelledby="h-mess">
  <div class="mess-box">
  <div class="mess-cloud" aria-hidden="true">
    ${ESPARCIDO.map((x, i) => `<span class="chip c${i}" style="--n:${i}">${esc(x)}</span>`).join('\n    ')}
  </div>
  <div class="mess-text">
    <h2 id="h-mess" class="head" data-reveal>Tu negocio está regado por todos lados</h2>
    <p class="lead" data-reveal style="--i:1">Las existencias en un Excel, los pedidos en WhatsApp, las facturas en fotos y el resto en la memoria del encargado. Cuando alguien pregunta, nadie sabe con certeza.</p>
  </div>
  </div>
</section>

<section class="one sheet sec" aria-labelledby="h-one">
  <div class="one-head">
    <h2 id="h-one" class="head" data-reveal>Ahora, en un solo lugar</h2>
    <p class="lead" data-reveal style="--i:1">¿Cuál de estas frases te suena? Elige una y te dejamos el mensaje listo.</p>
  </div>
  <div class="one-body">
    <div class="phrases" role="group" aria-label="Frases frecuentes" data-reveal>
      ${PROBLEMAS.map((x, i) => `<button class="phrase" aria-pressed="${i === 0}" data-msg="${esc(`${MSG} Lo que más nos pesa hoy: "${x.frase}"`)}" data-srv="${esc(x.servicio)}" data-det="${esc(x.detalle)}" data-pr="${esc(x.precio)}">${esc(x.frase)}</button>`).join('\n      ')}
    </div>
    <div class="answer" data-reveal style="--i:1">
      <p class="answer-k">Lo arregla</p>
      <p class="answer-srv"><strong id="ans-srv">${esc(PROBLEMAS[0].servicio)}</strong> <span id="ans-pr" class="nums">${esc(PROBLEMAS[0].precio)}</span></p>
      <p id="ans-det">${esc(PROBLEMAS[0].detalle)}</p>
      <p class="bubble" id="ans-msg">${esc(`${MSG} Lo que más nos pesa hoy: "${PROBLEMAS[0].frase}"`)}</p>
      <a class="button" id="ans-go" href="${wa(`${MSG} Lo que más nos pesa hoy: "${PROBLEMAS[0].frase}"`)}" ${ext}>Enviar por WhatsApp</a>
    </div>
  </div>
</section>

<section class="srv sec" id="servicios" aria-labelledby="h-serv">
  <div class="srv-head">
    <h2 id="h-serv" class="head" data-reveal>Lo que hacemos</h2>
    <div class="srv-ctrl" data-reveal style="--i:1">
      <button class="round" data-dir="-1" aria-label="Servicio anterior">←</button>
      <button class="round" data-dir="1" aria-label="Servicio siguiente">→</button>
    </div>
  </div>
  <ul class="deck" aria-label="Servicios">
    ${SERVICIOS.map((s, i) => `<li class="card k-${s.color}" style="--rot:${[-3, 2, -1.5, 2.5, -2, 1.5, -2.5][i]}deg">
      <div class="card-pic" data-ui>${DIBUJOS[s.dibujo]}</div>
      <h3 class="card-name">${esc(s.n)}</h3>
      <p>${esc(s.d)}</p>
      <p class="card-foot"><span class="nums">${esc(s.precio)}</span>${caseLink(s)}</p>
    </li>`).join('\n    ')}
  </ul>
</section>

<section class="steps sheet sheet-dark sec" aria-labelledby="h-steps">
  <h2 id="h-steps" class="head steps-h" data-reveal>Tu inventario, paso a paso</h2>
  <div class="steps-grid">
    <ol class="steps-list">
      ${PASOS_INV.map(([h, d], i) => `<li class="step" data-step="${i}">
        <h3>${esc(h)}</h3>
        <p>${esc(d)}</p>
        <div class="step-pic">${ventana(PANTALLAS[i])}</div>
      </li>`).join('\n      ')}
    </ol>
    <div class="steps-stage" aria-hidden="true">
      <div class="steps-frame">${PANTALLAS.map((s, i) => `<div class="stage-screen${i === 0 ? ' is-on' : ''}" data-screen="${i}">${ventana(s)}</div>`).join('')}</div>
    </div>
  </div>
</section>

<section class="apps sec" aria-labelledby="h-apps">
  <h2 id="h-apps" class="sr">Apps móviles</h2>
  <article class="app-row">
    <div class="app-panel" data-reveal>
      ${PHONE_CONTOLLO}
    </div>
    <div class="app-text">
      <h3 class="head" data-reveal>Escanea la sala y decórala en 3D</h3>
      <p class="lead" data-reveal style="--i:1">Contollo convierte un espacio real en un modelo 2D y 3D en tiempo real, y muestra cómo quedaría con muebles de catálogos reales antes de comprar.</p>
      <a class="link-plain" href="casos/${casos[4].slug}/index.html" data-reveal style="--i:2">Ver el caso de Contollo</a>
    </div>
  </article>
  <article class="app-row app-row-flip">
    <div class="app-panel app-panel-red" data-reveal>
      <div class="phone" data-ui><div class="phone-in phone-scroll">${img(p, 'wellpro-movil.jpg', 390, 844, 'Sitio de Wellpro en un celular: catálogo de equipos médicos para el hogar')}</div></div>
    </div>
    <div class="app-text">
      <h3 class="head" data-reveal>Se compra desde el celular</h3>
      <p class="lead" data-reveal style="--i:1">Wellpro vende equipos médicos para el hogar. Su catálogo dinámico se lee y se navega igual de fácil en el teléfono que en la computadora.</p>
      <a class="link-plain" href="casos/${casos[3].slug}/index.html" data-reveal style="--i:2">Ver el caso de Wellpro</a>
    </div>
  </article>
</section>

<section class="work sheet sec" id="casos" aria-labelledby="h-casos">
  <div class="work-head">
    <h2 id="h-casos" class="head" data-reveal>Lo último que entregamos</h2>
    <a class="link-plain" href="casos/index.html" data-reveal style="--i:1">Ver todos los casos</a>
  </div>
  <div class="work-grid">
    ${[2, 3, 1, 0].map((k, i) => {
      const c = casos[k];
      return `<a class="wk${i === 0 ? ' wk-big' : ''}" href="casos/${c.slug}/index.html" data-reveal style="--i:${i}">
      <span class="wk-pic">${img(p, c.portada.src, c.portada.w, c.portada.h, c.portada.alt, { pos: 'top' })}</span>
      <strong>${esc(c.titulo)}</strong>
      <span class="wk-meta"><span>${esc(c.rubro)}</span><span>${esc(c.etiqueta)}</span></span>
      <span class="wk-line">${esc(c.corto)}</span>
    </a>`;
    }).join('\n    ')}
  </div>
</section>

<section class="quotes sec" aria-labelledby="h-quotes">
  <h2 id="h-quotes" class="head" data-reveal>Lo que dicen ${EJ}</h2>
  ${TESTIMONIOS.map(([q, n, r], i) => `<figure class="quote q${i}" data-reveal style="--i:${i}">
    <blockquote><p>“${esc(q)}”</p></blockquote>
    <figcaption><strong>${esc(n)}</strong>, ${esc(r)} ${EJ}</figcaption>
  </figure>`).join('\n  ')}
</section>

<section class="how sheet sec" aria-labelledby="h-how">
  <div class="how-text">
    <h2 id="h-how" class="head" data-reveal>Cómo trabajamos</h2>
    <p class="lead" data-reveal style="--i:1">Cuatro pasos, sin tecnicismos y con la misma persona de principio a fin. Pagas la mitad al empezar y la otra mitad cuando ya lo estás usando.</p>
    <a class="button" href="${wa()}" ${ext} data-reveal style="--i:2">Empezar con 15 minutos</a>
  </div>
  <ol class="how-list">
    ${PASOS.map(([h, d, k], i) => `<li class="how-item" data-reveal style="--i:${i}">
      <div class="how-pic how-${k}" data-ui aria-hidden="true">${{
        charla: '<span class="b-in">Tengo una ferretería y todo está en Excel.</span><span class="b-out">Cuéntame cuántas bodegas tienes.</span>',
        propuesta: '<span class="doc-h">Propuesta</span><span class="doc-l">Sistema de inventario</span><span class="doc-p">$950</span>',
        fases: '<span class="ph on">Productos</span><span class="ph on">Entradas</span><span class="ph">Reportes</span>',
        entrega: '<span class="ok">Entregado</span><span class="doc-l">Capacitación: 2 sesiones</span>',
      }[k]}</div>
      <div><h3>${esc(h)}</h3><p>${esc(d)}</p></div>
    </li>`).join('\n    ')}
  </ol>
</section>

<section class="pricing sec" id="precios" aria-labelledby="h-precios">
  <div class="pricing-head">
    <h2 id="h-precios" class="head" data-reveal>Precios y plazos</h2>
    <p class="lead" data-reveal style="--i:1">Marca lo que necesitas y ve el rango al momento. Cada proyecto se cotiza con precio cerrado y por escrito.</p>
  </div>
  <form class="quote-form" action="${WA}" method="get" target="_blank" data-reveal>
    <fieldset class="menu-list">
      <legend class="sr">Servicios para cotizar</legend>
      ${SERVICIOS.map((s) => `<label class="menu-item">
        <input type="checkbox" value="${s.id}" data-n="${esc(s.n)}" data-min="${s.min ?? ''}" data-max="${s.max ?? s.min ?? ''}" data-sem="${s.sem ? s.sem.join('-') : ''}">
        <span class="menu-n">${esc(s.n)}</span>
        <span class="menu-p nums">${esc(s.precio)}</span>
        <span class="menu-d">${esc(s.d)}</span>
        <span class="menu-t">${plazo(s)}${s.sem ? ` ${EJ}` : ''}</span>
      </label>`).join('\n      ')}
    </fieldset>
    <div class="quote-sum" aria-live="polite">
      <p class="qs-total nums" id="q-total">Marca uno o más servicios</p>
      <p class="qs-time" id="q-time">Los precios son de referencia; el final va en la propuesta.</p>
      <input type="hidden" name="text" id="q-text" value="${esc(MSG)}">
      <button class="button" type="submit">Pedir cotización por WhatsApp</button>
    </div>
  </form>
</section>

<section class="faq sec" id="preguntas" aria-labelledby="h-faq">
  <h2 id="h-faq" class="head" data-reveal>Antes de que preguntes</h2>
  <div class="faq-list">
    ${FAQ.map(([q, a], i) => `<details class="faq-item" data-reveal style="--i:${i % 3}"${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${t(a)}</p></details>`).join('\n    ')}
  </div>
</section>

<section class="about sheet sec" id="nosotros" aria-labelledby="h-about">
  <div class="about-text">
    <h2 id="h-about" class="head" data-reveal>Sobre Nexa505</h2>
    <p class="about-lead" data-reveal style="--i:1">Nexa505 es una sola persona que te escucha, desarrolla tu proyecto, te lo entrega y te da soporte. Desde Nicaragua, con más de 6 años haciendo software para pymes.</p>
    <p data-reveal style="--i:2">Antes trabajé en proyectos para GBM Nicaragua, Compañía Licorera de Nicaragua y Almacenadora LAFISE. Es experiencia previa: no son clientes de Nexa505.</p>
    <p class="tech" data-reveal style="--i:3">Trabajo con ${TECH.slice(0, -1).join(', ')} y ${TECH.at(-1)}.</p>
  </div>
  <dl class="figs">
    <div data-reveal><dt>años de experiencia</dt><dd>+6</dd></div>
    <div data-reveal style="--i:1"><dt>empresas y clientes</dt><dd>+8</dd></div>
    <div data-reveal style="--i:2"><dt>apps en producción</dt><dd>+10</dd></div>
    <div class="fig-clock" data-reveal style="--i:3"><dt>hora en Nicaragua (+505)</dt><dd class="nums" data-clock>UTC−6</dd></div>
  </dl>
</section>

${cierre(p, '¿Qué te hace perder tiempo hoy?', 'Cuéntanoslo aquí y se abre WhatsApp con el mensaje listo. Respondemos el mismo día.', MSG, true)}
`;
  return layout({
    p,
    title: 'Nexa505 | Sistemas, web y automatización para pymes',
    desc: 'Sistemas de inventario, páginas web, automatizaciones, apps e IA a la medida de tu pyme, con un solo responsable. Desde Nicaragua, 6 años de experiencia.',
    body,
    current: '',
  });
}

// Cierre en un campo verde, como el de la lista de espera de Shelf. Con `campo`, el visitante escribe su mensaje.
function cierre(p, h, text, msg, campo = false) {
  return `<section class="close sec" aria-labelledby="h-close">
  <div class="close-side" aria-hidden="true"></div>
  <div class="close-main" data-reveal>
    <h2 id="h-close" class="head">${esc(h)}</h2>
    <p class="lead">${esc(text)}</p>
    ${campo
      ? `<form class="close-form" action="${WA}" method="get" target="_blank">
      <label class="sr" for="close-q">Qué te hace perder tiempo</label>
      <textarea id="close-q" rows="2" placeholder="Ej.: cada vez que un cliente pregunta, vamos a contar a la bodega"></textarea>
      <input type="hidden" name="text" value="${esc(msg)}" id="close-text">
      <button class="button button-ink" type="submit">Enviar por WhatsApp</button>
    </form>`
      : `<a class="button button-ink" href="${wa(msg)}" ${ext}>Enviar por WhatsApp</a>`}
  </div>
  <div class="close-side" aria-hidden="true"></div>
</section>`;
}

// ---------- ÍNDICE DE CASOS ----------
const FILTROS = [['todos', 'Todos'], ['inventario', 'Inventario'], ['web', 'Web'], ['apps', 'Apps'], ['ia', 'Inteligencia artificial']];

function indice() {
  const p = '../';
  const body = `
<section class="index-head sheet" aria-labelledby="h1">
  <h1 id="h1" data-rise>Casos</h1>
  <p class="hero-sub" data-rise style="--i:1">Proyectos reales para negocios reales: inventarios, páginas web, apps e inteligencia artificial.</p>
  <div class="filters" role="group" aria-label="Filtrar por tipo" data-rise style="--i:2">
    ${FILTROS.map(([k, l], i) => `<button class="filter" data-f="${k}" aria-pressed="${i === 0}">${l}</button>`).join('\n    ')}
  </div>
</section>
<section class="index-list sec" aria-label="Lista de casos">
  <div class="index-grid">
    ${casos.map((c, i) => `<a class="index-tile" href="${c.slug}/index.html" data-filtro="${c.filtro}" data-reveal style="--i:${i % 2}">
      <span class="index-pic">${img(p, c.portada.src, c.portada.w, c.portada.h, c.portada.alt, { pos: 'top' })}</span>
      <span class="index-meta"><strong>${esc(c.titulo)}</strong><span class="wk-meta"><span>${esc(c.rubro)}</span><span>${esc(c.etiqueta)}</span></span><span class="index-sum">${esc(c.resumen)}</span></span>
    </a>`).join('\n    ')}
  </div>
  <p class="index-empty" hidden>No hay casos de este tipo todavía.</p>
</section>
${cierre(p, '¿Tu negocio podría ser el próximo caso?', 'Cuéntanos qué te hace perder tiempo hoy y te decimos por dónde conviene empezar.', MSG)}`;
  return layout({
    p,
    title: 'Casos | Nexa505: sistemas, web y apps para pymes',
    desc: 'Casos reales de Nexa505: inventario en tiempo real, plataformas con IA, sitios web autoadministrables y apps móviles para pymes y empresas.',
    body,
    current: 'Casos',
  });
}

// ---------- PÁGINA DE CASO ----------
function caso(c, i) {
  const p = '../../';
  const prev = casos[(i - 1 + casos.length) % casos.length];
  const next = casos[(i + 1) % casos.length];
  const msg = `Hola, vi el caso "${c.titulo}" en Nexa505 y quiero algo así para mi negocio.`;
  // Pantallas dibujadas del tipo de proyecto, mientras llegan las capturas reales.
  const screens = {
    inventario: PASOS_INV.map(([h], k) => [h, ventana(PANTALLAS[k])]),
    ia: [['Pregunta y respuesta con fuentes', ventana(IA_SCREENS[0], 'Asistente médico')], ['Presentación generada', ventana(IA_SCREENS[1], 'Asistente médico')]],
    apps: [['La sala escaneada, decorada en 3D', `<div class="cs-phone">${PHONE_CONTOLLO}</div>`]],
  }[c.filtro] || [];
  const gal = c.galeria.map((g, gi) => `<button class="gal-item" data-reveal style="--i:${gi};--r:${(g.w / g.h).toFixed(3)}" data-full="${p}assets/img/${g.src}" data-alt="${esc(g.alt)}" aria-label="Ampliar: ${esc(g.alt)}">${img(p, g.src, g.w, g.h, g.alt, { sm: g.w > 560 })}</button>`).join('');
  const body = `
<article class="case">
  <header class="case-head sheet">
    <nav class="crumbs" aria-label="Ruta"><a class="link-plain" href="../../index.html">Inicio</a> / <a class="link-plain" href="../index.html">Casos</a></nav>
    <h1 id="h1" data-rise>${esc(c.titulo)}</h1>
    <p class="wk-meta case-rubro" data-rise style="--i:1"><span>${esc(c.rubro)}</span><span>${esc(c.etiqueta)}</span></p>
    <p class="hero-sub" data-rise style="--i:2">${esc(c.resumen)}</p>
    <figure class="case-hero" data-rise style="--i:3">
      <div class="case-hero-pic">${img(p, c.portada.src, c.portada.w, c.portada.h, c.portada.alt, { eager: true, pos: 'top' })}</div>
      ${c.portadaNota ? `<figcaption class="small">${c.portadaNota.split('PENDIENTE').map((s, k) => (k ? t('PENDIENTE' + s) : esc(s))).join('')}</figcaption>` : ''}
    </figure>
  </header>

  <div class="case-board sec">
    <section class="ct ct-prob" aria-labelledby="h-prob" data-reveal>
      <h2 id="h-prob">El problema</h2>
      <ul>${c.problema.map((x) => `<li>${t(x)}</li>`).join('')}</ul>
    </section>
    <section class="ct ct-did" aria-labelledby="h-did" data-reveal style="--i:1">
      <h2 id="h-did">Qué hicimos</h2>
      <p>${t(c.hicimos)}</p>
    </section>
  </div>

  <section class="case-gal sheet sec" aria-labelledby="h-gal">
    <h2 id="h-gal" class="head" data-reveal>Fotos y capturas</h2>
    <div class="gal">
      ${gal}
      ${c.galeriaPendiente ? `<div class="gal-pend" data-reveal style="--i:2">${t(c.galeriaPendiente)}</div>` : ''}
    </div>
    ${screens.length ? `<div class="case-screens">${screens.map(([h, html], k) => `<figure class="cs" data-reveal style="--i:${k}"><div class="step-pic">${html}</div><figcaption>${esc(h)}</figcaption></figure>`).join('')}</div>
    <p class="small case-screens-note">Ilustración del tipo de ${c.filtro === 'apps' ? 'app' : 'sistema'}, con datos de ejemplo.</p>` : ''}
    <h2 id="h-vid" class="head case-vid-h" data-reveal>Video de demostración</h2>
    ${c.video
      ? `<video class="vid" controls preload="none" playsinline poster="${p}assets/img/${c.video.poster}"><source src="${p}assets/video/${c.video.src}" type="video/mp4"></video>`
      : `<div class="vid vid-pend" data-reveal>${t('PENDIENTE: video de demostración (difuminar datos sensibles)')}</div>`}
  </section>

  <div class="case-board sec">
    <section class="ct ct-res" aria-labelledby="h-res" data-reveal>
      <h2 id="h-res">Resultados</h2>
      <p class="res-fig">${t(c.cifra)}</p>
      <ul>${c.resultados.map((x) => `<li>${t(x)}</li>`).join('')}</ul>
      ${c.url ? `<a class="button button-ink" href="${c.url}" ${ext}>Ver el sitio</a>` : ''}
    </section>
    <section class="ct ct-quote" aria-labelledby="h-quote" data-reveal style="--i:1">
      <h2 id="h-quote">Lo que dice el cliente</h2>
      ${c.testimonio
        ? `<blockquote><p>${esc(c.testimonio.frase)}</p><footer>${esc(c.testimonio.nombre)}</footer></blockquote>`
        : `<blockquote><p>${t('PENDIENTE: frase del cliente, con su permiso')}</p><footer>${t('PENDIENTE: nombre y cargo')}</footer></blockquote>`}
    </section>
  </div>

  ${cierre(p, 'Quiero algo así para mi negocio', 'Cuéntanos cómo trabajas hoy y qué te gustaría resolver. El mensaje ya va escrito.', msg)}

  <nav class="case-nav sec" aria-label="Otros casos">
    <a class="cn" href="../${prev.slug}/index.html" data-reveal><span class="cn-pic">${img(p, prev.portada.src, prev.portada.w, prev.portada.h, '', { pos: 'top' })}</span><span>Caso anterior</span><strong>${esc(prev.titulo)}</strong></a>
    <a class="cn cn-all" href="../index.html" data-reveal style="--i:1"><span>Ver todos los</span><strong>Casos</strong></a>
    <a class="cn" href="../${next.slug}/index.html" data-reveal style="--i:2"><span class="cn-pic">${img(p, next.portada.src, next.portada.w, next.portada.h, '', { pos: 'top' })}</span><span>Caso siguiente</span><strong>${esc(next.titulo)}</strong></a>
  </nav>
</article>

<dialog class="lightbox" aria-label="Imagen ampliada">
  <form method="dialog"><button class="lb-close">Cerrar</button></form>
  <img alt="">
</dialog>`;
  return layout({ p, title: `${c.titulo} | Casos Nexa505`, desc: c.seo, body, current: 'Casos' });
}

// ---------- escribir ----------
rmSync('casos', { recursive: true, force: true });
writeFileSync('index.html', home());
mkdirSync('casos', { recursive: true });
writeFileSync('casos/index.html', indice());
casos.forEach((c, i) => {
  mkdirSync(`casos/${c.slug}`, { recursive: true });
  writeFileSync(`casos/${c.slug}/index.html`, caso(c, i));
});
console.log(`Listo: index.html, casos/index.html y ${casos.length} páginas de caso.`);
