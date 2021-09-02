<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        {{ $t('MainMenu_Settings') }}
      </template>

      <template #topMenu>
        <TopTabs :modes="$options.modes" :selected-mode="mode" @switch="onModeChange">
          <template #tab0>
            {{ $t('Wishlist_TopTabs_Account') }}
          </template>

          <template #tab1>
            {{ $t('Wishlist_TopTabs_Market') }}
          </template>
        </TopTabs>
      </template>
    </TopNavBar>

    <div class="wit-settings">
      <NotVerifiedProfileMessage v-if="!user.isVerified" :profile="user" />
      <StickyPanel @update="updateSettings" />
      <MarketSettings :market-settings="marketSettings" class="wit-offset-bottom--sm" @change="marketSettings = $event" />
      <NoteEditor :content="marketSettings.marketNote" label="Market" class="wit-offset-bottom--sm" @input="marketSettings.marketNote = $event" />
      <NoteEditor :content="marketSettings.wishlistNote" label="Wishlist" class="wit-offset-bottom--xlg" @input="marketSettings.wishlistNote = $event" />
      <DangerZone :profile="user" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { User } from '@/store'
import TopTabs from '@/components/TopTabs'
import DangerZone from '@/components/settings/DangerZone'
import MarketSettings from '@/components/settings/MarketSettings'
import NotVerifiedProfileMessage from '@/components/settings/NotVerifiedProfileMessage'
import StickyPanel from '@/components/settings/StickyPanel'
import NoteEditor from '@/components/settings/NoteEditor'
import { Routes } from '@/shared'

const Modes = {
    ACCOUNT: 'account',
    MARKET: 'market'
}

export default {
    modes: Object.values(Modes),

    components: {
        TopTabs,
        DangerZone,
        MarketSettings,
        NotVerifiedProfileMessage,
        StickyPanel,
        NoteEditor
    },

    middleware: ['fetchUser'],

    data: () => ({
        mode: Modes.MARKET,

        marketSettings: {
            isStrictRarity: false,
            onlyGuarded: false,
            isBargainAvailable: false,
            isTradingOnlyDups: false,
            areRecipesHidden: false,
            marketNote: '',
            wishlistNote: ''
        }
    }),

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ])
    },

    created () {
        this.marketSettings.isStrictRarity = this.user.isStrictRarity
        this.marketSettings.onlyGuarded = this.user.onlyGuarded
        this.marketSettings.isBargainAvailable = this.user.isBargainAvailable
        this.marketSettings.isTradingOnlyDups = this.user.isTradingOnlyDups
        this.marketSettings.areRecipesHidden = this.user.areRecipesHidden
        this.marketSettings.marketNote = this.user.marketNote
        this.marketSettings.wishlistNote = this.user.wishlistNote
    },

    methods: {
        async updateSettings () {
            try {
                const data = {
                    isStrictRarity: this.marketSettings.isStrictRarity,
                    onlyGuarded: this.marketSettings.onlyGuarded,
                    isBargainAvailable: this.marketSettings.isBargainAvailable,
                    isTradingOnlyDups: this.marketSettings.isTradingOnlyDups,
                    areRecipesHidden: this.marketSettings.areRecipesHidden,
                    marketNote: this.marketSettings.marketNote,
                    wishlistNote: this.marketSettings.wishlistNote
                }

                await this.$store.dispatch(User.F.Actions.UPDATE_MARKET_SETTINGS, data)
                this.$showSuccess(this.$t('Settings_SettingsUpdated'))
            } catch (error) {
                this.$showError(error)
            }
        },

        onModeChange () {
            this.$router.replace(Routes.SETTINGS)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-settings {
    padding: var(--offset-md) var(--offset-sm);
    max-width: 800px;
    margin: 0 auto;
}

</style>
