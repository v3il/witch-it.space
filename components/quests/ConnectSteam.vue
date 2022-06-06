<template>
  <Card>
    <div class="wit-flex wit-flex--column wit-flex--center wit-connect-steam">
      <p class="wit-offset-bottom--md wit-text--center wit-color--warning">
        {{ $t('Quests_ConnectSteamWarning') }}
      </p>
      <b-button type="is-primary" @click="connectSteam">
        {{ $t('Quests_ConnectSteamButtonTitle') }}
      </b-button>
    </div>
  </Card>
</template>

<script>
import { mapActions } from 'vuex'
import Card from '@/components/basic/Card.vue'
import { StoreModules } from '@/store'

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

<style scoped lang="scss">
.wit-connect-steam {
    min-height: 150px;
}
</style>
