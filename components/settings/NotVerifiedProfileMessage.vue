<template>
  <b-message
    :title="$t('Settings_NotVerifiedAccountTitle')"
    type="is-danger"
    :closable="false"
    class="wis-settings-message wit-line-height--md wit-font-size--xs"
  >
    <p class="wit-color--white wit-offset-bottom--xs">
      {{ $t('Settings_NotVerifiedAccountMessage') }}
    </p>

    <ul class="wit-color--warning wit-settings__todo-list">
      <li v-if="!isSteamConnected">
        {{ $t('Settings_NotVerifiedAccountTask1') }}
      </li>

      <li v-if="!hasTradeLink">
        {{ $t('Settings_NotVerifiedAccountTask3') }}
      </li>
    </ul>
  </b-message>
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'

export default {
    name: 'NotVerifiedProfileMessage',

    setup () {
        const store = useStore()
        const user = computed(() => store.state.user.user)
        const isSteamConnected = computed(() => store.getters['user/isSteamConnected'])
        const hasTradeLink = computed(() => !!user.value.steamTradeLink)

        return { isSteamConnected, hasTradeLink }
    }
}
</script>

<style scoped>
.wit-settings__todo-list {
    list-style: decimal;
    margin-left: var(--offset-sm);
    line-height: var(--line-height-lg);
}
</style>
