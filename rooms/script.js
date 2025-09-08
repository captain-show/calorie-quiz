(function () {
  const container = document.querySelector('.image-compare');
  const clip = container.querySelector('.image-clip');
  const slider = container.querySelector('.slider');
  const knob = container.querySelector('.slider__knob');

  function setPositionByPercent(percent) {
    const p = Math.max(0, Math.min(100, percent));
    container.dataset.pos = String(p);
    const polygon = `polygon(0 0, ${p}% 0, ${p}% 100%, 0 100%)`;
    clip.style.clipPath = polygon;
    clip.style.webkitClipPath = polygon;
    slider.style.left = p + '%';
    slider.setAttribute('aria-valuenow', String(Math.round(p)));
  }

  function clientXToPercent(clientX) {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    return (x / rect.width) * 100;
  }

  let dragging = false;

  function startDrag(evt) {
    dragging = true;
    container.classList.add('dragging');
    if (evt.type.startsWith('touch')) {
      setPositionByPercent(clientXToPercent(evt.touches[0].clientX));
    } else {
      setPositionByPercent(clientXToPercent(evt.clientX));
    }
  }

  function onMove(evt) {
    if (!dragging) return;
    if (evt.type.startsWith('touch')) {
      setPositionByPercent(clientXToPercent(evt.touches[0].clientX));
    } else {
      setPositionByPercent(clientXToPercent(evt.clientX));
    }
  }

  function endDrag() {
    dragging = false;
    container.classList.remove('dragging');
  }

  slider.addEventListener('mousedown', startDrag);
  slider.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('touchend', endDrag);

  // Keyboard accessibility
  slider.addEventListener('keydown', (e) => {
    const step = (e.shiftKey ? 10 : 2);
    const current = Number(container.dataset.pos || '50');
    if (e.key === 'ArrowLeft') {
      setPositionByPercent(current - step);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      setPositionByPercent(current + step);
      e.preventDefault();
    } else if (e.key === 'Home') {
      setPositionByPercent(0);
      e.preventDefault();
    } else if (e.key === 'End') {
      setPositionByPercent(100);
      e.preventDefault();
    }
  });

  // Icon fan removed

  // Initialize position
  setPositionByPercent(50);
  
  // Simple hash router for screens
  function applyRoute() {
    const hash = window.location.hash || '#welcome';
    const screens = document.querySelectorAll('.screen');
    screens.forEach((el) => el.classList.remove('active'));
    const target = document.querySelector(hash);
    if (target) target.classList.add('active');

    // Progress update: 13-step journey up to #progress
    const stepOrder = ['#q1','#q2','#counter','#q3','#q4','#q5','#q6','#q7','#thanks','#q8','#q9','#taste','#progress'];
    const totalSteps = stepOrder.length; // 13
    stepOrder.forEach((id, index) => {
      const progress = document.querySelector(`${id} .progress`);
      if (!progress) return;
      // Ensure the progress bar has 13 segments
      let segments = Array.from(progress.querySelectorAll('.segment'));
      for (let i = segments.length; i < totalSteps; i++) {
        const li = document.createElement('li');
        li.className = 'segment';
        progress.appendChild(li);
      }
      segments = Array.from(progress.querySelectorAll('.segment'));
      segments.forEach((s, i) => {
        s.classList.toggle('is-active', hash === id && i === index);
        s.classList.toggle('is-complete', hash !== '#welcome' && i < index);
      });
    });

    // start counters when entering #counter
    if (hash === '#counter') {
      startCounters();
    }
  }

  window.addEventListener('hashchange', applyRoute);
  applyRoute();

  // Navigation: Continue from Q1 -> Q2
  const q1Continue = document.querySelector('#q1 .actions .cta');
  if (q1Continue) {
    q1Continue.addEventListener('click', () => {
      window.location.hash = '#q2';
    });
  }

  // Navigation: Continue from Q2 -> Counter
  const q2Continue = document.querySelector('#q2 .actions .cta');
  if (q2Continue) {
    q2Continue.addEventListener('click', () => {
      window.location.hash = '#counter';
    });
  }

  // Navigation: Continue from Counter -> Q3
  const counterContinue = document.querySelector('#counter .actions .cta');
  if (counterContinue) {
    counterContinue.addEventListener('click', () => {
      window.location.hash = '#q3';
    });
  }

  // Navigation: Continue from Q3 -> Q4
  const q3Continue = document.querySelector('#q3 .actions .cta');
  if (q3Continue) {
    q3Continue.addEventListener('click', () => {
      window.location.hash = '#q4';
    });
  }

  // Navigation: Continue from Q6 -> Q7
  const q6Continue = document.querySelector('#q6 .actions .cta');
  if (q6Continue) {
    q6Continue.addEventListener('click', () => {
      window.location.hash = '#q7';
    });
  }

  // Navigation: Continue from Q7 -> Thanks
  const q7Continue = document.querySelector('#q7 .actions .cta');
  if (q7Continue) {
    q7Continue.addEventListener('click', () => {
      window.location.hash = '#thanks';
    });
  }

  // Navigation: Continue from Thanks -> Q8
  const thanksContinue = document.querySelector('#thanks .actions .cta');
  if (thanksContinue) {
    thanksContinue.addEventListener('click', () => {
      window.location.hash = '#q8';
    });
  }

  // Navigation: Continue from Q8 -> Q9
  const q8Continue = document.querySelector('#q8 .actions .cta');
  if (q8Continue) {
    q8Continue.addEventListener('click', () => {
      window.location.hash = '#q9';
    });
  }

  // Navigation: Continue from Q9 -> Taste
  const q9Continue = document.querySelector('#q9 .actions .cta');
  if (q9Continue) {
    q9Continue.addEventListener('click', () => {
      window.location.hash = '#taste';
    });
  }

  // Populate taste screen with first selected style and marquee images
  function populateTasteFromQ9() {
    const checked = Array.from(document.querySelectorAll('#q9-form input:checked'));
    const labelEl = document.getElementById('taste-style');
    if (checked.length && labelEl) {
      const first = checked[0];
      const figcaption = first.parentElement?.querySelector('figcaption');
      if (figcaption) labelEl.textContent = figcaption.textContent || 'Style';
    }
    const tracks = document.querySelectorAll('#taste .marquee-track');
    tracks.forEach((track) => { track.innerHTML = ''; });
    if (tracks.length) {
      const imgs = Array.from(document.querySelectorAll('#q9-form img'));
      const clone = [...imgs, ...imgs];
      tracks.forEach((track) => {
        clone.forEach((img) => {
          const el = document.createElement('img');
          el.src = img.src;
          el.alt = img.alt || '';
          track.appendChild(el);
        });
      });
    }
  }

  // Re-populate when entering taste
  const __applyRoute = applyRoute;
  applyRoute = function() {
    __applyRoute();
    if (window.location.hash === '#taste') populateTasteFromQ9();
  };

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#taste') populateTasteFromQ9();
  });
  if (window.location.hash === '#taste') populateTasteFromQ9();

  // Navigate from Taste -> Progress for demo
  const tasteContinue = document.querySelector('#taste .actions .cta');
  if (tasteContinue) {
    tasteContinue.addEventListener('click', () => {
      window.location.hash = '#progress';
      setTimeout(startCircularProgress, 60);
    });
  }

  // Circular progress animation
  function startCircularProgress() {
    const ring = document.querySelector('#progress .progress-ring');
    const label = document.getElementById('progress-percent');
    const steps = Array.from(document.querySelectorAll('#progress .loading-item'));
    if (!ring || !label) return;
    let p = 0;
    const timer = setInterval(() => {
      p = Math.min(100, p + 2);
      const deg = Math.round((p / 100) * 360);
      ring.style.setProperty('--deg', deg + 'deg');
      label.textContent = p + '%';
      const idx = Math.min(steps.length - 1, Math.floor((p / 100) * steps.length));
      steps.forEach((el, i) => {
        if (i <= idx) el.classList.add('is-done');
        else el.classList.remove('is-done');
      });
      if (p >= 100) clearInterval(timer);
    }, 60);
  }

  const ___applyRoute = applyRoute;
  applyRoute = function() {
    ___applyRoute();
    if (window.location.hash === '#progress') startCircularProgress();
  };

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#progress') startCircularProgress();
  });
  if (window.location.hash === '#progress') startCircularProgress();

  // Navigate from Progress -> Offer
  const progressContinue = document.querySelector('#progress .actions .cta');
  if (progressContinue) {
    progressContinue.addEventListener('click', () => {
      window.location.hash = '#offer';
    });
  }

  // Navigate from Offer -> Payment
  const offerContinue = document.querySelector('#offer .actions .cta');
  if (offerContinue) {
    offerContinue.addEventListener('click', () => {
      window.location.hash = '#payment';
    });
  }

  // Reviews carousel (swipe + dots)
  const track = document.querySelector('#thanks .review-track');
  const dots = document.querySelectorAll('#thanks .dot');
  let reviewIndex = 0;
  function getReviewsViewportWidth() {
    const viewport = document.querySelector('#thanks .reviews');
    return viewport ? viewport.clientWidth : 0;
  }
  function goToReview(idx) {
    if (!track) return;
    const total = track.children.length;
    reviewIndex = Math.max(0, Math.min(total - 1, idx));
    const w = getReviewsViewportWidth();
    track.style.transition = 'transform 300ms ease';
    track.style.transform = `translateX(${-reviewIndex * w}px)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === reviewIndex));
    const fill = document.querySelector('#thanks .bar-fill');
    if (fill) fill.style.width = `${((reviewIndex + 1) / total) * 100}%`;
  }
  dots.forEach((d, i) => d.addEventListener('click', () => goToReview(i)));

  let startX = 0; let draggingReviews = false;
  function startSwipe(e) { draggingReviews = true; startX = (e.touches ? e.touches[0].clientX : e.clientX); }
  function endSwipe(e) {
    if (!draggingReviews) return; draggingReviews = false;
    const endX = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX);
    const delta = endX - startX;
    if (Math.abs(delta) > 30) {
      goToReview(reviewIndex + (delta < 0 ? 1 : -1));
    }
  }
  if (track) {
    track.addEventListener('mousedown', startSwipe);
    track.addEventListener('touchstart', startSwipe, { passive: true });
    window.addEventListener('mouseup', endSwipe);
    window.addEventListener('touchend', endSwipe);
    goToReview(0);
  }

  window.addEventListener('resize', () => {
    if (window.location.hash === '#thanks') {
      goToReview(reviewIndex);
    }
  });

  // Recalculate on route change when entering thanks
  const _applyRouteOriginal = applyRoute;
  applyRoute = function() {
    _applyRouteOriginal();
    if (window.location.hash === '#thanks') {
      goToReview(reviewIndex);
    }
  };

  // --- Single-choice (radio) auto-advance ---
  function setupAutoAdvance(formSelector, nextHash) {
    const form = document.querySelector(formSelector);
    if (!form) return;
    form.addEventListener('change', (e) => {
      const input = e.target && e.target.closest('input[type="radio"]');
      if (input && input.checked) {
        // Small delay to let selection highlight be perceptible
        setTimeout(() => { window.location.hash = nextHash; }, 120);
      }
    });
  }

  setupAutoAdvance('#q3-form', '#q4');
  setupAutoAdvance('#q4-form', '#q5');
  setupAutoAdvance('#q6-form', '#q7');
  setupAutoAdvance('#q7-form', '#thanks');

  // --- Multi-choice (checkbox) continue gating ---
  function setupGate(formSelector, buttonSelector) {
    const form = document.querySelector(formSelector);
    const btn = document.querySelector(buttonSelector);
    if (!form || !btn) return;
    function update() {
      const hasSelection = form.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked').length > 0;
      btn.disabled = !hasSelection;
    }
    update();
    form.addEventListener('change', update);
    // Re-evaluate on route change (in case of back/forward)
    window.addEventListener('hashchange', update);
  }

  setupGate('#q1-form', '#q1 .actions .cta');
  setupGate('#q2-form', '#q2 .actions .cta');
  setupGate('#q8-form', '#q8 .actions .cta');
  setupGate('#q9-form', '#q9 .actions .cta');

  // Navigation: Continue from Q4 -> Q5
  const q4Continue = document.querySelector('#q4 .actions .cta');
  if (q4Continue) {
    q4Continue.addEventListener('click', () => {
      window.location.hash = '#q5';
    });
  }

  // Navigation: Continue from Q5 -> Q6
  const q5Continue = document.querySelector('#q5 .actions .cta');
  if (q5Continue) {
    q5Continue.addEventListener('click', () => {
      window.location.hash = '#q6';
    });
  }

  // Counter animation
  function startCounters() {
    const numbers = document.querySelectorAll('#counter .stat-number');
    numbers.forEach((el) => {
      if (el.dataset.done === '1') return;
      const target = Number(el.getAttribute('data-target') || '0');
      const durationMs = 1200;
      const start = performance.now();
      const formatter = new Intl.NumberFormat();
      function frame(now) {
        const t = Math.min(1, (now - start) / durationMs);
        const value = Math.floor(target * (0.1 + 0.9 * t));
        el.textContent = formatter.format(value);
        if (t < 1) {
          requestAnimationFrame(frame);
        } else {
          el.textContent = formatter.format(target);
          el.dataset.done = '1';
        }
      }
      requestAnimationFrame(frame);
    });
  }
})();


