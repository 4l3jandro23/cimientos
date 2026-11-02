/* Cimientos. Cuatro pestañas:
   · Hoy: tu semana (un foco y un reto), algo para aprender y ayuda en el momento.
   · Aprender: el plan de 8 semanas, lecciones para entenderte y toda la biblioteca con buscador.
   · Contar: lo que te pasa, preparado para preguntárselo a Claude (y guardado si no hay cobertura).
   · Recorrido: lo que has hecho y lo que te has llevado.
   Todo vive en este dispositivo (y en tu sincronización cifrada, si la tienes puesta). */
'use strict';
const K = {
  historias: 'cimientosHistorias', intentos: 'cimientosIntentos', reto: 'cimientosRetoSemana', pin: 'cimientosPin',
  plan: 'cimientosPlan8', leidas: 'cimientosLeccionesCompletadas', favs: 'cimientosFavs', tema: 'cimientosTema'
};
const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
const store = (k, v) => { const old = load(k, null); try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} if (typeof CS !== 'undefined') CS.touch(k, old, v); };
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const dayKey = d => { const x = new Date(d); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
const lunes = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - (x.getDay() + 6) % 7); return x; };
const semanaKey = d => dayKey(lunes(d));
const fCorta = iso => new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
const ic = (n, extra) => `<svg class="ic-v${extra ? ' ' + extra : ''}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const mayus = s => s.charAt(0).toUpperCase() + s.slice(1);
const sinTildes = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const app = document.getElementById('app');
let tab = 'hoy';

function toast(t) {
  document.querySelectorAll('.toast').forEach(x => x.remove());
  const el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); el.textContent = t;
  document.body.appendChild(el); setTimeout(() => el.remove(), 2600);
}

// ---------- Contenido (viene de contenido*.js) ----------
const _DOCS = typeof DOCS !== 'undefined' ? DOCS : [], _GUIA = typeof GUIA !== 'undefined' ? GUIA : [];
const _LECC = typeof LECCIONES !== 'undefined' ? LECCIONES : [], _PLAN = typeof PLAN8 !== 'undefined' ? PLAN8 : [];
const _TIPS = typeof TIPS !== 'undefined' ? TIPS : [];
const GUIA_ITEMS = _GUIA.flatMap(b => b.items.map(i => Object.assign({ bloque: b.bloque }, i)));
const porId = id => _DOCS.find(d => d.id === id) || GUIA_ITEMS.find(d => d.id === id) || _LECC.find(d => d.id === id);
const leidas = () => load(K.leidas, {}) || {};
const favs = () => load(K.favs, []) || [];

// La biblioteca, ordenada de lo más útil para entenderte y actuar a lo más específico.
function secciones() {
  const g = k => [[null, _DOCS.filter(d => d.grupo === k)]];
  const grupos = l => l.map(([n, ids]) => [n, ids.map(id => _DOCS.find(d => d.id === id)).filter(Boolean)]).filter(x => x[1].length);
  const av = typeof AVANZADO_GRUPOS !== 'undefined' ? AVANZADO_GRUPOS : [], pro = typeof PRO_GRUPOS !== 'undefined' ? PRO_GRUPOS : [];
  const usados = new Set(av.flatMap(x => x[1])), resto = _DOCS.filter(d => d.grupo === 'avanzado' && !usados.has(d.id));
  return [
    ['yo', 'Conócete', 'Autoestima, valores y cómo funcionas por dentro', g('yo')],
    ['carisma', 'Carisma y confianza', 'Presencia, conversación y cómo te ven', g('carisma')],
    ['guia', 'Qué hacer en cada situación', 'Momentos concretos, paso a paso', _GUIA.map(b => [b.bloque, b.items])],
    ['ligar', 'Ligar, de principio a fin', 'Del primer contacto a la relación', g('ligar')],
    ['experto', 'Lo que dicen los estudios', 'Lo que casi nadie sabe, con evidencia', g('experto')],
    ['avanzado', 'Lo que dicen los libros', 'Ideas de los expertos de referencia', grupos(av.concat(resto.length ? [['Más', resto.map(d => d.id)]] : []))],
    ['pro', 'Nivel pro', 'Para cuando ya tienes la base', grupos(pro)],
    ['cuerpo', 'Tu cuerpo y la intimidad', 'Dudas, educación sexual y calma', g('cuerpo')],
    ['calle', 'Que no se aprovechen de ti', 'Límites, manipulación y seguridad', g('calle')],
    ['bcn', 'Barcelona', 'Dónde y cómo se conoce gente aquí', g('bcn')]
  ].map(([k, n, s, b]) => ({ k, n, s, b, total: b.reduce((a, x) => a + x[1].length, 0) })).filter(x => x.total);
}

// ---------- Tu semana: el plan de 8 semanas, con un reto más fácil si lo necesitas ----------
const RETOS = [
  'Saludar tú primero a alguien conocido',
  'Mantener la mirada 2-3 segundos al cruzarte con alguien, y sonreír',
  'Preguntar algo sencillo a un desconocido (la hora, una calle, una recomendación)',
  'Hacer un comentario sobre el sitio a alguien con quien coincidas (cola, bar, gimnasio)',
  'Aguantar 2 minutos de charla con alguien que no conoces mucho',
  'Hacer una pregunta de seguimiento cuando alguien te cuente algo',
  'Decir algo en una conversación de grupo sin esperar el momento perfecto',
  'Cerrar tú una conversación con una frase amable',
  'Proponer un plan concreto a un amigo: día y hora',
  'Hablar con una chica que te parezca interesante, aunque sea una frase',
  'Pedir el Instagram o el número al final de una buena charla',
  'Proponer una cita sencilla: un café o una caña, con día'
];
// La versión fácil de cada semana del plan: el mismo tema, más pequeño.
const FACIL = [
  'Antes de saludar a alguien, haz un suspiro: dos inspiraciones cortas por la nariz y una espiración larga.',
  'En una charla con un amigo, haz una pregunta de seguimiento sobre algo que te cuente.',
  'Saluda a una persona mirándola a los ojos y sonriendo.',
  'En una conversación, fíjate solo en si la otra persona te pregunta cosas a ti. Nada más que observar.',
  'Al saludar a un amigo, choca la mano o dale una palmada en el hombro.',
  'Propón un plan concreto a un amigo: día, sitio y hora.',
  'Pide algo pequeño que te puedan negar: probar algo en una tienda, un favor, un descuento.',
  'Escribe una cosa que te haga sentir a gusto con alguien.'
];
// Sin plan guardado se usa uno por defecto, pero no se guarda: si no, al sincronizar pisaría la semana real de otro dispositivo.
function plan() {
  const p = load(K.plan, null);
  if (p && Number.isInteger(p.sem)) return p;
  const now = new Date().toISOString(); return { inicio: now, desde: now, sem: 0, hecho: {} };
}
const semana = () => { const p = plan(); return p.fin || !_PLAN[p.sem] ? null : _PLAN[p.sem]; };
const opcionesReto = () => load(K.reto, {}) || {};
function retoTexto() {
  const p = plan(), w = semana(), r = opcionesReto();
  if (!w) return RETOS[Math.floor(lunes(Date.now()) / 6048e5) % RETOS.length]; // plan acabado: un reto distinto cada semana
  return r.facil ? (FACIL[p.sem] || RETOS[0]) : w.reto;
}

// ---------- Hablar con Claude ----------
const OBJETIVOS = [
  ['harias', 'Qué harías tú', 'Dime qué harías tú en mi lugar, con frases concretas si hace falta.'],
  ['decir', 'Qué digo ahora', 'Necesito saber qué decir o escribir ahora. Dame 2 o 3 opciones cortas y dime cuál usarías tú.'],
  ['entender', 'Ayúdame a entenderlo', 'Ayúdame a entenderlo: qué hay detrás, qué hice bien, qué pudo fallar y cómo lo vería la otra persona.'],
  ['desahogo', 'Solo desahogarme', 'Solo quiero desahogarme. Respóndeme con calma; consejos solo si ves algo importante.']
];
function promptPara(h) {
  const obj = OBJETIVOS.find(o => o[0] === h.objetivo) || OBJETIVOS[0], w = semana();
  const llevo = (load(K.historias, []) || []).filter(x => x.lleva && x.id !== h.id).slice(-3).map(x => '- ' + x.lleva);
  return [
    'Te cuento algo. Estoy trabajando mi seguridad, hablar con gente y ligar, poco a poco.',
    w ? 'Esta semana trabajo «' + w.t + '» (' + w.foco.replace(/\.$/, '') + '). Mi reto: ' + retoTexto() + '.' : 'Mi reto de esta semana: ' + retoTexto() + '.',
    llevo.length ? 'Lo último que he aprendido:\n' + llevo.join('\n') : '',
    '',
    mayus(new Date(h.fecha).toLocaleString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })) + ':',
    h.texto,
    '',
    obj[2],
    'Contéstame corto y claro, en español de España. Sé sincero aunque no me guste. Acaba con una sola cosa pequeña que pueda practicar esta semana.'
  ].filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n');
}

// ---------- Pantallas encima ----------
let pila = [], timer = null;
// html puede ser una función: así la capa se vuelve a pintar al volver a ella (p. ej. tras marcar una lectura).
function capa(html, onClick, volverTxt) {
  clearTimeout(timer);
  const o = document.createElement('div'); o.className = 'capa'; o.setAttribute('role', 'dialog');
  const pinta = typeof html === 'function' ? html : () => html;
  o.innerHTML = `<div class="capa-top"><button class="volver" data-x="cerrar">${ic('flecha')}${volverTxt || 'Volver'}</button></div><div class="capa-in">${pinta()}</div>`;
  if (typeof html === 'function') o.repintar = () => { o.querySelector('.capa-in').innerHTML = pinta(); };
  o.addEventListener('click', e => { if (e.target.closest('[data-x="cerrar"]')) return cerrarCapa(); onClick && onClick(e, o); });
  pila.forEach(x => x.style.display = 'none');
  pila.push(o); document.body.appendChild(o); document.body.style.overflow = 'hidden';
  return o;
}
// Cierra la de arriba y vuelve a la anterior; con todas = true vuelve a la pantalla principal.
function cerrarCapa(todas) {
  clearTimeout(timer);
  do { const o = pila.pop(); if (o) o.remove(); } while (todas && pila.length);
  if (pila.length) { const o = pila[pila.length - 1]; o.style.display = ''; if (o.repintar) o.repintar(); } else { document.body.style.overflow = ''; render(); }
}
const hayCapa = () => pila.length > 0;

// Contar: escribir (o dictar) lo que pasó y elegir qué quieres.
function abrirContar(inicial) {
  inicial = inicial || {};
  let objetivo = inicial.objetivo || 'harias';
  const guardarSolo = !!inicial.guardarSolo || !navigator.onLine;
  const o = capa(`<h2>${esc(inicial.titulo || 'Cuéntame qué ha pasado')}</h2>
    <p class="p">Como se lo contarías a un amigo. Puedes dictarlo con el micro del teclado.</p>
    <textarea id="txt" placeholder="Estaba en… y pasó que…">${esc(inicial.texto || '')}</textarea>
    <p class="eti" style="margin-top:16px">¿Qué quieres que te diga?</p>
    <div class="chips">${OBJETIVOS.map(([id, n]) => `<button data-obj="${id}" class="${id === objetivo ? 'on' : ''}">${n}</button>`).join('')}</div>
    <button class="btn prim ancho" data-go>${guardarSolo ? 'Guardar y preguntarlo luego' : 'Preguntárselo a Claude'}</button>
    <p class="nota">${!navigator.onLine ? 'Ahora no tienes conexión. Lo guardo y te queda apuntado en Hoy.' : guardarSolo ? 'Esta noche no se manda nada. Mañana lo miras con calma.' : 'Se guarda aquí y te lo preparo para pegarlo en Claude.'}</p>
    ${navigator.onLine ? '' : `<button class="btn ancho" style="margin-top:12px" data-sosya>${ic('brujula')}¿Lo necesitas ahora? Ayuda sin conexión</button>`}`,
  (e, o) => {
    const c = e.target.closest('[data-obj]');
    if (c) { objetivo = c.dataset.obj; o.querySelectorAll('[data-obj]').forEach(b => b.classList.toggle('on', b === c)); return; }
    if (e.target.closest('[data-sosya]')) return abrirSOS('fuera');
    if (!e.target.closest('[data-go]')) return;
    const texto = o.querySelector('#txt').value.trim();
    if (!texto || texto === (inicial.texto || '').trim()) { o.querySelector('#txt').focus(); return toast('Escribe primero qué ha pasado'); }
    const h = { id: uid('h'), fecha: new Date().toISOString(), texto, objetivo, enviada: false, lleva: '' };
    store(K.historias, (load(K.historias, []) || []).concat(h));
    if (!guardarSolo) { cerrarCapa(true); abrirEnviar(h.id); } else { cerrarCapa(true); toast('Guardado. Te queda apuntado en Hoy.'); }
  });
  setTimeout(() => { const t = o.querySelector('#txt'); if (t) { t.focus(); t.setSelectionRange(t.value.length, t.value.length); } }, 250);
}

// Enviar: copiar el mensaje ya preparado y abrir Claude. Luego, apuntar lo que te llevas.
async function abrirEnviar(id) {
  const h = (load(K.historias, []) || []).find(x => x.id === id); if (!h) return;
  const texto = promptPara(h);
  let copiado = false;
  try { await navigator.clipboard.writeText(texto); copiado = true; } catch (e) {}
  capa(`<h2>${copiado ? 'Copiado. Ahora pégalo en Claude' : 'Cópialo y pégalo en Claude'}</h2>
    ${copiado ? '' : `<textarea readonly id="cp" style="min-height:140px">${esc(texto)}</textarea><button class="btn ancho" style="margin-top:8px" data-copia>Copiar texto</button>`}
    <div class="paso"><b>1</b><span>Abre Claude${copiado ? '' : ' (antes copia el texto de arriba)'}.</span></div>
    <div class="paso"><b>2</b><span>Mantén el dedo en el cuadro de escribir, toca «Pegar» y envía.</span></div>
    <div class="paso"><b>3</b><span>Cuando te conteste, vuelve y apunta en una línea lo que te llevas.</span></div>
    <a class="btn prim ancho" style="margin-top:12px" href="https://claude.ai/new" target="_blank" rel="noopener" data-abre>${ic('chat')}Abrir Claude</a>
    <div class="card" style="margin-top:24px"><h3>Lo que me llevo</h3><p class="sub" style="margin-bottom:10px">Después de leer su respuesta.</p>
    <input type="text" id="lleva" placeholder="Ej.: No esperar a tener la frase perfecta" value="${esc(h.lleva)}">
    <button class="btn ancho" style="margin-top:8px" data-lleva>Guardar</button></div>`,
  (e, o) => {
    if (e.target.closest('[data-abre]')) return marcar(id, { enviada: true });
    if (e.target.closest('[data-copia]')) {
      const t = o.querySelector('#cp'); t.removeAttribute('readonly'); t.focus(); t.setSelectionRange(0, t.value.length);
      let ok = false; try { ok = document.execCommand('copy'); } catch (x) {}
      t.setAttribute('readonly', ''); t.blur();
      if (ok) return toast('Copiado');
      navigator.clipboard.writeText(texto).then(() => toast('Copiado'), () => toast('Mantén el dedo en el texto y copia'));
      return;
    }
    if (!e.target.closest('[data-lleva]')) return;
    marcar(id, { lleva: o.querySelector('#lleva').value.trim(), enviada: true });
    cerrarCapa(true); toast('Apuntado');
  });
}
function marcar(id, cambios) { store(K.historias, (load(K.historias, []) || []).map(x => x.id === id ? Object.assign({}, x, cambios) : x)); }

// ---------- Leer ----------
function abrirLectura(id) {
  const x = porId(id); if (!x) return toast('No encuentro esa lectura');
  const lista = (v, cls) => Array.isArray(v) ? (v.length > 1 ? `<ul${cls ? ` class="${cls}"` : ''}>${v.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : `<p>${esc(v[0])}</p>`) : `<p>${esc(v)}</p>`;
  let cuerpo = '';
  if (x.secciones) cuerpo = x.secciones.map(([h, c]) => `${h ? `<h3>${esc(h)}</h3>` : ''}${lista(c)}`).join('');
  else if (x.tarjetas) cuerpo = x.tarjetas.map(([h, t]) => `<div class="tarjeta"><h3>${esc(h)}</h3>${lista(t)}</div>`).join('');
  else {
    const partes = [['pasa', 'Qué pasa'], ['hacer', 'Qué hacer'], ['ejemplos', 'Dilo así'], ['sale', 'Si no sale como esperabas'], ['practica', 'Para practicar'], ['cierre', null]];
    cuerpo = partes.filter(([k]) => x[k] && (!Array.isArray(x[k]) || x[k].length)).map(([k, h]) => (h ? `<h3>${h}</h3>` : '<div style="height:14px"></div>') + lista(x[k])).join('');
  }
  const leida = !!leidas()[id], fav = favs().includes(id);
  capa(`<article class="lect"><h2>${esc(x.titulo)}</h2><p class="lect-sub">${esc(x.sub || x.bloque || '')}</p>${cuerpo}</article>
    <div class="lect-acc">
      <button class="btn prim ancho" data-leida>${ic('check')}${leida ? 'Volver' : 'Marcar como leída'}</button>
      <div class="grid2"><button class="btn" data-preg>${ic('chat')}Preguntar a Claude</button><button class="btn" data-fav>${ic('guardar')}${fav ? 'Guardada' : 'Guardar'}</button></div>
    </div>`,
  (e, o) => {
    if (e.target.closest('[data-leida]')) { if (!leida) { const L = leidas(); L[id] = new Date().toISOString(); store(K.leidas, L); toast('Leída'); } return cerrarCapa(); }
    if (e.target.closest('[data-fav]')) { const f = favs(), b = e.target.closest('[data-fav]'); const on = !f.includes(id); store(K.favs, on ? f.concat(id) : f.filter(z => z !== id)); b.innerHTML = ic('guardar') + (on ? 'Guardada' : 'Guardar'); return toast(on ? 'Guardada en Aprender' : 'Quitada de guardadas'); }
    if (e.target.closest('[data-preg]')) return abrirContar({ titulo: 'Pregunta sobre esta lectura', objetivo: 'entender', texto: 'He leído «' + x.titulo + '». Quiero entender cómo aplicarlo a mí. Mi duda: ' });
  });
}
const filaLectura = id => {
  const x = porId(id); if (!x) return '';
  const ok = !!leidas()[id];
  return `<button class="row" data-leer="${esc(id)}"><span class="marca ${ok ? 'ok' : ''}">${ok ? ic('check') : ''}</span><span class="tx"><b>${esc(x.titulo)}</b>${x.sub ? `<small>${esc(x.sub)}</small>` : ''}</span>${ic('flecha')}</button>`;
};

