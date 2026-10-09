/* Cimientos. Todo vive en localStorage, en este dispositivo: nada se envía a ningún sitio. */
'use strict';
const K = {
  diario: 'cimientosDiario',
  retos: 'cimientosRetosCompletados',
  planes: 'cimientosRetosPlanes',
  propios: 'cimientosRetosPropios',
  foco: 'cimientosFoco',
  terapia: 'cimientosTerapia',
  lecciones: 'cimientosLeccionesCompletadas',
  salidas: 'cimientosSalidas',
  perfil: 'cimientosPerfil',
  yo: 'cimientosYo',
  carta: 'cimientosCarta',
  favs: 'cimientosFavs',
  notas: 'cimientosNotas',
  semana: 'cimientosSemana',
  frases: 'cimientosFrases',
  mias: 'cimientosMias',
  borradores: 'cimientosBorradores',
  bajon: 'cimientosBajon',
  ficha: 'cimientosFicha',
  sim: 'cimientosSim',
  exp: 'cimientosExp',
  escenas: 'cimientosEscenas',
  ven: 'cimientosVen',
  pruebas: 'cimientosPruebas',
  creencia: 'cimientosCreencia',
  plan8: 'cimientosPlan8',
  pin: 'cimientosPin'
};
const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
const store = (k, v) => { const old = load(k, null); try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} if (typeof CS !== 'undefined') CS.touch(k, old, v); };
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = id => document.getElementById(id);
const dayKey = d => { const x = new Date(d); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
const hoyKey = () => dayKey(Date.now());
const fCorta = iso => new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
const fLarga = d => { const s = new Date(d).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }); return s.charAt(0).toUpperCase() + s.slice(1); };
const uid = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

const NIVELES = [['Nada', 1], ['Poca', 3], ['Algo', 5], ['Bastante', 7], ['Mucha', 9]];
const TIPOS = { checkin: 'Check-in', victoria: 'Victoria', dificil: 'Difícil', patron: 'Patrón', pensamiento: 'Pensamiento' };

// ---------- datos ----------
const diario = () => { const l = load(K.diario, []); return Array.isArray(l) ? l : []; };
const retosHechos = () => load(K.retos, {}) || {};
const planes = () => load(K.planes, {}) || {};
const propios = () => load(K.propios, []) || [];
const terapia = () => load(K.terapia, []) || [];
const leidas = () => load(K.lecciones, {}) || {};
const salidas = () => { const l = load(K.salidas, []); return Array.isArray(l) ? l : []; };
const tipoPlan = id => PLAN_TIPOS.find(t => t.id === id) || PLAN_TIPOS[PLAN_TIPOS.length - 1];
// Planes ya pasados y sin cerrar (preguntamos «¿qué tal fue?») y el próximo plan.
const planPendiente = () => salidas().filter(x => !x.fin && x.cuando < hoyKey()).sort((a, b) => a.cuando < b.cuando ? -1 : 1)[0];
const planProximo = () => salidas().filter(x => !x.fin && x.cuando >= hoyKey()).sort((a, b) => a.cuando < b.cuando ? -1 : 1)[0];
const cuandoTxt = d => d === hoyKey() ? 'hoy' : d === dayKey(Date.now() + 864e5) ? 'mañana' : new Date(d + 'T12:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' });
const allRetos = () => RETOS_BASE.concat(propios().map(r => Object.assign({ etapa: 'propio' }, r)));
// Cada reto hecho guarda sus veces; los antiguos (de la primera versión) cuentan como una vez sin números.
const veces = id => { const h = retosHechos()[id]; if (!h) return []; return Array.isArray(h.veces) && h.veces.length ? h.veces : [{ fecha: h.fecha, nota: h.nota || '' }]; };
const conNumeros = () => allRetos().flatMap(r => veces(r.id).filter(v => v.antes != null && v.despues != null).map(v => Object.assign({ r }, v)))
  .concat(salidas().filter(x => x.fin && x.fue && x.antes != null && x.despues != null).map(x => ({ r: { titulo: tipoPlan(x.tipo).titulo }, fecha: x.fin, antes: x.antes, despues: x.despues })))
  .sort((a, b) => a.fecha < b.fecha ? 1 : -1);

// ---------- avisos ----------
function toast(txt, undo) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status');
  t.innerHTML = `<span>${esc(txt)}</span>${undo ? '<button>Deshacer</button>' : ''}`;
  document.body.appendChild(t);
  if (undo) t.querySelector('button').onclick = () => { t.remove(); undo(); };
  setTimeout(() => t.remove(), undo ? 6000 : 3500);
}

// ---------- piezas ----------
const scaleHTML = (name, val, from, to, ends) => `<div class="scale" style="grid-template-columns:repeat(${to - from + 1},1fr)">${Array.from({ length: to - from + 1 }, (_, i) => i + from).map(n => `<button type="button" data-scale="${name}" data-v="${n}" class="${val === n ? 'on' : ''}" aria-label="${n}">${n}</button>`).join('')}</div>${ends ? `<div class="scale-ends"><span>${ends[0]}</span><span>${ends[1]}</span></div>` : ''}`;
function sheet(html, cls) {
  const v = document.createElement('div'); v.className = 'veil';
  v.innerHTML = `<div class="sheet ${cls || ''}" role="dialog"><div class="grab"></div>${html}</div>`;
  document.body.appendChild(v);
  v.addEventListener('click', e => { if (e.target === v || e.target.closest('[data-close]')) { vozParar(); v.remove(); if (tab === 'aprender') { const y = scrollY; render(); scrollTo(0, y); } } });
  return v;
}

// ---------- estado de la pantalla ----------
let tab = 'hoy';
const ui = { nivel: null, cknota: '', tipo: 'checkin', animo: null, ansiedad: null, filtro: 'todo', pens: {}, trampas: [] };

