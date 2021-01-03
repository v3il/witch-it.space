<template>
  <Card>
    <div class="wit-flex wit-flex--column wit-flex--center">
      <p class="wit-offset-bottom--sm wit-text--center wit-color--orange">
        {{ $t('Quests_ConnectSteamWarning') }}
      </p>
      <b-button type="is-link" href="/api/auth/steam" icon-left="steam" tag="a">
        {{ $t('Quests_ConnectSteamButtonTitle') }}
      </b-button>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'

export default {
    name: 'ConnectSteam',

    components: {
        Card
    }
}
</script>

<style scoped>

</style>
