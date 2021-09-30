import Vue from 'vue'
import { ru, ua, en } from '../shared/translations'

export default function ({ store }) {
    const locale = store.state.locale.locale
    const storages = {
        ru,
        ua,
        en
    }

    const $t = (textId, replacements = []) => {
        const idsParts = textId.split('.')
        const lastIdPart = idsParts.pop() || ''

        let storage = storages[locale]

        // eslint-disable-next-line no-restricted-syntax
        for (const idPart of idsParts) {
            const innerStorage = storage[idPart]

            if (!(innerStorage && typeof innerStorage === 'object')) {
                return `No text with id: ${textId}`
            }

            storage = innerStorage
        }

        let text = storage[lastIdPart]

        if (!text) {
            return `No text with id: ${textId}`
        }

        replacements.forEach((replacement) => {
            text = text.replace('%s', replacement)
        })

        return text
    }

    Vue.mixin({
        methods: { $t }
    })
}
