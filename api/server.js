const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { i18n } = require('./interceptors')
const { errorsHandler, rootRouter } = require('./routes')

require('./models')
require('express-async-errors')

const initServer = () => {
    const app = express()

    app.use(cors())
    app.use(cookieParser())
    app.use(bodyParser.json())

    app.use('', i18n, rootRouter)
    app.use(errorsHandler)

    return app
}

module.exports = { initServer }
