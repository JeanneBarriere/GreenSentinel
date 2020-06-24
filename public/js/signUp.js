var form = document.querySelector("form");
var submit = document.getElementById("submit");
console.log("Nombre de champs de saisie : " + form.elements.length); // Affiche 10
console.log(form.elements[0].name); // Affiche "pseudo" // Affiche "password"

// Affiche de toutes les données saisies ou choisies
form.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();
  for(var i=0; i<form.elements.length;i++){
    if(!(form.elements[6].value == form.elements[7].value)){alert('mots de passes différents!!!');
  return;}
    if(form.elements[i].value==""){alert("remplissez le formulaire");return ;}
  }
  submit.type = "button";
    console.log(form.elements);
    var firstName = form.elements.firstName.value;
    var lastName = form.elements.lastName.value;
    var pseudo = form.elements.pseudo.value;
    var password = form.elements.password1.value;
    var mail = form.elements.mail.value;
    var day = form.elements.day.value;
    var month = form.elements.month.value;
    ajax.post('/createUser',
    {firstName,lastName,pseudo,password,mail,day,month},
    function(response){
      document.location.href="/confirmedRegistration";
    },
    function(){
      alert('erreur');
    }
  )
    // document.location.href="/confirmedRegistration"
});
