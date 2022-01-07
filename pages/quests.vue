<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        <div class="wit-font-size--sm">
          {{ $t('MainMenu_Quests') }}
        </div>

        <b-dropdown
          animation="fade150"
          class="wit-block--full-height wiz-background--transparent wit-offset-left--xs"
          position="is-bottom-right"
        >
          <template #trigger>
            <b-icon class="is-size-5 wit-color--muted wit-flex wit-block--full-height" icon="help-box" />
          </template>

          <div class="wit-paddings--xs">
            {{ $t('Quests_Note') }}
          </div>
        </b-dropdown>
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
import { User } from '@/store'
import QuestsView from '@/components/quests/QuestsView'
import TopNavBar from '@/components/header/TopNavBar.vue'

export default {
    components: {
        ConnectSteam,
        QuestsView,
        TopNavBar
    },

    middleware: ['fetchUser'],

    computed: {
        ...mapGetters(User.PATH, [
            User.Getters.IS_STEAM_CONNECTED
        ])
    }
}
</script>

<style scoped lang="scss">
.wit-quests {
    padding: var(--offset-xxlg) var(--offset-sm);
    max-width: 800px;
    margin: 0 auto;
}
</style>
