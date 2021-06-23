import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Item, sequelize } from '../../models/index'
import { capitalizePhrase } from '../../util/capitalizePhrase'
import { axiosInstance } from '../../axios'
import { items } from './items'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const imagePath = path.join(__dirname, '../../../static/images/items')

if (!fs.existsSync(imagePath)) {
    fs.mkdirSync(imagePath)
}

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
        quality: item.itemQuality,
        rarity: item.tagRarity,
        character: item.tagCharacter,
        slot: item.tagSlot,
        type: item.tagType,
        event: item.tagEvent,
        isTradeable: item.tradeable
    }

    const response = await axiosInstance.get(item.iconUrl, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data, 'utf-8')

    await sharp(buffer)
        .resize(200)
        .sharpen()
        .webp()
        .toFile(path.join(imagePath, `${item.name}.webp`))

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
