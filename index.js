let inputbudget = document.querySelector('#inputbudget');
let inputexpense = document.querySelector('#inputexpense');
let inputAmount = document.querySelector('#inputAmount');
let btncalculate = document.querySelector('#btncalculate');
let btnexpense = document.querySelector('#btnexpense');
let chfbudget = document.querySelector('.chfbudget');
let chfexpense = document.querySelector('.chfexpense');
let chfbalance = document.querySelector('.chfbalance');
let containerLibelle = document.querySelector('.containerLibelle');

// Création de l'objet pour stocker les valeur
const valeur = {
    budget : '',
    expense : '',
    balance : '',
};


// Création de l'objet pour stocker les libelles de dépence
const tabLib = [];
if (!localStorage.getItem('cles')) {
    localStorage.setItem('cles',JSON.stringify(tabLib));
}

// Affectation des valeurs dans label
    let valeurr = JSON.parse(localStorage.getItem('valeur'));
    chfbudget.textContent = valeurr.budget + ' F';
    chfexpense.textContent = valeurr.expense + ' F';
    chfbalance.textContent = valeurr.balance + ' F';
// Ajouter un budget
btncalculate.addEventListener('click', () =>{
    if (inputbudget.value !== '') {
        if (localStorage.getItem('valeur')) {
            let valeurr = JSON.parse(localStorage.getItem('valeur'));
            let bbudget = valeurr.budget;
            let eexpense = valeurr.expense;
            valeur.expense = eexpense;
            valeur.budget = Number(inputbudget.value) + Number(bbudget);
            valeur.balance = valeur.budget - valeur.expense;
            localStorage.setItem('valeur',JSON.stringify(valeur));
            document.location.reload();
        } else {
            valeur.budget = inputbudget.value;
            localStorage.setItem('valeur',JSON.stringify(valeur));
            document.location.reload();
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
            if (localStorage.getItem('valeur')) {
                let valeurr = JSON.parse(localStorage.getItem('valeur'));
                let bbudget = valeurr.budget;
                let eexpense = valeurr.expense;
                valeur.budget = bbudget ;
                valeur.expense = Number(inputexpense.value) + Number(eexpense);
                valeur.balance = valeur.budget - valeur.expense;
                localStorage.setItem('valeur',JSON.stringify(valeur));
                insert();
                
                document.location.reload();
                // location.reload();
              
            } else {
                valeur.expense = inputexpense.value;
                localStorage.setItem('valeur',JSON.stringify(valeur));
            }
        } 
        else{
            alert('Veuillez remplir le champ pour une dépence')
        }
    } 
    else{
        alert('Veuillez remplir le champ de description de la dépence ')
    }
})

//Fonction permettant d'entrer les libellés    
const insert = ()=>{
      // insertion des Libelles
      let boite = document.createElement('div');
      containerLibelle.append(boite);
      boite.classList.add('boite');
      let para1 = document.createElement('p');
      boite.append(para1)
      let para2 = document.createElement('p');

      boite.append(para2)
      let para3 = document.createElement('p');
      para3.textContent = 'icone';
      boite.append(para3)

      const libel = {
        titre : inputAmount.value,
        valu : inputexpense.value,
        }
        let tabb = JSON.parse(localStorage.getItem('cles'));

        tabb.push(libel);
        localStorage.setItem('cles',JSON.stringify(tabb));


      let libb = JSON.parse(localStorage.getItem('cles'));
    
        para1.innerHTML = libb.titre;
        para2.innerHTML = libb.valu;


}