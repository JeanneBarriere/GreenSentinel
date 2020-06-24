function connectforrecipe(){
  if(window.confirm("Vous n'êtes pas connecté !\n\nVoulez-vous vous connecter pour écrire une nouvelle recette ?")) {
  			document.location.href="/logIn";
      };
};

function commande(nom, argument) {
  if (typeof argument === 'undefined') {
    argument = '';
  }
  switch (nom) {
    case "createLink":
      argument = prompt("Quelle est l'adresse du lien ?");
      break;
    case "insertImage":
      argument = prompt("Quelle est l'adresse de l'image ?");
      break;
  }
  // Exécuter la commande
  document.execCommand(nom, false, argument);
}

function btn_on(obj){
    obj.className="button actif";
}

// Le curseur quitte la cellule
function btn_off(obj){
    obj.className="button";
}

function tester(){
if(document.queryCommandState("bold")){
btn_on(document.getElementById("button_bold"));
}else{
  btn_off(document.getElementById("button_bold"));
}
// Rajouter de même toutes les commandes à tester
}

function visible(){
  document.getElementById("buttons").style.visibility= "visible";
}

function resultat() {
	document.getElementById("resultat").value = document.getElementById("editeur").innerHTML;
}
