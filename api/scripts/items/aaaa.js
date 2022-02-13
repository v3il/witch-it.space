import axios from 'axios'
import * as cheerio from 'cheerio'

(async function () {
    try {
        const response = await axios('https://steamdb.info/api/RenderAppSection/?section=items&appid=559650', {
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

        const html = response.data
        const $ = cheerio.load(html)
        const itemEls = $('.economy-item')

        console.log(getItemData($, itemEls[500]), normalizeItemData(getItemData($, itemEls[500])))

        //     .then(r => r.data).then((html) => {
        //     const $ = cheerio.load(html)
        //     const f = $('.economy-item')[500]
        //
        //     const type = $('.app-json li', f).each(function () {
        //         const value = $('b', this).text().trim()
        //         const name = $('i', this).text().trim()
        //
        //         console.log(name, value)
        //
        //         // return $('i:first-child', this).text().trim() === 'type:'
        //     }).find('b').text().trim()
        //
        //     // f.find('.economy-item-name')
        //
        //     const title = $('.economy-item-name', f)
        //
        //     // console.log(f.find('.economy-item-name'))
        //     console.log(title.text())
        // })

        // console.log(r)
    } catch (e) {
        console.log(e)
    }
})()

//     createdTimestamp: DataTypes.INTEGER,

function getItemData ($, itemEl) {
    const itemNameEl = $('.economy-item-name', itemEl)
    const itemIdEl = $('.muted', itemNameEl)
    const itemDescriptionEl = $('.economy-item-description', itemEl)
    const itemDataEls = $('.app-json li', itemEl)

    const itemData = {
        id: itemIdEl.text(),
        name: itemNameEl.contents().first().text(),
        description: itemDescriptionEl.text()
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
    const normalizedData = {}

    normalizedData.id = Number.parseInt(rawItemData.id.replaceAll('#', ''))
    normalizedData.name = rawItemData.name.replaceAll('\n', '')
    normalizedData.description = rawItemData.description
    normalizedData.quality = Number.parseInt(rawItemData.item_quality)
    normalizedData.rarity = rarityTagValue.split(':')[1]
    normalizedData.character = characterTagValue?.split(':')[1] ?? null
    normalizedData.slot = rawItemData.item_slot.toLowerCase()
    normalizedData.type = rawItemData.type
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
