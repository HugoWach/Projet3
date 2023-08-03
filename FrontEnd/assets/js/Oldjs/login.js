const loginButton = document.getElementById("loginButton")
const formulaireLogin = document.getElementById("formulaireLogin")
const errorLogin = document.getElementById("errorLogin")

loginButton.addEventListener("click", async function(e) {
    e.preventDefault()
    let user = {
      email: formulaireLogin.email.value,
      password: formulaireLogin.password.value
    };
   // console.log(user)
    try{
        let response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });
      // console.log(response.json())
      // response.json().then(data => {console.log(data)})
      if(response.status == 404){
        errorLogin.textContent = "Login ou mot de passe incorrecte"
      }else if(response.status == 200){
        // Sauvegarder le token d'authentification et le UserId et le stocker dans le local storage.
        response.json().then(function(result){
          
          localStorage.setItem("user", JSON.stringify(result))
        })
        window.location.href = "./index.html"
      }else{
        errorLogin.textContent = "Une erreur s'est produite"
      }
        
    }catch(error){
      errorLogin.textContent = "Login ou mot de passe incorrect"
    }
    
  })

    

 // window.location.href = "/Portfolio-architecte-sophie-bluel-master/FrontEnd/index.html";
/*
let user = {
    name: 'Hugo',
    password: 'test'
  };
  
  fetch('http://localhost:5678/api/users/login')
    .then((response) => {
        response.json()
            .then(data => {
                method: 'POST'
                headers: {
                'Content-Type'; 'application/json;charset=utf-8'
                }
                body: JSON.stringify(user)
                
            });
    })

  
  let result = await response.json();
  alert(result.message);

  // localStorage.setItem("token");


  window.location.href = "file:///Users/hugowachalski/Documents/Projet%203/Portfolio-architecte-sophie-bluel-master/FrontEnd/login.html";
*/