var mongoose = require('mongoose')
var userSchema = new mongoose.Schema({
  
  nom: String,
  prenom: String,
  email: {
    type:String,
    unique: true
  }, 
  role: {
    type: String,
    enum: ['Client', 'Jornaliste'],
    default: 'Client'
  },

password : String , 

}) 
module.exports=mongoose.model('User',userSchema)