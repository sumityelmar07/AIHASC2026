/**
 * AIHASC 2027 — Interactive Conference Features
 * Includes: Countdown timer, Dark/Light Theme Switcher, Mobile Navigation,
 * Track Real-Time Search & Filtering, Accordions, Copy-to-Clipboard, and Contact Form.
 */

(function () {
  'use strict';

  function initAIHASC() {
    // =========================================================================
    // 1. Theme Switcher (Dark / Light Mode)
    // =========================================================================
    var themeBtn = document.getElementById('theme-toggle');
    var savedTheme = localStorage.getItem('aihasc-theme');

    function applyTheme(isLight) {
      if (isLight) {
        document.body.classList.add('light-mode');
        if (themeBtn) {
          themeBtn.innerHTML = '<span class="theme-icon">🌙</span><span class="theme-text">Dark Mode</span>';
          themeBtn.setAttribute('title', 'Switch to Dark Theme');
        }
      } else {
        document.body.classList.remove('light-mode');
        if (themeBtn) {
          themeBtn.innerHTML = '<span class="theme-icon">☀️</span><span class="theme-text">Light Mode</span>';
          themeBtn.setAttribute('title', 'Switch to Light Theme');
        }
      }
    }

    if (savedTheme === 'light') {
      applyTheme(true);
    } else {
      applyTheme(false);
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var isCurrentlyLight = document.body.classList.contains('light-mode');
        var newThemeLight = !isCurrentlyLight;
        applyTheme(newThemeLight);
        localStorage.setItem('aihasc-theme', newThemeLight ? 'light' : 'dark');
      });
    }

    // =========================================================================
    // 2. Mobile Navigation Drawer Toggle
    // =========================================================================
    var mobileToggle = document.querySelector('.mobile-toggle');
    var navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        navMenu.classList.toggle('open');
        var expanded = navMenu.classList.contains('open');
        mobileToggle.setAttribute('aria-expanded', expanded);
      });

      // Close on navigation link click
      navMenu.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
          navMenu.classList.remove('open');
        });
      });

      // Close when clicking outside
      document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
          navMenu.classList.remove('open');
        }
      });
    }

    // =========================================================================
    // 3. Highlight Current Active Page in Navigation
    // =========================================================================
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[data-page]').forEach(function (link) {
      var pageAttr = link.getAttribute('data-page');
      if (pageAttr === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // =========================================================================
    // 4. Live Countdown to Conference: 25 March 2027, 09:00 IST (03:30 UTC)
    // =========================================================================
    var targetDate = new Date(Date.UTC(2027, 2, 25, 3, 30, 0)).getTime();
    var elDays = document.getElementById('cd-days');
    var elHours = document.getElementById('cd-hours');
    var elMins = document.getElementById('cd-mins');
    var elSecs = document.getElementById('cd-secs');

    if (elDays && elHours && elMins && elSecs) {
      function updateCountdown() {
        var now = new Date().getTime();
        var distance = targetDate - now;

        if (distance <= 0) {
          elDays.textContent = '00';
          elHours.textContent = '00';
          elMins.textContent = '00';
          elSecs.textContent = '00';
          return;
        }

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var secs = Math.floor((distance % (1000 * 60)) / 1000);

        elDays.textContent = String(days).padStart(2, '0');
        elHours.textContent = String(hours).padStart(2, '0');
        elMins.textContent = String(mins).padStart(2, '0');
        elSecs.textContent = String(secs).padStart(2, '0');
      }

      updateCountdown();
      setInterval(updateCountdown, 1000);
    }

    // =========================================================================
    // 5. Interactive Tracks Filtering & Live Search
    // =========================================================================
    var searchInput = document.getElementById('track-search');
    var filterPills = document.querySelectorAll('.filter-pill');
    var trackCards = document.querySelectorAll('.track-card');
    var matchNotice = document.getElementById('track-match-count');

    if (searchInput || filterPills.length > 0) {
      function filterTracks() {
        var query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        var activePill = document.querySelector('.filter-pill.active');
        var categoryFilter = activePill ? activePill.getAttribute('data-filter') : 'all';

        var matchCount = 0;

        trackCards.forEach(function (card) {
          var cardCategory = card.getAttribute('data-category') || '';
          var cardText = card.textContent.toLowerCase();

          var matchesCategory = (categoryFilter === 'all') || (cardCategory === categoryFilter);
          var matchesQuery = !query || cardText.indexOf(query) !== -1;

          if (matchesCategory && matchesQuery) {
            card.style.display = 'flex';
            matchCount++;
          } else {
            card.style.display = 'none';
          }
        });

        if (matchNotice) {
          if (query || categoryFilter !== 'all') {
            matchNotice.textContent = 'Showing ' + matchCount + ' of ' + trackCards.length + ' tracks';
            matchNotice.style.display = 'block';
          } else {
            matchNotice.style.display = 'none';
          }
        }
      }

      if (searchInput) {
        searchInput.addEventListener('input', filterTracks);
      }

      filterPills.forEach(function (pill) {
        pill.addEventListener('click', function () {
          filterPills.forEach(function (p) { p.classList.remove('active'); });
          pill.classList.add('active');
          filterTracks();
        });
      });
    }

    // =========================================================================
    // 6. Accordions (Author Guidelines, FAQs, Review Policy)
    // =========================================================================
    var accButtons = document.querySelectorAll('.acc-btn');
    accButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.parentElement;
        var body = item.querySelector('.acc-body');
        var isOpen = item.classList.contains('open');

        var container = item.closest('.accordion');
        if (container) {
          container.querySelectorAll('.acc-item.open').forEach(function (openItem) {
            if (openItem !== item) {
              openItem.classList.remove('open');
              var openBody = openItem.querySelector('.acc-body');
              if (openBody) openBody.style.maxHeight = null;
            }
          });
        }

        if (isOpen) {
          item.classList.remove('open');
          body.style.maxHeight = null;
        } else {
          item.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 30 + 'px';
        }
      });
    });

    // =========================================================================
    // 7. Floating Back-to-Top Button
    // =========================================================================
    var backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 350) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      });

      backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // =========================================================================
    // 8. Copy to Clipboard Utility
    // =========================================================================
    window.copyConferenceCitation = function () {
      var textToCopy = 'International Conference on AI for Healthcare, Agriculture and Sustainable Computing (AIHASC 2027). Proposed Dates: 25–26 March 2027 | Pune, Maharashtra, India.';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(function () {
          showToast('Conference citation copied to clipboard!');
        }).catch(function () {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }
    };

    function fallbackCopyText(text) {
      var textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        showToast('Conference citation copied to clipboard!');
      } catch (err) {
        showToast('Could not copy automatically. Please copy manually.');
      }
      document.body.removeChild(textArea);
    }

    function showToast(message) {
      var toast = document.createElement('div');
      toast.className = 'aihasc-toast';
      toast.textContent = message;
      toast.style.position = 'fixed';
      toast.style.bottom = '30px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      toast.style.background = '#10b981';
      toast.style.color = '#ffffff';
      toast.style.padding = '12px 24px';
      toast.style.borderRadius = '30px';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
      toast.style.zIndex = '9999';
      toast.style.fontSize = '0.9rem';
      toast.style.fontWeight = '600';
      toast.style.transition = 'all 0.3s ease';

      document.body.appendChild(toast);
      setTimeout(function () {
        toast.style.opacity = '0';
        setTimeout(function () {
          if (toast.parentElement) toast.parentElement.removeChild(toast);
        }, 300);
      }, 2800);
    }

    // =========================================================================
    // 9. Contact / Inquiries Form Validation
    // =========================================================================
    var contactForm = document.getElementById('aihasc-contact-form');
    var formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('contact-name').value.trim();
        var email = document.getElementById('contact-email').value.trim();
        var subject = document.getElementById('contact-subject').value.trim();
        var message = document.getElementById('contact-message').value.trim();

        if (!name || !email || !message) {
          formFeedback.innerHTML = '<div style="color:#ef4444;background:rgba(239,68,68,0.1);padding:12px;border-radius:8px;margin-top:16px;">⚠️ Please fill in all required fields (Name, Email, Message).</div>';
          return;
        }

        formFeedback.innerHTML = '<div style="color:#10b981;background:rgba(16,185,129,0.12);padding:14px;border-radius:8px;margin-top:16px;border:1px solid rgba(16,185,129,0.3);">✓ Thank you, <strong>' + escapeHtml(name) + '</strong>! Your message has been received. The AIHASC 2027 Secretariat will review and respond to <em>' + escapeHtml(email) + '</em> shortly.</div>';
        contactForm.reset();
      });
    }

    function escapeHtml(string) {
      var div = document.createElement('div');
      div.innerText = string;
      return div.innerHTML;
    }
  }

  // Execute immediately if DOM is ready, or on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAIHASC);
  } else {
    initAIHASC();
  }
})();
