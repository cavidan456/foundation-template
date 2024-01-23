const navigationNav = document.querySelectorAll(".navigationNav")
const navbarDrop = document.getElementById("navbarDrop")
const myToogleBtn = document.getElementById("myToogleBtn")

function dropdownMenu() {
    if(navbarDrop.className == "navbarDropdown"){
        navbarDrop.className = ""
    }else{
        navbarDrop.className = "navbarDropdown"
    }
}

myToogleBtn.addEventListener("click" , dropdownMenu)


// product sec javascript code


const product = document.getElementById("product")

let limit = 6

page = 1

async function getProduct() {
   const res = await axios.get(`https://655dd2b79f1e1093c599f093.mockapi.io/products/?page=${page}&limit=${limit}`)
   const data = res.data
   db = data
   db.forEach(item => {
    let box = document.createElement("div")
    box.className = "col-12 col-lg-4 col-xl-4 mb-4"
    box.innerHTML = `
    <div class="product-cart">
    <img src="${item.image}" alt="${item.title}">
    <h5>${item.title}</h5>
    <p>$${item.price}</p>
    <p>${item.description}</p>
    <button onclick="addBasket(${item.id})">Add Basket</button>
    <button onclick="addWishlist(${item.id})">Add Wishlist</button>
    </div>`
    product.appendChild(box)
   });
}

getProduct()

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

function addWishlist(id) {
    let list =  JSON.parse(localStorage.getItem("list")) || []
    productItem = list.find(item=>item.id == id)
    if (productItem) {
        alert("Bu mehsul artiq sevimliler sehifesine elave olunub")
    }else{
        list.push(db.find(item=>item.id == id))
    }
    localStorage.setItem("list" , JSON.stringify(list))
}