/* Cimientos. Todo vive en localStorage, en este dispositivo: nada se envía a ningún sitio. */
'use strict';
const K = {
  diario: 'cimientosDiario',
  retos: 'cimientosRetosCompletados',
  planes: 'cimientosRetosPlanes',
  propios: 'cimientosRetosPropios',
  foco: 'cimientosFoco',
  terapia: 'cimientosTerapia',
  lecciones: 'cimientosLeccionesCompletadas'
};
const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = id => document.getElementById(id);
const dayKey = d => { const x = new Date(d); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
const hoyKey = () => dayKey(Date.now());
const fCorta = iso => new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
const fLarga = d => { const s = new Date(d).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }); return s.charAt(0).toUpperCase() + s.slice(1); };
const uid = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

const CARAS = [['😞', 'Fatal'], ['😕', 'Regular'], ['😐', 'Normal'], ['🙂', 'Bien'], ['😄', 'Genial']];
const NIVELES = [['Nada', 1], ['Poca', 3], ['Algo', 5], ['Bastante', 7], ['Mucha', 9]];
const TIPOS = { checkin: 'Check-in', victoria: 'Victoria', dificil: 'Difícil', patron: 'Patrón', pensamiento: 'Pensamiento' };

// ---------- datos ----------
const diario = () => { const l = load(K.diario, []); return Array.isArray(l) ? l : []; };
const retosHechos = () => load(K.retos, {}) || {};
const planes = () => load(K.planes, {}) || {};
const propios = () => load(K.propios, []) || [];
const terapia = () => load(K.terapia, []) || [];
const leidas = () => load(K.lecciones, {}) || {};
const allRetos = () => RETOS_BASE.concat(propios().map(r => Object.assign({ etapa: 'propio' }, r)));
// Cada reto hecho guarda sus veces; los antiguos (de la primera versión) cuentan como una vez sin números.
const veces = id => { const h = retosHechos()[id]; if (!h) return []; return Array.isArray(h.veces) && h.veces.length ? h.veces : [{ fecha: h.fecha, nota: h.nota || '' }]; };
const conNumeros = () => allRetos().flatMap(r => veces(r.id).filter(v => v.antes != null && v.despues != null).map(v => Object.assign({ r }, v))).sort((a, b) => a.fecha < b.fecha ? 1 : -1);

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
  v.addEventListener('click', e => { if (e.target === v || e.target.closest('[data-close]')) v.remove(); });
  return v;
}

