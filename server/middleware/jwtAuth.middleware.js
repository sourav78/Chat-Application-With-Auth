const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = (req.cookies && req.cookies.token) || null

    if(!token){
        return res.status(400).json({
            success: false,
            msg: "Not authorizedddd"
        })
    }

    try {
        
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.messae
        })
    }

    next()
}

module.exports = verifyToken    