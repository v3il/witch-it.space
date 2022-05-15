import { BaseModel } from './BaseModel'

export class Price extends BaseModel {
    static get tableName () {
        return 'prices'
    }
}
