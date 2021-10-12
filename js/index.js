let Pform = document.querySelector('form');
let Pname = document.getElementById('name');
let Pcate = document.getElementById('category');
let Pprice = document.getElementById('price');
let Pdesc = document.getElementById('desc');

let Ptable = document.querySelector('table');

let BtnAdd = document.getElementById('btn-add');
let BtnDel = document.getElementById('btn-del');

let arr= JSON.parse(localStorage.getItem('products')) ? JSON.parse(localStorage.getItem('products')) : [];
let data= JSON.parse(localStorage.getItem('products')) ? JSON.parse(localStorage.getItem('products')) : [];

let createBodyTable = function(text){
    let tbody = document.createElement('tbody');
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    
    td.textContent = text;

    tr.appendChild(td);
    tbody.appendChild(tr);
    Ptable.appendChild(tbody);
}

data.map((prod)=>{
    createBodyTable(prod);
})

Pform.addEventListener('submit', function(e){
    e.preventDefault();

    arr.push(Pname.value + Pcate.value + Pprice.value + Pdesc.value);
    localStorage.setItem('products',JSON.stringify(arr));

    createBodyTable(Pname.value + '\t' + Pcate.value + '\t' + Pprice.value + '\t' + Pdesc.value);
    Pname.value = Pcate.value = Pprice.value = Pdesc.value ='';
})

BtnDel.addEventListener('click', function(){
    localStorage.clear();
    Ptable.innerHTML = '';
})
