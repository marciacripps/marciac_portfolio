// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('darkMode', isDark);
}

// Initialize theme
const savedTheme = localStorage.getItem('darkMode');
setTheme(savedTheme !== null ? JSON.parse(savedTheme) : prefersDark.matches);

themeToggle.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark'));
});

// Mobile Menu
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Contact Form
const contactForm = document.getElementById('contact-form');

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      console.log('Form submission started');
      
      // Log form data
      const formData = new FormData(form);
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      console.log('Form data to be submitted:', formDataObj);
      
      // Check if form-name is present
      if (!formDataObj['form-name']) {
        console.error('form-name is missing from form data');
      }
      
      // Check if Netlify form detection is working
      if (!form.hasAttribute('data-netlify')) {
        console.error('data-netlify attribute is missing');
      }
      
      // Log the form's action URL
      console.log('Form action URL:', form.action);
      
      // Log the form's method
      console.log('Form method:', form.method);
    });
  } else {
    console.error('Contact form not found in the document');
  }
});

// Intersection Observer for animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

// Observe all sections except hero
document.querySelectorAll('section:not(#home)').forEach(section => {
  observer.observe(section);
});

// Handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});