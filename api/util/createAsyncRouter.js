import express from 'express'

const asyncHandler = fn => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next)
}

const methods = [
    'get',
    'post',
    'delete'
]

export const createAsyncRouter = () => {
    const router = express.Router()

    for (const key in router) {
        if (methods.includes(key)) {
            const method = router[key]
            router[key] = (path, ...callbacks) => method.call(router, path, ...callbacks.map(cb => asyncHandler(cb)))
        }
    }

    return router
}
