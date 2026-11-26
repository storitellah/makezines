/* Install as App: registers the offline worker and wires the Install app button.
   Chrome, Edge and Android use the browser's own install prompt. Safari on iPhone,
   iPad and Mac has no prompt, so the button shows how to add the app instead.
   Load with <script src="install.js" defer></script>. Add data-sw="none" when the
   page registers its own service worker. */
(() => {
  const me = document.currentScript;
  const swUrl = me && me.dataset.sw !== undefined ? me.dataset.sw : 'sw.js';
  const online = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';

  if (swUrl !== 'none' && online && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(swUrl).catch(() => {});
    });
  }

  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const ua = navigator.userAgent;
  const iOS = /iP(hone|ad|od)/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const macSafari = !iOS && /Macintosh/.test(ua) && /Version\/(1[7-9]|[2-9]\d)/.test(ua) && /Safari\//.test(ua) && !/Chrome|Chromium|Edg|Firefox|OPR/.test(ua);

  let deferred = null;
  // The Install app buttons are shown with a class on <html>, so buttons drawn
  // later (by React, or after a re-render) follow along without extra wiring.
  const show = on => document.documentElement.classList.toggle('can-install', !!on);

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferred = e;
    if (!standalone()) show(true);
  });
  window.addEventListener('appinstalled', () => { deferred = null; show(false); });

  function help(text) {
    let d = document.getElementById('install-help');
    if (!d) {
      d = document.createElement('dialog');
      d.id = 'install-help';
      d.setAttribute('aria-labelledby', 'install-help-title');
      const st = document.createElement('style');
      st.textContent = '#install-help::backdrop{background:rgba(0,0,0,.45)}';
      document.head.appendChild(st);
      d.style.cssText = 'position:fixed;inset:0;margin:auto;height:fit-content;max-width:340px;width:calc(100% - 40px);border:0;border-radius:14px;padding:20px 20px 16px;' +
        'background:#fff;color:#1d1d1f;font:15px/1.45 system-ui,-apple-system,sans-serif;box-shadow:0 18px 50px rgba(0,0,0,.3)';
      d.innerHTML = '<h2 id="install-help-title" style="margin:0 0 8px;font-size:17px;font-weight:700">Install this app</h2>' +
        '<p id="install-help-text" style="margin:0 0 16px"></p>' +
        '<form method="dialog" style="margin:0;text-align:right"><button style="font:inherit;font-weight:600;border:0;' +
        'border-radius:10px;padding:10px 18px;min-height:44px;background:#1d1d1f;color:#fff;cursor:pointer">Close</button></form>';
      d.addEventListener('click', e => { if (e.target === d) d.close(); });
      document.body.appendChild(d);
    }
    d.querySelector('#install-help-text').textContent = text;
    if (d.showModal) d.showModal(); else alert(text);
  }

  async function install() {
    if (deferred) {
      deferred.prompt();
      try { await deferred.userChoice; } catch (_) {}
      deferred = null;
      show(false);
      return;
    }
    if (iOS) help('Tap the Share button, then choose Add to Home Screen. The app then opens from your home screen and works offline.');
    else if (macSafari) help('In Safari, choose File, then Add to Dock. The app then opens from your Dock and works offline.');
  }

  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-install-app] button, button[data-install-app], a[data-install-app]');
    if (!b) return;
    e.preventDefault();
    install();
  });
  if (!standalone() && (iOS || macSafari)) show(true);
})();
