var mongoose = require('mongoose')
var articleSchema = new mongoose.Schema({
  titre: String,
  contenue: String,
  ArticleImage: String,
  date: String,
  type: {
    type: String,
    enum: ['Sport', 'News', 'Technology', 'Bisness', 'Fashion', 'Food', 'Culture'],
    default: 'News'
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

})
module.exports = mongoose.model('Article', articleSchema)