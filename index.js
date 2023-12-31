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
let succes = document.querySelector('.succes');
let echecs = document.querySelector('.echecs');
let containerHistory = document.querySelector('.containerHistory');
let history = document.querySelector('.history');
let editExpense = document.querySelector('.editExpense');

// Création de l'objet pour stocker les valeur
const valeur = {
    budget : '',
    expense : '',
    balance : '',
};

let filteredtabb='';
let aa = 0;

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
    chfbudget.textContent = valeurr.budget + 0 + ' F';
    chfexpense.textContent = valeurr.expense + 0 + ' F';
    chfbalance.textContent = valeurr.balance + 0 + ' F';}
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




// button supprimer un produit
let supprime = document.querySelectorAll('.supprime');
let tabbb = JSON.parse(localStorage.getItem('cles'));
    for (let i = 0; i < supprime.length; i++) {
        supprime[i].addEventListener('click',(e)=>{
            let asup = e.target.parentElement.parentElement.parentElement;
            let asupId = tabbb[i].id;
            let prix = tabbb[i].valu;
            asup.remove();
            const filteredtabb = tabbb.filter((tablea) => tablea.id !== asupId);
            tabbb = filteredtabb;
            let va = JSON.parse(localStorage.getItem('valeur'));
            // va.expense = Number(va.expense) - Number(prix);
            if (va.expense > 0) {
                va.expense = Number(va.expense) - Number(prix);
            }
            else{
                va.expense = 0;
            }
            va.budget = Number(va.budget)
            va.balance = Number(va.balance) + Number(prix);
            localStorage.setItem('valeur',JSON.stringify(va));
            localStorage.setItem('cles',JSON.stringify(tabbb));
            ffichreaffiche();
            afficheDepense();
            // mettre ajout l'historique
            history.innerHTML=" ";
            afficheHistory();
            // gestion des valeur de la chart grphiques
            myChartjs();
            echecs.style.display = 'block';
            echecs.firstElementChild.textContent = 'Dépense supprimer' ;
            echecs.lastElementChild.textContent = 'Votre dépense à été supprimer avec succès' 
            setTimeout(() => {
                echecs.style.display = 'none'
                
            }, 3000);
            
        })
    }


// button editer un produit
let editer = document.querySelectorAll('.editer');
let tabbbb = JSON.parse(localStorage.getItem('cles'));
    for (let i = 0; i < editer.length; i++) {
        editer[i].addEventListener('click',(e)=>{
            editExpense.style.display = "block";
            btnexpense.style.display = "none";
            
            let edi = e.target.parentElement.parentElement.parentElement;
            let edititre = tabbbb[i].titre;
            let prix = tabbbb[i].valu;
            edi.remove();
            inputAmount.value = edititre;
            inputexpense.value = prix;

            filteredtabb = tabbbb.findIndex((tablea) => tablea.titre === edititre);
            aa = tabbbb[filteredtabb].valu;
            console.log(aa);
            // tabbbb = filteredtabb;
            // console.log(filteredtabb);
            let v = JSON.parse(localStorage.getItem('valeur'));
            if (v.expense > 0) {
                v.expense = Number(v.expense) - Number(prix);
            }
            else{
                v.expense = 0;
            }
            v.budget = Number(v.budget)
            v.balance = Number(v.balance) + Number(prix);
            // localStorage.setItem('valeur',JSON.stringify(v));
            localStorage.setItem('cles',JSON.stringify(tabbbb));
            ffichreaffiche();
            myChartjs();
            // mettre à jour l'historique
            // history.innerHTML=" ";
            // afficheHistory();
        })
    }

}
   
