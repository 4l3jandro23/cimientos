/* Tema claro u oscuro antes de pintar nada, para que no parpadee. Por defecto, el del móvil. */
(function () {
  var t = 'auto'; try { t = JSON.parse(localStorage.getItem('cimientosTema')) || 'auto'; } catch (e) {}
  var oscuro = t === 'dark' || (t === 'auto' && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
  if (oscuro) {
    document.documentElement.classList.add('dark');
    var m = document.querySelector('meta[name=theme-color]'); if (m) m.setAttribute('content', '#0e0e0d');
  }
})();
