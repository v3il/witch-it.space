import { Model } from 'objection'
import { knexInstance } from '../knex/knex.js'

Model.knex(knexInstance)

export class BaseModel extends Model {}
