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
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    db = cart
    db.map((item,index ) => {
        let box = document.createElement("div")
        box.className = "col-12 col-lg-4 col-xl-4 mb-4"
        box.innerHTML = `
        <div class="product-cart">
        <img src="${item.image}" alt="${item.title}">
        <h5>${item.title}</h5>
        <p>$${item.price}</p>
        <p>Count: ${item.count || 1} eded</p>
        <p>${item.description}</p>
        <button onclick="removeCart(${index})">Delete Cart</button>
        <button onclick="addWishlist(${item.id})">Add Wishlist</button>
        </div>`
        product.appendChild(box)
       });
}

getProduct()

function removeCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    cart.splice(index , 1)
    localStorage.setItem("cart" , JSON.stringify(cart))
    getProduct()
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