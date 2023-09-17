let inputbudget = document.querySelector('#inputbudget');
let inputexpense = document.querySelector('#inputexpense');
let inputAmount = document.querySelector('#inputAmount');
let btncalculate = document.querySelector('#btncalculate');
let btnexpense = document.querySelector('#btnexpense');
let btnreset = document.querySelector('.btnreset');
let btnhistory = document.querySelector('.btnhistory');
let btnclose = document.querySelector('.btnclose');
let chfbudget = document.querySelector('.chfbudget');
let chfexpense = document.querySelector('.chfexpense');
let chfbalance = document.querySelector('.chfbalance');
let containerLibelle = document.querySelector('.containerLibelle');
let editer = document.querySelector('.editer');
let succes = document.querySelector('.succes');
let echecs = document.querySelector('.echecs');
let containerHistory = document.querySelector('.containerHistory');
let history = document.querySelector('.history');

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
 const ffichreaffiche = ()=>{    
    let valeurr = JSON.parse(localStorage.getItem('valeur'));
    chfbudget.textContent = valeurr.budget + ' F';
    chfexpense.textContent = valeurr.expense + ' F';
    chfbalance.textContent = valeurr.balance + ' F';}
ffichreaffiche();
// Fonction qui permet de creer un 

// Affichage des libelles
const afficheDepense = ()=>{
    containerLibelle.innerHTML = '';
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

}
   
// Ajouter un budget
btncalculate.addEventListener('click', () =>{
    if (inputbudget.value !== '') {
        if (localStorage.getItem('valeur')) {
            let valeurr = JSON.parse(localStorage.getItem('valeur'));
            let bbudget = valeurr.budget;
            let eexpense = valeurr.expense;
            valeur.expense = eexpense;
            valeur.budget = Number(inputbudget.value) + Number(bbudget);
            chfbudget.textContent = valeur.budget  + ' F';
            valeur.balance = valeur.budget - valeur.expense;
            chfbalance.textContent = valeur.balance + ' F';
            inputbudget.value = '';
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
                let tabb = JSON.parse(localStorage.getItem('cles'));
                let result = tabb.find((produit)=> produit.titre == inputAmount.value)
            if (result) {
                let valeurr = JSON.parse(localStorage.getItem('valeur'));
                let bbudget = valeurr.budget;
                let eexpense = valeurr.expense;
                valeur.budget = bbudget ;
                valeur.expense = Number(inputexpense.value) + Number(eexpense);
                valeur.balance = valeur.budget - valeur.expense;
                chfexpense.textContent = valeur.expense + ' F';
                chfbalance.textContent = valeur.balance + ' F';
                localStorage.setItem('valeur',JSON.stringify(valeur));
                // permet de faire apparaitre et disparaitre la confrimation de depence en cas de doublons
                btnhistory.style.display = 'block';
                echecs.style.display = 'block';
                setTimeout(() => {
                    echecs.style.display = 'none'
                    
                }, 2000);

                result.valu = parseInt(result.valu) + parseInt(inputexpense.value);
                localStorage.setItem('cles',JSON.stringify(tabb));
                afficheDepense();
                // gestion des valeur de la chart grphiques
                chartj.data.labels = [];
                chartj.data.datasets[0].data = [];
                tabb.forEach(element => {
                    chartj.data.labels.push(element.titre);
                    chartj.data.datasets[0].data.push(element.valu);
                    chartj.data.datasets[0].backgroundColor.push(colorr());
                    chartj.update();
                });

                inputexpense.value = '';
                inputAmount.value = '';
            }
            else{
                let valeurr = JSON.parse(localStorage.getItem('valeur'));
                let bbudget = valeurr.budget;
                let eexpense = valeurr.expense;
                valeur.budget = bbudget ;
                valeur.expense = Number(inputexpense.value) + Number(eexpense);
                valeur.balance = valeur.budget - valeur.expense;
                chfexpense.textContent = valeur.expense + ' F';
                chfbalance.textContent = valeur.balance + ' F';
                insert();
                
                localStorage.setItem('valeur',JSON.stringify(valeur));
                afficheDepense();

                // gestion des valeur de la chart grphiques
                let tabb = JSON.parse(localStorage.getItem('cles'));
                chartj.data.labels = [];
                chartj.data.datasets[0].data = [];
                tabb.forEach(element => {
                    chartj.data.labels.push(element.titre);
                    chartj.data.datasets[0].data.push(element.valu);
                    chartj.data.datasets[0].backgroundColor.push(colorr());
                    chartj.update();
                });
                
                // permet de faire apparaitre et disparaitre la confrimation de depence
                echecs.style.display = 'block';
                btnhistory.style.display = 'block';
                setTimeout(() => {
                    echecs.style.display = 'none'
                    
                }, 2000);
            
                // document.location.reload();
                // location.reload();
              
                
                inputexpense.value = '';
                inputAmount.value = '';
                }
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
      let tabb = JSON.parse(localStorage.getItem('cles'));
     
        const libel = {
            id : tabb.length? tabb.length + 1: 1,
            titre : inputAmount.value,
            valu : inputexpense.value,
        }
        
        tabb.push(libel);
        localStorage.setItem('cles',JSON.stringify(tabb));
        // location.reload();
}


// =================chartjs=======================
const ctx = document.getElementById('myChart');
let chartj = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor:[],
        borderWidth: 1
      }]
    },
    
  });
