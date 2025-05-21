// Initialize EmailJS and handle contact form submission
document.addEventListener("DOMContentLoaded", () => {
  // Set time input value
  const timeInput = document.getElementById('time');
  if (timeInput) {
    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // hour '0' should be '12'

    const formatted = now.getFullYear() + '-' +
      String(now.getMonth() + 1).padStart(2, '0') + '-' +
      String(now.getDate()).padStart(2, '0') + ' ' +
      String(hours).padStart(2, '0') + ':' +
      minutes + ':' +
      seconds + ' ' + ampm;

    timeInput.value = formatted;
  }

  emailjs.init("gtT5eWoY5AF_yQBko"); // Replace with your EmailJS Public Key

  const btn = document.getElementById('button');
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    btn.textContent = 'Sending...';

    const serviceID = 'service_fsu5cq7';
    const templateID = 'template_4cxjyle';

    emailjs.sendForm(serviceID, templateID, form)
      .then(() => {
        alert('Message sent successfully!');
        btn.textContent = 'Send Email';
        form.reset();
      }, (err) => {
        console.error('Email sending error:', err);
        alert('Failed to send message. See console for details.');
        btn.textContent = 'Send Email';
      });
  });
});

// Scroll to top button and section fade-in logic
document.addEventListener("DOMContentLoaded", () => {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header nav a");

  // Show/hide scroll top button on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }

    // Reveal sections on scroll
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom) {
        section.classList.add("visible");
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
        section.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      }
    });
  });

  // Scroll to top on button click
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Initial reveal on page load
  sections.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
  });

  // Fade in sections on page load as well
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add("visible");
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }
  });

  // Smooth scroll + fade between sections on nav click
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      // Fade out all sections
      sections.forEach(section => {
        section.style.transition = "opacity 0.5s ease";
        section.style.opacity = "0";
        section.classList.remove("visible");
      });

      // After fade out, scroll and fade in target section
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          targetSection.classList.add("visible");
          targetSection.style.opacity = "1";
          targetSection.style.transform = "translateY(0)";
        }, 500);
      }, 500);
    });
  });

  // Simple form validation
  const form = document.getElementById('contact-form');
  form.addEventListener("submit", e => {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields before submitting.");
      e.preventDefault();
    }
  });
});
