const mot = prompt("Entrez un mot :");
const tab = ["a", "e", "i", "o", "u"];

const  voyelle = () => {

for(let i = 0; i < tab.length; i++) {
    mot.includes(tab[i]) ? console.log("true") : console.log("false");

}}

console.log(voyelle()) 