function abrirSeccion(k) {
  const s = secciones().find(x => x.k === k); if (!s) return;
  capa(() => { const L = leidas(), hechas = s.b.reduce((a, x) => a + x[1].filter(d => L[d.id]).length, 0);
    return `<h2>${esc(s.n)}</h2><p class="p">${esc(s.s)} · ${hechas} de ${s.total} leídas</p>
    ${s.b.map(([n, items]) => `${n ? `<p class="eti">${esc(n)}</p>` : ''}<div class="lista">${items.map(d => filaLectura(d.id)).join('')}</div>`).join('')}`; },
  e => { const r = e.target.closest('[data-leer]'); if (r) abrirLectura(r.dataset.leer); }, 'Aprender');
}

function abrirPlanEntero() {
  const p = plan();
  capa(`<h2>Las 8 semanas</h2><p class="p">Una idea por semana: tres lecturas, un reto y una creencia que poner a prueba. Puedes saltar a la que quieras.</p>
    <div class="lista">${_PLAN.map((w, i) => `<button class="row" data-ir="${i}"><span class="marca ${i < p.sem || p.fin ? 'ok' : ''}">${i < p.sem || p.fin ? ic('check') : `<span style="font-size:11px;font-weight:700">${i + 1}</span>`}</span><span class="tx"><b>${esc(w.t)}${i === p.sem && !p.fin ? ' · ahora' : ''}</b><small>${esc(w.foco)}</small></span></button>`).join('')}</div>`,
  e => {
    const r = e.target.closest('[data-ir]'); if (!r) return;
    const i = Number(r.dataset.ir);
    if (!confirm('¿Pasar a la semana ' + (i + 1) + ': «' + _PLAN[i].t + '»?')) return;
    store(K.plan, Object.assign({}, plan(), { sem: i, desde: new Date().toISOString(), fin: false }));
    store(K.reto, Object.assign({}, opcionesReto(), { facil: false }));
    cerrarCapa(true); toast('Semana ' + (i + 1) + ': ' + _PLAN[i].t);
  });
}
function siguienteSemana() {
  const p = plan(), n = p.sem + 1;
  store(K.reto, Object.assign({}, opcionesReto(), { facil: false }));
  if (n >= _PLAN.length) { store(K.plan, Object.assign({}, p, { fin: true })); render(); return toast('Has hecho las 8 semanas'); }
  store(K.plan, Object.assign({}, p, { sem: n, desde: new Date().toISOString() }));
  render(); toast('Semana ' + (n + 1) + ': ' + _PLAN[n].t);
}

