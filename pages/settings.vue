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
        <SocialNetworks :profile="user" />
        <DangerZone :profile="user" />
      </template>

      <template v-else>
        <MarketSettings :market-settings="marketSettings" @change="marketSettings = $event" />
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
            allowMaterialsReplacement: false
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

        this.marketSettings.allowMaterialsReplacement = this.user.allowMaterialsReplacement
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
                    avatarId: this.accountSettings.avatarId
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

        // async connectSocial (socialName) {
        //     try {
        //         await this.$store.dispatch(User.F.Actions.AUTH_USING_SOCIALS, socialName)
        //         this.$showSuccess(this.$t('Settings_AccountConnected'))
        //     } catch (error) {
        //         this.$showError(error)
        //     }
        // },
        //
        // disconnectSocial (socialName) {
        //     showPopup(this, {
        //         title: this.$t('Settings_DisconnectSocialTitle'),
        //         message: this.$t('Settings_WannaDisconnectSocial'),
        //         confirmText: this.$t('Confirm'),
        //         cancelText: this.$t('Cancel'),
        //         onConfirm: async () => {
        //             try {
        //                 await this.$store.dispatch(User.F.Actions.DISCONNECT_SOCIAL, socialName)
        //                 this.$showSuccess(this.$t('Settings_AccountDisconnected'))
        //             } catch (error) {
        //                 this.$showError(error)
        //             }
        //         }
        //     })
        // },

        // toggleProfile () {
        //     this.isProfilePublic ? this.makeProfilePrivate() : this.makeProfilePublic()
        // },
        //
        // async makeProfilePublic () {
        //     try {
        //         await this.$store.dispatch(User.F.Actions.TOGGLE_PROFILE, true)
        //         this.$showSuccess(this.$t('Settings_ProfileVisibilityChanged'))
        //     } catch (error) {
        //         this.$showError(error)
        //     }
        // },
        //
        // makeProfilePrivate () {
        //     showPopup(this, {
        //         title: this.$t('Settings_MakePrivatePopupTitle'),
        //         message: this.$t('Settings_WannaMakePrivate'),
        //         confirmText: this.$t('Confirm'),
        //         cancelText: this.$t('Cancel'),
        //         onConfirm: async () => {
        //             try {
        //                 await this.$store.dispatch(User.F.Actions.TOGGLE_PROFILE, false)
        //                 this.$showSuccess(this.$t('Settings_ProfileVisibilityChanged'))
        //             } catch (error) {
        //                 this.$showError(error)
        //             }
        //         }
        //     })
        // },
        //
        // deleteProfile () {
        //     showPopup(this, {
        //         title: this.$t('Settings_RemoveProfileTitle'),
        //         message: this.$t('Settings_WannaRemoveProfile'),
        //         confirmText: this.$t('Confirm'),
        //         cancelText: this.$t('Cancel'),
        //         onConfirm: () => {
        //             this.$store.dispatch(User.F.Actions.REMOVE_PROFILE).catch(this.$showError)
        //         }
        //     })
        // }
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
