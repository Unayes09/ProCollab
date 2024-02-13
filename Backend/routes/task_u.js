const express = require('express')
const router = express.Router();
const authController = require('../controllers/task_u')

router.post('/login',authController.Login)

router.post('/register',authController.Register)

router.post('/forget',authController.ForgetPassword)

router.put('/changePass',authController.changePassword)

router.post('/createProject',authController.createProject)

router.delete('/delete',authController.deleteProject)

router.post('/like',authController.Like)

router.post('/dislike',authController.DisLike)

router.post('/feedback',authController.Feedback)

module.exports=router