// Ajouter un budget
btncalculate.addEventListener('click', () =>{
    if (inputbudget.value !== '') {
        if (inputbudget.value > 0) {
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
            echecs.style.display = 'block';
            echecs.firstElementChild.textContent = 'Invalid' ;
            echecs.lastElementChild.textContent = 'Veuillez entrer une valeur valide' 
            setTimeout(() => {
                echecs.style.display = 'none'
                
            }, 3000);
            
        }
    } 
    else{
        echecs.style.display = 'block';
            echecs.firstElementChild.textContent = 'Error' ;
            echecs.lastElementChild.textContent = 'Veuillez entrer un montant pour le Budget' 
            setTimeout(() => {
                echecs.style.display = 'none'
                
            }, 3000);
    }
})

// Ajouter une dépence
btnexpense.addEventListener('click', () =>{
    if (inputexpense.value !== '') {
        if (inputAmount.value !== '') {
            if (inputexpense.value > 0) {
                if (localStorage.getItem('valeur')) {
                    let tabb = JSON.parse(localStorage.getItem('cles'));
                    let result = tabb.find((produit)=> produit.titre == inputAmount.value.trim().toLowerCase())
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
                    echecs.firstElementChild.textContent = 'Ajout de la dépense' ;
                    echecs.lastElementChild.textContent = 'Votre dépense à été ajouter avec succès'
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
                    myChartjs();
                    
                    // permet de faire apparaitre et disparaitre la confrimation de depence
                    echecs.style.display = 'block';
                    btnhistory.style.display = 'block';
                    echecs.firstElementChild.textContent = 'Ajout de la dépense' ;
                    echecs.lastElementChild.textContent = 'Votre dépense à été ajouter avec succès'
                    setTimeout(() => {
                        echecs.style.display = 'none'
                        
                    }, 2000);
                
                    // document.location.reload();
                    // location.reload();
                  
                    
                    inputexpense.value = '';
                    inputAmount.value = '';
                    }
                 } 
                //else {
                //     valeur.expense = inputexpense.value;
                //     localStorage.setItem('valeur',JSON.stringify(valeur));
                // }
            }
            else{
                echecs.style.display = 'block';
                echecs.firstElementChild.textContent = 'Error' ;
                echecs.lastElementChild.textContent = 'Veuillez entrer une valeur valide' 
                setTimeout(() => {
                    echecs.style.display = 'none'

                }, 3000);
            }
        } 
        else{
            echecs.style.display = 'block';
            echecs.firstElementChild.textContent = 'Error' ;
            echecs.lastElementChild.textContent = 'Veuillez remplir le champ de description de la dépence ' 
            setTimeout(() => {
                echecs.style.display = 'none'
                
            }, 3000);
        }
    } 
    else{
        echecs.style.display = 'block';
            echecs.firstElementChild.textContent = 'Error' ;
            echecs.lastElementChild.textContent = 'Veuillez remplir le montant de la dépence' 
            setTimeout(() => {
                echecs.style.display = 'none'
                
            }, 3000);
    }
})

//Fonction permettant d'entrer les libellés    
const insert = ()=>{
      // insertion des Libelles
      let tabb = JSON.parse(localStorage.getItem('cles'));
     
        const libel = {
            id : tabb.length? tabb.length + 1: 1,
            titre : inputAmount.value.trim().toLowerCase(),
            valu : inputexpense.value,
        }
        
        tabb.push(libel);
        localStorage.setItem('cles',JSON.stringify(tabb));
        // location.reload();
}

