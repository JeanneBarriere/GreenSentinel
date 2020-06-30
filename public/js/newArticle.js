var form = document.querySelector("form");
var submit = document.getElementById("submit");

// Affiche de toutes les données saisies ou choisies
form.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();
  for(var i=0; i<form.elements.length;i++){
    if(document.getElementById("editeur").value=="" || form.title.value=="" || form.tags.value==""){alert("remplissez le formulaire");return ;}
  }
  var tags = form.elements.tags.value;
  var list = form.elements.tags.value;
  submit.type = "button";
  var title = form.elements.title.value;
  var resume = form.elements.resume.value;
  var author = "user.mail";
  var body = document.getElementById("editeur").innerHTML;
  ajax.post('/createArticle',
    {tags,title,author,body,resume},
    function(response){
      alert ('Merci pour cet article, il sera vérifié puis prochainement mise en ligne')
      //document.location.href="/index";
    },
    function(){
      alert('erreur');
    }
  );
  ajax.post('/updateTags',
    {list},
    function(response){
      document.location.href="/index";
    },
    function(){
      alert('erreur tags');
    }
  );
  document.location.href="/Index"
});

var a = document.getElementById("tags");
a.addEventListener('keyup',addthis);

function addthis() {
    b = a.value.replace('#','');
    a.value = '#'+b

    if (a.value.indexOf(' '))
    {
    a.value = a.value.replace(' ','#');
    }
}
