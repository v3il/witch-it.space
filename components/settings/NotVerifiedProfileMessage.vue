<template>
  <b-message
    :title="$t('Settings_NotVerifiedAccountTitle')"
    type="is-danger"
    :closable="false"
    class="wis-settings-message wit-line-height--md wit-offset-bottom--none"
    aria-close-label="Close message"
  >
    <p class="wit-color--white wit-offset-bottom--xs" v-html="$t('Settings_NotVerifiedAccountMessage')" />

    <ul class="wit-color--warning wit-settings__todo-list">
      <li v-if="!profile.isSteamConnected">
        {{ $t('Settings_NotVerifiedAccountTask1') }}
      </li>
      <li v-if="!profile.isDiscordConnected">
        {{ $t('Settings_NotVerifiedAccountTask2') }}
      </li>
      <li v-if="!profile.steamTradeLink">
        {{ $t('Settings_NotVerifiedAccountTask3') }}
      </li>
    </ul>
  </b-message>
</template>

<script>
export default {
    name: 'NotVerifiedProfileMessage',

    props: {
        profile: {
            required: true,
            type: Object
        }
    }
}
</script>

<style scoped>
.wit-settings__todo-list {
    list-style: decimal;
    margin-left: var(--offset-sm);
}
</style>