// ---------- Ahora mismo (funciona sin cobertura) ----------
const SOLO = [
  'Sal a caminar 30 minutos hacia donde haya gente. Estar entre gente ya acompaña.',
  'Manda un mensaje corto a una sola persona: «Eh, ¿qué tal? Hace tiempo que no hablamos».',
  'Llama a alguien de tu familia. No hace falta tema.',
  'Propón un plan concreto a un amigo: «¿Una caña el jueves a las 8?».',
  'Ducha larga y ropa limpia. Cambia el cuerpo y cambia la cabeza.',
  'Cocina algo rico de verdad, sin móvil en la mano.',
  'Haz una tarea pequeña pendiente. Diez minutos y hecho.',
  'Busca una actividad de esta semana: intercambio de idiomas, senderismo, biblioteca. Apúntate a una.',
  'Si es tarde, a dormir. Por la noche todo pesa más.'
];
function abrirSOS(tipo) {
  if (tipo === 'fuera') {
    const cosas = typeof AHORA_COSAS !== 'undefined' ? AHORA_COSAS : [];
    return capa(`<h2>¿Qué te pasa?</h2><p class="p">Elige y te digo una sola cosa.</p>
      <div class="lista">${cosas.map(c => `<button class="row" data-c="${c.id}"><span class="tx"><b>${esc(c.n)}</b></span>${ic('flecha')}</button>`).join('')}</div>`,
    e => { const b = e.target.closest('[data-c]'); if (b) fueraDetalle(cosas.find(c => c.id === b.dataset.c)); });
  }
  if (tipo === 'solo') {
    let i = Math.floor(Math.random() * SOLO.length);
    const pinta = o => { o.querySelector('[data-idea]').textContent = SOLO[i]; };
    return capa(`<h2>Estás solo un rato.</h2><p class="p">Sentirte solo es una señal de que quieres más compañía. No dice nada malo de ti.</p>
      <div class="una"><small>Prueba esto ahora</small><span data-idea>${esc(SOLO[i])}</span></div>
      <div class="grid2"><button class="btn" data-otro>${ic('dado')}Otra idea</button><button class="btn" data-cuenta>${ic('nota')}Escribir lo que siento</button></div>
      <p class="p" style="margin-top:24px">Si es más que tristeza:</p><a class="tel" href="tel:024">Llamar al 024 · gratis, 24 h</a>`,
    (e, o) => {
      if (e.target.closest('[data-otro]')) { i = (i + 1 + Math.floor(Math.random() * (SOLO.length - 1))) % SOLO.length; pinta(o); }
      if (e.target.closest('[data-cuenta]')) abrirContar({ objetivo: 'desahogo', titulo: 'Escribe lo que sientes' });
    });
  }
  if (tipo === 'bajon') {
    return capa(`<h2>Tranquilo.</h2>
      <p class="grande">Es el alcohol. Mañana lo verás distinto.</p>
      <div class="paso"><b>1</b><span>Bebe un vaso de agua entero.</span></div>
      <div class="paso"><b>2</b><span>No bebas más esta noche.</span></div>
      <div class="paso"><b>3</b><span>Busca cómo volver a casa y avisa a alguien.</span></div>
      <div class="paso"><b>4</b><span>Si quieres escribirle a alguien, no se lo mandes: escríbelo aquí y mañana lo miras con calma.</span></div>
      <button class="btn prim ancho" style="margin-top:8px" data-esc>${ic('nota')}Escribirlo aquí</button>
      <a class="tel" href="tel:024">Si te sientes fatal de verdad: 024</a>`,
    e => { if (e.target.closest('[data-esc]')) abrirContar({ objetivo: 'decir', guardarSolo: true, titulo: 'Escríbelo aquí', texto: 'Esta noche quería escribirle esto a alguien, pero había bebido. ¿Se lo mando?\n\n' }); });
  }
  const o = capa(`<h2>Respira conmigo</h2><p class="p">Tres o cuatro vueltas bastan.</p><div class="respira"><b>Prepárate</b></div>
    <p class="p" style="text-align:center">Pies en el suelo. Hombros abajo. Mira tres cosas a tu alrededor.</p>`);
  let k = 0; const fases = [['Coge aire', 4000, 1], ['Aguanta', 2000, 1], ['Suéltalo despacio', 6000, .6]];
  const paso = () => { const c = o.querySelector('.respira'); if (!c || !o.isConnected) return; const [t, d, s] = fases[k]; c.style.setProperty('--d', d + 'ms'); c.style.setProperty('--s', s); c.querySelector('b').textContent = t; timer = setTimeout(() => { k = (k + 1) % 3; paso(); }, d); };
  timer = setTimeout(paso, 400);
}
function fueraDetalle(c) {
  if (!c) return;
  capa(`<h2>${esc(c.n)}</h2>
    <div class="una"><small>Ahora, una sola cosa</small>${esc(c.id === 'compara' ? 'Haz tu reto de esta semana, aunque sea en pequeño.' : c.una)}</div>
    ${c.dilo && c.dilo.length ? `<div class="dilo"><small>Dilo así</small>${c.dilo.map(t => `<b>${esc(t)}</b>`).join('')}</div>` : ''}
    <details class="mas"><summary>Ver más ideas</summary>${c.haz.map(t => `<p>${esc(t)}</p>`).join('')}</details>
    <button class="btn ancho" style="margin-top:16px" data-fin>Ya estoy mejor</button>`,
  e => { if (e.target.closest('[data-fin]')) cerrarCapa(true); }, 'Otra situación');
}

