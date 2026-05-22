(function () {
  'use strict';

  // ---- Année dynamique
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Menu mobile
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Header shadow on scroll
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---- Reveal on scroll
  const revealEls = document.querySelectorAll('.section, .hero__card, .reason, .testimonial, .service-card, .ba-card, .contact-card');
  revealEls.forEach((el) => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ---- Formulaire de soumission
  const form = document.getElementById('quoteForm');
  const feedback = document.getElementById('formFeedback');

  const setFeedback = (type, message) => {
    if (!feedback) return;
    feedback.className = 'form__feedback';
    feedback.classList.add(type === 'success' ? 'is-success' : 'is-error');
    feedback.textContent = message;
  };

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = form.elements['name'].value.trim();
      const phone = form.elements['phone'].value.trim();
      const email = form.elements['email'].value.trim();
      const service = form.elements['service'].value;
      const message = form.elements['message'].value.trim();

      if (!name || !phone || !email || !service) {
        setFeedback('error', 'Merci de remplir les champs obligatoires.');
        return;
      }

      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailValid) {
        setFeedback('error', 'Veuillez saisir une adresse courriel valide.');
        return;
      }

      // Ouverture d'un courriel pré-rempli vers AJ NETPRO
      const subject = encodeURIComponent('Demande de soumission — ' + service);
      const body = encodeURIComponent(
        'Nom : ' + name + '\n' +
        'Téléphone : ' + phone + '\n' +
        'Courriel : ' + email + '\n' +
        'Type de service : ' + service + '\n\n' +
        'Message :\n' + (message || '(aucun message)')
      );
      const mailto = 'mailto:Ajnetpro@gmail.com?subject=' + subject + '&body=' + body;

      setFeedback('success', 'Merci ! Votre demande est prête à être envoyée. Si votre logiciel de courriel ne s\'ouvre pas, contactez-nous au 438-304-9159.');
      window.location.href = mailto;
      form.reset();
    });
  }

  // ---- Smooth scroll offset pour header sticky
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();
