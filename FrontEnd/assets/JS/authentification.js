//Constantes principales à utiliser danbs le code
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const messageError = document.querySelector(".error")
const form = document.querySelector("form")


function connexion () {
//Code à écouter lors du click au boutton soumettre ou de l'activation de la touche entrée
form.addEventListener("submit", (e) => {
//Pour éviter le rechargement de la page lors de l'écoute
e.preventDefault()
//constantes de la valeur de l'email et du mot de passe
const userEmail = emailInput.value
const userPassword = passwordInput.value
//Constante des valeurs ci-dessus assemblées
let dataUser = {
    email: userEmail,
    password: userPassword
}
//Appel à l'API des id de connexion
fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(dataUser)
    })
//Condition en cas d'erreur de connexion
.then ((response) => {
    if (!response.ok) {
        throw Error (messageError.textContent = "Erreur dans l’identifiant ou le mot de passe")
    }
        return response.json()
    })
//Récupération des tokens
    .then((data) => {
        window.localStorage.setItem("token", data.token)
//Condition en cas de réussite de connexion
        window.location.assign('./index.html')
    })
//Message d'erreur dans la console, si celle-ci est vraie
    .catch((error) => {
        console.error("Error : " + error.message)
    })
})
}
connexion()