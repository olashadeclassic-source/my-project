/* ============================================================
   PageTurner Pages — Starter Book Landing Page Template
   Interactive behaviors: nav toggle, smooth scroll, form handling
   ============================================================ */

(function () {
  'use strict';

  // ========== Mobile Navigation Toggle ==========
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('nav-links-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('nav-links-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('nav-links-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ========== Smooth Scroll for Anchor Links ==========
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  // ========== Newsletter Form Handling ==========
  const newsletterForm = document.querySelector('.newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('newsletter-name');
      const emailInput = document.getElementById('newsletter-email');
      const submitBtn = this.querySelector('button[type="submit"]');

      // Basic client-side validation
      let isValid = true;

      if (!nameInput.value.trim()) {
        highlightInvalid(nameInput);
        isValid = false;
      } else {
        clearInvalid(nameInput);
      }

      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        highlightInvalid(emailInput);
        isValid = false;
      } else {
        clearInvalid(emailInput);
      }

      if (!isValid) return;

      // Show loading state
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual API endpoint)
      // CUSTOMIZE: Replace this timeout with your actual form submission logic
      setTimeout(function () {
        // Show success message
        newsletterForm.innerHTML = `
          <div class="form-success" role="status">
            <span class="form-success-icon" aria-hidden="true">✓</span>
            <h3 class="form-success-title">Thanks, ${escapeHtml(nameInput.value.trim())}!</h3>
            <p class="form-success-text">Check your inbox for the free prequel chapter. Welcome to the garden!</p>
          </div>
        `;

        // Track conversion (example for analytics)
        if (typeof gtag === 'function') {
          gtag('event', 'newsletter_signup', {
            'event_category': 'conversion',
            'event_label': 'starter_template_newsletter'
          });
        }
      }, 1500);
    });
  }

  // ========== Utility Functions ==========

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function highlightInvalid(input) {
    input.style.borderColor = '#ef4444';
    input.setAttribute('aria-invalid', 'true');

    // Remove error styling on input
    input.addEventListener('input', function onInput() {
      if (isValidEmail(input.value) || (input.type === 'text' && input.value.trim())) {
        clearInvalid(input);
        input.removeEventListener('input', onInput);
      }
    }, { once: true });
  }

  function clearInvalid(input) {
    input.style.borderColor = '';
    input.removeAttribute('aria-invalid');
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ========== Add CSS for form success state ==========
  var style = document.createElement('style');
  style.textContent = `
    .form-success {
      text-align: center;
      padding: var(--space-md) 0;
    }
    .form-success-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--color-success, #10b981);
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: var(--space-md, 1rem);
    }
    .form-success-title {
      font-family: var(--font-serif, Georgia, serif);
      font-size: 1.5rem;
      color: var(--color-primary, #1a365d);
      margin-bottom: var(--space-sm, 0.5rem);
    }
    .form-success-text {
      color: var(--color-text-light, #6b7280);
      font-size: 1rem;
    }
  `;
  document.head.appendChild(style);

})();
