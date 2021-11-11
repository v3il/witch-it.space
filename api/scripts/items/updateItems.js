import { Item } from '../../models/index'
import { capitalizePhrase } from '../../util/capitalizePhrase'
import { items } from './items'

export const updateItems = async () => {
    for (const item of items) {
        try {
            await processItem(item)
            console.log(`Item "${item.name}" successfully processed`)
        } catch (e) {
            console.log(`Item "${item.name}" processing failed: `, e.message)
        }
    }
}

async function processItem (item) {
    // id: 900,
    //     name: 'Fingernails',
    //     description: 'This Ingredient is used to craft common Items',
    //     backgroundColor: '292929',
    //     dateCreated: '2019-10-27T15:47:21.000Z',
    //     iconUrl: 'https://www.witchit.com/Images/T_FingernailIconBG.png',
    //     itemQuality: '5',
    //     itemSlot: 'Ingredient',
    //     marketable: false,
    //     nameColor: '7c7c7c',
    //     quantity: 0,
    //     tradeable: true,
    //     type: 'item',
    //     tagRarity: 'common',
    //     tagCharacter: null,
    //     tagSlot: 'ingredient',
    //     tagType: 'consumable',
    //     tagEvent: null,
    //     new: false

    // id: {
    //     type: DataTypes.INTEGER,
    //         primaryKey: true
    // },
    //
    // name: DataTypes.STRING,
    //     description: DataTypes.STRING,
    //     createdTimestamp: DataTypes.INTEGER,
    //     previewUrl: DataTypes.STRING,
    //     quality: DataTypes.INTEGER,
    //     rarity: DataTypes.STRING,
    //     character: DataTypes.STRING,
    //     slot: DataTypes.STRING,
    //     type: DataTypes.STRING,
    //     event: DataTypes.STRING,
    //     isTradeable: DataTypes.BOOLEAN

    // console.log(item.tradeable)

    const itemData = {
        name: item.name,
        description: item.description ? capitalizePhrase(item.description) : null,
        createdTimestamp: Math.floor(Date.parse(item.dateCreated) / 1000),
        previewUrl: item.iconUrl,
        quality: item.itemQuality,
        rarity: item.tagRarity,
        character: item.tagCharacter,
        slot: item.tagSlot,
        type: item.tagType,
        event: item.tagEvent,
        isTradeable: item.tradeable
    }

    const itemInDb = await Item.findOne({
        where: {
            id: item.id
        }
    })

    if (itemInDb) {
        return itemInDb.update(itemData)
    }

    return Item.create({
        ...itemData,
        id: item.id
    })
}