// fonction pour générer des couleur
const colorr = () => {
    let col = '0123456789ABCDEF';
    let r = '#';
    for (let i = 0; i < 6; i++) {
        r +=  col[Math.floor(Math.random()*16)] 
    }
    return r;
}
// ================================================

const afficheHistory = ()=>{
    // containerHistory.innerHTML = '';
    let tabb = JSON.parse(localStorage.getItem('cles'));
    let entete = document.createElement('div');
    history.append(entete);
    entete.classList.add('entete');
    entete.innerHTML = `<h5>#</h5> <h5>Expense Title</h5> <h5>Expense Value</h5>`
    tabb.forEach(element => {
    let boite = document.createElement('div');
    history.append(boite);
    boite.classList.add('boite');
    let para1 = document.createElement('p');
    boite.append(para1)
    let para2 = document.createElement('p');
    para2.classList.add('para2');
    boite.append(para2)
    let para3 = document.createElement('p');
    boite.append(para3);
    para1.innerHTML = element.id;
    para2.innerHTML = element.titre;
    para3.innerHTML = element.valu + ' F';
   })

}
btnhistory.addEventListener('click', () =>{
    let tabb = JSON.parse(localStorage.getItem('cles'));
    history.innerHTML=" ";
    afficheHistory();
    btnclose.style.display="block";
    // gestion des valeur de la chart grphiques
    chartj.data.labels = [];
    chartj.data.datasets[0].data = [];
    tabb.forEach(element => {
        chartj.data.labels.push(element.titre);
        chartj.data.datasets[0].data.push(element.valu);
        chartj.data.datasets[0].backgroundColor.push(colorr());
        chartj.update();
    });
})
btnclose.addEventListener('click', () =>{
    history.innerHTML=" ";
    btnclose.style.display="none";

})







// Affichage des libelles
afficheDepense()

// button supprimer un produit
let supprime = document.querySelectorAll('.supprime');
let tabbb = JSON.parse(localStorage.getItem('cles'));
document.addEventListener("DOMContentLoaded", (event) => {
    for (let i = 0; i < supprime.length; i++) {
        supprime[i].addEventListener('click',(e)=>{
            let asup = e.target.parentElement.parentElement.parentElement;
            let asupId = tabbb[i].id;
            let prix = tabbb[i].valu;
            asup.remove();
            const filteredtabb = tabbb.filter((tablea) => tablea.id !== asupId);
            tabbb = filteredtabb;
            let va = JSON.parse(localStorage.getItem('valeur'));
            va.expense = Number(va.expense) - Number(prix);
            va.budget = Number(va.budget)
            va.balance = Number(va.balance) + Number(prix);
            localStorage.setItem('valeur',JSON.stringify(va));
            localStorage.setItem('cles',JSON.stringify(tabbb));
            ffichreaffiche();
            afficheDepense();
            document.location.reload();
        })
        
      
        
    }
 });


 // button editer un libellé
// editer.addEventListener('click',()=>{
//     boite.style.backgroundColor = 'red'
// })
