const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const closeMenu = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");
const scrollButtons = document.querySelectorAll("[data-scroll]");
const sidebarLinks = document.querySelectorAll(".sidebar a");
const form = document.getElementById("appointmentForm");
const formStatus = document.getElementById("formStatus");
const yearSpan = document.getElementById("year");

function openSidebar() {
  if (!sidebar || !overlay) return;
  sidebar.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
  sidebar.setAttribute("aria-hidden", "false");
}

function closeSidebar() {
  if (!sidebar || !overlay) return;
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
  sidebar.setAttribute("aria-hidden", "true");
}

if (menuToggle && sidebar && closeMenu && overlay) {
  menuToggle.addEventListener("click", openSidebar);
  closeMenu.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSidebar();
  });
}

scrollButtons.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    var targetSelector = btn.getAttribute("data-scroll");
    var target = document.querySelector(targetSelector);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

sidebarLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    var href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        closeSidebar();
      }
    }
  });
});

if (form && formStatus) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    formStatus.textContent = "Sending your request...";
    formStatus.style.color = "#64748b";
    setTimeout(function () {
      formStatus.textContent = "Thank you! We've received your request and will contact you soon.";
      formStatus.style.color = "#16a34a";
      form.reset();
    }, 1000);
  });
}

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Optional: Hero stat count-up when in view
function initHeroStats() {
  var stats = document.querySelectorAll(".hero-stat-num[data-count]");
  if (!stats.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-count"), 10);
        var suffix = el.nextElementSibling;
        var isK = suffix && suffix.textContent.indexOf("k") !== -1;
        var duration = 1500;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var ease = 1 - Math.pow(1 - progress, 2);
          var current = Math.floor(ease * target);
          el.textContent = current;
          if (current < target) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    },
    { threshold: 0.3 }
  );

  stats.forEach(function (stat) {
    observer.observe(stat);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeroStats);
} else {
  initHeroStats();
}
