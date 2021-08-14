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
      <b-message
        v-if="!user.isVerified"
        :title="$t('Settings_NotVerifiedAccountTitle')"
        type="is-danger"
        :closable="false"
        class="wis-settings-message wit-line-height--md wit-offset-bottom--none"
        aria-close-label="Close message"
      >
        <p class="wit-color--white wit-offset-bottom--xs" v-html="$t('Settings_NotVerifiedAccountMessage')" />

        <ul class="wit-color--warning wit-settings__todo-list">
          <li v-if="!user.isSteamConnected">
            {{ $t('Settings_NotVerifiedAccountTask1') }}
          </li>
          <li v-if="!user.isDiscordConnected">
            {{ $t('Settings_NotVerifiedAccountTask2') }}
          </li>
          <li v-if="!hasTradeLink">
            {{ $t('Settings_NotVerifiedAccountTask3') }}
          </li>
        </ul>
      </b-message>

      <div class="wit-flex wit-flex--justify-end wit-settings__sticky-panel">
        <b-field>
          <b-button type="is-primary" class="wit-offset-left--auto wit-block" @click="updateSettings">
            {{ $t('Settings_Save') }}
          </b-button>
        </b-field>
      </div>

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
            :value="login"
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
            v-model="password"
            type="password"
            autocomplete="new-password"
            :disabled="!hasLocalProfile"
            :placeholder="$t('Login_PasswordInputPlaceholder')"
            custom-class="wit-transition"
          />
        </b-field>

        <b-field :label="$t('Settings_DisplayName')" class="wit-offset-bottom--sm" :message="$t('Settings_DisplayNameFieldHint')">
          <b-input v-model="displayName" maxlength="20" has-counter :placeholder="$t('Settings_DisplayNamePlaceholder')" custom-class="wit-transition" />
        </b-field>

        <b-field :label="$t('Settings_ProfileAvatar')" class="wit-offset-bottom--none">
          <AvatarPicker v-model="avatarId" />
        </b-field>
      </Card>

      <Card class="wit-offset-bottom--sm">
        <template #title>
          {{ $t('Settings_SteamSettings') }}
        </template>

        <b-field :label="$t('Settings_SteamTradeURL')" class="wit-offset-bottom--sm" :type="hasTradeLink ? '' : 'is-danger'">
          <b-input v-model="steamTradeLink" placeholder="https://steamcommunity.com/tradeoffer/new/?partner=XXXXXX&token=XXXXXX" custom-class="wit-transition" />
        </b-field>

        <b-field class="wit-offset-bottom--none" :label="$t('Settings_IsGuardProtected')">
          <b-switch v-model="isGuardProtected">
            {{ isGuardProtected ? $t('Yes') : $t('No') }}
          </b-switch>
        </b-field>
      </Card>

      <Card class="wit-offset-bottom--xlg">
        <template #title>
          {{ $t('Settings_SocialNetworks') }}
        </template>

        <template #description>
          <p>{{ $t('Settings_ConnectSocialDescription') }}</p>
        </template>

        <div class="wit-offset-bottom--sm wit-flex wit-flex--align-center wiz-border--bottom wit-padding-bottom--sm">
          <div class="wit-flex__item--grow">
            <strong class="wit-block wit-offset-bottom--xs">Steam</strong>
            <p v-if="user.isSteamConnected" class="wit-color--success">
              {{ $t('Settings_ProfileIsConnected') }}
            </p>
            <p v-else class="wit-color--warning">
              {{ $t('Settings_ProfileIsNotConnected') }}
            </p>
          </div>

          <b-button v-if="user.isSteamConnected" type="is-danger is-light" class="wit-font-weight--700" @click="disconnectSocial('steam')">
            {{ $t('Settings_Disconnect') }}
          </b-button>

          <b-button v-else type="is-success is-light" class="wit-font-weight--700" @click="connectSocial('steam')">
            {{ $t('Settings_Connect') }}
          </b-button>
        </div>

        <div class="wit-offset-bottom--sm wit-flex wit-flex--align-center wiz-border--bottom wit-padding-bottom--sm">
          <div class="wit-flex__item--grow">
            <strong class="wit-block wit-offset-bottom--xs">Discord</strong>
            <p v-if="user.isDiscordConnected" class="wit-color--success">
              {{ $t('Settings_ProfileIsConnected') }}
            </p>
            <p v-else class="wit-color--warning">
              {{ $t('Settings_ProfileIsNotConnected') }}
            </p>
          </div>

          <b-button v-if="user.isDiscordConnected" type="is-danger is-light" class="wit-font-weight--700" @click="disconnectSocial('discord')">
            {{ $t('Settings_Disconnect') }}
          </b-button>

          <b-button v-else type="is-success is-light" class="wit-font-weight--700" @click="connectSocial('discord')">
            {{ $t('Settings_Connect') }}
          </b-button>
        </div>

        <div class="wit-flex wit-flex--align-center">
          <div class="wit-flex__item--grow">
            <strong class="wit-block wit-offset-bottom--xs">Google</strong>
            <p v-if="user.isGoogleConnected" class="wit-color--success">
              {{ $t('Settings_ProfileIsConnected') }}
            </p>
            <p v-else class="wit-color--warning">
              {{ $t('Settings_ProfileIsNotConnected') }}
            </p>
          </div>

          <b-button v-if="user.isGoogleConnected" type="is-danger is-light" class="wit-font-weight--700" @click="disconnectSocial('google')">
            {{ $t('Settings_Disconnect') }}
          </b-button>

          <b-button v-else type="is-success is-light" class="wit-font-weight--700" @click="connectSocial('google')">
            {{ $t('Settings_Connect') }}
          </b-button>
        </div>
      </Card>

      <Card type="error">
        <template #title>
          {{ $t('Settings_DangerZone') }}
        </template>

        <div class="wit-offset-bottom--sm wit-flex wit-flex--align-center wiz-border--bottom wit-padding-bottom--sm">
          <div class="wit-flex__item--grow">
            <strong class="wit-block wit-offset-bottom--xs">{{ $t('Settings_HideProfile') }}</strong>
            <p v-if="isProfilePublic" class="wit-color--success">
              {{ $t('Settings_ProfileIsVisible') }}
            </p>
            <p v-else class="wit-color--warning">
              {{ $t('Settings_ProfileIsHidden') }}
            </p>
          </div>

          <b-button v-if="isProfilePublic" type="is-warning" class="wit-font-weight--700" @click="toggleProfile">
            {{ $t('Change') }}
          </b-button>

          <b-button v-else type="is-success" class="wit-font-weight--700" @click="toggleProfile">
            {{ $t('Change') }}
          </b-button>
        </div>

        <div class="wit-flex wit-flex--align-center">
          <div class="wit-flex__item--grow">
            <strong class="wit-block wit-offset-bottom--xs">{{ $t('Settings_DeleteProfile') }}</strong>
            <p class="wit-color--danger">
              {{ $t('Settings_DeleteProfileHint') }}
            </p>
          </div>

          <b-button type="is-danger" class="wit-font-weight--700" @click="deleteProfile">
            {{ $t('Delete') }}
          </b-button>
        </div>
      </Card>
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

