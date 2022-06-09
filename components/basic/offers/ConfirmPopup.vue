<template>
  <EditPopup
    ref="popup"
    :popup-title="popupTitle"
    :popup-id="$options.popupId"
    :submit-button-title="$t('Confirm')"
    @beforeOpen="beforeOpen"
    @beforeClose="beforeClose"
    @save="onSave"
  >
    <div class="wit-line-height--md" v-html="content" />
  </EditPopup>
</template>

<script>
import { PopupNames } from '@/components/basic/offers/PopupNames.js'
import EditPopup from '@/components/basic/popup/EditPopup.vue'

export default {
    name: 'ConfirmPopup',

    popupId: PopupNames.CONFIRM_POPUP,

    components: {
        EditPopup
    },

    data: () => ({
        popupTitle: '',
        content: ''
    }),

    methods: {
        beforeOpen ({ popupTitle, content, resolve }) {
            this.popupTitle = popupTitle
            this.content = content
            this.resolve = resolve
        },

        beforeClose () {
            this.resolve(false)
        },

        onSave () {
            this.resolve(true)
            this.$refs.popup.closePopup()
        }
    }
}
</script>
