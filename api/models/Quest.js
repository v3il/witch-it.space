const initQuestModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'Quest',
        {
            questTask: DataTypes.STRING,
            questType: DataTypes.STRING,
            globalId: DataTypes.INTEGER,
            localId: DataTypes.INTEGER,
            rewardId: DataTypes.INTEGER,
            rewardCount: DataTypes.INTEGER,
            objective: DataTypes.INTEGER,
            progress: DataTypes.INTEGER
        },
        {}
    )
}

export { initQuestModel }
