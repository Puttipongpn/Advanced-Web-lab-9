const jwt = require('jsonwebtoken')

const key = 'MY_KEY';

const authorization = ((req, res, next) => {
    const token = req.headers['authorization'];

    if (token === undefined) {
        return res.status(400).json({
            "status": 401,
            "message": 'not token'
        })
    }else{
        jwt.verify(token, key, (err, decode) =>{
            if (err) {
                return res.status(401).json({
                    "status": 400,
                    "message": 'verify fils'
                })
            }else{
                console.log(decode)
                next()
            }
        })
    }
})
module.exports = authorization