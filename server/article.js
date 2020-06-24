const express = require('express');
const router = express.Router();
const db = require('./db.js');
const passport = require('passport');
module.exports = router;

router.post('/createArticle', async function (req, res){
  console.log("L'article crée "+req.body.title);
  await db.createArticle(req.body);
  res.send('success');
});

async function f(){
let articles = await db.getAllArticles();
console.log('Les articles :'+articles);
};
f();
