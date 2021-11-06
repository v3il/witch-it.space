<template>
  <div class="wit-settings">
    <pre>
        {{ JSON.stringify(user, null, 4) }}
    </pre>

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
          autocomplete="off"
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

      <b-field :label="$t('Settings_SteamAccountURL')" class="wit-offset-bottom--sm">
        <b-input v-model="steamProfileUrl" placeholder="https://steamcommunity.com/id/XXXXX" custom-class="wit-transition" />
      </b-field>

      <b-field :label="$t('Settings_SteamTradeURL')" class="wit-offset-bottom--sm">
        <b-input v-model="steamTradeLink" placeholder="https://steamcommunity.com/tradeoffer/new/?partner=XXXXXX&token=XXXXXX" custom-class="wit-transition" />
      </b-field>

      <b-field class="wit-offset-bottom--none" :label="$t('Settings_IsGuardProtected')">
        <b-switch v-model="isGuardProtected">
          {{ isGuardProtected ? $t('Yes') : $t('No') }}
        </b-switch>
      </b-field>
    </Card>

    <Card class="wit-offset-bottom--sm">
      <template #title>
        {{ $t('Settings_DiscordSettings') }}
      </template>

      <b-field :label="$t('Settings_DiscordName')">
        <b-input v-model="discordTag" placeholder="XXXX#1234" custom-class="wit-transition" />
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
          {{ $t('Settings_MakePrivate') }}
        </b-button>

        <b-button v-else type="is-success" class="wit-font-weight--700" @click="toggleProfile">
          {{ $t('Settings_MakePublic') }}
        </b-button>
      </div>

      <div class="wit-flex wit-flex--align-center">
        <div class="wit-flex__item--grow">
          <strong class="wit-block wit-offset-bottom--xs">{{ $t('Settings_DeleteProfile') }}</strong>
          <p class="wit-color--danger">
            {{ $t('Settings_DeleteProfileHint') }}
          </p>
        </div>

        <b-button type="is-danger" class="wit-font-weight--700">
          {{ $t('Delete') }}
        </b-button>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/Card'
import { User } from '@/store'
import AvatarPicker from '@/components/settings/AvatarPicker'
import { validateDiscordTag, validateDisplayName, validatePassword, validateSteamTradeURL } from '@/shared/validators'
import { validateSteamAccountURL } from '@/shared/validators/validateSteamAccountURL'
import { Quest } from '@/store/Types'

export default {

    components: {
        Card,
        AvatarPicker
    },

    middleware: ['fetchUser'],

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ]),

        hasLocalProfile () {
            return this.user?.hasLocalProfile
        },

        isProfilePublic () {
            return this.user?.isPublic
        }
    },

    data: () => ({
        login: '',
        password: '',
        discordTag: '',
        displayName: '',
        steamProfileUrl: '',
        steamTradeLink: '',
        isGuardProtected: true,
        avatarId: 1
    }),

    created () {
        this.login = this.user.login ?? ''
        this.discordTag = this.user.discordTag ?? ''
        this.displayName = this.user.displayName ?? ''
        this.steamProfileUrl = this.user.steamProfileUrl ?? ''
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
                validateDiscordTag(this.discordTag),
                validateDisplayName(this.displayName),
                validateSteamAccountURL(this.steamProfileUrl),
                validateSteamTradeURL(this.steamTradeLink)
            )

            const firstError = errors.find(error => error !== null)

            if (firstError) {
                return this.$showError(this.$t(firstError))
            }

            try {
                const data = {
                    discordTag: this.discordTag,
                    displayName: this.displayName,
                    steamProfileUrl: this.steamProfileUrl,
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
                if (error) {
                    this.$showError(error.message)
                }
            }
        },

        async connectSocial (socialName) {
            try {
                await this.$store.dispatch(User.F.Actions.AUTH_USING_SOCIALS, socialName)
                this.$showSuccess(this.$t('Settings_AccountConnected'))
            } catch (error) {
                if (error) {
                    this.$showError(error.message)
                }
            }
        },

        disconnectSocial (socialName) {
            this.$buefy.dialog.confirm({
                title: this.$t('Settings_DisconnectSocialTitle'),
                message: this.$t('Settings_WannaDisconnectSocial'),
                confirmText: this.$t('Settings_DisconnectSocialConfirmButtonTitle'),
                cancelText: this.$t('Quests_CancelButtonTitle'),
                onConfirm: async () => {
                    try {
                        await this.$store.dispatch(User.F.Actions.DISCONNECT_SOCIAL, socialName)
                        this.$showSuccess(this.$t('Settings_AccountDisconnected'))
                    } catch (error) {
                        if (error) {
                            this.$showError(error.message)
                        }
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
                this.$showSuccess(this.$t('Settings_ProfileIsPublic'))
            } catch (error) {
                if (error) {
                    this.$showError(error.message)
                }
            }
        },

        async makeProfilePrivate () {
            try {
                await this.$store.dispatch(User.F.Actions.TOGGLE_PROFILE, false)
                this.$showSuccess(this.$t('Settings_ProfileIsPrivate'))
            } catch (error) {
                if (error) {
                    this.$showError(error.message)
                }
            }

            // this.$buefy.dialog.confirm({
            //     title: this.$t('Settings_DisconnectSocialTitle'),
            //     message: this.$t('Settings_WannaDisconnectSocial'),
            //     confirmText: this.$t('Settings_DisconnectSocialConfirmButtonTitle'),
            //     cancelText: this.$t('Quests_CancelButtonTitle'),
            //     onConfirm: async () => {
            //         try {
            //             await this.$store.dispatch(User.F.Actions.DISCONNECT_SOCIAL, socialName)
            //             this.$showSuccess(this.$t('Settings_AccountDisconnected'))
            //         } catch (error) {
            //             if (error) {
            //                 this.$showError(error.message)
            //             }
            //         }
            //     }
            // })
        }
    }
}
</script>

<style scoped lang="scss">
.wit-settings {
    padding: var(--offset-lg) 0 var(--offset-sm);
    max-width: 800px;
    margin: 0 auto;
}

.wit-settings__sticky-panel {
    position: sticky;
    top: var(--header-height);
    z-index: 2;
    background: var(--body-bg);
    padding: var(--offset-sm) 0;
}
</style>
