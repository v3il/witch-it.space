import { Router } from 'express'

import { authRouter } from './auth'
import { errorsHandler } from './errorsHandler'
// import swaggerRouter from './swagger';
// import usersRouter from './users';
// import filtersRouter from './filters';
// import placesRouter from './places';
// import reviewsRouter from './reviews';

const rootRouter = Router()

rootRouter.use('/auth', authRouter)
// router.use('/api-docs', swaggerRouter);
// router.use('/user', usersRouter);
// router.use('/filters', filtersRouter);
// router.use('/places', placesRouter);
// router.use('/reviews', reviewsRouter);

export { rootRouter, errorsHandler }

// const { Router } = require('express')
// const { User } = require('../models')
// const { errorsHandler } = require('./errorsHandler')
//
// const rootRouter = Router()
//
// rootRouter.get('/', async (req, res) => {
//     // console.log(await User.create({}))
//
//     const u = await User.findAll()
//
//     console.log(u)
//     res.send({ u })
// })
//
// module.exports = { rootRouter, errorsHandler }
