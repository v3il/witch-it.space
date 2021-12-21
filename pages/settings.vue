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
      <!--      <b-message-->
      <!--        -->
      <!--        :title="$t('Settings_NotVerifiedAccountTitle')"-->
      <!--        type="is-danger"-->
      <!--        :closable="false"-->
      <!--        class="wis-settings-message wit-line-height&#45;&#45;md wit-offset-bottom&#45;&#45;none"-->
      <!--        aria-close-label="Close message"-->
      <!--      >-->
      <!--        <p class="wit-color&#45;&#45;white wit-offset-bottom&#45;&#45;xs" v-html="$t('Settings_NotVerifiedAccountMessage')" />-->

      <!--        <ul class="wit-color&#45;&#45;warning wit-settings__todo-list">-->
      <!--          <li v-if="!user.isSteamConnected">-->
      <!--            {{ $t('Settings_NotVerifiedAccountTask1') }}-->
      <!--          </li>-->
      <!--          <li v-if="!user.isDiscordConnected">-->
      <!--            {{ $t('Settings_NotVerifiedAccountTask2') }}-->
      <!--          </li>-->
      <!--          <li v-if="!hasTradeLink">-->
      <!--            {{ $t('Settings_NotVerifiedAccountTask3') }}-->
      <!--          </li>-->
      <!--        </ul>-->
      <!--      </b-message>-->

      <NotVerifiedProfileMessage v-if="!user.isVerified" :profile="user" />

      <!--      <div class="wit-flex wit-flex&#45;&#45;justify-end wit-settings__sticky-panel">-->
      <!--        <b-field>-->
      <!--          <b-button type="is-primary" class="wit-offset-left&#45;&#45;auto wit-block" @click="updateSettings">-->
      <!--            {{ $t('Settings_Save') }}-->
      <!--          </b-button>-->
      <!--        </b-field>-->
      <!--      </div>-->

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
import Card from '@/components/Card'
import { User } from '@/store'
import AvatarPicker from '@/components/settings/AvatarPicker'
import { validateDisplayName, validatePassword, validateSteamTradeURL } from '@/shared/validators'
import { showPopup } from '@/utils'
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

        // hasLocalProfile () {
        //     return this.user.hasLocalProfile
        // },

        // isProfilePublic () {
        //     return this.user.isPublic
        // },

        hasTradeLink () {
            return !!this.user.steamTradeLink
        },

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
