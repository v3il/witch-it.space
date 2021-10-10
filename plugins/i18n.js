import Vue from 'vue'

export default function ({ store }) {
    const $t = (textId, replacements = []) => {
        const storage = store.getters['locale/lngSet']
        let text = storage[textId]

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
