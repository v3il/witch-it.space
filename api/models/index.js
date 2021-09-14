const { UserModel } = require('./UserModel')

const User = new UserModel()

const initModels = (sequelize, DataTypes) => {
    User.init(sequelize, DataTypes)
}

module.exports = { initModels, User }
