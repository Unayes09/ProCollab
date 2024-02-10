const express = require('express')
const router = express.Router();
const authController = require('../controllers/apis_u')

router.get('/ok',authController.getString)

module.exports=router