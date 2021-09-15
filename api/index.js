const { initServer } = require('./server')

module.exports = {
    path: '/api',
    handler: initServer()
}
