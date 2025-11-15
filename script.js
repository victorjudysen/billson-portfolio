// script.js — Animations and UI interactions for Billison portfolio
// Uses GSAP + ScrollTrigger (loaded via CDN in HTML)

/* eslint-disable no-undef */

document.addEventListener('DOMContentLoaded', () => {
  // Safety: ensure gsap and ScrollTrigger exist
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // NAV: sticky background toggle
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  const nav = document.querySelector('.nav');

  function checkNav() {
    const threshold = window.innerHeight * 0.02;
    if (window.scrollY > threshold) header.classList.add('solid');
    else header.classList.remove('solid');
  }
  checkNav();
  window.addEventListener('scroll', checkNav, {passive: true});

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const mobileSheet = document.querySelector('.mobile-nav-sheet');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  
  toggle.addEventListener('click', () => {
    mobileSheet.classList.toggle('open');
    toggle.classList.toggle('open');
    document.body.style.overflow = mobileSheet.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileSheet.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Hero text reveal
  const heroTl = gsap.timeline();
  heroTl.from('.intro-line', {y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'})
        .from('.tagline', {y: 28, opacity: 0, duration: 0.7, ease: 'power3.out'}, '-=0.45')
        .from('.lead', {y: 18, opacity: 0, duration: 0.7, ease: 'power3.out'}, '-=0.45')
        .from('.cta', {scale: 0.95, opacity: 0, duration: 0.6, ease: 'back.out(1.4)'}, '-=0.35');

  // Hero background subtle parallax
  gsap.to('.hero-bg', {
    yPercent: 8,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6
    }
  });

  // Staggered reveal for sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const elems = section.querySelectorAll('h3, h4, p, .service-card, .port-item, .testimonial-card, img, .contact-form');
    gsap.from(elems, {
      scrollTrigger: {trigger: section, start: 'top 80%', once: true},
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: 'power3.out'
    });
  });

  // Portfolio hover subtle tilt using mousemove (lightweight)
  document.querySelectorAll('.port-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(item, {rotationY: x * 6, rotationX: y * -6, transformPerspective:600, transformOrigin:'center', ease:'power1.out', duration:0.6});
    });
    item.addEventListener('mouseleave', () => gsap.to(item, {rotationY:0, rotationX:0, duration:0.6, ease:'power2.out'}));
  });

  // Service card hover tilt (also for accessibility keyboard focus)
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => gsap.to(card, {y:-6, boxShadow:'0 24px 60px rgba(0,0,0,0.45)', duration:0.35}));
    card.addEventListener('mouseleave', () => gsap.to(card, {y:0, boxShadow:'0 0 0 rgba(0,0,0,0)', duration:0.35}));
    card.addEventListener('focus', () => gsap.to(card, {y:-6, duration:0.25}));
    card.addEventListener('blur', () => gsap.to(card, {y:0, duration:0.25}));
  });

  // Testimonial gentle float
  gsap.to('.testimonial-card', {y:6, repeat:-1, yoyo:true, ease:'sine.inOut', duration:6});

  // Portfolio lazy reveal: subtle scale up on scroll
  gsap.utils.toArray('.port-item img').forEach(img => {
    gsap.from(img, {
      scrollTrigger: {trigger: img, start: 'top 85%', once:true},
      scale:1.06, duration:1.2, ease:'power3.out'
    });
  });

  // Contact form - small success animation when clicked (no backend)
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    gsap.to(btn, {scale:0.96, duration:0.08, yoyo:true, repeat:1});
    // micro feedback
    gsap.fromTo(form, {boxShadow:'0 0 0 rgba(255,255,255,0)'}, {boxShadow:'0 12px 40px rgba(0,0,0,0.45)', duration:0.4, yoyo:true, repeat:1});
  });

  // Set footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  
  function toggleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
  
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, {passive: true});
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    gsap.from(backToTop, {rotate: 360, duration: 0.6, ease: 'back.out(1.7)'});
  });

});
