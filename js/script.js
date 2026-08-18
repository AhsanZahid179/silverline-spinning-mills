document.addEventListener('DOMContentLoaded', () => {

  /* ===== Set current year in footer ===== */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ===== Sticky navbar shadow on scroll ===== */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
    /* ===== Contact form: mailto + success message + reset ===== */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
      const mailtoLink = `mailto:info@silverlinespinningmills.com?subject=${encodeURIComponent(subject)}&body=${body}`;

      window.location.href = mailtoLink;

      // Show success message
      contactForm.style.display = 'none';
      formSuccess.classList.add('visible');

      // Reset form and revert to form view after a few seconds
      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'flex';
        formSuccess.classList.remove('visible');
      }, 4000);
    });
  }

  /* ===== Mobile menu toggle ===== */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a link is clicked
    nav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ===== Hero image slider ===== */
  const heroSlides = document.querySelectorAll('.hero__slide');
  const heroDots = document.querySelectorAll('.hero__dot');
  let heroIndex = 0;
  let heroInterval;

  function showHeroSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));
    heroSlides[index].classList.add('active');
    heroDots[index].classList.add('active');
    heroIndex = index;
  }

  function nextHeroSlide() {
    const nextIndex = (heroIndex + 1) % heroSlides.length;
    showHeroSlide(nextIndex);
  }

  function startHeroAutoplay() {
    heroInterval = setInterval(nextHeroSlide, 5000);
  }

  function resetHeroAutoplay() {
    clearInterval(heroInterval);
    startHeroAutoplay();
  }

  if (heroSlides.length > 0) {
    startHeroAutoplay();

    heroDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.slide, 10);
        showHeroSlide(index);
        resetHeroAutoplay();
      });
    });
  }

  /* ===== Testimonials slider ===== */
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialCards = document.querySelectorAll('.testimonial__card');
  const testimonialDots = document.querySelectorAll('.testimonial__dot');
  let testimonialIndex = 0;
  let testimonialInterval;

  function showTestimonial(index) {
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    testimonialDots[index].classList.add('active');
    testimonialIndex = index;
  }

  function nextTestimonial() {
    const nextIndex = (testimonialIndex + 1) % testimonialCards.length;
    showTestimonial(nextIndex);
  }

  function startTestimonialAutoplay() {
    testimonialInterval = setInterval(nextTestimonial, 4500);
  }

  function resetTestimonialAutoplay() {
    clearInterval(testimonialInterval);
    startTestimonialAutoplay();
  }

  if (testimonialTrack && testimonialCards.length > 0) {
    startTestimonialAutoplay();

    testimonialDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.slide, 10);
        showTestimonial(index);
        resetTestimonialAutoplay();
      });
    });
  }

 
  const revealSelector = '.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-up, .reveal-down';
  const revealElements = document.querySelectorAll(revealSelector);

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }
});