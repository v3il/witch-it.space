<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        <div class="wit-font-size--sm">
          {{ $t('MainMenu_Settings') }}
        </div>
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
      <NotVerifiedProfileMessage v-if="!isVerified" :profile="user" />
      <StickyPanel @update="updateSettings" />

      <div class="wit-offset-bottom--xlg">
        <nuxt-child :user="user" :settings="settings" @settingsChange="onSettingsChange" />
      </div>

      <DangerZone :profile="user" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { User } from '@/store'
import { validateDisplayName, validatePassword, validateSteamTradeURL } from '@/shared/validators'
import TopTabs from '@/components/header/TopTabs.vue'
import DangerZone from '@/components/settings/DangerZone'
import NotVerifiedProfileMessage from '@/components/settings/NotVerifiedProfileMessage'
import StickyPanel from '@/components/settings/StickyPanel'
import { Routes } from '@/shared'
import TopNavBar from '@/components/header/TopNavBar.vue'

const Modes = {
    ACCOUNT: 'account',
    MARKET: 'market'
}

export default {
    modes: Object.values(Modes),

    components: {
        TopTabs,
        DangerZone,
        NotVerifiedProfileMessage,
        StickyPanel,
        TopNavBar
    },

    middleware: ['fetchUser'],

    data: () => ({
        mode: Modes.ACCOUNT,

        settings: {
            login: '',
            password: '',
            displayName: '',
            steamTradeLink: '',
            isGuardProtected: true,
            avatarId: 1,

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
        ]),

        ...mapGetters(User.PATH, [
            User.Getters.IS_VERIFIED
        ])
    },

    watch: {
        $route: {
            immediate: true,

            handler (route) {
                this.mode = route.fullPath === Routes.SETTINGS ? Modes.ACCOUNT : Modes.MARKET
            }
        }
    },

    created () {
        this.settings.login = this.user.login ?? ''
        this.settings.displayName = this.user.displayName ?? ''
        this.settings.steamTradeLink = this.user.steamTradeLink ?? ''
        this.settings.isGuardProtected = this.user.isGuardProtected
        this.settings.avatarId = this.user.avatarId

        this.settings.switchRarities = this.user.settings.switchRarities
        this.settings.tradeWithGuardedOnly = this.user.settings.tradeWithGuardedOnly
        this.settings.discountAvailable = this.user.settings.discountAvailable
        this.settings.tradeDuplicatesOnly = this.user.settings.tradeDuplicatesOnly
        this.settings.hideRecipes = this.user.settings.hideRecipes
        this.settings.marketNote = this.user.marketNote ?? ''
        this.settings.wishlistNote = this.user.wishlistNote ?? ''
    },

    methods: {
        onSettingsChange (settings) {
            this.settings = settings
        },

        onMarketSettingsChange (marketSettings) {
            this.marketSettings = marketSettings
        },

        async updateSettings () {
            const errors = []

            if (this.settings.password) {
                errors.push(validatePassword(this.settings.password))
            }

            errors.push(
                validateDisplayName(this.settings.displayName),
                validateSteamTradeURL(this.settings.steamTradeLink)
            )

            const firstError = errors.find(error => error !== null)

            if (firstError) {
                return this.$showError(this.$t(firstError))
            }

            try {
                const data = {
                    displayName: this.settings.displayName,
                    steamTradeLink: this.settings.steamTradeLink,
                    isGuardProtected: this.settings.isGuardProtected,
                    avatarId: this.settings.avatarId,
                    switchRarities: this.settings.switchRarities,
                    tradeWithGuardedOnly: this.settings.tradeWithGuardedOnly,
                    discountAvailable: this.settings.discountAvailable,
                    tradeDuplicatesOnly: this.settings.tradeDuplicatesOnly,
                    hideRecipes: this.settings.hideRecipes,
                    marketNote: this.settings.marketNote,
                    wishlistNote: this.settings.wishlistNote
                }

                if (this.settings.password) {
                    data.password = this.settings.password
                }

                await this.$store.dispatch(User.F.Actions.UPDATE_SETTINGS, data)
                this.$showSuccess(this.$t('Settings_SettingsUpdated'))

                this.settings.password = ''
            } catch (error) {
                this.$showError(error)
            }
        },

        onModeChange (mode) {
            const route = mode === Modes.ACCOUNT ? Routes.SETTINGS : Routes.SETTINGS_MARKET
            this.$router.push(route)
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
