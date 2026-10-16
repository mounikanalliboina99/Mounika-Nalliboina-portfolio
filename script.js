// ==========================================================================
// Dynamic Typing Role Rotator
// ==========================================================================
const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "QA & Test Automation Architect",
  "Spring Boot & Angular Specialist",
  "Database Query Optimization Eng"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 90;
const deletingSpeed = 45;
const delayBetweenRoles = 2000;

const roleRotatorEl = document.getElementById("roleRotator");

function typeRole() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    roleRotatorEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    roleRotatorEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === currentRole.length) {
    currentSpeed = delayBetweenRoles;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    currentSpeed = 400;
  }

  setTimeout(typeRole, currentSpeed);
}

// ==========================================================================
// Mobile Menu Drawer Toggle
// ==========================================================================
const navToggleBtn = document.getElementById("navToggle");
const mobileNavEl = document.getElementById("mobileNav");

if (navToggleBtn && mobileNavEl) {
  navToggleBtn.addEventListener("click", () => {
    mobileNavEl.classList.toggle("open");
  });

  // Close mobile drawer when clicking any link
  const mobileLinks = mobileNavEl.querySelectorAll(".nav-link");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNavEl.classList.remove("open");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileNavEl.contains(e.target) && !navToggleBtn.contains(e.target)) {
      mobileNavEl.classList.remove("open");
    }
  });
}

// ==========================================================================
// Active Navigation Scroll Spy
// ==========================================================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links .nav-link");

function updateActiveNav() {
  const scrollY = window.pageYOffset + 160;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

// ==========================================================================
// Toast Notification Utility
// ==========================================================================
const toastNotice = document.getElementById("toastNotice");
const toastMessage = document.getElementById("toastMessage");
let toastTimeout;

function showToast(message) {
  if (!toastNotice) return;
  toastMessage.textContent = message;
  toastNotice.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastNotice.classList.remove("show");
  }, 2800);
}

// ==========================================================================
// Copy to Clipboard Buttons
// ==========================================================================
const btnCopyEmail = document.getElementById("btnCopyEmail");
const btnCopyPhone = document.getElementById("btnCopyPhone");

if (btnCopyEmail) {
  btnCopyEmail.addEventListener("click", () => {
    const email = "HZ39897@umbc.edu";
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Copied ${email} to clipboard!`);
    }).catch(() => {
      showToast(`Email: ${email}`);
    });
  });
}

if (btnCopyPhone) {
  btnCopyPhone.addEventListener("click", () => {
    const phone = "(443) 251-6408";
    navigator.clipboard.writeText(phone).then(() => {
      showToast(`Copied ${phone} to clipboard!`);
    }).catch(() => {
      showToast(`Phone: ${phone}`);
    });
  });
}

// ==========================================================================
// Intersection Observer for Smooth Fade-In Reveal
// ==========================================================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".exp-project-card, .skill-category-card, .achievement-card, .edu-card, .stat-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
  revealObserver.observe(el);
});

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  typeRole();
  updateActiveNav();
});