// ---------- Reto ----------
function apuntarIntento(res) {
  const reto = retoTexto(), id = uid('i');
  store(K.intentos, (load(K.intentos, []) || []).concat({ id, fecha: new Date().toISOString(), reto, res }));
  render();
  capa(`<h2>${res === 'hecho' ? 'Bien hecho.' : 'Intentarlo ya cuenta.'}</h2>
    <p class="grande">No mejoras leyendo. Mejoras haciéndolo.</p>
    <p class="p">¿Quieres contar cómo fue? Así ves qué funciona.</p>
    <button class="btn prim ancho" data-cuenta>${ic('chat')}Contar cómo fue</button>
    <button class="btn ancho" style="margin-top:8px" data-x="cerrar">Ahora no</button>
    <p style="text-align:center;margin-top:10px"><button class="lnk" data-deshacer>Me he equivocado, deshacer</button></p>`,
  e => {
    if (e.target.closest('[data-deshacer]')) { store(K.intentos, (load(K.intentos, []) || []).filter(x => x.id !== id)); cerrarCapa(true); return toast('Deshecho'); }
    if (e.target.closest('[data-cuenta]')) abrirContar({ titulo: 'Cuenta cómo fue', texto: 'Hoy ' + (res === 'hecho' ? 'he hecho' : 'he intentado') + ' mi reto («' + reto + '»). Fue así: ' }); });
}

