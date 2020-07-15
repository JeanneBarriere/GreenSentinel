var form = document.querySelector("form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  e.stopPropagation();
    var password = form.elements.password.value;
    var mail = form.elements.mail.value;

    await ajax.get('/connectUser',
      {password,mail},
      function(response){
        document.location.href="/profil";
      },
    function(){
      alert('Les identifiants ne correspondent pas à un compte existant');
      document.location.href="/logIn";
    }
  )
})
