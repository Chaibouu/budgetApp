let inputbudget = document.querySelector('#inputbudget');
let inputexpense = document.querySelector('#inputexpense');
let inputAmount = document.querySelector('#inputAmount');
let btncalculate = document.querySelector('#btncalculate');
let btnexpense = document.querySelector('#btnexpense');
let chfbudget = document.querySelector('.chfbudget');
let chfexpense = document.querySelector('.chfexpense');
let chfbalance = document.querySelector('.chfbalance');

// Création de l'objet pour stocker les valeur
const valeur = {
    budget : '',
    expense : '',
    balance : '',
};

// Ajouter un budget
btncalculate.addEventListener('click', () =>{
    if (inputbudget.value !== '') {
        if (localStorage.getItem('valeur')) {
            let valeurr = JSON.parse(localStorage.getItem('valeur'));
            let bbudget = valeurr.budget;
            valeur.budget = Number(inputbudget.value) + Number(bbudget);
            localStorage.setItem('valeur',JSON.stringify(valeur));
        } else {
            valeur.budget = inputbudget.value;
            localStorage.setItem('valeur',JSON.stringify(valeur));
        }
    } 
    else{
        alert('Veuillez entrer un montant pour le Budget')
    }
})


// Ajouter une dépence
btnexpense.addEventListener('click', () =>{
    if (inputexpense.value !== '') {
        if (inputAmount.value !== '') {
        
        } 
        else{
            alert('Veuillez remplir le champ de description de la dépence ')
        }
    } 
    else{
        alert('Veuillez remplir le champ pour une dépence')
    }
})
