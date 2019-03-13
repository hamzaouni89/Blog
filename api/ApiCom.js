var express = require('express')
var router = express.Router();
var Commentaire = require('../model/commentaire')
var authenJornaliste = require('./auth').authenJornaliste;
var authenClient = require('./auth').authenClient;
var authentification = require('./auth').authentification;


router.post('/addCom', authentification, function (req, res, next) {
    console.log(req.body);
    
    var commentaire = new Commentaire({
        
        date : new Date(),
        contenue: req.body.contenue,
        article: req.body.article,
        Nom : req.body.owner
    });
    console.log(req.body)
    commentaire.save(function (err, commentaire) {
        if (err) {
            res.send(err)
        } else {
            console.log(commentaire);
            res.send(commentaire)
        }
    })
})
router.get('/getCom',authentification, function (req, res, next) {
    Commentaire.find().populate('Nom' ).populate('article').exec(function (err, commentaires) {
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
    Commentaire.findById(id).populate('Nom' ).populate('article').exec(function (err, commentaire) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(commentaire)
        }
    })
})

router.get('/deleteCom/:id', authentification, function (req, res, next) {
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



/* router.post('/updateCom/:id', function (req, res, next) {
       
    var type = req.body.type
    Commentaire.findByIdAndUpdate({ "_id": id }, { $set: { titre: req.params.id, contenue: req.body.contenue, idUser: req.body.idUser , idArticl: req.body.idArticle } }).exec(function (err, commentaire) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(commentaire)
        }
    })
}) */

module.exports = router;