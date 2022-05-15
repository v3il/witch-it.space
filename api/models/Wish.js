import { BaseModel } from './BaseModel'

export class Wish extends BaseModel {
    static get tableName () {
        return 'wishes'
    }
}