// ---------- Ajustes ----------
function abrirAjustes() {
  const t = load(K.tema, null) || 'auto', pin = load(K.pin, null), sync = typeof CS !== 'undefined' ? CS.status() : { on: false };
  capa(`<h2>Ajustes</h2>
    <p class="eti">Tema</p><div class="chips" style="margin-top:0">${[['auto', 'Como el móvil'], ['light', 'Claro'], ['dark', 'Oscuro']].map(([k, n]) => `<button data-tema="${k}" class="${k === t ? 'on' : ''}">${n}</button>`).join('')}</div>
    <p class="eti">Privacidad</p>
    <div class="lista"><button class="row" data-pin><span class="tx"><b>${pin ? 'Quitar el PIN' : 'Poner un PIN'}</b><small>${pin ? 'Cimientos pide el PIN al abrirla y al volver después de cinco minutos fuera.' : 'Para que nadie más pueda abrir Cimientos en tu móvil.'}</small></span>${ic('candado')}</button></div>
    <p class="eti">Tus datos</p>
    <div class="card" style="margin-top:0"><b>Sincronización entre dispositivos: ${sync.on ? 'activa' : 'no está puesta'}</b><p class="sub">${sync.on ? 'Lo que haces aquí se junta con tus otros dispositivos, cifrado.' : 'Se configura en la versión anterior, en Recorrido.'}</p></div>
    <div class="lista" style="margin-top:12px"><a class="row" href="clasica.html" style="text-decoration:none;color:inherit"><span class="tx"><b>Versión anterior</b><small>Todas las herramientas de antes: simulador, diario, plan de salida…</small></span>${ic('flecha')}</a></div>`,
  (e, o) => {
    const b = e.target.closest('[data-tema]');
    if (b) { store(K.tema, b.dataset.tema); aplicarTema(); o.querySelectorAll('[data-tema]').forEach(x => x.classList.toggle('on', x === b)); return; }
    if (e.target.closest('[data-pin]')) {
      if (!pin) return pinSetup();
      return pinPad('Quitar PIN', 'Escribe el PIN actual', async v => { if ((await pinHash(v, pin.salt)) !== pin.hash) return 'PIN incorrecto'; store(K.pin, null); setTimeout(() => { cerrarCapa(true); toast('PIN quitado'); }, 50); return true; }, { cancel: true });
    }
  });
}
function aplicarTema() {
  const t = load(K.tema, null) || 'auto';
  const oscuro = t === 'dark' || (t === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', oscuro);
  document.querySelector('#btnTema use').setAttribute('href', oscuro ? '#i-sol' : '#i-luna');
  const m = document.querySelector('meta[name=theme-color]'); if (m) m.setAttribute('content', oscuro ? '#12100f' : '#f5f3f0');
}
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', aplicarTema);

// ---------- Pantallas principales ----------
function ultimas8() { const s = []; for (let w = 7; w >= 0; w--) { const d = lunes(Date.now()); d.setDate(d.getDate() - 7 * w); s.push(dayKey(d)); } return s; }
function intentosPorSemana() { const m = {}; (load(K.intentos, []) || []).filter(i => i.res !== 'no').forEach(i => { const k = semanaKey(i.fecha); m[k] = (m[k] || 0) + 1; }); return m; }

function vistaHoy() {
  const hs = load(K.historias, []) || [], p = plan(), w = semana(), r = opcionesReto();
  const pendientes = hs.filter(h => !h.enviada);
  const sinLleva = hs.slice().reverse().find(h => h.enviada && !h.lleva && !h.saltaLleva);
  const porSem = intentosPorSemana(), sems = ultimas8(), ahora = semanaKey(Date.now());
  const estaSemana = porSem[ahora] || 0, activas = sems.filter(s => porSem[s]).length;
  const desde = Date.parse(p.desde || p.inicio || Date.now());
  const intentosAqui = (load(K.intentos, []) || []).filter(i => i.res !== 'no' && Date.parse(i.fecha) >= desde).length;
  const proponerSiguiente = w && intentosAqui > 0 && Date.now() - desde > 5 * 864e5;
  const L = leidas(), lectura = w ? w.docs.find(id => !L[id] && porId(id)) : null;
  const sigLeccion = _LECC.find(l => !L[l.id]);
  const fecha = mayus(new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }));

  return `
    <section class="hero">
      <div class="fecha">${fecha}${w ? ' · semana ' + (p.sem + 1) + ' de ' + _PLAN.length : ''}</div>
      <div class="que">${w ? esc(w.t) : 'Ocho semanas hechas'}</div>
      <p class="sub">${w ? esc(w.foco) : 'Ahora toca mantenerlo. Sigue con un reto por semana o empieza otra vuelta del plan.'}</p>
      <div class="dentro"><small>Tu reto esta semana${r.facil && w ? ' · versión fácil' : ''}</small><b>${esc(retoTexto())}</b></div>
      <div class="fila"><button class="btn" data-int="hecho">${ic('check')}Lo he hecho</button><button class="btn sec" data-int="intento">Lo he intentado</button></div>
      ${w ? `<button class="lnk" data-facil>${r.facil ? 'Volver al reto de la semana' : 'Hoy me cuesta: dame uno más fácil'}</button>` : `<button class="lnk" data-otravuelta>Empezar otra vuelta del plan</button>`}
      <div class="tira" aria-label="Últimas 8 semanas">${sems.map(s => `<i class="${porSem[s] ? 'on' : ''}"></i>`).join('')}</div>
      <div class="tira-t">${estaSemana ? 'Esta semana: ' + estaSemana + (estaSemana === 1 ? ' vez' : ' veces') + ' · ' : ''}${activas ? 'lo has intentado ' + activas + ' de las últimas 8 semanas' : 'cada raya es una semana en la que lo intentas'}</div>
    </section>

    ${sinLleva ? `<div class="aviso"><b>¿Qué te llevaste?</b><p class="cita">«${esc(sinLleva.texto.length > 90 ? sinLleva.texto.slice(0, 90) + '…' : sinLleva.texto)}»</p>
      <input type="text" id="llevaHome" placeholder="Lo que te dijo Claude, en una línea">
      <div class="fila" style="margin-top:8px"><button class="btn prim" data-lleva-home="${sinLleva.id}">Guardar</button><button class="lnk" data-salta="${sinLleva.id}">Ahora no</button></div></div>` : ''}
    ${pendientes.length ? `<div class="aviso"><b>${pendientes.length === 1 ? 'Una historia' : pendientes.length + ' historias'} sin preguntar</b><p>${navigator.onLine ? 'Ya tienes conexión: pregúntaselo ahora a Claude.' : 'Cuando vuelva la cobertura, pregúntaselo a Claude.'}</p>
      <button class="btn" data-act="${pendientes.length === 1 && navigator.onLine ? 'env:' + pendientes[0].id : 'tab:contar'}">${navigator.onLine ? 'Preguntar ahora' : 'Ver'}</button></div>` : ''}
    ${proponerSiguiente ? `<div class="aviso"><b>${_PLAN[p.sem + 1] ? '¿Pasas a la semana ' + (p.sem + 2) + '?' : '¿Das el plan por terminado?'}</b><p>Llevas unos días con «${esc(w.t)}» y ya lo has puesto en práctica.${_PLAN[p.sem + 1] ? ' Lo siguiente: «' + esc(_PLAN[p.sem + 1].t) + '».' : ''}</p><button class="btn prim" data-siguiente>Sí, pasar</button></div>` : ''}

    <p class="eti">Para entender y aprender hoy</p>
    <div class="lista">
      ${lectura ? filaLectura(lectura) : ''}
      ${!lectura && sigLeccion ? filaLectura(sigLeccion.id) : ''}
      <button class="row" data-act="tab:aprender"><span class="tx"><b>Todo lo que puedes aprender</b><small>El plan, lecciones para entenderte y la biblioteca</small></span>${ic('flecha')}</button>
    </div>

    <button class="btn prim ancho" style="margin-top:16px" data-act="contar">${ic('chat')}Cuéntame qué ha pasado</button>

    <p class="eti">Si lo necesitas</p>
    <div class="grid2">
      <button class="opt" data-sos="fuera">${ic('pin')}<span><b>Estoy fuera y me bloqueo</b><small>Una sola cosa que hacer</small></span></button>
      <button class="opt" data-sos="solo">${ic('gente')}<span><b>Me siento solo</b><small>Un plan para ahora</small></span></button>
      <button class="opt" data-sos="bajon">${ic('nube')}<span><b>He bebido y estoy de bajón</b><small>Pocos pasos, letra grande</small></span></button>
      <button class="opt" data-sos="respira">${ic('respirar')}<span><b>Me agobio</b><small>Respirar un minuto</small></span></button>
    </div>
    <p class="nota" style="margin-top:10px">Todo esto funciona sin cobertura.</p>`;
}

