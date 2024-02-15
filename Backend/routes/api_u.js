const express = require('express')
const router = express.Router();
const authController = require('../controllers/apis_u')

router.get('/token', authController.findToken)

router.get('/projects',authController.allProjects)

router.get('/verify/:token',authController.verify)

router.get('/resource',authController.Resource)

router.get('/search',authController.Search)

router.get('/username',authController.User)

router.get('/channels',authController.allChannels)

router.get('/user',authController.getUser)

router.get('/channelSearch',authController.ChannelSearch)

router.get('/userChannel',authController.userChannel)

module.exports=router