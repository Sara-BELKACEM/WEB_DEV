//Exercice 1 :
const tableau = [];
tableau.push("Sara", "Maryam", "Khaoula");
console.log(tableau);
tableau.pop();
console.log(tableau);

//Exercice 2 :
const tab = ["Sara", "Maryam", "Khaoula"];
tab.unshift("Marwa");
console.log(tab);
tab.shift();
console.log(tab);

//Exercice 3 :
const t = [1, 2, 3, 4, 5];
const m = t.map(n => n * 2);
console.log(m);

//Exercice 4 :
const array = [10, 15, 20, 25, 30];
const f = array.filter(n => n > 20);
console.log(f);

//Exercice 5 :
const fruits = ["pomme", "banane", "orange"];
const fruitsMaj = fruits.map(fruit => fruit.toUpperCase());
console.log(fruitsMaj);

//Exercice 6 :
const arr = [5, 10, 15, 20];
const sum = arr.reduce((acc, curr) => acc + curr);
console.log(sum);

//Exercice 7 :
const n =  ["Alice", "Bob", "Charlie", "David"];
n.splice(2, 1);
console.log(n);
n.splice(2, 0, "Eve");
console.log(n);

//Exercice 8 :
const a = [1, 2, 3, 4, 5, 6];
const ar = a.slice(2, 5);
console.log(a);
console.log(ar);

//Exercice 9 :
const fr = ["pomme", "banane", "orange"];
fr.includes("banane") ? console.log("Banane est dans le tableau ✅") : console.log("Banane n'est pas dans le tableau ❌");