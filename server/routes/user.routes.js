const { Router } = require('express')
const { register, login, userChats, forgotPassword, logout } = require('../controller/user.controller')
const verifyToken = require('../middleware/jwtAuth.middleware')
const sendEmail = require('../controller/mail.controller')
const uploadProfilePicture = require('../controller/profileUpload.controllers')
const upload = require('../middleware/multer.middleware')

const router = Router()

router.get("/chats", verifyToken, userChats)
router.get("/logout", logout)

router.get("/send-email", sendEmail)

router.post("/profile/upload", upload.single("uploadImage"), uploadProfilePicture)

router.post("/user/signup", register)
router.post("/user/signin", login)
router.post("/user/forgot-password", forgotPassword)

module.exports = router