let busqueda = '';
function resultados(q) {
  const n = sinTildes(q.trim()); if (n.length < 3) return null;
  const fuentes = [].concat(_LECC, GUIA_ITEMS, _DOCS);
  const textoDe = x => sinTildes([x.titulo, x.sub, x.bloque, JSON.stringify(x.secciones || x.tarjetas || [x.pasa, x.hacer] || '')].join(' '));
  const enTitulo = [], enTexto = [];
  for (const x of fuentes) { if (sinTildes(x.titulo).includes(n)) enTitulo.push(x); else if (textoDe(x).includes(n)) enTexto.push(x); }
  return enTitulo.concat(enTexto).slice(0, 30);
}
function vistaAprender() {
  const p = plan(), w = semana(), L = leidas(), f = favs().filter(porId);
  const tip = _TIPS.length ? _TIPS[Math.floor(Date.now() / 864e5) % _TIPS.length] : null;
  const secs = secciones(), total = secs.reduce((a, s) => a + s.total, 0) + _LECC.length, leidasN = Object.keys(L).filter(porId).length;
  return `
    ${w ? `<section class="hero">
      <div class="fecha">Semana ${p.sem + 1} de ${_PLAN.length}</div>
      <div class="que">${esc(w.t)}</div>
      <p class="sub">${esc(w.foco)}</p>
      <div class="dentro"><small>Lo que crees (y vas a comprobar)</small><b>${esc(w.exp)}</b></div>
      <button class="lnk" data-plan style="margin-top:10px">Ver las 8 semanas</button>
    </section>
    <p class="eti">Las lecturas de esta semana</p>
    <div class="lista">${w.docs.map(filaLectura).join('')}</div>` : `<section class="hero"><div class="que">Plan de 8 semanas hecho</div><p class="sub">Puedes repasar cualquier semana o empezar otra vuelta.</p><button class="lnk" data-plan style="margin-top:10px">Ver las 8 semanas</button></section>`}

    <p class="eti">Para entenderte</p>
    <div class="lista">${_LECC.map(l => filaLectura(l.id)).join('')}</div>

    <p class="eti">Toda la biblioteca · ${leidasN} de ${total} leídas</p>
    <div class="buscar">${ic('buscar')}<input type="search" id="busca" placeholder="Buscar: nervios, cita, rechazo…" value="${esc(busqueda)}" autocomplete="off"></div>
    <div id="res"></div>
    <div id="secs" class="lista" style="margin-top:8px">${secs.map(s => `<button class="row" data-sec="${s.k}"><span class="tx"><b>${esc(s.n)}</b><small>${esc(s.s)}</small></span><span class="num">${s.total}</span>${ic('flecha')}</button>`).join('')}</div>

    ${f.length ? `<p class="eti">Guardadas</p><div class="lista">${f.map(filaLectura).join('')}</div>` : ''}
    ${tip ? `<div class="card idea" style="margin-top:20px">${ic('bombilla')}<div><small>Idea del día · ${esc(tip[0])}</small><p>${esc(tip[1])}</p></div></div>` : ''}`;
}
function pintarBusqueda() {
  const r = resultados(busqueda), res = document.getElementById('res'), secs = document.getElementById('secs'); if (!res) return;
  secs.style.display = r ? 'none' : '';
  res.innerHTML = r == null ? '' : r.length ? `<div class="lista" style="margin-top:8px">${r.map(x => filaLectura(x.id)).join('')}</div>` : '<p class="vacio" style="margin-top:12px">No hay nada con esa palabra. Prueba con otra, o pregúntaselo a Claude desde Contar.</p>';
}

