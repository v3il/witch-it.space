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
// eslint-disable-next-line require-await
rootRouter.get('/', async (req, res) => {
    console.log(User.model)

    const u = await User.model.findAll()

    console.log(u)
    res.send({ u })
})

module.exports = { rootRouter, errorsHandler }
