/* ─────────────────────────────────────────────────────────────
   Logica del sito: lingua, rendering, filtri, scheda progetto.
   Normalmente non serve toccare questo file: i contenuti stanno
   in content.js.
   ───────────────────────────────────────────────────────────── */

(function () {
  "use strict";

  var STORAGE_KEY = "portfolio-lang";
  var lang = "it";

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "it" || saved === "en") lang = saved;
  } catch (e) { /* storage non disponibile: resta l'italiano */ }

  /* Restituisce la stringa nella lingua corrente.
     Accetta sia "testo" sia { it: "…", en: "…" }. */
  function t(value) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    return value[lang] != null ? value[lang] : (value.it != null ? value.it : "");
  }

  function path(obj, dotted) {
    return dotted.split(".").reduce(function (acc, key) {
      return acc == null ? null : acc[key];
    }, obj);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  var $ = function (sel) { return document.querySelector(sel); };

  /* ── Etichette statiche ─────────────────────────────────── */

  function applyLabels() {
    document.documentElement.lang = lang;
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (node) {
      node.textContent = t(path(CONTENT, node.getAttribute("data-i18n")));
    });
    $("#modal-close").setAttribute("aria-label", t(CONTENT.ui.close));
    Array.prototype.forEach.call(document.querySelectorAll(".langswitch__btn"), function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });
  }

  /* ── Sezioni ────────────────────────────────────────────── */

  function renderFacts() {
    var box = $("#facts");
    box.innerHTML = "";
    CONTENT.profile.facts.forEach(function (fact) {
      var wrap = el("div");
      wrap.appendChild(el("dt", null, t(fact.label)));
      wrap.appendChild(el("dd", null, t(fact.value)));
      box.appendChild(wrap);
    });
  }

  function renderLinks() {
    var rail = $("#rail-links");
    var contact = $("#contact-links");
    rail.innerHTML = "";
    contact.innerHTML = "";
    CONTENT.profile.links.forEach(function (link) {
      [rail, contact].forEach(function (list) {
        var li = el("li");
        var a = el("a", null, t(link.label));
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        li.appendChild(a);
        list.appendChild(li);
      });
    });
  }

  function renderAbout() {
    var box = $("#about-body");
    box.innerHTML = "";
    (CONTENT.about[lang] || CONTENT.about.it).forEach(function (paragraph) {
      var p = el("p");
      p.innerHTML = paragraph;
      box.appendChild(p);
    });
  }

  function renderStack() {
    var box = $("#stack");
    box.innerHTML = "";
    CONTENT.stack.forEach(function (group) {
      var card = el("div", "stack__group");
      card.appendChild(el("h3", null, t(group.group)));
      var ul = el("ul");
      group.items.forEach(function (item) { ul.appendChild(el("li", null, item)); });
      card.appendChild(ul);
      box.appendChild(card);
    });
  }

  function renderExperience() {
    var box = $("#timeline");
    box.innerHTML = "";
    CONTENT.experience.forEach(function (entry) {
      var li = el("li");
      li.appendChild(el("div", "timeline__period mono", t(entry.period)));
      var right = el("div");
      right.appendChild(el("h3", "timeline__role", t(entry.role)));
      right.appendChild(el("p", "timeline__org", t(entry.org)));
      right.appendChild(el("p", "timeline__text", t(entry.text)));
      li.appendChild(right);
      box.appendChild(li);
    });
  }

  function renderContact() {
    $("#contact-text").textContent = t(CONTENT.contact.text);
    $("#email-value").textContent = CONTENT.profile.email;
    $("#footer-text").textContent =
      t(CONTENT.ui.footer).replace("{year}", String(new Date().getFullYear()));
  }

  /* ── Progetti ───────────────────────────────────────────── */

  var activeFilter = null;

  function allTags() {
    var seen = [];
    CONTENT.projects.forEach(function (project) {
      (project.tags || []).forEach(function (tag) {
        if (seen.indexOf(tag) === -1) seen.push(tag);
      });
    });
    return seen;
  }

  function renderFilters() {
    var box = $("#filters");
    box.innerHTML = "";

    function addButton(label, value) {
      var btn = el("button", null, label);
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(activeFilter === value));
      btn.addEventListener("click", function () {
        activeFilter = value;
        renderFilters();
        renderProjects();
      });
      box.appendChild(btn);
    }

    addButton(t(CONTENT.ui.all), null);
    allTags().forEach(function (tag) { addButton(tag, tag); });
  }

  function renderProjects() {
    var box = $("#projects");
    box.innerHTML = "";

    var list = CONTENT.projects.filter(function (project) {
      return !activeFilter || (project.tags || []).indexOf(activeFilter) !== -1;
    });

    if (!list.length) {
      box.appendChild(el("p", "empty mono", t(CONTENT.ui.noResults)));
      return;
    }

    list.forEach(function (project) {
      var card = el("button", "card");
      card.type = "button";

      var media = el("div", "card__media");
      if (project.cover) {
        var img = el("img");
        img.src = project.cover;
        img.alt = "";
        img.loading = "lazy";
        media.appendChild(img);
      }
      if ((project.media || []).some(function (m) { return m.type === "video"; })) {
        media.appendChild(el("span", "card__badge", "▶ " + t(CONTENT.ui.videoBadge)));
      }
      card.appendChild(media);

      var body = el("div", "card__body");
      body.appendChild(el("p", "card__meta", [project.year, project.platform].filter(Boolean).join("  ·  ")));
      body.appendChild(el("h3", "card__title", project.title));
      body.appendChild(el("p", "card__summary", t(project.summary)));

      var tags = el("div", "tags");
      (project.tags || []).forEach(function (tag) { tags.appendChild(el("span", null, tag)); });
      body.appendChild(tags);

      card.appendChild(body);
      card.addEventListener("click", function () { openProject(project); });
      box.appendChild(card);
    });
  }

  /* ── Scheda progetto ────────────────────────────────────── */

  var modal = null, lastFocused = null, current = null;

  function showMedia(project, index) {
    var stage = $("#modal-stage");
    var item = (project.media || [])[index];
    stage.innerHTML = "";
    if (!item) return;

    if (item.type === "video") {
      var video = document.createElement("video");
      video.src = item.src;
      video.controls = true;
      video.preload = "none";
      video.playsInline = true;
      if (item.poster) video.poster = item.poster;
      stage.appendChild(video);
    } else {
      var img = el("img");
      img.src = item.src;
      img.alt = item.alt || project.title;
      stage.appendChild(img);
    }

    Array.prototype.forEach.call($("#modal-thumbs").children, function (btn, i) {
      btn.setAttribute("aria-pressed", String(i === index));
    });
  }

  function openProject(project) {
    current = project;
    lastFocused = document.activeElement;

    $("#modal-meta").textContent = [project.year, project.platform].filter(Boolean).join("  ·  ");
    $("#modal-title").textContent = project.title;

    var desc = $("#modal-desc");
    desc.innerHTML = "";
    var paragraphs = (project.description && project.description[lang]) ||
                     (project.description && project.description.it) || [];
    paragraphs.forEach(function (paragraph) {
      var p = el("p");
      p.innerHTML = paragraph;
      desc.appendChild(p);
    });

    var bullets = $("#modal-highlights");
    bullets.innerHTML = "";
    var items = (project.highlights && project.highlights[lang]) ||
                (project.highlights && project.highlights.it) || [];
    items.forEach(function (item) {
      var li = el("li");
      li.innerHTML = item;
      bullets.appendChild(li);
    });

    var tags = $("#modal-tags");
    tags.innerHTML = "";
    (project.tags || []).forEach(function (tag) { tags.appendChild(el("span", null, tag)); });

    var links = $("#modal-links");
    links.innerHTML = "";
    (project.links || []).forEach(function (link) {
      var a = el("a", "btn btn--small", t(link.label));
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      links.appendChild(a);
    });

    var thumbs = $("#modal-thumbs");
    thumbs.innerHTML = "";
    var media = project.media || [];
    thumbs.hidden = media.length < 2;
    media.forEach(function (item, i) {
      var btn = el("button");
      btn.type = "button";
      btn.setAttribute("aria-label", (item.alt || project.title) + " " + (i + 1));
      var img = el("img");
      img.src = item.type === "video" ? (item.poster || project.cover) : item.src;
      img.alt = "";
      img.loading = "lazy";
      btn.appendChild(img);
      if (item.type === "video") btn.classList.add("is-video");
      btn.addEventListener("click", function () { showMedia(project, i); });
      thumbs.appendChild(btn);
    });

    showMedia(project, 0);

    modal.hidden = false;
    document.body.classList.add("is-locked");
    $("#modal-close").focus();
  }

  function closeModal() {
    var video = $("#modal-stage").querySelector("video");
    if (video) video.pause();
    modal.hidden = true;
    document.body.classList.remove("is-locked");
    current = null;
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function stepMedia(delta) {
    if (!current || !current.media || current.media.length < 2) return;
    var thumbs = Array.prototype.slice.call($("#modal-thumbs").children);
    var index = thumbs.findIndex(function (b) { return b.getAttribute("aria-pressed") === "true"; });
    var next = (index + delta + current.media.length) % current.media.length;
    showMedia(current, next);
  }

  /* ── Navigazione ────────────────────────────────────────── */

  function setupScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
    var sections = links
      .map(function (a) { return document.querySelector(a.getAttribute("href")); })
      .filter(Boolean);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ── Avvio ──────────────────────────────────────────────── */

  function renderAll() {
    applyLabels();
    renderFacts();
    renderLinks();
    renderAbout();
    renderStack();
    renderFilters();
    renderProjects();
    renderExperience();
    renderContact();
  }

  function setLang(next) {
    lang = next;
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignora */ }
    renderAll();
    if (current) openProject(current);
  }

  document.addEventListener("DOMContentLoaded", function () {
    modal = $("#modal");

    Array.prototype.forEach.call(document.querySelectorAll(".langswitch__btn"), function (btn) {
      btn.addEventListener("click", function () { setLang(btn.dataset.lang); });
    });

    $("#modal-close").addEventListener("click", closeModal);
    modal.querySelector("[data-close]").addEventListener("click", closeModal);

    document.addEventListener("keydown", function (event) {
      if (modal.hidden) return;
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowRight") stepMedia(1);
      if (event.key === "ArrowLeft") stepMedia(-1);
    });

    var copyBtn = $("#copy-email");
    copyBtn.addEventListener("click", function () {
      var address = CONTENT.profile.email;
      var done = function () {
        copyBtn.textContent = t(CONTENT.ui.copied);
        setTimeout(function () { copyBtn.textContent = t(CONTENT.ui.copy); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(done, function () { selectEmail(); });
      } else {
        selectEmail();
      }
    });

    function selectEmail() {
      var range = document.createRange();
      range.selectNodeContents($("#email-value"));
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }

    renderAll();
    setupScrollSpy();
  });
})();
