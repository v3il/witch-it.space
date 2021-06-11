import { Item, sequelize } from '../../models/index'
import { capitalizePhrase } from '../../util/capitalizePhrase'
import { items } from './items'

export const updateItems = async () => {
    for (const item of items) {
        try {
            await processItem(item)
            console.log(`Item "${item.name}" successfully processed`)
        } catch (e) {
            console.error(`Item "${item.name}" processing failed: `, e.message)
        }
    }

    await sequelize.close()
}

async function processItem (item) {
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
