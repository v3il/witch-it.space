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
        <AccountSettings :profile="user" :account-settings="accountSettings" />
        <SocialNetworks :profile="user" />
        <DangerZone :profile="user" />
      </template>

      <template v-else>
        <MarketSettings />
      </template>
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
        StickyPanel
    },

    middleware: ['fetchUser'],

    data: () => ({
        login: '',
        password: '',
        displayName: '',
        steamTradeLink: '',
        isGuardProtected: true,
        avatarId: 1,

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
        this.login = this.user.login ?? ''
        this.displayName = this.user.displayName ?? ''
        this.steamTradeLink = this.user.steamTradeLink ?? ''
        this.isGuardProtected = this.user.isGuardProtected
        this.avatarId = this.user.avatarId
    },

    methods: {
        async updateSettings () {
            const errors = []

            if (this.password) {
                errors.push(validatePassword(this.password))
            }

            errors.push(
                validateDisplayName(this.displayName),
                validateSteamTradeURL(this.steamTradeLink)
            )

            const firstError = errors.find(error => error !== null)

            if (firstError) {
                return this.$showError(this.$t(firstError))
            }

            try {
                const data = {
                    displayName: this.displayName,
                    steamTradeLink: this.steamTradeLink,
                    isGuardProtected: this.isGuardProtected,
                    avatarId: this.avatarId
                }

                if (this.password) {
                    data.password = this.password
                }

                await this.$store.dispatch(User.F.Actions.UPDATE_SETTINGS, data)
                this.$showSuccess(this.$t('Settings_SettingsUpdated'))

                this.password = ''
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
