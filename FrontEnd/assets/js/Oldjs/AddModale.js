// Get the modal
var AddModal = document.getElementById("myAddModal");

// Get the button that opens the modal
var AddBtn = document.getElementById("myAddBtn");

// Get the <span> element that closes the modal
var AddSpan = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

AddBtn.onclick = function() {
  AddModal.style.display = "block";
  console.log(arrayworks)
  
}

// When the user clicks on <span> (x), close the modal
AddSpan.onclick = function() {
  AddModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == AddModal) {
    AddModal.style.display = "none";
  }
}

function addWork(id){
    const user=JSON.parse(localStorage.getItem("user"))
    var AddImg = document.createElement("Image")
    var title = document.createElement("Title");
    var categorie = document.createElement("Categorie")
    title.type = "text";
    categorie.type = "text";
    AddImg.type ="file"; 


    fetch(`http://localhost:5678/api/works/${id}`, {
              method: "POST",
              headers: {
              "content-type": "application/json",
              accept: "application/json",
              'Authorization': `Bearer ${user.token}`,
              }
            }).then(figure => {
            const item = document.getElementById(`work-${id}`)
            item.add()
            })
  }

