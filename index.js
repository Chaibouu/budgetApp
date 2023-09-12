let inputbudget = document.querySelector('#inputbudget');
let inputexpense = document.querySelector('#inputexpense');
let inputAmount = document.querySelector('#inputAmount');
let btncalculate = document.querySelector('#btncalculate');
let btnexpense = document.querySelector('#btnexpense');
let chfbudget = document.querySelector('.chfbudget');
let chfexpense = document.querySelector('.chfexpense');
let chfbalance = document.querySelector('.chfbalance');

// Création de l'objet pour stocker les valeur
// const valeurr = JSON.parse(localStorage.getItem('valeur'));
const valeur = {
    budget : parseInt(inputbudget.value),
    expense : parseInt(inputexpense.value),
    amount : parseInt(inputAmount.value),
};
localStorage.setItem('valeur', JSON.stringify(valeur));
let j = JSON.parse(localStorage.getItem('valeur'));
console.log(j);
chfbudget.textContent = localStorage.getItem('budget'); + ' F CFA'
// Ajouter un budget
btncalculate.addEventListener('click', () =>{
    if (inputbudget.value !== '') {
        // localStorage.setItem('budget', inputbudget.value);
        localStorage.setItem('budget', JSON.stringify(valeur.budget)) = j.budget + inputbudget; 
        let i = localStorage.getItem('budget') + parseInt(valeur.budget);
        localStorage.setItem('budget',JSON.stringify(i))
        inputbudget.value = '';
    }
    else{
        alert('Veuillez entrer un montant pour le Budget')
    }
})
// Ajouter une dépence
btnexpense.addEventListener('click', () =>{
    chfbudget.textContent = parseInt(chfbudget.textContent) - inputexpense.value + ' F CFA';
    localStorage.setItem('expense', inputexpense.value);
    chfexpense.textContent =inputexpense.value + ' F CFA';
    chfbalance.textContent = inputAmount.value;
    inputexpense.value = '';
    inputAmount.value = '';
})
