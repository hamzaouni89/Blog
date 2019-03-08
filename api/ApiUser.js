var express = require('express')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var User = require('../model/users')

var router = express.Router()



const JWT_SIGN_SECRET = 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2'


router.post('/register', function (req, res) {
    User.findOne({
        email: req.body.email
    })
        .then(function (userfound) {
            if (!userfound) {
                bcrypt.hash(req.body.password, 10, function (err, bcryptedPassword) {
                    var newUser = new User({
                        email: req.body.email,
                        nom: req.body.lastname,
                        prenom: req.body.firstname,
                        role: req.body.role,
                        password: bcryptedPassword
                    });
                    newUser.save().then(function (newUser) {
                        res.status(201).send({
                            '_id': newUser._id
                        })
                    })
                        .catch(function (err) {
                            res.status(500).send(err)

                        })
                })

            } else {
                res.status(409).send({
                    'error': 'user already exsit'
                })
            }

        })
        .catch(function (err) {
            res.status(500).send({
                'error': 'unable to verify user'
            })
        });
})



router.post('/login', function (req, res) {


    var password = req.body.password
    var email = req.body.email
    if (password == null || email == null) {
        res.status(400).send({
            'error': 'missing parametres'
        })
    }
    User.findOne({ "email": email }).exec(function (err, userfound) {
        if (userfound) {
            bcrypt.compare(password, userfound.password, function (err, resBycrypt) {
                if (resBycrypt) {

                    const token = jwt.sign({
                        '_id': userfound._id,
                        'email': userfound.email,
                        'username': userfound.username,
                        'role': userfound.role
                    },
                        JWT_SIGN_SECRET, {
                            expiresIn: '1h'
                        });
                    res.status(200).send({
                        Message: 'authentification valide',
                        token: token
                    })

                } else {
                    res.status(403).send({
                        'error': 'invalid password'
                    })
                }

            });
        } else {
            res.status(404).send({
                'error': 'user not exist in DB'
            })
        }

    })

});

router.get('/logout', function (req, res) {
    req.logOut()
    req.session.destroy()

})

router.post('/addArticle/:id', function (req, res, next) {

    Article.updateOne({
        "_id": req.params.id
    }, {
            $set: {
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
            }
        }).exec(function (err, user) {
            if (err) {
                res.send(err)
            } else {
                res.send(user)
            }
        })
})


router.get('/addArticles/:idUser/:idArticle', function (req, res, next) {



    User.updateOne({
        "_id": req.params.idUser
    }, {
            $push: {
                articless: req.params.idArticle
            }
        }).exec(function (err, user) {
            if (err) {
                res.send(err)
            } else {
                res.send(user)
            }
        })
})
module.exports = router;