// Nexa505: entradas al hacer scroll, demo de inventario, frases, carrusel, pasos, cotizador, cierre, filtros, galería y reloj.
const WA = 'https://wa.me/50581867161?text=';
const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

// Aparece una vez al entrar en pantalla; nunca deja contenido oculto.
(() => {
  const els = document.querySelectorAll('[data-reveal], .mess');
  if (!('IntersectionObserver' in window)) return els.forEach((el) => el.classList.add('is-in'));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  els.forEach((el) => io.observe(el));
  addEventListener('load', () => setTimeout(() => els.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
  }), 2500));
})();

// Demo de inventario: filtra la tabla mientras escribes. Al cargar, escribe "cemento" sola una vez.
(() => {
  const q = document.getElementById('inv-q');
  if (!q) return;
  const rows = [...document.querySelectorAll('#inv-rows tr')];
  const n = document.getElementById('inv-n');
  const empty = document.querySelector('.demo-empty');
  const body = rows[0].parentNode;
  // Los que coinciden suben y se marcan; el resto queda atenuado debajo, así la tabla nunca se vacía.
  const filtrar = () => {
    const k = fold(q.value);
    let c = 0;
    const hits = rows.filter((r) => k && r.dataset.k.includes(k));
    rows.forEach((r) => { const ok = hits.includes(r); r.classList.toggle('hit', ok); r.classList.toggle('dim', !!k && !ok); });
    [...hits, ...rows.filter((r) => !hits.includes(r))].forEach((r) => body.appendChild(r));
    c = k ? hits.length : rows.length;
    n.textContent = k ? `${c} ${c === 1 ? 'resultado' : 'resultados'} para “${q.value.trim()}”` : `${rows.length} productos`;
    empty.hidden = c > 0;
    body.parentNode.parentNode.scrollTop = 0;
  };
  q.addEventListener('input', filtrar);
  if (quieto) { q.value = 'cemento'; return filtrar(); }
  let tocado = false;
  q.addEventListener('focus', () => { tocado = true; });
  const palabra = 'cemento';
  setTimeout(() => {
    let i = 0;
    const paso = () => {
      if (tocado) return;
      q.value = palabra.slice(0, ++i);
      filtrar();
      if (i < palabra.length) setTimeout(paso, 110 + Math.random() * 90);
    };
    paso();
  }, 1600);
})();

// "Ahora, en un solo lugar": cada frase arma su mensaje de WhatsApp.
(() => {
  const btns = [...document.querySelectorAll('.phrase')];
  if (!btns.length) return;
  const box = document.querySelector('.answer');
  const $ = (id) => document.getElementById(id);
  btns.forEach((b) => b.addEventListener('click', () => {
    btns.forEach((o) => o.setAttribute('aria-pressed', o === b));
    $('ans-srv').textContent = b.dataset.srv;
    $('ans-pr').textContent = b.dataset.pr;
    $('ans-det').textContent = b.dataset.det;
    $('ans-msg').textContent = b.dataset.msg;
    $('ans-go').href = WA + encodeURIComponent(b.dataset.msg);
    box.classList.remove('flash');
    void box.offsetWidth;
    box.classList.add('flash');
  }));
})();

// Carrusel de servicios: las flechas avanzan una tarjeta.
(() => {
  const deck = document.querySelector('.deck');
  if (!deck) return;
  document.querySelectorAll('.srv-ctrl .round').forEach((b) => b.addEventListener('click', () => {
    const w = deck.querySelector('.card').getBoundingClientRect().width + 28;
    deck.scrollBy({ left: w * Number(b.dataset.dir), behavior: quieto ? 'auto' : 'smooth' });
  }));
})();

// Inventario paso a paso: la pantalla de la derecha cambia según el paso que estás leyendo.
(() => {
  const steps = [...document.querySelectorAll('.step')];
  const screens = [...document.querySelectorAll('.stage-screen')];
  if (!steps.length || !('IntersectionObserver' in window)) return steps.forEach((s) => s.classList.add('is-on'));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const i = Number(e.target.dataset.step);
      steps.forEach((s, k) => s.classList.toggle('is-on', k === i));
      screens.forEach((s, k) => s.classList.toggle('is-on', k === i));
    }
  }, { rootMargin: '-45% 0px -45% 0px' });
  steps.forEach((s) => io.observe(s));
  steps[0].classList.add('is-on');
})();

