/**
 * Parkside Advisory Group — Main JavaScript
 *
 * Handles:
 * - Sticky navigation with scroll-based styling
 * - Mobile hamburger menu toggle
 * - Smooth scroll for anchor links
 * - IntersectionObserver-based scroll reveal animations
 *
 * Zero external dependencies.
 */

(function () {
  'use strict';

  // ── DOM References ──────────────────────────────────────
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('nav-hamburger');
  const mobilePanel = document.getElementById('nav-mobile-panel');
  const mobileOverlay = document.getElementById('nav-mobile-overlay');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');

  // ── Sticky Nav ──────────────────────────────────────────
  /**
   * Add/remove scrolled class based on scroll position.
   * Pages with data-nav-scrolled always keep the scrolled
   * appearance (dark text on cream) because they lack a
   * dark hero backdrop.
   */
  const navAlwaysScrolled = nav && nav.hasAttribute('data-nav-scrolled');

  function handleNavScroll() {
    if (!nav || navAlwaysScrolled) return;
    const scrollThreshold = 40;
    if (window.scrollY > scrollThreshold) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Initial check

  // ── Mobile Menu ─────────────────────────────────────────
  /** Toggle mobile menu open/closed state. */
  function toggleMobileMenu() {
    if (!hamburger || !mobilePanel || !mobileOverlay) return;

    const isOpen = hamburger.classList.contains('nav__hamburger--open');

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  /** Open the mobile menu panel. */
  function openMobileMenu() {
    hamburger.classList.add('nav__hamburger--open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobilePanel.classList.add('nav__mobile-panel--open');
    mobileOverlay.classList.add('nav__mobile-overlay--visible');
    mobileOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  /** Close the mobile menu panel. */
  function closeMobileMenu() {
    hamburger.classList.remove('nav__hamburger--open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobilePanel.classList.remove('nav__mobile-panel--open');
    mobileOverlay.classList.remove('nav__mobile-overlay--visible');
    document.body.style.overflow = '';

    // Hide overlay after transition completes
    setTimeout(function () {
      if (!mobileOverlay.classList.contains('nav__mobile-overlay--visible')) {
        mobileOverlay.style.display = 'none';
      }
    }, 400);
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu when a link is clicked
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileMenu();
    });
  });

  // ── Logo Scroll ─────────────────────────────────────────
  document.addEventListener('click', function (event) {
    const logoLink = event.target.closest('.nav__logo');
    if (!logoLink) return;

    const isHomePage = window.location.pathname === '/' ||
                       window.location.pathname.endsWith('index.html') ||
                       window.location.pathname === '';
    
    // If we're already on the home page, scroll to top smoothly
    if (isHomePage) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Close mobile menu if open
      if (typeof closeMobileMenu === 'function') {
        closeMobileMenu();
      }
    }
  });

  // ── Smooth Scroll ───────────────────────────────────────
  /**
   * Intercept clicks on anchor links (href="#section")
   * and scroll to the target with an offset for the sticky nav.
   */
  document.addEventListener('click', function (event) {
    var anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;

    var targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    var targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    event.preventDefault();

    var navHeight = nav ? nav.offsetHeight : 0;
    var targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });

    // Close mobile menu if open
    if (hamburger && hamburger.classList.contains('nav__hamburger--open')) {
      closeMobileMenu();
    }
  });

  // ── Scroll Reveal (IntersectionObserver) ────────────────
  /**
   * Observes elements with the `.reveal` class and adds
   * `.reveal--visible` when they enter the viewport.
   * Uses a 15% threshold for a natural "peek" trigger.
   */
  function initScrollReveal() {
    var revealElements = document.querySelectorAll('.reveal');

    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      revealElements.forEach(function (el) {
        el.classList.add('reveal--visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ── Sticky Mobile CTA ────────────────────────────────────
  /**
   * Shows the sticky bottom CTA bar once the user has scrolled
   * past the hero section on mobile. Hides when the contact
   * section is in view (don't double up on CTAs).
   */
  function initStickyCTA() {
    var stickyCTA = document.getElementById('sticky-cta');
    var hero = document.getElementById('hero');
    var contact = document.getElementById('contact');
    if (!stickyCTA || !hero) return;

    function updateStickyState() {
      var heroRect = hero.getBoundingClientRect();
      var pastHero = heroRect.bottom < 0;

      var contactVisible = false;
      if (contact) {
        var contactRect = contact.getBoundingClientRect();
        contactVisible = contactRect.top < window.innerHeight * 0.6 && contactRect.bottom > 0;
      }

      if (pastHero && !contactVisible) {
        stickyCTA.classList.add('sticky-cta--visible');
        stickyCTA.setAttribute('aria-hidden', 'false');
      } else {
        stickyCTA.classList.remove('sticky-cta--visible');
        stickyCTA.setAttribute('aria-hidden', 'true');
      }
    }

    window.addEventListener('scroll', updateStickyState, { passive: true });
    window.addEventListener('resize', updateStickyState, { passive: true });
    updateStickyState();
  }

  // ── Contact Form ─────────────────────────────────────────
  /**
   * Handles the contact form. If the form action still points to
   * the Formspree placeholder, we fall back to opening a
   * pre-filled mailto draft so the site works immediately even
   * before Formspree is wired up.
   */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      var action = form.getAttribute('action') || '';
      var isPlaceholder = action.indexOf('[FORMSPREE_ENDPOINT]') !== -1 || action === '';

      if (isPlaceholder) {
        // Fallback: build a mailto link with the form values.
        event.preventDefault();

        var data = new FormData(form);
        var name = (data.get('name') || '').toString().trim();
        var company = (data.get('company') || '').toString().trim();
        var email = (data.get('email') || '').toString().trim();
        var industry = (data.get('industry') || '').toString().trim();
        var message = (data.get('message') || '').toString().trim();

        var subject = 'Parkside Revenue Leak Assessment — ' + (company || name || 'Inquiry');
        var body =
          'Name: ' + name + '\n' +
          'Company: ' + company + '\n' +
          'Email: ' + email + '\n' +
          'Industry: ' + industry + '\n\n' +
          'Main revenue leak:\n' + (message || '(not provided)') + '\n';

        var mailto =
          'mailto:info@parksideag.com' +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(body);

        window.location.href = mailto;
        return;
      }

      // Formspree is wired up — let native submission proceed,
      // but show a success state on successful async submit.
      // (Formspree can also handle this with its own redirect URL.)
    });
  }

  // ── Initialize on DOM ready ──────────────────────────────
  function initAll() {
    initScrollReveal();
    initStickyCTA();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
