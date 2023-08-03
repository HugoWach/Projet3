init();

//Connexion au site admin
function fetchinfo(formData) {
    return fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
    })
        .then((result) => {
            return result;
        })
        .catch((error) => {
            console.log(error)
        })
}
function init() {
    document.getElementById("log").addEventListener("submit", async function (event) {
        event.preventDefault();

        let formData = {
            email: event.target[0].value,
            password: event.target[1].value
        };

        let resultats = await fetchinfo(formData);

        let token = await resultats.json();

        window.localStorage.setItem("token", token.token);

        if (resultats.status == 200) {
            document.getElementById("message").textContent = "Connexion réussie!";
            window.location.href = "../pages/admin.html";
        } else {
            document.getElementById("message").textContent = "Identifiants invalides. Veuillez réessayer.";
        }
    });

    document.getElementById("forgotPassword").addEventListener("click", function (event) {
        event.preventDefault();

        alert("Mot de passe oublié? Veuillez contacter l'administrateur du site.");
    });
}

