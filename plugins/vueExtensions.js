import Vue from 'vue'
import { getTranslation } from '@/shared'

export default function ({ store }) {
    const $t = (textId, replacements = []) => {
        const lngSet = store.getters['locale/lngSet']
        return getTranslation(lngSet, textId, replacements)
    }

    Vue.prototype.$eventBus = new Vue()

    Vue.mixin({
        methods: {
            $t,

            $showNotification (options) {
                this.$eventBus.$emit('showNotification', options)
            },

            $showError ({ message }) {
                this.$showNotification({
                    type: 'error',
                    message
                })
            },

            $showSuccess ({ message }) {
                this.$showNotification({
                    type: 'success',
                    message
                })
            }
        }
    })
}
