// Minimal JS: year stamp, mobile menu, and accessible carousel controls

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navBtn = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');
if (navBtn && nav) {
  navBtn.addEventListener('click', () => {
    const expanded = navBtn.getAttribute('aria-expanded') === 'true';
    navBtn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

// Carousel
(function(){
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.slide'));
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const dotsWrap = carousel.querySelector('.carousel-dots');
  const dots = Array.from(dotsWrap.querySelectorAll('button'));

  let index = 0;
  let timer = null;
  const DURATION = 8000; // autoplay interval

  function show(i, userInitiated = false) {
    // bounds
    index = (i + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle('is-active', idx === index));
    dots.forEach((d, idx) => {
      d.setAttribute('aria-selected', String(idx === index));
      d.tabIndex = idx === index ? 0 : -1;
    });
    if (userInitiated) restart();
  }

  function next(){ show(index + 1, true); }
  function prev(){ show(index - 1, true); }

  function start(){ timer = setInterval(() => show(index + 1), DURATION); }
  function stop(){ clearInterval(timer); timer = null; }
  function restart(){ stop(); start(); }

  // Wire buttons
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  // Dots
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => show(idx, true));
    dot.addEventListener('keydown', (e) => {
      // Left/Right arrow support on dots
      if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1, true); dots[index].focus(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); show(index - 1, true); dots[index].focus(); }
    });
  });

  // Pause on hover/focus for accessibility
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);

  // Init
  show(0);
  start();
})();
``