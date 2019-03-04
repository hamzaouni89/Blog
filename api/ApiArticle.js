var express = require('express')
var router = express.Router();
var multer = require('multer')
// var upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }

});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const Article = require('../model/articles')

// var authenticate = require('./auth').authenticate;

router.post('/addArticle', upload.single('ArticleImage'), function (req, res, next) {
    console.log(req.file);
    var article = new Article({
        titre: req.body.titre,
        contenue: req.body.contenue,
        ArticleImage: req.file.path,
        type: req.body.type
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
router.get('/getArticle', function (req, res, next) {
    Article.find(function (err, articles) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(articles)
        }
    })
})

router.get('/getArticles/:id', function (req, res, next) {
    var id = req.params.id
    Todo.findById(id).exec(function (err, article) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(article)
        }
    })
})


router.get('/deletearticle/:id', function (req, res, next) {
    var id = req.params.id

    Todo.findByIdAndRemove(id).exec(function (err, article) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(article)
        }
    })
})

router.post('/updatearticle/:id', function (req, res, next) {
    var id = req.params.id
    var titre = req.body.titre
    var contenue = req.body.contenue

    Todo.findByIdAndUpdate({ "_id": id }, { $set: { titre: titre, contenue: contenue } }).exec(function (err, article) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(article)
        }
    })
})

module.exports = router;