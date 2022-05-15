import { Model } from 'objection'
import { knexInstance } from '../knex/knex.js'

Model.knex(knexInstance)

export class BaseModel extends Model {
    $beforeInsert () {
        if ('createdAt' in this) {
            this.createdAt = new Date().toISOString()
        }
    }

    $beforeUpdate () {
        if ('updatedAt' in this) {
            this.updatedAt = new Date().toISOString()
        }
    }
}
