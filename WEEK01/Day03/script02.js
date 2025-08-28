//🏰 Challenge 1 : Le Gardien du Trésor 🔑
let cles = 4 ;
let porteOuverte = false;

for (let t = 1 ; t <= 10 ; t++) {
    if (t % 2 === 0) {
        cles -= 1 ;
    }
    else {
        cles += 2 ;
    }

  if (cles >= 10) {
    porteOuverte = true;
    console.log(`🎉 Bravo, la porte s’est ouverte avec ${cles} clés !`);
    break;
  }
}

if (!porteOuverte) {
  console.log(`😢 Dommage, le joueur n’a pas réussi et il lui reste ${cles} clés.`);
}



//⚔️ Challenge 2 : Le Tournoi des Héros 🏆
const noms = ["Thor", "Athena", "Hercule","Zeus"];
const heros = noms.map(nom => ({nom, force: Math.floor(Math.random() * 6) + 5 , vie: Math.floor(Math.random() * 11) + 20}));
const combat = (h1, h2) => {
    console.log(`⚔️ ${h1.nom} VS ${h2.nom} `);
    while (h1.vie > 0 && h2.vie > 0) {
        h2.vie -= h1.force;
        h1.vie -= h2.force; 
    }
    const winner = h1.vie > 0 ? h1 : h2;
    console.log(`🏆 Le gagnant est ${winner.nom} avec ${winner.vie} vie`)
    return winner;
}

let participants = [...heros];

while (participants.length > 1) {
    let nextRound = [];
    for (let i = 0; i < participants.length; i += 2) {
        if (i + 1 < participants.length) {
            const winner = combat(participants[i], participants[i + 1]);
            nextRound.push(winner);
        }else {
            nextRound.push(participants[i]);
        }
    }
    participants = nextRound;
}
console.log(`👑 Le grand champion est ${participants[0].nom} avec ${participants[0].vie} vie !`);
