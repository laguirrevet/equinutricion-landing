/* EquiNutrición — comportamiento compartido del sitio */
(function () {
  // --- Menú móvil ---
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Tracking de CTAs (GA4) ---
  document.querySelectorAll('[data-track]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        gtag('event', el.dataset.track, {
          event_category: 'cta',
          event_label: el.dataset.trackLoc || ''
        });
      }
    });
  });

  // --- Calculadora de peso (solo si existe en la página) ---
  var wcGirth = document.getElementById('wcGirth');
  var wcLength = document.getElementById('wcLength');
  var wcResult = document.getElementById('wcResult');
  var wcWeight = document.getElementById('wcWeight');
  if (wcGirth && wcLength && wcResult && wcWeight) {
    var wcPulseTimeout;
    var updateWeightCalc = function () {
      var girth = parseFloat(wcGirth.value);
      var length = parseFloat(wcLength.value);
      if (!girth || !length || girth <= 0 || length <= 0) {
        wcWeight.textContent = '— kg';
        return;
      }
      var weight = (girth * girth * length) / 11900;
      wcWeight.textContent = Math.round(weight) + ' kg';
      wcResult.classList.add('pulse');
      clearTimeout(wcPulseTimeout);
      wcPulseTimeout = setTimeout(function () { wcResult.classList.remove('pulse'); }, 180);
    };
    wcGirth.addEventListener('input', updateWeightCalc);
    wcLength.addEventListener('input', updateWeightCalc);
    updateWeightCalc();
  }

  // --- Reveal on scroll ---
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); } });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { obs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // --- FAQ acordeón (una abierta a la vez) ---
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) { if (other !== item) other.open = false; });
      }
    });
  });

  // --- Descargar en PDF (impresión nativa del navegador) ---
  document.querySelectorAll('[data-print]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'descargar_pdf', { event_category: 'guia', event_label: btn.dataset.print || '' });
      }
      window.print();
    });
  });
})();
