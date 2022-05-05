<template>
  <vue-final-modal
    ref="popup"
    v-model="isVisible"
    :content-style="popupStyles"
    :name="popupId"
    :click-to-close="false"
    :lock-scroll="false"
    @before-open="beforeOpen"
    @before-close="$emit('beforeClose')"
  >
    <div class="wit-popup-header wit-paddings--sm">
      <h5 class="modal__title">
        {{ popupTitle }}
      </h5>
    </div>

    <div class="wit-popup-content wit-paddings--sm wit-flex wit-flex--column wit-overflow--hidden">
      <slot />
    </div>

    <div class="wit-popup-footer wit-paddings--sm wit-flex wit-flex--justify-between">
      <div>
        <slot name="controlsLeft" />
      </div>

      <div class="wit-flex">
        <b-button @click="closePopup">
          {{ $t('Close') }}
        </b-button>

        <div v-if="$slots.controlsRight" class="wit-offset-left--xs">
          <slot name="controlsRight" />
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { PopupSizes } from '@/components/basic/popup/PopupSizes.js'

export default {
    name: 'Popup',

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
        }
    },

    data: () => ({
        isVisible: false
    }),

    computed: {
        popupStyles () {
            return {
                width: `${this.popupSize}px`
            }
        }
    },

    methods: {
        beforeOpen (event) {
            this.$emit('beforeOpen', event.ref.params)
        },

        show () {
            this.isVisible = true
        },

        hide () {
            this.isVisible = false
        },

        closePopup () {
            this.hide()
            this.$emit('popupClosed')
        }
    }
}
</script>

<style scoped lang="scss">
// stylelint-disable-next-line
::v-deep .vfm__container {
    display: flex;
    justify-content: center;
    align-items: center;
}

// stylelint-disable-next-line
::v-deep .vfm__content {
    position: relative;
    display: flex;
    flex-direction: column;
    max-height: 90%;
    margin: 0 1rem;
    border: var(--default-border);
    border-radius: var(--offset-xxs);
    background: var(--card-bg-color);
    min-width: 350px;
}

// stylelint-disable-next-line
::v-deep .vfm--overlay {
    background-color: var(--modal-background-background-color);
}

.wit-popup-content {
    border-bottom: var(--default-border);
}

.wit-popup-header {
    font-size: var(--modal-card-title-size);
    line-height: var(--modal-card-title-line-height);
    border-bottom: var(--default-border);
}
</style>
