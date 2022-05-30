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
import { mapActions } from 'vuex'
import Card from '@/components/basic/Card.vue'
import { StoreModules, User } from '@/store'
import { Routes } from '@/shared/index.js'

export default {
    name: 'ConnectSteam',

    components: {
        Card
    },

    methods: {
        ...mapActions(StoreModules.USER, {
            authUsingSocials: 'authUsingSocials'
        }),

        connectSteam () {
            this.authUsingSocials('steam').catch(error => error && this.$showError(error.message))
        }
    }
}
</script>
