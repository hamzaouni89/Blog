var mongoose = require('mongoose')
var valid = require('validator')


var userSchema = new mongoose.Schema({
  
  nom: { type: String,  Required: true },
  prenom: String,
  email: { 
    
    type: String,    
    Required:  true , trim : true , minlength: 1 , unique : true ,
    
    validate:{ validator :valid.isEmail, 
      message : '{VALUE} is not a valid email'
    }
  },
  role: {
    type: String,
    enum: ['Client', 'Jornaliste'],
    default: 'Client'
  },

password : { type: String , Required: true , minlength:8}, 

}) 
module.exports=mongoose.model('User',userSchema)