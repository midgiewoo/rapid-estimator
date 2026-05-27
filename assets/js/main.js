// SDSI Business Systems - Premium Website Interactions

document.addEventListener('DOMContentLoaded', () => {
  initTailwindConfig();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initContactForm();
  initScrollEffects();
  initProductPageTabs();
  initMockupLightbox();
});

// Tailwind Play CDN Configuration - Professional SDSI Theme
function initTailwindConfig() {
  if (typeof tailwind === 'undefined') return;
  
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          'sdsi-navy': '#0F2744',
          'sdsi-blue': '#2563EB',
          'sdsi-gray': {
            50: '#F8FAFC',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          }
        },
        fontFamily: {
          'sans': ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        }
      }
    }
  };
}

// Sticky Navbar + Scrolled State
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = window.scrollY;

  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
    lastScrollY = window.scrollY;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial state
}

// Mobile Hamburger Menu
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');
  const closeBtn = document.getElementById('mobile-menu-close');

  if (!toggle || !menu) return;

  const openMenu = () => {
    menu.classList.add('open');
    if (overlay) overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    menu.classList.remove('open');
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close on nav link click (mobile)
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      // Slight delay so navigation registers
      setTimeout(closeMenu, 80);
    });
  });

  // ESC key support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
    }
  });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        e.preventDefault();
        const offset = 80; // account for fixed nav
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        
        window.scrollTo({ top, behavior: 'smooth' });
        
        // Update URL without jump
        history.pushState(null, '', `#${targetId}`);
      }
    });
  });
}

// Contact Form Handler (all pages)
function initContactForm() {
  const forms = document.querySelectorAll('form[data-sdsi-form]');
  
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Sending...
          </span>
        `;
      }

      // Simulate realistic network delay
      await new Promise(resolve => setTimeout(resolve, 850));

      // Success UI
      showSuccessState(form);
      
      // Reset form
      form.reset();
      
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  });
}

function showSuccessState(form) {
  const container = form.parentElement;
  
  const successHTML = `
    <div class="toast bg-white border border-green-200 rounded-2xl p-8 text-center shadow-xl">
      <div class="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.75">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </div>
      <h3 class="text-2xl font-semibold text-sdsi-navy mb-2">Thank You</h3>
      <p class="text-sdsi-gray-600 mb-6 max-w-xs mx-auto">Your request has been received. A member of our team will contact you within 1 business day.</p>
      
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button onclick="window.location.reload()" 
                class="btn-secondary text-sm px-5 py-2.5">
          Submit Another Request
        </button>
        <a href="index.html" 
           class="btn-primary text-sm px-5 py-2.5">
          Return to Home
        </a>
      </div>
    </div>
  `;
  
  container.innerHTML = successHTML;
  
  // Scroll into view nicely
  container.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Scroll-based subtle animations and active nav highlighting
function initScrollEffects() {
  // Reveal on scroll for .fade-in elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-6');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll('.fade-in').forEach(el => {
    el.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-500', 'ease-out');
    observer.observe(el);
  });

  // Active section nav highlighting (for single page sections + multi page)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    const observerNav = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}` || 
                link.getAttribute('href').endsWith(`#${id}`)) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => observerNav.observe(section));
  }
}

// Product page in-page tab navigation (Rapid Estimator page)
function initProductPageTabs() {
  const tabContainer = document.querySelector('.product-nav');
  if (!tabContainer) return;

  const tabs = tabContainer.querySelectorAll('a');
  const panels = document.querySelectorAll('[data-tab-panel]');

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      
      const target = tab.getAttribute('href').replace('#', '');

      // Update active tab styles
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show matching panel
      panels.forEach(panel => {
        if (panel.getAttribute('data-tab-panel') === target) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });

      // Smooth scroll to content area
      const contentArea = document.getElementById('product-content');
      if (contentArea) {
        const top = contentArea.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Default activate first tab
  if (tabs.length) {
    tabs[0].classList.add('active');
  }
}

// Simple click-to-enlarge for product mockups (lightbox feel)
function initMockupLightbox() {
  const mockups = document.querySelectorAll('.mockup-frame img, .image-zoomable');
  
  mockups.forEach(img => {
    img.style.cursor = 'zoom-in';
    
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4 md:p-8';
      overlay.innerHTML = `
        <div class="relative max-w-[1100px] w-full">
          <button class="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-white text-sdsi-navy hover:bg-gray-100 transition-colors w-10 h-10 flex items-center justify-center rounded-full shadow-xl" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img src="${img.src}" class="w-full h-auto max-h-[88vh] object-contain rounded-xl shadow-2xl border border-white/10" alt="${img.alt || 'Enlarged product view'}">
          <p class="text-center text-white/70 text-sm mt-4 tracking-wide">Click anywhere or press ESC to close</p>
        </div>
      `;
      
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      const close = () => {
        overlay.classList.add('opacity-0');
        setTimeout(() => {
          overlay.remove();
          document.body.style.overflow = '';
        }, 160);
      };

      overlay.addEventListener('click', (ev) => {
        if (ev.target === overlay) close();
      });
      
      overlay.querySelector('button').addEventListener('click', close);
      
      document.addEventListener('keydown', function esc(e) {
        if (e.key === 'Escape') {
          close();
          document.removeEventListener('keydown', esc);
        }
      }, { once: true });
    });
  });
}

// Utility: Show a temporary toast (used in various places)
window.showToast = function(message, duration = 2800) {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-6 left-1/2 -translate-x-1/2 bg-sdsi-navy text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm z-[300] toast`;
  toast.innerHTML = `
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transition = 'all 0.2s ease';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 180);
  }, duration);
};

// Keyboard accessibility hint for demo buttons
document.addEventListener('keydown', function(e) {
  if (e.key === '/' && document.activeElement.tagName === 'BODY') {
    const demoBtn = document.querySelector('[data-demo-cta]');
    if (demoBtn) {
      e.preventDefault();
      demoBtn.click();
    }
  }
});