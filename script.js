/* =========================================================================
   Kis István · Coaching — interakciók
   ========================================================================= */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navToggle = document.getElementById("navToggle");
  var navLinksEl = document.getElementById("navLinks");
  var backdrop = document.getElementById("menuBackdrop");

  /* A backdrop a CSS láthatóságával működik, nem a hidden attribútummal. */
  if (backdrop) backdrop.removeAttribute("hidden");

  /* ---------- Sticky header: háttér scrollra ---------- */
  function onScroll() {
    if (window.scrollY > 12) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobil menü ---------- */
  function openMenu() {
    document.body.classList.add("menu-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Menü bezárása");
  }
  function closeMenu() {
    document.body.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Menü megnyitása");
  }
  function toggleMenu() {
    if (document.body.classList.contains("menu-open")) closeMenu();
    else openMenu();
  }

  if (navToggle) navToggle.addEventListener("click", toggleMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);

  /* Menü bezárása linkre kattintva + Escape-re */
  if (navLinksEl) {
    navLinksEl.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) closeMenu();
  });
  /* Ablakméret-váltáskor (mobilról desktopra) zárjuk a menüt */
  window.addEventListener("resize", function () {
    if (window.innerWidth > 760) closeMenu();
  });

  /* ---------- Scroll-reveal animáció ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Aktív navigációs link ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navAnchors = navLinksEl ? navLinksEl.querySelectorAll('a[href^="#"]') : [];
  if ("IntersectionObserver" in window && sections.length && navAnchors.length) {
    var linkFor = {};
    navAnchors.forEach(function (a) { linkFor[a.getAttribute("href").slice(1)] = a; });

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navAnchors.forEach(function (a) { a.classList.remove("active"); });
          var active = linkFor[entry.target.id];
          if (active) active.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- GYIK harmonika ---------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var ans = item.querySelector(".faq-a");
    if (!btn || !ans) return;

    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      if (isOpen) {
        ans.style.maxHeight = null;
        item.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        ans.style.maxHeight = ans.scrollHeight + "px";
      }
    });
  });
  /* Ablakméret-váltáskor a nyitott válasz magasságának frissítése */
  window.addEventListener("resize", function () {
    document.querySelectorAll(".faq-item.open .faq-a").forEach(function (ans) {
      ans.style.maxHeight = ans.scrollHeight + "px";
    });
  });

  /* ---------- Évszám a footerben ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Cal.com időpontfoglaló popup ----------
     A foglalós linkeknél (data-cal-link) magunk nyitjuk meg a Cal modalt (overlay)
     az API-n keresztül — így minden elemnél megbízhatóan működik: ikon, nyilas gomb
     vagy szövegre kattintás. A href no-JS fallbackként marad (ha a Cal nem töltődik be). */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-cal-link]");
    if (!el) return;
    if (typeof window.Cal !== "function") return; // Cal nincs betöltve → marad a href fallback
    e.preventDefault();
    e.stopImmediatePropagation();
    var link = el.getAttribute("data-cal-link");
    var ns = el.getAttribute("data-cal-namespace");
    var config = { layout: "month_view" };
    try {
      var raw = el.getAttribute("data-cal-config");
      if (raw) config = JSON.parse(raw);
    } catch (err) {}
    var api = (ns && window.Cal.ns && window.Cal.ns[ns]) ? window.Cal.ns[ns] : window.Cal;
    api("modal", { calLink: link, config: config });
  }, true);

  /* ---------- Kapcsolati űrlap (Formspree) ----------
     Az űrlap a <form action="..."> Formspree-végpontra küld (AJAX, oldalújratöltés nélkül).
     Állítsd be a saját Formspree-azonosítódat az index.html <form action="..."> attribútumában. */
  var form = document.getElementById("contactForm");
  var statusEl = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      statusEl.style.color = "";
      statusEl.textContent = "";

      var nameEl = document.getElementById("cf-name");
      var emailEl = document.getElementById("cf-email");
      var msgEl = document.getElementById("cf-msg");
      var consentEl = document.getElementById("cf-consent");

      if (!nameEl.value.trim() || !emailEl.value.trim() || !msgEl.value.trim()) {
        statusEl.style.color = "#C0392B";
        statusEl.textContent = "Kérlek, töltsd ki a kötelező mezőket (név, e-mail, üzenet).";
        return;
      }
      if (!consentEl.checked) {
        statusEl.style.color = "#C0392B";
        statusEl.textContent = "Kérlek, fogadd el az adatkezelési tájékoztatót.";
        return;
      }
      if (form.action.indexOf("YOUR_FORM_ID") !== -1) {
        statusEl.style.color = "#C0392B";
        statusEl.textContent = "Az űrlap még nincs bekötve (hiányzik a Formspree-azonosító).";
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalLabel = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Küldés…"; }
      statusEl.style.color = "#6B7A91";
      statusEl.textContent = "Küldés folyamatban…";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            statusEl.style.color = "#1E50A8";
            statusEl.textContent = "Köszönöm az üzeneted! Hamarosan válaszolok.";
          } else {
            statusEl.style.color = "#C0392B";
            statusEl.textContent = "Hiba történt a küldés során. Próbáld újra, vagy foglalj időpontot a fenti linken.";
          }
        })
        .catch(function () {
          statusEl.style.color = "#C0392B";
          statusEl.textContent = "Hiba történt a küldés során. Próbáld újra, vagy foglalj időpontot a fenti linken.";
        })
        .then(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
        });
    });
  }
})();
