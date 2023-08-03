// Ne pas oublier de faire un NPM start dans le dossier Backend, pour demarrer le serveur 

// const e = require("express");

let response = fetch('http://localhost:5678/api/works');
const url = 'http://localhost:5678/api/works'
let site = '';
let arrayworks = [];

/* fetch('http://localhost:5678/api/works')
    .then(response => {
        response.json()
        .then(data => {
            let gallery = document.querySelector(".gallery");
            let write = ''
            data.forEach(figure => {
                console.log(figure)
                write += `<figure categoryId="${figure.categoryId}">
				<img src="${figure.imageUrl}" alt="${figure.title}">
				<figcaption>${figure.title}</figcaption>
			</figure>`;
            
            arrayworks.push(figure)


            })
            gallery.innerHTML = write

        });
    });
    */

fetch('http://localhost:5678/api/categories')
    .then((response) =>{
        response.json()
        .then(data => {
            let ul = document.createElement('ul')


            let portfolioh2 = document.querySelector("#portfolio h2")
            portfolioh2.insertAdjacentElement('afterend', ul)
            let tous = document.createElement('li')
            tous.setAttribute("onclick", "filtre(0)")
            tous.innerHTML = 'Tous'
            ul.appendChild(tous)
            data.forEach(categories =>{
                let li = document.createElement('li')
                li.innerHTML = categories.name
                li.setAttribute("id",categories.id)
                li.setAttribute("onclick", "filtre("+categories.id+")")
                ul.appendChild(li)
            })

       //    document.querySelector('#portfolio ul').addEventListener('click', filtre(e))

        })

    })

const filtre = function(id){
    fetch('http://localhost:5678/api/works')
    .then(response => {
        response.json()
        .then(data => {
            let gallery = document.querySelector(".gallery");
            let write = ''
            gallery.innerHTML = write
            data.forEach(figure => {
                if(figure.categoryId == id){                
                write += `<figure categoryId="${figure.categoryId}">
				<img src="${figure.imageUrl}" alt="${figure.title}">
				<figcaption>${figure.title}</figcaption>
			</figure>`;
            
            arrayworks.push(figure)
            
                }
                if(id == 0){
                    write += `<figure categoryId="${figure.categoryId}">
				<img src="${figure.imageUrl}" alt="${figure.title}">
				<figcaption>${figure.title}</figcaption>
			    </figure>`;
            
                arrayworks.push(figure)
                    
                }

            })
            gallery.innerHTML = write

        });
    });

};
filtre(0)

hidebutton("myBtn")

function hidebutton(btnId){
    const user = JSON.parse(localStorage.getItem("user"))
    if (user != null && user.token != null){
        document.getElementById(btnId).hidden = false
    }
    else {
        document.getElementById(btnId).hidden = true
    }


}