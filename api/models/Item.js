import { BaseModel } from './BaseModel'

export class Item extends BaseModel {
    static get tableName () {
        return 'items'
    }
}
