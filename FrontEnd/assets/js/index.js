async function init() {

    let AllInfoWorks = await GetAllInfoWorks();
    this.AllInfoWorks = AllInfoWorks;
    DisplayAllInfo(AllInfoWorks);

    let AllInfoCategories = await GetAllInfoCategories();

    DisplayAllInfoCategories(AllInfoCategories);

    FiltreCategories();
}

init();


function GetAllInfoWorks() {

    return fetch('http://localhost:5678/api/works')
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);
        })

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

function DisplayAllInfo(AllinfoWorks) {

    let gallery = document.querySelector(".gallery");
    gallery.innerHTML = " ";
    for (const info of AllinfoWorks) {
        gallery.insertAdjacentHTML("beforeend",
            `
        <figure>
			<img src="${info.imageUrl}" alt="${info.title}">
			<figcaption>${info.title}</figcaption>
		</figure>
        `)
    }
};

function DisplayAllInfoCategories(AllInfoCategories) {

    let filtreul = document.querySelector(".filtresul");

    for (const info of AllInfoCategories) {
        filtreul.insertAdjacentHTML("beforeend",
            `
            <li id="${info.id}">
                <button class="button" id="${info.id}">${info.name}</button>
            </li>
            `)
    }

};

function FiltreCategories() {
    let filtre = document.querySelectorAll(".filtresul > li")

    filtre.forEach(elementLi => {
        elementLi.addEventListener("click", (event) => {

            if (event.target.id == "tous") {
                DisplayAllInfo(AllInfoWorks)
            } else {
                let newarray = AllInfoWorks.filter(filtre => filtre.categoryId == event.target.id)
                DisplayAllInfo(newarray)
            }

        })
    })

}