// Smooth scroll already handled by CSS (scroll-behavior)

// Scroll-to-top button
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.onscroll = function () {
  scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
};

scrollTopBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Optional: Simple form validation feedback
const form = document.querySelector('form');
form.addEventListener('submit', function (e) {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields before submitting.');
    e.preventDefault(); // stop form submission
  }
});
