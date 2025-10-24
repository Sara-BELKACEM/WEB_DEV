const personne = {
    nom : "Belkacem",
    prenom : "Sara",
    age : 19
}
console.log(personne);

personne.ville = "Mohammedia";
console.log(personne);

personne.age = 20;
console.log(personne);

delete personne.prenom;
console.log(personne);


let etudiants = [
    {nom : "Belkacem", note : 18},
    {nom : "Toubali", note : 16},
    {nom : "Lahnin", note : 15}
]

etudiants.forEach(function(etudiant) {
    console.log(`L'étudiant ${etudiant.nom} `);
})

etudiants[2].note += 5
console.log(etudiants[2]);

etudiants.push({nom : "Sara" , note : 20});
console.log(etudiants);

etudiants = etudiants.filter(etudiant => etudiant.nom !== "Sara");
console.log(etudiants);

const calculerMoyenne = (etudiants) => {
    let total = 0;
    etudiants.forEach(etudiant => {
        total += etudiant.note;
    })
    return total / etudiants.length;    
}
console.log(`La moyenne des étudiants est : ${calculerMoyenne(etudiants)}`);

const trouverEtudiant = (etudiants, nom) => {
    return etudiants.find(etudiant => etudiant.nom === nom);
}
console.log(trouverEtudiant(etudiants, "Toubali"));

const etudiantsAdmis = etudiants.filter(etudiant => etudiant.note >= 10);
console.log(etudiantsAdmis);

const augmenterNotes = (etudiants, x) => {
    return etudiants.map(etudiant => {
        return {
            nom: etudiant.nom,
            note: etudiant.note + x
        };
    });
}
console.log(augmenterNotes(etudiants, 2));

const annuaire = [
    {nom: "Belkacem", prenom: "Sara", tel: "0602886958"},
    {nom: "Toubali", prenom: "Maryam", tel: "0612345678"},
    {nom: "Lahnin", prenom: "Khaoula", tel: "0623456789"},
    {nom: "Ait El Cadi", prenom: "Youssef", tel: "0634567890"},
    { nom: "Dahman", prenom: "Amina", tel: "" },           
    { nom: "El assass", prenom: "Samira" }, 
    {nom: "El Bouzidi", prenom: "Adam", tel: "0645678901"}
]

annuaire.forEach(personne => {
    console.log(`Tel : ${personne.tel}`);
})

const mettreAJourTel = (annuaire, nom, nouveauTel) => {
    const personne = annuaire.find(personne => personne.nom === nom);
    if (personne) {
        personne.tel = nouveauTel;
    }
}
mettreAJourTel(annuaire, "Toubali", "0698765432");
console.log(annuaire);

annuaire = annuaire.filter(personne => personne.tel && personne.tel.trim() !== "");
console.log(annuaire);