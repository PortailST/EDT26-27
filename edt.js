/* =========================================================================
   Emploi du temps - Portail SITE (ST / SV) - Pré-rentrée
   -------------------------------------------------------------------------
   Fichier autonome, hébergé sur GitHub Pages.
   Côté KSUP, le HTML ne contient qu'un conteneur + la balise <script> :

       <div id="edt-portail-st"></div>
       <script src="https://portailst.github.io/EDT26-27/edt.js?v=8"></script>

   Pour modifier une séance : retrouve le groupe et le jour dans DATA, puis
   édite { time, cours, salle }. Les séances sont retriées automatiquement
   par horaire, l'ordre dans le fichier n'a donc aucune importance.
   ========================================================================= */
(function () {
  "use strict";

  // --- Réglages ------------------------------------------------------------

  // Icône de localisation : SVG intégré (aucune image externe = jamais cassée).
  var ICONE = '<svg class="edt-pin" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>';

  // Couleur par type de séance : on retient la couleur du PREMIER mot-clé
  // trouvé dans l'intitulé du cours. L'ordre compte (du + spécifique au + générique).
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
      "#edt-portail-st .edt-pin{width:18px;height:18px;vertical-align:-3px;fill:#fff;margin-right:2px;}" +
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
               ICONE + ' <b>' + e.salle + "</b>" +
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
