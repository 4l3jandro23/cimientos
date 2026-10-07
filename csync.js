/* Sincronización entre tus dispositivos. Todo se comprime y se CIFRA aquí (AES-256-GCM con tu clave)
   antes de subirlo a un gist secreto de tu GitHub: GitHub solo ve un bloque ilegible.
   Cada cambio lleva su hora, así que lo que hagas en el iPhone y en el PC se junta sin pisarse. */
'use strict';
const CS = (() => {
  const API = 'https://api.github.com';
  const FILE = 'cimientos-sync.enc.json';
  const CFG = 'cimientos.sync';          // token y clave: solo en este dispositivo, nunca se suben
  const META = 'cimientosMeta';          // horas de cada cambio y borrados
  const MD_CFG = 'midinero.sync';        // la sincronización de Mi Espacio (en el PC comparten almacén)
  const TYPES = {
    cimientosDiario: 'list', cimientosTerapia: 'list', cimientosRetosPropios: 'list', cimientosSalidas: 'list',
    cimientosRetosCompletados: 'map', cimientosRetosPlanes: 'map', cimientosLeccionesCompletadas: 'map',
    cimientosFoco: 'whole', cimientosPerfil: 'whole', cimientosYo: 'whole', cimientosCarta: 'whole', cimientosFavs: 'whole', cimientosNotas: 'map', cimientosSemana: 'whole', cimientosFrases: 'whole', cimientosMias: 'list', cimientosBorradores: 'list', cimientosBajon: 'whole', cimientosSim: 'list'
  };
  const rd = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
  const wr = (k, v) => { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const cfg = () => rd(CFG, {}) || {};
  const setCfg = c => wr(CFG, c);
  const meta = () => { const m = rd(META, {}) || {}; m.t = m.t || {}; m.del = m.del || {}; return m; };
  const J = x => JSON.stringify(x == null ? null : x);
  const asItems = (type, v) => type === 'list' ? Object.fromEntries((Array.isArray(v) ? v : []).filter(x => x && x.id).map(x => [x.id, x])) : (v && typeof v === 'object' ? v : {});

  // Apunta la hora de lo que ha cambiado entre el valor viejo y el nuevo.
  function touch(key, oldV, newV) {
    const type = TYPES[key]; if (!type) return;
    const m = meta(), now = Date.now();
    if (type === 'whole') { if (J(oldV) !== J(newV)) m.t[key] = now; }
    else {
      const a = asItems(type, oldV), b = asItems(type, newV);
      for (const id of Object.keys(b)) if (J(a[id]) !== J(b[id])) { m.t[key + '/' + id] = now; delete m.del[key + '/' + id]; }
      for (const id of Object.keys(a)) if (!(id in b)) m.del[key + '/' + id] = now;
    }
    wr(META, m); schedule();
  }

  function snapshot() {
    const m = meta(), data = {};
    for (const k of Object.keys(TYPES)) data[k] = rd(k, null);
    return { v: 1, data, t: m.t, del: m.del };
  }
  // Junta dos copias: por cada cosa gana el cambio más reciente; lo borrado se queda borrado.
  function merge(a, b) {
    const out = { v: 1, data: {}, t: {}, del: {} };
    for (const k of Object.keys(TYPES)) {
      const type = TYPES[k], va = a.data[k], vb = b.data[k];
      if (type === 'whole') {
        const ta = a.t[k] || 0, tb = b.t[k] || 0;
        out.data[k] = ta > tb ? va : tb > ta ? vb : (va != null ? va : vb);
        if (ta || tb) out.t[k] = Math.max(ta, tb);
        continue;
      }
      const ia = asItems(type, va), ib = asItems(type, vb), res = {};
      const ids = new Set([...Object.keys(ia), ...Object.keys(ib)]);
      for (const sk of [...Object.keys(a.del), ...Object.keys(b.del)]) if (sk.startsWith(k + '/')) ids.add(sk.slice(k.length + 1));
      for (const id of ids) {
        const p = k + '/' + id, ta = a.t[p] || 0, tb = b.t[p] || 0, d = Math.max(a.del[p] || 0, b.del[p] || 0);
        const item = ta > tb ? ia[id] : tb > ta ? ib[id] : (id in ia ? ia[id] : ib[id]);
        const tt = Math.max(ta, tb);
        if (d && d >= tt) { out.del[p] = d; continue; }
        if (item !== undefined) res[id] = item;
        if (tt) out.t[p] = tt;
      }
      if (type === 'map') out.data[k] = va == null && vb == null && !Object.keys(res).length ? null : res;
      else {
        const order = [...(Array.isArray(va) ? va : []), ...(Array.isArray(vb) ? vb : [])].map(x => x && x.id);
        let list = Object.values(res);
        const f = x => x.fecha || x.creado || '';
        if (list.every(x => f(x))) list.sort((x, y) => k === 'cimientosDiario' ? (f(x) < f(y) ? 1 : -1) : (f(x) < f(y) ? -1 : 1));
        else list.sort((x, y) => order.indexOf(x.id) - order.indexOf(y.id));
        out.data[k] = va == null && vb == null && !list.length ? null : list;
      }
    }
    return out;
  }
  const same = (x, y) => J(x.data) === J(y.data) && J(x.del) === J(y.del);

  // ---- cifrado ----
  const b64 = u8 => { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); };
  const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  const pipe = async (u8, stream) => new Uint8Array(await new Response(new Blob([u8]).stream().pipeThrough(stream)).arrayBuffer());
  async function key(pass, salt) {
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 310000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
  }
  async function encrypt(obj, pass, saltB64) {
    const salt = saltB64 ? unb64(saltB64) : crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    const data = await pipe(new TextEncoder().encode(JSON.stringify(obj)), new CompressionStream('gzip'));
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await key(pass, salt), data));
    return { v: 1, salt: b64(salt), iv: b64(iv), data: b64(ct) };
  }
  async function decrypt(p, pass) {
    let pt;
    try { pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(p.iv) }, await key(pass, unb64(p.salt)), unb64(p.data)); }
    catch (e) { throw new Error('La clave no coincide con la del otro dispositivo. Vuelve a vincular con el código.'); }
    return JSON.parse(new TextDecoder().decode(await pipe(new Uint8Array(pt), new DecompressionStream('gzip'))));
  }

  // ---- GitHub ----
  async function gh(token, path, opt) {
    opt = opt || {};
    const headers = { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
    if (opt.body) headers['Content-Type'] = 'application/json';
    let r;
    try { r = await fetch(API + path, Object.assign({}, opt, { headers, cache: 'no-store' })); }
    catch (e) { throw new Error('Sin conexión. Se sincronizará cuando vuelvas a tener internet.'); }
    if (r.status === 401) throw new Error('El token de GitHub no es válido o ha caducado.');
    if (r.status === 403 || r.status === 404) throw new Error('El token no tiene permiso de Gists.');
    if (!r.ok) throw new Error('GitHub ha dado un error (' + r.status + '). Prueba en un rato.');
    return r.status === 204 ? null : r.json();
  }
  async function findGist(token) {
    for (let page = 1; page <= 10; page++) {
      const list = await gh(token, '/gists?per_page=100&page=' + page);
      const g = list.find(g => g.files && g.files[FILE]); if (g) return g.id;
      if (list.length < 100) break;
    }
    return null;
  }
  async function readGist(token, id) {
    const g = await gh(token, '/gists/' + id), f = g.files && g.files[FILE];
    if (!f) return null;
    return JSON.parse(f.truncated ? await (await fetch(f.raw_url, { cache: 'no-store' })).text() : f.content);
  }
  async function writeGist(token, id, payload) {
    const files = { [FILE]: { content: JSON.stringify(payload) } };
    if (id) { await gh(token, '/gists/' + id, { method: 'PATCH', body: JSON.stringify({ files }) }); return id; }
    return (await gh(token, '/gists', { method: 'POST', body: JSON.stringify({ description: 'Datos cifrados', public: false, files }) })).id;
  }

  // ---- un ciclo ----
  let busy = false, again = false, timer = null, msg = '', onChange = () => {};
  function apply(st) {
    for (const k of Object.keys(TYPES)) wr(k, st.data[k]);
    wr(META, { t: st.t, del: st.del });
  }
  async function sync() {
    const c = cfg(); if (!c.token || !c.pass) return;
    if (busy) { again = true; return; }
    busy = true; msg = ''; onChange('busy');
    try {
      let id = c.gistId || await findGist(c.token), remote = null, salt = null;
      if (id) { const p = await readGist(c.token, id); if (p) { remote = await decrypt(p, c.pass); salt = p.salt; } }
      const local = snapshot(), merged = remote ? merge(local, remote) : local;
      if (!remote || !same(merged, remote)) id = await writeGist(c.token, id, await encrypt(merged, c.pass, salt));
      const changed = !same(merged, local);
      if (changed) apply(merged);
      const c2 = cfg(); c2.gistId = id; c2.last = Date.now(); setCfg(c2);
      busy = false; onChange(changed ? 'changed' : 'ok');
    } catch (e) { msg = e.message; busy = false; onChange('error'); }
    if (again) { again = false; sync(); }
  }
  function schedule() { const c = cfg(); if (!c.token || !c.pass) return; clearTimeout(timer); timer = setTimeout(sync, 1500); }

  // ---- vincular: el mismo código que Mi Espacio (MD1.…) ----
  const b64url = s => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const unb64url = s => decodeURIComponent(escape(atob(s.replace(/-/g, '+').replace(/_/g, '/'))));
  function parseCode(text) {
    const m = String(text || '').trim().match(/MD1\.([A-Za-z0-9_-]+)/); if (!m) return null;
    try { const o = JSON.parse(unb64url(m[1])); return o.t && o.k ? o : null; } catch (e) { return null; }
  }
  const code = () => { const c = cfg(); return 'MD1.' + b64url(JSON.stringify({ t: c.token, k: c.pass, g: '' })); };
  const fromMiEspacio = () => { const m = rd(MD_CFG, null); return m && m.token && m.pass ? m : null; };
  async function link(o) { setCfg({ token: o.token || o.t, pass: o.pass || o.k }); await sync(); if (msg) { const e = msg; setCfg({}); msg = ''; throw new Error(e); } }
  function off() { setCfg(null); }

  return { TYPES, touch, sync, schedule, merge, cfg, code, parseCode, fromMiEspacio, link, off, status: () => ({ busy, msg, last: cfg().last, on: !!(cfg().token && cfg().pass) }), set onChange(f) { onChange = f; } };
})();
