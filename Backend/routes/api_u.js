const express = require('express')
const router = express.Router();
const authController = require('../controllers/apis_u')

router.get('/token', authController.findToken)

router.get('/projects',authController.allProjects)

router.get('/verify',authController.verify)

router.get('/resource',authController.Resource)

router.get('/search',authController.Search)

module.exports=router