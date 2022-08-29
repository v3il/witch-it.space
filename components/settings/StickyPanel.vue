<template>
  <Card class="wit-settings__sticky-panel">
    <div class="wit-flex wit-flex--justify-end">
      <b-button type="is-primary" class="wit-offset-left--auto wit-block" @click="$emit('update')">
        {{ $t('Settings_Save') }}
      </b-button>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/basic/Card.vue'

export default {
    name: 'StickyPanel',

    components: {
        Card
    }
}
</script>

<style scoped>
.wit-settings__sticky-panel {
    position: sticky;
    top: 0;
    z-index: 2;
    /*box-shadow: 0 5px 12px 8px #222736;*/
}
</style>
