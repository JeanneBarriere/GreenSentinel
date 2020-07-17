const express = require('express');
const router = express.Router();
const db = require('./db.js');
const passport = require('passport');
module.exports = router;

router.post('/createUser', async function (req, res){
  console.log("utilisateur créé"+req.body.firstName);
  await db.createUser(req.body);
  res.send('success');
});

router.post('/removeUser', async function (req, res){
  await db.removeUser(req.body);
  res.send('success');
});

router.post('/tryPseudo', async function (req, res){
    res.send(await db.pseudo(req.body))
});

router.post('/tryMail', async function (req, res){
    res.send(await db.mail(req.body))
});

/// Sers à voir et suprimer utilisateur
async function f(){
//await db.removeUser('5ddd0f393995776be0000ef9');
let users = await db.getUsers();
console.log('Les utilisateurs :'+users);
};
//f();


router.get('/logout', function(req, res){
    req.logout();
    res.sendStatus(200);
});