// ---------- estado de la pantalla ----------
let tab = 'hoy';
const ui = { cara: null, nivel: null, tipo: 'checkin', animo: null, ansiedad: null, filtro: 'todo', pens: {}, trampas: [] };

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
    const c = ult.animo != null ? CARAS[Math.max(0, Math.min(4, Math.round(ult.animo / 2) - 1))] : null;
    ck = `<div class="done-today">${c ? `<span class="big">${c[0]}</span>` : ''}<div><b>Hoy: ${c ? c[1].toLowerCase() : 'apuntado'}</b><div class="small muted">${ult.ansiedad != null ? 'Ansiedad ' + ult.ansiedad + ' de 10 · ' : ''}${new Date(ult.fecha).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</div></div></div>
      <div class="row-btns"><button class="pill" data-act="otro">Apuntar otro momento</button></div>`;
  } else {
    ck = `<div class="faces">${CARAS.map(([f, n], i) => `<button data-cara="${i}" class="${ui.cara === i ? 'on' : ''}"><span>${f}</span><small>${n}</small></button>`).join('')}</div>
      <p class="small muted" style="margin:12px 0 6px">Ansiedad ahora (si quieres)</p>
      <div class="pills">${NIVELES.map(([n, v]) => `<button class="pill ${ui.nivel === v ? 'on' : ''}" data-nivel="${v}">${n}</button>`).join('')}</div>
      <div class="row-btns"><button class="btn" data-act="checkin" ${ui.cara == null && ui.nivel == null ? 'disabled style="opacity:.45"' : ''}>Guardar</button>${ui.otro ? '<button class="btn ghost" data-act="nootro">Cancelar</button>' : ''}</div>`;
  }
  return `<section class="hero"><small>${fLarga(Date.now())}</small><h1>${saludo()}</h1><p class="frase">${esc(fraseHoy())}</p></section>
    <button class="sos" data-act="sos"><span class="ic">🌊</span><span><b>Un momento difícil</b><small>Respirar, aterrizar y recordar lo importante</small></span><span class="go">›</span></button>
    <div class="card"><h2>¿Cómo estás ahora?</h2><p class="sub">Un toque basta. Queda en tu diario.</p>${ck}</div>
    ${r ? `<div class="card"><h2>Tu reto de ahora</h2><p class="sub">${pl ? 'Lo tienes preparado.' : 'Sin prisa. Cuando te veas con ganas.'}</p>
      <button class="reto ${pl ? 'plan' : ''} foco" data-reto="${r.id}" style="margin:0"><span class="chk">${retosHechos()[r.id] ? '✓' : ''}</span><span class="b"><b>${esc(r.titulo)}</b><small>${esc(r.descripcion || '')}</small>${pl && pl.antes != null ? `<span class="meta"><span class="tag warm">Crees que te dará ${pl.antes} de 10 de miedo</span></span>` : ''}</span></button>
      <div class="row-btns"><button class="pill" data-act="otroreto">Otro reto</button></div></div>` : ''}
    <div class="card"><h2>Para la próxima sesión</h2><p class="sub">Lo que quieras llevar a terapia, para no olvidarlo.</p>
      ${ter.slice(0, 4).map(t => `<div class="lrow"><span class="b"><b style="font-weight:500">${esc(t.texto)}</b><small>${fCorta(t.fecha)}</small></span><button class="pill" data-ter="${t.id}">Hablado</button></div>`).join('')}
      ${ter.length > 4 ? `<p class="small muted">Y ${ter.length - 4} más en tu diario.</p>` : ''}
      <form data-form="terapia" style="display:flex;gap:8px;margin-top:10px"><input type="text" name="t" placeholder="Algo que quieras contar o preguntar…" autocomplete="off" enterkeyhint="done"><button class="btn" style="flex:none">Añadir</button></form></div>
    ${sinLeer ? `<p class="sec-h">Para leer con calma</p><button class="lec" data-lec="${sinLeer.id}"><span class="ic">${sinLeer.icono}</span><span class="b"><b>${esc(sinLeer.titulo)}</b><small>${esc(sinLeer.sub)} · ${sinLeer.tarjetas.length} tarjetas</small></span><span class="go">›</span></button>` : ''}`;
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
    : `<p class="small muted" style="margin:14px 0 6px">Ánimo (opcional)</p>${scaleHTML('animo', ui.animo, 1, 10)}
      <p class="small muted" style="margin:12px 0 6px">Ansiedad (opcional)</p>${scaleHTML('ansiedad', ui.ansiedad, 1, 10)}
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
    <p class="quiet" style="margin-top:18px">Las siguientes etapas las construimos juntos cuando quieras, a tu ritmo.</p>`;
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
function vAprender() {
  const L = leidas();
  return `<div class="top"><h1>Aprender</h1><p>Lecturas cortas, en tarjetas. Sin examen.</p></div>
    ${LECCIONES.map(l => `<button class="lec" data-lec="${l.id}"><span class="ic">${l.icono}</span><span class="b"><b>${esc(l.titulo)}</b><small>${esc(l.sub)}</small></span>${L[l.id] ? '<span class="ok">✓</span>' : '<span class="go">›</span>'}</button>`).join('')}
    <p class="sec-h">Herramientas</p>
    <div class="card" style="padding:4px 16px">
      <button class="lrow" data-act="sos"><span class="ic">🌊</span><span class="b"><b>Calma ahora</b><small>Respirar, aterrizar y recordar</small></span><span class="go">›</span></button>
      <button class="lrow" data-act="pensar"><span class="ic">🧠</span><span class="b"><b>Revisar un pensamiento</b><small>Mirarlo con un poco de distancia</small></span><span class="go">›</span></button>
      <button class="lrow" data-act="trampas"><span class="ic">🪤</span><span class="b"><b>Trampas del pensamiento</b><small>Las más típicas, con ejemplos</small></span><span class="go">›</span></button>
    </div>
    <p class="sec-h">Más adelante</p>
    ${PROXIMAMENTE.map(([i, t]) => `<div class="lec soon"><span class="ic">${i}</span><span class="b"><b>${esc(t)}</b></span></div>`).join('')}
    <p class="quiet" style="margin-top:6px">Esto lo escribimos juntos, paso a paso, cuando quieras. Sin prisa.</p>`;
}
function openLeccion(id) {
  const l = LECCIONES.find(x => x.id === id); if (!l) return;
  let i = 0;
  const v = sheet('');
  const paint = () => {
    const [t, p] = l.tarjetas[i], last = i === l.tarjetas.length - 1;
    v.querySelector('.sheet').innerHTML = `<div class="grab"></div><div class="lcard"><span class="n">${l.icono} ${esc(l.titulo)} · ${i + 1} de ${l.tarjetas.length}</span><h3>${esc(t)}</h3><p>${esc(p)}</p></div>
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
    else body = `<div class="recuerda">${RECUERDA.map(t => `<div>${esc(t)}</div>`).join('')}</div>`;
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
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Ánimo y ansiedad en tus últimos registros"><line x1="0" x2="${W}" y1="${y(5.5)}" y2="${y(5.5)}" stroke="currentColor" stroke-opacity=".1" stroke-dasharray="3 4"/>${line('ansiedad', 'var(--warm)')}${line('animo', 'var(--accent)')}</svg>
    <div class="leg"><span><i style="background:var(--accent)"></i>Ánimo</span><span><i style="background:var(--warm)"></i>Ansiedad</span><span style="margin-left:auto">${fCorta(l[0].fecha)} – ${fCorta(l[l.length - 1].fecha)}</span></div></div>`;
}
function vProgreso() {
  const d = diario(), vs = conNumeros();
  const totalVeces = allRetos().reduce((a, r) => a + veces(r.id).length, 0);
  const dias = new Set(d.map(e => dayKey(e.fecha))).size;
  const avg = k => vs.length ? Math.round(vs.reduce((a, v) => a + v[k], 0) / vs.length * 10) / 10 : 0;
  const tl = [];
  d.filter(e => e.tipo === 'victoria').forEach(e => tl.push([e.fecha, '⭐', e.texto || 'Una victoria']));
  allRetos().forEach(r => veces(r.id).forEach(v => tl.push([v.fecha, '✓', r.titulo])));
  Object.keys(leidas()).forEach(id => { const l = LECCIONES.find(x => x.id === id); if (l) tl.push([leidas()[id], '📖', 'Leíste «' + l.titulo + '»']); });
  tl.sort((a, b) => a[0] < b[0] ? 1 : -1);
  return `<div class="top"><h1>Recorrido</h1><p>Para mirar atrás y ver lo que ya has hecho. No para compararte con nadie.</p></div>
    <div class="stats" style="margin-bottom:12px"><div><b>${totalVeces}</b><small>retos hechos</small></div><div><b>${d.filter(e => e.tipo === 'victoria').length}</b><small>victorias</small></div><div><b>${dias}</b><small>días escritos</small></div></div>
    <div class="card"><h2>Lo que temías y lo que pasó</h2>
      ${vs.length ? `<div class="compare"><div><small>Miedo que esperabas</small><b>${avg('antes')}</b><div class="bar"><i style="width:${avg('antes') * 10}%"></i></div></div><div><small>Miedo que hubo</small><b>${avg('despues')}</b><div class="bar"><i style="width:${avg('despues') * 10}%"></i></div></div></div>
        ${vs.slice(0, 5).map(v => `<div class="tf"><span>${esc(v.r.titulo)}</span><span>${v.antes} → ${v.despues}</span></div>`).join('')}
        <p class="small muted" style="margin:10px 0 0">${avg('despues') < avg('antes') ? 'De media, el miedo de antes ha sido más grande que lo que pasó. Acuérdate cuando dudes.' : 'Has hecho cosas aunque daban miedo. Eso es lo que cuenta.'}</p>`
      : '<p class="sub" style="margin:0">Cuando hagas un reto apuntando el miedo de antes y el de después, aquí verás la diferencia.</p>'}</div>
    <div class="card"><h2>Ánimo y ansiedad</h2>${chartHTML()}</div>
    <div class="card"><h2>Lo que has hecho</h2>${tl.length ? tl.slice(0, 25).map(([f, i, t]) => `<div class="tl"><span class="d">${fCorta(f)}</span><span>${i} ${esc(t)}</span></div>`).join('') : '<p class="vacio">Aquí irán apareciendo tus victorias, retos y lecturas.</p>'}</div>
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
  if ((x = t.closest('[data-cara]'))) { ui.cara = ui.cara === +x.dataset.cara ? null : +x.dataset.cara; return render(); }
  if ((x = t.closest('[data-nivel]'))) { ui.nivel = ui.nivel === +x.dataset.nivel ? null : +x.dataset.nivel; return render(); }
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
    if (a === 'otro') { ui.otro = true; return render(); }
    if (a === 'nootro') { ui.otro = false; ui.cara = ui.nivel = null; return render(); }
    if (a === 'checkin') {
      if (ui.cara == null && ui.nivel == null) return;
      const e2 = { id: uid('d'), fecha: new Date().toISOString(), tipo: 'checkin', animo: ui.cara == null ? null : (ui.cara + 1) * 2, ansiedad: ui.nivel, texto: '' };
      store(K.diario, [e2].concat(diario())); ui.cara = ui.nivel = null; ui.otro = false; render();
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
  if (e.target.dataset && e.target.dataset.pens) ui.pens[e.target.dataset.pens] = e.target.value;
  if (e.target.id === 'txt') ui.txt = e.target.value;
});
document.addEventListener('change', e => { if (e.target.id === 'fimp' && e.target.files[0]) { importar(e.target.files[0]); e.target.value = ''; } });
document.addEventListener('submit', e => {
  if (e.target.dataset.form !== 'terapia') return;
  e.preventDefault(); const i = e.target.querySelector('input'), v = i.value.trim(); if (!v) return;
  store(K.terapia, terapia().concat({ id: uid('t'), fecha: new Date().toISOString(), texto: v })); render();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { const s = document.querySelector('.sos-full'); if (s) { clearTimeout(sosTimer); s.remove(); document.body.style.overflow = ''; return; } const v = [...document.querySelectorAll('.veil')].pop(); if (v) v.remove(); } });

// ---------- arranque ----------
render();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        const n = reg.installing; if (!n) return;
        n.addEventListener('statechange', () => { if (n.state === 'installed' && navigator.serviceWorker.controller) $('banAct').style.display = 'flex'; });
      });
    }).catch(() => {});
  });
  $('btnAct').onclick = () => {
    navigator.serviceWorker.getRegistration().then(reg => { if (reg && reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' }); });
    navigator.serviceWorker.addEventListener('controllerchange', () => location.reload());
  };
}
