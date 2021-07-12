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

      <!--      <template #topMenu>-->
      <!--        <TopTabs :modes="[]" selected-mode="">-->
      <!--          <template #slot0>-->
      <!--            0-->
      <!--          </template>-->
      <!--        </TopTabs>-->

      <!--        &lt;!&ndash;        <ul class="wit-flex wit-flex&#45;&#45;center wit-top-tabs">&ndash;&gt;-->
      <!--        &lt;!&ndash;          <li class="wit-top-tabs__tab wit-flex wit-flex&#45;&#45;align-center wit-offset-right&#45;&#45;md" :class="">&ndash;&gt;-->
      <!--        &lt;!&ndash;            <b-button type="is-ghost" class="wit-top-tabs__button" @click="">&ndash;&gt;-->
      <!--        &lt;!&ndash;              {{ hasFilteredProfiles ? 'Filtered Profiles' : 'All Profiles' }}&ndash;&gt;-->
      <!--        &lt;!&ndash;              <span class="wit-top-tabs__counter wit-offset-left&#45;&#45;xxs">{{ profilesCount }}</span>&ndash;&gt;-->
      <!--        &lt;!&ndash;            </b-button>&ndash;&gt;-->
      <!--        &lt;!&ndash;          </li>&ndash;&gt;-->

      <!--        &lt;!&ndash;          <li class="wit-top-tabs__tab wit-flex wit-flex&#45;&#45;align-center" :class="getTopNavLinkClass($options.modes.ME)">&ndash;&gt;-->
      <!--        &lt;!&ndash;            <b-button type="is-ghost" class="wit-top-tabs__button" @click="toggleMyProfileMode">&ndash;&gt;-->
      <!--        &lt;!&ndash;              My Profile&ndash;&gt;-->
      <!--        &lt;!&ndash;            </b-button>&ndash;&gt;-->
      <!--        &lt;!&ndash;          </li>&ndash;&gt;-->
      <!--        &lt;!&ndash;        </ul>&ndash;&gt;-->
      <!--      </template>-->
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
// import TopTabs from '@/components/TopTabs'
import TopNavBar from '@/components/TopNavBar'

export default {
    components: {
        ConnectSteam,
        QuestsView,
        // TopTabs,
        TopNavBar
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
