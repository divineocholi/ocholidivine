document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  // Toggle menu when hamburger is clicked
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when any link is clicked
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
});
