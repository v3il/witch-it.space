import { initServer } from './server'

module.exports = {
    path: '/api',
    handler: initServer()
}
