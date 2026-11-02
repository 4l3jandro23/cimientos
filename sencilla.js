/* Cimientos sencilla. Tres cosas: contar lo que pasa (y preguntárselo a Claude),
   ayuda en el momento (funciona sin cobertura) y un solo reto por semana.
   Todo vive en este dispositivo (y en tu sincronización cifrada, si la tienes puesta). */
'use strict';
const K = { historias: 'cimientosHistorias', intentos: 'cimientosIntentos', reto: 'cimientosRetoSemana', pin: 'cimientosPin' };
const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
const store = (k, v) => { const old = load(k, null); try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} if (typeof CS !== 'undefined') CS.touch(k, old, v); };
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const dayKey = d => { const x = new Date(d); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
const lunes = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - (x.getDay() + 6) % 7); return x; };
const semanaKey = d => dayKey(lunes(d));
const fCorta = iso => new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
const app = document.getElementById('app');

function toast(t) {
  document.querySelectorAll('.toast').forEach(x => x.remove());
  const el = document.createElement('div'); el.className = 'toast'; el.textContent = t;
  document.body.appendChild(el); setTimeout(() => el.remove(), 2600);
}

// ---------- Retos: una escalera corta, de fácil a difícil ----------
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
const retoActual = () => { const r = load(K.reto, null); return r && Number.isInteger(r.idx) ? Math.min(r.idx, RETOS.length - 1) : 0; };

// ---------- Hablar con Claude ----------
const OBJETIVOS = [
  ['harias', 'Qué harías tú', 'Dime qué harías tú en mi lugar, con frases concretas si hace falta.'],
  ['decir', 'Qué digo ahora', 'Necesito saber qué decir o escribir ahora. Dame 2 o 3 opciones cortas y dime cuál usarías tú.'],
  ['entender', 'Ayúdame a entenderlo', 'Ayúdame a entender qué ha pasado: qué hice bien, qué pudo fallar y qué pensaría la otra persona.'],
  ['desahogo', 'Solo desahogarme', 'Solo quiero desahogarme. Respóndeme con calma; consejos solo si ves algo importante.']
];
function promptPara(h) {
  const obj = OBJETIVOS.find(o => o[0] === h.objetivo) || OBJETIVOS[0];
  const llevo = (load(K.historias, []) || []).filter(x => x.lleva && x.id !== h.id).slice(-3).map(x => '- ' + x.lleva);
  return [
    'Te cuento algo que me ha pasado. Estoy trabajando mi seguridad, hablar con gente y ligar, poco a poco.',
    'Mi reto de esta semana es: ' + RETOS[retoActual()] + '.',
    llevo.length ? 'Lo último que he aprendido:\n' + llevo.join('\n') : '',
    '',
    'Lo que ha pasado (' + new Date(h.fecha).toLocaleString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) + '):',
    h.texto,
    '',
    obj[2],
    'Contéstame corto y claro, en español de España. Sé sincero aunque no me guste. Acaba con una sola cosa pequeña que pueda practicar esta semana.'
  ].filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n');
}

// ---------- Pantallas encima ----------
let capaActual = null, timer = null;
function capa(html, onClick) {
  cerrarCapa(false);
  const o = document.createElement('div'); o.className = 'capa'; o.setAttribute('role', 'dialog');
  o.innerHTML = `<div class="capa-in"><button class="volver" data-x="cerrar">← Volver</button>${html}</div>`;
  o.addEventListener('click', e => { const b = e.target.closest('[data-x="cerrar"]'); if (b) return cerrarCapa(); onClick && onClick(e, o); });
  document.body.appendChild(o); document.body.style.overflow = 'hidden'; capaActual = o;
  return o;
}
function cerrarCapa(repintar = true) {
  clearTimeout(timer);
  if (capaActual) { capaActual.remove(); capaActual = null; document.body.style.overflow = ''; }
  if (repintar) render();
}

