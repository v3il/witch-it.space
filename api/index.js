import path from 'path'
import moduleAlias from 'module-alias'
import { initServer } from './server'

moduleAlias.addAliases({
    '@': path.join(__dirname, '../')
})

module.exports = {
    path: '/api',
    handler: initServer()
}
