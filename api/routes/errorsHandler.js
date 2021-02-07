import { HttpErrorBase } from '@curveball/http-errors'
import { logger } from '../logger'

/* eslint-disable-next-line */
export const errorsHandler = (error, request, response, next) => {
    console.log(error)

    if (error instanceof HttpErrorBase) {
        logger.error(error.message, error.httpStatus)
        return response.status(error.httpStatus || 500).json({
            error: error.message || 'Server Error',
            logout: error.logout || false
        })
    }

    response.status(500).json({ error: 'Server Error' })
}
