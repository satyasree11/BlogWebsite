const express = require('express')
const { getAllUsers, registerControllers, loginControllers } = require('../controllers/userController')


const router =express.Router()

router.get('/all-users',getAllUsers)
router.post('/register',registerControllers)
router.post('/login',loginControllers)



module.exports =router