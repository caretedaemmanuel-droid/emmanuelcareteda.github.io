// LIQUID GLASS PILL NAV — sliding indicator
function movePillIndicator(activeLink) {
  const indicator = document.querySelector('.pill-indicator');
  const nav = document.querySelector('.pill-nav');
  if (!indicator || !activeLink || !nav) return;
  const navRect = nav.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();
  indicator.style.left = (linkRect.left - navRect.left) + 'px';
  indicator.style.width = linkRect.width + 'px';
}

// Set active pill on scroll
const sections = ['home','about','demo','team','blog','faq','careers','contact'];
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  document.querySelectorAll('.pill-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === current) {
      link.classList.add('active');
      movePillIndicator(link);
    }
  });
});

// Move indicator on click
document.querySelectorAll('.pill-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.pill-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    movePillIndicator(link);
  });
});

// Init indicator position on load
window.addEventListener('load', () => {
  const firstActive = document.querySelector('.pill-link.active');
  movePillIndicator(firstActive);
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const answer = item.querySelector('.faq-a');
    const isOpen = answer.style.display === 'block';
    document.querySelectorAll('.faq-a').forEach(a => a.style.display = 'none');
    document.querySelectorAll('.faq-q span').forEach(s => s.textContent = '+');
    if (!isOpen) {
      answer.style.display = 'block';
      q.querySelector('span').textContent = '−';
    }
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
