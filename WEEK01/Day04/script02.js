 let creatures = [
    {
        name: "Dragon",
        type: "Fire", 
        power: 95,
        magic: 70
    },
    {
        name: "Unicorn",
        type: "Light", 
        power: 97,
        magic: 90
    },
    {
        name: "Elf",
        type: "Nature",
        power: 50,
        magic: 80
    }
 ];


const afficherCreatures = (creature) => {
    console.log(`Name: ${creature.name}, Type: ${creature.type}, Power: ${creature.power}, Magic: ${creature.magic}`);
} 
creatures.forEach(afficherCreatures);

const combattre = (creature1, creature2) => {
    if (creature1.power > creature2.power) {
        console.log(`${creature1.name} gagne contre ${creature2.name}`);
        return creature1.name;
    } else if (creature2.power > creature1.power) {
        console.log(`${creature2.name} gagne contre ${creature1.name}`);
        return creature2.name;
    } else {
        if (creature1.magic > creature2.magic) {
            console.log(`${creature1.name} gagne contre ${creature2.name}`);
            return creature1.name;
        } else if (creature2.magic > creature1.magic) {
            console.log(`${creature2.name} gagne contre ${creature1.name}`);
            return creature2.name;
        } else {
            console.log(`${creature1.name} et ${creature2.name} font égalité !`);
            return null;
        }
    }
};

let results = {}; 
const tournoi = () => {
    
    creatures.forEach(creature => {
        results[creature.name] = 0; 
    });
    for (let i = 0; i < creatures.length; i++) {
        for (let j = i + 1; j < creatures.length; j++) {
            let winner = combattre(creatures[i], creatures[j]);
            if (winner) {
                results[winner]++;
            }
        }
    }
    console.log("\nClassement final:");
    // Convertir en tableau pour trier
    const classement = Object.entries(results).sort((a, b) => b[1] - a[1]);
    classement.forEach(([nom, victoires], index) => {
        console.log(`${index + 1}. ${nom} - ${victoires} victoire(s)`);
    });

    // Afficher le champion
    const [champion, nbVictoires] = classement[0];
    console.log(`\n🏆 La créature la plus puissante est ${champion} avec ${nbVictoires} victoire(s) !`);
};

tournoi();
