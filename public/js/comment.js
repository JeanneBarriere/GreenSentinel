var form = document.querySelector("form");
var submit = document.getElementById("submit");

document.addEventListener('DOMContentLoaded', async function () {
  console.log(submit);
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    e.stopPropagation();
    for(var i=0; i<form.elements.length;i++){
      if(document.getElementById("editeurComment").value==""){alert("Le commentaire est vide");return ;}
    }
    submit.type = "button";
    var author = authorPseudo;
    var article = id;
    var body = document.getElementById("editeurComment").innerHTML;
    await ajax.post('/createComment',
      {author, body, article},
      function(response){
        alert ('Merci pour ce commentaire ,'+author);
        document.location.href='/article/'+id;
      });
    });
});

function deleteComment(_id) {
  if(confirm("Attention, la suppression d'un commentaire est définitive, voulez-vous continuer ?")){
    ajax.post('/deleteComment',
      {_id},
      function(response){
      },
    );
    ajax.post('/deleteTags',
      {},
      function(response){
      },
    );
    document.location.reload();
  }
};
