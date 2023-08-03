async function init() {

    ifconnectedornot();
    let AllInfoWorks = await GetAllInfoWorks();
    DisplayAllInfo(AllInfoWorks);
    eventmodal();

    let AllInfoCategories = await GetAllInfoCategories()

    DisplayAllInfoCategories(AllInfoCategories)
    console.log(AllInfoCategories)

    WorksAdd()

}

init()

function ifconnectedornot() {
    if (localStorage.getItem("token")) {
        console.log("utilisateur connecté")
    } else {
        document.location.href = "../index.html";
    }
}

function eventmodal() {

    const modale1 = document.querySelector(".modale")
    const btnmodale = document.getElementById("modale1")
    const btnmodale2 = document.getElementById("modale2")
    const btnmodale3 = document.getElementById("modale3")
    const modalback = document.querySelector(".modalback");
    const gostep1 = document.getElementById("retourstep1");
    const gostep2 = document.querySelector(".AddPhoto");
    const btnfermermodale = document.getElementById("fermermodale");
    const step1 = document.querySelector(".step1");
    const step2 = document.querySelector(".step2");

    btnmodale.addEventListener("click", (e) => {
        e.preventDefault();
        modale1.style.display = "block";
        modalback.style.display = "block";
    })

    btnmodale2.addEventListener("click", (e) => {
        e.preventDefault();
        modale1.style.display = "block";
        modalback.style.display = "block";
    })

    btnmodale3.addEventListener("click", (e) => {
        e.preventDefault();
        modale1.style.display = "block";
        modalback.style.display = "block";
    })

    modalback.addEventListener("click", function () {
        modale1.style.display = "none";
        modalback.style.display = "none";
        step2.style.display = "none";
        step1.style.display = "block";
    });

    btnfermermodale.addEventListener("click", function () {
        modale1.style.display = "none";
        modalback.style.display = "none";
        step2.style.display = "none";
        step1.style.display = "block";
    });

    gostep2.addEventListener("click", function () {
        step1.style.display = "none";
        step2.style.display = "block";
    });

    gostep1.addEventListener("click", function () {
        step2.style.display = "none";
        step1.style.display = "block";
    });
}

function GetAllInfoWorks() {

    return fetch('http://localhost:5678/api/works')
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);
        })

};

function DisplayAllInfo(AllinfoWorks) {
    let gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    let galleryModale = document.querySelector(".gallery-modale");
    galleryModale.innerHTML = "";
    for (const info of AllinfoWorks) {
        gallery.insertAdjacentHTML("beforeend",
            `
            <figure>
				<img src="${info.imageUrl}" alt="${info.title}">
				<figcaption>${info.title}</figcaption>
			</figure>
        `
        );
        galleryModale.insertAdjacentHTML("beforeend",
            `
        <figure class="figure">
            <img src="${info.imageUrl}" alt="${info.title}">
            <i class="trash fa-solid fa-trash-can" onclick="DeleteWorks(event, ${info.id})"></i>
            <span class="editer">éditer</span>
        </figure>
            `
        );
    }
};

const loadFile = function (event) {
    document.querySelector(".uploadImage").classList.add("previewImage");

    document.querySelector("#output").innerHTML = "<img src='" + URL.createObjectURL(event.target.files[0]) + "' alt='image' width='100%'>";

    let imagesend = document.querySelector("#ImageSend").files[0];
    this.imagesend = imagesend;
};

function GetAllInfoCategories() {

    return fetch('http://localhost:5678/api/categories')
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);
        })

};

function DisplayAllInfoCategories(AllInfoCategories) {

    let categorie = document.querySelector(".categorieselect");

    for (const info of AllInfoCategories) {
        categorie.insertAdjacentHTML("beforeend",
            `
            <option value="${info.id}">
            ${info.name}
            </option>
            `
        );
    }

};

function WorksAdd() {

    document.querySelector("#AddWork").addEventListener('click', async function (e) {

        e.preventDefault();

        let title = e.target.form[0].value;
        let image = document.querySelector("#ImageSend").files[0];
        let categoryId = e.target.form[1].value;
        let token = window.localStorage.getItem("token");

        if (!title || !image || !categoryId) {
            document.getElementById("errormodal").innerText = "Veuillez renseigner les bonnes valeurs";
            return false;
        }

        var formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("category", categoryId);

        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + token,
            },
        })

        if (response.status === 201) {
            console.log("La figure est ajouté")
            init()
        }
    })

}

function DeleteWorks(e, id) {

    e.preventDefault();

    let token = window.localStorage.getItem("token");
    let figure = e.target.closest(".figure");
    fetch("http://localhost:5678/api/works/" + id, {
        method: 'DELETE',
        headers: {
            "Accept": "*/*",
            "Authorization": 'Bearer ' + token,
        }
    }).then(response => {
        if (response) {
            figure.remove();
        } else {
            console.log("error")
        }
    })



}

function clearlocal() {
    localStorage.clear();
}