const initUserModel = (sequelize, DataTypes) => {
    return sequelize.define(
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

module.exports = { initUserModel }
