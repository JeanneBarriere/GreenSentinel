function deleteArticle(title) {
  if(confirm("Attention, la suppresion d'un article est définitive")){
    ajax.post('/deleteArticle',
      {title},
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

function hideArticle(title) {
  ajax.post('/hideArticle',
    {title},
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

function visibleArticle(title) {
  ajax.post('/visibleArticle',
    {title},
    function(response){
    },
  );
  document.location.href="/profil"
};

function removeUser(mail) {
  ajax.post('/removeUser',
    {mail},
    function(response){
    },
  );
  document.location.href="/index"
};
