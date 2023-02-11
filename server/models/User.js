import { BaseModel } from './BaseModel'

export default class User extends BaseModel {
    static get tableName () {
        return 'users'
    }

    getPublicData () {
        const { password, ...publicData } = this
        return {
            ...publicData,
            hasLocalProfile: !!password,
            isVerified: !!publicData.steamId && !!publicData.steamTradeLink
        }
    }
}
