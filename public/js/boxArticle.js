function deleteArticle(_id) {
  if(confirm("Attention, la suppression d'un article est définitive, voulez-vous continuer ?")){
    ajax.post('/deleteArticle',
      {_id},
      function(response){
      },
    );
    ajax.post('/deleteTags',
      {},
      function(response){
      },
    );
    document.location.href="/profil"
  }
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
  if(confirm("Attention, la suppression de votre compte est définitive, toutes vos données seront supprimées.")){
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
