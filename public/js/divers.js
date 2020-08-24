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
  if(document.queryCommandState("italic")){
  btn_on(document.getElementById("button_italic"));
  }else{
    btn_off(document.getElementById("button_italic"));
  }
  if(document.queryCommandState("underline")){
  btn_on(document.getElementById("button_underline"));
  }else{
    btn_off(document.getElementById("button_underline"));
  }
}

function visible(){
  document.getElementById("buttons").style.visibility= "visible";
}

function resultat() {
	document.getElementById("resultat").value = document.getElementById("editeur").innerHTML;
}
