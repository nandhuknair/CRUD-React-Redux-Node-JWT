const express = require('express')
const { login, signUp } = require('../controller/userController')
const router = express.Router()
const upload = require('../multer/multer')

router.get('/login',login)
router.post('/signup',upload.single('profileImage'),signUp)

module.exports = router
