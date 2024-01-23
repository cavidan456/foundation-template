const navigationNav = document.querySelectorAll(".navigationNav")
const navbarDrop = document.getElementById("navbarDrop")
const myToogleBtn = document.getElementById("myToogleBtn")

function dropdownMenu() {
    if (navbarDrop.className == "navbarDropdown") {
        navbarDrop.className = ""
    } else {
        navbarDrop.className = "navbarDropdown"
    }
}

myToogleBtn.addEventListener("click", dropdownMenu)


// form validation

const price = document.getElementById("price")
const title = document.getElementById("title")
const description = document.getElementById("description")
const form = document.querySelector("form")

function postForm(event) {
    event.preventDefault()
    if (price.value > 0) {
        axios.post(`https://655dd2b79f1e1093c599f093.mockapi.io/products`, {
            price: price.value,
            title: title.value,
            description: description.value
        })
            .then(res => {
                console.log(res);
                form.reset()
                getData()
            })
    } else {
        alert("mehsulun qiymeti 0 dan boyuk olmalidir")
    }

}

form.addEventListener("submit", postForm)


const tableRow = document.getElementById("tableRow")

function getData() {
    axios.get(`https://655dd2b79f1e1093c599f093.mockapi.io/products`)
    .then(res => {
        const data = res.data
        db = data
        tableRow.innerHTML = ``
            db.forEach(item => {
                let row = document.createElement("tr")
                row.innerHTML = `
            <td>${item.title}</td>
            <td>$${item.price}</td>
            <button onclick="deleteRow(${item.id})">Sil</button>`
            tableRow.appendChild(row)
            });
        })
}

getData()

// delete crud method 
// TABLE DELETE

function deleteRow(id) {
    axios.delete(`https://655dd2b79f1e1093c599f093.mockapi.io/products/${id}`)
    .then((res)=>{
        console.log(res);
        getData()
    })
}

// sort (Default,A-Z,Z-A)

const sortBtnA = document.getElementById("sortBtnA")
const sortBtnZ = document.getElementById("sortBtnZ")
const sortBtnDefault =document.getElementById("sortBtnDefault")

sortBtnDefault.addEventListener("click" , getData)

function sortAz() {
    axios.get(`https://655dd2b79f1e1093c599f093.mockapi.io/products`)
    .then(res => {
        const data = res.data
        let db = data.sort((a,b)=>{
            if (a.title < b.title) {
                return -1
            }
            return 0
        })
        tableRow.innerHTML = ``
            db.forEach(item => {
                let row = document.createElement("tr")
                row.innerHTML = `
            <td>${item.title}</td>
            <td>$${item.price}</td>
            <button onclick="deleteRow(${item.id})">Sil</button>`
            tableRow.appendChild(row)
            });
        })
}

sortBtnA.addEventListener("click" ,sortAz)


function sortZa() {
    axios.get(`https://655dd2b79f1e1093c599f093.mockapi.io/products`)
    .then(res => {
        const data = res.data
        let db = data.sort((a,b)=>{
            if (a.title > b.title) {
                return -1
            }
            return 0
        })
        tableRow.innerHTML = ``
            db.forEach(item => {
                let row = document.createElement("tr")
                row.innerHTML = `
            <td>${item.title}</td>
            <td>$${item.price}</td>
            <button onclick="deleteRow(${item.id})">Sil</button>`
            tableRow.appendChild(row)
            });
        })
}

sortBtnZ.addEventListener("click" , sortZa)

// search by name

const searchInp = document.getElementById("searchInp")
const searchBtn = document.getElementById("searchBtn")

function searchName() {
    axios.get(`https://655dd2b79f1e1093c599f093.mockapi.io/products/?title=${searchInp.value}`)
    .then(res => {
        const data = res.data
        db = data
        tableRow.innerHTML = ``
            db.forEach(item => {
                let row = document.createElement("tr")
                row.innerHTML = `
            <td>${item.title}</td>
            <td>$${item.price}</td>
            <button onclick="deleteRow(${item.id})">Sil</button>`
            tableRow.appendChild(row)
            });
        })
}

searchBtn.addEventListener("click" , searchName)