function render() {
  document.querySelectorAll('#tabnav button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  $('app').innerHTML = ({ hoy: vHoy, diario: vDiario, retos: vRetos, aprender: vAprender, progreso: vProgreso })[tab]();
}
function goTab(t) { tab = t; render(); scrollTo(0, 0); }

// ---------- HOY ----------
function saludo() { const h = new Date().getHours(); return h < 6 ? 'Buenas noches' : h < 14 ? 'Buenos días' : h < 21 ? 'Buenas tardes' : 'Buenas noches'; }
function fraseHoy() { const d = new Date(), n = d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate(); return FRASES[n % FRASES.length]; }
function retoAhora() {
  const all = allRetos(), f = load(K.foco, null), pl = planes();
  return all.find(r => r.id === f) || all.find(r => pl[r.id]) || all.find(r => !retosHechos()[r.id]) || null;
}
function vHoy() {
  const hoy = diario().filter(e => e.tipo === 'checkin' && dayKey(e.fecha) === hoyKey());
  const ult = hoy[0], r = retoAhora(), pl = r && planes()[r.id];
  const ter = terapia().filter(t => !t.hecho);
  const sinLeer = LECCIONES.find(l => !leidas()[l.id]);
  let ck;
  if (ult && !ui.otro) {
    const n = NIVELES.slice().reverse().find(x => ult.ansiedad != null && ult.ansiedad >= x[1]);
    ck = `<div class="done-today"><span class="big">${ult.ansiedad == null ? '📝' : ult.ansiedad <= 3 ? '🌿' : ult.ansiedad <= 6 ? '🌤️' : '🌊'}</span><div><b>${ult.ansiedad != null ? 'Ansiedad: ' + (n ? n[0].toLowerCase() : 'apuntada') : 'Apuntado'}</b><div class="small muted">${new Date(ult.fecha).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}${ult.texto ? ' · ' + esc(ult.texto.slice(0, 40)) : ''}</div></div></div>
      <div class="row-btns"><button class="pill" data-act="otro">Apuntar otro momento</button></div>`;
  } else {
    ck = `<div class="pills">${NIVELES.map(([n, v]) => `<button class="pill ${ui.nivel === v ? 'on' : ''}" data-nivel="${v}">${n}</button>`).join('')}</div>
      <input type="text" id="cknota" style="margin-top:12px" placeholder="Algo que quieras apuntar (si quieres)" autocomplete="off" enterkeyhint="done" value="${esc(ui.cknota || '')}">
      <div class="row-btns"><button class="btn" data-act="checkin" ${ui.nivel == null ? 'disabled style="opacity:.45"' : ''}>Guardar</button>${ui.otro ? '<button class="btn ghost" data-act="nootro">Cancelar</button>' : ''}</div>`;
  }
  return `<section class="hero"><small>${fLarga(Date.now())}</small><h1>${saludo()}</h1><p class="frase">${esc(fraseHoy())}</p></section>
    ${bajonAyerHTML()}
    <button class="sos ahora-b" data-act="ahora"><span class="ic">📍</span><span><b>Estoy fuera ahora</b><small>En un bar, de fiesta, donde sea: qué hacer en este momento</small></span><span class="go">›</span></button>
    <button class="sos bajon-b" data-act="bajon"><span class="ic">🌧️</span><span><b>He bebido y me ha dado el bajón</b><small>Letra grande y pocos pasos, para esa noche</small></span><span class="go">›</span></button>
    <button class="sos salir" data-act="salir"><span class="ic">🚪</span><span><b>Voy a salir ya</b><small>30 segundos antes de entrar: objetivo, tus frases y respirar</small></span><span class="go">›</span></button>
    <button class="sos" data-act="sos"><span class="ic">🌊</span><span><b>Un momento difícil</b><small>Respirar, aterrizar y recordar lo importante</small></span><span class="go">›</span></button>
    ${load(K.pin, null) ? '' : '<button class="sos plan" data-act="pinset"><span class="ic">🔒</span><span><b>Pon un PIN</b><small>Para que nadie más pueda abrir Cimientos</small></span><span class="go">›</span></button>'}
    ${fichaHTML()}
    ${plan8HTML()}
    ${equilibrioHTML()}
    ${semanaHTML()}
    ${planHoyHTML()}
    ${(load(K.perfil, []) || []).length ? '' : `<div class="card consejo"><span class="small muted">🎯 Hazlo tuyo</span><p>Hasta que elijas lo que va contigo, los consejos son generales. Con un minuto, se adaptan a ti.</p><div class="row-btns" style="margin-top:8px"><button class="pill" data-act="parati">Elegir lo que va conmigo</button></div></div>`}
    ${consejoHoy() ? `<div class="card consejo"><span class="small muted">✨ Un consejo para ti</span><p>${esc(consejoHoy())}</p></div>` : ''}
    ${(() => { const all = GUIA.flatMap(g => g.items), pend = all.filter(x => !leidas()[x.id]), pool = pend.length ? pend : all, d = new Date(), g = pool[(d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate()) % pool.length]; return `<p class="sec-h">Situación del día</p><button class="lec" data-guia="${g.id}"><span class="ic">💬</span><span class="b"><b>${esc(g.titulo)}</b><small>${esc(g.pasa.split('. ')[0])}.</small></span><span class="go">›</span></button>`; })()}
    ${tipHoyHTML()}
    <div class="card"><h2>¿Cuánta ansiedad tienes ahora?</h2><p class="sub">Un toque basta. Tu ánimo del día lo marcas en Mi Espacio; aquí solo la ansiedad.</p>${ck}</div>
    ${r ? `<div class="card"><h2>Tu reto de ahora</h2><p class="sub">${pl ? 'Lo tienes preparado.' : 'Sin prisa. Cuando te veas con ganas.'}</p>
      <button class="reto ${pl ? 'plan' : ''} foco" data-reto="${r.id}" style="margin:0"><span class="chk">${retosHechos()[r.id] ? '✓' : ''}</span><span class="b"><b>${esc(r.titulo)}</b><small>${esc(r.descripcion || '')}</small>${pl && pl.antes != null ? `<span class="meta"><span class="tag warm">Crees que te dará ${pl.antes} de 10 de miedo</span></span>` : ''}</span></button>
      <div class="row-btns"><button class="pill" data-act="otroreto">Otro reto</button></div></div>` : ''}
    <div class="card"><h2>Para la próxima sesión</h2><p class="sub">Lo que quieras llevar a terapia, para no olvidarlo.</p>
      ${ter.slice(0, 4).map(t => `<div class="lrow"><span class="b"><b style="font-weight:500">${esc(t.texto)}</b><small>${fCorta(t.fecha)}</small></span><button class="pill" data-ter="${t.id}">Hablado</button></div>`).join('')}
      ${ter.length > 4 ? `<p class="small muted">Y ${ter.length - 4} más en tu diario.</p>` : ''}
      <form data-form="terapia" style="display:flex;gap:8px;margin-top:10px"><input type="text" name="t" placeholder="Algo que quieras contar o preguntar…" autocomplete="off" enterkeyhint="done"><button class="btn" style="flex:none">Añadir</button></form></div>
    ${sinLeer ? `<p class="sec-h">Para leer con calma</p><button class="lec" data-lec="${sinLeer.id}"><span class="ic">${sinLeer.icono}</span><span class="b"><b>${esc(sinLeer.titulo)}</b><small>${esc(sinLeer.sub)} · ${sinLeer.tarjetas.length} tarjetas</small></span><span class="go">›</span></button>` : ''}`;
}

// ---------- TENGO UN PLAN ----------
function tipHoyHTML() {
  const d = new Date(), t = TIPS[(d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate() * 7 + (ui.tipOff || 0)) % TIPS.length];
  return `<div class="card consejo"><span class="small muted">💡 Tip del día · ${esc(t[0])}</span><p>${esc(t[1])}</p><div class="row-btns" style="margin-top:8px"><button class="pill" data-act="otrotip">Otro tip</button><button class="pill" data-act="tips">Ver todos</button></div></div>`;
}
function planHoyHTML() {
  const p = planPendiente(), n = planProximo();
  if (p) { const t = tipoPlan(p.tipo); return `<button class="sos plan" data-plancierre="${p.id}"><span class="ic">${t.icono}</span><span><b>¿Qué tal fue?</b><small>${esc(t.titulo)}${p.cuando === dayKey(Date.now() - 864e5) ? ' de ayer' : ', ' + cuandoTxt(p.cuando)}. Dos toques.</small></span><span class="go">›</span></button>`; }
  if (n) { const t = tipoPlan(n.tipo); return `<button class="sos plan" data-planver="${n.id}"><span class="ic">${t.icono}</span><span><b>${esc(t.titulo)}</b><small>Tu plan es ${cuandoTxt(n.cuando)}. Toca para repasar la guía.</small></span><span class="go">›</span></button>`; }
  return `<button class="sos plan" data-act="plan"><span class="ic">🗓️</span><span><b>Tengo un plan</b><small>Fiesta, quedada, una cita… Qué saber y cómo ir preparado</small></span><span class="go">›</span></button>`;
}
const listaHTML = c => Array.isArray(c) ? `<ul class="gl">${c.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : `<p>${esc(c)}</p>`;
function openPlan(existente) {
  const prev = existente ? salidas().find(x => x.id === existente) : null;
  const st = { tipo: prev ? prev.tipo : null, cuando: prev ? prev.cuando : hoyKey(), antes: prev ? prev.antes : null, check: prev ? (prev.check || []).slice() : [] };
  const v = sheet('', 'guia');
  const paint = () => {
    const sh = v.querySelector('.sheet');
    if (!st.tipo) {
      sh.innerHTML = `<div class="grab"></div><h2>¿Qué plan tienes?</h2><p class="muted">Te enseño qué saber y cómo ir preparado.</p>
        ${PLAN_TIPOS.map(t => `<button class="lrow" data-ptipo="${t.id}"><span class="ic">${t.icono}</span><span class="b"><b>${esc(t.titulo)}</b></span><span class="go">›</span></button>`).join('')}
        <div class="acts"><button class="btn ghost" data-close>Cerrar</button></div>`;
      return;
    }
    const t = tipoPlan(st.tipo), m = dayKey(Date.now() + 864e5);
    sh.innerHTML = `<div class="grab"></div><span class="small muted">${t.icono} Tengo un plan</span><h2>${esc(t.titulo)}</h2>
      <h3 class="gh">Antes de cualquier plan</h3>${listaHTML(PLAN_GENERAL.antes)}
      ${t.secciones.map(([h, c]) => `<h3 class="gh">${esc(h)}</h3>${listaHTML(c)}`).join('')}
      <h3 class="gh">Al volver a casa</h3>${listaHTML(PLAN_GENERAL.despues)}
      <div class="plan-box">
        <h3 class="gh" style="margin-top:0">Para ir preparado</h3>
        <div class="checks">${PLAN_GENERAL.check.map((c, i) => `<button type="button" class="ck ${st.check.includes(i) ? 'on' : ''}" data-pck="${i}"><span>${st.check.includes(i) ? '✓' : ''}</span>${esc(c)}</button>`).join('')}</div>
        <label class="f"><span>¿Cuándo es?</span><span class="pills">${[[hoyKey(), 'Hoy'], [m, 'Mañana']].map(([d, n]) => `<button type="button" class="pill ${st.cuando === d ? 'on' : ''}" data-pcuando="${d}">${n}</button>`).join('')}<input type="date" id="pfecha" value="${st.cuando}" min="${hoyKey()}" class="pdate"></span></label>
        <label class="f"><span>¿Cuánto miedo crees que te dará?</span>${scaleHTML('pantes', st.antes, 0, 10, ['Nada', 'Muchísimo'])}</label>
      </div>
      <div class="acts"><button class="btn soft" data-pcalma>🌊 Calma ahora</button><span class="sp"></span><button class="btn" data-pguardar>${prev ? 'Guardar' : 'Guardar mi plan'}</button></div>
      ${prev ? '<div class="row-btns"><button class="pill" data-pborrar>Ya no hay plan</button></div>' : `<div class="row-btns"><button class="pill" data-ptipo="">Cambiar de plan</button></div>`}`;
  };
  paint();
  v.addEventListener('click', e => {
    let x;
    if ((x = e.target.closest('[data-ptipo]'))) { st.tipo = x.dataset.ptipo || null; v.querySelector('.sheet').scrollTop = 0; return paint(); }
    if ((x = e.target.closest('[data-pck]'))) { const i = +x.dataset.pck; st.check = st.check.includes(i) ? st.check.filter(z => z !== i) : st.check.concat(i); const y = v.querySelector('.sheet').scrollTop; paint(); v.querySelector('.sheet').scrollTop = y; return; }
    if ((x = e.target.closest('[data-pcuando]'))) { st.cuando = x.dataset.pcuando; const y = v.querySelector('.sheet').scrollTop; paint(); v.querySelector('.sheet').scrollTop = y; return; }
    if ((x = e.target.closest('[data-scale="pantes"]'))) { st.antes = +x.dataset.v; const y = v.querySelector('.sheet').scrollTop; paint(); v.querySelector('.sheet').scrollTop = y; return; }
    if (e.target.closest('[data-pcalma]')) return openSOS();
    if (e.target.closest('[data-pborrar]')) { store(K.salidas, salidas().filter(z => z.id !== existente)); v.remove(); render(); return toast('Quitado. No pasa nada.'); }
    if (e.target.closest('[data-pguardar]')) {
      const l = salidas(), o = { id: prev ? prev.id : uid('s'), tipo: st.tipo, cuando: st.cuando, antes: st.antes, check: st.check, creado: prev ? prev.creado : new Date().toISOString() };
      store(K.salidas, prev ? l.map(z => z.id === o.id ? Object.assign({}, z, o) : z) : l.concat(o));
      v.remove(); render(); toast(prev ? 'Guardado' : 'Apuntado. Al día siguiente te pregunto qué tal fue.');
    }
  });
  v.addEventListener('change', e => { if (e.target.id === 'pfecha' && e.target.value) { st.cuando = e.target.value; const y = v.querySelector('.sheet').scrollTop; paint(); v.querySelector('.sheet').scrollTop = y; } });
}
function openPlanCierre(id) {
  const p = salidas().find(x => x.id === id); if (!p) return;
  const t = tipoPlan(p.tipo), st = { fue: null, despues: null };
  const v = sheet('');
  const paint = () => {
    v.querySelector('.sheet').innerHTML = `<div class="grab"></div><span class="small muted">${t.icono} ${esc(t.titulo)} · ${cuandoTxt(p.cuando)}</span><h2>¿Qué tal fue?</h2>
      <label class="f"><span>¿Fuiste?</span><span class="pills"><button type="button" class="pill ${st.fue === true ? 'on' : ''}" data-pfue="1">Sí, fui</button><button type="button" class="pill ${st.fue === false ? 'on' : ''}" data-pfue="0">Al final no</button></span></label>
      ${st.fue === true ? `<label class="f"><span>¿Cuánto miedo hubo de verdad?</span>${p.antes != null ? `<small>Antes creías que ${p.antes} de 10.</small>` : ''}${scaleHTML('pdesp', st.despues, 0, 10, ['Nada', 'Muchísimo'])}</label>
        <label class="f"><span>Una cosa que salió bien</span><input type="text" id="pbien" placeholder="Aunque sea pequeña" autocomplete="off"></label>
        <label class="f"><span>Algo que quieras probar la próxima vez (si quieres)</span><input type="text" id="pprox" autocomplete="off"></label>` : ''}
      ${st.fue === false ? '<p class="quiet" style="margin-top:12px">No pasa nada. A veces no se puede, o no es el día. Que lo hayas pensado ya es un paso. Habrá más planes.</p>' : ''}
      <div class="acts"><button class="btn ghost" data-close>Ahora no</button><span class="sp"></span>${st.fue != null ? '<button class="btn" data-pfin>Guardar</button>' : ''}</div>`;
  };
  paint();
  v.addEventListener('click', e => {
    let x;
    const keep = () => { const a = v.querySelector('#pbien'), b = v.querySelector('#pprox'); return [a && a.value, b && b.value]; };
    const put = k => { if (k[0] != null && v.querySelector('#pbien')) v.querySelector('#pbien').value = k[0]; if (k[1] != null && v.querySelector('#pprox')) v.querySelector('#pprox').value = k[1]; };
    if ((x = e.target.closest('[data-pfue]'))) { const k = keep(); st.fue = x.dataset.pfue === '1'; paint(); put(k); return; }
    if ((x = e.target.closest('[data-scale="pdesp"]'))) { const k = keep(); st.despues = +x.dataset.v; paint(); put(k); return; }
    if (e.target.closest('[data-pfin]')) {
      const bien = (v.querySelector('#pbien') || {}).value || '', prox = (v.querySelector('#pprox') || {}).value || '';
      const fin = new Date().toISOString();
      store(K.salidas, salidas().map(z => z.id === id ? Object.assign({}, z, { fin, fue: st.fue, despues: st.despues, bien: bien.trim(), prox: prox.trim() }) : z));
      if (st.fue) {
        const texto = [t.titulo + '.', bien.trim() ? 'Salió bien: ' + bien.trim() : '', prox.trim() ? 'Para la próxima: ' + prox.trim() : ''].filter(Boolean).join(' ');
        store(K.diario, [{ id: uid('d'), fecha: fin, tipo: 'victoria', animo: null, ansiedad: null, texto }].concat(diario()));
      }
      v.remove(); render();
      toast(!st.fue ? 'Apuntado. Otra vez será.' : p.antes != null && st.despues != null ? (st.despues < p.antes ? `Fuiste. Temías ${p.antes} y fue ${st.despues}.` : `Fuiste, aunque daba miedo. Eso es lo que cuenta.`) : 'Fuiste. Apuntado como victoria.');
    }
  });
}

// ---------- DIARIO ----------
function vDiario() {
  const l = diario(), ter = new Set(terapia().filter(t => t.entrada && !t.hecho).map(t => t.entrada));
  const f = ui.filtro, list = l.filter(e => f === 'todo' || (f === 'terapia' ? ter.has(e.id) : e.tipo === f));
  const p = ui.pens;
  const form = ui.tipo === 'pensamiento' ? `
      <p class="small muted" style="margin:2px 0 0">Para mirar un pensamiento que te ha hecho daño, con un poco de distancia.</p>
      <label class="f"><span>¿Qué ha pasado?</span><textarea data-pens="situ" rows="2" placeholder="La situación, en pocas palabras">${esc(p.situ || '')}</textarea></label>
      <label class="f"><span>¿Qué pensaste?</span><textarea data-pens="pensado" rows="2" placeholder="«Seguro que piensa que soy raro»">${esc(p.pensado || '')}</textarea></label>
      <label class="f"><span>¿Cuánto te lo creías?</span>${scaleHTML('cree', p.cree, 0, 10, ['Nada', 'Del todo'])}</label>
      <label class="f"><span>¿Hay alguna trampa?</span><small>Toca las que veas. No hace falta acertar.</small><span class="pills">${TRAMPAS.map(([k, n]) => `<button type="button" class="pill ${ui.trampas.includes(k) ? 'on' : ''}" data-trampa="${k}">${n}</button>`).join('')}</span></label>
      <label class="f"><span>¿Qué le dirías a un amigo que pensara eso?</span><textarea data-pens="amigo" rows="3" placeholder="Con cariño, como se lo dirías a él">${esc(p.amigo || '')}</textarea></label>
      <label class="f"><span>Y ahora, ¿cuánto te lo crees?</span>${scaleHTML('ahora', p.ahora, 0, 10, ['Nada', 'Del todo'])}</label>`
    : `<p class="small muted" style="margin:14px 0 6px">Ansiedad (opcional)</p>${scaleHTML('ansiedad', ui.ansiedad, 1, 10)}
      <textarea id="txt" style="margin-top:12px" placeholder="${{ checkin: 'Lo que quieras dejar por escrito.', victoria: 'Algo que has hecho, por pequeño que sea.', dificil: 'Lo que ha pasado y cómo te has sentido.', patron: 'Algo que se repite y has notado.' }[ui.tipo]}">${esc(ui.txt || '')}</textarea>`;
  return `<div class="top"><h1>Diario</h1><p>Solo lo ves tú. Puede ser una palabra o una página.</p></div>
    <div class="card"><div class="pills scroll">${Object.entries(TIPOS).map(([k, n]) => `<button class="pill ${ui.tipo === k ? 'on' : ''}" data-tipo="${k}">${n}</button>`).join('')}</div>
      ${form}
      <div class="row-btns"><button class="btn" data-act="guardar">Guardar</button></div></div>
    <div class="pills scroll" style="margin:18px -16px 8px">${[['todo', 'Todo'], ['victoria', 'Victorias'], ['dificil', 'Difícil'], ['pensamiento', 'Pensamientos'], ['terapia', 'Para terapia']].map(([k, n]) => `<button class="pill ${f === k ? 'on' : ''}" data-filtro="${k}">${n}</button>`).join('')}</div>
    <div class="card">${list.length ? list.map(e => entradaHTML(e, ter.has(e.id))).join('') : `<p class="vacio">${l.length ? 'Nada con este filtro.' : 'Todavía no hay nada por aquí. Cuando quieras.'}</p>`}</div>`;
}
function entradaHTML(e, enTerapia) {
  const nums = [];
  if (e.animo != null) nums.push('Ánimo ' + e.animo + '/10');
  if (e.ansiedad != null) nums.push('Ansiedad ' + e.ansiedad + '/10');
  const p = e.pens;
  const tr = p && p.trampas && p.trampas.length ? TRAMPAS.filter(t => p.trampas.includes(t[0])).map(t => t[1]).join(', ') : '';
  return `<div class="entrada"><div class="meta"><span class="tipo">${TIPOS[e.tipo] || ''}</span><span class="fecha">${fCorta(e.fecha)}</span></div>
    ${nums.length ? `<div class="nums">${nums.join(' · ')}</div>` : ''}
    ${p ? `<div class="pens">${p.situ ? `<div><em>Lo que pasó</em>${esc(p.situ)}</div>` : ''}${p.pensado ? `<div><em>Lo que pensé${p.cree != null ? ` · me lo creía ${p.cree}/10` : ''}</em>${esc(p.pensado)}</div>` : ''}${tr ? `<div><em>Trampas</em>${esc(tr)}</div>` : ''}${p.amigo ? `<div><em>Lo que le diría a un amigo</em>${esc(p.amigo)}</div>` : ''}${p.ahora != null ? `<div><em>Ahora me lo creo</em>${p.ahora}/10</div>` : ''}</div>` : ''}
    ${e.texto ? `<div class="texto">${esc(e.texto)}</div>` : ''}
    <div class="acts"><button class="${enTerapia ? 'on' : ''}" data-aterapia="${e.id}">${enTerapia ? '✓ Para terapia' : 'Llevar a terapia'}</button><button data-borrar="${e.id}">Borrar</button></div></div>`;
}
function guardarEntrada() {
  const l = diario(), e = { id: uid('d'), fecha: new Date().toISOString(), tipo: ui.tipo, animo: null, ansiedad: null, texto: '' };
  if (ui.tipo === 'pensamiento') {
    const p = ui.pens; if (!p.situ && !p.pensado) return toast('Escribe al menos qué pasó o qué pensaste.');
    e.pens = Object.assign({}, p, { trampas: ui.trampas.slice() });
  } else {
    const t = ($('txt') || {}).value || ''; e.texto = t.trim(); e.animo = ui.animo; e.ansiedad = ui.ansiedad;
    if (!e.texto && e.animo == null && e.ansiedad == null) return toast('Escribe algo o marca un número.');
  }
  l.unshift(e); store(K.diario, l);
  ui.pens = {}; ui.trampas = []; ui.animo = ui.ansiedad = null; ui.txt = '';
  render();
  toast(e.tipo === 'pensamiento' && e.pens.cree != null && e.pens.ahora != null && e.pens.ahora < e.pens.cree ? `Guardado. Ha pasado de ${e.pens.cree} a ${e.pens.ahora}.` : 'Guardado en tu diario', () => { store(K.diario, diario().filter(x => x.id !== e.id)); render(); });
}

// ---------- RETOS ----------
function retoTags(r) {
  const v = veces(r.id), pl = planes()[r.id], last = v.filter(x => x.antes != null && x.despues != null).slice(-1)[0], t = [];
  if (v.length) t.push(`<span class="tag">${v.length === 1 ? 'Hecho' : 'Hecho ' + v.length + ' veces'}</span>`);
  if (last) t.push(`<span class="tag warm">Temías ${last.antes} · fue ${last.despues}</span>`);
  if (pl && !v.length) t.push('<span class="tag warm">Preparado</span>');
  return t.length ? `<span class="meta">${t.join('')}</span>` : '';
}
function retoHTML(r) {
  const h = !!retosHechos()[r.id], pl = !!planes()[r.id];
  return `<button class="reto ${h ? 'hecho' : pl ? 'plan' : ''}" data-reto="${r.id}"><span class="chk">${h ? '✓' : ''}</span><span class="b"><b>${esc(r.titulo)}</b>${r.descripcion ? `<small>${esc(r.descripcion)}</small>` : ''}${retoTags(r)}</span></button>`;
}
function vRetos() {
  const hechos = retosHechos();
  const grupos = ETAPAS.map((n, i) => [n, RETOS_BASE.filter(r => r.etapa === i)]);
  const pr = propios();
  return `<div class="top"><h1>Retos</h1><p>Muy pequeños y en orden. Sin rachas, sin puntos y sin prisa.</p></div>
    <div class="quiet">Antes de cada reto, apunta qué temes y cuánto miedo crees que te dará. Después, cuánto fue de verdad. Con el tiempo verás la diferencia.</div>
    ${grupos.map(([n, rs]) => `<div class="etapa"><h3>${esc(n)}</h3><span>${rs.filter(r => hechos[r.id]).length} de ${rs.length}</span></div>${rs.map(retoHTML).join('')}`).join('')}
    <div class="etapa"><h3>Tuyos</h3>${pr.length ? `<span>${pr.filter(r => hechos[r.id]).length} de ${pr.length}</span>` : ''}</div>
    ${pr.map(r => retoHTML(Object.assign({ etapa: 'propio' }, r))).join('')}
    <button class="btn soft full" data-act="nuevoreto">＋ Añadir un reto mío</button>
    <p class="quiet" style="margin-top:18px">No tienes que hacerlos todos ni en orden. Si uno te da demasiado miedo, prueba antes con uno más pequeño.</p>`;
}
function openReto(id) {
  const r = allRetos().find(x => x.id === id); if (!r) return;
  const st = { paso: 'antes', antes: null, despues: null, paso2: null };
  const pl = planes()[id]; if (pl) st.antes = pl.antes;
  const v = sheet('');
  const paint = () => {
    const vs = veces(id), last = vs.filter(x => x.antes != null && x.despues != null).slice(-1)[0], foco = load(K.foco, null) === id;
    v.querySelector('.sheet').innerHTML = `<div class="grab"></div><h2>${esc(r.titulo)}</h2>${r.descripcion ? `<p class="muted">${esc(r.descripcion)}</p>` : ''}
      ${vs.length ? `<p class="quiet">${vs.length === 1 ? 'Ya lo has hecho una vez' : `Ya lo has hecho ${vs.length} veces`}${last ? `. La última: temías ${last.antes} y fue ${last.despues}.` : '.'}</p>` : ''}
      ${st.paso === 'antes' ? `
        <label class="f"><span>¿Qué temes que pase?</span><textarea id="rtemo" rows="2" placeholder="«Que me quede en blanco», «que se note que estoy nervioso»…">${esc(pl ? pl.temo || '' : '')}</textarea></label>
        <label class="f"><span>¿Cuánto miedo crees que te dará?</span>${scaleHTML('antes', st.antes, 0, 10, ['Nada', 'Muchísimo'])}</label>
        <div class="acts"><button class="btn soft" data-r="plan">${foco ? 'Guardar' : 'Lo dejo preparado'}</button><span class="sp"></span><button class="btn" data-r="hecho">Ya lo he hecho</button></div>`
      : `
        <label class="f"><span>¿Cuánto miedo te dio de verdad?</span>${scaleHTML('despues', st.despues, 0, 10, ['Nada', 'Muchísimo'])}</label>
        <label class="f"><span>¿Pasó lo que temías?</span><span class="pills">${[['no', 'No'], ['parte', 'En parte'], ['si', 'Sí']].map(([k, n]) => `<button type="button" class="pill ${st.paso2 === k ? 'on' : ''}" data-paso="${k}">${n}</button>`).join('')}</span></label>
        <label class="f"><span>¿Cómo fue? (si quieres)</span><textarea id="rnota" rows="2"></textarea></label>
        <div class="acts"><button class="btn ghost" data-r="atras">Atrás</button><span class="sp"></span><button class="btn" data-r="guardar">Guardar</button></div>`}
      <div class="row-btns" style="margin-top:16px">${!foco ? '<button class="pill" data-r="foco">Que sea mi reto de ahora</button>' : ''}${vs.length ? '<button class="pill" data-r="deshacer">Quitar la última vez</button>' : ''}${r.etapa === 'propio' ? '<button class="pill" data-r="borrar">Borrar este reto</button>' : ''}</div>`;
  };
  paint();
  v.addEventListener('click', e => {
    const s = e.target.closest('[data-scale]'); if (s) { st[s.dataset.scale] = +s.dataset.v; const t = v.querySelector('#rtemo'); const keep = t && t.value; paint(); if (keep != null && v.querySelector('#rtemo')) v.querySelector('#rtemo').value = keep; return; }
    const p = e.target.closest('[data-paso]'); if (p) { st.paso2 = p.dataset.paso; const n = v.querySelector('#rnota').value; paint(); v.querySelector('#rnota').value = n; return; }
    const b = e.target.closest('[data-r]'); if (!b) return;
    const a = b.dataset.r, P = planes();
    if (a === 'plan' || a === 'hecho') { const temo = v.querySelector('#rtemo').value.trim(); P[id] = { temo, antes: st.antes, fecha: new Date().toISOString() }; store(K.planes, P); }
    if (a === 'plan') { store(K.foco, id); v.remove(); render(); return toast('Preparado. Lo verás en Hoy.'); }
    if (a === 'hecho') { st.paso = 'despues'; return paint(); }
    if (a === 'atras') { st.paso = 'antes'; return paint(); }
    if (a === 'foco') { store(K.foco, id); paint(); render(); return toast('Es tu reto de ahora'); }
    if (a === 'guardar') {
      const H = retosHechos(), prev = H[id] ? JSON.parse(JSON.stringify(H[id])) : null, prevPlan = P[id];
      const vez = { fecha: new Date().toISOString(), antes: st.antes, despues: st.despues, paso: st.paso2, temo: prevPlan ? prevPlan.temo : '', nota: v.querySelector('#rnota').value.trim() };
      const lista = veces(id).concat(vez);
      H[id] = { fecha: vez.fecha, nota: vez.nota, veces: lista }; store(K.retos, H);
      delete P[id]; store(K.planes, P);
      if (load(K.foco, null) === id) store(K.foco, null);
      v.remove(); render();
      const msg = st.antes != null && st.despues != null ? (st.despues < st.antes ? `Hecho. Temías ${st.antes} y fue ${st.despues}: menos de lo que creías.` : `Hecho. Temías ${st.antes} y fue ${st.despues}. Y aun así lo hiciste.`) : 'Hecho. Bien por ti.';
      return toast(msg, () => { const H2 = retosHechos(); if (prev) H2[id] = prev; else delete H2[id]; store(K.retos, H2); const P2 = planes(); if (prevPlan) P2[id] = prevPlan; store(K.planes, P2); render(); });
    }
    if (a === 'deshacer') { const H = retosHechos(), l = veces(id).slice(0, -1); if (l.length) H[id] = { fecha: l[l.length - 1].fecha, nota: l[l.length - 1].nota || '', veces: l }; else delete H[id]; store(K.retos, H); paint(); render(); return; }
    if (a === 'borrar') { if (!confirm('¿Borrar este reto tuyo?')) return; store(K.propios, propios().filter(x => x.id !== id)); const H = retosHechos(); delete H[id]; store(K.retos, H); v.remove(); render(); }
  });
}
function nuevoReto() {
  const v = sheet(`<h2>Un reto tuyo</h2><p class="muted">Algo pequeño que quieras practicar. Mejor si es concreto.</p>
    <label class="f"><span>¿Qué vas a intentar?</span><input type="text" id="nrt" placeholder="Pedir el café yo en vez de señalar" autocomplete="off"></label>
    <label class="f"><span>Una nota (opcional)</span><input type="text" id="nrd" placeholder="Dónde, con quién, cómo" autocomplete="off"></label>
    <div class="acts"><button class="btn ghost" data-close>Cancelar</button><span class="sp"></span><button class="btn" id="nrok">Añadir</button></div>`);
  setTimeout(() => v.querySelector('#nrt').focus(), 50);
  v.querySelector('#nrok').onclick = () => {
    const t = v.querySelector('#nrt').value.trim(); if (!t) return v.querySelector('#nrt').focus();
    store(K.propios, propios().concat({ id: uid('p'), titulo: t, descripcion: v.querySelector('#nrd').value.trim() }));
    v.remove(); render();
  };
}

// ---------- APRENDER ----------
let aq = '';
const norm = t => String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const docTexto = d => d.titulo + ' ' + d.sub + ' ' + d.secciones.map(([h, c]) => h + ' ' + [].concat(c).join(' ')).join(' ');
const guiaTexto = g => [g.titulo, g.pasa, g.hacer.join(' '), g.ejemplos.join(' '), g.cierre, (g.extra || []).map(([h, c]) => h + ' ' + [].concat(c).join(' ')).join(' '), g.sale].join(' ');
const lecTexto = l => l.titulo + ' ' + l.sub + ' ' + l.tarjetas.map(t => t.join(' ')).join(' ');
const okOr = id => leidas()[id] ? '<span class="ok">✓</span>' : '<span class="go">›</span>';
const docBtn = d => `<button class="lec" data-doc="${d.id}"><span class="ic">${d.icono}</span><span class="b"><b>${esc(d.titulo)}</b><small>${esc(d.sub)}</small></span>${okOr(d.id)}</button>`;
const lecBtn = l => `<button class="lec" data-lec="${l.id}"><span class="ic">${l.icono}</span><span class="b"><b>${esc(l.titulo)}</b><small>${esc(l.sub)}</small></span>${okOr(l.id)}</button>`;
const guiaBtn = s => `<button class="lec" data-guia="${s.id}"><span class="ic">💬</span><span class="b"><b>${esc(s.titulo)}</b><small>${esc(s.pasa.split('. ')[0])}.</small></span>${okOr(s.id)}</button>`;
function adaptaHTML(tema) {
  const sel = load(K.perfil, []) || [], t = ADAPTA[tema] || {};
  if (!sel.length) return `<div class="quiet" style="margin:12px 0"><b>Hazlo tuyo.</b> Elige lo que va contigo y aquí te adapto el consejo. <button class="pill" data-parati style="margin-top:8px">Elegir lo que va conmigo</button></div>`;
  const l = sel.filter(id => t[id] && PERFIL.find(p => p.id === id)).map(id => [PERFIL.find(p => p.id === id).n, t[id]]);
  if (!l.length) return '';
  return `<div class="pt adapt"><b>Para ti</b>${l.map(([n, tx]) => `<p><small class="muted">${esc(n)}</small><br>${esc(tx)}</p>`).join('')}</div>`;
}
const temaGuia = id => { const b = GUIA.find(g => g.items.some(x => x.id === id)); return temaAdapta(b ? b.bloque : ''); };
const temaDoc = d => ({ cuerpo: 'intimidad', ligar: 'citas', carisma: 'social', yo: 'yo', calle: 'calle', experto: 'social', avanzado: 'social' }[d.grupo] || 'social');
const favs = () => load(K.favs, []) || [];
const favBtn = id => `<button class="fav ${favs().includes(id) ? 'on' : ''}" data-fav="${id}" aria-label="Guardar">${favs().includes(id) ? '★ Guardado' : '☆ Guardar'}</button>`;
function itemBtn(id) {
  const d = DOCS.find(x => x.id === id); if (d) return docBtn(d);
  const g = GUIA.flatMap(b => b.items).find(x => x.id === id); if (g) return guiaBtn(g);
  const l = LECCIONES.find(x => x.id === id); if (l) return lecBtn(l);
  return '';
}
function aprenderLista() {
  const q = norm(aq.trim());
  if (q.length < 2) return '';
  const hits = [].concat(
    DOCS.filter(d => norm(docTexto(d)).includes(q)).map(docBtn),
    GUIA.flatMap(g => g.items).filter(g => norm(guiaTexto(g)).includes(q)).map(guiaBtn),
    LECCIONES.filter(l => norm(lecTexto(l)).includes(q)).map(lecBtn));
  const tp = TIPS.filter(t => norm(t[0] + ' ' + t[1]).includes(q)).slice(0, 12).map(t => `<div class="card consejo"><span class="small muted">💡 Tip · ${esc(t[0])}</span><p>${esc(t[1])}</p></div>`);
  return hits.length || tp.length ? hits.join('') + tp.join('') : '<p class="vacio">No hay nada con esa palabra.</p>';
}
function vAprender() {
  const perfil = load(K.perfil, []) || [];
  const busq = aprenderLista();
  const todos = [...DOCS.map(d => d.id), ...GUIA.flatMap(g => g.items.map(x => x.id)), ...LECCIONES.map(l => l.id)], le = todos.filter(id => leidas()[id]).length, fv = favs().filter(id => itemBtn(id));
  return `<div class="top"><h1>Aprender</h1><p>Todo lo que necesitas saber, corto y claro.</p>
      <div class="prog"><div class="prog-bar"><i style="width:${Math.round(le / todos.length * 100)}%"></i></div><small>Has leído ${le} de ${todos.length}</small></div></div>
    <input type="text" id="aq" class="aq" placeholder="Buscar: mensajes, cita, nervios, beso…" value="${esc(aq)}" autocomplete="off" enterkeyhint="search">
    <div id="aqres">${busq}</div>
    <div id="aqall" ${busq ? 'hidden' : ''}>
    <button class="parati" data-act="parati"><span class="ic">✨</span><span class="b"><b>Para ti</b><small>${perfil.length ? `Consejos según ${perfil.length === 1 ? 'lo que has elegido' : 'las ' + perfil.length + ' cosas que has elegido'}` : 'Elige lo que va contigo y te doy consejos a tu medida'}</small></span><span class="go">›</span></button>
    ${fv.length ? `<p class="sec-h">★ Guardados</p>${fv.map(itemBtn).join('')}` : ''}
    <p class="sec-h">Practicar</p>
    <div class="juegos">
      <button data-act="quiz"><span>🎯</span><b>¿Qué harías?</b><small>${QUIZ.length} situaciones</small></button>
      <button data-act="senales"><span>👁️</span><b>¿Le interesa o no?</b><small>${QUIZ_SENALES.length} señales</small></button>
      <button data-act="frases"><span>💬</span><b>La mejor frase</b><small>${QUIZ_FRASES.length} momentos</small></button>
      <button data-act="ensayo"><span>✍️</span><b>Modo ensayo</b><small>Escribe qué harías</small></button>
      <button data-act="sim"><span>🎭</span><b>Simulador</b><small>Sin respuesta correcta</small></button>
    </div>
    <p class="sec-h">Herramientas para practicar</p>
    <div class="card" style="padding:4px 16px">
      <button class="lrow" data-act="plan8"><span class="ic">🗺️</span><span class="b"><b>Plan de 8 semanas</b><small>Un foco cada semana, sin agobiarte</small></span><span class="go">›</span></button>
      <button class="lrow" data-act="exp"><span class="ic">🧪</span><span class="b"><b>Experimentos</b><small>Pon a prueba lo que temes y mira qué pasa de verdad</small></span><span class="go">›</span></button>
      <button class="lrow" data-act="preg"><span class="ic">❓</span><span class="b"><b>Entrenador de preguntas</b><small>Escribe lo que te ha dicho y te doy por dónde seguir</small></span><span class="go">›</span></button>
      <button class="lrow" data-act="revisor"><span class="ic">✉️</span><span class="b"><b>Revisor de mensajes</b><small>Pega tu borrador antes de enviarlo</small></span><span class="go">›</span></button>
      <button class="lrow" data-act="ven"><span class="ic">🪞</span><span class="b"><b>Cómo me ven</b><small>Cinco preguntas para tres personas de confianza</small></span><span class="go">›</span></button>
      <button class="lrow" data-act="pruebas"><span class="ic">📒</span><span class="b"><b>Mis pruebas</b><small>Contra «no soy suficiente»</small></span><span class="go">›</span></button>
      <button class="lrow" data-act="planes"><span class="ic">🌆</span><span class="b"><b>Planes en Barcelona</b><small>Según con quién, cuándo y cuánto</small></span><span class="go">›</span></button>
    </div>
    <p class="sec-h">Mis situaciones</p>
    ${(load(K.mias, []) || []).map(m => `<button class="lec" data-mia="${m.id}"><span class="ic">📝</span><span class="b"><b>${esc(m.titulo)}</b><small>${esc((m.prox || m.paso || '').slice(0, 70))}</small></span><span class="go">›</span></button>`).join('')}
    <button class="btn soft full" data-act="mia">＋ Añadir una situación mía</button>
    <p class="sec-h">Carisma y confianza</p>
    ${DOCS.filter(d => d.grupo === 'carisma').map(docBtn).join('')}
    <p class="sec-h">Ligar, de principio a fin</p>
    ${DOCS.filter(d => d.grupo === 'ligar').map(docBtn).join('')}
    <p class="sec-h">Qué hacer en cada situación</p>
    ${GUIA.map((g, i) => `<details class="blq" ${i === 0 ? 'open' : ''}><summary><span>${i + 1}. ${esc(g.bloque)}</span><small>${g.items.filter(x => leidas()[x.id]).length} de ${g.items.length}</small></summary>${g.items.map(guiaBtn).join('')}</details>`).join('')}
    <p class="sec-h">Nivel avanzado: lo que dicen los libros de expertos</p>
    <p class="small muted" style="margin:-4px 0 8px">Ideas de libros de referencia, en sencillo y aplicadas a ti.</p>
    ${(() => { const av = DOCS.filter(d => d.grupo === 'avanzado'), usados = new Set(AVANZADO_GRUPOS.flatMap(g => g[1])), resto = av.filter(d => !usados.has(d.id));
      return AVANZADO_GRUPOS.concat(resto.length ? [['Más', resto.map(d => d.id)]] : []).map(([n, ids]) => { const l = ids.map(id => av.find(d => d.id === id)).filter(Boolean); return l.length ? `<details class="blq"><summary><span>${esc(n)}</span><small>${l.filter(d => leidas()[d.id]).length} de ${l.length}</small></summary>${l.map(docBtn).join('')}</details>` : ''; }).join(''); })()}
    <p class="sec-h">Lo que casi nadie sabe (con estudios)</p>
    <p class="small muted" style="margin:-4px 0 8px">Cosas poco obvias y reales. Cada guía dice qué tan sólida es la evidencia.</p>
    ${DOCS.filter(d => d.grupo === 'experto').map(docBtn).join('')}
    <p class="sec-h">Calle: que no se aprovechen de ti</p>
    ${DOCS.filter(d => d.grupo === 'calle').map(docBtn).join('')}
    <p class="sec-h">Tu cuerpo y la intimidad</p>
    ${DOCS.filter(d => d.grupo === 'cuerpo').map(docBtn).join('')}
    <p class="sec-h">Barcelona y tu edad</p>
    ${DOCS.filter(d => d.grupo === 'bcn').map(docBtn).join('')}
    <p class="sec-h">Conócete</p>
    ${DOCS.filter(d => d.grupo === 'yo').map(docBtn).join('')}
    <p class="sec-h">Lecciones</p>
    ${LECCIONES.map(lecBtn).join('')}
    <p class="sec-h">Herramientas</p>
    <div class="card" style="padding:4px 16px">
      <button class="lrow" data-act="sos"><span class="ic">🌊</span><span class="b"><b>Calma ahora</b><small>Respirar, aterrizar y recordar</small></span><span class="go">›</span></button>
      <button class="lrow" data-act="plan"><span class="ic">🗓️</span><span class="b"><b>Tengo un plan</b><small>Fiesta, quedada, una cita… cómo ir preparado</small></span><span class="go">›</span></button>
      <button class="lrow" data-act="quiz"><span class="ic">🎯</span><span class="b"><b>¿Qué harías?</b><small>Elige la mejor respuesta en situaciones reales</small></span><span class="go">›</span></button>
      <button class="lrow" data-act="carta"><span class="ic">💌</span><span class="b"><b>Carta para ti</b><small>Lo que ya has conseguido, para leerlo cuando dudes</small></span><span class="go">›</span></button>
      <button class="lrow" data-act="pensar"><span class="ic">🧠</span><span class="b"><b>Revisar un pensamiento</b><small>Mirarlo con un poco de distancia</small></span><span class="go">›</span></button>
      <button class="lrow" data-act="trampas"><span class="ic">🪤</span><span class="b"><b>Trampas del pensamiento</b><small>Las más típicas, con ejemplos</small></span><span class="go">›</span></button>
    </div></div>`;
}
function openDoc(id) {
  const d = DOCS.find(x => x.id === id); if (!d) return;
  const v = sheet(`<div class="sh-top"><span class="small muted">${d.icono} ${esc(d.sub)}</span><span>${vozBtn()}${favBtn(d.id)}</span></div><h2>${esc(d.titulo)}</h2>
    ${d.secciones.map(([h, c]) => `<h3 class="gh">${esc(h)}</h3>${Array.isArray(c) ? (c.length > 1 ? `<ul class="gl">${c.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : `<p>${esc(c[0])}</p>`) : `<p>${esc(c)}</p>`}`).join('')}
    ${d.herramienta ? '<div id="yobox"></div>' : adaptaHTML(temaDoc(d))}
    <div class="acts"><button class="btn ghost" data-close>Cerrar</button><span class="sp"></span><button class="btn" data-dleido>Leído</button></div>`, 'guia');
  if (d.herramienta) paintYo(v);
  v.addEventListener('click', e => {
    if (e.target.closest('[data-parati]')) { v.remove(); return openParaTi(); }
    if (e.target.closest('[data-dleido]')) { const L = leidas(); L[id] = new Date().toISOString(); store(K.lecciones, L); v.remove(); render(); }
  });
}
// «Conócete»: lo que eliges y apuntas se guarda solo aquí.
function paintYo(v) {
  const box = v.querySelector('#yobox'); if (!box) return;
  const y = load(K.yo, {}) || {}, val = y.valores || [], fu = y.fuertes || [], pal = y.palabras || ['', '', ''];
  box.innerHTML = `<div class="plan-box">
    <h3 class="gh" style="margin-top:0">Tus valores <small class="muted">(${val.length} de 5)</small></h3>
    <div class="pills">${VALORES.map(x => `<button type="button" class="pill ${val.includes(x) ? 'on' : ''}" data-yv="${esc(x)}">${esc(x)}</button>`).join('')}</div>
    <h3 class="gh">Tus puntos fuertes</h3>
    <div class="pills">${FUERTES.map(x => `<button type="button" class="pill ${fu.includes(x) ? 'on' : ''}" data-yf="${esc(x)}">${esc(x)}</button>`).join('')}</div>
    <h3 class="gh">Cómo te ven (tres palabras de cada persona)</h3>
    ${[0, 1, 2].map(i => `<input type="text" class="yop" data-yp="${i}" placeholder="Persona ${i + 1}: tres palabras" value="${esc(pal[i] || '')}" autocomplete="off" style="margin-bottom:6px">`).join('')}
    <h3 class="gh">Lo que te gusta hacer y de lo que te gusta hablar</h3>
    <textarea data-yg rows="3" placeholder="Música, cocinar, fútbol, una serie…">${esc(y.gustos || '')}</textarea>
    <p class="small muted" style="margin:8px 0 0">Se guarda solo en este móvil, al momento.</p></div>`;
  box.onclick = e => {
    const a = e.target.closest('[data-yv]'), b = e.target.closest('[data-yf]'); if (!a && !b) return;
    const y2 = load(K.yo, {}) || {};
    if (a) { const l = y2.valores || [], x = a.dataset.yv; if (l.includes(x)) y2.valores = l.filter(z => z !== x); else if (l.length >= 5) return toast('Elige 5 como mucho. Quita uno antes.'); else y2.valores = l.concat(x); }
    if (b) { const l = y2.fuertes || [], x = b.dataset.yf; y2.fuertes = l.includes(x) ? l.filter(z => z !== x) : l.concat(x); }
    store(K.yo, y2); paintYo(v);
  };
  box.oninput = e => {
    const y2 = load(K.yo, {}) || {};
    if (e.target.dataset.yp != null) { const p = (y2.palabras || ['', '', '']).slice(); p[+e.target.dataset.yp] = e.target.value; y2.palabras = p; }
    if (e.target.hasAttribute('data-yg')) y2.gustos = e.target.value;
    store(K.yo, y2);
  };
}
// «Para ti»: eliges lo que va contigo y salen los consejos de eso.
function openParaTi() {
  const v = sheet('', 'guia');
  const paint = () => {
    const sel = load(K.perfil, []) || [], els = PERFIL.filter(p => sel.includes(p.id));
    const yo = load(K.yo, {}) || {};
    v.querySelector('.sheet').innerHTML = `<div class="grab"></div><h2>Para ti</h2><p class="muted">Toca lo que va contigo. Se guarda solo en este móvil y no sale de aquí.</p>
      <div class="perfil">${PERFIL.map(p => `<button type="button" class="ck ${sel.includes(p.id) ? 'on' : ''}" data-perf="${p.id}"><span>${sel.includes(p.id) ? '✓' : ''}</span>${esc(p.n)}</button>`).join('')}</div>
      ${els.length ? `<h3 class="gh" style="margin-top:20px">Tus consejos</h3>${els.map(p => `<div class="pt"><b>${esc(p.n)}</b><ul class="gl">${p.consejos.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>`).join('')}` : '<p class="quiet" style="margin-top:16px">Elige al menos una cosa y aquí salen tus consejos.</p>'}
      ${(yo.valores || []).length || (yo.fuertes || []).length ? `<div class="pt"><b>Lo que eres (de «Conócete»)</b><p>${esc([(yo.fuertes || []).join(', '), (yo.valores || []).length ? 'Te importa: ' + yo.valores.join(', ').toLowerCase() : ''].filter(Boolean).join('. '))}.</p><p class="small muted">Léelo antes de un plan. Es verdad, aunque a veces se te olvide.</p></div>` : '<p class="small muted">Si rellenas «Conócete», aquí también te recordaré tus puntos fuertes.</p>'}
      <div class="acts"><span class="sp"></span><button class="btn" data-close>Listo</button></div>`;
  };
  paint();
  v.addEventListener('click', e => {
    const b = e.target.closest('[data-perf]'); if (!b) return;
    const sel = load(K.perfil, []) || [], id = b.dataset.perf;
    store(K.perfil, sel.includes(id) ? sel.filter(z => z !== id) : sel.concat(id));
    const y = v.querySelector('.sheet').scrollTop; paint(); v.querySelector('.sheet').scrollTop = y; render();
  });
}
const JUEGOS = { quiz: ['¿Qué harías?', () => QUIZ], senales: ['¿Le interesa o no?', () => QUIZ_SENALES], frases: ['La mejor frase', () => QUIZ_FRASES] };
function openQuiz(tipo) {
  tipo = JUEGOS[tipo] ? tipo : 'quiz';
  const QS = JUEGOS[tipo][1](), nombre = JUEGOS[tipo][0];
  const orden = QS.map((q, i) => i).sort(() => Math.random() - .5);
  let i = 0, bien = 0, elegida = null, mezcla = null;
  const v = sheet('');
  const paint = () => {
    const sh = v.querySelector('.sheet');
    if (i >= orden.length) {
      sh.innerHTML = `<div class="grab"></div><h2>¡Hecho!</h2><p class="quiz-res">${bien} de ${orden.length}</p><p class="muted">${bien >= orden.length - 2 ? 'Tienes muy claro cómo actuar. Ahora toca practicarlo.' : 'Cada respuesta tiene su explicación: con leerlas ya aprendes. Puedes repetirlo cuando quieras.'}</p>
        <div class="acts"><button class="btn ghost" data-close>Cerrar</button><span class="sp"></span><button class="btn" data-q="otra">Otra vez</button></div>`;
      return;
    }
    const q = QS[orden[i]];
    if (!mezcla) mezcla = q.o.map((o, k) => k).sort(() => Math.random() - .5);
    sh.innerHTML = `<div class="grab"></div><span class="small muted">${esc(nombre)} · ${i + 1} de ${orden.length}</span><h3 class="quiz-p">${esc(q.p)}</h3>
      <div class="quiz-o">${mezcla.map(k => { const o = q.o[k], st = elegida == null ? '' : o[1] ? 'ok' : k === elegida ? 'mal' : 'off'; return `<button class="${st}" data-qo="${k}" ${elegida != null ? 'disabled' : ''}><b>${esc(o[0])}</b>${elegida != null && (o[1] || k === elegida) ? `<small>${esc(o[2])}</small>` : ''}</button>`; }).join('')}</div>
      <div class="acts"><button class="btn ghost" data-close>Salir</button><span class="sp"></span>${elegida != null ? `<button class="btn" data-q="next">${i === orden.length - 1 ? 'Ver resultado' : 'Siguiente'}</button>` : ''}</div>`;
  };
  paint();
  v.addEventListener('click', e => {
    const o = e.target.closest('[data-qo]');
    if (o && elegida == null) { elegida = +o.dataset.qo; if (QS[orden[i]].o[elegida][1]) bien++; return paint(); }
    const b = e.target.closest('[data-q]'); if (!b) return;
    if (b.dataset.q === 'next') { i++; elegida = null; mezcla = null; return paint(); }
    if (b.dataset.q === 'otra') { v.remove(); openQuiz(tipo); }
  });
}
// ---------- voz ----------
const vozActiva = () => 'speechSynthesis' in window && (speechSynthesis.speaking || speechSynthesis.pending);
const vozBtn = () => 'speechSynthesis' in window ? '<button class="fav" data-voz>🔊 Escuchar</button>' : '';
function vozParar() { try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) {} }
function vozLeer(sh, fin) {
  vozParar();
  const clon = sh.cloneNode(true); clon.querySelectorAll('button, textarea, input, .acts, .grab, .dots').forEach(n => n.remove());
  const txt = clon.innerText.replace(/\s+\n/g, '\n').trim();
  const voces = speechSynthesis.getVoices(), es = voces.find(x => x.lang === 'es-ES') || voces.find(x => /^es/.test(x.lang));
  // Por frases: las voces del iPhone se cortan con textos largos.
  const trozos = txt.split(/(?<=[.!?:])\s+|\n+/).filter(Boolean);
  trozos.forEach((t, k) => { const u = new SpeechSynthesisUtterance(t); u.lang = 'es-ES'; if (es) u.voice = es; u.rate = 1; if (k === trozos.length - 1) u.onend = fin; speechSynthesis.speak(u); });
}

