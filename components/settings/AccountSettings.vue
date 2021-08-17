<template>
  <div>
    <Card class="wit-offset-bottom--sm">
      <template #title>
        {{ $t('Settings_ProfileSettingsAndAppearance') }}
      </template>

      <b-field class="wit-offset-bottom--sm">
        <template #label>
          <p class="wit-offset-bottom--xs">
            {{ $t('Login_LoginInputTitle') }}
          </p>
          <p v-if="!hasLocalProfile" class="wit-color--warning wit-font-size--xxs">
            {{ $t('Settings_NotSetWhenOauth') }}
          </p>
        </template>
        <b-input
          :value="accountSettings.login"
          disabled
          type="text"
          :placeholder="$t('Login_LoginInputPlaceholder')"
          custom-class="wit-transition"
        />
      </b-field>

      <b-field :label="$t('Login_PasswordInputTitle')" class="wit-offset-bottom--sm" :message="$t('Register_PasswordInputHelp')">
        <template #label>
          <p class="wit-offset-bottom--xs">
            {{ $t('Login_PasswordInputTitle') }}
          </p>
          <p v-if="hasLocalProfile" class="wit-color--warning wit-font-size--xxs">
            {{ $t('Settings_PasswordFieldHint') }}
          </p>
          <p v-else class="wit-color--warning wit-font-size--xxs">
            {{ $t('Settings_NotSetWhenOauth') }}
          </p>
        </template>
        <b-input
          :value="accountSettings.password"
          type="password"
          autocomplete="new-password"
          :disabled="!hasLocalProfile"
          :placeholder="$t('Login_PasswordInputPlaceholder')"
          custom-class="wit-transition"
          @input="onPasswordChange"
        />
      </b-field>

      <b-field :label="$t('Settings_DisplayName')" class="wit-offset-bottom--sm" :message="$t('Settings_DisplayNameFieldHint')">
        <b-input
          :value="accountSettings.displayName"
          maxlength="20"
          has-counter
          :placeholder="$t('Settings_DisplayNamePlaceholder')"
          custom-class="wit-transition"
          @input="onDisplayNameChange"
        />
      </b-field>

      <b-field :label="$t('Settings_ProfileAvatar')" class="wit-offset-bottom--none">
        <AvatarPicker :selected-avatar-id="accountSettings.avatarId" @change="onAvatarChange" />
      </b-field>
    </Card>

    <Card class="wit-offset-bottom--sm">
      <template #title>
        {{ $t('Settings_SteamSettings') }}
      </template>

      <b-field :label="$t('Settings_SteamTradeURL')" class="wit-offset-bottom--sm" :type="tradeUrlFieldType">
        <b-input :value="accountSettings.steamTradeLink" placeholder="https://steamcommunity.com/tradeoffer/new/?partner=XXXXXX&token=XXXXXX" custom-class="wit-transition" @input="onTradeLinkChange" />
      </b-field>

      <b-field class="wit-offset-bottom--none" :label="$t('Settings_IsGuardProtected')">
        <b-switch :value="accountSettings.isGuardProtected" @input="onGuardChange">
          {{ accountSettings.isGuardProtected ? $t('Yes') : $t('No') }}
        </b-switch>
      </b-field>
    </Card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/Card'
import AvatarPicker from '@/components/settings/AvatarPicker'
import TopTabs from '@/components/TopTabs'
import { User } from '@/store'
import { validateDisplayName, validatePassword, validateSteamTradeURL } from '@/shared'
import { showPopup } from '@/utils'

export default {
    name: 'AccountSettings',

    components: {
        Card,
        AvatarPicker
    },

    middleware: ['fetchUser'],

    props: {
        accountSettings: {
            required: true,
            type: Object
        },

        profile: {
            required: true,
            type: Object
        }
    },

    // data: () => ({
    //     login: '',
    //     password: '',
    //     displayName: '',
    //     steamTradeLink: '',
    //     isGuardProtected: true,
    //     avatarId: 1
    // }),

    computed: {
        hasLocalProfile () {
            return this.profile.hasLocalProfile
        },

        // isProfilePublic () {
        //     return this.profile.isPublic
        // },

        // hasTradeLink () {
        //     return !!this.profile.steamTradeLink
        // },

        tradeUrlFieldType () {
            return this.profile.steamTradeLink ? '' : 'is-danger'
        }
    },

    // created () {
    //     this.login = this.profile.login ?? ''
    //     this.displayName = this.profile.displayName ?? ''
    //     this.steamTradeLink = this.profile.steamTradeLink ?? ''
    //     this.isGuardProtected = this.profile.isGuardProtected
    //     this.avatarId = this.profile.avatarId
    // },

    methods: {
        onPasswordChange (password) {
            this._emitEvent({ password })
        },

        onDisplayNameChange (displayName) {
            this._emitEvent({ displayName })
        },

        onAvatarChange (avatarId) {
            this._emitEvent({ avatarId })
        },

        onTradeLinkChange (steamTradeLink) {
            this._emitEvent({ steamTradeLink })
        },

        onGuardChange (isGuardProtected) {
            this._emitEvent({ isGuardProtected })
        },

        _emitEvent (changedSettings) {
            this.$emit('change', {
                ...this.accountSettings,
                ...changedSettings
            })
        }

        // async updateSettings () {
        //     const errors = []
        //
        //     if (this.password) {
        //         errors.push(validatePassword(this.password))
        //     }
        //
        //     errors.push(
        //         validateDisplayName(this.displayName),
        //         validateSteamTradeURL(this.steamTradeLink)
        //     )
        //
        //     const firstError = errors.find(error => error !== null)
        //
        //     if (firstError) {
        //         return this.$showError(this.$t(firstError))
        //     }
        //
        //     try {
        //         const data = {
        //             displayName: this.displayName,
        //             steamTradeLink: this.steamTradeLink,
        //             isGuardProtected: this.isGuardProtected,
        //             avatarId: this.avatarId
        //         }
        //
        //         if (this.password) {
        //             data.password = this.password
        //         }
        //
        //         await this.$store.dispatch(User.F.Actions.UPDATE_SETTINGS, data)
        //         this.$showSuccess(this.$t('Settings_SettingsUpdated'))
        //
        //         this.password = ''
        //     } catch (error) {
        //         this.$showError(error)
        //     }
        // },
        //
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
        //
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
