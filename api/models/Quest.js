import { BaseModel } from './BaseModel'

export class Quest extends BaseModel {
    static get tableName () {
        return 'quests'
    }
}