// ---------- tu semana: un reto, una situación y un tip ----------
const lunes = () => { const d = new Date(); d.setDate(d.getDate() - (d.getDay() + 6) % 7); return dayKey(d); };
function semana() {
  const w = load(K.semana, null), l = lunes();
  if (w && w.semana === l) return w;
  const n = Math.floor(Date.parse(l) / 6048e5);
  const r = retoAhora(), pend = GUIA.flatMap(g => g.items).filter(x => !leidas()[x.id]), pool = pend.length ? pend : GUIA.flatMap(g => g.items);
  const nueva = { semana: l, reto: r ? r.id : null, sit: pool[n % pool.length].id, tip: n % TIPS.length, hecho: {} };
  store(K.semana, nueva); return nueva;
}
function semanaHTML() {
  const w = semana(), r = allRetos().find(x => x.id === w.reto), g = GUIA.flatMap(b => b.items).find(x => x.id === w.sit), t = TIPS[w.tip];
  const rh = r && veces(r.id).some(v => v.fecha >= w.semana), gh = g && !!leidas()[g.id], th = !!(w.hecho || {}).tip;
  const fila = (ok, tag, cuerpo, attr) => `<div class="sem-f ${ok ? 'ok' : ''}"><span class="sem-c">${ok ? '✓' : ''}</span><span class="b"><small>${tag}</small>${cuerpo}</span>${attr}</div>`;
  const hechas = [rh, gh, th].filter(Boolean).length;
  return `<div class="card sem"><div class="sem-h"><h2>Tu semana</h2><small>${hechas} de 3</small></div><p class="sub">Tres cosas pequeñas. Se renuevan cada lunes.</p>
    ${r ? fila(rh, 'Un reto', `<b>${esc(r.titulo)}</b>`, `<button class="pill" data-reto="${r.id}">Abrir</button>`) : ''}
    ${g ? fila(gh, 'Una situación', `<b>${esc(g.titulo)}</b>`, `<button class="pill" data-guia="${g.id}">Leer</button>`) : ''}
    ${fila(th, 'Un tip para probar', `<b>${esc(t[1])}</b>`, `<button class="pill ${th ? 'on' : ''}" data-semck="tip">${th ? 'Probado' : 'Lo he probado'}</button>`)}
    ${hechas === 3 ? '<p class="small" style="margin:10px 0 0">Semana completa. Muy bien.</p>' : ''}</div>`;
}

