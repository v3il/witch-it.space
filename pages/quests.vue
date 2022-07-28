<template>
  <div>
    <!--    <TopNavBar class="layout__header">-->
    <!--      <template #brand>-->
    <!--        <h1 class="wit-font-size&#45;&#45;sm wit-flex wit-flex&#45;&#45;align-center">-->
    <!--          {{ $t('MainMenu_Quests') }}-->
    <!--        </h1>-->
    <!--      </template>-->
    <!--    </TopNavBar>-->

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

export default {
    components: {
        ConnectSteam,
        QuestsView,
        TopNavBar
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
    max-width: 850px;
    margin: 0 auto;
}
</style>
