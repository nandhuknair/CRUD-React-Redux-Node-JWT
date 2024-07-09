const express = require("express");
const router = express.Router();
const { adminLogin, adminDashBoard } = require("../controller/adminController");

router.post('/login',adminLogin)
router.get('/dashboard',adminDashBoard)

module.exports = router



