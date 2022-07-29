<template>
  <div class="wis-quests">
    <QuestsHeader />

    <div class="wis-quests__content">
      <div class="wis-block--max-width-xs wis-quests__quests">
        <QuestsView v-if="isSteamConnected" />
        <ConnectSteam v-else />
      </div>
    </div>
  </div>

  <!--    <TopNavBar class="layout__header">-->
  <!--      <template #brand>-->
  <!--        <h1 class="wit-font-size&#45;&#45;sm wit-flex wit-flex&#45;&#45;align-center">-->
  <!--          {{ $t('MainMenu_Quests') }}-->
  <!--        </h1>-->
  <!--      </template>-->
  <!--    </TopNavBar>-->

  <!--    <div class="wit-quests">-->
  <!--      <QuestsView v-if="isSteamConnected" />-->
  <!--      <ConnectSteam v-else />-->
  <!--    </div>-->
</template>

<script>
import { mapGetters } from 'vuex'
import ConnectSteam from '@/components/quests/ConnectSteam'
import { StoreModules } from '@/store'
import QuestsView from '@/components/quests/QuestsView'
import TopNavBar from '@/components/header/TopNavBar.vue'
import { QuestsHeader } from '@/components/quests'

export default {
    components: {
        ConnectSteam,
        QuestsView,
        QuestsHeader
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
.wis-quests {
    min-height: 100vh;
    //padding: var(--offset-sm);
    //max-width: 1024px;
    //margin: 0 auto;
}

.wis-quests__content {
    padding: 40px;

    @media (max-width: 600px) {
        padding: 24px;
    }
}

.wis-quests__quests {
    margin-left: auto;
    margin-right: auto;
}
</style>
