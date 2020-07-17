var form = document.querySelector("form");
var submit = document.getElementById("submit");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  e.stopPropagation();
  for(var i=0; i<form.elements.length;i++){
    if(document.getElementById("editeur").value=="" || form.title.value=="" || form.tags.value==""){alert("remplissez le formulaire");return ;}
  }
  submit.type = "button";
  var tags = form.elements.tags.value;
  var list = form.elements.tags.value;
  var title = form.elements.title.value;
  var resume = form.elements.resume.value;
  var author = authorPseudo;
  var body = document.getElementById("editeur").innerHTML;
  await ajax.post('/tryTitle',
    {title},
    async function(response){
      if(response=='true'){
        alert('Un autre article porte déjà ce titre');
        submit.type = "submit";
        return;
      }else{
        ajax.post('/createArticle',
          {tags,title,author,body,resume},
          function(response){
            alert ('Merci pour cet article ,'+author);
          },
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
      }
      document.location.href="/index"
    });
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
