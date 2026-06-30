/* =========================================================================
   convertir.js  —  À LANCER UNE SEULE FOIS
   -------------------------------------------------------------------------
   Transforme tes anciennes données (chaînes HTML) en données structurées
   { time, cours, salle }, puis assemble le nouveau edt.js (header + données
   + footer).

   Utilisation :
     1. Place dans le même dossier : header.js, footer.js et ton fichier
        source qui contient `const data = { ... }`.
     2. Indique le nom de ton fichier source dans SOURCE ci-dessous.
     3. node convertir.js
     4. Récupère edt.js (prêt pour GitHub Pages).
   ========================================================================= */
const fs = require("fs");
const path = require("path");

const SOURCE = process.argv[2] || "./edt-source-sample.js"; // <-- ton fichier
const SORTIE = "./edt.js";

// --- Récupération de l'objet `data` --------------------------------------
// On tente d'abord un require (si le fichier exporte `data`), sinon on
// extrait l'objet littéral directement depuis le texte.
function chargerData(file) {
  const abs = path.resolve(file);
  try {
    const mod = require(abs);
    if (mod && typeof mod === "object" && Object.keys(mod).length) return mod;
  } catch (e) { /* on bascule sur l'extraction texte */ }

  const src = fs.readFileSync(abs, "utf8");
  const start = src.indexOf("{", src.indexOf("data"));
  let depth = 0, end = -1;
  for (let i = start; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") { depth--; if (depth === 0) { end = i; break; } }
  }
  const literal = src.slice(start, end + 1);
  // eslint-disable-next-line no-eval
  return eval("(" + literal + ")");
}

// --- Parsing d'une séance -------------------------------------------------
function parseEvent(str) {
  const parts = str.split(/<br>\s*<img[^>]*>/);
  let head = (parts[0] || "").replace(/<\/?span[^>]*>/g, "").trim();
  let salle = (parts[1] || "")
    .replace(/<\/?b>/g, "")
    .replace(/<br\s*\/?>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const i = head.indexOf(" : ");
  let time = head.slice(0, i).trim();
  let cours = head.slice(i + 3).trim();
  time = time.replace(/(\d{1,2})h(\d{1,2})/g, (m, h, mm) => h + "h" + mm.padStart(2, "0"));
  return { time, cours, salle };
}

function normDate(s) {
  return s.replace(/Septembre/g, "septembre").replace(/^1\b/, "1er").trim();
}

function minutes(t) {
  const m = t.match(/(\d{1,2})h(\d{2})/);
  return m ? (+m[1]) * 60 + (+m[2]) : Infinity;
}

// --- Génération ----------------------------------------------------------
const data = chargerData(SOURCE);
const stats = { groupes: 0, jours: 0, seances: 0, cours: new Set(), salles: new Set() };

let body = "  var DATA = {\n";
for (const key of Object.keys(data)) {
  stats.groupes++;
  body += "    " + key + ": [\n";
  for (const jour of data[key]) {
    stats.jours++;
    const evs = jour.events.map(parseEvent).sort((a, b) => minutes(a.time) - minutes(b.time));
    body += "      { day: " + JSON.stringify(jour.day) +
            ", date: " + JSON.stringify(normDate(jour.date)) + ", events: [\n";
    for (const e of evs) {
      stats.seances++; stats.cours.add(e.cours); stats.salles.add(e.salle);
      body += "        { time: " + JSON.stringify(e.time) +
              ", cours: " + JSON.stringify(e.cours) +
              ", salle: " + JSON.stringify(e.salle) + " },\n";
    }
    body += "      ]},\n";
  }
  body += "    ],\n";
}
body += "  };\n";

const header = fs.readFileSync(__dirname + "/header.js", "utf8");
const footer = fs.readFileSync(__dirname + "/footer.js", "utf8");
fs.writeFileSync(SORTIE, header + body + footer, "utf8");

console.log("OK -> " + SORTIE + " généré");
console.log("Groupes:", stats.groupes, "| Jours:", stats.jours, "| Séances:", stats.seances);
console.log("Cours distincts:", stats.cours.size, "| Salles distinctes:", stats.salles.size);
console.log("\nIntitulés de cours rencontrés (vérifie qu'ils matchent bien COULEURS) :");
[...stats.cours].sort().forEach((c) => console.log("  - " + c));
