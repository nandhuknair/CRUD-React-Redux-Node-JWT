const express = require('express')
const { login, signUp, home } = require('../controller/userController')
const router = express.Router()
const upload = require('../multer/multer')
 
router.post('/login',login)
router.post('/signup',upload.single('profileImage'),signUp)
router.get('/home',home)


module.exports = router
 