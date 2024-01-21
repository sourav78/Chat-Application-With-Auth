const { Router } = require('express')
const { register, login, userChats } = require('../controller/user.controller')
const verifyToken = require('../middleware/jwtAuth.middleware')

const router = Router()

router.get("/", verifyToken, userChats)
router.post("/user/signup", register)
router.post("/user/signin", login)

module.exports = router