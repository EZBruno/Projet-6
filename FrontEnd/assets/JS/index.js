// Variables
const gallery = document.querySelector(".gallery")
const filters = document.querySelector("#portfolio .ul h3")

// Récupération du tableau works
async function recupWorks () {
    const rep = await fetch ("http://localhost:5678/api/works")
    return rep.json() 
}

// Création d'un work
function createWork (work) {
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const figcaption = document.createElement("figcaption")
    img.src = work.imageUrl
    figcaption.textContent = work.title
    figure.appendChild(img)
    figure.appendChild(figcaption)
    gallery.appendChild(figure)
}

// Affichage du Works
async function afficheWorks () {
    const arrayWorks = await recupWorks()
    arrayWorks.forEach((work) => {
        createWork(work)
    })
}
afficheWorks()

// Récupération du tableau categories
async function recupCat () {
    const rep = await fetch ("http://localhost:5678/api/categories")
    return rep.json() 
}

// Création et affichage des boutons dynamiquement
async function afficheBtn () {
    const arrayCat = await recupCat()
     arrayCat.forEach(element => {
         const btn = document.createElement("button")
         btn.textContent = element.name
         btn.id = element.id
         filters.appendChild(btn)
    } )
}
afficheBtn()

// Filtrage au clic des boutons de catégories
async function filterCat () {
    const arrayWorks = await recupWorks()
    const buttons = document.querySelectorAll("#portfolio .ul h3 button")
    buttons.forEach((button) => {
        button.addEventListener("click", (e)=>{
            //Activation des boutons filter
            buttons.forEach((btn) => {
            btn.classList.remove("btnactivate")
            btn.classList.remove("tousactivate")
            })
            button.classList.add("btnactivate")
            //récupération de l'id du bouton actif
            const buttonId = e.target.id
            gallery.innerHTML = ""
            if (buttonId !== "0") {
                const arrayWorksFilter = arrayWorks.filter((id)=>{
                    return id.categoryId == buttonId
                })
                arrayWorksFilter.forEach((work) => {
                    createWork(work)
                })
            } 
            else {
                afficheWorks()
            }
        })
    })
}

filterCat()

//Permet de ne pas avoir de page d'erreur lors du clic pour Contact
const contact = document.getElementById('contact')
contact.addEventListener('submit', (e) => {
    e.preventDefault()
    window.location.href = window.location.href
})