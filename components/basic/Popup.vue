<template>
  <vue-final-modal v-slot="{ close }" v-model="isVisible">
    <div class="wit-popup-header wit-paddings--sm">
      <h5 class="modal__title">
        <slot name="header" />
      </h5>
    </div>

    <div class="wit-popup-content wit-paddings--sm">
      <slot />
    </div>

    <div class="wit-popup-footer wit-paddings--sm wit-flex wit-flex--justify-end">
      <b-button class="wit-offset-right--xs" @click="close">
        {{ $t('Cancel') }}
      </b-button>

      <slot name="submit">
        <b-button type="is-primary" @click="$emit('submit')">
          {{ $t('Confirm') }}
        </b-button>
      </slot>
    </div>
  </vue-final-modal>
</template>

<script>
export default {
    name: 'Popup',

    data: () => ({
        isVisible: false
    }),

    methods: {
        show () {
            this.isVisible = true
        },

        hide () {
            this.isVisible = false
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
    /*padding: 1rem;*/
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
