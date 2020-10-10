import { logger } from '../logger'

/* eslint-disable-next-line */
export const errorsHandler = (error, request, response, next) => {
    logger.error(error.message)
    response.status(error.httpStatus || 500).json({ error: error.message || 'Server Error' })
}
