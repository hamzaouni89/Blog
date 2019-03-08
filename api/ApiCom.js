var express = require('express')
var router = express.Router();


router.get('/getCom', function (req, res, next) {
    Commentaire.find(function (err, commentaires) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(commentaires)
        }
    })
})

router.get('/getCom/:id', function (req, res, next) {
    var id = req.params.id
    Commentaire.findById(id).exec(function (err, commentaires) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(commentaires)
        }
    })
})

router.get('/deleteCom/:id', function (req, res, next) {
    var id = req.params.id

    Commentaire.findByIdAndRemove(id).exec(function (err, commentaire) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(commentaire)
        }
    })
})

router.post('/updateCom/:id', function (req, res, next) {
       
    var type = req.body.type
    Commentaire.findByIdAndUpdate({ "_id": id }, { $set: { titre: req.params.id, contenue: req.body.contenue, idUser: req.body.idUser , idArticl: req.body.idArticle } }).exec(function (err, commentaire) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(commentaire)
        }
    })
})

module.exports = router;