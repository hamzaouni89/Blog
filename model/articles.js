var mongoose = require('mongoose')
var articleSchema = new mongoose.Schema({
  titre: String,
  contenue: String,
  ArticleImage: String,
  type: {
    type: String,
    enum: ['Sport', 'News', 'Technology', 'Bisness', 'Fashion', 'Food', 'Culture'],
    default: 'News'
  },
  IdUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

})
module.exports = mongoose.model('Article', articleSchema)