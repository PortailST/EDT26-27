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

