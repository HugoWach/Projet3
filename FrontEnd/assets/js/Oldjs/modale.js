
function init(){

}

init();


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  console.log(arrayworks)
  
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



fetch('http://localhost:5678/api/works')
    .then(response => {
        response.json()
        .then(data => {
            let gallery = document.querySelector(".travaux");
            const edit_button = document.getElementById("edit-button");
            let deleteWork = document.createElement("button");

            let write = ''
            gallery.innerHTML = write
            data.forEach(figure => {
               
                write += `<div id="work-${figure.id}"> 
                <figure class="modalImage" categoryId="${figure.categoryId}">
				<img src="${figure.imageUrl}" alt="${figure.title}">
				<figcaption>${figure.title}</figcaption>
        <button class="btnDelete" onClick="deleteWork(${figure.id})" id="${figure.id}"> Delete </button>
			  </figure>
        </div>`;

            arrayworks.push(figure)
            
                
          })
          write += '<button class="AddBtn"> Ajouter une photo </button>'
          gallery.innerHTML = write
          

      });
  });

  function deleteWork(id){
    const user=JSON.parse(localStorage.getItem("user"))
    fetch(`http://localhost:5678/api/works/${id}`, {
              method: "DELETE",
              headers: {
              "content-type": "application/json",
              accept: "application/json",
              'Authorization': `Bearer ${user.token}`,
              }
            }).then(figure => {
            const item = document.getElementById(`work-${id}`)
            item.remove()
            })
  }