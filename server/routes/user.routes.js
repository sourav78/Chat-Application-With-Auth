const { Router } = require('express')
const { register, login, userChats, forgotPassword, logout } = require('../controller/user.controller')
const verifyToken = require('../middleware/jwtAuth.middleware')

const router = Router()

router.get("/chats", verifyToken, userChats)
router.get("/logout", logout)
router.post("/user/signup", register)
router.post("/user/signin", login)
router.post("/user/forgot-password", forgotPassword)

module.exports = router