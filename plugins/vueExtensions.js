import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import { VTooltip, VPopover } from 'v-tooltip'
import { getTranslation } from '@/shared'
import { PopupNames } from '@/components/basic/offers/PopupNames.js'

export default function ({ store }) {
    const $t = (textId, replacements = []) => {
        const lngSet = store.getters['locale/lngSet']
        return getTranslation(lngSet, textId, replacements)
    }

    Vue.use(VueCompositionAPI)

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
                    type: 'danger',
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
            },

            $showConfirm (params) {
                return new Promise((resolve) => {
                    this.$vfm.show(PopupNames.CONFIRM_POPUP, { ...params, resolve })
                })
            }
        }
    })
}
