import Vue from 'vue'
import { getTranslation } from '@/shared'

export default function ({ store }) {
    const $t = (textId, replacements = []) => {
        const lngSet = store.getters['locale/lngSet']
        return getTranslation(lngSet, textId, replacements)
    }

    Vue.prototype.$eventBus = new Vue()

    Vue.mixin({
        methods: { $t }
    })
}
