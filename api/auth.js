


var jwt = require('jsonwebtoken')

module.exports.authentification = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.userData = jwt.verify(token, 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2')
        if (req.userData.role == "Jornaliste") {
            next()
        }
    } catch (error) {
        res.status(401).send({
            message: "Auth failed"
        })
    }
}

module.exports.authenJornaliste = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2')
        if (user.role == "Jornaliste") {
            console.log("auth done")
            next()
        }

    } catch (error) {
        res.status(401).send({
            message: "Auth failed"
        })
    }
}
module.exports.authenClient = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.userData = jwt.verify(token, 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2')
        if (req.userData.role == "Client") {
            next()
        }
    } catch (error) {

        res.status(401).send({
            message: "Auth failed"
        })
    }
} 