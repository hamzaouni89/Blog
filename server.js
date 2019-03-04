var express = require('express')
var passport = require('passport');
var app = express()
var db = require('./database/db')
var users = require('./api/ApiUser')
//var articles = require('./api/ApiArticle')
//var commentaire = require('./api/ApiCom')

var cors = require('cors');
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use('/users', users)
app.use('/article', articles)
//app.use('/commentaire', commentaire)

app.listen(3000, (err => {
  if (err) throw err;
  console.log('server is running on port 3000')
}))