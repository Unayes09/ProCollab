const express = require('express')
const router = express.Router();
const authController = require('../controllers/task_u')

router.post('/login',authController.Login)

module.exports=router