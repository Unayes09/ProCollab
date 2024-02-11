const express = require('express')
const router = express.Router();
const authController = require('../controllers/task_u')

router.post('/login',authController.Login)

router.post('/register',authController.Register)

router.post('/forget',authController.ForgetPassword)

module.exports=router