// Cotizador: suma los servicios marcados y deja el mensaje listo.
(() => {
  const form = document.querySelector('.quote-form');
  if (!form) return;
  const boxes = [...form.querySelectorAll('input[type=checkbox]')];
  const total = document.getElementById('q-total');
  const time = document.getElementById('q-time');
  const text = document.getElementById('q-text');
  const usd = (n) => `$${n.toLocaleString('en-US')}`;
  const base = text.value;
  const calc = () => {
    const sel = boxes.filter((b) => b.checked);
    if (!sel.length) {
      total.textContent = 'Marca uno o más servicios';
      time.textContent = 'Los precios son de referencia; el final va en la propuesta.';
      text.value = base;
      return;
    }
    const fijos = sel.filter((b) => b.dataset.min);
    const abiertos = sel.filter((b) => !b.dataset.min).map((b) => b.dataset.n);
    const min = fijos.reduce((s, b) => s + Number(b.dataset.min), 0);
    const max = fijos.reduce((s, b) => s + Number(b.dataset.max), 0);
    const exacto = fijos.every((b) => b.dataset.max !== b.dataset.min);
    let rango = fijos.length ? (exacto && max > min ? `${usd(min)} a ${usd(max)}` : `Desde ${usd(min)}`) : '';
    if (abiertos.length) rango += `${rango ? ' + ' : ''}${abiertos.join(' y ')} según alcance`;
    total.textContent = rango;
    const sems = fijos.filter((b) => b.dataset.sem).map((b) => b.dataset.sem.split('-').map(Number));
    time.textContent = sems.length
      ? `Plazo: el más largo toma de ${Math.max(...sems.map((s) => s[0]))} a ${Math.max(...sems.map((s) => s[1]))} semanas. Lo demás puede avanzar en paralelo.`
      : 'El plazo lo definimos juntos en la propuesta.';
    text.value = `Hola, vi Nexa505 y quiero cotizar: ${sel.map((b) => b.dataset.n).join(', ')}. Rango de referencia: ${rango}.`;
  };
  boxes.forEach((b) => b.addEventListener('change', calc));
  calc();
})();

// Cierre: lo que escribe el visitante se añade al mensaje de WhatsApp.
(() => {
  const ta = document.getElementById('close-q');
  if (!ta) return;
  const hid = document.getElementById('close-text');
  const base = hid.value;
  ta.addEventListener('input', () => { hid.value = ta.value.trim() ? `${base} Lo que nos hace perder tiempo: ${ta.value.trim()}` : base; });
})();

// Filtros del índice de casos
(() => {
  const btns = [...document.querySelectorAll('.filter')];
  if (!btns.length) return;
  const tiles = [...document.querySelectorAll('.index-tile')];
  const empty = document.querySelector('.index-empty');
  btns.forEach((b) => b.addEventListener('click', () => {
    btns.forEach((o) => o.setAttribute('aria-pressed', o === b));
    let n = 0;
    tiles.forEach((t) => { const show = b.dataset.f === 'todos' || t.dataset.filtro === b.dataset.f; t.hidden = !show; n += show; });
    empty.hidden = n > 0;
  }));
})();

// Galería con ampliación
(() => {
  const dlg = document.querySelector('.lightbox');
  if (!dlg || !dlg.showModal) return;
  const im = dlg.querySelector('img');
  document.querySelectorAll('.gal-item').forEach((b) => b.addEventListener('click', () => {
    im.src = b.dataset.full;
    im.alt = b.dataset.alt;
    dlg.showModal();
  }));
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
})();

// Hora en Nicaragua
(() => {
  const el = document.querySelector('[data-clock]');
  if (!el) return;
  const f = new Intl.DateTimeFormat('es-NI', { timeZone: 'America/Managua', hour: 'numeric', minute: '2-digit' });
  const tick = () => { el.textContent = f.format(new Date()); };
  tick();
  setInterval(tick, 30000);
})();

// Cierra el menú del celular al elegir una sección
document.querySelectorAll('.menu a').forEach((a) => a.addEventListener('click', () => a.closest('details').removeAttribute('open')));
