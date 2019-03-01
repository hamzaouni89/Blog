var jwt = require('jsonwebtoken')

module.exports.authenticate = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.userData = jwt.verify(token, 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2')
        next()
    }

    catch (error) {

        res.status(401).send({
            message: "Auth failed"
        })


    }





}