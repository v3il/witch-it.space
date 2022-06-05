<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        <h1 class="wit-font-size--sm wit-flex wit-flex--align-center">
          <BackButton to="/" class="wit-offset-right--xs" />
          {{ $t('MainMenu_Quests') }}
        </h1>
      </template>
    </TopNavBar>

    <div class="wit-quests">
      <QuestsView v-if="isSteamConnected" />
      <ConnectSteam v-else />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ConnectSteam from '@/components/quests/ConnectSteam'
import { StoreModules } from '@/store'
import QuestsView from '@/components/quests/QuestsView'
import TopNavBar from '@/components/header/TopNavBar.vue'
import BackButton from '@/components/basic/BackButton.vue'

export default {
    components: {
        ConnectSteam,
        QuestsView,
        TopNavBar,
        BackButton
    },

    middleware: ['isAuthorized'],

    computed: {
        ...mapGetters(StoreModules.USER, [
            'isSteamConnected'
        ])
    }
}
</script>

<style scoped lang="scss">
.wit-quests {
    padding: var(--offset-sm);
    max-width: 800px;
    margin: 0 auto;
}
</style>
