import { BaseModel } from './BaseModel'

export class User extends BaseModel {
    static get tableName () {
        return 'users'
    }

    getPublicData () {
        const { password, ...publicData } = this
        return publicData
    }
}
