import Vue from 'vue'
import { VTooltip, VPopover } from 'v-tooltip'
import { getTranslation } from '@/shared'

export default function ({ store }) {
    const $t = (textId, replacements = []) => {
        const lngSet = store.getters['locale/lngSet']
        return getTranslation(lngSet, textId, replacements)
    }

    VTooltip.options.container = 'body'
    VTooltip.options.defaultBoundariesElement = 'body'
    VTooltip.options.placement = 'top'

    Vue.directive('tooltip', VTooltip)
    Vue.component('VPopover', VPopover)

    Vue.prototype.$eventBus = new Vue()

    Vue.mixin({
        methods: {
            $t,

            $showNotification (options) {
                this.$eventBus.$emit('showNotification', options)
            },

            $showError (options) {
                if (!options) {
                    return
                }

                const message = typeof options === 'string' ? options : options.message

                this.$showNotification({
                    type: 'error',
                    message
                })
            },

            $showSuccess (options) {
                if (!options) {
                    return
                }

                const message = typeof options === 'string' ? options : options.message

                this.$showNotification({
                    type: 'success',
                    message
                })
            }
        }
    })
}
