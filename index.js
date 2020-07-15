const express = require('express');
const hbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const session = require('express-session');
const app = express();
const db = require('./server/db');
const moment = require('moment');
const passport = require('passport');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(session({ secret: 'keyboard cat',resave:true,saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./server/users'));
app.use('/', require('./server/article'));
app.use('/', require('./server/passport'));
app.use('/', require('./server/tags'));


const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'default',
  helpers: {formatDate: function (date, format) {
            var mmnt = moment(date);
            return mmnt.format(format);
          }
  },
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  layoutsDir: __dirname + '/views/',
}));
app.set('view engine', 'hbs');

app.get('/connectUser',async function (req, res, next){
    passport.authenticate('local', function(err, user, info) {
      console.log('user :',user);
      if(err || !user){
        console.log(err);
        return next(err);
      }
      req.logIn(user, function(err){
        if(err){
          console.log(err);
          res.sendStatus(400)
        }else{

          res.redirect('/index');
        }
      });
    })(req, res, next);
  });

app.get('/profil', async function (req, res) {
  let listArticles = await db.getUserArticles(req.user.mail);
  let data = {
    title: 'GreenSentinel - Profil',
    user:req.user,
    listArticles : listArticles
  }
  res.render('profil.hbs',data);
});

app.get('', function (req, res) {
  let data = {
    title: 'GreenSentinel - Accueil',
    user:req.user,
  }
  res.render('index.hbs', data);
});


app.get('/confirmedRegistration', function (req, res) {
  let data = {
    title: 'GreenSentinel - Nouvelle inscription',
    user:req.user,
  }
  res.render('confirmedRegistration.hbs', data);
});

app.get('/index', function (req, res) {
  let data = {
    title: 'GreenSentinel - Accueil',
    user:req.user,
  }
  res.render('index.hbs', data);
});

app.get('/articlesTest', function (req, res) {
  let data = {
    title: 'GreenSentinel - ArticleTest',
    user:req.user,
  }
  res.render('article.hbs', data);
});

app.get('/signUp', function (req, res) {
  let data = {
    title: 'GreenSentinel - Inscription',
    user:req.user,
  }
  res.render('signUp.hbs', data);
});

app.get('/LogIn', function (req, res) {
  let data = {
    title: 'GreenSentinel - Connexion',
    user:req.user,
  }
  res.render('logIn.hbs', data);
});

app.get('/newArticle', function (req, res) {
  let data = {
    title: 'GreenSentinel - Nouvel article',
    user:req.user,
  }
  res.render('newArticle.hbs', data);
});

app.get('/listing/:type/', async function (req, res) {

  let listingArray = db.getListTags();

  let page = 1;
  let type = req.params.type;
  let article = await db.getRecipes(page, 3, type);

  if (listingArray.indexOf(req.params.type) == -1) {

    let data = {
      title: 'GreenSentinel - Accueil',
      user: req.user,
    }

    res.render('index.hbs', data);

  } else {

    //Solution pas très élégante, autre manière de faire ?
    type = req.params.type.charAt(0).toUpperCase() + req.params.type.substring(1);

    let data = {
      title: "GreenSentinel - "+type,
      user: req.user,
      type,
      page,
      article
    }
    res.render('listing.hbs', data);
  }
});

app.get('/listing/:type/:page', async function (req, res) {

  let listingArray = ['tartes', 'cookies', 'chocolat', 'glaces', 'macarons', 'entremets', 'cupcakes', 'biscuits', 'smoothies'];

  let page = req.params.page;
  let type = req.params.type;
  let article = await db.getRecipes(page, 3, type);

  console.log("Page: "+page);
  console.log("Recipes: "+article);

  if (listingArray.indexOf(req.params.type) == -1) {

    let data = {
      title: 'GreenSentinel - Accueil',
      user: req.user,
    }

    res.render('index.hbs', data);

  } else {

    let data = {
      title: "GreenSentinel - "+type,
      user: req.user,
      type,
      page,
      article
    }
    res.render('listing.hbs', data);
  }
});

app.get('/tags', async function (req, res) {
  let listTags = await db.getListTags();
  let data = {
    title: 'Nos articles par tags',
    user:req.user,
    listTags: listTags
  }
  res.render('tags_list.hbs', data);
});

app.get('/tags/:type', async function (req, res) {
  let type = req.params.type;
  console.log(type);
  //let listArticles = await db.getOneArticle('COUOCU');
  let listArticles = await db.getTagsArticles(type);
  let data = {
    title: 'Tags : '+type,
    type: type,
    user:req.user,
    listArticles: listArticles
  }
  res.render('tags.hbs', data);
});

app.get('/article/:type', async function (req, res) {
  let type = req.params.type;
  console.log(type);
  let article = await db.getOneArticle(type);
  let data = {
    title: type,
    type: type,
    user:req.user,
    article: article
  }
  res.render('article.hbs', data);
});

app.get('/*', function (req, res) {
  res.sendStatus(404);
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
