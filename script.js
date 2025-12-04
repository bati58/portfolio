// Initialize EmailJS
emailjs.init("xAkNC3htpSskA_dTH"); // Replace with your actual Public Key

// Send email function
function sendMail() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const time = new Date().toLocaleString();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const templateParams = {
    title: "Portfolio Contact",
    name: name,
    email: email,
    message: message,
    time: time
  };

  const SERVICE_ID = "service_c02q6rk";     // Replace with your Service ID
  const TEMPLATE_ID = "template_8hvgukq";   // Replace with your Template ID

  const btn = document.querySelector("#contact form button");
  btn.disabled = true;
  btn.textContent = "Sending...";

  emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
    .then(() => {
      alert("Message sent successfully!");
      document.querySelector("#contact form").reset();
      btn.disabled = false;
      btn.textContent = "Send";
    })
    .catch(err => {
      console.error("EmailJS error:", err);
      alert("Failed to send message. Check console for details.");
      btn.disabled = false;
      btn.textContent = "Send";
    });
}

// Fade-in animation for sections
const sections = document.querySelectorAll(".section");
function reveal() {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 150) {
      sec.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', reveal);
reveal();

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  hamburger.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    hamburger.classList.remove('active');
  });
});
