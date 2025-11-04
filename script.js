// Toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    // Toggles the 'bx-x' class on the menu icon to change its appearance
    menuIcon.classList.toggle('bx-x');
    // Toggles the 'active' class on the navbar to show/hide it on mobile
    navbar.classList.toggle('active');
};

// Scroll sections active link and smooth scroll
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        // Adjusted offset for better activation point, accounting for fixed header
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        // Check if the current scroll position is within the section
        if (top >= offset && top < offset + height) {
            // Remove 'active' class from all nav links
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            // Add 'active' class to the corresponding nav link
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });

    // Sticky header effect: add background when scrolled down
    let header = document.querySelector('header');
    header.classList.toggle('bg-gray-800', window.scrollY > 100);

    // Automatically close the mobile menu when scrolling
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default jump behavior

        const targetId = this.getAttribute('href').substring(1); // Get the section ID (e.g., 'home', 'about')
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Adjust offset as needed for fixed header
                behavior: 'smooth' // Smooth scroll effect
            });
        }
        // Close the mobile menu after clicking a link
        if (navbar.classList.contains('active')) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
    });
});

// Typed.js for the "multiple-text" span in the home section
const typed = new Typed('.multiple-text', {
    strings: ['Backend Developer', 'Python Developer', 'Junior Software Developer', 'API Integration Expert', 'Database & Query Optimization Enthusiast'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

(function () {
  emailjs.init("wBO8d0CXFOXOHd6bJ");
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const sendBtn = document.getElementById("sendBtn");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page refresh
    sendBtn.value = "Sending...";

    emailjs.sendForm("service_tedkcpv", "template_zigxkmb", form).then(
      function () {
        showToast("✅ Message sent successfully!", "success");
        sendBtn.value = "Send Message";
        form.reset();
      },
      function (error) {
        console.error("EmailJS error:", error);
        showToast("❌ Failed to send message.", "error");
        sendBtn.value = "Send Message";
      }
    );
  });

  function showToast(message, type) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = `fixed bottom-6 right-6 px-4 py-2 text-white rounded shadow-lg z-50 ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
});
