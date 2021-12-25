<template>
  <div>
    <TopNavBar class="layout__header">
      <template #brand>
        {{ $t('MainMenu_Settings') }}
      </template>

      <template #topMenu>
        <TopTabs :modes="$options.modes" :selected-mode="mode" @switch="mode = $event">
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

      <template v-if="isAccountMode">
        <AccountSettings :profile="user" :account-settings="accountSettings" @change="accountSettings = $event" />
        <SocialNetworks :profile="user" class="wit-offset-bottom--xlg" />
      </template>

      <template v-else>
        <MarketSettings :market-settings="marketSettings" class="wit-offset-bottom--sm" @change="marketSettings = $event" />
        <NoteEditor :content="marketSettings.marketNote" label="Market" class="wit-offset-bottom--sm" @input="marketSettings.marketNote = $event" />
        <NoteEditor :content="marketSettings.wishlistNote" label="Wishlist" class="wit-offset-bottom--xlg" @input="marketSettings.wishlistNote = $event" />
      </template>

      <DangerZone :profile="user" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { User } from '@/store'
import { validateDisplayName, validatePassword, validateSteamTradeURL } from '@/shared/validators'
import TopTabs from '@/components/TopTabs'
import AccountSettings from '@/components/settings/AccountSettings'
import SocialNetworks from '@/components/settings/SocialNetworks'
import DangerZone from '@/components/settings/DangerZone'
import MarketSettings from '@/components/settings/MarketSettings'
import NotVerifiedProfileMessage from '@/components/settings/NotVerifiedProfileMessage'
import StickyPanel from '@/components/settings/StickyPanel'
import NoteEditor from '@/components/settings/NoteEditor'

const Modes = {
    ACCOUNT: 'account',
    MARKET: 'market'
}

export default {
    modes: Object.values(Modes),

    components: {
        TopTabs,
        AccountSettings,
        SocialNetworks,
        DangerZone,
        MarketSettings,
        NotVerifiedProfileMessage,
        StickyPanel,
        NoteEditor
    },

    middleware: ['fetchUser'],

    data: () => ({
        mode: Modes.ACCOUNT,

        accountSettings: {
            login: '',
            password: '',
            displayName: '',
            steamTradeLink: '',
            isGuardProtected: true,
            avatarId: 1
        },

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
        ]),

        isAccountMode () {
            return this.mode === Modes.ACCOUNT
        }
    },

    created () {
        this.accountSettings.login = this.user.login ?? ''
        this.accountSettings.displayName = this.user.displayName ?? ''
        this.accountSettings.steamTradeLink = this.user.steamTradeLink ?? ''
        this.accountSettings.isGuardProtected = this.user.isGuardProtected
        this.accountSettings.avatarId = this.user.avatarId

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
            const errors = []

            if (this.accountSettings.password) {
                errors.push(validatePassword(this.accountSettings.password))
            }

            errors.push(
                validateDisplayName(this.accountSettings.displayName),
                validateSteamTradeURL(this.accountSettings.steamTradeLink)
            )

            const firstError = errors.find(error => error !== null)

            if (firstError) {
                return this.$showError(this.$t(firstError))
            }

            try {
                const data = {
                    displayName: this.accountSettings.displayName,
                    steamTradeLink: this.accountSettings.steamTradeLink,
                    isGuardProtected: this.accountSettings.isGuardProtected,
                    avatarId: this.accountSettings.avatarId,
                    isStrictRarity: this.marketSettings.isStrictRarity,
                    onlyGuarded: this.marketSettings.onlyGuarded,
                    isBargainAvailable: this.marketSettings.isBargainAvailable,
                    isTradingOnlyDups: this.marketSettings.isTradingOnlyDups,
                    areRecipesHidden: this.marketSettings.areRecipesHidden,
                    marketNote: this.marketSettings.marketNote,
                    wishlistNote: this.marketSettings.wishlistNote
                }

                if (this.accountSettings.password) {
                    data.password = this.accountSettings.password
                }

                await this.$store.dispatch(User.F.Actions.UPDATE_SETTINGS, data)
                this.$showSuccess(this.$t('Settings_SettingsUpdated'))

                this.accountSettings.password = ''
            } catch (error) {
                this.$showError(error)
            }
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
