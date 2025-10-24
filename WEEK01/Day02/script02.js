//🧠 Challenge 1 : Les 3 Sages et leurs Fonctions
function sageCarre(nombre) {
  return nombre * nombre;
}

function sageMiroir(chaine) {
  return chaine.split('').reverse().join('');
}

function sageBalance(n1, n2) {
  return Math.max(n1, n2);
}

let choix = prompt("Quel sage veux-tu consulter ? (carré / miroir / balance)").toLowerCase();

if (choix === "carré") {
  let n = parseFloat(prompt("Donne un nombre :"));
  alert(`Résultat du Sage du Carré : ${sageCarre(n)}`);
} else if (choix === "miroir") {
  let str = prompt("Donne une chaîne de caractères :");
  alert(`Résultat du Sage du Miroir : ${sageMiroir(str)}`);
} else if (choix === "balance") {
  let a = parseFloat(prompt("Premier nombre :"));
  let b = parseFloat(prompt("Deuxième nombre :"));
  alert(`Résultat du Sage de la Balance : ${sageBalance(a, b)}`);
} else {
  alert("Sage inconnu !");
}



// Challenge 2 : Générateur de Mot Mystère
function majusculesAlternées(mot) {
  let resultat = "";
  for (let i = 0; i < mot.length; i++) {
    resultat += i % 2 === 0 ? mot[i].toUpperCase() : mot[i].toLowerCase();
  }
  return resultat;
}

function remplacerVoyelles(mot, symbole) {
  return mot.replace(/[aeiou]/gi, symbole);
}

function inverserMot(mot) {
  return mot.split('').reverse().join('');
}

let mot = prompt("Entre un mot à enchanter :");
let sort = prompt("Quel sort veux-tu appliquer ? (majuscules / voyelles / inversé)").toLowerCase();

let resultat;

if (sort === "majuscules") {
  resultat = majusculesAlternées(mot);
} else if (sort === "voyelles") {
  let symbole = prompt("Quel symbole veux-tu utiliser à la place des voyelles ?");
  resultat = remplacerVoyelles(mot, symbole);
} else if (sort === "inversé") {
  resultat = inverserMot(mot);
} else {
  resultat = "Sort inconnu...";
}

alert("Mot transformé : " + resultat);



//⚡ Challenge 3 : Calculateur de Trésor
function doubleur(or) {
  return or * 2;
}

function pairOuImpair(or) {
  return or % 2 === 0 ? or + 10 : or - 5;
}

function mystere(or) {
  return or < 20 ? or * or : Math.floor(or / 2);
}

let pieces = parseInt(prompt("Combien de pièces d’or veux-tu mettre ?"));
let coffre = prompt("Quel coffre choisis-tu ? (doubleur / pair / mystère)").toLowerCase();

let res;

if (coffre === "doubleur") {
  res = doubleur(pieces);
} else if (coffre === "pair") {
  res = pairOuImpair(pieces);
} else if (coffre === "mystère") {
  res = mystere(pieces);
} else {
  res = "Coffre inconnu...";
}

alert("Résultat du coffre : " + res + " pièces");




//🧩 Challenge 4 : L’Architecte de Tableaux
function extrairePairs(tableau) {
  return tableau.filter(n => n % 2 === 0);
}

function sommer(tableau) {
  return tableau.reduce((acc, val) => acc + val, 0);
}

function renverser(tableau) {
  return [...tableau].reverse();
}

let saisie = prompt("Donne une liste de nombres séparés par des virgules :");
let tableau = saisie.split(",").map(Number);

let action = prompt("Quelle fonction veux-tu utiliser ? (pairs / somme / renverser)").toLowerCase();
let r;

if (action === "pairs") {
  r = extrairePairs(tableau);
} else if (action === "somme") {
  r = sommer(tableau);
} else if (action === "renverser") {
  r = renverser(tableau);
} else {
  r = "Action inconnue...";
}

alert("Résultat du tableau : " + r);
