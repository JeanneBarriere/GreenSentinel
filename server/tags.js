const express = require('express');
const router = express.Router();
const db = require('./db.js');
const passport = require('passport');
module.exports = router;

// router.post('/createTags', async function (req, res){
//   console.log("Tags crée "+req.body.list);
//   await db.createTags(req.body);
//   res.send('success');
// });

router.post('/updateTags', async function (req, res){
  await db.updateTags(req.body);
  res.send('success');
});

router.post('/deleteTags', async function (req, res){
  await db.deleteTags(req.body);
  res.send('success');
});

async function listTags(){
let tags = await db.getTags();
console.log('Les tags :'+tags);
};
listTags();
