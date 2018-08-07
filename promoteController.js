var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var util = require('./util.js');
var service = require('./service.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.post('/promotepage', function(req,res){
  console.log('her');
  res.render('promote',{message: ''});
})
