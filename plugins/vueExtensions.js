import Vue from 'vue'
import { VPopover, VTooltip } from 'v-tooltip'
import { getTranslation } from '@/shared'
import { PopupNames } from '@/components/basic/offers/PopupNames.js'

export default function ({ store }, inject) {
    const eventBus = new Vue()

    const translate = (textId, replacements = []) => {
        const lngSet = store.getters['locale/lngSet']
        return getTranslation(lngSet, textId, replacements)
    }

    const showNotification = (options) => {
        eventBus.$emit('showNotification', options)
    }

    const showError = (options) => {
        const message = typeof options === 'string' ? options : options.message
        showNotification({ type: 'danger', message })
    }

    const showSuccess = (options) => {
        const message = typeof options === 'string' ? options : options.message
        showNotification({ type: 'success', message })
    }

    inject('t', translate)
    inject('showError', showError)
    inject('showSuccess', showSuccess)

    VTooltip.options.container = 'body'
    VTooltip.options.defaultBoundariesElement = 'body'
    VTooltip.options.placement = 'top'

    Vue.directive('tooltip', VTooltip)
    Vue.component('VPopover', VPopover)

    Vue.prototype.$eventBus = eventBus

    Vue.mixin({
        methods: {
            $showConfirm (params) {
                return new Promise((resolve) => {
                    this.$vfm.show(PopupNames.CONFIRM_POPUP, { ...params, resolve })
                })
            }
        }
    })
}
