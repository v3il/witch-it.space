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
</template>

<script>
import { computed, useStore } from '@nuxtjs/composition-api'
import QuestsView from '@/components/quests/QuestsView'
import { QuestsGrid, QuestsHeader, ConnectSteam } from '@/components/quests'

export default {
    components: {
        ConnectSteam,
        QuestsView,
        QuestsHeader,
        QuestsGrid
    },

    middleware: ['isAuthorized'],

    setup () {
        const store = useStore()
        const isSteamConnected = computed(() => store.getters['user/isSteamConnected'])

        return { isSteamConnected }
    },

    async fetch ({ store }) {
        // eslint-disable-next-line no-console
        await store.dispatch('quest/fetchUserQuests').catch(console.error)
    }
}
</script>

<style scoped lang="scss">
.wis-quests {
    min-height: 100vh;
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
