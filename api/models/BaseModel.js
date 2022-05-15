import { Model } from 'objection'
import { knexInstance } from '../knex/knex.js'

Model.knex(knexInstance)

export class BaseModel extends Model {
    $beforeInsert () {
        this.createdAt = new Date().toISOString()
    }

    $beforeUpdate () {
        this.updatedAt = new Date().toISOString()
    }
}
