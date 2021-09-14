// import http from 'http'
//
// import express from 'express'
// import cors from 'cors'
// import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser'

// import { Sequelize } from 'sequelize-typescript'
// import rootRouter from './routes'
// import errorsHandler from './routes/errorsHandler'
// const { i18n } = require('./routes')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { i18n } = require('./interceptors')
const { errorsHandler, rootRouter } = require('./routes')
// import connectToSequelize from './sequelize'
// import config from './config'
// import logger from './logger'

const { initSequelize } = require('./sequilize')

require('express-async-errors')

const initServer = async () => {
    const sequelize = await initSequelize()
    const app = express()

    app.use(cors())
    app.use(cookieParser())
    app.use(bodyParser.json())

    app.set('view engine', 'ejs')

    app.use('/', i18n, rootRouter)
    app.use(errorsHandler)

    // const server = app.listen(config.PORT, () => {
    //     logger.info(`Server successfully started at ${config.PORT}.`)
    // })
    //
    // if (config.NODE_ENV === 'production') {
    //     setupCron()
    // }

    return { app, sequelize }
}

module.exports = { initServer }
