// =============================================
// PORTFOLIO — script.js
// =============================================

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '60px';
    navLinks.style.right = '20px';
    navLinks.style.background = 'var(--warm-white)';
    navLinks.style.border = '1px solid var(--border)';
    navLinks.style.borderRadius = '12px';
    navLinks.style.padding = '16px 24px';
    navLinks.style.gap = '16px';
    navLinks.style.boxShadow = '0 8px 32px rgba(28,26,23,0.12)';
  });
}

// Scroll-triggered fade-in for project cards and sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add fade-in styles dynamically
const style = document.createElement('style');
style.textContent = `
  .proj-card, .feat-card, .hg-card, .year-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .proj-card.visible, .feat-card.visible, .hg-card.visible, .year-section.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Observe all animatable elements
document.querySelectorAll('.proj-card, .feat-card, .hg-card, .year-section').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Highlight active nav link based on URL
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const linkPage = link.getAttribute('href').split('/').pop();
  if (linkPage === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});