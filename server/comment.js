const express = require('express');
const router = express.Router();
const db = require('./db.js');
const passport = require('passport');
module.exports = router;

router.post('/createComment', async function (req, res){
  console.log("Commentaire crée "+req.body.body);
  await db.createComment(req.body);
  res.send('success');
});

router.post('/getCommentArticle', async function (req, res){
  await db.getCommentArticle(req.body);
  res.send('success');
});
