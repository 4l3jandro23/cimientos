/* Estudiar: escuchar las lecturas y llevarlas a NotebookLM o a Claude.
   · Escuchar: frase a frase, con la frase que suena resaltada en el texto, pausas naturales y velocidad a tu gusto.
     Tocar una frase salta a ella. Mantiene la pantalla encendida (si se apaga, el móvil corta la voz).
     Al acabar una lectura la marca como leída y sigue con la siguiente de la misma lista.
   · Llevar fuera: cada apartado sale como un archivo de texto; solo contenido de la app, nunca lo que cuentas tú.
   Se carga antes que sencilla.js: aquí solo hay funciones, y usan las piezas de sencilla.js (capa, toast, load…) al llamarlas. */
'use strict';
const KE = { voz: 'cimientosLectura' };

// ---------- Frases ----------
// Parte un texto en frases para poder leerlas y resaltarlas una a una.
const partirFrases = t => String(t).split(/(?<=[.!?…][»”")]?)\s+/).filter(s => s.trim());
let numFrase = 0;
const frs = t => partirFrases(t).map(s => `<span class="fr" data-f="${numFrase++}">${esc(s)}</span>`).join(' ');
const frTitulo = t => `<span class="fr h" data-f="${numFrase++}">${esc(t)}</span>`;
// Lo que la voz no debe leer tal cual.
const vozLimpia = t => t.replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '').replace(/[«»“”"]/g, '').replace(/\s*[·•→]\s*/g, ', ').replace(/_{2,}/g, ' algo ').replace(/\s+/g, ' ').trim();
const palabras = t => (String(t).match(/\S+/g) || []).length;

// ---------- Voz ----------
// La velocidad 1× es la que se entiende bien con calma (la «normal» del móvil se hace rápida).
const VELS = [['0,8×', .7], ['1×', .85], ['1,2×', 1], ['1,4×', 1.15]];
const vozCfg = () => Object.assign({ vel: 1, voz: '' }, load(KE.voz, {}) || {});
const minutosEscucha = n => Math.max(1, Math.round(n / (150 * VELS[vozCfg().vel][1] / .85)));
function vocesES() {
  const l = ('speechSynthesis' in window ? speechSynthesis.getVoices() : []).filter(v => /^es/i.test(v.lang));
  const nota = v => (/^es[-_]ES/i.test(v.lang) ? 0 : 20) - (/premium|enhanced|mejorad|natural|neural|online/i.test(v.name) ? 8 : 0) - (/google/i.test(v.name) ? 3 : 0) + (/compact|eloquence/i.test(v.name) ? 6 : 0);
  return l.sort((a, b) => nota(a) - nota(b));
}
const vozElegida = () => { const l = vocesES(), c = vozCfg(); return l.find(v => v.name === c.voz) || l[0] || null; };
const nombreVoz = v => v.name.replace(/^Microsoft\s+|^Google\s+/i, '').replace(/\s*[-(].*$/, '').trim() || v.name;
if ('speechSynthesis' in window) { try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => {}; } catch (e) {} }

let LV = null, lvGen = 0, wake = null;
const escuchando = () => !!LV;
async function pantallaEncendida(on) {
  try {
    if (on && !wake && navigator.wakeLock) { wake = await navigator.wakeLock.request('screen'); wake.addEventListener('release', () => { wake = null; }); }
    if (!on && wake) { await wake.release(); wake = null; }
  } catch (e) { wake = null; }
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && LV && !LV.pausa) pantallaEncendida(true); });

function cortarVoz() { lvGen++; if (LV) { clearTimeout(LV.timer); clearTimeout(LV.vigia); clearTimeout(LV.vigia2); clearInterval(LV.cuenta); } try { speechSynthesis.cancel(); } catch (e) {} }
function estParar() {
  cortarVoz();
  if (LV) {
    LV.capa.classList.remove('leyendo');
    LV.capa.querySelectorAll('.fr.on').forEach(x => x.classList.remove('on'));
    const p = LV.capa.querySelector('.player'); if (p) p.remove();
    const b = LV.capa.querySelector('[data-escuchar]'); if (b) b.innerHTML = ic('altavoz') + 'Escuchar';
    LV = null;
  }
  pantallaEncendida(false);
}
// Empieza a leer la lectura abierta en la capa o. ids = la lista en la que estaba, para seguir con la siguiente.
function estLeer(o, desde) {
  estParar();
  const els = [...o.querySelectorAll('.lect .fr')]; if (!els.length) return;
  LV = { capa: o, els, i: Math.max(0, desde || 0), pausa: false, ids: o.ctxIds || [], id: o.dataset.lect, fin: false, toque: 0 };
  o.classList.add('leyendo');
  const b = o.querySelector('[data-escuchar]'); if (b) b.innerHTML = ic('pausa') + 'Pausar';
  pantallaEncendida(true);
  decir();
}
function siguienteId() { if (!LV) return null; const k = LV.ids.indexOf(LV.id); return k >= 0 && LV.ids[k + 1] && porId(LV.ids[k + 1]) ? LV.ids[k + 1] : null; }
function pintarPlayer() {
  if (!LV) return;
  const o = LV.capa, c = vozCfg();
  let p = o.querySelector('.player');
  if (!p) { p = document.createElement('div'); p.className = 'player'; p.setAttribute('role', 'region'); p.setAttribute('aria-label', 'Lectura en voz alta'); o.appendChild(p); }
  const x = porId(LV.id), n = LV.els.length;
  const queda = LV.els.slice(LV.i).reduce((a, e) => a + palabras(e.textContent), 0);
  let tx;
  if (LV.fin) {
    const sig = siguienteId(), sx = sig && porId(sig);
    tx = sx ? `<b>Siguiente: ${esc(sx.titulo)}</b><small>${LV.seg > 0 ? 'Empieza en ' + LV.seg + ' s' : 'Empezando…'}</small>` : `<b>Has terminado</b><small>Marcada como leída</small>`;
  } else tx = `<b>${esc(x ? x.titulo : '')}</b><small>${LV.pausa ? 'En pausa · ' : ''}${Math.min(LV.i + 1, n)}/${n} · ${minutosEscucha(queda)} min</small>`;
  p.innerHTML = `<div class="pl-pg"><i style="width:${LV.fin ? 100 : Math.round(LV.i / Math.max(1, n) * 100)}%"></i></div>
    <div class="pl-row">
      ${LV.fin ? '' : `<button data-pl="prev" class="pl-b" aria-label="Frase anterior">${ic('atras')}</button>`}
      <button data-pl="play" class="pl-pp" aria-label="${LV.fin ? 'Empezar ya' : LV.pausa ? 'Seguir' : 'Pausar'}">${ic(LV.fin ? 'adelante' : LV.pausa ? 'play' : 'pausa')}</button>
      ${LV.fin ? '' : `<button data-pl="next" class="pl-b" aria-label="Frase siguiente">${ic('adelante')}</button>`}
      <div class="pl-tx">${tx}</div>
      ${LV.fin ? '' : `<button data-pl="vel" class="pl-vel" aria-label="Velocidad">${VELS[c.vel][0]}</button>`}
      <button data-pl="stop" class="pl-b" aria-label="Cerrar el reproductor">${ic('x')}</button>
    </div>`;
}
function resaltar() {
  if (!LV) return;
  LV.els.forEach((e, k) => e.classList.toggle('on', k === LV.i && !LV.fin));
  const e = LV.els[LV.i]; if (!e) return;
  // Sigue el texto solo si no estás moviéndolo tú.
  if (Date.now() - LV.toque < 4000) return;
  const r = e.getBoundingClientRect(), alto = window.innerHeight, barra = 150;
  if (r.top < 90 || r.bottom > alto - barra) LV.capa.scrollTo({ top: LV.capa.scrollTop + r.top - alto * .35, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}
function decir() {
  if (!LV) return;
  const e = LV.els[LV.i];
  if (!e) return terminar();
  LV.pausa = false; pintarPlayer(); resaltar();
  const g = lvGen, c = vozCfg(), v = vozElegida(), vel = VELS[c.vel][1];
  const pausa = e.classList.contains('h') ? 750 : e.nextElementSibling ? 280 : 600;
  const texto = vozLimpia(e.textContent) || '…', u = new SpeechSynthesisUtterance(texto);
  u.lang = v ? v.lang : 'es-ES'; if (v) u.voice = v; u.rate = vel;
  // Vigilante: a veces el navegador se traga una frase sin avisar. Si no arranca, se reintenta una vez;
  // si arranca pero no avisa de que ha acabado, se pasa a la siguiente cuando ya debería haber terminado.
  let empezo = false;
  u.onstart = () => { empezo = true; if (LV) LV.reint = false; };
  LV.vigia = setTimeout(() => { if (g !== lvGen || !LV || empezo) return; cortarVoz(); if (!LV.reint) { LV.reint = true; return decir(); } LV.reint = false; LV.i++; decir(); }, 2500);
  LV.vigia2 = setTimeout(() => { if (g !== lvGen || !LV) return; cortarVoz(); LV.i++; decir(); }, 5000 + palabras(texto) / (2.2 * vel) * 2000);
  u.onend = () => { if (g !== lvGen || !LV) return; clearTimeout(LV.vigia); clearTimeout(LV.vigia2); LV.i++; LV.timer = setTimeout(decir, pausa / vel); };
  u.onerror = ev => { if (g !== lvGen || !LV || ev.error === 'interrupted' || ev.error === 'canceled') return; clearTimeout(LV.vigia); clearTimeout(LV.vigia2); LV.i++; LV.timer = setTimeout(decir, 150); };
  LV.u = u; // si no se guarda, algunos navegadores lo liberan y nunca avisan de que ha acabado
  speechSynthesis.speak(u);
}
function terminar() {
  const L = leidas(); if (!L[LV.id]) { L[LV.id] = new Date().toISOString(); store(K.leidas, L); }
  LV.fin = true; LV.els.forEach(e => e.classList.remove('on'));
  const sig = siguienteId();
  if (!sig) { pintarPlayer(); pantallaEncendida(false); return; }
  LV.seg = 5; pintarPlayer();
  LV.cuenta = setInterval(() => { if (!LV) return; LV.seg--; pintarPlayer(); if (LV.seg <= 0) { clearInterval(LV.cuenta); pasarA(sig); } }, 1000);
}
function pasarA(id) {
  const ids = LV ? LV.ids : [];
  estParar(); cerrarCapa();
  abrirLectura(id, ids, true);
}
function accionPlayer(a) {
  if (!LV) return;
  if (a === 'stop') return estParar();
  if (LV.fin) { if (a === 'play') { clearInterval(LV.cuenta); const s = siguienteId(); if (s) pasarA(s); } return; }
  if (a === 'play') {
    if (LV.pausa) { pantallaEncendida(true); return decir(); }
    cortarVoz(); LV.pausa = true; pantallaEncendida(false); pintarPlayer();
    const b = LV.capa.querySelector('[data-escuchar]'); if (b) b.innerHTML = ic('play') + 'Seguir';
    return;
  }
  if (a === 'prev' || a === 'next') { cortarVoz(); LV.i = Math.max(0, Math.min(LV.els.length - 1, LV.i + (a === 'next' ? 1 : -1))); LV.toque = 0; return LV.pausa ? (pintarPlayer(), resaltar()) : decir(); }
  if (a === 'vel') { const c = vozCfg(); c.vel = (c.vel + 1) % VELS.length; store(KE.voz, c); cortarVoz(); return LV.pausa ? pintarPlayer() : decir(); }
}
// El botón «Escuchar» de la lectura: empieza, pausa o sigue.
function estBoton(o) {
  if (!('speechSynthesis' in window)) return toast('Este navegador no puede leer en voz alta');
  if (LV && LV.capa === o) { if (LV.fin) return estParar(); accionPlayer('play'); const b = o.querySelector('[data-escuchar]'); if (b) b.innerHTML = ic(LV.pausa ? 'play' : 'pausa') + (LV.pausa ? 'Seguir' : 'Pausar'); return; }
  estLeer(o, 0);
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-pl]'); if (b) return accionPlayer(b.dataset.pl);
  const f = e.target.closest('.capa.leyendo .lect .fr');
  if (f && LV && !LV.fin) { cortarVoz(); LV.i = LV.els.indexOf(f); LV.toque = 0; LV.pausa = false; return decir(); }
});
['touchmove', 'wheel'].forEach(t => document.addEventListener(t, () => { if (LV) LV.toque = Date.now(); }, { passive: true }));

// Ajustes → lectura en voz alta: elegir voz y probarla.
function abrirVoces() {
  const pinta = () => {
    const l = vocesES(), c = vozCfg(), sel = vozElegida();
    return `<h2>Lectura en voz alta</h2><p class="p">La voz y la velocidad con las que se leen las lecturas.</p>
      <p class="eti">Velocidad</p><div class="chips" style="margin-top:0">${VELS.map(([n], k) => `<button data-vel="${k}" class="${k === c.vel ? 'on' : ''}">${n}</button>`).join('')}</div>
      <p class="eti">Voz</p>
      ${l.length ? `<div class="lista">${l.map(v => `<button class="row" data-voz="${esc(v.name)}"><span class="marca ${sel && v.name === sel.name ? 'ok' : ''}">${sel && v.name === sel.name ? ic('check') : ''}</span><span class="tx"><b>${esc(nombreVoz(v))}</b><small>${/^es[-_]ES/i.test(v.lang) ? 'España' : 'Acento latinoamericano'}${/premium|enhanced|mejorad|natural|neural|online/i.test(v.name) ? ' · alta calidad' : ''}</small></span><span class="pl-mini">${ic('play')}</span></button>`).join('')}</div>`
        : '<div class="card"><p class="vacio">Este navegador no tiene voces en español. Prueba en Safari (iPhone) o en Chrome.</p></div>'}
      <div class="card"><h3>Para una voz más natural en el iPhone</h3><p class="sub">Ajustes del iPhone → Accesibilidad → Contenido leído → Voces → Español (España). Descarga una voz «mejorada» o «Premium» (por ejemplo, Mónica) y vuelve aquí a elegirla.</p></div>`;
  };
  capa(pinta, (e, o) => {
    const v = e.target.closest('[data-vel]');
    if (v) { const c = vozCfg(); c.vel = +v.dataset.vel; store(KE.voz, c); o.repintar(); return probarVoz(); }
    const b = e.target.closest('[data-voz]');
    if (b) { const c = vozCfg(); c.voz = b.dataset.voz; store(KE.voz, c); o.repintar(); probarVoz(); }
  }, 'Ajustes');
}
function probarVoz() {
  try { speechSynthesis.cancel(); } catch (e) {}
  const v = vozElegida(), u = new SpeechSynthesisUtterance('Hola. Así sonarán tus lecturas. Despacio y con calma.');
  u.lang = v ? v.lang : 'es-ES'; if (v) u.voice = v; u.rate = VELS[vozCfg().vel][1]; speechSynthesis.speak(u);
}

// ---------- Llevar a NotebookLM o a Claude ----------
function apartados() {
  return secciones().concat(_LECC.length ? [{ k: 'lecciones', n: 'Para entenderte', s: 'Lecciones sobre la ansiedad social y cómo funcionas', b: [[null, _LECC]], total: _LECC.length }] : []);
}
const lista = v => (Array.isArray(v) ? v : [v]).filter(Boolean);
function textoLectura(x) {
  const P = [`### ${x.titulo}`];
  if (x.sub) P.push(`_${x.sub}_`);
  const bl = (h, c) => { const l = lista(c); if (!l.length) return; P.push((h ? `**${h}**\n` : '') + (l.length > 1 ? l.map(t => '- ' + t).join('\n') : l[0])); };
  if (x.secciones) x.secciones.forEach(([h, c]) => bl(h, c));
  else if (x.tarjetas) x.tarjetas.forEach(([h, c]) => bl(h, c));
  else {
    bl('Qué pasa', x.pasa); bl(x.hacerTitulo || 'Qué hacer', x.hacer); bl('Dilo así', x.ejemplos);
    (x.extra || []).forEach(([h, c]) => bl(h, c));
    bl('Si no sale como esperabas', x.sale); if (x.practica) P.push(`**Para practicar:** ${x.practica}.`); if (x.cierre) P.push(x.cierre);
  }
  return P.join('\n\n');
}
const CABECERA = 'Material de estudio de Cimientos: seguridad en uno mismo, hablar con gente, ligar y relaciones. En español de España.';
function textoApartado(s) {
  return `# Cimientos · ${s.n}\n\n${CABECERA}\n${s.s}. ${s.total} lecturas.\n\n` + s.b.map(([n, l]) => (n ? `## ${n}\n\n` : '') + l.map(textoLectura).join('\n\n')).join('\n\n') + '\n';
}
function apartadoSemana() {
  const p = plan(), w = semana(); if (!w) return null;
  const docs = w.docs.map(porId).filter(Boolean);
  return { k: 'semana', n: `Semana ${p.sem + 1} - ${w.t}`, s: w.foco.replace(/\.$/, ''), total: docs.length,
    texto: `# Cimientos · Semana ${p.sem + 1} de ${_PLAN.length}: ${w.t}\n\n${CABECERA}\n\n**El foco:** ${w.foco}\n\n**El reto de la semana:** ${w.reto}\n\n**La creencia que voy a poner a prueba:** ${w.exp}\n\n## Las lecturas\n\n${docs.map(textoLectura).join('\n\n')}\n` };
}
const textoDe = s => s.texto || textoApartado(s);
const archivo = s => new File([textoDe(s)], 'Cimientos - ' + s.n.replace(/[^\p{L}\p{N} ,()-]/gu, '').replace(/\s+/g, ' ').trim() + '.txt', { type: 'text/plain' });
const esMovil = () => matchMedia('(pointer: coarse)').matches;
const puedeCompartir = files => !!(navigator.canShare && esMovil() && navigator.canShare({ files }));
async function copiar(t, aviso) {
  try { await navigator.clipboard.writeText(t); toast(aviso || 'Copiado'); return true; }
  catch (e) { toast('No he podido copiar. Prueba con «Guardar archivo».'); return false; }
}
function bajar(f) {
  const a = document.createElement('a'); a.href = URL.createObjectURL(f); a.download = f.name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 3000);
}
// En el móvil abre el menú de compartir (NotebookLM, Claude, Archivos…); en el ordenador descarga.
async function guardarArchivos(lista) {
  const files = lista.map(archivo);
  if (puedeCompartir(files)) { try { await navigator.share({ files }); } catch (e) {} return; }
  files.forEach((f, k) => setTimeout(() => bajar(f), k * 400));
  toast(files.length > 1 ? `Descargando ${files.length} archivos` : 'Descargado: ' + files[0].name);
}

const INSTR_CLAUDE = 'Eres mi entrenador para ganar seguridad, hablar con gente y ligar. Usa los documentos de este proyecto como base y avísame cuando algo no esté en ellos. Respóndeme en español de España, corto y claro, con frases concretas que pueda decir. Sé sincero aunque no me guste. Cuando practiquemos una situación, haz de la otra persona de forma realista (ni demasiado fácil ni cruel) y al final dime qué hice bien y una sola cosa que mejorar. Acaba siempre con una práctica pequeña para esta semana.';
const INSTR_AUDIO = 'Hazlo en español de España. Explícalo para alguien que empieza desde cero y se pone nervioso al hablar con gente nueva. Usa ejemplos de la vida diaria (un bar, el trabajo, el gimnasio, una app de citas) y termina con un reto pequeño para esta semana.';
function pedidos() {
  const w = semana();
  return [
    ['NotebookLM', 'Test para comprobar lo que sabes', 'Hazme un test de 8 preguntas sobre estas fuentes, de una en una. Espera mi respuesta y corrígeme explicando por qué.'],
    ['NotebookLM', 'Lo esencial en una página', 'Resume las 10 ideas más útiles de estas fuentes, cada una con un ejemplo de cómo aplicarla esta semana.'],
    w ? ['Claude', 'Prepara el reto de esta semana', `Esta semana trabajo «${w.t}». Mi reto: ${retoTexto()} Ayúdame a prepararlo: dónde hacerlo, qué decir exactamente y qué hago si sale regular.`] : null,
    ['Claude', 'Ensaya una conversación', 'Vamos a ensayar. Haz de la otra persona en esta situación: [escribe dónde estás y con quién]. Empieza tú. Cuando escriba «para», dime qué hice bien y qué cambiarías.'],
    ['Claude', 'Aplícalo a algo tuyo', 'He leído «[título de la lectura]». Explícame cómo se aplica a esto que me pasó: [cuéntalo].'],
    ['Claude', 'Revisa un mensaje antes de enviarlo', 'Revisa este mensaje antes de que lo envíe. Dime si suena natural y dame una versión mejor, igual de corta: [pega el mensaje].']
  ].filter(Boolean);
}
function abrirEstudio(foco) {
  const aps = apartados(), sem = apartadoSemana(), todos = aps.reduce((a, s) => a + s.total, 0);
  const minLect = s => Math.max(1, Math.round(palabras(textoDe(s)) / 200));
  const filaAp = s => `<div class="row exp${s.k === foco ? ' foco' : ''}"><span class="tx"><b>${esc(s.n)}</b><small>${s.total} ${s.total === 1 ? 'lectura' : 'lecturas'} · ${minLect(s)} min de lectura</small></span>
    <button class="ibtn" data-cp="${s.k}" aria-label="Copiar «${esc(s.n)}»">${ic('copiar')}</button><button class="ibtn" data-ar="${s.k}" aria-label="${esMovil() ? 'Compartir' : 'Descargar'} «${esc(s.n)}»">${ic(esMovil() ? 'compartir' : 'descargar')}</button></div>`;
  const o = capa(`<h2>Estudiar con NotebookLM y Claude</h2>
    <p class="p">Pasa lo que quieras de la biblioteca a NotebookLM o a Claude y estúdialo allí: preguntas, resúmenes, tests y un pódcast para escuchar paseando.</p>

    <div class="metodo">
      <p class="met-t">Cómo lo haría yo</p>
      <div class="met-p"><b>1</b><div><h3>Una vez: monta tu cuaderno</h3><p>En NotebookLM crea un cuaderno llamado «Cimientos» y súbele los ${aps.length} apartados (${todos} lecturas). Así puedes preguntarle cualquier cosa de todo lo que hay.</p>
        <button class="btn prim" data-todos>${ic(esMovil() ? 'compartir' : 'descargar')}Guardar los ${aps.length} archivos</button></div></div>
      ${sem ? `<div class="met-p"><b>2</b><div><h3>Cada lunes: el pódcast de tu semana</h3><p>Sube el archivo de la semana ${plan().sem + 1} («${esc(semana().t)}») y pulsa «Resumen de audio». Con «Personalizar» puedes pegarle esto para que hable para ti.</p>
        <div class="fila"><button class="btn" data-sem>${ic(esMovil() ? 'compartir' : 'descargar')}Archivo de esta semana</button><button class="btn" data-copia="audio">${ic('copiar')}Copiar «Personalizar»</button></div></div></div>` : ''}
      <div class="met-p"><b>${sem ? 3 : 2}</b><div><h3>Para practicar: Claude</h3><p>En Claude crea un proyecto «Cimientos», sube los mismos archivos y pega estas instrucciones. NotebookLM te explica lo que pone; Claude te ayuda a ensayar y a aplicarlo a lo tuyo.</p>
        <button class="btn" data-copia="claude">${ic('copiar')}Copiar instrucciones del proyecto</button></div></div>
    </div>

    <p class="eti">Qué pedirles · toca para copiar</p>
    <div class="lista">${pedidos().map(([d, t, txt], k) => `<button class="row pedido" data-pedido="${k}"><span class="tx"><small class="donde">${d}</small><b>${esc(t)}</b><small>${esc(txt)}</small></span>${ic('copiar')}</button>`).join('')}</div>

    <p class="eti">Apartados uno a uno</p>
    <div class="lista">${aps.map(filaAp).join('')}</div>

    <div class="grid2" style="margin-top:16px"><a class="btn" href="https://notebooklm.google.com/" target="_blank" rel="noopener">${ic('libro')}Abrir NotebookLM</a><a class="btn" href="https://claude.ai/projects" target="_blank" rel="noopener">${ic('chat')}Abrir Claude</a></div>
    <p class="nota" style="margin-top:12px">${ic('candado')} Solo sale el contenido de la app. Lo que cuentas, tus retos y tu manual se quedan aquí.</p>
    <details class="mas" style="margin-top:12px"><summary>Si NotebookLM no aparece al compartir</summary>
      <p>Usa el botón de copiar. En NotebookLM: Añadir fuente → Texto copiado, y pega.</p>
      <p>Si el pódcast te sale en inglés: en NotebookLM, Ajustes → Idioma de salida → Español.</p>
      <p>En la versión gratuita, un cuaderno admite 50 fuentes: caben todos los apartados por separado.</p></details>`,
  async (e, o) => {
    const t = e.target;
    if (t.closest('[data-todos]')) return guardarArchivos(aps);
    if (t.closest('[data-sem]')) return guardarArchivos([sem]);
    const c = t.closest('[data-copia]'); if (c) return copiar(c.dataset.copia === 'audio' ? INSTR_AUDIO : INSTR_CLAUDE, c.dataset.copia === 'audio' ? 'Copiado. Pégalo en «Personalizar» del resumen de audio' : 'Copiado. Pégalo en las instrucciones del proyecto');
    const p = t.closest('[data-pedido]'); if (p) { const x = pedidos()[+p.dataset.pedido]; return copiar(x[2], 'Copiado. Pégalo en ' + x[0]); }
    const cp = t.closest('[data-cp]'); if (cp) { const s = aps.find(x => x.k === cp.dataset.cp); return copiar(textoDe(s), 'Copiado «' + s.n + '». En NotebookLM: Añadir fuente → Texto copiado'); }
    const ar = t.closest('[data-ar]'); if (ar) return guardarArchivos([aps.find(x => x.k === ar.dataset.ar)]);
  }, 'Aprender');
  if (foco) setTimeout(() => { const f = o.querySelector('.exp.foco'); if (f) f.scrollIntoView({ block: 'center' }); }, 250);
}
