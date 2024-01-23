const navigationNav = document.querySelectorAll(".navigationNav")
const navbarDrop = document.getElementById("navbarDrop")
const myToogleBtn = document.getElementById("myToogleBtn")

function dropdownMenu() {
    if(navbarDrop.className == "navbarDropdown"){
        navbarDrop.className = " "
    }else{
        navbarDrop.className = "navbarDropdown"
    }
}

myToogleBtn.addEventListener("click" , dropdownMenu)



const product = document.getElementById("product")

function getProduct() {
    product.innerHTML = ``
    let list =  JSON.parse(localStorage.getItem("list")) || []
    db = list
    db.map((item,index ) => {
        let box = document.createElement("div")
        box.className = "col-12 col-lg-4 col-xl-4 mb-4"
        box.innerHTML = `
        <div class="product-cart">
        <img src="${item.image}" alt="${item.title}">
        <h5>${item.title}</h5>
        <p>$${item.price}</p>
        <p>${item.description}</p>
    <button onclick="addBasket(${item.id})">Add Basket</button>
        <button onclick="removeCart(${index})">Delete Cart</button>
        </div>`
        product.appendChild(box)
       });
}

getProduct()

function removeCart(index) {
    let list =  JSON.parse(localStorage.getItem("list")) || []
    list.splice(index , 1)
    localStorage.setItem("list" , JSON.stringify(list))
    getProduct()
}


function addBasket(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    productItem = cart.find(item => item.id == id)
    if (productItem) {
        productItem.count = (productItem.count || 1) + 1
    }else{
        cart.push(db.find(item=>item.id == id))
    }
    localStorage.setItem("cart" , JSON.stringify(cart))
}