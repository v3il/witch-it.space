<template>
  <div class="wit-settings">
    <div class="wit-flex wit-flex--justify-end wit-offset-bottom--sm">
      <b-field>
        <b-button type="is-primary" class="wit-offset-left--auto wit-block">
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
          v-model="login"
          disabled
          autocomplete="off"
          type="text"
          :placeholder="$t('Login_LoginInputPlaceholder')"
          custom-class="wit-transition"
        />
      </b-field>

      <b-field :label="$t('Login_PasswordInputTitle')" class="wit-offset-bottom--sm">
        <template #label>
          <p class="wit-offset-bottom--xs">
            {{ $t('Login_PasswordInputTitle') }}
          </p>
          <p v-if="!hasLocalProfile" class="wit-color--warning wit-font-size--xxs">
            {{ $t('Settings_NotSetWhenOauth') }}
          </p>
        </template>
        <b-input v-model="password" :disabled="!hasLocalProfile" :placeholder="$t('Login_PasswordInputPlaceholder')" custom-class="wit-transition" />
      </b-field>

      <b-field :label="$t('Settings_DisplayName')" class="wit-offset-bottom--sm">
        <b-input v-model="displayName" :placeholder="$t('Settings_DisplayNamePlaceholder')" custom-class="wit-transition" />
      </b-field>

      <b-field :label="$t('Settings_ProfileAvatar')" class="wit-offset-bottom--none">
        <AvatarPicker v-model="avatarId" />
      </b-field>
    </Card>

    <Card class="wit-offset-bottom--sm">
      <template #title>
        {{ $t('Settings_SocialNetworks') }}
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

        <b-button v-if="user.isSteamConnected" type="is-danger is-light" class="wit-font-weight--700">
          {{ $t('Settings_Disconnect') }}
        </b-button>

        <b-button v-else type="is-success is-light" class="wit-font-weight--700">
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

        <b-button v-if="user.isDiscordConnected" type="is-danger is-light" class="wit-font-weight--700">
          {{ $t('Settings_Disconnect') }}
        </b-button>

        <b-button v-else type="is-success is-light" class="wit-font-weight--700">
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

        <b-button v-if="user.isGoogleConnected" type="is-danger is-light" class="wit-font-weight--700">
          {{ $t('Settings_Disconnect') }}
        </b-button>

        <b-button v-else type="is-success is-light" class="wit-font-weight--700">
          {{ $t('Settings_Connect') }}
        </b-button>
      </div>
    </Card>

    <Card class="wit-offset-bottom--sm">
      <template #title>
        {{ $t('Settings_SteamSettings') }}
      </template>

      <b-field :label="$t('Settings_SteamAccountURL')" class="wit-offset-bottom--sm">
        <b-input v-model="steamProfileUrl" :placeholder="$t('Settings_SteamAccountURLPlaceholder')" custom-class="wit-transition" />
      </b-field>

      <b-field :label="$t('Settings_SteamTradeURL')" class="wit-offset-bottom--sm">
        <b-input v-model="steamTradeLink" :placeholder="$t('Settings_SteamTradeURLPlaceholder')" custom-class="wit-transition" />
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
        <b-input v-model="discordTag" :placeholder="$t('Settings_DiscordNamePlaceholder')" custom-class="wit-transition" />
      </b-field>
    </Card>

    <div class="wit-flex wit-flex--justify-end wit-offset-bottom--lg">
      <b-field>
        <b-button type="is-primary" class="wit-offset-left--auto wit-block">
          {{ $t('Settings_Save') }}
        </b-button>
      </b-field>
    </div>

    <Card class="wit-offset-bottom--sm" type="error">
      <template #title>
        {{ $t('Settings_DangerZone') }}
      </template>

      <div class="wit-offset-bottom--sm wit-flex wit-flex--align-center wiz-border--bottom wit-padding-bottom--sm">
        <div class="wit-flex__item--grow">
          <strong class="wit-block wit-offset-bottom--xs">{{ $t('Settings_HideProfile') }}</strong>
          <p v-if="user.isActive" class="wit-color--success">
            {{ $t('Settings_ProfileIsVisible') }}
          </p>
          <p v-else class="wit-color--warning">
            {{ $t('Settings_ProfileIsHidden') }}
          </p>
        </div>

        <b-button v-if="user.isActive" type="is-warning" class="wit-font-weight--700">
          {{ $t('Hide') }}
        </b-button>

        <b-button v-else type="is-success" class="wit-font-weight--700">
          {{ $t('Unhide') }}
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
            return this.user.hasLocalProfile
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
        this.login = this.user.login
        this.discordTag = this.user.discordTag
        this.displayName = this.user.displayName
        this.steamProfileUrl = this.user.steamProfileUrl
        this.steamTradeLink = this.user.steamTradeLink
        this.isGuardProtected = this.user.isGuardProtected
        this.avatarId = this.user.avatarId
    },

    methods: {
        onSubmit () {

        }
    }
}
</script>

<style scoped lang="scss">
.wit-settings {
    padding: var(--offset-xxlg) 0;
    max-width: 800px;
    margin: 0 auto;
}
</style>
