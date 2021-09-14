const { Router } = require('express')
const { User } = require('../models')
const { errorsHandler } = require('./errorsHandler')

const rootRouter = Router()

// Initialize Controller
// const { user } = require('../controllers/')

// Register
// router.post('/users/register', usersController.register)
//
// // Login
// router.post('/users/login', usersController.login)

// Get User
// rootRouter.get('/users/user', user.user)
rootRouter.get('/api/', async (req, res) => {
    const u = await User.model.findAll()

    console.log(u)
    res.send(u)
})

module.exports = { rootRouter, errorsHandler }
