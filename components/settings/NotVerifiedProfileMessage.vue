<template>
  <b-message
    :title="$t('Settings_NotVerifiedAccountTitle')"
    type="is-danger"
    :closable="false"
    class="wis-settings-message wit-line-height--md"
  >
    <p class="wit-color--white wit-offset-bottom--xs" v-html="$t('Settings_NotVerifiedAccountMessage')" />

    <ul class="wit-color--warning wit-settings__todo-list">
      <li v-if="!isSteamConnected">
        {{ $t('Settings_NotVerifiedAccountTask1') }}
      </li>

      <li v-if="!isDiscordConnected">
        {{ $t('Settings_NotVerifiedAccountTask2') }}
      </li>

      <li v-if="!profile.steamTradeLink">
        {{ $t('Settings_NotVerifiedAccountTask3') }}
      </li>
    </ul>
  </b-message>
</template>

<script>
import { mapGetters } from 'vuex'
import { StoreModules } from '@/store/index.js'

export default {
    name: 'NotVerifiedProfileMessage',

    props: {
        profile: {
            required: true,
            type: Object
        }
    },

    computed: {
        ...mapGetters(StoreModules.USER, [
            'isSteamConnected',
            'isDiscordConnected'
        ])
    }
}
</script>

<style scoped>
.wit-settings__todo-list {
    list-style: decimal;
    margin-left: var(--offset-sm);
}
</style>
