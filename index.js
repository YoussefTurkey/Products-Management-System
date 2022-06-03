let title = document.getElementById('title'),
    price = document.getElementById('price'),
    taxes = document.getElementById('taxes'),
    ads = document.getElementById('ads'),
    discount = document.getElementById('discount'),
    total = document.getElementById('total'),
    count = document.getElementById('count'),
    category = document.getElementById('category'),
    submit = document.getElementById('submit');

let mood = 'Add Product';
var temp;

    // Getting Total
function getTotal(){
    if(price.value && taxes.value && ads.value && discount.value != ''){
        let res = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = `${res}$`;
    }
    else{
        total.innerHTML = '';
    }
}

let dataProduct;
if(localStorage.Products != null){
    dataProduct = JSON.parse(localStorage.Products);
}
else{
    dataProduct = [];
}

    // Adding Products
submit.onclick = function(){
    let newProduct = {
        'Title': title.value.toLowerCase(),
        'Price': price.value,
        'Taxes': taxes.value,
        'Ads': ads.value,
        'Discount': discount.value,
        'Total': total.innerHTML,
        'Count': count.value,
        'Category': category.value.toLowerCase()
    };

    if(title.value != ''){
        if(mood === 'Add Product'){
            if(newProduct.Count > 1){
                for(let i=0; i<newProduct.Count; i++){
                    dataProduct.push(newProduct);
                }
            }
            else{
                dataProduct.push(newProduct);
            }
        }
        else{
            dataProduct[temp] = newProduct;
            mood = 'Add Product';
            submit.innerHTML = 'Add Product';
            count.style.display = 'block';
        }
        clearData();
    }
    else{
        alert('Insert title for your new product, please!')
    }

    localStorage.setItem('Products', JSON.stringify(dataProduct));
    showData();
}

    // Clearing Inputs
function clearData(){
    title.value = price.value = taxes.value = ads.value = discount.value = total.innerHTML = count.value = category.value = '';
}

    // Diplaying data on Screen
function showData(){
    let tableProduct = '';

    for(let i=0; i< dataProduct.length; i++){
        tableProduct += `  <tr>
                        <td>${i+1}</td>
                        <td>${dataProduct[i].Title}</td>
                        <td>${dataProduct[i].Price}</td>
                        <td>${dataProduct[i].Taxes}</td>
                        <td>${dataProduct[i].Ads}</td>
                        <td>${dataProduct[i].Discount}</td>
                        <td>${dataProduct[i].Total}</td>
                        <td>${dataProduct[i].Category}</td>
                        <td><button onclick='updateProduct(${i})' id="update">Update</button></td>
                        <td><button onclick='deleteProduct(${i})' id="delete">Delete</button></td>
                    </tr>` 
    }
    document.getElementById('tbody').innerHTML = tableProduct;

    let btnDeleteAll = document.getElementById('delete_All');
    if(dataProduct.length > 0){
        btnDeleteAll.innerHTML = `<button onclick='deleteAll()' id='delete'>Delete All Products (${dataProduct.length})</button>`;
    }
    else{
        btnDeleteAll.innerHTML =  '';
    }
}
showData();

    // Deleting item
function deleteProduct(index){
    dataProduct.splice(index, 1);
    localStorage.Products = JSON.stringify(dataProduct);
    showData();
}

    // Deleting All items
function deleteAll(){
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}

    // Updating Products 
function updateProduct(i){
    title.value = dataProduct[i].Title;
    price.value = dataProduct[i].Price;
    taxes.value = dataProduct[i].Taxes;
    ads.value = dataProduct[i].Ads;
    discount.value = dataProduct[i].Discount;
    total.innerHTML = dataProduct[i].Total;
    category.value = dataProduct[i].Category;
    count.style.display = 'none';
    submit.innerHTML = 'Update Product';
    mood = 'Update Product';
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

    // Searching on Products
let searchMood = 'title';

function getSearchMood(id){

    let search = document.getElementById('search');

    if(id == 'searchTitle'){
        searchMood = 'title';
    }
    else{
        searchMood = 'category';
    }
    search.placeholder = 'Search by ' + searchMood + '...';
    search.focus();
    search.value = '';
    showData();
}

function searchProduct(value){
    newTableProduct = '';
    for(let i=0;i<dataProduct.length;i++){
        if(searchMood == 'title'){
            if(dataProduct[i].Title.includes(value.toLowerCase())){
                newTableProduct += `  <tr>
                                        <td>${i+1}</td>
                                        <td>${dataProduct[i].Title}</td>
                                        <td>${dataProduct[i].Price}</td>
                                        <td>${dataProduct[i].Taxes}</td>
                                        <td>${dataProduct[i].Ads}</td>
                                        <td>${dataProduct[i].Discount}</td>
                                        <td>${dataProduct[i].Total}</td>
                                        <td>${dataProduct[i].Category}</td>
                                        <td><button onclick='updateProduct(${i})' id="update">Update</button></td>
                                        <td><button onclick='deleteProduct(${i})' id="delete">Delete</button></td>
                                    </tr>`                 
            }
        }
        else{
            if(dataProduct[i].Category.includes(value.toLowerCase())){
                    newTableProduct += `  <tr>
                                            <td>${i+1}</td>
                                            <td>${dataProduct[i].Title}</td>
                                            <td>${dataProduct[i].Price}</td>
                                            <td>${dataProduct[i].Taxes}</td>
                                            <td>${dataProduct[i].Ads}</td>
                                            <td>${dataProduct[i].Discount}</td>
                                            <td>${dataProduct[i].Total}</td>
                                            <td>${dataProduct[i].Category}</td>
                                            <td><button onclick='updateProduct(${i})' id="update">Update</button></td>
                                            <td><button onclick='deleteProduct(${i})' id="delete">Delete</button></td>
                                        </tr>`                 
            }
        }
    }
    
    document.getElementById('tbody').innerHTML = newTableProduct;
}