var mongoose = require('mongoose')
var commentaireSchema = new mongoose.Schema({
  contenue: String,
  Nom: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ,
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' } ,
  date : String,
}) 
module.exports=mongoose.model('Commentaire',commentaireSchema)