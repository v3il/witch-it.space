<template>
  <div class="wit-quests">
    <div class="wit-offset-bottom--lg wit-line-height--md">
      <p class="wit-block wit-text--center">
        {{ $t('Quests_Note') }}
      </p>
    </div>

    <QuestsView v-if="isSteamConnected" />
    <ConnectSteam v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ConnectSteam from '@/components/quests/ConnectSteam'
import { User } from '@/store'
import QuestsView from '@/components/quests/QuestsView'

export default {

    components: {
        ConnectSteam,
        QuestsView
    },

    middleware: ['fetchUser'],

    computed: {
        ...mapState(User.PATH, [
            'user'
        ]),

        isSteamConnected () {
            return this.user?.isSteamConnected
        }
    }
}
</script>

<style scoped lang="scss">
.wit-quests {
    padding: var(--offset-xxlg) 0;
    max-width: 800px;
    margin: 0 auto;
}
</style>
