(function () {
  "use strict";
  var C = window.CAEMENTUM || {};
  var doc = document;
  doc.documentElement.classList.add("js");

  // Année du pied de page
  doc.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Courriel configuré
  if (C.email) doc.querySelectorAll("[data-email]").forEach(function (a) { a.textContent = C.email; a.href = "mailto:" + C.email; });

  // Réservation d'appel
  if (C.bookingUrl) doc.querySelectorAll("[data-booking]").forEach(function (a) { a.href = C.bookingUrl; a.target = "_blank"; a.rel = "noopener"; });

  // Page courante dans la navigation
  var here = location.pathname.split("/").pop() || "index.html";
  doc.querySelectorAll(".nav a").forEach(function (a) {
    var raw = a.getAttribute("href");
    if (raw.indexOf("#") !== -1) return;
    if (raw === here) a.setAttribute("aria-current", "page");
  });

  // Menu mobile
  var toggle = doc.querySelector(".nav-toggle"), nav = doc.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") { toggle.setAttribute("aria-expanded", "false"); nav.classList.remove("is-open"); } });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") { toggle.setAttribute("aria-expanded", "false"); nav.classList.remove("is-open"); } });
  }

  // Tarifs : choix de la durée
  var seg = doc.querySelector("[data-seg]");
  if (seg) {
    var apply = function (term) {
      doc.querySelectorAll(".term").forEach(function (t) { t.hidden = t.getAttribute("data-term") !== term; });
      doc.querySelectorAll("[data-choose]").forEach(function (a) {
        a.href = "inscription.html?pack=" + a.getAttribute("data-choose") + "&duree=" + term;
      });
    };
    var saved = null;
    try { saved = sessionStorage.getItem("cp-term"); } catch (e) {}
    var initial = saved || (seg.querySelector("input:checked") || {}).value || "six";
    var radio = seg.querySelector('input[value="' + initial + '"]');
    if (radio) radio.checked = true;
    apply(initial);
    seg.addEventListener("change", function (e) {
      apply(e.target.value);
      try { sessionStorage.setItem("cp-term", e.target.value); } catch (err) {}
    });
  }

  // Formulaires
  var fmt = new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 0, maximumFractionDigits: 2 });
  var TERMS = { monthly: "Forfait 1 mois", six: "Forfait 6 mois", year: "Forfait 12 mois" };
  var catalogue = null;
  var catEl = doc.getElementById("catalogue");
  if (catEl) { try { catalogue = JSON.parse(catEl.textContent); } catch (e) {} }

  var params = new URLSearchParams(location.search);
  var sujet = params.get("sujet"), csel = doc.getElementById("c-sujet");
  if (csel && sujet) { for (var q = 0; q < csel.options.length; q++) { if (csel.options[q].value === sujet) { csel.selectedIndex = q; break; } } }
  var pack = params.get("pack") || "piste";
  var duree = params.get("duree") || "six";
  if (catalogue) {
    if (!catalogue[pack]) pack = "piste";
    if (!TERMS[duree]) duree = "six";
    var p = catalogue[pack];
    var set = function (k, v) { var el = doc.querySelector('[data-sum="' + k + '"]'); if (el) el.textContent = v; };
    set("programme", p.nom);
    set("duree", pack === "communautaire" ? "Abonnement mensuel" : TERMS[duree]);
    set("total", fmt.format(p[duree]));
    var fp = doc.getElementById("f-programme"), fd = doc.getElementById("f-duree");
    if (fp) fp.value = p.nom;
    if (fd) fd.value = pack === "communautaire" ? "Abonnement mensuel" : TERMS[duree];
  }

  function encode(form) {
    var data = new FormData(form), out = new URLSearchParams();
    data.forEach(function (v, k) { out.append(k, v); });
    return out.toString();
  }
  function status(form, state, text) {
    var el = form.querySelector(".form-status");
    if (!el) return;
    el.hidden = false; el.setAttribute("data-state", state); el.textContent = text;
  }
  function validate(form) {
    var bad = null;
    form.querySelectorAll("[required]").forEach(function (f) {
      var ok = f.type === "checkbox" ? f.checked : f.value.trim() !== "";
      if (ok && f.type === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value);
      f.setAttribute("aria-invalid", ok ? "false" : "true");
      if (!ok && !bad) bad = f;
    });
    return bad;
  }

  doc.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = validate(form);
      if (bad) {
        status(form, "error", "Il manque une information : vérifiez le champ « " + (form.querySelector('label[for="' + bad.id + '"]') ? form.querySelector('label[for="' + bad.id + '"]').childNodes[0].textContent.trim() : "requis") + " ».");
        bad.focus();
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      status(form, "ok", "Envoi en cours…");
      var isInscription = form.getAttribute("data-form") === "inscription";
      fetch(C.formEndpoint || "/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: encode(form) })
        .then(function (r) { if (!r.ok) throw new Error("http " + r.status); })
        .then(function () {
          var link = isInscription && C.checkout && C.checkout[pack] && C.checkout[pack][duree];
          if (link) { location.href = link; return; }
          location.href = form.getAttribute("action");
        })
        .catch(function () {
          if (btn) btn.disabled = false;
          status(form, "error", "L’envoi n’a pas fonctionné. Écrivez-nous directement à " + (C.email || "notre adresse de contact") + " et nous vous répondons rapidement.");
        });
    });
  });

  // Page de remerciement
  var titre = doc.querySelector("[data-merci-titre]");
  if (titre) {
    var s = params.get("statut");
    var texte = doc.querySelector("[data-merci-texte]");
    if (s === "message") { titre.textContent = "Message envoyé."; texte.textContent = "Alexandre vous répond personnellement dans les meilleurs délais."; }
    if (s === "demande") { titre.textContent = "Inscription reçue."; texte.textContent = "Alexandre prépare votre diagnostic et vous écrit très vite pour confirmer la suite, y compris le paiement."; }
    if (s === "attente") { titre.textContent = "Vous êtes sur la liste."; texte.textContent = "Nous vous écrirons dès qu’il y aura du nouveau."; }
    if (s === "paye") { titre.textContent = "Paiement confirmé. Bienvenue."; texte.textContent = "Réservez maintenant votre visio de diagnostic."; }
  }
})();
