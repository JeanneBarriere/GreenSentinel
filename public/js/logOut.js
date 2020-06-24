var logOut = document.getElementById("logout");

logout.addEventListener("click", async function (e) {
    await ajax.get('/logout', {},
    function(response){
      alert('Vous êtes déconnecté(e)');
      document.location.href="/index";
    },
  function(err){
    alert('Impossible de se déconnecter');
    console.log(err);
  });
  });
