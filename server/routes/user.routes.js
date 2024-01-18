const { Router } = require('express')
const { register, login, userChats } = require('../controller/user.controller')

const router = Router()

router.post("/signup", register)
router.post("/signin", login)
router.post("/user-chats", userChats)

module.exports = router