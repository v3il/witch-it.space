import log4js from 'log4js'

const logger = log4js.getLogger()

const logLevels = {
    test: 'fatal',
    production: 'info',
    development: 'debug'
}

logger.level = logLevels[process.env.NODE_ENV || 'development'] || 'fatal'

export { logger }