const myChartjs = ()=>{
    let tabb = JSON.parse(localStorage.getItem('cles'));
                chartj.data.labels = [];
                chartj.data.datasets[0].data = [];
                tabb.forEach(element => {
                    chartj.data.labels.push(element.titre);
                    chartj.data.datasets[0].data.push(element.valu);
                    chartj.data.datasets[0].backgroundColor.push(colorr());
                    chartj.update();
                });
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

// function du button pour afficher l'history
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

// button History
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
// button ajouter une modification
editExpense.addEventListener('click', () =>{
    if (inputAmount.value != '') {
        if (inputexpense.value != '') {
            if (inputexpense.value > 0) {

                    let stockedit = JSON.parse(localStorage.getItem('cles'));

                    let doubl = stockedit.find(el => el.titre == inputAmount.value);
                    console.log(doubl);
                    if (doubl) {
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
                        echecs.firstElementChild.textContent = 'Ajout de la dépense' ;
                        echecs.lastElementChild.textContent = 'Votre dépense à été ajouter avec succès'
                                setTimeout(() => {
                            echecs.style.display = 'none'
                            
                        }, 2000);
                        
                        doubl.valu = parseInt(doubl.valu) + parseInt(inputexpense.value);
                        // Récuperer le titre de l'élément sible
                        let no = stockedit[filteredtabb].titre;
                        // rechercher les doublons dans le local
                        let re = stockedit.filter(el=> el.titre != no);
                        // remplacer les doublons
                        stockedit = re;
                        localStorage.setItem('cles',JSON.stringify(stockedit));
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
                        let stockedit = JSON.parse(localStorage.getItem('cles'));
                        stockedit[filteredtabb].titre = inputAmount.value;
                        stockedit[filteredtabb].valu = inputexpense.value;
                        let a = aa
                        let b = inputexpense.value;
                        let c = 0;
                        localStorage.setItem('cles',JSON.stringify(stockedit));
                        afficheDepense();
                        // mettre à jour l'historique
                        // history.innerHTML=" ";
                        // afficheHistory();
                        // btnclose.style.display="block";
                        // gestion des valeur de la chart grphiques
                        myChartjs();

                        if (a>b) {
                            c = a - b;
                            let locc = JSON.parse(localStorage.getItem('valeur'));
                            locc.expense = Number(locc.expense) - Number(c);
                            locc.budget = Number(locc.budget)
                            locc.balance = Number(locc.budget) - Number(locc.expense);

                            localStorage.setItem('valeur',JSON.stringify(locc));
                            chfexpense.textContent = locc.expense + ' F';
                            chfbalance.textContent = locc.balance + ' F';
                            console.log(locc);
                        }
                        else{
                            c = b - a;
                            let locc = JSON.parse(localStorage.getItem('valeur'));
                            locc.expense = Number(locc.expense) + Number(c);
                            locc.budget = Number(locc.budget)
                            locc.balance = Number(locc.budget) - Number(locc.expense);

                            localStorage.setItem('valeur',JSON.stringify(locc));
                            chfexpense.textContent = locc.expense + ' F';
                            chfbalance.textContent = locc.balance + ' F';
                            console.log(locc);
                            }


                            // ffichreaffiche();
                        
                            inputexpense.value = '';
                            inputAmount.value = '';

                            echecs.style.display = 'block';
                            echecs.firstElementChild.textContent = 'Tâche Modifier' ;
                            echecs.lastElementChild.textContent = 'Votre tâche à été modifier avec succès' 
                            setTimeout(() => {
                                echecs.style.display = 'none'

                            }, 3000);
                            editExpense.style.display = "none";
                            btnexpense.style.display = "block";
                        // }
                    }

                    
                
            }
            else{
                echecs.style.display = 'block';
                echecs.firstElementChild.textContent = 'Error' ;
                echecs.lastElementChild.textContent = 'Veuillez entrer une valeur valide' 
                setTimeout(() => {
                    echecs.style.display = 'none'

                }, 3000);
            }
        }
        else{
            echecs.style.display = 'block';
                echecs.firstElementChild.textContent = 'Error' ;
                echecs.lastElementChild.textContent = 'Veuillez remplir le montant de la dépence' 
                setTimeout(() => {
                    echecs.style.display = 'none'
                    
                }, 3000);
        }
    }
    else{
        echecs.style.display = 'block';
        echecs.firstElementChild.textContent = 'Error' ;
        echecs.lastElementChild.textContent = 'Veuillez remplir le champ de description de la dépence ' 
        setTimeout(() => {
            echecs.style.display = 'none'
            
        }, 3000);
    }

})
// Affichage des libelles
afficheDepense()

// Affichage du circle graphiques
myChartjs();
