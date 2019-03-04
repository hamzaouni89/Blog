var express = require('express')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var User = require('../model/users')
var router = express.Router()



const JWT_SIGN_SECRET = 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2'


router.post('/register', function (req, res) {
    
    var nom = req.body.nom
    var prenom = req.body.prenom
    var password = req.body.password
    var email = req.body.email
    var role = req.body.role
    
    if (nom == null || password == null || email == null || prenom == null || role == null ) {
        res.status(400).send({
            'error': 'missing  parametres'
        });
    }
    User.findOne({
        attributes: ['email'],
        where: {
            email: email
        }
    })
        .then(function (userfound) {
            if (!userfound) {
                bcrypt.hash(password, 10, function (err, bcryptedPassword) {
                    var newUser = User.create({
                        
                        email: email,
                        nom: nom,
                        prenom: prenom,
                        role: role,
                        password: bcryptedPassword
                    })
                        .then(function (newUser) {
                            res.status(201).send({
                                '_id': newUser._id
                            })
                        })
                        .catch(function (err) {
                            res.status(500).send({
                                'error': 'cannot add user'
                            })
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
                    },
                        JWT_SIGN_SECRET, {
                            expiresIn: '1h'
                        });
                    res.status(200).send({
                        Message : 'authentification valide',
                        token : token
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

module.exports = router;