// Contar: escribir (o dictar) lo que pasó y elegir qué quieres.
function abrirContar(inicial) {
  let objetivo = (inicial && inicial.objetivo) || 'harias';
  const guardarSolo = !!(inicial && inicial.guardarSolo) || !navigator.onLine;
  const o = capa(`<h2>Cuéntame qué ha pasado</h2>
    <p class="p">Como se lo contarías a un amigo. Puedes dictarlo con el micro del teclado.</p>
    <textarea id="txt" placeholder="Estaba en… y pasó que…">${esc((inicial && inicial.texto) || '')}</textarea>
    <span class="eti" style="margin-top:20px">¿Qué quieres que te diga?</span>
    <div class="chips">${OBJETIVOS.map(([id, n]) => `<button data-obj="${id}" class="${id === objetivo ? 'on' : ''}">${n}</button>`).join('')}</div>
    <button class="btn prim ancho" data-go>${guardarSolo ? 'Guardar y preguntarlo luego' : 'Preguntárselo a Claude'}</button>
    <p class="nota">${!navigator.onLine ? 'Ahora no tienes conexión. Lo guardo y te queda apuntado arriba.' : guardarSolo ? 'Esta noche no se manda nada. Mañana lo miras con calma.' : 'Se guarda aquí y te lo preparo para pegarlo en Claude.'}</p>
    ${navigator.onLine ? '' : '<button class="btn ancho" style="margin-top:14px" data-sosya>¿Lo necesitas ahora? Ayuda sin conexión</button>'}`,
  (e, o) => {
    const c = e.target.closest('[data-obj]');
    if (c) { objetivo = c.dataset.obj; o.querySelectorAll('[data-obj]').forEach(b => b.classList.toggle('on', b === c)); return; }
    if (e.target.closest('[data-sosya]')) return abrirSOS('fuera');
    if (!e.target.closest('[data-go]')) return;
    const texto = o.querySelector('#txt').value.trim();
    if (!texto) { o.querySelector('#txt').focus(); return toast('Escribe primero qué ha pasado'); }
    const h = { id: uid('h'), fecha: new Date().toISOString(), texto, objetivo, enviada: false, lleva: '' };
    store(K.historias, (load(K.historias, []) || []).concat(h));
    if (!guardarSolo) abrirEnviar(h.id); else { cerrarCapa(); toast('Guardado. Te queda apuntado arriba.'); }
  });
  setTimeout(() => { const t = o.querySelector('#txt'); if (t && !t.value) t.focus(); }, 250);
}

// Enviar: copiar el mensaje ya preparado y abrir Claude. Luego, apuntar lo que te llevas.
async function abrirEnviar(id) {
  const h = (load(K.historias, []) || []).find(x => x.id === id); if (!h) return;
  const texto = promptPara(h);
  let copiado = false;
  try { await navigator.clipboard.writeText(texto); copiado = true; } catch (e) {}
  capa(`<h2>${copiado ? 'Copiado. Ahora pégalo en Claude' : 'Cópialo y pégalo en Claude'}</h2>
    ${copiado ? '' : '<textarea readonly id="cp" style="min-height:140px">' + esc(texto) + '</textarea><button class="btn ancho" style="margin-top:10px" data-copia>Copiar texto</button>'}
    <div class="paso"><b>1</b><span>Abre Claude${copiado ? '' : ' (antes copia el texto de arriba)'}.</span></div>
    <div class="paso"><b>2</b><span>Mantén el dedo en el cuadro de escribir y toca <b style="all:unset;font-weight:700">Pegar</b>. Envía.</span></div>
    <div class="paso"><b>3</b><span>Cuando te conteste, vuelve aquí y apunta en una línea lo que te llevas.</span></div>
    <a class="btn prim ancho" style="display:block;text-align:center;text-decoration:none;margin-top:18px" href="https://claude.ai/new" target="_blank" rel="noopener" data-abre>Abrir Claude</a>
    <div style="margin-top:26px"><span class="eti">Lo que me llevo (después)</span>
    <input type="text" id="lleva" placeholder="Ej.: No esperar a tener la frase perfecta" value="${esc(h.lleva)}">
    <button class="btn ancho" style="margin-top:10px" data-lleva>Guardar</button></div>`,
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
    cerrarCapa(); toast('Apuntado');
  });
  if (!copiado) setTimeout(() => { const t = document.getElementById('cp'); if (t) t.select(); }, 250);
}
function marcar(id, cambios) { store(K.historias, (load(K.historias, []) || []).map(x => x.id === id ? Object.assign({}, x, cambios) : x)); }

