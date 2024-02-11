const express = require('express')
const router = express.Router();
const authController = require('../controllers/apis_u')

router.get('/token', authController.findToken)

module.exports=router