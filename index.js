let inputbudget = document.querySelector('#inputbudget');
let inputexpense = document.querySelector('#inputexpense');
let inputAmount = document.querySelector('#inputAmount');
let btncalculate = document.querySelector('#btncalculate');
let btnexpense = document.querySelector('#btnexpense');
let chfbudget = document.querySelector('.chfbudget');
let chfexpense = document.querySelector('.chfexpense');
let chfbalance = document.querySelector('.chfbalance');

// Ajouter un budget
btncalculate.addEventListener('click', () =>{
    chfbudget.textContent = inputbudget.value + ' F CFA'
    inputbudget.value = '';
})
// Ajouter une dépence
btnexpense.addEventListener('click', () =>{
    chfbudget.textContent = parseInt(chfbudget.textContent) - inputexpense.value + ' F CFA';
    chfexpense.textContent =inputexpense.value + ' F CFA';
    chfbalance.textContent = inputAmount.value;
    inputexpense.value = '';
    inputAmount.value = '';
})
