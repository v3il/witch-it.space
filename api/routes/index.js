const { Router } = require('express')
const { User } = require('../models')
const { errorsHandler } = require('./errorsHandler')

const rootRouter = Router()

rootRouter.get('/', async (req, res) => {
    // console.log(await User.create({}))

    const u = await User.findAll()

    console.log(u)
    res.send({ u })
})

module.exports = { rootRouter, errorsHandler }
