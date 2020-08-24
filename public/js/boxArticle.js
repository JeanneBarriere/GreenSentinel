function deleteArticle(_title) {
  if(confirm("Attention, la suppresion d'un article est définitive")){
    ajax.post('/deleteArticle',
      {_title},
      function(response){
        alert ('Merci pour cet article, il sera vérifié puis prochainement mise en ligne');
      },
    );
    ajax.post('/deleteTags',
      {},
      function(response){
        //document.location.href="/index";
      },
    );
    document.location.href="/profil"
  }else{}
};

function hideArticle(_id) {
  ajax.post('/hideArticle',
    {_id},
    function(response){
    },
  );
  ajax.post('/deleteTags',
    {},
    function(response){
      //document.location.href="/index";
    },
  );
  document.location.href="/profil"
};

function visibleArticle(_id) {
  ajax.post('/visibleArticle',
    {_id},
    function(response){
    },
  );
  document.location.href="/profil"
};

async function removeUser(mail) {
  if(confirm("Attention, la suppresion de votre est définitive, toutes vos données seront supprimées.")){
    await ajax.get('/logout', {},
      function(response){
      },
      function(err){
      console.log(err);
      });
    ajax.post('/removeUser',
      {mail},
      function(response){
        alert('Votre compte a bien été suprimé.')
      },
    );
  document.location.href="/index"
  }
};
