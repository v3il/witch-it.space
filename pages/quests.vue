<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        {{ $t('MainMenu_Quests') }}

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

      <template #topMenu>
        <TopTabs :modes="[]" selected-mode="">
          <template #slot0>
            0
          </template>
        </TopTabs>

        <!--        <ul class="wit-flex wit-flex&#45;&#45;center wit-top-tabs">-->
        <!--          <li class="wit-top-tabs__tab wit-flex wit-flex&#45;&#45;align-center wit-offset-right&#45;&#45;md" :class="">-->
        <!--            <b-button type="is-ghost" class="wit-top-tabs__button" @click="">-->
        <!--              {{ hasFilteredProfiles ? 'Filtered Profiles' : 'All Profiles' }}-->
        <!--              <span class="wit-top-tabs__counter wit-offset-left&#45;&#45;xxs">{{ profilesCount }}</span>-->
        <!--            </b-button>-->
        <!--          </li>-->

        <!--          <li class="wit-top-tabs__tab wit-flex wit-flex&#45;&#45;align-center" :class="getTopNavLinkClass($options.modes.ME)">-->
        <!--            <b-button type="is-ghost" class="wit-top-tabs__button" @click="toggleMyProfileMode">-->
        <!--              My Profile-->
        <!--            </b-button>-->
        <!--          </li>-->
        <!--        </ul>-->
      </template>
    </TopNavBar>

    <div class="wit-quests">
      <!--      <div class="wit-offset-bottom&#45;&#45;lg wit-line-height&#45;&#45;md">-->
      <!--        <p class="wit-block wit-text&#45;&#45;center">-->
      <!--          {{ $t('Quests_Note') }}-->
      <!--        </p>-->
      <!--      </div>-->

      <QuestsView v-if="user.isSteamConnected" />
      <ConnectSteam v-else />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ConnectSteam from '@/components/quests/ConnectSteam'
import { User } from '@/store'
import QuestsView from '@/components/quests/QuestsView'
import TopTabs from '@/components/TopTabs'

export default {
    components: {
        ConnectSteam,
        QuestsView,
        TopTabs
    },

    middleware: ['fetchUser'],

    computed: {
        ...mapState(User.PATH, [
            'user'
        ])
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
