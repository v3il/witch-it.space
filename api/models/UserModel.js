class UserModel {
    constructor () {
        this._model = null
    }

    init (sequelize, DataTypes) {
        this._model = sequelize.define(
            'User',
            {
                login: DataTypes.STRING,
                password: DataTypes.STRING,
                token: DataTypes.STRING,
                rem: DataTypes.BOOLEAN
            },
            {}
        )
    }

    get model () {
        return this._model
    }
}

module.exports = { UserModel }
