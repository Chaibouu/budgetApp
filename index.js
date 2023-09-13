let inputbudget = document.querySelector('#inputbudget');
let inputexpense = document.querySelector('#inputexpense');
let inputAmount = document.querySelector('#inputAmount');
let btncalculate = document.querySelector('#btncalculate');
let btnexpense = document.querySelector('#btnexpense');
let btnreset = document.querySelector('.btnreset');
let chfbudget = document.querySelector('.chfbudget');
let chfexpense = document.querySelector('.chfexpense');
let chfbalance = document.querySelector('.chfbalance');
let containerLibelle = document.querySelector('.containerLibelle');
let supprime = document.querySelector('.supprime');
let editer = document.querySelector('.editer');
let succes = document.querySelector('.succes');
let echecs = document.querySelector('.echecs')
// Création de l'objet pour stocker les valeur
const valeur = {
    budget : '',
    expense : '',
    balance : '',
};


//button reset value
btnreset.addEventListener('click', () =>{
 localStorage.clear();
 document.location.reload();
})


// Création de l'objet pour stocker les libelles de dépence
const tabLib = [];
if (!localStorage.getItem('cles')) {
    localStorage.setItem('cles',JSON.stringify(tabLib));
}

// Affectation des valeurs dans label
if (!localStorage.getItem('valeur')) {
    localStorage.setItem('valeur', JSON.stringify(valeur))
}
    let valeurr = JSON.parse(localStorage.getItem('valeur'));
    chfbudget.textContent = valeurr.budget + ' F';
    chfexpense.textContent = valeurr.expense + ' F';
    chfbalance.textContent = valeurr.balance + ' F';

// Affichage des libelles
let tabb = JSON.parse(localStorage.getItem('cles'));
tabb.forEach(element => {
    let boite = document.createElement('div');
    containerLibelle.append(boite);
    boite.classList.add('boite');
    let para1 = document.createElement('p');
    para1.setAttribute('class', 'para1');
    boite.append(para1)
    let para2 = document.createElement('p');
    boite.append(para2)
    let sup = document.createElement('span');
    sup.setAttribute('class','supprime');
    let edit = document.createElement('span');
    edit.setAttribute('class','editer');
    let para3 = document.createElement('p');
    sup.innerHTML = `<i class="fa-solid fa-trash-can" style="color: #cf2029;"></i>`;
    edit.innerHTML = `<i class="fa-solid fa-pen-to-square" style="color: #6698f0;"></i>`
    para3.append(sup);
    para3.append(edit);
    boite.append(para3);
    para1.innerHTML = element.titre;
    para2.innerHTML = element.valu;
   })

   
// Ajouter un budget
btncalculate.addEventListener('click', () =>{
    if (inputbudget.value !== '') {
        if (localStorage.getItem('valeur')) {
            let valeurr = JSON.parse(localStorage.getItem('valeur'));
            let bbudget = valeurr.budget;
            let eexpense = valeurr.expense;
            valeur.expense = eexpense;
            valeur.budget = Number(inputbudget.value) + Number(bbudget);
            chfbudget.textContent = valeur.budget
            valeur.balance = valeur.budget - valeur.expense;
            chfbalance.textContent = valeur.balance;
            localStorage.setItem('valeur',JSON.stringify(valeur));
            succes.style.display = 'block'
            setTimeout(() => {
                succes.style.display = 'none'
              }, 2000);
              
            // document.location.reload();
            
        } else {
            let valeurr = JSON.parse(localStorage.getItem('valeur'));
            valeur.budget = Number(inputbudget.value);
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
                
                echecs.style.display = 'block'
                setTimeout(() => {
                    echecs.style.display = 'none'
                }, 2000);

                // document.location.reload();
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
        const libel = {
            titre : inputAmount.value,
            valu : inputexpense.value,
        }
        let tabb = JSON.parse(localStorage.getItem('cles'));
        tabb.push(libel);
        localStorage.setItem('cles',JSON.stringify(tabb));
}

// button supprimer un libellé
// supprime.addEventListener('click',()=>{
//     localStorage.removeItem("key");
// })


// button editer un libellé
// editer.addEventListener('click',()=>{
//     boite.style.backgroundColor = 'red'
// })