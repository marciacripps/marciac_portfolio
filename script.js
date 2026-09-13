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

// Subtle chapter-card parallax
const chapterCards = document.getElementById('chapter-cards');
if (chapterCards && !prefersReducedMotion.matches) {
  const cards = chapterCards.querySelectorAll('.chapter-card');
  chapterCards.addEventListener('pointermove', (e) => {
    const rect = chapterCards.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cards.forEach((card, i) => {
      const depth = (i - 1) * 8;
      card.style.translate = `${x * depth}px ${y * depth}px`;
    });
  });
  chapterCards.addEventListener('pointerleave', () => {
    cards.forEach(card => {
      card.style.translate = '0px 0px';
    });
  });
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