// Historial de todo lo contado.
function abrirHistorias() {
  const hs = (load(K.historias, []) || []).slice().reverse();
  capa(`<h2>Lo que me ha pasado</h2><p class="p">${hs.length ? 'Lo que has contado y lo que te has llevado de cada cosa.' : 'Aún no has contado nada.'}</p>
    ${hs.map(h => `<div class="hist"><small>${fCorta(h.fecha)}${h.enviada ? '' : ' · <span class="pend">sin preguntar</span>'}</small><p>${esc(h.texto)}</p>
      ${h.lleva ? `<div class="lleva">${esc(h.lleva)}</div>` : ''}
      <div class="fila"><button class="btn prim" data-env="${h.id}">${h.enviada ? 'Volver a preguntar' : 'Preguntar a Claude'}</button><button class="btn" data-borra="${h.id}">Borrar</button></div></div>`).join('')}`,
  e => {
    const env = e.target.closest('[data-env]'); if (env) { if (!navigator.onLine) return toast('Sin conexión. Inténtalo cuando haya cobertura.'); return abrirEnviar(env.dataset.env); }
    const b = e.target.closest('[data-borra]'); if (b && confirm('¿Borrar esta historia?')) { store(K.historias, (load(K.historias, []) || []).filter(x => x.id !== b.dataset.borra)); abrirHistorias(); }
  });
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
    const cosas = (typeof AHORA_COSAS !== 'undefined' ? AHORA_COSAS : []);
    return capa(`<h2>¿Qué te pasa?</h2><p class="p">Elige y te digo una sola cosa.</p>
      <div class="lista">${cosas.map(c => `<button data-c="${c.id}">${c.i} ${esc(c.n)}</button>`).join('')}</div>`,
    e => { const b = e.target.closest('[data-c]'); if (b) fueraDetalle(cosas.find(c => c.id === b.dataset.c)); });
  }
  if (tipo === 'solo') {
    let i = Math.floor(Math.random() * SOLO.length);
    const pinta = () => capa(`<h2>Estás solo un rato.</h2><p class="p">Sentirte solo es una señal de que quieres más compañía. No dice nada malo de ti.</p>
      <div class="una"><small>Prueba esto ahora</small>${esc(SOLO[i])}</div>
      <div class="fila"><button class="btn" data-otro>Otra idea</button><button class="btn" data-cuenta>Escribir lo que siento</button></div>
      <p class="p" style="margin-top:24px">Si es más que tristeza:</p><a class="tel" href="tel:024">Llamar al 024 · gratis, 24 h</a>`,
    e => {
      if (e.target.closest('[data-otro]')) { i = (i + 1 + Math.floor(Math.random() * (SOLO.length - 1))) % SOLO.length; pinta(); }
      if (e.target.closest('[data-cuenta]')) abrirContar({ objetivo: 'desahogo' });
    });
    return pinta();
  }
  if (tipo === 'bajon') {
    return capa(`<h2>Tranquilo.</h2>
      <p class="grande">Es el alcohol. Mañana lo verás distinto.</p>
      <div class="paso"><b>1</b><span>Bebe un vaso de agua entero.</span></div>
      <div class="paso"><b>2</b><span>No bebas más esta noche.</span></div>
      <div class="paso"><b>3</b><span>Busca cómo volver a casa y avisa a alguien.</span></div>
      <div class="paso"><b>4</b><span>Si quieres escribirle a alguien, no se lo mandes: escríbelo aquí y mañana lo miras con calma.</span></div>
      <button class="btn prim ancho" style="margin-top:10px" data-esc>Escribirlo aquí</button>
      <a class="tel" href="tel:024">Si te sientes fatal de verdad: 024</a>`,
    e => { if (e.target.closest('[data-esc]')) abrirContar({ objetivo: 'decir', guardarSolo: true, texto: 'Esta noche quería escribirle esto a alguien, pero había bebido. ¿Se lo mando?\n\n' }); });
  }
  // Agobio: respirar.
  const o = capa(`<h2>Respira conmigo</h2><p class="p">Tres o cuatro vueltas bastan.</p><div class="respira"><b>Prepárate</b></div>
    <p class="p" style="text-align:center">Pies en el suelo. Hombros abajo. Mira tres cosas a tu alrededor.</p>`);
  let k = 0; const fases = [['Coge aire', 4000, 1], ['Aguanta', 2000, 1], ['Suéltalo despacio', 6000, .6]];
  const paso = () => { const c = o.querySelector('.respira'); if (!c || !o.isConnected) return; const [t, d, s] = fases[k]; c.style.setProperty('--d', d + 'ms'); c.style.setProperty('--s', s); c.querySelector('b').textContent = t; timer = setTimeout(() => { k = (k + 1) % 3; paso(); }, d); };
  timer = setTimeout(paso, 400);
}
function fueraDetalle(c) {
  if (!c) return;
  const o = capa(`<h2>${c.i} ${esc(c.n)}</h2>
    <div class="una"><small>Ahora, una sola cosa</small>${esc(c.id === 'compara' ? 'Haz tu reto de esta semana, aunque sea en pequeño.' : c.una)}</div>
    ${c.dilo && c.dilo.length ? `<div class="dilo"><span class="eti">Dilo así</span>${c.dilo.map(t => `<b>${esc(t)}</b>`).join('')}</div>` : ''}
    <details class="mas"><summary>Ver más ideas</summary>${c.haz.map(t => `<p>${esc(t)}</p>`).join('')}</details>
    <button class="btn ancho" style="margin-top:18px" data-x="cerrar">Ya estoy mejor</button>`);
  const v = o.querySelector('.volver'); v.textContent = '← Otra situación'; v.removeAttribute('data-x'); v.addEventListener('click', () => abrirSOS('fuera'));
}

