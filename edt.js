/* =========================================================================
   Emploi du temps - Portail SITE (ST / SV) - Pré-rentrée
   -------------------------------------------------------------------------
   Fichier autonome, hébergé sur GitHub Pages.
   Côté KSUP, le HTML ne contient qu'un conteneur + la balise <script> :

       <div id="edt-portail-st"></div>
       <script src="https://portailst.github.io/edt.js/edt.js?v=7"></script>

   Tout (données + styles + interface) est généré ici, donc une mise à jour
   ne se fait qu'à un seul endroit.

   Pour modifier une séance : retrouve le groupe et le jour dans DATA, puis
   édite { time, cours, salle }. Les séances sont retriées automatiquement
   par horaire à l'affichage, l'ordre dans le fichier n'a donc pas d'impact.
   ========================================================================= */
(function () {
  "use strict";

  // --- Réglages ------------------------------------------------------------

  // Pin de localisation (icône réutilisée pour chaque salle).
  var PIN = "https://univ-cotedazur.fr/medias/photo/position_1689063333149-png?ID_FICHE=1202336";

  // Couleur par type de séance : on retient la couleur du PREMIER mot-clé
  // trouvé dans l'intitulé du cours. L'ordre compte donc (du + spécifique
  // au + générique).
  var COULEURS = [
    ["Réunion de Pré-Rentrée Portail SV", "#00887a"],
    ["Préparations aux concours",         "#c07ef1"],
    ["Projet Interface",                  "#00b1d2"],
    ["Amphi Méthodologie",                "#93329e"],
    ["TP BPL",                            "#8b572a"],
    ["TP Microscopie",                    "#8b572a"],
    ["Réunion",                           "#0095c8"],
    ["TD",                                "#007ba3"],
    ["FORUM",                             "#00a888"],
    ["Atelier",                           "#ff008c"],
    ["Présentation",                      "#a190f7"],
    ["Innovation",                        "#f9ae5d"],
    ["ÉVALUATION",                        "#eb1a1a"]
  ];
  var COULEUR_DEFAUT = "#999999";

  // Libellés du menu déroulant (sinon dérivés automatiquement de la clé).
  var LIBELLES = { groupeSVLAS: "Groupe SV LAS" };

  // --- Données -------------------------------------------------------------

  var DATA = {
    groupeST1: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail ST - OUI SI", salle: "AMPHI PHYSIQUE" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "14h00-15h00", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
      ]},
    ],
    groupeST3: [
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
      ]},
    ],
    groupeST7: [
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "10h15-11h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
      ]},
    ],
    groupeSV6: [
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
        { time: "13h00-14h00", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
  };

  // --- Outils --------------------------------------------------------------

  function couleurDe(cours) {
    for (var i = 0; i < COULEURS.length; i++) {
      if (cours.indexOf(COULEURS[i][0]) !== -1) return COULEURS[i][1];
    }
    return COULEUR_DEFAUT;
  }

  // Convertit un horaire ("8h00-10h00") en minutes pour le tri.
  // "(HORAIRE SUR MOODLE)" et autres -> renvoyés en fin de journée.
  function minutes(horaire) {
    var m = horaire.match(/(\d{1,2})h(\d{2})/);
    return m ? (+m[1]) * 60 + (+m[2]) : Infinity;
  }

  function libelle(cle) {
    return LIBELLES[cle] || "Groupe " + cle.replace("groupe", "");
  }

  // --- Styles --------------------------------------------------------------

  function injecterStyles() {
    if (document.getElementById("edt-styles")) return;
    var css =
      "#edt-portail-st{max-width:800px;margin:20px auto;background:#fff;padding:15px;border:1px solid #ddd;border-radius:12px;box-sizing:border-box;font-size:18px;color:#333;}" +
      "#edt-portail-st .edt-titre{margin:0 0 10px;font-size:24px;color:#007ba3;}" +
      "#edt-portail-st .edt-select{margin:15px 0 30px;padding:10px 16px;font-size:18px;border:2px solid #0095c8;border-radius:10px;background:#f0f9ff;cursor:pointer;min-width:200px;display:block;}" +
      "#edt-portail-st .edt-nav{display:flex;align-items:center;justify-content:center;gap:40px;margin-bottom:20px;}" +
      "#edt-portail-st .edt-arrow{background:#0095c8;border:none;color:#fff;width:50px;height:50px;border-radius:50%;cursor:pointer;box-shadow:0 6px 14px rgba(0,149,200,.35);display:flex;align-items:center;justify-content:center;}" +
      "#edt-portail-st .edt-arrow:hover{background:#007ba3;}" +
      "#edt-portail-st .edt-arrow svg{width:20px;height:20px;fill:#fff;}" +
      "#edt-portail-st .edt-date{font-size:22px;font-weight:bold;color:#005f82;min-width:160px;text-align:center;}" +
      "#edt-portail-st .edt-box{background:#e6f3fb;border:3px solid #0095c8;border-radius:15px;padding:20px 30px;box-shadow:0 0 12px rgba(0,149,200,.35);overflow:hidden;}" +
      "#edt-portail-st .edt-content{width:100%;transition:transform .2s ease-in-out;}" +
      "#edt-portail-st .edt-card{margin:14px 0;line-height:1.5;font-size:18px;border-radius:12px;padding:14px 18px;color:#fff;box-shadow:0 3px 6px rgba(0,0,0,.1);word-break:break-word;font-weight:bold;}" +
      "#edt-portail-st .edt-pin{width:20px;vertical-align:middle;filter:brightness(0) invert(1);}" +
      "#edt-portail-st .edt-empty{padding:20px;text-align:center;font-weight:bold;color:#eb1a1a;}";
    var s = document.createElement("style");
    s.id = "edt-styles";
    s.textContent = css;
    document.head.appendChild(s);
  }

  // --- Interface -----------------------------------------------------------

  var FLECHE_G = '<svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>';
  var FLECHE_D = '<svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>';

  var root, selectEl, dateEl, contentEl;
  var currentGroup, currentIndex = 0, sliding = false, t1 = null, t2 = null;

  function construire() {
    root = document.getElementById("edt-portail-st");
    if (!root) return;
    // Garde anti double-initialisation (ex. <script> inclus deux fois).
    if (root.getAttribute("data-edt-ready") === "1") return;
    root.setAttribute("data-edt-ready", "1");

    injecterStyles();

    var options = Object.keys(DATA).map(function (k) {
      return '<option value="' + k + '">' + libelle(k) + "</option>";
    }).join("");

    root.innerHTML =
      '<h2 class="edt-titre">Emploi du temps</h2>' +
      '<select class="edt-select" aria-label="Choisir un groupe">' + options + "</select>" +
      '<div class="edt-nav">' +
        '<button type="button" class="edt-arrow edt-prev" aria-label="Jour précédent">' + FLECHE_G + "</button>" +
        '<div class="edt-date" aria-live="polite"></div>' +
        '<button type="button" class="edt-arrow edt-next" aria-label="Jour suivant">' + FLECHE_D + "</button>" +
      "</div>" +
      '<div class="edt-box"><div class="edt-content"></div></div>';

    selectEl = root.querySelector(".edt-select");
    dateEl = root.querySelector(".edt-date");
    contentEl = root.querySelector(".edt-content");

    selectEl.addEventListener("change", changerGroupe);
    root.querySelector(".edt-prev").addEventListener("click", jourPrecedent);
    root.querySelector(".edt-next").addEventListener("click", jourSuivant);

    currentGroup = selectEl.value;
    currentIndex = 0;
    rendreDirect();
  }

  // --- Rendu ---------------------------------------------------------------

  // Affiche jour.events SANS jamais modifier DATA (tri sur une copie).
  function contenuJour(jour) {
    dateEl.textContent = jour.day + " - " + jour.date;
    var evs = jour.events.slice().sort(function (a, b) {
      return minutes(a.time) - minutes(b.time);
    });
    contentEl.innerHTML = evs.map(function (e) {
      return '<div class="edt-card" style="background:' + couleurDe(e.cours) + '">' +
               e.time + " : " + e.cours + "<br>" +
               '<img class="edt-pin" src="' + PIN + '" alt=""> <b>' + e.salle + "</b>" +
             "</div>";
    }).join("");
  }

  function afficherJour() {
    var jours = DATA[currentGroup];
    if (!jours || !jours.length || !jours[currentIndex]) {
      dateEl.textContent = "";
      contentEl.innerHTML = '<div class="edt-empty">Aucun cours disponible</div>';
      return;
    }
    contenuJour(jours[currentIndex]);
  }

  // Affichage immédiat (init / changement de groupe) : annule toute
  // animation en cours pour éviter qu'un minuteur en vol ne réaffiche
  // un mauvais jour ensuite.
  function rendreDirect() {
    if (t1) { clearTimeout(t1); t1 = null; }
    if (t2) { clearTimeout(t2); t2 = null; }
    sliding = false;
    if (contentEl) {
      contentEl.style.transition = "none";
      contentEl.style.transform = "translateX(0)";
    }
    afficherJour();
  }

  function changerGroupe() {
    currentGroup = selectEl.value;
    currentIndex = 0;
    rendreDirect();
  }

  function animer(direction) {
    var jours = DATA[currentGroup];
    if (!jours || !jours.length) return;
    sliding = true;
    contentEl.style.transition = "transform .2s ease-in-out";
    contentEl.style.transform = "translateX(" + (direction === "right" ? "-100%" : "100%") + ")";
    t1 = setTimeout(function () {
      afficherJour();
      contentEl.style.transition = "none";
      contentEl.style.transform = "translateX(" + (direction === "right" ? "100%" : "-100%") + ")";
      t2 = setTimeout(function () {
        contentEl.style.transition = "transform .2s ease-in-out";
        contentEl.style.transform = "translateX(0)";
        sliding = false;
        t1 = null;
        t2 = null;
      }, 20);
    }, 200);
  }

  // L'INDEX N'AVANCE QUE SI AUCUNE ANIMATION N'EST EN COURS.
  // -> impossible que l'index "double" ou saute un jour sur clics rapides.
  function jourSuivant() {
    if (sliding) return;
    var g = DATA[currentGroup];
    if (!g || !g.length) return;
    currentIndex = (currentIndex + 1) % g.length;
    animer("right");
  }

  function jourPrecedent() {
    if (sliding) return;
    var g = DATA[currentGroup];
    if (!g || !g.length) return;
    currentIndex = (currentIndex - 1 + g.length) % g.length;
    animer("left");
  }

  // --- Initialisation ------------------------------------------------------

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", construire);
  } else {
    construire();
  }
})();
