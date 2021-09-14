const { getLogger } = require('log4js')

const logger = getLogger()

const logLevels = {
    test: 'fatal',
    production: 'info',
    development: 'debug'
}

logger.level = logLevels[process.env.NODE_ENV || 'development'] || 'fatal'

module.exports = { logger }
