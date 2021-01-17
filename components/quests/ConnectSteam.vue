<template>
  <Card>
    <div class="wit-flex wit-flex--column wit-flex--center">
      <p class="wit-offset-bottom--sm wit-text--center wit-color--orange">
        {{ $t('Quests_ConnectSteamWarning') }}
      </p>
      <b-button type="is-link" icon-left="steam" @click="connectSteam">
        {{ $t('Quests_ConnectSteamButtonTitle') }}
      </b-button>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import { User } from '@/store'

export default {
    name: 'ConnectSteam',

    components: {
        Card
    },

    methods: {
        async connectSteam () {
            try {
                await this.$store.dispatch(User.F.Actions.AUTH_USING_SOCIALS, 'steam')
                await this.$store.commit(User.F.Mutations.SET_STEAM_CONNECTED)
            } catch (error) {
                if (error) {
                    this.$showError(error.message)
                }
            }
        }
    }
}
</script>