// ---------- Reto de la semana ----------
function apuntarIntento(res) {
  store(K.intentos, (load(K.intentos, []) || []).concat({ id: uid('i'), fecha: new Date().toISOString(), reto: RETOS[retoActual()], res }));
  if (res === 'no') { toast(new Date().getDay() === 0 ? 'Apuntado. Mañana empieza otra semana.' : 'Apuntado. Aún te queda semana.'); return render(); }
  render();
  capa(`<h2>${res === 'hecho' ? 'Bien hecho.' : 'Intentarlo ya cuenta.'}</h2>
    <p class="grande">No mejoras leyendo. Mejoras haciéndolo.</p>
    <p class="p">¿Quieres contar cómo fue? Así ves qué funciona.</p>
    <button class="btn prim ancho" data-cuenta>Contar cómo fue</button>
    <button class="btn ancho" style="margin-top:10px" data-x="cerrar">Ahora no</button>`,
  e => { if (e.target.closest('[data-cuenta]')) abrirContar({ texto: 'Hoy ' + (res === 'hecho' ? 'he hecho' : 'he intentado') + ' mi reto («' + RETOS[retoActual()] + '»). Fue así: ' }); });
}

// ---------- Pantalla principal ----------
function render() {
  const hs = load(K.historias, []) || [], ints = load(K.intentos, []) || [];
  const pendientes = hs.filter(h => !h.enviada);
  const ahora = semanaKey(Date.now());
  const porSemana = {}; ints.filter(i => i.res !== 'no').forEach(i => { const k = semanaKey(i.fecha); porSemana[k] = (porSemana[k] || 0) + 1; });
  const semanas = []; for (let w = 7; w >= 0; w--) { const d = lunes(Date.now()); d.setDate(d.getDate() - 7 * w); semanas.push(dayKey(d)); }
  const estaSemana = porSemana[ahora] || 0, activas = semanas.filter(s => porSemana[s]).length;
  const llevo = hs.filter(h => h.lleva).slice(-3).reverse();
  const sinLleva = hs.slice().reverse().find(h => h.enviada && !h.lleva && !h.saltaLleva);
  const retoT = RETOS[retoActual()], semanasReto = new Set(ints.filter(i => i.reto === retoT && i.res !== 'no').map(i => semanaKey(i.fecha))).size;
  const subir = semanasReto >= 2 && retoActual() < RETOS.length - 1;
  const hora = new Date().getHours();
  const saludo = hora < 6 ? 'Buenas noches' : hora < 14 ? 'Buenos días' : hora < 21 ? 'Buenas tardes' : 'Buenas noches';

  app.innerHTML = `
    <header class="top"><small>${(f => f[0].toUpperCase() + f.slice(1))(new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }))}</small><h1>${saludo}</h1></header>

    ${pendientes.length ? `<div class="aviso"><p>${pendientes.length === 1 ? 'Tienes una historia' : 'Tienes ' + pendientes.length + ' historias'} sin preguntar a Claude.</p><button class="btn" data-act="${pendientes.length === 1 ? 'env:' + pendientes[0].id : 'historias'}">${navigator.onLine ? 'Preguntar' : 'Ver'}</button></div>` : ''}

    ${sinLleva ? `<section class="card"><span class="eti">De lo que le contaste a Claude</span><p class="sub" style="margin:0 0 10px">«${esc(sinLleva.texto.length > 90 ? sinLleva.texto.slice(0, 90) + '…' : sinLleva.texto)}»</p>
      <h2>¿Qué te llevaste?</h2><input type="text" id="llevaHome" style="margin-top:10px" placeholder="En una línea">
      <div class="fila"><button class="btn prim" data-lleva-home="${sinLleva.id}">Guardar</button><button class="link" data-salta="${sinLleva.id}">No me contestó / saltar</button></div></section>` : ''}

    <button class="contar" data-act="contar"><span class="ic">💬</span><span><b>Cuéntame qué ha pasado</b><small>Lo preparo para preguntárselo a Claude. Sin cobertura, lo guardo.</small></span></button>

    <section class="card">
      <h2>Ahora mismo</h2><p class="sub">Sin conexión también.</p>
      <div class="sos-grid">
        <button data-sos="fuera"><span class="ic">📍</span>Estoy fuera y me bloqueo</button>
        <button data-sos="solo"><span class="ic">🫂</span>Me siento solo</button>
        <button data-sos="bajon"><span class="ic">🌧️</span>He bebido y estoy de bajón</button>
        <button data-sos="respira"><span class="ic">🫁</span>Me agobio</button>
      </div>
    </section>

    <section class="card">
      <span class="eti">Tu reto de esta semana</span>
      <p class="reto-t">${esc(RETOS[retoActual()])}</p>
      <p class="sub">${estaSemana ? 'Esta semana: ' + estaSemana + (estaSemana === 1 ? ' vez' : ' veces') + '. Cuantas más, mejor.' : 'Inténtalo al menos una vez esta semana.'}</p>
      <div class="fila"><button class="btn prim" data-int="hecho">Lo he hecho</button><button class="btn" data-int="intento">Lo he intentado</button><button class="btn" data-int="no">Hoy no</button></div>
      <div class="semanas" aria-label="Últimas 8 semanas">${semanas.map(s => `<i class="${porSemana[s] ? 'on' : ''} ${s === ahora ? 'ahora' : ''}"></i>`).join('')}</div>
      <p class="semanas-t">${activas ? 'Lo has intentado ' + activas + ' de las últimas 8 semanas.' : 'Cada raya es una semana.'}</p>
      ${subir ? '<div class="aviso" style="margin:14px 0 0"><p>Llevas ' + semanasReto + ' semanas con este. ¿Pasas al siguiente?</p><button class="btn" data-reto="1">Sí</button></div>' : ''}
      <div class="fila" style="margin-top:6px">${retoActual() > 0 ? '<button class="link" data-reto="-1">Más fácil</button>' : ''}${retoActual() < RETOS.length - 1 ? '<button class="link" data-reto="1">Siguiente reto</button>' : ''}</div>
    </section>

    <section class="card">
      <h2>Lo que voy aprendiendo</h2>
      ${llevo.length ? `<ul class="aprendo">${llevo.map(h => `<li>${esc(h.lleva)}<small>${fCorta(h.fecha)}</small></li>`).join('')}</ul>` : '<p class="vacio">Cuando cuentes algo y Claude te responda, apunta aquí en una línea lo que te llevas. Con el tiempo es tu propio manual.</p>'}
      ${hs.length ? `<button class="link" data-act="historias" style="margin-top:6px">Ver todo lo que he contado (${hs.length})</button>` : ''}
    </section>

    <footer class="pie">
      <a class="link" href="clasica.html">Versión anterior (todas las guías)</a>
      ${load(K.pin, null) ? '<button class="link" data-act="pinquitar">Quitar PIN</button>' : '<button class="link" data-act="pin">Poner PIN</button>'}
    </footer>`;
}

