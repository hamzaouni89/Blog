var mongoose = require('mongoose')
var commentaireSchema = new mongoose.Schema({
  contenue: String,
  Nom: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ,
  Article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' } 

}) 
module.exports=mongoose.model('Commentaire',commentaireSchema)