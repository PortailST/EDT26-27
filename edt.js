/* =========================================================================
   Emploi du temps - Portail SITE (ST / SV) - Pré-rentrée
   -------------------------------------------------------------------------
   Fichier autonome (GitHub Pages). Côté KSUP : un conteneur + ce script.

       <div id="edt-portail-st"></div>
       <script src="https://portailst.github.io/EDT26-27/edt.js?v=10"></script>

   Données structurées { time, cours, salle }, triées par horaire à
   l'affichage. Tout le visuel (styles, interface) est généré ici.
   ========================================================================= */
(function () {
  "use strict";

  // --- Textes d'en-tête ----------------------------------------------------
  var TITRE = "Emploi du temps";
  var SOUSTITRE = "Semaines de pré-rentrée · du 1ᵉʳ au 12 septembre";

  // --- Icône de localisation (SVG intégré, aucune image externe) -----------
  var ICONE = '<svg class="edt-pin" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>';

  // --- Types de séance : couleur d'accent + libellé court (badge) ----------
  // Le PREMIER mot-clé trouvé dans l'intitulé gagne (du + spécifique au + générique).
  var TYPES = [
    { kw: "Réunion de Pré-Rentrée Portail SV", color: "#00887A", label: "Réunion" },
    { kw: "Préparations aux concours",         color: "#B06AE0", label: "Prépa concours" },
    { kw: "Projet Interface",                  color: "#00A7C4", label: "Projet" },
    { kw: "Amphi Méthodologie",                color: "#93329E", label: "Méthodologie" },
    { kw: "TP BPL",                            color: "#8B572A", label: "TP" },
    { kw: "TP Microscopie",                    color: "#8B572A", label: "TP" },
    { kw: "Réunion",                           color: "#0095C8", label: "Réunion" },
    { kw: "TD",                                color: "#007BA3", label: "TD" },
    { kw: "FORUM",                             color: "#00A888", label: "Forum" },
    { kw: "Atelier",                           color: "#E0148C", label: "Atelier" },
    { kw: "Présentation",                      color: "#7C6BF0", label: "Présentation" },
    { kw: "Innovation",                        color: "#EF8A3A", label: "Innovation" },
    { kw: "ÉVALUATION",                        color: "#E0312B", label: "Évaluation" }
  ];
  var TYPE_DEFAUT = { color: "#5C7682", label: "Séance" };

  // Libellés du menu déroulant (sinon dérivés de la clé).
  var LIBELLES = { groupeSVLAS: "Groupe SV LAS" };

  // --- Données -------------------------------------------------------------

  var DATA = {
    groupeST1: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail ST - OUI SI", salle: "AMPHI PHYSIQUE" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "14h00-15h00", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Electronique & IA", salle: "AMPHI PV" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST2: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail ST - OUI SI", salle: "AMPHI PHYSIQUE" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "13h00-14h00", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Electronique & IA", salle: "AMPHI PV" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST3: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail ST - OUI SI", salle: "AMPHI PHYSIQUE" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "11h15-12h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Electronique & IA", salle: "AMPHI PV" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST4: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail ST - OUI SI", salle: "AMPHI PHYSIQUE" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "11h15-12h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Electronique & IA", salle: "AMPHI PV" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST5: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail ST - OUI SI", salle: "AMPHI PHYSIQUE" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "13h00-14h00", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Electronique & IA", salle: "AMPHI PV" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST6: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée DL Math-Info", salle: "Salle M 1.6 (Bât M)" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 3.2 (Bât M)" },
        { time: "15h15-16h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Electronique & IA", salle: "AMPHI PV" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST7: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail ST - OUI SI", salle: "AMPHI PHYSIQUE" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "10h15-11h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Electronique & IA", salle: "AMPHI PV" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST8: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail ST - OUI SI", salle: "AMPHI PHYSIQUE" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "10h15-11h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Electronique & IA", salle: "AMPHI PV" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST9: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail ST - OUI SI", salle: "AMPHI PHYSIQUE" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
        { time: "11h15-12h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Electronique & IA", salle: "AMPHI PV" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST10: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail ST - OUI SI", salle: "AMPHI PHYSIQUE" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.5 (Bât M)" },
        { time: "11h15-12h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.5 (Bât M)" },
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Electronique & IA", salle: "AMPHI PV" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.5 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.5 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.5 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.5 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.5 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST11: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail ST - OUI SI", salle: "AMPHI PHYSIQUE" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 3.1 (Bât M)" },
        { time: "11h15-12h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 2.5 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 3.1 (Bât M)" },
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Electronique & IA", salle: "AMPHI PV" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 3.1 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 3.1 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 3.1 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 3.1 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 3.1 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST12: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée DL Math-Physique", salle: "Salle M 1.4 (Bât M)" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "15h15-16h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 3.2 (Bât M)" },
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Electronique & IA", salle: "AMPHI PV" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 3.2 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.5 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST13: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail ST - OUI SI", salle: "AMPHI PHYSIQUE" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "14h00-15h00", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 3.3 (Bât M)" },
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Electronique & IA", salle: "AMPHI PV" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 3.2 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 3.2 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 3.2 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 3.2 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST14: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail ST - OUI SI", salle: "AMPHI PHYSIQUE" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 3.3 (Bât M)" },
        { time: "10h15-11h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 3.4 (Bât M)" },
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Electronique & IA", salle: "AMPHI PV" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 3.3 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 3.3 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST15: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée PPPE", salle: "Salle M 1.2 (Bât M)" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "10h15-11h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 3.2 (Bât M)" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Electronique & IA", salle: "AMPHI PV" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 3.4 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 3.2 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST16: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "9h00-11h15", cours: "Réunion de Pré-Rentrée Portail SV", salle: "AMPHI PV" },
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée DL Math-SV", salle: "AMPHI Sc. Naturelles" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 3.2 (Bât M)" },
        { time: "10h15-12h15", cours: "Présentation Licence Sciences de la Vie", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "10h15-11h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "10h15-11h15", cours: "Présentation Licence Chimie pour SV", salle: "AMPHI Sc. Naturelles" },
        { time: "11h15-12h15", cours: "Amphi Méthodologie (SV)", salle: "AMPHI Sc. Naturelles" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 3.4 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST17: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST (LAS) - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST (LAS) - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "9h00-10h00", cours: "Réunion de Pré-Rentrée LAS Portail ST", salle: "AMPHI Sc. Naturelles" },
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "13h00-14h00", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST18: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST (LAS) - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST (LAS) - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "9h00-10h00", cours: "Réunion de Pré-Rentrée LAS Portail ST", salle: "AMPHI Sc. Naturelles" },
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "14h00-15h00", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST19: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST (LAS) - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST (LAS) - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "9h00-10h00", cours: "Réunion de Pré-Rentrée LAS Portail ST", salle: "AMPHI Sc. Naturelles" },
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "11h15-12h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST20: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST (LAS) - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST (LAS) - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "9h00-10h00", cours: "Réunion de Pré-Rentrée LAS Portail ST", salle: "AMPHI Sc. Naturelles" },
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "16h15-17h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 3.3 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeST21: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST (LAS) - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST (LAS) - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "9h00-10h00", cours: "Réunion de Pré-Rentrée LAS Portail ST", salle: "AMPHI Sc. Naturelles" },
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Physique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.5 (Bât M)" },
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "16h15-17h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Mathématiques & MIASHS", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "Présentation Licence Informatique", salle: "AMPHI PV" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 3.4 (Bât M)" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeSV1: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "9h00-11h15", cours: "Réunion de Pré-Rentrée Portail SV", salle: "AMPHI PV" },
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail SV - OUI SI", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Sciences de la Vie", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
        { time: "15h15-16h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "8h00-10h00", cours: "TP BPL", salle: "Salle 307 & 419 (Bât TP SC. Naturelles)" },
        { time: "10h15-12h15", cours: "TP Microscopie", salle: "Salle 515 & 615 (Bât TP SC. Naturelles)" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
        { time: "10h15-11h15", cours: "Présentation Licence Chimie pour SV", salle: "AMPHI Sc. Naturelles" },
        { time: "11h15-12h15", cours: "Amphi Méthodologie (SV)", salle: "AMPHI Sc. Naturelles" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
        { time: "13h00-15h00", cours: "Préparations aux concours enseignements liés à la Biologie", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeSV2: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "9h00-11h15", cours: "Réunion de Pré-Rentrée Portail SV", salle: "AMPHI PV" },
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail SV - OUI SI", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Sciences de la Vie", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
        { time: "15h15-16h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.1 (Bât M)" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
        { time: "10h15-11h15", cours: "Présentation Licence Chimie pour SV", salle: "AMPHI Sc. Naturelles" },
        { time: "11h15-12h15", cours: "Amphi Méthodologie (SV)", salle: "AMPHI Sc. Naturelles" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "8h00-10h00", cours: "TP BPL", salle: "Salle 309 & 419 (Bât TP SC. Naturelles)" },
        { time: "10h15-12h15", cours: "TP Microscopie", salle: "Salle 515 & 615 (Bât TP SC. Naturelles)" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
        { time: "13h00-15h00", cours: "Préparations aux concours enseignements liés à la Biologie", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeSV3: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "9h00-11h15", cours: "Réunion de Pré-Rentrée Portail SV", salle: "AMPHI PV" },
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail SV - OUI SI", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Sciences de la Vie", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
        { time: "16h15-17h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "10h15-12h15", cours: "TP BPL", salle: "Salle 307 & 419 (Bât TP SC. Naturelles)" },
        { time: "13h00-15h00", cours: "TP Microscopie", salle: "Salle 515 & 615 (Bât TP SC. Naturelles)" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
        { time: "10h15-11h15", cours: "Présentation Licence Chimie pour SV", salle: "AMPHI Sc. Naturelles" },
        { time: "11h15-12h15", cours: "Amphi Méthodologie (SV)", salle: "AMPHI Sc. Naturelles" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
        { time: "13h00-15h00", cours: "Préparations aux concours enseignements liés à la Biologie", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeSV4: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "9h00-11h15", cours: "Réunion de Pré-Rentrée Portail SV", salle: "AMPHI PV" },
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée DL BIO-GS", salle: "Salle M 1.5" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Sciences de la Vie", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "11h15-12h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
        { time: "10h15-11h15", cours: "Présentation Licence Chimie pour SV", salle: "AMPHI Sc. Naturelles" },
        { time: "11h15-12h15", cours: "Amphi Méthodologie (SV)", salle: "AMPHI Sc. Naturelles" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.5 (Bât M)" },
        { time: "10h15-12h15", cours: "TP BPL", salle: "Salle 309 & 419 (Bât TP SC. Naturelles)" },
        { time: "13h00-15h00", cours: "TP Microscopie", salle: "Salle 515 & 615 (Bât TP SC. Naturelles)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
        { time: "13h00-15h00", cours: "Préparations aux concours enseignements liés à la Biologie", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeSV5: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "9h00-11h15", cours: "Réunion de Pré-Rentrée Portail SV", salle: "AMPHI PV" },
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail SV - OUI SI", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Sciences de la Vie", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
        { time: "16h15-17h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.2 (Bât M)" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
        { time: "10h15-11h15", cours: "Présentation Licence Chimie pour SV", salle: "AMPHI Sc. Naturelles" },
        { time: "11h15-12h15", cours: "Amphi Méthodologie (SV)", salle: "AMPHI Sc. Naturelles" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 3.3 (Bât M)" },
        { time: "10h15-12h15", cours: "TP BPL", salle: "Salle 309 & 419 (Bât TP SC. Naturelles)" },
        { time: "13h00-15h00", cours: "TP Microscopie", salle: "Salle 515 & 615 (Bât TP SC. Naturelles)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
        { time: "13h00-15h00", cours: "Préparations aux concours enseignements liés à la Biologie", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeSV6: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "9h00-11h15", cours: "Réunion de Pré-Rentrée Portail SV", salle: "AMPHI PV" },
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail SV - OUI SI", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Sciences de la Vie", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.3 (Bât M)" },
        { time: "13h00-14h00", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
        { time: "10h15-11h15", cours: "Présentation Licence Chimie pour SV", salle: "AMPHI Sc. Naturelles" },
        { time: "11h15-12h15", cours: "Amphi Méthodologie (SV)", salle: "AMPHI Sc. Naturelles" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
        { time: "13h00-15h00", cours: "TP BPL", salle: "Salle 309 & 419 (Bât TP SC. Naturelles)" },
        { time: "15h15-17h15", cours: "TP Microscopie", salle: "Salle 515 & 615 (Bât TP SC. Naturelles)" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
        { time: "13h00-15h00", cours: "Préparations aux concours enseignements liés à la Biologie", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeSV7: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "9h00-11h15", cours: "Réunion de Pré-Rentrée Portail SV", salle: "AMPHI PV" },
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail SV - OUI SI", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Sciences de la Vie", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.4 (Bât M)" },
        { time: "13h00-14h00", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
        { time: "10h15-11h15", cours: "Présentation Licence Chimie pour SV", salle: "AMPHI Sc. Naturelles" },
        { time: "11h15-12h15", cours: "Amphi Méthodologie (SV)", salle: "AMPHI Sc. Naturelles" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "8h00-10h00", cours: "TP BPL", salle: "Salle 309 & 419 (Bât TP SC. Naturelles)" },
        { time: "10h15-12h15", cours: "TP Microscopie", salle: "Salle 515 & 615 (Bât TP SC. Naturelles)" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
        { time: "13h00-15h00", cours: "Préparations aux concours enseignements liés à la Biologie", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeSV8: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "9h00-11h15", cours: "Réunion de Pré-Rentrée Portail SV", salle: "AMPHI PV" },
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée DL Chimie-SV", salle: "Salle M 1.1" },
        { time: "13h00-14h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de A à L inclus", salle: "AMPHI PV" },
        { time: "15h00-16h30", cours: "Réunion de Pré-Rentrée Portail ST - Noms de M à Z inclus", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Sciences de la Vie", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
        { time: "15h15-17h15", cours: "Présentation Licence Chimie", salle: "AMPHI PV" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "11h15-12h15", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "15h15-17h15", cours: "TD Math0", salle: "Salle M 2.5 (Bât M)" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
        { time: "10h15-11h15", cours: "Présentation Licence Chimie pour SV", salle: "AMPHI Sc. Naturelles" },
        { time: "11h15-12h15", cours: "Amphi Méthodologie (SV)", salle: "AMPHI Sc. Naturelles" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
        { time: "10h15-12h15", cours: "TP BPL", salle: "Salle 309 & 419 (Bât TP SC. Naturelles)" },
        { time: "13h00-15h00", cours: "TP Microscopie", salle: "Salle 515 & 615 (Bât TP SC. Naturelles)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
        { time: "13h00-15h00", cours: "Projet Interface", salle: "Salle M 1.6 (Bât M)" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeSV9: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "9h00-11h15", cours: "Réunion de Pré-Rentrée Portail SV", salle: "AMPHI PV" },
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail SV - OUI SI", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Sciences de la Vie", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 1.5 (Bât M)" },
        { time: "14h00-15h00", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
        { time: "10h15-11h15", cours: "Présentation Licence Chimie pour SV", salle: "AMPHI Sc. Naturelles" },
        { time: "11h15-12h15", cours: "Amphi Méthodologie (SV)", salle: "AMPHI Sc. Naturelles" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.2 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
        { time: "13h00-15h00", cours: "TP BPL", salle: "Salle 309 & 419 (Bât TP SC. Naturelles)" },
        { time: "15h15-17h15", cours: "TP Microscopie", salle: "Salle 515 & 615 (Bât TP SC. Naturelles)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
        { time: "13h00-15h00", cours: "Préparations aux concours enseignements liés à la Biologie", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeSV10: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "9h00-11h15", cours: "Réunion de Pré-Rentrée Portail SV", salle: "AMPHI PV" },
        { time: "11h15-12h15", cours: "Réunion de Pré-Rentrée Portail SV - OUI SI", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Sciences de la Vie", salle: "AMPHI PV" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.5 (Bât M)" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.5 (Bât M)" },
      ]},
      { day: "Jeudi", date: "4 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.1 (Bât M)" },
        { time: "14h00-15h00", cours: "Ateliers de rentrée - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.5 (Bât M)" },
        { time: "10h15-11h15", cours: "Présentation Licence Chimie pour SV", salle: "AMPHI Sc. Naturelles" },
        { time: "11h15-12h15", cours: "Amphi Méthodologie (SV)", salle: "AMPHI Sc. Naturelles" },
        { time: "13h00-15h00", cours: "Présentation Licence Sciences de la Terre", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.3 (Bât M)" },
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
      { day: "Mardi", date: "9 septembre", events: [
        { time: "8h00-10h00", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
      ]},
      { day: "Mercredi", date: "10 septembre", events: [
        { time: "8h00-10h00", cours: "TP BPL", salle: "Salle 309 & 419 (Bât TP SC. Naturelles)" },
        { time: "10h15-12h15", cours: "TP Microscopie", salle: "Salle 515 & 615 (Bât TP SC. Naturelles)" },
        { time: "13h00-15h00", cours: "TD Math0", salle: "Salle M 2.4 (Bât M)" },
      ]},
      { day: "Jeudi", date: "11 septembre", events: [
        { time: "10h15-12h15", cours: "TD Math0", salle: "Salle M 2.5 (Bât M)" },
        { time: "13h00-15h00", cours: "Préparations aux concours enseignements liés à la Biologie", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Vendredi", date: "12 septembre", events: [
        { time: "(HORAIRE SUR MOODLE)", cours: "ÉVALUATION Math0", salle: "AMPHI PV" },
      ]},
    ],
    groupeSVLAS: [
      { day: "Lundi", date: "1er septembre", events: [
        { time: "9h00-11h15", cours: "Réunion de Pré-Rentrée Portail SV", salle: "AMPHI PV" },
        { time: "13h00-14h00", cours: "Réunion de Pré-Rentrée Portail SV - LAS", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Mardi", date: "2 septembre", events: [
        { time: "10h15-12h15", cours: "Présentation Licence Sciences de la Vie", salle: "AMPHI PV" },
        { time: "13h00-14h00", cours: "Ateliers de rentrée - Noms de A à L inclus - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
        { time: "14h00-15h00", cours: "Ateliers de rentrée - Noms de M à Z inclus - OBLIGATOIRE", salle: "Salle Coworking (Bât M)" },
      ]},
      { day: "Mercredi", date: "3 septembre", events: [
        { time: "9h30-13h30", cours: "FORUM D'ACCUEIL - Nouveaux entrants", salle: "Bibliothèque" },
      ]},
      { day: "Vendredi", date: "5 septembre", events: [
        { time: "10h15-11h15", cours: "Présentation Licence Chimie pour SV", salle: "AMPHI Sc. Naturelles" },
        { time: "11h15-12h15", cours: "Amphi Méthodologie (SV)", salle: "AMPHI Sc. Naturelles" },
      ]},
      { day: "Lundi", date: "8 septembre", events: [
        { time: "13h00-15h00", cours: "Innovation (Fablab & Invent)", salle: "AMPHI PV" },
      ]},
    ],
  };

  // --- Outils --------------------------------------------------------------

  function typeDe(cours) {
    for (var i = 0; i < TYPES.length; i++) {
      if (cours.indexOf(TYPES[i].kw) !== -1) return TYPES[i];
    }
    return TYPE_DEFAUT;
  }

  function minutes(horaire) {
    var m = horaire.match(/(\d{1,2})h(\d{2})/);
    return m ? (+m[1]) * 60 + (+m[2]) : Infinity;
  }

  function libelle(cle) { return LIBELLES[cle] || "Groupe " + cle.replace("groupe", ""); }

  function hexA(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
  }

  function decoupeHoraire(t) {
    var m = t.match(/(\d{1,2})h(\d{2})/g);
    if (!m) return { moodle: true };
    function pad(s) { var p = s.match(/(\d{1,2})h(\d{2})/); return (p[1].length < 2 ? "0" : "") + p[1] + "h" + p[2]; }
    return { start: pad(m[0]), end: m[1] ? pad(m[1]) : "" };
  }

  var JOURS_COURTS = { Lundi: "Lun", Mardi: "Mar", Mercredi: "Mer", Jeudi: "Jeu", Vendredi: "Ven" };
  function jourCourt(d) { return JOURS_COURTS[d] || d.slice(0, 3); }
  function numJour(date) { var m = date.match(/\d+/); return m ? m[0] : date; }

  // --- Styles (scopés + défensifs face au CSS de KSUP) ---------------------

  function injecterStyles() {
    if (document.getElementById("edt-styles")) return;
    var P = "#edt-portail-st";
    var chevron = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235C7682' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")";
    var css =
      // Conteneur racine : on neutralise ce que le thème pourrait imposer.
      P + "{--ink:#0B2B36;--muted:#5C7682;--primary:#007BA3;--bright:#0095C8;--canvas:#F2F6F8;--surface:#fff;--line:#E2EAEE;" +
        "display:block!important;float:none!important;position:static!important;width:auto!important;max-width:880px;margin:24px auto!important;padding:0 16px;" +
        "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.45;color:var(--ink);text-align:left;" +
        "-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;box-sizing:border-box;}" +
      // Reset local (le CSS KSUP ne doit rien casser à l'intérieur).
      P + ",#edt-portail-st *,#edt-portail-st *::before,#edt-portail-st *::after{box-sizing:border-box;}" +
      P + " div,#edt-portail-st p,#edt-portail-st span,#edt-portail-st label,#edt-portail-st button,#edt-portail-st select,#edt-portail-st svg,#edt-portail-st article{float:none;position:static;max-width:100%;}" +
      P + " .edt-t,#edt-portail-st p,#edt-portail-st label{margin:0;padding:0;border:0;background:none;font:inherit;color:inherit;text-transform:none;letter-spacing:normal;}" +
      P + " button{font:inherit;line-height:normal;margin:0;padding:0;border:0;background:none;text-transform:none;-webkit-appearance:none;appearance:none;cursor:pointer;-webkit-tap-highlight-color:transparent;}" +
      // En-tête
      P + " .edt-eyebrow{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--primary);font-weight:700;margin:0 0 6px;}" +
      P + " .edt-title{display:block;font-size:30px;line-height:1.08;font-weight:800;margin:0 0 6px;letter-spacing:-.015em;color:var(--ink);}" +
      P + " .edt-sub{font-size:15px;color:var(--muted);margin:0 0 22px;}" +
      P + " .edt-label{display:block;font-size:13px;font-weight:600;color:var(--muted);margin:0 0 6px;}" +
      // Sélecteur de groupe
      P + " .edt-select{display:block!important;width:100%;max-width:340px;height:auto!important;min-height:0;font-size:16px;font-weight:600;color:var(--ink);" +
        "background-color:var(--surface);background-image:" + chevron + ";background-repeat:no-repeat;background-position:right 14px center;" +
        "border:1.5px solid var(--line);border-radius:12px;padding:12px 40px 12px 14px;margin:0 0 20px!important;line-height:1.3;vertical-align:baseline;" +
        "-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;}" +
      P + " .edt-select:focus-visible{outline:none;border-color:var(--bright);box-shadow:0 0 0 3px rgba(0,149,200,.18);}" +
      // Barre de navigation jours
      P + " .edt-daynav{display:flex!important;align-items:center;flex-wrap:nowrap;gap:8px;margin:0 0 16px;}" +
      P + " .edt-navbtn{flex:0 0 38px!important;width:38px;height:38px;min-width:38px;border-radius:10px;border:1.5px solid var(--line)!important;background:var(--surface)!important;color:var(--primary);display:flex;align-items:center;justify-content:center;touch-action:manipulation;}" +
      P + " .edt-navbtn:hover{background:var(--canvas)!important;}" +
      P + " .edt-navbtn:focus-visible{outline:none;border-color:var(--bright)!important;box-shadow:0 0 0 3px rgba(0,149,200,.18);}" +
      P + " .edt-navbtn svg{width:18px;height:18px;fill:currentColor;display:block;}" +
      // Ruban (LE correctif : flex:1 + min-width:0 => rétrécit et défile au lieu de déborder)
      P + " .edt-ribbon{flex:1 1 auto!important;min-width:0!important;display:flex;gap:8px;overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth;padding:4px 2px;-ms-overflow-style:none;scrollbar-width:none;-webkit-overflow-scrolling:touch;}" +
      P + " .edt-ribbon::-webkit-scrollbar{display:none;height:0;}" +
      P + " .edt-gap{flex:0 0 1px;align-self:stretch;background:var(--line);margin:8px 7px;}" +
      P + " .edt-chip{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:3px;min-width:50px;padding:8px 11px;border-radius:13px;border:1.5px solid var(--line);background:var(--surface);color:var(--ink);transition:background .12s,border-color .12s,box-shadow .12s;touch-action:manipulation;}" +
      P + " .edt-chip:hover{border-color:var(--bright);background:var(--canvas);}" +
      P + " .edt-chip:focus-visible{outline:none;border-color:var(--bright);box-shadow:0 0 0 3px rgba(0,149,200,.18);}" +
      P + " .edt-chip-day{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);font-weight:700;}" +
      P + " .edt-chip-num{font-size:18px;font-weight:800;line-height:1;font-variant-numeric:tabular-nums;color:inherit;}" +
      P + " .edt-chip.active{background:linear-gradient(180deg,#0095C8,#007BA3);border-color:transparent;color:#fff;box-shadow:0 6px 16px rgba(0,123,163,.28);}" +
      P + " .edt-chip.active .edt-chip-day{color:rgba(255,255,255,.85);}" +
      // Scène + cartes
      P + " .edt-stage{background:var(--canvas);border:1px solid var(--line);border-radius:18px;padding:16px;overflow:hidden;}" +
      P + " .edt-content{will-change:opacity,transform;}" +
      P + " .edt-dayhead{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin:2px 2px 14px;}" +
      P + " .edt-daytitle{display:block;font-size:19px;font-weight:800;margin:0;letter-spacing:-.01em;color:var(--ink);}" +
      P + " .edt-daycount{font-size:13px;font-weight:600;color:var(--muted);white-space:nowrap;flex:0 0 auto;}" +
      P + " .edt-card{display:flex;gap:14px;background:var(--surface);border:1px solid var(--line);border-left:4px solid var(--c);border-radius:14px;padding:14px 16px;margin:10px 0;box-shadow:0 1px 2px rgba(11,43,54,.04);}" +
      P + " .edt-card:first-child{margin-top:0;}" +
      P + " .edt-card:last-child{margin-bottom:0;}" +
      P + " .edt-time{flex:0 0 56px;display:flex;flex-direction:column;align-items:flex-start;padding-top:1px;}" +
      P + " .edt-time-start{font-size:16px;font-weight:800;font-variant-numeric:tabular-nums;color:var(--ink);}" +
      P + " .edt-time-end{font-size:13px;font-weight:600;font-variant-numeric:tabular-nums;color:var(--muted);}" +
      P + " .edt-time-moodle{font-size:11px;font-weight:800;color:var(--c);text-transform:uppercase;letter-spacing:.04em;line-height:1.3;}" +
      P + " .edt-info{flex:1 1 auto;min-width:0;}" +
      P + " .edt-tag{display:inline-block;font-size:11px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:var(--c);background:var(--c-soft);padding:3px 9px;border-radius:999px;margin:0 0 8px;}" +
      P + " .edt-course{display:block;font-size:16px;font-weight:700;line-height:1.3;margin:0 0 6px;color:var(--ink);overflow-wrap:anywhere;}" +
      P + " .edt-loc{display:flex;align-items:center;gap:5px;font-size:14px;color:var(--muted);margin:0;overflow-wrap:anywhere;}" +
      P + " .edt-pin{flex:0 0 auto;width:15px;height:15px;min-width:15px;fill:var(--c);display:inline-block;}" +
      P + " .edt-empty{text-align:center;padding:34px 16px;color:var(--muted);font-weight:600;}" +
      "@media (min-width:640px){" + P + " .edt-title{font-size:34px;}" + P + " .edt-card{padding:16px 18px;gap:16px;}" + P + " .edt-time{flex-basis:62px;}" + P + " .edt-stage{padding:20px;}}" +
      "@media (prefers-reduced-motion:reduce){" + P + " .edt-content,#edt-portail-st .edt-chip,#edt-portail-st .edt-ribbon{transition:none!important;scroll-behavior:auto!important;}}";
    var s = document.createElement("style");
    s.id = "edt-styles";
    s.textContent = css;
    document.head.appendChild(s);
  }

  // --- Interface -----------------------------------------------------------

  var FLECHE_G = '<svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>';
  var FLECHE_D = '<svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>';

  var root, selectEl, ribbonEl, contentEl;
  var currentGroup, currentIndex = 0, t1 = null, t2 = null;
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function construire() {
    root = document.getElementById("edt-portail-st");
    if (!root || root.getAttribute("data-edt-ready") === "1") return;
    root.setAttribute("data-edt-ready", "1");
    injecterStyles();

    var options = Object.keys(DATA).map(function (k) {
      return '<option value="' + k + '">' + libelle(k) + "</option>";
    }).join("");

    root.innerHTML =
      '<div class="edt-eyebrow">Pré-rentrée</div>' +
      '<div class="edt-title" role="heading" aria-level="2">' + TITRE + "</div>" +
      '<div class="edt-sub">' + SOUSTITRE + "</div>" +
      '<label class="edt-label" for="edt-grp">Mon groupe</label>' +
      '<select id="edt-grp" class="edt-select">' + options + "</select>" +
      '<div class="edt-daynav">' +
        '<button type="button" class="edt-navbtn edt-prev" aria-label="Jour précédent">' + FLECHE_G + "</button>" +
        '<div class="edt-ribbon" role="tablist" aria-label="Jours"></div>' +
        '<button type="button" class="edt-navbtn edt-next" aria-label="Jour suivant">' + FLECHE_D + "</button>" +
      "</div>" +
      '<div class="edt-stage"><div class="edt-content" aria-live="polite"></div></div>';

    selectEl = root.querySelector(".edt-select");
    ribbonEl = root.querySelector(".edt-ribbon");
    contentEl = root.querySelector(".edt-content");

    selectEl.addEventListener("change", changerGroupe);
    root.querySelector(".edt-prev").addEventListener("click", function () { goTo(currentIndex - 1); });
    root.querySelector(".edt-next").addEventListener("click", function () { goTo(currentIndex + 1); });

    currentGroup = selectEl.value;
    demarrerGroupe();
  }

  function construireRuban() {
    var jours = DATA[currentGroup] || [];
    var html = "", prev = null;
    jours.forEach(function (j, i) {
      var num = parseInt(numJour(j.date), 10);
      if (prev !== null && prev <= 5 && num >= 8) html += '<div class="edt-gap" aria-hidden="true"></div>';
      html += '<button type="button" class="edt-chip" role="tab" data-i="' + i + '" aria-selected="false">' +
                '<span class="edt-chip-day">' + jourCourt(j.day) + "</span>" +
                '<span class="edt-chip-num">' + num + "</span></button>";
      prev = num;
    });
    ribbonEl.innerHTML = html;
    var chips = ribbonEl.querySelectorAll(".edt-chip");
    for (var k = 0; k < chips.length; k++) {
      chips[k].addEventListener("click", function () {
        goTo(parseInt(this.getAttribute("data-i"), 10));
      });
    }
  }

  function majRuban() {
    var chips = ribbonEl.querySelectorAll(".edt-chip");
    for (var i = 0; i < chips.length; i++) {
      var on = parseInt(chips[i].getAttribute("data-i"), 10) === currentIndex;
      chips[i].classList.toggle("active", on);
      chips[i].setAttribute("aria-selected", on ? "true" : "false");
      if (on) {
        var off = chips[i].offsetLeft - (ribbonEl.clientWidth / 2) + (chips[i].clientWidth / 2);
        if (off < 0) off = 0;
        if (ribbonEl.scrollTo) ribbonEl.scrollTo({ left: off, behavior: reduced ? "auto" : "smooth" });
        else ribbonEl.scrollLeft = off;
      }
    }
  }

  // --- Rendu d'un jour (lecture seule : ne modifie jamais DATA) -------------

  function carte(e) {
    var ty = typeDe(e.cours);
    var soft = hexA(ty.color, 0.12);
    var h = decoupeHoraire(e.time);
    var tHtml = h.moodle
      ? '<span class="edt-time-moodle">Voir<br>Moodle</span>'
      : '<span class="edt-time-start">' + h.start + "</span>" + (h.end ? '<span class="edt-time-end">' + h.end + "</span>" : "");
    var bg = ty.label === "Évaluation" ? "background:" + hexA(ty.color, 0.06) + ";" : "";
    return '<article class="edt-card" style="--c:' + ty.color + ";--c-soft:" + soft + ";" + bg + '">' +
             '<div class="edt-time">' + tHtml + "</div>" +
             '<div class="edt-info">' +
               '<span class="edt-tag">' + ty.label + "</span>" +
               '<div class="edt-course">' + e.cours + "</div>" +
               '<div class="edt-loc">' + ICONE + "<span>" + e.salle + "</span></div>" +
             "</div>" +
           "</article>";
  }

  function afficherJour() {
    var jours = DATA[currentGroup];
    if (!jours || !jours.length || !jours[currentIndex]) {
      contentEl.innerHTML = '<div class="edt-empty">Aucune séance prévue ce jour.</div>';
      return;
    }
    var j = jours[currentIndex];
    var n = j.events.length;
    var evs = j.events.slice().sort(function (a, b) { return minutes(a.time) - minutes(b.time); });
    contentEl.innerHTML =
      '<div class="edt-dayhead">' +
        '<div class="edt-daytitle" role="heading" aria-level="3">' + j.day + " " + j.date + "</div>" +
        '<span class="edt-daycount">' + n + " séance" + (n > 1 ? "s" : "") + "</span>" +
      "</div>" +
      evs.map(carte).join("");
  }

  // --- Navigation (clics rapides = relance propre, jamais de désync) --------

  function annulerAnim() {
    if (t1) { clearTimeout(t1); t1 = null; }
    if (t2) { clearTimeout(t2); t2 = null; }
  }

  function rendreDirect() {
    annulerAnim();
    contentEl.style.transition = "none";
    contentEl.style.opacity = "1";
    contentEl.style.transform = "none";
    afficherJour();
  }

  function animer() {
    contentEl.style.transition = "opacity .14s ease";
    contentEl.style.opacity = "0";
    t1 = setTimeout(function () {
      afficherJour();
      contentEl.style.transition = "none";
      contentEl.style.opacity = "0";
      contentEl.style.transform = "translateY(10px)";
      void contentEl.offsetWidth;
      t2 = setTimeout(function () {
        contentEl.style.transition = "opacity .22s ease, transform .22s ease";
        contentEl.style.opacity = "1";
        contentEl.style.transform = "translateY(0)";
        t1 = null; t2 = null;
      }, 20);
    }, 140);
  }

  function goTo(i) {
    var g = DATA[currentGroup];
    if (!g || !g.length) return;
    currentIndex = ((i % g.length) + g.length) % g.length;
    majRuban();
    annulerAnim();
    if (reduced) { rendreDirect(); return; }
    animer();
  }

  function demarrerGroupe() {
    construireRuban();
    currentIndex = 0;
    rendreDirect();
    majRuban();
  }

  function changerGroupe() {
    currentGroup = selectEl.value;
    demarrerGroupe();
  }

  // --- Initialisation ------------------------------------------------------

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", construire);
  } else {
    construire();
  }
})();