app.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.sos) return abrirSOS(b.dataset.sos);
  if (b.dataset.int) return apuntarIntento(b.dataset.int);
  if (b.dataset.llevaHome) { const v = document.getElementById('llevaHome').value.trim(); if (!v) return toast('Escribe una línea'); marcar(b.dataset.llevaHome, { lleva: v }); render(); return toast('Apuntado'); }
  if (b.dataset.salta) { marcar(b.dataset.salta, { saltaLleva: true }); return render(); }
  if (b.dataset.reto) { store(K.reto, { idx: Math.max(0, Math.min(RETOS.length - 1, retoActual() + Number(b.dataset.reto))) }); render(); return toast('Reto cambiado'); }
  const a = b.dataset.act; if (!a) return;
  if (a === 'contar') return abrirContar();
  if (a === 'historias') return abrirHistorias();
  if (a === 'pin') return pinSetup();
  if (a === 'pinquitar') { const p = load(K.pin, null); return pinPad('Quitar PIN', 'Escribe el PIN actual', async v => { if ((await pinHash(v, p.salt)) !== p.hash) return 'PIN incorrecto'; store(K.pin, null); setTimeout(() => { render(); toast('PIN quitado'); }, 50); return true; }, { cancel: true }); }
  if (a.startsWith('env:')) { if (!navigator.onLine) return toast('Sin conexión. Inténtalo cuando haya cobertura.'); return abrirEnviar(a.slice(4)); }
});
// Al volver la cobertura, el aviso de pendientes cambia a «Preguntar».
window.addEventListener('online', () => { if (!capaActual) render(); if ((load(K.historias, []) || []).some(h => !h.enviada)) toast('Vuelves a tener conexión: ya puedes preguntar lo pendiente'); });
window.addEventListener('offline', () => { if (!capaActual) render(); });

