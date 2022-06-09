<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        <h1 class="wit-font-size--sm wit-flex wit-flex--align-center">
          <BackButton to="/" class="wit-offset-right--xs" />
          {{ $t('MainMenu_Settings') }}
        </h1>
      </template>
    </TopNavBar>

    <div class="wit-settings">
      <StickyPanel class="wit-offset-bottom--sm1" @update="updateSettings" />
      <NotVerifiedProfileMessage v-if="!isVerified" :profile="user" class="wit-offset-bottom--sm" />

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
import BackButton from '@/components/basic/BackButton.vue'

// const Modes = {
//     ACCOUNT: 'account',
//     MARKET: 'market'
// }

export default {
    // modes: Object.values(Modes),

    components: {
        TopTabs,
        DangerZone,
        NotVerifiedProfileMessage,
        StickyPanel,
        TopNavBar,
        BackButton
    },

    middleware: ['isAuthorized'],

    data: () => ({
        // mode: Modes.ACCOUNT,

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

    created () {
        this.settings.login = this.user.login ?? ''
        this.settings.displayName = this.user.displayName ?? ''
        this.settings.steamTradeLink = this.user.steamTradeLink ?? ''
        this.settings.isGuardProtected = this.user.isGuardProtected
        this.settings.avatarId = this.user.avatarId

        this.settings.switchRarities = this.user.switchRarities
        this.settings.tradeWithGuardedOnly = this.user.tradeWithGuardedOnly
        this.settings.discountAvailable = this.user.discountAvailable
        this.settings.tradeDuplicatesOnly = this.user.tradeDuplicatesOnly
        this.settings.hideRecipes = this.user.hideRecipes
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
        }
    }
}
</script>

<style scoped lang="scss">
.wit-settings {
    padding: var(--offset-sm);
    max-width: 850px;
    margin: 0 auto;
}

</style>
