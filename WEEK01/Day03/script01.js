//Arrow Functions :

//Exercice 1 :
let sum = (a, b) => a + b;
console.log(sum(3, 5)); 

//Exercice 2 :
let multiplierParDeux = (...numbers) => numbers.map(num => num * 2);
console.log(multiplierParDeux(1, 2, 3));

//Exercice 3 :
let saluer = nom => `Bonjour, ${nom}!`;
console.log(saluer("Sara"));



//Destructuring :

//Exercice 1 :
const personne = { nom: "Ali", age: 25, ville: "Casablanca" };
console.log(`Nom: ${personne.nom}, Age: ${personne.age}`);

//Exercice 2 :
const nombres = [10, 20, 30, 40];
const [n1, ,n3] = nombres;
console.log(n1, n3);
//console.log(nombres[0], nombres[2]);

//Exercice 3 :
let bonjour = ({ nom, prenom}) => `Bonjour, ${nom} ${prenom}!`;



//Template Literals (Backticks) :

//Exercice 1 :
const nom = "Sara";
const age = 19;
console.log(`Bonjour ${nom}, tu as ${age} ans.`);

//Exercice 2 :
const func = (a, b ) => `Le résultat de
${a} + ${b} est ${a + b}.`;
console.log(func(4, 6));



//Rest Operator :

//Exercice 1 :
const somme = (...nombres) => nombres.reduce((acc, curr) => acc + curr, 0);
console.log(somme(1, 2, 3, 4));

//Exercice 2 :
const fruits = ["pomme", "banane", "orange", "kiwi"];
const [premier, ...autres] = fruits;
console.log(premier);
console.log(autres);



//Spread Operator :

//Exercice 1 :
const tab1 = [1, 2, 3];
const tab2 = [4, 5, 6];
const fusion = [...tab1, ...tab2];
console.log(fusion);

//Exercice 2 :
const user = { nom: "Ali", age: 25 };
const update = { ...user, pays: "Maroc"};
console.log(update);