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

router.post('/deleteArticle', async function (req, res){
  await db.deleteArticle(req.body);
  console.log("L'article suprimé "+req.body.title);
  res.send('success');
});

router.post('/hideArticle', async function (req, res){
  await db.hideArticle(req.body);
  res.send('success');
});

router.post('/visibleArticle', async function (req, res){
  await db.visibleArticle(req.body);
  res.send('success');
});

async function f(){
let articles = await db.getAllArticles();
console.log('Les articles :'+articles);
};
//f();
