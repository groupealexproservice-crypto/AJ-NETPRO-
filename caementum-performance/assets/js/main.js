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

  // Tarifs : durée du forfait
  var segs = doc.querySelectorAll("[data-seg]");
  if (segs.length) {
    var state = { term: "year" };
    try { var sv = JSON.parse(sessionStorage.getItem("cp-sel") || "{}"); if (sv.term) state.term = sv.term; } catch (e) {}
    var applySel = function () {
      doc.querySelectorAll(".term").forEach(function (t) { t.hidden = t.getAttribute("data-term") !== state.term; });
      doc.querySelectorAll("[data-choose]").forEach(function (a) {
        var term = a.hasAttribute("data-monthly") ? "monthly" : state.term;
        a.href = "inscription.html?pack=" + a.getAttribute("data-choose") + "&duree=" + term;
      });
      segs.forEach(function (sg) { var r = sg.querySelector('input[value="' + state[sg.getAttribute("data-seg")] + '"]'); if (r) r.checked = true; });
    };
    applySel();
    segs.forEach(function (sg) {
      sg.addEventListener("change", function (e) {
        state[sg.getAttribute("data-seg")] = e.target.value;
        try { sessionStorage.setItem("cp-sel", JSON.stringify(state)); } catch (err) {}
        applySel();
      });
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
    if (!TERMS[duree]) duree = "year";
    var p = catalogue[pack];
    var set = function (k, v) { var el = doc.querySelector('[data-sum="' + k + '"]'); if (el) el.textContent = v; };
    var dureeLabel = pack === "communautaire" ? "Abonnement mensuel" : TERMS[duree];
    set("programme", p.nom); set("duree", dureeLabel);
    var fp = doc.getElementById("f-programme"), fd = doc.getElementById("f-duree");
    if (fp) fp.value = p.nom; if (fd) fd.value = dureeLabel;
    var recompute = function () {
      var total = p[duree], names = [];
      doc.querySelectorAll('input[name="option"]:checked').forEach(function (o) { total += Number(o.getAttribute("data-price")); names.push(o.value); });
      set("total", fmt.format(total));
      var row = doc.querySelector('[data-sum-row="options"]');
      if (row) { row.hidden = names.length === 0; set("options", names.join(", ")); }
    };
    doc.querySelectorAll('input[name="option"]').forEach(function (o) { o.addEventListener("change", recompute); });
    var gSel = doc.getElementById("i-genre"), gRow = doc.getElementById("genre-autre-row");
    if (gSel && gRow) gSel.addEventListener("change", function () { gRow.hidden = gSel.value !== "autre"; });
    recompute();
  }

  // Panier (conservé dans le navigateur)
  var KEY = "cp-cart", live = doc.getElementById("live");
  function loadCart() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function updateCount(c) {
    var n = (c || loadCart()).reduce(function (a, i) { return a + i.qte; }, 0);
    doc.querySelectorAll("[data-cart-count]").forEach(function (el) { el.textContent = n; });
  }
  function saveCart(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} updateCount(c); }
  updateCount();

  doc.querySelectorAll("[data-product]").forEach(function (card) {
    var a = card.querySelector("[data-add]");
    if (!a) return;
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var r = card.querySelector("input[type=radio]:checked"), t = r ? r.value : "Taille unique";
      var c = loadCart(), id = card.getAttribute("data-product");
      var found = c.filter(function (i) { return i.id === id && i.taille === t; })[0];
      var price = card.getAttribute("data-price");
      if (found) found.qte += 1; else c.push({ id: id, nom: card.getAttribute("data-name"), taille: t, qte: 1, prix: price === "" ? null : Number(price) });
      saveCart(c);
      var old = a.textContent; a.textContent = "Ajouté au panier";
      if (live) live.textContent = card.getAttribute("data-name") + ", taille " + t + ", ajouté au panier.";
      setTimeout(function () { a.textContent = old; }, 1600);
    });
  });

  // Page du panier
  var cartList = doc.getElementById("cart-list");
  if (cartList) {
    var cartEmpty = doc.getElementById("cart-empty"), cartForm = doc.getElementById("cart-form");
    var renderCart = function () {
      var c = loadCart(), n = 0, total = 0, unpriced = false;
      cartList.textContent = "";
      c.forEach(function (it, idx) {
        n += it.qte; if (it.prix == null) unpriced = true; else total += it.prix * it.qte;
        var li = doc.createElement("li"); li.className = "cart-item";
        var info = doc.createElement("div"), h = doc.createElement("strong"), sub = doc.createElement("span");
        h.textContent = it.nom; sub.textContent = "Taille : " + it.taille + (it.prix == null ? " (prix à confirmer)" : " (" + fmt.format(it.prix) + ")");
        info.appendChild(h); info.appendChild(sub);
        var qty = doc.createElement("div"); qty.className = "qty";
        var mk = function (label, aria, delta) {
          var b = doc.createElement("button"); b.type = "button"; b.textContent = label; b.setAttribute("aria-label", aria + " " + it.nom + ", taille " + it.taille);
          b.addEventListener("click", function () { var cc = loadCart(); cc[idx].qte += delta; if (cc[idx].qte < 1) cc.splice(idx, 1); saveCart(cc); renderCart(); });
          return b;
        };
        var q = doc.createElement("span"); q.textContent = it.qte;
        qty.appendChild(mk("−", "Retirer un exemplaire de", -1)); qty.appendChild(q); qty.appendChild(mk("+", "Ajouter un exemplaire de", 1));
        var rm = doc.createElement("button"); rm.type = "button"; rm.className = "rm"; rm.textContent = "Retirer";
        rm.addEventListener("click", function () { var cc = loadCart(); cc.splice(idx, 1); saveCart(cc); renderCart(); });
        li.appendChild(info); li.appendChild(qty); li.appendChild(rm); cartList.appendChild(li);
      });
      cartEmpty.hidden = c.length > 0; cartForm.hidden = c.length === 0;
      var sn = doc.querySelector("[data-cart-total-n]"), st = doc.querySelector("[data-cart-total]");
      if (sn) sn.textContent = n;
      if (st) st.textContent = (unpriced || !c.length) ? "À confirmer" : fmt.format(total);
    };
    renderCart();
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
      if (form.getAttribute("data-form") === "commande") {
        var items = loadCart();
        if (!items.length) { status(form, "error", "Votre panier est vide : ajoutez une pièce depuis la boutique."); return; }
        form.querySelector("[name=articles]").value = items.map(function (i) {
          return i.nom + ", taille " + i.taille + ", quantité " + i.qte + (i.prix == null ? " (prix à confirmer)" : " (" + i.prix + " $)");
        }).join("\n");
      }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      status(form, "ok", "Envoi en cours…");
      var isInscription = form.getAttribute("data-form") === "inscription";
      fetch(C.formEndpoint || "/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: encode(form) })
        .then(function (r) { if (!r.ok) throw new Error("http " + r.status); })
        .then(function () {
          var link = isInscription && C.checkout && C.checkout[pack] && C.checkout[pack][duree];
          if (form.getAttribute("data-form") === "commande") { try { localStorage.removeItem(KEY); } catch (e2) {} }
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
    if (s === "commande") { titre.textContent = "Commande reçue."; texte.textContent = "Nous vous écrivons très vite pour confirmer les détails, le prix et la livraison."; }
    if (s === "attente") { titre.textContent = "Vous êtes sur la liste."; texte.textContent = "Nous vous écrirons dès qu’il y aura du nouveau."; }
    if (s === "paye") { titre.textContent = "Paiement confirmé. Bienvenue."; texte.textContent = "Réservez maintenant votre visio de diagnostic."; }
  }
})();