function vistaContar() {
  const hs = (load(K.historias, []) || []).slice().reverse();
  return `
    <section class="hero">
      <div class="que">Cuéntamelo</div>
      <p class="sub">Lo que te ha pasado, una duda o algo que no entiendes de ti. Te lo dejo listo para preguntárselo a Claude. Sin cobertura, lo guardo.</p>
      <div class="fila"><button class="btn" data-act="contar">${ic('chat')}Me ha pasado algo</button><button class="btn sec" data-act="duda">Tengo una duda</button></div>
    </section>
    <p class="eti">Lo que has contado</p>
    ${hs.length ? hs.map(h => `<div class="hist"><small>${fCorta(h.fecha)}${h.enviada ? '' : ' · <span class="pend">sin preguntar</span>'}</small><p>${esc(h.texto)}</p>
      ${h.lleva ? `<div class="lleva">${esc(h.lleva)}</div>` : ''}
      <div class="fila"><button class="btn ${h.enviada ? '' : 'prim'}" data-env="${h.id}">${h.enviada ? 'Volver a preguntar' : 'Preguntar a Claude'}</button>${h.enviada && !h.lleva ? `<button class="btn" data-llevar="${h.id}">Apuntar lo que me llevo</button>` : ''}<button class="lnk" data-borra="${h.id}">Borrar</button></div></div>`).join('')
      : '<div class="card"><p class="vacio">Aún no has contado nada. La próxima vez que te pase algo (bueno o malo), cuéntalo aquí: es la forma más rápida de entender qué funciona contigo.</p></div>'}`;
}

function vistaRecorrido() {
  const hs = load(K.historias, []) || [], p = plan(), porSem = intentosPorSemana(), sems = ultimas8();
  const activas = sems.filter(s => porSem[s]).length, max = Math.max(1, ...sems.map(s => porSem[s] || 0));
  const L = leidas(), leidasN = Object.keys(L).filter(porId).length, manual = hs.filter(h => h.lleva).reverse();
  return `
    <h2 style="margin-top:4px">Tu recorrido</h2>
    <div class="stats">
      <div class="stat"><b>${activas}<small style="font-size:.9rem;color:var(--muted)">/8</small></b><span>semanas activas de las últimas 8</span></div>
      <div class="stat"><b>${leidasN}</b><span>lecturas</span></div>
      <div class="stat"><b>${hs.length}</b><span>historias contadas</span></div>
    </div>
    <div class="card"><h3>Retos por semana</h3><p class="sub">Lo que de verdad te hace mejorar.</p>
      <div class="semanas">${sems.map(s => { const n = porSem[s] || 0; return `<div><i class="${n ? '' : 'no'}" style="height:${n ? Math.max(12, n / max * 100) : 6}%"></i><span>${new Date(s).getDate()}</span></div>`; }).join('')}</div></div>
    <div class="card"><h3>Plan de 8 semanas</h3><p class="sub">${p.fin ? 'Hecho entero.' : 'Vas por la semana ' + (p.sem + 1) + ': ' + esc(_PLAN[p.sem] ? _PLAN[p.sem].t : '') + '.'}</p>
      <div class="tira" style="margin-top:12px">${_PLAN.map((w, i) => `<i style="background:${i < p.sem || p.fin ? 'var(--accent)' : i === p.sem ? 'color-mix(in srgb, var(--accent) 40%, transparent)' : 'var(--active)'}"></i>`).join('')}</div>
      <button class="lnk" data-plan style="margin-top:8px">Ver las 8 semanas</button></div>
    <p class="eti">Mi manual · lo que me he llevado</p>
    <div class="card" style="margin-top:0">${manual.length ? `<ul class="manual">${manual.map(h => `<li>${esc(h.lleva)}<small>${fCorta(h.fecha)}</small></li>`).join('')}</ul>` : '<p class="vacio">Cada vez que cuentes algo y Claude te responda, apunta en una línea lo que te llevas. Aquí se va formando tu propio manual.</p>'}</div>`;
}

function render() {
  const v = { hoy: vistaHoy, aprender: vistaAprender, contar: vistaContar, recorrido: vistaRecorrido }[tab] || vistaHoy;
  app.innerHTML = v();
  document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  if (tab === 'aprender') pintarBusqueda();
}
function irA(t) { tab = t; busqueda = ''; render(); window.scrollTo(0, 0); }