// ---------- Simulador de escenas (sin respuesta correcta) ----------
const simHist = () => (load(K.sim, []) || []).filter(x => x && x.esc);
function simMezcla(a) { const b = a.map((x, i) => [x, i]); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
function simEstiloHTML() {
  const h = simHist().slice(-40), n = h.length;
  if (n < 3) return `<h2>Tu estilo</h2><p class="muted">Juega al menos tres escenas y te enseño cómo sueles responder.</p>`;
  const cuenta = k => Object.keys(SIM_ESTILOS).map(t => [t, h.filter(x => x[k] === t).length]).sort((a, b) => b[1] - a[1]);
  const ins = cuenta('ins'), des = cuenta('des'), max = Math.max(1, ...ins.map(x => x[1]), ...des.map(x => x[1]));
  const bar = (t, c, col) => `<div style="margin:6px 0"><small>${SIM_ESTILOS[t][0]} ${esc(SIM_ESTILOS[t][1])} · ${c}</small><div class="sim-bar"><i style="width:${Math.round(c / max * 100)}%;${col ? 'background:' + col : ''}"></i></div></div>`;
  const quiere = Object.keys(SIM_ESTILOS).map(t => [t, des.find(x => x[0] === t)[1] - ins.find(x => x[0] === t)[1]]).filter(x => x[1] > 0).sort((a, b) => b[1] - a[1]);
  const saltos = h.filter(x => x.ins !== x.des).length;
  return `<h2>Tu estilo</h2><p class="muted">Según tus últimas ${n} escenas. No mide quién eres: es una foto de cómo respondes.</p>
    <h3 class="gh">Lo que haces de verdad</h3>${ins.filter(x => x[1]).map(x => bar(x[0], x[1])).join('')}
    <p>${esc(SIM_ESTILOS[ins[0][0]][2])}</p>
    <h3 class="gh">Lo que te gustaría poder hacer</h3>${des.filter(x => x[1]).map(x => bar(x[0], x[1], 'var(--warm, #D9A441)')).join('')}
    <div class="quiet" style="margin-top:12px"><b>La distancia entre las dos.</b> En ${saltos} de ${n} escenas lo que harías y lo que querrías hacer no coinciden. ${quiere.length ? 'Lo que más echas de menos: ' + quiere.slice(0, 2).map(x => SIM_ESTILOS[x[0]][1].toLowerCase()).join(' y ') + '. Es justo lo que conviene entrenar en pequeño.' : 'Eso significa que sueles hacer lo que quieres.'}</div>`;
}
function openSim(escId) {
  const v = sheet('', 'guia');
  const set = html => { const sh = v.querySelector('.sheet'); sh.innerHTML = `<div class="grab"></div>${html}`; sh.scrollTop = 0; };
  let sc = null, S = null, o1 = [], o2 = [];
  const ellaHTML = () => {
    if (sc.mia) return `<h3 class="gh">Desde su lado</h3><p class="small muted">No sabes lo que pensó. Escribe dos o tres posibilidades distintas: ver que hay varias lecturas baja la ansiedad.</p><textarea id="simella" rows="3" placeholder="Quizá pensó que…">${esc(sc.mia.ella || '')}</textarea><div class="row-btns"><button class="pill" data-sim-ella>Guardar</button></div>`;
    const l = SIM_ELLA[sc.id]; if (!l) return '';
    return `<h3 class="gh">Desde su lado</h3><p class="small muted">Lo que ella podría estar pensando. No lo sabes: son posibilidades, y casi nunca es lo que tu miedo dice.</p><ul class="gl">${l.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  };
  const nueva = () => {
    const tags = (n, sel) => `<div class="pills">${Object.keys(SIM_ESTILOS).map(t => `<button type="button" class="pill ${sel === t ? 'on' : ''}" data-mtag="${n}" data-v="${t}">${SIM_ESTILOS[t][0]} ${esc(SIM_ESTILOS[t][1])}</button>`).join('')}</div>`;
    const M = { t1: 'evita', t2: 'acerca', t3: 'pregunta' };
    set(`<h2>Escena con algo que me pasó</h2><p class="muted">Se guarda solo en tus dispositivos. Escribe como te salga.</p>
      <label class="f"><span>Título corto</span><input id="m-tit" type="text" placeholder="Ej.: La chica del gimnasio"></label>
      <label class="f"><span>¿Qué pasó?</span><textarea id="m-setup" rows="3" placeholder="Dónde estabas, quién estaba, qué ocurrió"></textarea></label>
      <label class="f"><span>Lo que hice</span><input id="m-o1" type="text"></label>${tags('t1', M.t1)}
      <label class="f"><span>Lo que me habría gustado hacer</span><input id="m-o2" type="text"></label>${tags('t2', M.t2)}
      <label class="f"><span>Otra opción posible (si se te ocurre)</span><input id="m-o3" type="text"></label>${tags('t3', M.t3)}
      <label class="f"><span>¿Qué pasó al final?</span><textarea id="m-real" rows="2"></textarea></label>
      <div class="acts"><button class="btn ghost" data-sim-menu>Cancelar</button><span class="sp"></span><button class="btn" data-sim-save>Guardar escena</button></div>`);
    v.querySelector('.sheet').__M = M;
  };
  const opts = (l, a) => l.map(([o, i]) => `<button class="simo" data-${a}="${i}">${esc(o[0])}</button>`).join('');
  const cons = o => `<div class="sim-cons"><p><b>Lo que te da:</b> ${esc(o[2])}</p><p><b>Lo que te cuesta:</b> ${esc(o[3])}</p><p><b>Cómo se ve desde fuera:</b> ${esc(o[4])}</p></div>`;
  const tag = t => `${SIM_ESTILOS[t][0]} ${SIM_ESTILOS[t][1]}`;
  const menu = () => {
    const h = simHist(), veces = id => h.filter(x => x.esc === id).length;
    set(`<h2>Simulador</h2><p class="muted">Escenas reales con ambigüedad. <b>No hay respuesta correcta</b>: cada opción da algo y cuesta algo, y el resultado depende en parte del azar. Elige lo que harías de verdad, aunque sepas que no es «lo mejor».</p>
      ${SIM_ESCENAS.map(e => `<button class="lec" data-sim="${e.id}"><span class="ic">${e.ico}</span><span class="b"><b>${esc(e.t)}</b><small>${veces(e.id) ? 'Jugada ' + veces(e.id) + (veces(e.id) === 1 ? ' vez' : ' veces') : 'Sin jugar'}</small></span><span class="go">›</span></button>`).join('')}
      ${lista(K.escenas).length ? `<p class="sec-h">Mis escenas</p>${lista(K.escenas).map(m => `<button class="lec" data-sim="${m.id}"><span class="ic">📝</span><span class="b"><b>${esc(m.titulo)}</b><small>Algo que te pasó</small></span><span class="go">›</span></button>`).join('')}` : ''}
      <button class="btn soft full" data-sim-new style="margin-top:10px">＋ Escena con algo que me pasó</button>
      <div class="row-btns"><button class="pill" data-sim-rand>Una al azar</button><button class="pill" data-sim-estilo>Mi estilo</button></div>
      <div class="acts"><span class="sp"></span><button class="btn" data-close>Cerrar</button></div>`);
  };
  const start = id => { sc = escenaPorId(id); if (!sc) return menu(); S = { ins: null, des: null, q2: null, bien: Math.random() < .5 }; o1 = simMezcla(sc.o1); o2 = sc.o2 ? simMezcla(sc.o2) : [];
    set(`<span class="small muted">${sc.ico} Escena</span><h2>${esc(sc.t)}</h2><p>${esc(sc.setup)}</p><p class="quiet">Elige lo que harías <b>de verdad</b>, no lo que crees que es lo mejor. Después verás qué te da y qué te cuesta cada camino.</p><div class="acts"><button class="btn ghost" data-sim-menu>Volver</button><span class="sp"></span><button class="btn" data-sim-ins>Empezar</button></div>`); };
  const paso = {
    ins: () => set(`<h2>${esc(sc.t)}</h2><p class="muted">${esc(sc.setup)}</p><h3 class="gh">¿Qué harías de verdad?</h3>${opts(o1, 'i1')}`),
    des: () => set(`<h2>${esc(sc.t)}</h2><p class="muted">Has elegido: «${esc(sc.o1[S.ins][0])}»</p><h3 class="gh">Y si pudieras elegir sin miedo, ¿qué te gustaría poder hacer?</h3>${opts(o1, 'd1')}`),
    res1: () => { const a = sc.o1[S.ins], b = sc.o1[S.des], igual = S.ins === S.des;
      set(`<h2>${esc(sc.t)}</h2><p><b>Lo que harías:</b> ${esc(a[0])}</p>${cons(a)}
        <div class="quiet"><b>Esta vez:</b> ${esc(S.bien ? a[5] : a[6])}<br><small class="muted">Otra vez podría ser: ${esc(S.bien ? a[6] : a[5])}</small></div>
        <p class="small muted">El resultado depende de ella y del azar, no solo de ti. Una buena decisión puede salir regular y al revés: no juzgues la decisión por el resultado.</p>
        ${igual ? '<p>Lo que harías y lo que querrías hacer coinciden. Bien.</p>' : `<h3 class="gh">Lo que te gustaría poder hacer</h3><p><b>${esc(b[0])}</b></p>${cons(b)}`}
        ${ellaHTML()}
        <div class="acts"><span class="sp"></span>${sc.o2 ? '<button class="btn" data-sim-q2>Seguir</button>' : '<button class="btn" data-sim-fin>Ver qué significa</button>'}</div>`); },
    q2: () => set(`<h2>${esc(sc.t)}</h2><p>${esc(sc.q2)}</p><h3 class="gh">¿Qué haces?</h3>${opts(o2, 'i2')}`),
    res2: () => { const a = sc.o2[S.q2]; set(`<h2>${esc(sc.t)}</h2><p><b>Elegiste:</b> ${esc(a[0])}</p>${cons(a)}<div class="acts"><span class="sp"></span><button class="btn" data-sim-fin>Ver qué significa</button></div>`); },
    fin: () => {
      const a = sc.o1[S.ins], b = sc.o1[S.des], salto = a[1] !== b[1];
      store(K.sim, simHist().concat({ id: uid('s'), esc: sc.id, fecha: new Date().toISOString(), ins: a[1], des: b[1], q2: sc.o2 ? sc.o2[S.q2][1] : null }));
      set(`<h2>${esc(sc.t)}</h2>
        <div class="sim-cons"><p><b>Tu instinto:</b> ${esc(tag(a[1]))}</p><p><b>Lo que querrías:</b> ${esc(tag(b[1]))}</p>${sc.o2 ? `<p><b>Cuando siguió:</b> ${esc(tag(sc.o2[S.q2][1]))}</p>` : ''}</div>
        ${salto ? '<p>Hay un salto entre lo que harías y lo que querrías hacer. No es un fallo: es justo lo que se entrena. Un paso pequeño para acercar las dos:</p>' : '<p>Lo que harías y lo que querrías hacer coinciden. Aun así, un paso pequeño para seguir practicando:</p>'}
        <div class="pt"><b>Tu paso puente</b><p>${esc(sc.puente)}</p></div>
        <div class="pt"><b>Lo que casi nadie sabe</b><p>${esc(sc.dato)}</p></div>
        <div class="acts"><button class="btn soft" data-sim-reto>Añadirlo a mis retos</button><span class="sp"></span><button class="btn" data-sim-menu>Más escenas</button></div>`);
    }
  };
  v.addEventListener('click', e => {
    const t = e.target;
    let x;
    if ((x = t.closest('[data-sim]'))) return start(x.dataset.sim);
    if (t.closest('[data-sim-rand]')) return start(SIM_ESCENAS[Math.floor(Math.random() * SIM_ESCENAS.length)].id);
    if (t.closest('[data-sim-estilo]')) return set(simEstiloHTML() + `<div class="acts"><button class="btn ghost" data-sim-menu>Volver</button></div>`);
    if (t.closest('[data-sim-menu]')) return menu();
    if (t.closest('[data-sim-new]')) return nueva();
    if ((x = t.closest('[data-mtag]'))) { const M = v.querySelector('.sheet').__M; M[x.dataset.mtag] = x.dataset.v; x.parentNode.querySelectorAll('.pill').forEach(p => p.classList.toggle('on', p === x)); return; }
    if (t.closest('[data-sim-save]')) {
      const g = id => (v.querySelector('#' + id).value || '').trim(), M = v.querySelector('.sheet').__M;
      if (!g('m-setup') || !g('m-o1') || !g('m-o2')) return toast('Escribe qué pasó, lo que hiciste y lo que te habría gustado');
      const m = { id: uid('e'), fecha: new Date().toISOString(), titulo: g('m-tit') || 'Algo que me pasó', setup: g('m-setup'), o1: g('m-o1'), t1: M.t1, o2: g('m-o2'), t2: M.t2, o3: g('m-o3'), t3: M.t3, real: g('m-real'), ella: '' };
      store(K.escenas, lista(K.escenas).concat(m)); toast('Escena guardada'); return start(m.id);
    }
    if (t.closest('[data-sim-ella]')) { const txt = (v.querySelector('#simella').value || '').trim(); store(K.escenas, lista(K.escenas).map(m => m.id === sc.mia.id ? Object.assign({}, m, { ella: txt }) : m)); sc.mia.ella = txt; return toast('Guardado'); }
    if (t.closest('[data-sim-ins]')) return paso.ins();
    if ((x = t.closest('[data-i1]'))) { S.ins = +x.dataset.i1; return paso.des(); }
    if ((x = t.closest('[data-d1]'))) { S.des = +x.dataset.d1; return paso.res1(); }
    if (t.closest('[data-sim-q2]')) return paso.q2();
    if ((x = t.closest('[data-i2]'))) { S.q2 = +x.dataset.i2; return paso.res2(); }
    if (t.closest('[data-sim-fin]')) return paso.fin();
    if ((x = t.closest('[data-sim-reto]'))) { store(K.propios, propios().concat({ id: uid('p'), titulo: sc.puente, descripcion: 'Del simulador: ' + sc.t })); x.disabled = true; x.textContent = 'Añadido'; toast('Añadido a tus retos'); }
  });
  if (escId) start(escId); else menu();
}

const lista = k => { const l = load(k, []); return Array.isArray(l) ? l : []; };
function escenaPorId(id) {
  const e = SIM_ESCENAS.find(x => x.id === id); if (e) return e;
  const m = lista(K.escenas).find(x => x.id === id); if (!m) return null;
  const nada = 'No lo sabes: es justo lo que puedes probar la próxima vez.';
  const op = (t, tag, real) => [t, tag, ...SIM_GEN[tag], real || nada, real || nada];
  const o1 = [op(m.o1, m.t1, m.real ? 'Lo que pasó de verdad: ' + m.real : ''), op(m.o2, m.t2)];
  if (m.o3) o1.push(op(m.o3, m.t3));
  return { id: m.id, ico: '📝', t: m.titulo, setup: m.setup, o1, o2: null, mia: m,
    dato: 'Lo que hiciste es información, no un juicio. Volver a mirar una escena con calma y ver otras opciones es lo que hace la terapia cognitiva con las situaciones reales.',
    puente: 'Si vuelve a pasar algo parecido a «' + m.titulo + '», probaré: ' + m.o2 };
}

// ---------- Equilibrio leer / hacer ----------
const enSemana = iso => !!iso && Date.now() - Date.parse(iso) < 7 * 864e5;
function equilibrioHTML() {
  const leido = Object.values(leidas()).filter(enSemana).length;
  const hecho = allRetos().reduce((a, r) => a + veces(r.id).filter(v => enSemana(v.fecha)).length, 0) + lista(K.exp).filter(e => e.res && enSemana(e.fres)).length;
  if (leido < 6 || hecho * 6 >= leido) return '';
  return `<div class="card consejo"><span class="small muted">⚖️ Esta semana</span><p>Has leído ${leido} cosas y has hecho ${hecho} en la vida real. Leer prepara, pero lo que cambia las cosas es practicar. Toca algo pequeño fuera.</p><div class="row-btns" style="margin-top:8px"><button class="pill" data-act="exp">Hacer un experimento</button><button class="pill" data-act="retos">Ver retos</button></div></div>`;
}

// ---------- Experimentos ----------
const EXP_RES = { si: 'pasó lo que temía', parte: 'pasó en parte', no: 'no pasó' };
function expStatsHTML() {
  const l = lista(K.exp).filter(e => e.res); if (!l.length) return '';
  const si = l.filter(e => e.res === 'si').length, parte = l.filter(e => e.res === 'parte').length, media = Math.round(l.reduce((a, e) => a + (+e.prob || 0), 0) / l.length);
  return `<div class="card"><h2>Tus experimentos</h2><p class="sub">${l.length} ${l.length === 1 ? 'experimento hecho' : 'experimentos hechos'}.</p>
    <p>De media creías que lo temido pasaría un <b>${media} %</b> de las veces. Pasó del todo en <b>${si}</b>${parte ? ` y en parte en <b>${parte}</b>` : ''} (${Math.round(si / l.length * 100)} %).</p>
    <div class="row-btns"><button class="pill" data-act="exp">Ver experimentos</button></div></div>`;
}
function openExp(pre) {
  const v = sheet('', 'guia');
  const set = html => { const sh = v.querySelector('.sheet'); sh.innerHTML = `<div class="grab"></div>${html}`; sh.scrollTop = 0; };
  let cur = null, res = null;
  const lst = () => {
    const l = lista(K.exp).slice().reverse(), pend = l.filter(e => !e.res), hechos = l.filter(e => e.res);
    set(`<h2>Experimentos</h2><p class="muted">Escribe lo que temes como una predicción, pruébalo en la vida real y apunta qué pasó. Es la forma más eficaz que hay de bajar el miedo: con tus propios datos.</p>
      <button class="btn full" data-ex-new>＋ Nuevo experimento</button>
      ${pend.length ? `<p class="sec-h">Pendientes</p>${pend.map(e => `<button class="lec" data-ex-res="${e.id}"><span class="ic">🧪</span><span class="b"><b>${esc(e.cre)}</b><small>Creías ${e.prob} % · ${esc(e.plan || '')}</small></span><span class="go">›</span></button>`).join('')}` : ''}
      ${hechos.length ? `<p class="sec-h">Hechos</p>${hechos.map(e => `<div class="pt"><b>${esc(e.cre)}</b><p class="small">Creías ${e.prob} % → ${EXP_RES[e.res]}${e.paso ? '. ' + esc(e.paso) : ''}</p>${e.apr ? `<p class="small muted">Aprendí: ${esc(e.apr)}</p>` : ''}</div>`).join('')}` : ''}
      <div class="acts"><span class="sp"></span><button class="btn" data-close>Cerrar</button></div>`);
  };
  const nuevo = p => set(`<h2>Nuevo experimento</h2>
    <label class="f"><span>¿Qué temes que pase?</span><textarea id="ex-cre" rows="2" placeholder="Ej.: Si le propongo un café, me dirá que no y será incómodo">${esc((p && p.cre || '').replace(/[«»]/g, ''))}</textarea></label>
    <label class="f"><span>¿Cuánto te lo crees? <b id="ex-pv">70</b> %</span><input id="ex-prob" type="range" min="0" max="100" step="10" value="70"></label>
    <label class="f"><span>¿Qué vas a hacer, y cuándo?</span><input id="ex-plan" type="text" placeholder="Ej.: El jueves, al salir de clase"></label>
    <label class="f"><span>¿Qué «protección» vas a dejar? (opcional)</span><input id="ex-sin" type="text" placeholder="Ej.: no ensayar la frase, no mirar el móvil"></label>
    <div class="acts"><button class="btn ghost" data-ex-list>Volver</button><span class="sp"></span><button class="btn" data-ex-save>Guardar</button></div>`);
  const resultado = id => { cur = lista(K.exp).find(e => e.id === id); res = null; if (!cur) return lst();
    set(`<h2>¿Qué pasó?</h2><div class="pt"><b>Lo que temías</b><p>${esc(cur.cre)} (${cur.prob} %)</p></div>
      <h3 class="gh">¿Pasó lo que temías?</h3><div class="pills">${Object.entries({ si: 'Sí', parte: 'En parte', no: 'No' }).map(([k, n]) => `<button type="button" class="pill" data-ex-r="${k}">${n}</button>`).join('')}</div>
      <label class="f"><span>¿Qué pasó de verdad?</span><textarea id="ex-paso" rows="2"></textarea></label>
      <label class="f"><span>¿Qué aprendes de esto?</span><textarea id="ex-apr" rows="2" placeholder="Ej.: Me puse nervioso, pero no se notó tanto"></textarea></label>
      <div class="acts"><button class="btn ghost" data-ex-list>Volver</button><span class="sp"></span><button class="btn" data-ex-done>Guardar</button></div>`); };
  v.addEventListener('input', e => { if (e.target.id === 'ex-prob') v.querySelector('#ex-pv').textContent = e.target.value; });
  v.addEventListener('click', e => {
    const t = e.target, g = id => ((v.querySelector('#' + id) || {}).value || '').trim(); let x;
    if (t.closest('[data-ex-new]')) return nuevo();
    if (t.closest('[data-ex-list]')) return lst();
    if (t.closest('[data-ex-save]')) { if (!g('ex-cre')) return toast('Escribe qué temes que pase'); store(K.exp, lista(K.exp).concat({ id: uid('x'), fecha: new Date().toISOString(), cre: g('ex-cre'), prob: +g('ex-prob'), plan: g('ex-plan'), sin: g('ex-sin') })); toast('Guardado. Cuando lo hagas, apunta qué pasó.'); return lst(); }
    if ((x = t.closest('[data-ex-res]'))) return resultado(x.dataset.exRes);
    if ((x = t.closest('[data-ex-r]'))) { res = x.dataset.exR; x.parentNode.querySelectorAll('.pill').forEach(p => p.classList.toggle('on', p === x)); return; }
    if (t.closest('[data-ex-done]')) { if (!res) return toast('Elige si pasó o no'); store(K.exp, lista(K.exp).map(z => z.id === cur.id ? Object.assign({}, z, { res, paso: g('ex-paso'), apr: g('ex-apr'), fres: new Date().toISOString() }) : z)); toast(res === 'si' ? 'Apuntado. Ha pasado, y aquí sigues: eso también es un dato.' : 'Apuntado. Tu miedo exageraba: guárdalo.'); render(); return lst(); }
  });
  if (pre) nuevo(pre); else lst();
}

// ---------- Entrenador de preguntas ----------
function preguntasPara(txt) {
  const limpio = txt.replace(/\s+/g, ' ').trim(); if (limpio.length < 3) return '';
  const ultima = limpio.split(/[.,;:!?¡¿…]+/).map(x => x.trim()).filter(Boolean).pop() || limpio;
  const TU = { mi: 'tu', mis: 'tus', me: 'te', conmigo: 'contigo', yo: 'tú', estoy: 'estás', he: 'has', soy: 'eres', tengo: 'tienes', voy: 'vas', hice: 'hiciste', fui: 'fuiste', estuve: 'estuviste', quiero: 'quieres', puedo: 'puedes', sé: 'sabes' };
  const pal = ultima.replace(/["«»]/g, '').split(' ').filter(Boolean).map(w => TU[w.toLowerCase()] || w);
  let espejo = pal.slice(-Math.min(3, pal.length)).join(' ');
  if (pal.length >= 2 && /^(estás|has|eres|tienes|vas)$/.test(pal[pal.length - 2])) espejo = pal.slice(-2).join(' ');
  espejo = espejo.charAt(0).toUpperCase() + espejo.slice(1);
  const pos = /encant|genial|guay|ilusi|increíble|me gust|feliz|flip/i.test(limpio), neg = /cansad|agobi|reventad|agotad|destrozad|muert[ao]|mal |harta|harto|difícil|duro|triste|estr[eé]s|liad|fatal/i.test(limpio);
  const etiqueta = neg ? 'Suena a que ha sido duro.' : pos ? 'Parece que eso te hace mucha ilusión.' : 'Parece que eso es importante para ti.';
  const tema = PREG_TEMAS.find(x => x.k.test(limpio)), q = tema || PREG_GEN;
  const toks = limpio.split(' '), nombres = [...new Set(toks.map((w, i) => i > 0 && !/[.!?]$/.test(toks[i - 1]) ? w.replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ]/g, '') : '').filter(w => /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{2,}$/.test(w)))];
  const fila = (n, l) => `<div class="pt"><b>${n}</b><ul class="gl">${l.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
  return `${tema ? `<p class="small muted">Tema detectado: ${esc(tema.n)}</p>` : ''}
    ${fila('Espejo (repite sus últimas palabras, como pregunta)', ['«¿' + espejo + '?»'])}
    ${fila('Etiqueta (nombra lo que percibes)', ['«' + etiqueta + '»'])}
    ${nombres.length ? fila('Información gratuita (lo que ha soltado sin que preguntes)', nombres.slice(0, 3).map(n => 'Has mencionado «' + n + '»: pregunta por eso.')) : ''}
    ${fila('De hechos', q.h)}${fila('De emoción', q.e)}${fila('Hacia delante', q.c)}
    <p class="small muted">Elige una, no todas. Y cuenta algo tuyo después para que no sea un interrogatorio.</p>`;
}
function openPreg() {
  const v = sheet(`<h2>Entrenador de preguntas</h2><p class="muted">Escribe lo que te ha dicho (o algo que suele decir la gente) y te doy por dónde seguir. Sirve para practicar en casa y para mirarlo en el baño si te quedas en blanco.</p>
    <textarea id="pq" rows="3" placeholder="Ej.: Este finde he estado en Girona con mi hermana, estoy reventada"></textarea><div id="pqr"></div>
    <div class="acts"><span class="sp"></span><button class="btn" data-close>Cerrar</button></div>`, 'guia');
  v.addEventListener('input', e => { if (e.target.id === 'pq') v.querySelector('#pqr').innerHTML = preguntasPara(e.target.value); });
}

// ---------- Revisor de mensajes ----------
function revisar(mio, suyo, seguidos) {
  const m = mio.trim(), avisos = [], bien = [];
  if (!m) return '';
  const h = new Date().getHours();
  if (seguidos >= 2) avisos.push(`Llevas ${seguidos} mensajes sin respuesta. Mejor no mandar otro: deja que conteste ella.`);
  else if (seguidos === 1) avisos.push('Ya tienes un mensaje sin respuesta. Si mandas este, que sea distinto y ligero, y que sea el último.');
  if (h >= 0 && h < 7) avisos.push(`Son las ${h}:00. Si puedes, guárdalo y decide por la mañana.`);
  if (suyo && suyo.trim() && m.length > Math.max(140, suyo.trim().length * 2.5)) avisos.push(`El tuyo es mucho más largo que el suyo (${m.length} frente a ${suyo.trim().length} caracteres). Acércate a su ritmo.`);
  if (!/\?/.test(m) && !/quedamos|te apetece|vamos|vienes|plan|jueves|viernes|sábado|domingo|lunes|martes|miércoles|mañana/i.test(m)) avisos.push('No hay ni pregunta ni propuesta. Es fácil que la conversación muera aquí.');
  if (/perd[oó]n|perdona|siento molestar|siento escribir|no quiero molestar/i.test(m)) avisos.push('Pides perdón sin motivo. Quítalo: no estás molestando por escribir.');
  if (/soy (un )?(desastre|aburrido|pesado|raro)|seguro que no|no sé si te apetecerá|igual no te interesa/i.test(m)) avisos.push('Te pones por debajo antes de que ella diga nada. Quítalo y di lo que quieres sin más.');
  if (/por qu[eé] no (me )?contestas|me ignoras|si no quieres d[ií]melo|ya veo que/i.test(m)) avisos.push('Suena a reproche. Aunque te duela el silencio, esto suele empeorar las cosas.');
  if (/a ver si (un d[ií]a|alg[uú]n d[ií]a)|cuando quieras|alg[uú]n d[ií]a/i.test(m)) avisos.push('La propuesta es vaga. Concreta un día y un plan: «¿Te apetece un café el jueves?».');
  if ((m.match(/!/g) || []).length > 4 || (m.match(/[\u{1F300}-\u{1FAFF}]/gu) || []).length > 4) avisos.push('Muchas exclamaciones o emojis. Con menos se lee más tranquilo.');
  if (/\?/.test(m)) bien.push('Tiene una pregunta: es fácil de contestar.');
  if (m.length <= 160) bien.push('Es corto y fácil de leer.');
  return `${avisos.length ? `<div class="pt"><b>Para mirar</b><ul class="gl">${avisos.map(a => `<li>${esc(a)}</li>`).join('')}</ul></div>` : '<div class="pt"><b>Nada que señalar</b><p>Mándalo si te apetece.</p></div>'}
    ${bien.length ? `<div class="pt"><b>Bien</b><ul class="gl">${bien.map(a => `<li>${esc(a)}</li>`).join('')}</ul></div>` : ''}
    <p class="small muted">No te lo escribo yo: tu forma de escribir es tuya. Solo te aviso de cosas que suelen jugar en contra.</p>`;
}
function openRevisor() {
  const v = sheet(`<h2>Revisor de mensajes</h2><p class="muted">Pega tu borrador antes de mandarlo. No sale de tu móvil.</p>
    <label class="f"><span>Tu borrador</span><textarea id="rv-m" rows="4"></textarea></label>
    <label class="f"><span>Su último mensaje (opcional)</span><textarea id="rv-s" rows="2"></textarea></label>
    <label class="f"><span>Mensajes tuyos seguidos sin respuesta</span><select id="rv-n"><option value="0">Ninguno</option><option value="1">1</option><option value="2">2</option><option value="3">3 o más</option></select></label>
    <div id="rvr"></div><div class="acts"><span class="sp"></span><button class="btn" data-close>Cerrar</button></div>`, 'guia');
  const go = () => { v.querySelector('#rvr').innerHTML = revisar(v.querySelector('#rv-m').value, v.querySelector('#rv-s').value, +v.querySelector('#rv-n').value); };
  v.addEventListener('input', go); v.addEventListener('change', go);
}

// ---------- Cómo me ven ----------
function openVen() {
  const v = sheet('', 'guia');
  const set = html => { const sh = v.querySelector('.sheet'); sh.innerHTML = `<div class="grab"></div>${html}`; sh.scrollTop = 0; };
  const msj = 'Oye, estoy trabajando en conocerme mejor y me ayudaría mucho tu opinión sincera. Son cinco preguntas rápidas:\n' + VEN_PREGUNTAS.map((p, i) => (i + 1) + '. ' + p).join('\n') + '\nSin prisa, y gracias.';
  const lst = () => {
    const l = lista(K.ven);
    set(`<h2>Cómo me ven</h2><p class="muted">Tu imagen interna suele ser peor que la real. Preguntar a tres personas de confianza es de lo que más la corrige. Elige gente que te quiera bien y que sea sincera.</p>
      <div class="pt"><b>Mensaje para mandar</b><p style="white-space:pre-line">${esc(msj)}</p><div class="row-btns"><button class="pill" data-ven-copy>Copiar</button></div></div>
      <button class="btn full" data-ven-new style="margin-top:12px">＋ Apuntar respuestas de alguien</button>
      ${l.length ? `<p class="sec-h">Lo que dicen (${l.length})</p>${VEN_PREGUNTAS.map((p, i) => `<div class="pt"><b>${esc(p)}</b><ul class="gl">${l.filter(r => (r.r || [])[i]).map(r => `<li>${esc(r.r[i])} <small class="muted">· ${esc(r.quien)}</small></li>`).join('')}</ul></div>`).join('')}
        <p class="small muted">Fíjate en lo que se repite: eso es como te ven de verdad. Y fíjate en lo que te sorprende.</p>` : ''}
      <div class="acts"><span class="sp"></span><button class="btn" data-close>Cerrar</button></div>`);
  };
  const nuevo = () => set(`<h2>Respuestas</h2><label class="f"><span>¿Quién? (solo para ti)</span><input id="vq" type="text" placeholder="Un nombre o una inicial"></label>
    ${VEN_PREGUNTAS.map((p, i) => `<label class="f"><span>${esc(p)}</span><textarea id="vr${i}" rows="2"></textarea></label>`).join('')}
    <div class="acts"><button class="btn ghost" data-ven-list>Volver</button><span class="sp"></span><button class="btn" data-ven-save>Guardar</button></div>`);
  v.addEventListener('click', e => {
    const t = e.target;
    if (t.closest('[data-ven-copy]')) { try { navigator.clipboard.writeText(msj); toast('Copiado'); } catch (er) {} return; }
    if (t.closest('[data-ven-new]')) return nuevo();
    if (t.closest('[data-ven-list]')) return lst();
    if (t.closest('[data-ven-save]')) { const r = VEN_PREGUNTAS.map((_, i) => (v.querySelector('#vr' + i).value || '').trim()); if (!r.some(Boolean)) return toast('Apunta al menos una respuesta'); store(K.ven, lista(K.ven).concat({ id: uid('v'), fecha: new Date().toISOString(), quien: (v.querySelector('#vq').value || '').trim() || 'Alguien', r })); toast('Guardado'); return lst(); }
  });
  lst();
}

// ---------- Mis pruebas ----------
const PRUEBA_TIPOS = { hice: 'Lo hice', dijeron: 'Me dijeron', supere: 'Lo superé', trate: 'Me traté bien' };
function openPruebas() {
  const v = sheet('', 'guia');
  const set = html => { const sh = v.querySelector('.sheet'), y = sh.scrollTop; sh.innerHTML = `<div class="grab"></div>${html}`; sh.scrollTop = y; };
  let tipo = 'hice';
  const paint = () => {
    const c = Object.assign({ vieja: 'No soy suficiente', nueva: '', hist: [] }, load(K.creencia, {}) || {}), l = lista(K.pruebas).slice().reverse(), hoy = (c.hist || []).find(h => h.f === hoyKey());
    set(`<h2>Mis pruebas</h2><p class="muted">Una creencia de fondo (muchas veces de la infancia) no cambia discutiendo con ella, sino juntando pruebas reales en contra, día a día. Esto se lleva a terapia tal cual.</p>
      <label class="f"><span>La creencia que quieres cambiar</span><input id="pv-v" type="text" value="${esc(c.vieja)}"></label>
      <label class="f"><span>La creencia más justa que quieres construir</span><input id="pv-n" type="text" value="${esc(c.nueva)}" placeholder="Ej.: Valgo, aunque a veces me cueste"></label>
      <label class="f"><span>¿Cuánto te crees hoy la primera? <b id="pv-x">${hoy ? hoy.v : 70}</b> de 100</span><input id="pv-s" type="range" min="0" max="100" step="5" value="${hoy ? hoy.v : 70}"></label>
      <div class="row-btns"><button class="pill" data-pv-save>Guardar</button></div>
      ${(c.hist || []).length > 1 ? `<p class="small muted" style="margin-top:8px">Cómo ha cambiado: ${c.hist.slice(-10).map(h => h.v).join(' → ')}</p>` : ''}
      <h3 class="gh">Añadir una prueba</h3>
      <div class="pills">${Object.entries(PRUEBA_TIPOS).map(([k, n]) => `<button type="button" class="pill ${tipo === k ? 'on' : ''}" data-pv-t="${k}">${n}</button>`).join('')}</div>
      <textarea id="pv-txt" rows="2" placeholder="Ej.: Hablé con una chica en la cola y fue bien. / Mi amiga me dijo que soy muy buen oyente."></textarea>
      <div class="row-btns"><button class="pill" data-pv-add>Añadir</button></div>
      <p class="sec-h">${l.length} ${l.length === 1 ? 'prueba' : 'pruebas'}</p>
      ${l.map(p => `<div class="pt"><small class="muted">${PRUEBA_TIPOS[p.tipo] || ''} · ${fCorta(p.fecha)}</small><p style="margin:4px 0 0">${esc(p.texto)}</p><button class="pill" data-pv-del="${p.id}" style="margin-top:6px">Quitar</button></div>`).join('')}
      <div class="acts"><span class="sp"></span><button class="btn" data-close>Cerrar</button></div>`);
  };
  v.addEventListener('input', e => { if (e.target.id === 'pv-s') v.querySelector('#pv-x').textContent = e.target.value; });
  v.addEventListener('click', e => {
    const t = e.target; let x;
    if ((x = t.closest('[data-pv-t]'))) { tipo = x.dataset.pvT; x.parentNode.querySelectorAll('.pill').forEach(p => p.classList.toggle('on', p === x)); return; }
    if (t.closest('[data-pv-save]')) { const c = Object.assign({ hist: [] }, load(K.creencia, {}) || {}), val = +v.querySelector('#pv-s').value; const hist = (c.hist || []).filter(h => h.f !== hoyKey()).concat({ f: hoyKey(), v: val }); store(K.creencia, { vieja: v.querySelector('#pv-v').value.trim(), nueva: v.querySelector('#pv-n').value.trim(), hist }); toast('Guardado'); return paint(); }
    if (t.closest('[data-pv-add]')) { const txt = (v.querySelector('#pv-txt').value || '').trim(); if (!txt) return; store(K.pruebas, lista(K.pruebas).concat({ id: uid('r'), fecha: new Date().toISOString(), tipo, texto: txt })); toast('Una prueba más'); return paint(); }
    if ((x = t.closest('[data-pv-del]'))) { store(K.pruebas, lista(K.pruebas).filter(p => p.id !== x.dataset.pvDel)); return paint(); }
  });
  paint();
}

// ---------- Planes en Barcelona ----------
function openPlanes() {
  const v = sheet('', 'guia'), F = { con: '', m: '', p: '', e: '' };
  const grupos = [['con', 'Con quién', { cita: 'Una cita', amigos: 'Amigos', solo: 'Solo', conocer: 'Conocer gente' }], ['m', 'Cuándo', { dia: 'De día', tarde: 'Tarde', noche: 'Noche' }], ['p', 'Dinero', { 1: 'Poco', 2: 'Algo más' }], ['e', 'Energía', { tranquilo: 'Tranquilo', activo: 'Activo' }]];
  const paint = () => {
    const l = simMezcla(PLANES_BCN.filter(x => (!F.con || x.con.includes(F.con)) && (!F.m || x.m.includes(F.m)) && (!F.p || x.p <= +F.p) && (!F.e || x.e === F.e))).slice(0, 5).map(z => z[0]);
    v.querySelector('.sheet').innerHTML = `<div class="grab"></div><h2>Planes en Barcelona</h2><p class="muted">Tipos de plan, no locales concretos. Con una frase para proponerlo y una pregunta para después.</p>
      ${grupos.map(([k, n, o]) => `<p class="small muted" style="margin:10px 0 4px">${n}</p><div class="pills">${Object.entries(o).map(([val, t]) => `<button type="button" class="pill ${F[k] === val ? 'on' : ''}" data-pl="${k}" data-v="${val}">${t}</button>`).join('')}</div>`).join('')}
      ${l.length ? l.map(x => `<div class="pt"><b>${esc(x.t)}</b><p class="small muted">${esc(x.z)} · ${x.p === 1 ? '€' : '€€'}</p><p>${esc(x.d)}</p><p class="small">Para la conversación: ${esc(x.q)}</p></div>`).join('') : '<p class="vacio">Nada con esos filtros. Quita alguno.</p>'}
      <div class="acts"><button class="btn ghost" data-pl-otra>Otras ideas</button><span class="sp"></span><button class="btn" data-close>Cerrar</button></div>`;
  };
  v.addEventListener('click', e => { const x = e.target.closest('[data-pl]'); if (x) { F[x.dataset.pl] = F[x.dataset.pl] === x.dataset.v ? '' : x.dataset.v; return paint(); } if (e.target.closest('[data-pl-otra]')) paint(); });
  paint();
}

// ---------- Plan de 8 semanas ----------
function plan8Foco() {
  const h = simHist().slice(-30); if (h.length < 3) return '';
  const d = Object.keys(SIM_ESTILOS).map(t => [t, h.filter(x => x.des === t).length - h.filter(x => x.ins === t).length]).sort((a, b) => b[1] - a[1])[0];
  return d && d[1] > 0 ? `En el simulador, lo que más querrías hacer y no haces es: ${SIM_ESTILOS[d[0]][1].toLowerCase()}. Busca esta semana una ocasión pequeña para eso.` : '';
}
function plan8HTML() {
  const p = load(K.plan8, null);
  if (!p) return `<div class="card consejo"><span class="small muted">🗺️ Plan de 8 semanas</span><p>Un foco cada semana: tres guías, una escena del simulador, un reto y un experimento. Para no perderte entre tantas cosas.</p><div class="row-btns" style="margin-top:8px"><button class="pill" data-act="plan8">Ver el plan</button></div></div>`;
  if (p.fin) return '';
  const w = PLAN8[p.sem], k = 's' + p.sem, hh = p.hecho || {}, desde = p.desde || p.inicio;
  const fila = (ok, tag, cuerpo, attr) => `<div class="sem-f ${ok ? 'ok' : ''}"><span class="sem-c">${ok ? '✓' : ''}</span><span class="b"><small>${tag}</small>${cuerpo}</span>${attr}</div>`;
  const docs = w.docs.map(id => DOCS.find(d => d.id === id)).filter(Boolean);
  const escOk = simHist().some(x => x.esc === w.esc && x.fecha >= desde), sc = SIM_ESCENAS.find(e => e.id === w.esc);
  const expOk = lista(K.exp).some(e => e.res && e.fres >= desde);
  const foco = plan8Foco();
  return `<div class="card sem"><div class="sem-h"><h2>Semana ${p.sem + 1} de 8 · ${esc(w.t)}</h2></div><p class="sub">${esc(w.foco)}</p>
    ${docs.map(d => fila(!!leidas()[d.id], 'Leer', `<b>${esc(d.titulo)}</b>`, `<button class="pill" data-doc="${d.id}">Leer</button>`)).join('')}
    ${sc ? fila(escOk, 'Simulador', `<b>${esc(sc.t)}</b>`, `<button class="pill" data-simesc="${sc.id}">Jugar</button>`) : ''}
    ${fila(!!hh[k + 'reto'], 'Reto de la semana', `<b>${esc(w.reto)}</b>`, `<button class="pill ${hh[k + 'reto'] ? 'on' : ''}" data-p8="${k}reto">${hh[k + 'reto'] ? 'Hecho' : 'Lo he hecho'}</button>`)}
    ${fila(expOk, 'Experimento', `<b>${esc(w.exp)}</b>`, `<button class="pill" data-p8exp="${esc(w.exp)}">Probar</button>`)}
    ${foco ? `<p class="small" style="margin:10px 0 0">🎯 ${esc(foco)}</p>` : ''}
    <div class="row-btns"><button class="pill" data-act="plan8">Ver el plan</button></div></div>`;
}
function openPlan8() {
  const v = sheet('', 'guia');
  const paint = () => {
    const p = load(K.plan8, null);
    v.querySelector('.sheet').innerHTML = `<div class="grab"></div><h2>Plan de 8 semanas</h2><p class="muted">Un foco por semana. Pasas a la siguiente cuando tú quieras: no hay prisa ni rachas. Si una semana se alarga, se alarga.</p>
      ${PLAN8.map((w, i) => `<div class="pt" style="${p && !p.fin && p.sem === i ? 'outline:2px solid var(--accent)' : ''}"><b>${i + 1}. ${esc(w.t)}</b><p class="small">${esc(w.foco)}</p></div>`).join('')}
      <div class="acts">${p ? '<button class="btn ghost" data-p8-reset>Empezar de nuevo</button>' : ''}<span class="sp"></span>
        ${!p ? '<button class="btn" data-p8-go>Empezar</button>' : p.fin ? '' : p.sem < 7 ? '<button class="btn" data-p8-next>Pasar a la siguiente semana</button>' : '<button class="btn" data-p8-end>Terminar el plan</button>'}</div>`;
  };
  v.addEventListener('click', e => {
    const p = load(K.plan8, null), now = new Date().toISOString();
    if (e.target.closest('[data-p8-go]')) { store(K.plan8, { inicio: now, desde: now, sem: 0, hecho: {} }); toast('Plan empezado. Lo tienes en Hoy.'); render(); return paint(); }
    if (e.target.closest('[data-p8-next]') && p) { store(K.plan8, Object.assign({}, p, { sem: Math.min(7, p.sem + 1), desde: now })); toast('Semana ' + (p.sem + 2)); render(); return paint(); }
    if (e.target.closest('[data-p8-end]') && p) { store(K.plan8, Object.assign({}, p, { fin: now })); toast('Plan terminado. Lo que has practicado se queda contigo.'); render(); return paint(); }
    if (e.target.closest('[data-p8-reset]')) { store(K.plan8, { inicio: now, desde: now, sem: 0, hecho: {} }); toast('Plan reiniciado'); render(); return paint(); }
  });
  paint();
}

// ---------- Todos los tips ----------
function openTips() {
  const cats = [...new Set(TIPS.map(t => t[0]))];
  let cat = 'todos';
  const v = sheet('', 'guia');
  const paint = () => {
    const l = cat === 'todos' ? TIPS : TIPS.filter(t => t[0] === cat);
    v.querySelector('.sheet').innerHTML = `<div class="grab"></div><h2>Tips</h2><p class="muted">${TIPS.length} consejos cortos. Toca un tema.</p>
      <div class="pills scroll"><button class="pill ${cat === 'todos' ? 'on' : ''}" data-tc="todos">Todos</button>${cats.map(c => `<button class="pill ${cat === c ? 'on' : ''}" data-tc="${esc(c)}">${esc(c)}</button>`).join('')}</div>
      <ul class="gl" style="margin-top:14px">${l.map(t => `<li>${cat === 'todos' ? `<small class="muted">${esc(t[0])} · </small>` : ''}${esc(t[1])}</li>`).join('')}</ul>
      <div class="acts"><span class="sp"></span><button class="btn" data-close>Listo</button></div>`;
  };
  paint();
  v.addEventListener('click', e => { const b = e.target.closest('[data-tc]'); if (!b) return; cat = b.dataset.tc; paint(); v.querySelector('.sheet').scrollTop = 0; });
}

// ---------- Estoy fuera ahora ----------
function openAhora() {
  const o = document.createElement('div'); o.className = 'sos-full ahora'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-label', 'Estoy fuera ahora');
  document.body.appendChild(o); document.body.style.overflow = 'hidden';
  let sitio = null, cosa = null;
  const close = () => { clearTimeout(sosTimer); o.remove(); document.body.style.overflow = ''; };
  const paint = () => {
    clearTimeout(sosTimer);
    let body, atras = sitio ? (cosa ? 'cosa' : 'sitio') : 'cerrar';
    if (!sitio) body = `<h2 class="bj-h">¿Dónde estás?</h2><div class="bj-bt">${AHORA_SITIOS.map(([k, i, n]) => `<button data-ah-s="${k}">${i} ${esc(n)}</button>`).join('')}</div>`;
    else if (!cosa) body = `<h2 class="bj-h">¿Qué te pasa ahora?</h2><div class="bj-bt">${AHORA_COSAS.map(c => `<button data-ah-c="${c.id}">${c.i} ${esc(c.n)}</button>`).join('')}<button data-ah-c="bajon" class="rojo">🌧️ Me ha dado el bajón</button></div>`;
    else if (cosa === 'respira') body = `<div class="breath"><b>Prepárate</b></div><p class="bj-p">Tres respiraciones y vuelves.</p>`;
    else {
      const c = AHORA_COSAS.find(x => x.id === cosa), st = AHORA_SITIOS.find(x => x[0] === sitio);
      body = `<h2 class="bj-h">${c.i} ${esc(c.n)}</h2>
        <div class="ah-una"><small>Ahora, una sola cosa</small>${esc(c.una)}</div>
        <div class="bj-list">${c.haz.map(t => `<div>${esc(t)}</div>`).join('')}</div>
        ${c.dilo.length ? `<div class="ah-dilo"><small>Dilo así</small>${c.dilo.map(t => `<b>${esc(t)}</b>`).join('')}</div>` : ''}
        <p class="ah-sitio">${st[1]} ${esc(st[3])}</p>
        <div class="bj-bt"><button data-ah-x="respira">🫁 Respirar un momento</button><button data-ah-x="otra">Me pasa otra cosa</button><button data-ah-x="fin">Estoy mejor, cerrar</button></div>`;
    }
    o.innerHTML = `<button class="x" data-ah-x="${atras}">${atras === 'cerrar' ? 'Cerrar' : '← Atrás'}</button><div class="sos-body">${body}</div>`;
    o.scrollTop = 0;
    if (cosa === 'respira') {
      let k = 0, r = 0; const ph = [['Coge aire', 4000, 1], ['Aguanta', 2000, 1], ['Suéltalo despacio', 6000, .55]];
      const step = () => { const el = o.querySelector('.breath'); if (!el) return; const [t, d, sc] = ph[k]; el.style.setProperty('--d', d + 'ms'); el.style.setProperty('--s', sc); el.querySelector('b').textContent = t; sosTimer = setTimeout(() => { k = (k + 1) % 3; if (!k && ++r >= 3) { cosa = prev; return paint(); } step(); }, d); };
      setTimeout(step, 300);
    }
  };
  let prev = null;
  paint();
  o.addEventListener('click', e => {
    const s2 = e.target.closest('[data-ah-s]'); if (s2) { sitio = s2.dataset.ahS; return paint(); }
    const c = e.target.closest('[data-ah-c]'); if (c) { if (c.dataset.ahC === 'bajon') { close(); return openBajon(); } cosa = c.dataset.ahC; return paint(); }
    const x = e.target.closest('[data-ah-x]'); if (!x) return;
    const a = x.dataset.ahX;
    if (a === 'cerrar' || a === 'fin') { close(); if (a === 'fin') toast('Bien hecho. Mañana apunta cómo fue.'); return; }
    if (a === 'sitio') { sitio = null; return paint(); }
    if (a === 'cosa' || a === 'otra') { cosa = null; return paint(); }
    if (a === 'respira') { prev = cosa; cosa = 'respira'; return paint(); }
  });
}

// ---------- He bebido y me ha dado el bajón ----------
// Pensado para ir pasado: letra grande, frases cortas, botones gordos y nada obligatorio que escribir.
function openBajon() {
  store(K.bajon, { fecha: new Date().toISOString(), visto: false });
  const o = document.createElement('div'); o.className = 'sos-full bajon'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-label', 'Bajón');
  document.body.appendChild(o); document.body.style.overflow = 'hidden';
  let modo = 'inicio';
  const close = () => { clearTimeout(sosTimer); o.remove(); document.body.style.overflow = ''; render(); };
  const carta = load(K.carta, '');
  const paint = () => {
    clearTimeout(sosTimer);
    let body;
    if (modo === 'inicio') body = `<h2 class="bj-h">Tranquilo.</h2><p class="bj-p">Esto es el alcohol hablando. El bajón de beber es químico: mañana lo verás distinto.</p>
      <div class="bj-bt">
        <button data-bj="agua">💧 Agua y a casa</button>
        <button data-bj="respira">🫁 Respirar</button>
        <button data-bj="escribir">✋ Quiero escribirle a alguien</button>
        <button data-bj="recuerda">💌 ${carta ? 'Leer mi carta' : 'Lo que tengo que recordar'}</button>
        <button data-bj="fatal" class="rojo">Me siento fatal de verdad</button>
      </div>`;
    else if (modo === 'agua') body = `<h2 class="bj-h">Ahora mismo</h2><div class="bj-list">
        <div>💧 Bebe un vaso de agua entero.</div><div>🚫 No bebas más esta noche.</div><div>🚕 Busca cómo volver: taxi, NitBus o con un amigo.</div><div>📱 Avisa a tu amigo de que te vas.</div><div>🛏️ En casa: agua al lado de la cama y a dormir.</div></div>`;
    else if (modo === 'respira') body = `<div class="breath"><b>Prepárate</b></div><p class="bj-p">Suelta el aire despacio.</p>`;
    else if (modo === 'escribir') body = `<h2 class="bj-h">Escríbelo aquí</h2><p class="bj-p">Mañana decides si lo mandas. Esta noche, no.</p><textarea id="bjtxt" class="bj-ta" rows="5" placeholder="Lo que quieras decir…"></textarea><div class="bj-bt"><button data-bj="guardar">Guardar para mañana</button></div>`;
    else if (modo === 'guardado') body = `<h2 class="bj-h">Guardado</h2><p class="bj-p">Mañana te lo enseño en Hoy. Si sigues queriendo mandarlo, lo mandas. Ahora, agua y a casa.</p>`;
    else if (modo === 'recuerda') body = `<div class="bj-list">${carta ? `<div class="carta"><b>Tu carta</b><br>${esc(carta).replace(/\n/g, '<br>')}</div>` : ''}
        <div>No hagas balance de tu vida esta noche. A las 4 de la mañana y con alcohol, todo parece peor de lo que es.</div>
        <div>Lo que ha pasado (o no ha pasado) hoy no dice nada de lo que vales.</div>
        <div>Compararte con otro esta noche no es justo: ves su mejor momento y tu peor bajón.</div>
        <div>Si tomas medicación para el ánimo, el alcohol puede hacer el bajón más fuerte. No eres tú: es la mezcla.</div>
        <div>Mañana: agua, descanso y algo rico. El bajón se pasa.</div></div>`;
    else body = `<h2 class="bj-h">No estás solo</h2><p class="bj-p">Si es más que un bajón, si tienes ganas de hacerte daño o no te ves bien, llama ahora:</p>
      <div class="bj-bt"><a class="bj-tel" href="tel:024">📞 024 · gratis, 24 horas</a><a class="bj-tel" href="tel:112">🚑 112 · emergencias</a></div>
      <p class="bj-p">O llama a alguien de confianza o díselo a tu amigo, aunque sea de madrugada.</p>`;
    o.innerHTML = `<button class="x" data-bj="${modo === 'inicio' ? 'cerrar' : 'inicio'}">${modo === 'inicio' ? 'Cerrar' : '← Atrás'}</button><div class="sos-body">${body}</div>`;
    if (modo === 'respira') {
      let k = 0; const ph = [['Coge aire', 4000, 1], ['Aguanta', 2000, 1], ['Suéltalo despacio', 6000, .55]];
      const step = () => { const c = o.querySelector('.breath'); if (!c) return; const [t, d, sc] = ph[k]; c.style.setProperty('--d', d + 'ms'); c.style.setProperty('--s', sc); c.querySelector('b').textContent = t; sosTimer = setTimeout(() => { k = (k + 1) % 3; step(); }, d); };
      setTimeout(step, 300);
    }
    if (modo === 'escribir') setTimeout(() => { const t = o.querySelector('#bjtxt'); if (t) t.focus(); }, 80);
  };
  paint();
  o.addEventListener('click', e => {
    const b = e.target.closest('[data-bj]'); if (!b) return;
    const a = b.dataset.bj;
    if (a === 'cerrar') return close();
    if (a === 'guardar') {
      const t = (o.querySelector('#bjtxt') || {}).value || '';
      if (t.trim()) store(K.borradores, (load(K.borradores, []) || []).concat({ id: uid('b'), fecha: new Date().toISOString(), texto: t.trim() }));
      modo = 'guardado'; return paint();
    }
    modo = a; paint();
  });
}
// Al día siguiente: cómo estás, y lo que escribiste anoche.
function bajonAyerHTML() {
  const b = load(K.bajon, null), borr = load(K.borradores, []) || [];
  const pasado = b ? Date.now() - Date.parse(b.fecha) : 0, reciente = !!(b && !b.visto && pasado > 4 * 3600e3 && pasado < 40 * 3600e3); // a partir de la mañana siguiente
  const borrH = borr.filter(x => Date.now() - Date.parse(x.fecha) > 4 * 3600e3); // lo de anoche, cuando ya se ha dormido
  if (!reciente && !borrH.length) return '';
  return `<div class="card bj-ayer">${reciente ? `<h2>Anoche fue duro</h2><p class="sub">Hoy toca agua, descanso y no juzgarte. Si quieres, apunta en el diario cómo fue: ayuda a ver el patrón.</p>
      <div class="row-btns" style="margin-top:0"><button class="pill" data-tipo-dificil>Apuntarlo</button><button class="pill" data-act="bajonvisto">Estoy bien</button></div>` : ''}
    ${borrH.map(x => `<div class="bj-borr"><small>Lo que escribiste el ${fCorta(x.fecha)} a las ${new Date(x.fecha).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}:</small><p>«${esc(x.texto)}»</p><div class="row-btns" style="margin-top:6px"><button class="pill" data-borr="${x.id}" data-acc="copiar">Copiar para mandarlo</button><button class="pill" data-borr="${x.id}" data-acc="borrar">Mejor no, borrar</button></div></div>`).join('')}</div>`;
}

// ---------- Voy a salir ya ----------
const FICHA_TOPES = ['Hoy sin alcohol', 'Hasta 2 copas', 'Hasta 3 copas'];
const FICHA_HORAS = ['01:30', '02:00', '02:30'];
const FICHA_AMIGO = 'Si uno se queda con alguien, el otro hace su vida y nos escribimos. Sin rollos. Y si uno se quiere ir, avisa.';
function fichaHTML() {
  const f = load(K.ficha, null); if (!f || !f.fecha) return '';
  const h = (Date.now() - Date.parse(f.fecha)) / 3600e3; if (h > 16) return '';
  return `<div class="card consejo"><span class="small muted">🌙 Tu ficha de esta noche</span>
    <ul class="gl" style="margin-top:6px">${f.obj ? `<li><b>Objetivo:</b> ${esc(f.obj)}</li>` : ''}${f.tope ? `<li><b>Tope:</b> ${esc(f.tope.toLowerCase())}</li>` : ''}${f.hora ? `<li><b>A las ${esc(f.hora)}</b> decido si me voy. Antes no.</li>` : ''}
    <li><b>Si me agobio:</b> aire fuera cinco minutos, y vuelvo o me voy. Las dos valen.</li><li><b>Si me comparo:</b> mi terreno es conversar. Vuelvo al objetivo.</li><li><b>Si me dicen que no:</b> «¡Que pases buena noche!» y vuelvo con los míos.</li></ul>
    <div class="row-btns"><button class="pill" data-act="ahora">Estoy fuera ahora</button><button class="pill" data-act="fichacopy">Copiar mensaje para mi amigo</button></div>
    <p class="small muted" style="margin-top:8px">Al volver: apunta tres cosas que sí hiciste.</p></div>`;
}
function openSalir() {
  const o = document.createElement('div'); o.className = 'sos-full'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-label', 'Voy a salir ya');
  document.body.appendChild(o); document.body.style.overflow = 'hidden';
  const frases = (load(K.frases, null) || FRASES_SALIR).slice(0, 3);
  let paso = 0, obj = '', tope = '', hora = '';
  const close = () => { clearTimeout(sosTimer); o.remove(); document.body.style.overflow = ''; };
  const paint = () => {
    clearTimeout(sosTimer);
    let body;
    if (paso === 0) body = `<h3 class="sl-h">Tu objetivo de hoy</h3><p>Uno solo, pequeño y que dependa de ti.</p><div class="sl-obj">${OBJETIVOS_SALIR.map(x => `<button class="${obj === x ? 'on' : ''}" data-obj="${esc(x)}">${esc(x)}</button>`).join('')}</div>`;
    else if (paso === 1) body = `<h3 class="sl-h">Tus tres frases</h3><p>Por si te quedas en blanco. Puedes cambiarlas.</p>${frases.map((f, k) => `<input class="sl-in" data-fr="${k}" value="${esc(f)}">`).join('')}`;
    else if (paso === 2) body = `<h3 class="sl-h">Tu ficha de esta noche</h3><p>Lo decides ahora, con la cabeza fría. Luego no hay que pensarlo.</p><p class="sl-q">Tope de bebida</p><div class="sl-obj">${FICHA_TOPES.map(x => `<button class="${tope === x ? 'on' : ''}" data-tope="${esc(x)}">${esc(x)}</button>`).join('')}</div><p class="sl-q">Hora en la que decido si me voy</p><div class="sl-obj">${FICHA_HORAS.map(x => `<button class="${hora === x ? 'on' : ''}" data-hora="${esc(x)}">${esc(x)}</button>`).join('')}</div>`;
    else if (paso === 3) body = `<div class="breath"><b>Prepárate</b></div><p id="ronda">Tres respiraciones</p>`;
    else body = `<h3 class="sl-h">Vamos</h3><div class="recuerda">${obj ? `<div><b>Tu objetivo:</b> ${esc(obj)}</div>` : ''}${tope ? `<div><b>Tope:</b> ${esc(tope.toLowerCase())}</div>` : ''}${hora ? `<div><b>A las ${esc(hora)}</b> decides si te vas, no antes.</div>` : ''}<div>No tiene que salir perfecto. Con hacer tu objetivo, la noche ya ha salido bien.</div><div>Si te agobias: sal cinco minutos, respira y vuelve o vete. Las dos cosas están bien.</div><div>Mañana, apunta cómo fue.</div></div>`;
    o.innerHTML = `<button class="x" data-sl="cerrar">Cerrar</button><div class="sos-body">${body}</div>
      <div class="sos-foot"><button class="btn" data-sl="${paso < 4 ? 'sig' : 'fin'}">${paso < 4 ? 'Siguiente' : 'Me voy'}</button></div>`;
    if (paso === 3) {
      let k = 0, r = 0; const ph = [['Coge aire', 4000, 1], ['Aguanta', 2000, 1], ['Suéltalo despacio', 6000, .55]];
      const step = () => { const c = o.querySelector('.breath'); if (!c) return; const [t, d, sc] = ph[k]; c.style.setProperty('--d', d + 'ms'); c.style.setProperty('--s', sc); c.querySelector('b').textContent = t; sosTimer = setTimeout(() => { k = (k + 1) % 3; if (!k) { r++; const el = o.querySelector('#ronda'); if (el) el.textContent = r < 3 ? `Respiración ${r + 1} de 3` : 'Ya está. Cuando quieras.'; if (r >= 3) return; } step(); }, d); };
      setTimeout(step, 300);
    }
  };
  paint();
  o.addEventListener('click', e => {
    const b = e.target.closest('[data-obj]'); if (b) { obj = b.dataset.obj; return paint(); }
    const bt = e.target.closest('[data-tope]'); if (bt) { tope = bt.dataset.tope; return paint(); }
    const bh = e.target.closest('[data-hora]'); if (bh) { hora = bh.dataset.hora; return paint(); }
    const s2 = e.target.closest('[data-sl]'); if (!s2) return;
    if (paso === 1) { o.querySelectorAll('[data-fr]').forEach(i => { frases[+i.dataset.fr] = i.value; }); store(K.frases, frases); }
    if (s2.dataset.sl === 'cerrar') return close();
    if (s2.dataset.sl === 'sig') { paso++; return paint(); }
    store(K.ficha, { fecha: new Date().toISOString(), obj, tope, hora });
    close(); toast('Disfruta. Mañana apunta cómo fue.'); render();
  });
}

// ---------- modo ensayo ----------
function openEnsayo() {
  const todas = GUIA.flatMap(g => g.items);
  let g = todas[Math.floor(Math.random() * todas.length)], visto = false;
  const v = sheet('', 'guia');
  const paint = (resp) => {
    v.querySelector('.sheet').innerHTML = `<div class="grab"></div><span class="small muted">✍️ Modo ensayo</span><h2>${esc(g.titulo)}</h2><p>${esc(g.pasa)}</p>
      <label class="f"><span>¿Qué dirías o harías tú?</span><textarea id="ens" rows="4" placeholder="Escríbelo con tus palabras, como si estuvieras ahí">${esc(resp || '')}</textarea></label>
      ${visto ? `<h3 class="gh">Lo que dice la guía</h3><ul class="gl">${g.hacer.map(t => `<li>${esc(t)}</li>`).join('')}</ul>${g.ejemplos.length ? `<div class="gej">${g.ejemplos.map(t => `<div>${esc(t)}</div>`).join('')}</div>` : ''}<p class="small muted">Tu respuesta se ha guardado en «Mi nota» de esta situación.</p>` : ''}
      <div class="acts"><button class="btn ghost" data-close>Cerrar</button><span class="sp"></span>${visto ? '<button class="btn" data-ens="otra">Otra situación</button>' : '<button class="btn" data-ens="ver">Comparar con la guía</button>'}</div>`;
  };
  paint();
  v.addEventListener('click', e => {
    const b = e.target.closest('[data-ens]'); if (!b) return;
    if (b.dataset.ens === 'ver') {
      const r = v.querySelector('#ens').value.trim(); if (!r) return toast('Escribe primero qué harías.');
      const n = load(K.notas, {}) || {}; n[g.id] = ((n[g.id] ? n[g.id] + '\n' : '') + 'Ensayo: ' + r).slice(-1500); store(K.notas, n);
      visto = true; return paint(r);
    }
    g = todas[Math.floor(Math.random() * todas.length)]; visto = false; paint();
  });
}

// ---------- mis situaciones ----------
function openMia(id) {
  const l = load(K.mias, []) || [], m = l.find(x => x.id === id) || {};
  const v = sheet(`<h2>${id ? 'Mi situación' : 'Una situación mía'}</h2><p class="muted">Algo que te haya pasado de verdad, para aprender de ello. Solo lo ves tú.</p>
    <label class="f"><span>¿Qué fue?</span><input type="text" id="mt" value="${esc(m.titulo || '')}" placeholder="Una noche de fiesta con amigos" autocomplete="off"></label>
    <label class="f"><span>¿Qué pasó?</span><textarea id="mp" rows="3">${esc(m.paso || '')}</textarea></label>
    <label class="f"><span>¿Qué hiciste y cómo te sentiste?</span><textarea id="mh" rows="3">${esc(m.hice || '')}</textarea></label>
    <label class="f"><span>¿Qué harás la próxima vez?</span><small>Mira si alguna situación de la guía se parece.</small><textarea id="mx" rows="3">${esc(m.prox || '')}</textarea></label>
    <div class="acts">${id ? '<button class="btn ghost" data-mdel>Borrar</button>' : '<button class="btn ghost" data-close>Cancelar</button>'}<span class="sp"></span><button class="btn" data-mok>Guardar</button></div>`);
  v.addEventListener('click', e => {
    if (e.target.closest('[data-mdel]')) { if (!confirm('¿Borrar esta situación?')) return; store(K.mias, l.filter(x => x.id !== id)); v.remove(); render(); return; }
    if (!e.target.closest('[data-mok]')) return;
    const t = v.querySelector('#mt').value.trim(); if (!t) return v.querySelector('#mt').focus();
    const o = { id: id || uid('m'), fecha: m.fecha || new Date().toISOString(), titulo: t, paso: v.querySelector('#mp').value.trim(), hice: v.querySelector('#mh').value.trim(), prox: v.querySelector('#mx').value.trim() };
    store(K.mias, id ? l.map(x => x.id === id ? o : x) : l.concat(o)); v.remove(); render(); toast('Guardada');
  });
}

// ---------- resúmenes ----------
function datosDesde(desde) {
  const d = diario().filter(e => e.fecha >= desde);
  const ans = d.filter(e => e.ansiedad != null).map(e => e.ansiedad);
  const retos = allRetos().flatMap(r => veces(r.id).filter(v => v.fecha >= desde).map(v => Object.assign({ r }, v)));
  const planes = salidas().filter(x => x.fin && x.fin >= desde);
  const leido = Object.entries(leidas()).filter(([, f]) => f >= desde).length;
  return { d, ans, media: ans.length ? Math.round(ans.reduce((a, b) => a + b, 0) / ans.length * 10) / 10 : null, retos, planes, leido };
}
function resumenSemanaHTML() {
  const ahora = Date.now(), a = datosDesde(new Date(ahora - 7 * 864e5).toISOString()), b = datosDesde(new Date(ahora - 14 * 864e5).toISOString());
  const prevMedia = (() => { const x = b.d.filter(e => e.fecha < new Date(ahora - 7 * 864e5).toISOString() && e.ansiedad != null).map(e => e.ansiedad); return x.length ? Math.round(x.reduce((p, q) => p + q, 0) / x.length * 10) / 10 : null; })();
  const fila = (n, t) => `<div><b>${n}</b><small>${t}</small></div>`;
  return `<div class="card"><h2>Últimos 7 días</h2><div class="stats" style="margin-top:8px">${fila(a.retos.length, 'retos')}${fila(a.planes.filter(x => x.fue).length, 'planes')}${fila(a.leido, 'lecturas')}${fila(a.media != null ? a.media : '–', 'ansiedad media')}</div>
    ${a.media != null && prevMedia != null ? `<p class="small muted" style="margin:10px 0 0">${a.media < prevMedia ? `Tu ansiedad media ha bajado (antes ${prevMedia}).` : a.media > prevMedia ? `Esta semana la ansiedad ha estado algo más alta (antes ${prevMedia}). Es normal que haya semanas así.` : 'Tu ansiedad media está igual que la semana anterior.'}</p>` : ''}</div>`;
}
function textoResumen() {
  const desde = new Date(Date.now() - 30 * 864e5).toISOString(), a = datosDesde(desde), L = [];
  L.push('RESUMEN DE LOS ÚLTIMOS 30 DÍAS (Cimientos)', '');
  L.push('Ansiedad media en los registros: ' + (a.media != null ? a.media + ' de 10' : 'sin datos'));
  L.push('', 'Retos hechos (' + a.retos.length + '):');
  a.retos.forEach(v => L.push('· ' + v.r.titulo + (v.antes != null && v.despues != null ? ` (miedo esperado ${v.antes}, real ${v.despues})` : '') + (v.temo ? ' · Temía: ' + v.temo : '') + (v.nota ? ' · ' + v.nota : '')));
  L.push('', 'Planes (' + a.planes.length + '):');
  a.planes.forEach(x => L.push('· ' + tipoPlan(x.tipo).titulo + ': ' + (x.fue ? 'fui' + (x.antes != null && x.despues != null ? ` (miedo esperado ${x.antes}, real ${x.despues})` : '') + (x.bien ? ' · Salió bien: ' + x.bien : '') : 'al final no fui')));
  const pens = a.d.filter(e => e.pens);
  if (pens.length) { L.push('', 'Pensamientos revisados:'); pens.forEach(e => L.push('· ' + (e.pens.situ || '') + ' → «' + (e.pens.pensado || '') + '»' + (e.pens.cree != null ? ` (me lo creía ${e.pens.cree}` + (e.pens.ahora != null ? `, luego ${e.pens.ahora}` : '') + ')' : ''))); }
  const dif = a.d.filter(e => e.tipo === 'dificil' && e.texto);
  if (dif.length) { L.push('', 'Momentos difíciles:'); dif.forEach(e => L.push('· ' + fCorta(e.fecha) + ': ' + e.texto)); }
  const vic = a.d.filter(e => e.tipo === 'victoria' && e.texto);
  if (vic.length) { L.push('', 'Victorias:'); vic.forEach(e => L.push('· ' + fCorta(e.fecha) + ': ' + e.texto)); }
  const ex = lista(K.exp).filter(e => e.res && e.fres >= desde);
  if (ex.length) { L.push('', 'Experimentos (' + ex.length + '):'); ex.forEach(e => L.push('· Creía: «' + e.cre + '» (' + e.prob + ' %) → ' + EXP_RES[e.res] + (e.paso ? '. Pasó: ' + e.paso : '') + (e.apr ? '. Aprendí: ' + e.apr : ''))); }
  const pr = lista(K.pruebas).filter(p => p.fecha >= desde);
  if (pr.length) { L.push('', 'Pruebas contra mi creencia (' + pr.length + '):'); pr.forEach(p => L.push('· ' + p.texto)); }
  const cr = load(K.creencia, null);
  if (cr && (cr.hist || []).length) L.push('', 'Cuánto me creo «' + (cr.vieja || '') + '» (0-100): ' + cr.hist.slice(-8).map(h => h.v).join(' → '));
  const ter = terapia().filter(t => !t.hecho);
  if (ter.length) { L.push('', 'Lo que quiero hablar en sesión:'); ter.forEach(t => L.push('· ' + t.texto)); }
  return L.join('\n');
}
function openResumen() {
  const t = textoResumen();
  const v = sheet(`<h2>Resumen para tu psicóloga</h2><p class="muted">Los últimos 30 días. Revísalo antes: puedes borrar lo que no quieras compartir.</p>
    <textarea id="rest" rows="14">${esc(t)}</textarea>
    <div class="acts"><button class="btn ghost" data-close>Cerrar</button><span class="sp"></span><button class="btn soft" data-rcopy>Copiar</button>${navigator.share ? '<button class="btn" data-rshare>Compartir</button>' : ''}</div>`);
  v.addEventListener('click', async e => {
    const txt = v.querySelector('#rest').value;
    if (e.target.closest('[data-rcopy]')) { try { await navigator.clipboard.writeText(txt); toast('Copiado'); } catch (er) { v.querySelector('#rest').select(); } }
    if (e.target.closest('[data-rshare]')) { try { await navigator.share({ title: 'Resumen', text: txt }); } catch (er) {} }
  });
}

function openCarta() {
  const v = sheet(`<h2>Carta para ti</h2><p class="muted">Escribe lo que ya has conseguido, lo que has superado y lo que te dirías en un mal día. Saldrá en «Un momento difícil» › Recordar.</p>
    <textarea id="cartat" rows="10" placeholder="Este año he conseguido…&#10;Me acuerdo de cuando…&#10;Si te sientes mal, recuerda que…">${esc(load(K.carta, '') || '')}</textarea>
    <div class="acts"><span class="sp"></span><button class="btn" data-cartaok>Guardar</button></div>`);
  v.addEventListener('click', e => { if (e.target.closest('[data-cartaok]')) { store(K.carta, v.querySelector('#cartat').value.trim()); v.remove(); toast('Guardada. La tienes en «Un momento difícil».'); } });
}
// Un consejo al día, de lo que has elegido en «Para ti».
function consejoHoy() {
  const sel = load(K.perfil, []) || [], all = PERFIL.filter(p => sel.includes(p.id)).flatMap(p => p.consejos);
  if (!all.length) return null;
  const d = new Date(); return all[(d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate()) % all.length];
}
function openLeccion(id) {
  const l = LECCIONES.find(x => x.id === id); if (!l) return;
  let i = 0;
  const v = sheet('');
  const paint = () => {
    const [t, p] = l.tarjetas[i], last = i === l.tarjetas.length - 1;
    v.querySelector('.sheet').innerHTML = `<div class="grab"></div><div class="lcard"><div class="sh-top"><span class="n">${l.icono} ${esc(l.titulo)} · ${i + 1} de ${l.tarjetas.length}</span>${vozBtn()}</div><h3>${esc(t)}</h3><p>${esc(p)}</p></div>
      <div class="dots">${l.tarjetas.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('')}</div>
      <div class="acts">${i ? '<button class="btn ghost" data-l="prev">Atrás</button>' : '<button class="btn ghost" data-close>Cerrar</button>'}<span class="sp"></span><button class="btn" data-l="${last ? 'fin' : 'next'}">${last ? 'Terminar' : 'Siguiente'}</button></div>`;
  };
  paint();
  v.addEventListener('click', e => {
    const b = e.target.closest('[data-l]'); if (!b) return;
    if (b.dataset.l === 'prev') i--; else if (b.dataset.l === 'next') i++;
    else { const L = leidas(); L[id] = new Date().toISOString(); store(K.lecciones, L); v.remove(); render(); return toast('Leída. Puedes volver cuando quieras.'); }
    paint();
  });
  let x0 = null;
  v.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  v.addEventListener('touchend', e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) < 50) return; if (dx < 0 && i < l.tarjetas.length - 1) i++; else if (dx > 0 && i > 0) i--; else return; paint(); });
}
function openGuia(id) {
  const s = GUIA.flatMap(g => g.items).find(x => x.id === id); if (!s) return;
  const ya = propios().some(r => r.titulo === s.practica);
  const v = sheet(`<div class="sh-top"><span class="small muted">Guía de situaciones</span><span>${vozBtn()}${favBtn(s.id)}</span></div><h2>${esc(s.titulo)}</h2>
    <h3 class="gh">Lo que suele pasar</h3><p>${esc(s.pasa)}</p>
    <h3 class="gh">${esc(s.hacerTitulo || 'Qué puedes hacer')}</h3>${s.hacer.length > 1 ? `<ul class="gl">${s.hacer.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : `<p>${esc(s.hacer[0])}</p>`}
    ${adaptaHTML(temaGuia(s.id))}
    ${s.ejemplos.length ? `<div class="gej">${s.ejemplos.map(t => `<div>${esc(t)}</div>`).join('')}</div>` : ''}${s.cierre ? `<p>${esc(s.cierre)}</p>` : ''}
    ${(s.extra || []).map(([h, c]) => `<h3 class="gh">${esc(h)}</h3>${Array.isArray(c) ? `<ul class="gl">${c.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : `<p>${esc(c)}</p>`}`).join('')}
    <h3 class="gh">Si sale regular</h3><p>${esc(s.sale)}</p>
    <label class="f"><span>Mi nota</span><textarea data-nota="${s.id}" rows="2" placeholder="Lo que quieras recordar de esto, o cómo te fue">${esc((load(K.notas, {}) || {})[s.id] || '')}</textarea></label>
    <div class="quiet" style="margin-top:14px"><b>Para practicar:</b> ${esc(s.practica.charAt(0).toLowerCase() + s.practica.slice(1))}.</div>
    <div class="acts"><button class="btn soft" data-g="reto" ${ya ? 'disabled style="opacity:.5"' : ''}>${ya ? 'Ya está en tus retos' : 'Añadirlo a mis retos'}</button><span class="sp"></span><button class="btn" data-g="leido">Leída</button></div>`, 'guia');
  v.addEventListener('click', e => {
    if (e.target.closest('[data-parati]')) { v.remove(); return openParaTi(); }
    const b = e.target.closest('[data-g]'); if (!b || b.disabled) return;
    if (b.dataset.g === 'reto') { store(K.propios, propios().concat({ id: uid('p'), titulo: s.practica, descripcion: 'De la guía: ' + s.titulo })); b.disabled = true; b.style.opacity = '.5'; b.textContent = 'Ya está en tus retos'; return toast('Añadido a tus retos'); }
    const L = leidas(); L[id] = new Date().toISOString(); store(K.lecciones, L); v.remove(); render();
  });
}
function openTrampas() {
  sheet(`<h2>Trampas del pensamiento</h2><p class="muted">Con ansiedad, la cabeza cae en estas. Ponerles nombre ya les quita fuerza.</p>
    ${TRAMPAS.map(([, n, d]) => `<div class="lrow"><span class="b"><b>${esc(n)}</b><small>${esc(d)}</small></span></div>`).join('')}
    <div class="acts"><span class="sp"></span><button class="btn" data-close>Entendido</button></div>`);
}

// ---------- CALMA AHORA ----------
let sosTimer = null;
function openSOS() {
  const o = document.createElement('div'); o.className = 'sos-full'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-label', 'Calma ahora');
  document.body.appendChild(o); document.body.style.overflow = 'hidden';
  let modo = 'respira', paso = 0;
  const close = () => { clearTimeout(sosTimer); o.remove(); document.body.style.overflow = ''; };
  const ATERRIZA = [[5, 'cosas que ves', 'Míralas de una en una y nómbralas por dentro.'], [4, 'cosas que puedes tocar', 'La ropa, la silla, tus manos. Nota su textura.'], [3, 'cosas que oyes', 'Cerca y lejos. Sin juzgarlas.'], [2, 'cosas que hueles', 'Aunque sea poco. Si no hueles nada, imagina dos olores que te gusten.'], [1, 'cosa que saboreas', 'O simplemente nota tu boca.']];
  const RECUERDA = ['Esto es ansiedad. Es muy desagradable, pero no es peligrosa.', 'Sube, llega arriba y baja. Siempre baja, aunque no hagas nada.', 'Se te nota mucho menos de lo que sientes por dentro.', 'No tienes que hacerlo perfecto. Con quedarte ya es suficiente.', 'Puedes irte si lo necesitas. No pasa nada: lo intentarás otro día.'];
  const breathe = () => {
    const ph = [['Coge aire', 4000, 1], ['Aguanta', 2000, 1], ['Suéltalo despacio', 6000, .55]];
    let k = 0, ronda = 0;
    const step = () => {
      const c = o.querySelector('.breath'); if (!c) return;
      const [t, d, s] = ph[k]; c.style.setProperty('--d', d + 'ms'); c.style.setProperty('--s', s); c.querySelector('b').textContent = t;
      sosTimer = setTimeout(() => { k = (k + 1) % 3; if (!k) { ronda++; const r = o.querySelector('#ronda'); if (r) r.textContent = ronda < 6 ? `Respiración ${ronda + 1} de 6` : 'Sigue el tiempo que quieras'; } step(); }, d);
    };
    setTimeout(step, 400);
  };
  const paint = () => {
    clearTimeout(sosTimer);
    let body;
    if (modo === 'respira') body = `<div class="breath"><b>Prepárate</b></div><p id="ronda">Respiración 1 de 6</p><p>Suelta el aire más largo de lo que lo coges. Con eso el cuerpo empieza a frenar.</p>`;
    else if (modo === 'aterriza') { const [n, t, d] = ATERRIZA[paso]; body = `<div class="ground"><div class="num">${n}</div><h3>${t}</h3></div><p>${d}</p><div class="row-btns">${paso < ATERRIZA.length - 1 ? '<button class="btn" data-s="sig">Siguiente</button>' : '<button class="btn" data-s="otra">Otra vez</button>'}</div>`; }
    else { const ct = load(K.carta, ''); body = `<div class="recuerda">${ct ? `<div class="carta"><b>Tu carta</b><br>${esc(ct).replace(/\n/g, '<br>')}</div>` : ''}${RECUERDA.map(t => `<div>${esc(t)}</div>`).join('')}</div>`; }
    o.innerHTML = `<button class="x" data-s="cerrar">Cerrar</button>
      <div class="seg">${[['respira', 'Respirar'], ['aterriza', 'Aterrizar'], ['recuerda', 'Recordar']].map(([k, n]) => `<button class="${modo === k ? 'on' : ''}" data-modo="${k}">${n}</button>`).join('')}</div>
      <div class="sos-body">${body}</div>
      <div class="sos-foot"><button class="btn" data-s="apuntar" style="margin-bottom:12px">Apuntar cómo ha ido</button><br>Si estás muy mal y es algo más que nervios: <b>024</b>, gratis y a cualquier hora.</div>`;
    if (modo === 'respira') breathe();
  };
  paint();
  o.addEventListener('click', e => {
    const m = e.target.closest('[data-modo]'); if (m) { modo = m.dataset.modo; paso = 0; return paint(); }
    const s = e.target.closest('[data-s]'); if (!s) return;
    if (s.dataset.s === 'cerrar') close();
    else if (s.dataset.s === 'sig') { paso++; paint(); }
    else if (s.dataset.s === 'otra') { paso = 0; paint(); }
    else if (s.dataset.s === 'apuntar') { close(); ui.tipo = 'dificil'; goTab('diario'); }
  });
}

// ---------- RECORRIDO ----------
function chartHTML() {
  const l = diario().filter(e => e.animo != null || e.ansiedad != null).slice(0, 30).reverse();
  if (l.length < 2) return '<p class="vacio" style="padding:10px 0">Cuando tengas unos cuantos check-ins con números, aquí verás cómo van.</p>';
  const W = 300, H = 110, x = i => 6 + i * (W - 12) / (l.length - 1), y = v => H - 8 - (v - 1) * (H - 16) / 9;
  const line = (k, c) => { const pts = l.map((e, i) => e[k] != null ? `${x(i).toFixed(1)},${y(e[k]).toFixed(1)}` : null).filter(Boolean); return pts.length > 1 ? `<polyline points="${pts.join(' ')}" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>` : ''; };
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Tu ansiedad en los últimos registros"><line x1="0" x2="${W}" y1="${y(5.5)}" y2="${y(5.5)}" stroke="currentColor" stroke-opacity=".1" stroke-dasharray="3 4"/>${line('ansiedad', 'var(--warm)')}${line('animo', 'var(--accent)')}</svg>
    <div class="leg"><span><i style="background:var(--warm)"></i>Ansiedad</span>${l.some(e => e.animo != null) ? '<span><i style="background:var(--accent)"></i>Ánimo (registros antiguos)</span>' : ''}<span style="margin-left:auto">${fCorta(l[0].fecha)} – ${fCorta(l[l.length - 1].fecha)}</span></div></div>`;
}
function vProgreso() {
  const d = diario(), vs = conNumeros();
  const totalVeces = allRetos().reduce((a, r) => a + veces(r.id).length, 0);
  const dias = new Set(d.map(e => dayKey(e.fecha))).size;
  const avg = k => vs.length ? Math.round(vs.reduce((a, v) => a + v[k], 0) / vs.length * 10) / 10 : 0;
  const tl = [];
  d.filter(e => e.tipo === 'victoria').forEach(e => tl.push([e.fecha, '⭐', e.texto || 'Una victoria']));
  allRetos().forEach(r => veces(r.id).forEach(v => tl.push([v.fecha, '✓', r.titulo])));
  salidas().filter(x => x.fin && x.fue).forEach(x => tl.push([x.fin, tipoPlan(x.tipo).icono, 'Fuiste: ' + tipoPlan(x.tipo).titulo.toLowerCase()]));
  Object.keys(leidas()).forEach(id => { const l = LECCIONES.find(x => x.id === id) || GUIA.flatMap(g => g.items).find(x => x.id === id); if (l) tl.push([leidas()[id], '📖', 'Leíste «' + l.titulo + '»']); });
  tl.sort((a, b) => a[0] < b[0] ? 1 : -1);
  return `<div class="top"><h1>Recorrido</h1><p>Para mirar atrás y ver lo que ya has hecho. No para compararte con nadie.</p></div>
    <div class="stats" style="margin-bottom:12px"><div><b>${totalVeces}</b><small>retos hechos</small></div><div><b>${d.filter(e => e.tipo === 'victoria').length}</b><small>victorias</small></div><div><b>${dias}</b><small>días escritos</small></div></div>
    <div class="card"><h2>Lo que temías y lo que pasó</h2>
      ${vs.length ? `<div class="compare"><div><small>Miedo que esperabas</small><b>${avg('antes')}</b><div class="bar"><i style="width:${avg('antes') * 10}%"></i></div></div><div><small>Miedo que hubo</small><b>${avg('despues')}</b><div class="bar"><i style="width:${avg('despues') * 10}%"></i></div></div></div>
        ${vs.slice(0, 5).map(v => `<div class="tf"><span>${esc(v.r.titulo)}</span><span>${v.antes} → ${v.despues}</span></div>`).join('')}
        <p class="small muted" style="margin:10px 0 0">${avg('despues') < avg('antes') ? 'De media, el miedo de antes ha sido más grande que lo que pasó. Acuérdate cuando dudes.' : 'Has hecho cosas aunque daban miedo. Eso es lo que cuenta.'}</p>`
      : '<p class="sub" style="margin:0">Cuando hagas un reto apuntando el miedo de antes y el de después, aquí verás la diferencia.</p>'}</div>
    ${resumenSemanaHTML()}
    <div class="card"><h2>Tu ansiedad</h2>${chartHTML()}</div>
    <button class="btn soft full" data-act="resumen" style="margin-bottom:12px">📄 Resumen para tu psicóloga</button>
    <div class="card"><h2>Lo que has hecho</h2>${tl.length ? tl.slice(0, 25).map(([f, i, t]) => `<div class="tl"><span class="d">${fCorta(f)}</span><span>${i} ${esc(t)}</span></div>`).join('') : '<p class="vacio">Aquí irán apareciendo tus victorias, retos y lecturas.</p>'}</div>
    ${expStatsHTML()}
    ${syncCardHTML()}
    <div class="card"><h2>PIN</h2><p class="sub">${load(K.pin, null) ? 'Cimientos pide el PIN al abrirla y al volver después de un minuto fuera.' : 'Para que nadie más pueda abrir Cimientos en tu móvil.'}</p>
      <div class="row-btns" style="margin-top:0"><button class="btn soft" data-act="pinset">${load(K.pin, null) ? 'Cambiar PIN' : 'Poner un PIN'}</button>${load(K.pin, null) ? '<button class="btn ghost" data-act="pinquitar">Quitar</button>' : ''}</div></div>
    <div class="card"><h2>Tus datos</h2><p class="sub">Todo se queda en este móvil. Si cambias de móvil o borras Safari, se pierde: guarda una copia de vez en cuando.</p>
      <div class="row-btns" style="margin-top:0"><button class="btn soft" data-act="exportar">Descargar copia</button><button class="btn soft" data-act="importar">Restaurar copia</button><input type="file" id="fimp" accept=".json,application/json" hidden></div></div>`;
}
function exportar() {
  const o = { app: 'cimientos', v: 2, fecha: new Date().toISOString() };
  for (const [k, key] of Object.entries(K)) o[k] = load(key, null);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(o)], { type: 'application/json' }));
  a.download = 'cimientos-' + hoyKey() + '.json'; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function importar(file) {
  const r = new FileReader();
  r.onload = () => {
    let o; try { o = JSON.parse(r.result); } catch (e) { return toast('Ese archivo no es una copia de Cimientos.'); }
    if (!o || o.app !== 'cimientos') return toast('Ese archivo no es una copia de Cimientos.');
    if (!confirm('Esto reemplaza lo que hay ahora en la app por la copia. ¿Seguir?')) return;
    for (const [k, key] of Object.entries(K)) if (o[k] != null) store(key, o[k]);
    render(); toast('Copia restaurada');
  };
  r.readAsText(file);
}

// ---------- eventos ----------
document.addEventListener('click', e => {
  const t = e.target;
  let x;
  if ((x = t.closest('#tabnav [data-tab]'))) return goTab(x.dataset.tab);
  if ((x = t.closest('[data-nivel]'))) { const n = $('cknota'); if (n) ui.cknota = n.value; ui.nivel = ui.nivel === +x.dataset.nivel ? null : +x.dataset.nivel; return render(); }
  if ((x = t.closest('#app [data-scale]'))) {
    const k = x.dataset.scale, v = +x.dataset.v;
    const tx = $('txt'); if (tx) ui.txt = tx.value;
    document.querySelectorAll('[data-pens]').forEach(a => { ui.pens[a.dataset.pens] = a.value; });
    if (k === 'animo' || k === 'ansiedad') ui[k] = ui[k] === v ? null : v; else ui.pens[k] = ui.pens[k] === v ? null : v;
    const y = scrollY; render(); scrollTo(0, y); return;
  }
  if ((x = t.closest('[data-trampa]'))) {
    document.querySelectorAll('[data-pens]').forEach(a => { ui.pens[a.dataset.pens] = a.value; });
    const k = x.dataset.trampa; ui.trampas = ui.trampas.includes(k) ? ui.trampas.filter(z => z !== k) : ui.trampas.concat(k);
    const y = scrollY; render(); scrollTo(0, y); return;
  }
  if ((x = t.closest('[data-tipo]'))) { const tx = $('txt'); if (tx) ui.txt = tx.value; ui.tipo = x.dataset.tipo; return render(); }
  if ((x = t.closest('[data-filtro]'))) { const tx = $('txt'); if (tx) ui.txt = tx.value; ui.filtro = x.dataset.filtro; const y = scrollY; render(); scrollTo(0, y); return; }
  if ((x = t.closest('#app [data-reto]'))) return openReto(x.dataset.reto);
  if ((x = t.closest('#app [data-lec]'))) return openLeccion(x.dataset.lec);
  if ((x = t.closest('[data-voz]'))) { const sh = x.closest('.sheet'); if (vozActiva()) { vozParar(); x.textContent = '🔊 Escuchar'; } else { vozLeer(sh, () => { x.textContent = '🔊 Escuchar'; }); x.textContent = '⏹ Parar'; } return; }
  if ((x = t.closest('#app [data-mia]'))) return openMia(x.dataset.mia);
  if ((x = t.closest('[data-borr]'))) {
    const id = x.dataset.borr, acc = x.dataset.acc, l = load(K.borradores, []) || [], b = l.find(z => z.id === id); if (!b) return;
    if (acc === 'copiar') { try { navigator.clipboard.writeText(b.texto); toast('Copiado. Ahora decides tú, con calma.'); } catch (e) {} return; }
    store(K.borradores, l.filter(z => z.id !== id)); render(); return toast(acc === 'borrar' ? 'Borrado. Bien pensado.' : 'Guardado en tu diario');
  }
  if (t.closest('[data-tipo-dificil]')) { store(K.bajon, Object.assign({}, load(K.bajon, {}), { visto: true })); ui.tipo = 'dificil'; return goTab('diario'); }
  if ((x = t.closest('#app [data-simesc]'))) return openSim(x.dataset.simesc);
  if ((x = t.closest('#app [data-p8exp]'))) return openExp({ cre: x.dataset.p8exp });
  if ((x = t.closest('#app [data-p8]'))) { const p = load(K.plan8, null); if (!p) return; const h = Object.assign({}, p.hecho); h[x.dataset.p8] = !h[x.dataset.p8]; store(K.plan8, Object.assign({}, p, { hecho: h })); const y = scrollY; render(); scrollTo(0, y); return; }
  if ((x = t.closest('[data-semck]'))) { const w = semana(); w.hecho = Object.assign({}, w.hecho, { [x.dataset.semck]: !(w.hecho || {})[x.dataset.semck] }); store(K.semana, w); const y = scrollY; render(); scrollTo(0, y); return; }
  if ((x = t.closest('[data-fav]'))) { const id = x.dataset.fav, f = favs(); store(K.favs, f.includes(id) ? f.filter(z => z !== id) : f.concat(id)); x.outerHTML = favBtn(id); if (tab === 'aprender' && !document.querySelector('.veil')) render(); return; }
  if ((x = t.closest('#app [data-guia]'))) return openGuia(x.dataset.guia);
  if ((x = t.closest('#app [data-doc]'))) return openDoc(x.dataset.doc);
  if ((x = t.closest('#app [data-planver]'))) return openPlan(x.dataset.planver);
  if ((x = t.closest('#app [data-plancierre]'))) return openPlanCierre(x.dataset.plancierre);
  if ((x = t.closest('[data-ter]'))) {
    const id = x.dataset.ter, l = terapia().map(z => z.id === id ? Object.assign({}, z, { hecho: true }) : z); store(K.terapia, l); render();
    return toast('Marcado como hablado', () => { store(K.terapia, terapia().map(z => z.id === id ? Object.assign({}, z, { hecho: false }) : z)); render(); });
  }
  if ((x = t.closest('[data-aterapia]'))) {
    const id = x.dataset.aterapia, l = terapia(), ya = l.find(z => z.entrada === id && !z.hecho);
    if (ya) store(K.terapia, l.filter(z => z !== ya));
    else { const en = diario().find(z => z.id === id); store(K.terapia, l.concat({ id: uid('t'), entrada: id, fecha: new Date().toISOString(), texto: (en && (en.texto || (en.pens && en.pens.pensado) || TIPOS[en.tipo])) || 'Una entrada del diario' })); }
    const y = scrollY; render(); scrollTo(0, y); return;
  }
  if ((x = t.closest('[data-borrar]'))) {
    const id = x.dataset.borrar, l = diario(), i = l.findIndex(z => z.id === id), old = l[i]; if (i < 0) return;
    l.splice(i, 1); store(K.diario, l); const y = scrollY; render(); scrollTo(0, y);
    return toast('Borrado', () => { const l2 = diario(); l2.splice(i, 0, old); store(K.diario, l2); render(); });
  }
  if ((x = t.closest('[data-act]'))) {
    const a = x.dataset.act;
    if (a === 'sos') return openSOS();
    if (a === 'plan') return openPlan();
    if (a === 'parati') return openParaTi();
    if (a === 'carta') return openCarta();
    if (a === 'quiz' || a === 'senales' || a === 'frases') return openQuiz(a);
    if (a === 'salir') return openSalir();
    if (a === 'fichacopy') { try { navigator.clipboard.writeText(FICHA_AMIGO); toast('Copiado'); } catch (er) {} return; }
    if (a === 'bajon') return openBajon();
    if (a === 'ahora') return openAhora();
    if (a === 'tips') return openTips();
    if (a === 'sim') return openSim();
    if (a === 'exp') return openExp();
    if (a === 'preg') return openPreg();
    if (a === 'revisor') return openRevisor();
    if (a === 'ven') return openVen();
    if (a === 'pruebas') return openPruebas();
    if (a === 'planes') return openPlanes();
    if (a === 'plan8') return openPlan8();
    if (a === 'retos') return goTab('retos');
    if (a === 'otrotip') { ui.tipOff = (ui.tipOff || 0) + 1; return render(); }
    if (a === 'bajonvisto') { store(K.bajon, Object.assign({}, load(K.bajon, {}), { visto: true })); return render(); }
    if (a === 'ensayo') return openEnsayo();
    if (a === 'mia') return openMia();
    if (a === 'resumen') return openResumen();
    if (a === 'syncme') return syncLink(CS.fromMiEspacio());
    if (a === 'syncscan') return syncScan();
    if (a === 'syncnow') { CS.sync(); const el = $('syncst'); if (el) el.textContent = 'Sincronizando…'; return; }
    if (a === 'synclink') return syncShowQR();
    if (a === 'synccopy') { const i = $('synccodeout'); try { navigator.clipboard.writeText(i.value); toast('Copiado'); } catch (e) { i.select(); } return; }
    if (a === 'syncoff') { if (!confirm('¿Dejar de sincronizar en este dispositivo? Tus datos se quedan aquí.')) return; CS.off(); render(); return; }
    if (a === 'pinset') return pinSetup();
    if (a === 'pinquitar') { if (!confirm('¿Quitar el PIN?')) return; store(K.pin, null); render(); return toast('PIN quitado'); }
    if (a === 'otro') { ui.otro = true; return render(); }
    if (a === 'nootro') { ui.otro = false; ui.nivel = null; ui.cknota = ''; return render(); }
    if (a === 'checkin') {
      if (ui.nivel == null) return;
      const nota = ($('cknota') || {}).value || '';
      const e2 = { id: uid('d'), fecha: new Date().toISOString(), tipo: 'checkin', animo: null, ansiedad: ui.nivel, texto: nota.trim() };
      store(K.diario, [e2].concat(diario())); ui.nivel = null; ui.cknota = ''; ui.otro = false; render();
      return toast('Apuntado', () => { store(K.diario, diario().filter(z => z.id !== e2.id)); render(); });
    }
    if (a === 'otroreto') {
      const all = allRetos().filter(r => !retosHechos()[r.id]), cur = retoAhora(), pool = all.length ? all : allRetos();
      const i = pool.findIndex(r => cur && r.id === cur.id); store(K.foco, pool[(i + 1) % pool.length].id); return render();
    }
    if (a === 'guardar') return guardarEntrada();
    if (a === 'nuevoreto') return nuevoReto();
    if (a === 'pensar') { ui.tipo = 'pensamiento'; return goTab('diario'); }
    if (a === 'trampas') return openTrampas();
    if (a === 'exportar') return exportar();
    if (a === 'importar') return $('fimp').click();
  }
});
document.addEventListener('input', e => {
  if (e.target.dataset && e.target.dataset.nota) { const n = load(K.notas, {}) || {}; n[e.target.dataset.nota] = e.target.value; store(K.notas, n); return; }
  if (e.target.id === 'aq') { aq = e.target.value; const r = aprenderLista(); $('aqres').innerHTML = r; $('aqall').hidden = !!r; return; }
  if (e.target.dataset && e.target.dataset.pens) ui.pens[e.target.dataset.pens] = e.target.value;
  if (e.target.id === 'txt') ui.txt = e.target.value;
});
document.addEventListener('change', e => { if (e.target.id === 'fimp' && e.target.files[0]) { importar(e.target.files[0]); e.target.value = ''; } });
document.addEventListener('submit', e => {
  if (e.target.dataset.form === 'synccode') { e.preventDefault(); const p = CS.parseCode(e.target.querySelector('input').value); if (!p) return toast('Ese código no es válido. Cópialo entero del otro dispositivo.'); return syncLink(p); }
  if (e.target.dataset.form !== 'terapia') return;
  e.preventDefault(); const i = e.target.querySelector('input'), v = i.value.trim(); if (!v) return;
  store(K.terapia, terapia().concat({ id: uid('t'), fecha: new Date().toISOString(), texto: v })); render();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { const s = document.querySelector('.sos-full'); if (s) { clearTimeout(sosTimer); s.remove(); document.body.style.overflow = ''; return; } const v = [...document.querySelectorAll('.veil')].pop(); if (v) v.remove(); } });

// ---------- SINCRONIZAR ----------
function syncTxt() {
  const st = CS.status();
  if (st.busy) return 'Sincronizando…';
  if (st.msg) return '⚠️ ' + st.msg;
  return st.last ? 'Sincronizado ' + new Date(st.last).toLocaleString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
}
function syncCardHTML() {
  const st = CS.status();
  if (st.on) return `<div class="card"><h2>Sincronizar</h2><p class="sub">Lo que hagas aquí aparece en tus otros dispositivos, cifrado. <span id="syncst">${esc(syncTxt())}</span></p>
    <div class="row-btns" style="margin-top:0"><button class="btn soft" data-act="syncnow">Sincronizar ahora</button><button class="btn soft" data-act="synclink">Vincular otro dispositivo</button><button class="btn ghost" data-act="syncoff">Desconectar</button></div><div id="synclinkbox"></div></div>`;
  const me = CS.fromMiEspacio();
  return `<div class="card"><h2>Sincronizar</h2><p class="sub">Para ver lo mismo en el iPhone y en el PC. Va cifrado con una clave que solo tienen tus dispositivos: GitHub solo guarda un bloque ilegible.</p>
    ${me ? '<button class="btn full" data-act="syncme">Activar con la sincronización de Mi Espacio</button><p class="small muted" style="margin:8px 0 0">Usa la misma cuenta que ya tienes en Mi Espacio. Lo de Cimientos va en un archivo aparte.</p>' : `
    <p class="small" style="margin:0 0 8px"><b>En el otro dispositivo</b> (Cimientos o Mi Espacio, donde ya esté activada): <i>Vincular otro dispositivo</i>. Luego aquí, escanea el QR o pega el código.</p>
    <div class="row-btns" style="margin-top:0"><button class="btn" data-act="syncscan">📷 Escanear QR</button></div>
    <form data-form="synccode" style="display:flex;gap:8px;margin-top:10px"><input type="text" name="c" placeholder="O pega el código: MD1.…" autocomplete="off"><button class="btn soft" style="flex:none">Vincular</button></form>
    <p class="small muted" style="margin:8px 0 0">¿No la tienes en ningún sitio? Actívala primero en Mi Espacio (Ajustes › Sincronizar) y vuelve aquí.</p>`}</div>`;
}
async function syncLink(o) {
  toast('Vinculando…');
  try { await CS.link(o); render(); toast('¡Listo! Ya se sincroniza.'); }
  catch (e) { render(); toast(e.message); }
}
const lazy = src => new Promise((ok, ko) => { if (document.querySelector(`script[src="${src}"]`)) return ok(); const t = document.createElement('script'); t.src = src; t.onload = ok; t.onerror = () => ko(new Error('Sin conexión')); document.head.appendChild(t); });
async function syncShowQR() {
  const box = $('synclinkbox'); if (!box) return;
  if (box.innerHTML) { box.innerHTML = ''; return; }
  let svg = '';
  try { await lazy('vendor/qrcode.min.js'); const q = qrcode(0, 'M'); q.addData(CS.code()); q.make(); svg = q.createSvgTag({ cellSize: 4, margin: 0, scalable: true }); } catch (e) {}
  box.innerHTML = `<div class="plan-box" style="text-align:center"><p class="small" style="margin:0 0 10px">En el otro dispositivo, abre Cimientos › Recorrido › Sincronizar › <b>Escanear QR</b> y apunta aquí.</p>
    ${svg ? `<div class="qr">${svg}</div>` : ''}
    <div style="display:flex;gap:8px;margin-top:10px"><input type="text" readonly id="synccodeout" value="${esc(CS.code())}"><button class="btn soft" style="flex:none" data-act="synccopy">Copiar</button></div>
    <p class="small muted" style="margin:8px 0 0">🔑 Este código da acceso a tus datos: no se lo pases a nadie.</p></div>`;
}
let scanStream = null;
async function syncScan() {
  const o = document.createElement('div'); o.className = 'lock scan';
  o.innerHTML = `<div class="lock-in"><h2>Escanear QR</h2><p id="scanmsg">Apunta al QR del otro dispositivo…</p><video id="scanv" playsinline muted></video><button class="lock-x" id="scanx">Cancelar</button></div>`;
  document.body.appendChild(o);
  const close = () => { if (scanStream) scanStream.getTracks().forEach(t => t.stop()); scanStream = null; o.remove(); };
  o.querySelector('#scanx').onclick = close;
  try { await lazy('vendor/jsQR.min.js'); } catch (e) { o.querySelector('#scanmsg').textContent = 'Sin conexión: pega el código a mano.'; return; }
  try { scanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false }); }
  catch (e) { o.querySelector('#scanmsg').textContent = 'No puedo usar la cámara. Dale permiso o pega el código a mano.'; return; }
  const video = o.querySelector('#scanv'); video.srcObject = scanStream; await video.play().catch(() => {});
  const cv = document.createElement('canvas'), ctx = cv.getContext('2d', { willReadFrequently: true });
  const tick = () => {
    if (!scanStream) return;
    if (video.readyState >= 2) {
      const w = Math.min(640, video.videoWidth), hh = Math.round(video.videoHeight * w / video.videoWidth);
      cv.width = w; cv.height = hh; ctx.drawImage(video, 0, 0, w, hh);
      const c = jsQR(ctx.getImageData(0, 0, w, hh).data, w, hh, { inversionAttempts: 'dontInvert' });
      const p = c && CS.parseCode(c.data);
      if (p) { close(); return syncLink(p); }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
CS.onChange = st => {
  const el = $('syncst'); if (el) el.textContent = syncTxt();
  // Si han llegado cambios del otro dispositivo, se pinta de nuevo (sin cerrar lo que tengas abierto).
  if (st === 'changed' && !document.querySelector('.veil, .sos-full, .lock')) { const y = scrollY; render(); scrollTo(0, y); }
};
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') CS.sync(); });

// ---------- PIN ----------
async function pinHash(pin, salt) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + ':' + pin));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
}
function pinPad(titulo, sub, onDone, opts) {
  opts = opts || {};
  const o = document.createElement('div'); o.className = 'lock'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-label', titulo);
  let v = '';
  const paint = (err) => {
    o.innerHTML = `<div class="lock-in"><div class="lock-ic"><img src="icon-180.png" alt="" width="64" height="64"></div><h2>${esc(titulo)}</h2><p>${esc(err || sub)}</p>
      <div class="lock-dots ${err ? 'err' : ''}">${[0, 1, 2, 3].map(i => `<i class="${i < v.length ? 'on' : ''}"></i>`).join('')}</div>
      <div class="lock-pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map(k => k === '' ? '<span></span>' : `<button type="button" data-k="${k}" aria-label="${k === '⌫' ? 'Borrar' : k}">${k}</button>`).join('')}</div>
      ${opts.cancel ? '<button class="lock-x" data-k="x">Cancelar</button>' : ''}${opts.olvido ? '<button class="lock-x" data-k="olvido">He olvidado el PIN</button>' : ''}</div>`;
  };
  paint();
  document.body.appendChild(o); document.body.style.overflow = 'hidden';
  const close = () => { o.remove(); document.body.style.overflow = ''; document.removeEventListener('keydown', kd); };
  const press = async k => {
    if (k === 'x') return close();
    if (k === 'olvido') {
      if (!confirm('Sin el PIN no se puede entrar. La única opción es borrar todos los datos de Cimientos de este móvil (si tienes una copia descargada, podrás restaurarla). ¿Borrar todo?')) return;
      Object.values(K).forEach(key => { try { localStorage.removeItem(key); } catch (e) {} });
      CS.off(); // sin esto, la sincronización devolvería los datos sin pedir el PIN
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
  }, { cancel: true });
}
function pinLock() {
  const p = load(K.pin, null); if (!p || document.querySelector('.lock')) return;
  document.querySelectorAll('.veil, .sos-full').forEach(x => x.remove());
  pinPad('Cimientos', 'Escribe tu PIN', async v => (await pinHash(v, p.salt)) === p.hash, { olvido: true });
}
let pinFuera = 0;
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') pinFuera = Date.now();
  else if (pinFuera && Date.now() - pinFuera > 60e3) pinLock();
});

// ---------- arranque ----------
render();
pinLock();
CS.sync();

if ('serviceWorker' in navigator) {
  const habia = !!navigator.serviceWorker.controller;
  let recargando = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (habia && !recargando) { recargando = true; location.reload(); } });
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then(reg => {
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reg.update().catch(() => {}); });
    }).catch(() => {});
  });
}