const Modes = {
    ACCOUNT: 'account',
    MARKET: 'market'
}

export default {
    modes: Object.values(Modes),

    components: {
        Card,
        AvatarPicker,
        TopTabs
    },

    middleware: ['fetchUser'],

    data: () => ({
        login: '',
        password: '',
        displayName: '',
        steamTradeLink: '',
        isGuardProtected: true,
        avatarId: 1,
        mode: Modes.ACCOUNT
    }),

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ]),

        hasLocalProfile () {
            return this.user.hasLocalProfile
        },

        isProfilePublic () {
            return this.user.isPublic
        },

        hasTradeLink () {
            return !!this.user.steamTradeLink
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
        },

        async connectSocial (socialName) {
            try {
                await this.$store.dispatch(User.F.Actions.AUTH_USING_SOCIALS, socialName)
                this.$showSuccess(this.$t('Settings_AccountConnected'))
            } catch (error) {
                this.$showError(error)
            }
        },

        disconnectSocial (socialName) {
            showPopup(this, {
                title: this.$t('Settings_DisconnectSocialTitle'),
                message: this.$t('Settings_WannaDisconnectSocial'),
                confirmText: this.$t('Confirm'),
                cancelText: this.$t('Cancel'),
                onConfirm: async () => {
                    try {
                        await this.$store.dispatch(User.F.Actions.DISCONNECT_SOCIAL, socialName)
                        this.$showSuccess(this.$t('Settings_AccountDisconnected'))
                    } catch (error) {
                        this.$showError(error)
                    }
                }
            })
        },

        toggleProfile () {
            this.isProfilePublic ? this.makeProfilePrivate() : this.makeProfilePublic()
        },

        async makeProfilePublic () {
            try {
                await this.$store.dispatch(User.F.Actions.TOGGLE_PROFILE, true)
                this.$showSuccess(this.$t('Settings_ProfileVisibilityChanged'))
            } catch (error) {
                this.$showError(error)
            }
        },

        makeProfilePrivate () {
            showPopup(this, {
                title: this.$t('Settings_MakePrivatePopupTitle'),
                message: this.$t('Settings_WannaMakePrivate'),
                confirmText: this.$t('Confirm'),
                cancelText: this.$t('Cancel'),
                onConfirm: async () => {
                    try {
                        await this.$store.dispatch(User.F.Actions.TOGGLE_PROFILE, false)
                        this.$showSuccess(this.$t('Settings_ProfileVisibilityChanged'))
                    } catch (error) {
                        this.$showError(error)
                    }
                }
            })
        },

        deleteProfile () {
            showPopup(this, {
                title: this.$t('Settings_RemoveProfileTitle'),
                message: this.$t('Settings_WannaRemoveProfile'),
                confirmText: this.$t('Confirm'),
                cancelText: this.$t('Cancel'),
                onConfirm: () => {
                    this.$store.dispatch(User.F.Actions.REMOVE_PROFILE).catch(this.$showError)
                }
            })
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

.wit-settings__sticky-panel {
    position: sticky;
    top: calc(var(--header-height) - 1px);
    z-index: 2;
    background: var(--body-bg);
    padding: var(--offset-sm) 0;
}

.wit-settings__todo-list {
    list-style: decimal;
    margin-left: var(--offset-sm);
}
</style>
