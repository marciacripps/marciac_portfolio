const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Contact Form
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function() {
      const formData = new FormData(form);
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      console.log('Form data to be submitted:', formDataObj);
    });
  }
});

// Scroll-earned section reveals
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
);

document.querySelectorAll('section:not(#home), .stats-chapter').forEach(el => {
  if (prefersReducedMotion.matches) {
    el.classList.add('fade-in');
    return;
  }
  el.classList.add('fade-ready');
  revealObserver.observe(el);
});

// Stats count-up
function animateCount(el, target, duration = 1400) {
  if (prefersReducedMotion.matches) {
    el.textContent = target;
    return;
  }

  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(frame);
}

const statsStrip = document.getElementById('stats-strip');
if (statsStrip) {
  const statNumbers = statsStrip.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        statNumbers.forEach((el, i) => {
          const target = Number(el.dataset.target) || 0;
          setTimeout(() => animateCount(el, target), i * 120);
        });
        statsObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.35 }
  );
  statsObserver.observe(statsStrip);
}

// Chapter cards — hiartem-style 3D tilt, group parallax, responsive collapse
const chapterCards = document.getElementById('chapter-cards');
if (chapterCards) {
  const cards = [...chapterCards.querySelectorAll('.chapter-card')];
  const desktopQuery = window.matchMedia('(min-width: 901px)');
  const midQuery = window.matchMedia('(min-width: 1101px)');

  const syncLayoutMode = () => {
    const mode = desktopQuery.matches
      ? (midQuery.matches ? 'desktop' : 'compact')
      : 'stack';
    chapterCards.dataset.layout = mode;
    document.documentElement.dataset.chapterLayout = mode;
    cards.forEach((card) => {
      card.classList.remove('is-tilting');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--lift', '0px');
      card.style.setProperty('--tx', '0px');
      card.style.setProperty('--ty', '0px');
    });
  };

  const canTilt = () => desktopQuery.matches && !prefersReducedMotion.matches;

  const resetCard = (card) => {
    card.classList.remove('is-tilting');
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--lift', '0px');
    card.style.setProperty('--tx', '0px');
    card.style.setProperty('--ty', '0px');
  };

  if (!prefersReducedMotion.matches) {
    cards.forEach((card) => {
      card.addEventListener('pointerenter', () => {
        if (!canTilt()) return;
        card.classList.add('is-tilting');
      });

      card.addEventListener('pointermove', (e) => {
        if (!canTilt()) return;
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const ry = (px - 0.5) * 16;
        const rx = (0.5 - py) * 12;
        card.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
        card.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
        card.style.setProperty('--lift', '-10px');
      });

      card.addEventListener('pointerleave', () => {
        resetCard(card);
      });
    });

    chapterCards.addEventListener('pointermove', (e) => {
      if (!canTilt()) return;
      const rect = chapterCards.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cards.forEach((card, i) => {
        if (card.classList.contains('is-tilting')) return;
        const depth = (i - 1) * 14;
        card.style.setProperty('--tx', `${(x * depth).toFixed(1)}px`);
        card.style.setProperty('--ty', `${(y * depth * 0.65).toFixed(1)}px`);
      });
    });

    chapterCards.addEventListener('pointerleave', () => {
      cards.forEach(resetCard);
    });
  }

  const onBreakpointChange = () => syncLayoutMode();
  if (typeof desktopQuery.addEventListener === 'function') {
    desktopQuery.addEventListener('change', onBreakpointChange);
    midQuery.addEventListener('change', onBreakpointChange);
  } else {
    desktopQuery.addListener(onBreakpointChange);
    midQuery.addListener(onBreakpointChange);
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(syncLayoutMode, 80);
  });

  syncLayoutMode();
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerHeight = document.querySelector('.site-header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
      });
    }
  });
});
