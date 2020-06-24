const express = require('express');
const router = express.Router();
const db = require('./db.js');
const passport = require('passport');
module.exports = router;

router.post('/createTags', async function (req, res){
  console.log("Tags crée "+req.body.list);
  await db.createTags(req.body);
  res.send('success');
});
