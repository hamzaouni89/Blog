var express = require('express')
var router = express.Router();
var multer = require('multer');
var authenJornaliste = require('./auth').authenJornaliste;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }

});

const upload = multer({
    storage: storage,
});

const Article = require('../model/articles')

router.post('/upload', upload.single("ArticleImage"), function (req, res, next) {
})
router.get('/getImage/:name', function (req, res, next) {
    res.sendFile('C:/Users/houni/OneDrive/Bureau/Formation/Niveau4/Exercice3/uploads/' + req.params.name);
})
router.post('/addArticle', authenJornaliste, function (req, res, next) {
    console.log(req.body);
    var article = new Article({
        date: new Date(),
        titre: req.body.titre,
        contenue: req.body.contenue,
        ArticleImage: req.body.ArticleImage,
        type: req.body.type,
        owner: req.body.owner
    });
    console.log(req.body)
    article.save(function (err, article) {
        if (err) {
            res.send(err)
        } else {
            res.send(article)
        }
    })
})
router.get('/getArticle', authenJornaliste, function (req, res, next) {
    Article.find().populate('owner').exec(function (err, articles) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(articles)
        }
    })
})

router.get('/getArticles/:idUser', authenJornaliste, function (req, res, next) {
    var id = req.params.id
    Article.findById(id).exec(function (err, article) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(article)
        }
    })
})


router.get('/deletearticle/:id', authenJornaliste, function (req, res, next) {
    var id = req.params.id

    Article.findByIdAndRemove(id).exec(function (err, article) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(article)
        }
    })
})

router.post('/updatearticle/:id', authenJornaliste, function (req, res, next) {
    console.log(req.body)
    var id = req.params.id
    var titre = req.body.titre
    var contenue = req.body.contenue
    var ArticleImage = req.body.ArticleImage
    var type = req.body.type
    Article.findByIdAndUpdate({ "_id": id }, { $set: { titre: titre, contenue: contenue, type: type, ArticleImage: ArticleImage, date: new Date(), } }).exec(function (err, article) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(article)
        }
    })
})
module.exports = router;