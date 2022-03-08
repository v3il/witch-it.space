// import path from 'path'
// import { fileURLToPath } from 'url'
// import fs from 'fs'
import axios from 'axios'
import * as cheerio from 'cheerio'
import sharp from 'sharp'
import ImageKit from 'imagekit'
import { Item, sequelize } from '../models/index.js'
import { content } from './content'

const imagekit = new ImageKit({
    publicKey: 'public_gIyV+AwKgzNdUqvjfVAzge+lhIc=',
    privateKey: 'private_cvQeg/8h5qsuBHMn5zXFI7aGpWU=',
    urlEndpoint: 'https://ik.imagekit.io/igo1qzk1oe2z'
});

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// const imagePath = path.join(__dirname, '../../../static/images/items')

// if (!fs.existsSync(imagePath)) {
//     fs.mkdirSync(imagePath)
// }

(async function () {
    try {
        // const response = await loadItemsPage()
        const $ = cheerio.load(content)
        const itemEls = $('.economy-item')

        for (const itemEl of itemEls) {
            await processItem($, itemEl)
        }

        await sequelize.close()
    } catch (e) {
        console.error(e)
    }
})()

function loadItemsPage () {
    return axios('https://steamdb.info/api/RenderAppSection/?section=items&appid=559650', {
        headers: {
            authority: 'steamdb.info',
            accept: 'text/html',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest',
            cookie: '__cf_bm=H2BBHGaGB7ZkcpQLh8YnYZ4YO7qUO6t8CYB2Ui.vltc-1644673383-0-AVg63m6qer6xZJczsGXsP6bN3xjq5h5eTh+mg+md9e7rJ0pROfQLMnP7v3GM04HmpKfPfKF5C/0UPmGtuiE0lAU=; cf_chl_2=2123088fa221dd3; cf_chl_prog=x12; cf_clearance=6_cy7OhNA9z.OygBuoWxY1L4ULV.5YIWDiL.GOZL0pk-1644673399-0-150; __Host-steamdb=0%3B3590215%3Ba942c2a8525c7638cfd472ca5ab3bdd9f94ca53a',
            Referer: 'https://steamdb.info/app/559650/items/',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36'

        },
        body: null,
        method: 'GET'
    })
}

async function processItem ($, itemEl) {
    const rawItemData = getItemData($, itemEl)
    const normalizedItemData = normalizeItemData(rawItemData)

    if (!isValidItem(normalizedItemData)) {
        return console.warn(`Item "${normalizedItemData.name}" skipped`)
    }

    try {
        if (rawItemData.imgUrl) {
            await downloadImage(rawItemData.imgUrl, normalizedItemData.id)
        }

        await saveItem(normalizedItemData)

        console.log(`Item "${normalizedItemData.name}" successfully processed`)
    } catch (e) {
        console.error(`Item "${normalizedItemData.name}" processing failed: `, e.message)
    }
}

function isValidItem ({ type, slot, isTradable }) {
    return ['cosmetic', 'icon'].includes(type) ||
        (type === 'consumable' && ['ingredient', 'recipe'].includes(slot) && isTradable)
}

function getItemData ($, itemEl) {
    const itemNameEl = $('.economy-item-name', itemEl)
    const itemIdEl = $('.muted', itemNameEl)
    const itemDescriptionEl = $('.economy-item-description', itemEl)
    const itemImgEl = $('.economy-item-image img', itemEl)
    const itemDataEls = $('.app-json li', itemEl)

    const itemData = {
        id: itemIdEl.text(),
        name: itemNameEl.contents().first().text(),
        description: itemDescriptionEl.text(),
        imgUrl: decodeURIComponent(itemImgEl.attr('data-src'))
    }

    itemDataEls.each(function () {
        const name = $('i', this).text().trim().replaceAll(':', '')
        itemData[name] = $('b', this).text().trim()
    })

    return itemData
}

function normalizeItemData (rawItemData) {
    const rarityTagValue = Object.values(rawItemData).find(value => String(value).startsWith('rarity:'))
    const characterTagValue = Object.values(rawItemData).find(value => String(value).startsWith('character:'))
    const eventTagValue = Object.values(rawItemData).find(value => String(value).startsWith('event:'))
    const typeTagValue = Object.values(rawItemData).find(value => String(value).startsWith('type:'))
    const normalizedData = {}

    normalizedData.id = Number.parseInt(rawItemData.id.replaceAll('#', ''))
    normalizedData.name = rawItemData.name.replaceAll('\n', '')
    normalizedData.description = rawItemData.description
    normalizedData.quality = Number.parseInt(rawItemData.item_quality)
    normalizedData.rarity = rarityTagValue?.split(':')[1] ?? null
    normalizedData.character = characterTagValue?.split(':')[1] ?? null
    normalizedData.slot = rawItemData.item_slot?.toLowerCase() ?? null
    normalizedData.type = typeTagValue?.split(':')[1]
    normalizedData.event = eventTagValue?.split(':')[1] ?? null
    normalizedData.isTradable = rawItemData.tradable === 'true'
    normalizedData.createdDate = parseDate(rawItemData.date_created)

    return normalizedData
}

function parseDate (rawDate) {
    if (!rawDate) {
        return null
    }

    const matches = rawDate.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/)

    if (!matches) {
        return null
    }

    const date = new Date()
    date.setUTCFullYear(matches[1])
    date.setUTCMonth(matches[2])
    date.setUTCDate(matches[3])
    date.setUTCHours(matches[4])
    date.setUTCMinutes(matches[5])
    date.setUTCSeconds(matches[6])
    date.setUTCMilliseconds(0)
    return date
}

async function downloadImage (imgUrl, imageName) {
    const response = await axios.get(imgUrl, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data, 'utf-8')

    const imageBase64 = sharp(buffer)
        .resize(150)
        .sharpen()
        .toBuffer()
        .toString('base64')

    imagekit.upload({
        file: imageBase64,
        fileName: `${imageName}.webp`,
        folder: '/items',
        useUniqueFileName: false
    }).then((response) => {
        console.log(`${imageName}.webp uploaded`)
    }).catch((error) => {
        console.log(`${imageName}.webp not uploaded`, error)
    })
}

async function saveItem (normalizedItemData) {
    const { id, ...otherProps } = normalizedItemData

    const itemInDb = await Item.findOne({
        where: { id }
    })

    if (itemInDb) {
        return itemInDb.update(otherProps)
    }

    return Item.create(normalizedItemData)
}
