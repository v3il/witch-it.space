import { config } from '../../shared'

const initItemModel = (sequelize, DataTypes) => {
    // id: 5089,
    //     name: "Recipe: Witch Hunter's Coat",
    //     description: 'Needed Ingredients: 3x Mandrake, 1x Troll Eyes',
    //     backgroundColor: '292929',
    //     dateCreated: '2019-10-27T15:48:15.000Z',
    //     iconUrl: 'https://www.witchit.com/Images/HunterUpperBodyWitchhunterR.png',
    //     itemQuality: '8',
    //     itemSlot: 'Recipe',
    //     marketable: false,
    //     nameColor: '1472ff',
    //     quantity: 0,
    //     tradeable: true,
    //     type: 'item',
    //     tagRarity: 'veryrare',
    //     tagCharacter: 'hunter',
    //     tagSlot: 'recipe',
    //     tagType: 'consumable',
    //     tagEvent: 'halloween2018',
    //     new: false

    return sequelize.define(
        'Item',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },

            name: DataTypes.STRING,
            description: DataTypes.STRING,
            createdTimestamp: DataTypes.INTEGER,
            previewUrl: DataTypes.STRING,
            quality: DataTypes.INTEGER,
            rarity: DataTypes.STRING,
            character: DataTypes.STRING,
            slot: DataTypes.STRING,
            type: DataTypes.STRING,
            event: DataTypes.STRING,
            isTradeable: DataTypes.BOOLEAN
        },
        {}
    )
}

export { initItemModel }