// ---------- PIN (el mismo que la versión anterior) ----------
async function pinHash(pin, salt) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + ':' + pin));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
}
function pinPad(titulo, sub, onDone, opts) {
  opts = opts === true ? { cancel: true } : (opts || {});
  const o = document.createElement('div'); o.className = 'lock'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-label', titulo);
  let v = '';
  const paint = err => {
    o.innerHTML = `<div class="lock-in"><img src="icon-180.png" alt="" width="64" height="64"><h2>${esc(titulo)}</h2><p>${esc(err || sub)}</p>
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
    setTimeout(() => { render(); toast('PIN guardado'); }, 50);
    return true;
  }, true);
}
function pinLock() {
  const p = load(K.pin, null); if (!p || document.querySelector('.lock')) return;
  pinPad('Cimientos', 'Escribe tu PIN', async v => (await pinHash(v, p.salt)) === p.hash, { olvido: true });
}
let pinFuera = 0;
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') pinFuera = Date.now();
  else { if (pinFuera && Date.now() - pinFuera > 60e3) pinLock(); if (typeof CS !== 'undefined') CS.sync(); }
});

// ---------- Arranque ----------
render();
pinLock();
// Enlaces directos desde Mi Espacio: …/cimientos/#solo o #salir
if (location.hash === '#solo' || location.hash === '#salir') { const t = location.hash === '#solo' ? 'solo' : 'fuera'; history.replaceState(null, '', location.pathname); abrirSOS(t); }
if (typeof CS !== 'undefined') { CS.onChange = s => { if (s === 'changed' && !capaActual) render(); }; CS.sync(); }
if ('serviceWorker' in navigator) {
  const habia = !!navigator.serviceWorker.controller;
  let recargando = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (habia && !recargando && !capaActual) { recargando = true; location.reload(); } });
  window.addEventListener('load', () => { navigator.serviceWorker.register('service-worker.js').catch(() => {}); });
}
