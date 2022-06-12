import { Model } from 'objection'
import { BaseModel } from './BaseModel'
import { Price } from './Price'

export class Offer extends BaseModel {
    static get tableName () {
        return 'offers'
    }

    static relationMappings = {
        prices: {
            relation: Model.HasManyRelation,
            modelClass: Price,
            join: {
                from: 'offers.id',
                to: 'prices.offerId'
            }
        }
    };
}
