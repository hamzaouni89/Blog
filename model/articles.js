var mongoose = require('mongoose')
var articleSchema = new mongoose.Schema({
  titre: String,
  contenue: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 

}) 
module.exports=mongoose.model('Article',articleSchema)