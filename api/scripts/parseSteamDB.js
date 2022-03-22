(function () {
    let page = 1
    const items = []

    const intervalId = setInterval(() => {
        const link = document.querySelector(`[data-i="${page}"]`)

        if (!link) {
            console.log(items)
            clearInterval(intervalId)
            return
        }

        link.click()

        console.log(page)

        setTimeout(() => {
            const itemEls = document.querySelectorAll('.economy-item')

            itemEls.forEach((itemEl) => {
                const rawItemData = getItemData(itemEl)
                const normalizedItemData = normalizeItemData(rawItemData)

                if (!isValidItem(normalizedItemData)) {
                    return
                }

                items.push(normalizedItemData)
            })

            page++
        }, 200)
    }, 500)

    function isValidItem ({ type, slot, isTradable }) {
        return ['cosmetic', 'icon'].includes(type) ||
            (type === 'consumable' && ['ingredient', 'recipe'].includes(slot) && isTradable)
    }

    function getItemData (itemEl) {
        const itemNameEl = itemEl.querySelector('.economy-item-name')
        const itemIdEl = itemEl.querySelector('.muted')
        const itemDescriptionEl = itemEl.querySelector('.economy-item-description')
        const itemImgEl = itemEl.querySelector('.economy-item-image img')
        const itemDataEls = itemEl.querySelectorAll('.app-json li')

        const itemData = {
            id: itemIdEl.textContent,
            name: itemNameEl.childNodes[0].textContent,
            description: itemDescriptionEl?.textContent || '',
            imgUrl: decodeURIComponent(itemImgEl.dataset.src)
        }

        itemDataEls.forEach(function (el) {
            const name = el.querySelector('i').textContent.trim().replaceAll(':', '')
            itemData[name] = el.querySelector('b').textContent.trim()
        })

        return itemData
    }

    function normalizeItemData (rawItemData) {
        const rarityTagValue = Object.values(rawItemData).find(value => String(value).startsWith('rarity:'))
        const characterTagValue = Object.values(rawItemData).find(value => String(value).startsWith('character:'))
        const eventTagValue = Object.values(rawItemData).find(value => String(value).startsWith('event:'))
        const typeTagValue = Object.values(rawItemData).find(value => String(value).startsWith('type:'))
        const normalizedData = {}

        normalizedData.itemId = Number.parseInt(rawItemData.id.replaceAll('#', ''))
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
        normalizedData.imgUrl = rawItemData.imgUrl

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
})()
