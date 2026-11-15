// ==========================================================================
// Interactive Portfolio Scripts - Fathima Naja
// Features: Navigation, Filtering, Modals, Contact Form Submission
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 2. Sticky Navbar Glass Blur
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Interactive Skills Category Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-meter-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 4. Interactive Project Detail Modals
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const closeButtons = document.querySelectorAll('.modal-close-btn');
  const overlays = document.querySelectorAll('.modal-overlay');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      overlays.forEach(modal => modal.classList.remove('open'));
      document.body.style.overflow = '';
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlays.forEach(modal => modal.classList.remove('open'));
      document.body.style.overflow = '';
    }
  });

  // 5. Scroll Reveal Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    '.about-card, .info-card, .skill-meter-card, .project-card, .timeline-item'
  );

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });
});

// 6. Direct Contact Form Handler (Opens Default Mail Client or shows confirmation)
function handleFormSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('senderSubject').value.trim();
  const message = document.getElementById('senderMessage').value.trim();
  const statusMsg = document.getElementById('formStatusMsg');
  const submitBtn = document.getElementById('formSubmitBtn');

  if (!name || !email || !message) return;

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Preparing message...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

  // Encode for mailto client
  const encodedSubject = encodeURIComponent(`Portfolio Inquiry: ${subject || 'New Contact'} - from ${name}`);
  const encodedBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  setTimeout(() => {
    // Open default mail client with prefilled data
    window.location.href = `mailto:fathiinaja22@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

    statusMsg.className = 'form-status success';
    statusMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you ${name}! Your email draft has been prepared to send directly to fathiinaja22@gmail.com.`;
    
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;
    document.getElementById('portfolioContactForm').reset();
  }, 600);
}