document.getElementById('nav').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) irA(b.dataset.tab); });
document.getElementById('btnAjustes').addEventListener('click', abrirAjustes);
document.getElementById('btnTema').addEventListener('click', () => { store(K.tema, document.documentElement.classList.contains('dark') ? 'light' : 'dark'); aplicarTema(); });
app.addEventListener('input', e => { if (e.target.id === 'busca') { busqueda = e.target.value; pintarBusqueda(); } });
app.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const d = b.dataset;
  if (d.sos) return abrirSOS(d.sos);
  if (d.int) return apuntarIntento(d.int);
  if (d.leer) return abrirLectura(d.leer);
  if (d.sec) return abrirSeccion(d.sec);
  if ('plan' in d) return abrirPlanEntero();
  if ('siguiente' in d) return siguienteSemana();
  if ('facil' in d) { store(K.reto, Object.assign({}, opcionesReto(), { facil: !opcionesReto().facil })); return render(); }
  if ('otravuelta' in d) { store(K.plan, Object.assign({}, plan(), { sem: 0, fin: false, desde: new Date().toISOString() })); render(); return toast('Otra vuelta: semana 1'); }
  if (d.llevaHome) { const v = document.getElementById('llevaHome').value.trim(); if (!v) return toast('Escribe una línea'); marcar(d.llevaHome, { lleva: v }); render(); return toast('Apuntado en tu manual'); }
  if (d.salta) { marcar(d.salta, { saltaLleva: true }); return render(); }
  if (d.env) { if (!navigator.onLine) return toast('Sin conexión. Inténtalo cuando haya cobertura.'); return abrirEnviar(d.env); }
  if (d.llevar) return abrirEnviar(d.llevar);
  if (d.borra) { if (confirm('¿Borrar esta historia?')) { store(K.historias, (load(K.historias, []) || []).filter(x => x.id !== d.borra)); render(); } return; }
  const a = d.act; if (!a) return;
  if (a === 'contar') return abrirContar();
  if (a === 'duda') return abrirContar({ titulo: '¿Qué duda tienes?', objetivo: 'entender', texto: '' });
  if (a.startsWith('tab:')) return irA(a.slice(4));
  if (a.startsWith('env:')) { if (!navigator.onLine) return toast('Sin conexión. Inténtalo cuando haya cobertura.'); return abrirEnviar(a.slice(4)); }
});
window.addEventListener('online', () => { if (!hayCapa()) render(); if ((load(K.historias, []) || []).some(h => !h.enviada)) toast('Vuelves a tener conexión: ya puedes preguntar lo pendiente'); });
window.addEventListener('offline', () => { if (!hayCapa()) render(); });

// ---------- PIN (el mismo que la versión anterior) ----------
async function pinHash(pin, salt) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + ':' + pin));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
}
function pinPad(titulo, sub, onDone, opts) {
  opts = opts || {};
  const o = document.createElement('div'); o.className = 'lock'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-label', titulo);
  let v = '';
  const paint = err => {
    o.innerHTML = `<div class="lock-in">${ic('cimientos')}<h2>${esc(titulo)}</h2><p>${esc(err || sub)}</p>
      <div class="lock-dots ${err ? 'err' : ''}">${[0, 1, 2, 3].map(i => `<i class="${i < v.length ? 'on' : ''}"></i>`).join('')}</div>
      <div class="lock-pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map(k => k === '' ? '<span></span>' : `<button type="button" data-k="${k}" aria-label="${k === '⌫' ? 'Borrar' : k}">${k}</button>`).join('')}</div>
      ${opts.cancel ? '<button class="lock-x" data-k="x">Cancelar</button>' : ''}${opts.olvido ? '<button class="lock-x" data-k="olvido">He olvidado el PIN</button>' : ''}</div>`;
  };
  paint();
  document.body.appendChild(o);
  const close = () => { o.remove(); document.removeEventListener('keydown', kd); };
  const press = async k => {
    if (k === 'x') return close();
    if (k === 'olvido') {
      if (!confirm('Sin el PIN no se puede entrar. La única opción es borrar todos los datos de Cimientos de este móvil. ¿Borrar todo?')) return;
      Object.keys(localStorage).filter(x => x.startsWith('cimientos')).forEach(x => { try { localStorage.removeItem(x); } catch (e) {} });
      if (typeof CS !== 'undefined') CS.off(); // si no, la sincronización devolvería los datos sin pedir el PIN
      close(); render(); return toast('Datos borrados');
    }
    if (k === '⌫') { v = v.slice(0, -1); return paint(); }
    if (v.length >= 4) return;
    v += k; paint();
    if (v.length === 4) { const r = await onDone(v); if (r === true) close(); else { v = ''; paint(r || 'PIN incorrecto'); } }
  };
  o.addEventListener('click', e => { const b = e.target.closest('[data-k]'); if (b) press(b.dataset.k); });
  const kd = e => { if (/^[0-9]$/.test(e.key)) press(e.key); else if (e.key === 'Backspace') press('⌫'); };
  document.addEventListener('keydown', kd);
  return o;
}
function pinSetup() {
  let first = null;
  const pad = pinPad('Elige un PIN', 'Cuatro números que recuerdes.', async v => {
    if (!first) { first = v; pad.querySelector('h2').textContent = 'Repítelo'; return 'Escríbelo otra vez para confirmar'; }
    if (v !== first) { first = null; pad.querySelector('h2').textContent = 'Elige un PIN'; return 'No coincide. Empieza de nuevo'; }
    const salt = Math.random().toString(36).slice(2) + Date.now().toString(36);
    store(K.pin, { salt, hash: await pinHash(v, salt) });
    setTimeout(() => { cerrarCapa(true); toast('PIN guardado'); }, 50);
    return true;
  }, { cancel: true });
}
function pinLock() {
  const p = load(K.pin, null); if (!p || document.querySelector('.lock')) return;
  pinPad('Cimientos', 'Escribe tu PIN', async v => (await pinHash(v, p.salt)) === p.hash, { olvido: true });
}
let pinFuera = 0;
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') pinFuera = Date.now();
  // 5 minutos: da tiempo a pegar en Claude y volver sin que salte el PIN.
  else { if (pinFuera && Date.now() - pinFuera > 5 * 60e3) pinLock(); if (typeof CS !== 'undefined') CS.sync(); }
});

// ---------- Arranque ----------
aplicarTema();
render();
pinLock();
// Enlaces directos desde Mi Espacio: …/cimientos/#solo o #salir
if (location.hash === '#solo' || location.hash === '#salir') { const t = location.hash === '#solo' ? 'solo' : 'fuera'; history.replaceState(null, '', location.pathname); abrirSOS(t); }
if (typeof CS !== 'undefined') { CS.onChange = s => { if (s === 'changed' && !hayCapa()) render(); }; CS.sync(); }
if ('serviceWorker' in navigator) {
  const habia = !!navigator.serviceWorker.controller;
  let recargando = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (habia && !recargando && !hayCapa()) { recargando = true; location.reload(); } });
  window.addEventListener('load', () => { navigator.serviceWorker.register('service-worker.js').catch(() => {}); });
}
