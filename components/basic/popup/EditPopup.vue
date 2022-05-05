<template>
  <Popup
    ref="popup"
    :popup-id="popupId"
    :popup-title="popupTitle"
    :popup-size="popupSize"
    @beforeOpen="$emit('beforeOpen', $event)"
    @beforeClose="$emit('beforeClose')"
  >
    <slot />

    <template v-if="$slots.controlsLeft" #controlsLeft>
      <slot name="controlsLeft" />
    </template>

    <template #controlsRight>
      <b-button type="is-primary" class="wit-color--white" :disabled="isLoading" @click="$emit('save')">
        {{ submitButtonTitle }}
      </b-button>
    </template>
  </Popup>
</template>

<script>
import Popup from '@/components/basic/popup/Popup.vue'
import { PopupSizes } from '@/components/basic/popup/PopupSizes.js'

export default {
    name: 'EditPopup',

    components: {
        Popup
    },

    props: {
        popupId: {
            required: true,
            type: String
        },

        popupTitle: {
            required: true,
            type: String
        },

        popupSize: {
            required: false,
            type: Number,
            default: PopupSizes.SM
        },

        submitButtonTitle: {
            required: false,
            type: String,
            default: ''
        },

        isLoading: {
            required: false,
            type: Boolean,
            default: false
        }
    },

    methods: {
        closePopup () {
            this.$refs.popup.closePopup()
        }
    }
}
</script>
