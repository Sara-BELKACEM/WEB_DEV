//🗺️ Challenge 1: Le Voyageur et ses pièces d’or 🪙
let or = 100;

let jours = parseInt(prompt("Combien de jours voulez-vous voyager ?"), 10);

let joursSurvecus = 0;

for (let jour = 1; jour <= jours; jour++) {
  console.log(`Jour ${jour} :`);

  if (jour % 2 === 1) {
    if (or >= 3) {
      or -= 3;
    } else {
      console.log("Le voyageur est expulsé du royaume !");
      break;
    }
  } else {
    let taxe = Math.floor(or / 2);
    if (taxe > 0) {
      or -= taxe;
    } else {
      console.log("Le voyageur est expulsé du royaume !");
      break;
    }
  }

  console.log(`Il reste ${or} pièces d’or.`);
  joursSurvecus++;
}

if (joursSurvecus < jours) {
  console.log(`Le voyageur a survécu ${joursSurvecus} jours.`);
} else {
  console.log(`Le voyageur a terminé son voyage avec ${or} pièces d’or.`);
}



//🔥 Challenge 2 : La Fontaine des Souhaits ⛲
let personnes = parseInt(prompt("Combien de personnes vont jeter une pièce ?"));
let pieces = 0;

for (let i = 1; i <= personnes; i++) {
  pieces *= 2; 
  pieces += 1; 
  pieces *= 2; 

  if (pieces % 7 === 0) {
    pieces = Math.floor(pieces / 2);
    console.log(`La fontaine a perdu la moitié de ses pièces !`);
  }

  console.log(`Après la personne ${i}, il y a ${pieces} pièces.`);
}

console.log(`Total final de pièces dans la fontaine : ${pieces}`);



//🌈 Challenge 3 : Le Mot Secret 🔐
let mot = prompt("Entrez un mot pour découvrir le mot secret :");
let motSecret = "";
let voyelles = ["a", "e", "i", "o", "u"];

for (let i = 0; i < mot.length; i++) {
  let char = mot[i];
  if (voyelles.includes(char.toLowerCase())) {
    motSecret += "*";
  } else if (i % 2 === 0) {
    motSecret += char.toUpperCase();
  } else {
    motSecret += char.toLowerCase();
  }
}

console.log("Le mot secret est :", motSecret);



//✨ Challenge 4 : Le Détective des Nombres Perdus 👮‍♂️🔎
let nombres = [12, 7, 19, 3, 25, 7, 3];
let chiffreRecherche = 7;

let max = Math.max(...nombres);
let min = Math.min(...nombres);
let somme = nombres.reduce((acc, val) => acc + val, 0);
let occurrences = nombres.filter(n => n === chiffreRecherche).length;

console.log("Rapport d'enquête :");
console.log("Nombre le plus grand :", max);
console.log("Nombre le plus petit :", min);
console.log("Somme des nombres :", somme);
console.log(`Nombre d’occurrences de ${chiffreRecherche} :`, occurrences);

if (somme % 2 === 0) {
  console.log("Enquête résolue !");
} else {
  console.log("Encore des mystères à élucider...");
}
