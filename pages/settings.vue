<template>
  <div class="wit-settings">
    <div class="wit-flex wit-flex--justify-end wit-offset-bottom--sm">
      <b-field>
        <b-button type="is-primary" class="wit-offset-left--auto wit-block">
          Save changes
        </b-button>
      </b-field>
    </div>

    <Card class="wit-offset-bottom--sm">
      <template #title>
        Profile Settings and Appearance
      </template>

      <b-field class="wit-offset-bottom--sm">
        <template #label>
          <p class="wit-offset-bottom--xs">
            {{ $t('Login_LoginInputTitle') }}
          </p>
          <p v-if="!user.hasLocalProfile" class="wit-color--warning wit-font-size--xxs">
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
          <p v-if="!user.hasLocalProfile" class="wit-color--warning wit-font-size--xxs">
            {{ $t('Settings_NotAvailableWhenOauth') }}
          </p>
        </template>
        <b-input v-model="password" :disabled="!canEditPassword" :placeholder="$t('Login_PasswordInputPlaceholder')" custom-class="wit-transition" />
      </b-field>

      <b-field :label="$t('Login_PasswordInputTitle1')" class="wit-offset-bottom--sm">
        <b-input v-model="displayName" :placeholder="$t('Login_PasswordInputPlaceholder1')" custom-class="wit-transition" />
      </b-field>

      <b-field :label="$t('Login_PasswordInputTitle1')" class="wit-offset-bottom--none">
        <AvatarPicker v-model="avatarId" />
      </b-field>
    </Card>

    <Card class="wit-offset-bottom--sm">
      <template #title>
        Social Networks
      </template>

      <div class="wit-offset-bottom--sm wit-flex wit-flex--align-center wiz-border--bottom wit-padding-bottom--sm">
        <div class="wit-flex__item--grow">
          <strong class="wit-block wit-offset-bottom--xs">Steam</strong>
          <p>Hide profile</p>
        </div>

        <b-button v-if="user.isSteamConnected" type="is-danger is-light" class="wit-font-weight--700">
          Disconnect
        </b-button>

        <b-button v-else type="is-success is-light" class="wit-font-weight--700">
          Connect
        </b-button>
      </div>

      <div class="wit-offset-bottom--sm wit-flex wit-flex--align-center wiz-border--bottom wit-padding-bottom--sm">
        <div class="wit-flex__item--grow">
          <strong class="wit-block wit-offset-bottom--xs">Discord</strong>
          <p>Hide profile</p>
        </div>

        <b-button v-if="user.isDiscordConnected" type="is-danger is-light" class="wit-font-weight--700">
          Disconnect
        </b-button>

        <b-button v-else type="is-success is-light" class="wit-font-weight--700">
          Connect
        </b-button>
      </div>

      <div class="wit-flex wit-flex--align-center">
        <div class="wit-flex__item--grow">
          <strong class="wit-block wit-offset-bottom--xs">Google</strong>
          <p>Hide profile</p>
        </div>

        <b-button v-if="user.isGoogleConnected" type="is-danger is-light" class="wit-font-weight--700">
          Disconnect
        </b-button>

        <b-button v-else type="is-success is-light" class="wit-font-weight--700">
          Connect
        </b-button>
      </div>
    </Card>

    <Card class="wit-offset-bottom--sm">
      <template #title>
        Steam Settings
      </template>

      <b-field :label="$t('Login_PasswordInputTitle1')" class="wit-offset-bottom--sm">
        <b-input v-model="steamProfileUrl" :placeholder="$t('Login_PasswordInputPlaceholder1')" custom-class="wit-transition" />
      </b-field>

      <b-field :label="$t('Login_PasswordInputTitle1')" class="wit-offset-bottom--sm">
        <b-input v-model="steamTradeLink" :placeholder="$t('Login_PasswordInputPlaceholder1')" custom-class="wit-transition" />
      </b-field>

      <b-field class="wit-offset-bottom--none" :label="$t('Login_PasswordInputTitle1')">
        <b-switch v-model="isGuardProtected">
          {{ isGuardProtected ? 'Yes' : 'No' }}
        </b-switch>
      </b-field>
    </Card>

    <Card class="wit-offset-bottom--sm">
      <template #title>
        Discord Settings
      </template>

      <b-field :label="$t('Login_PasswordInputTitle1')">
        <b-input v-model="discordTag" :placeholder="$t('Login_PasswordInputPlaceholder')" custom-class="wit-transition" />
      </b-field>
    </Card>

    <div class="wit-flex wit-flex--justify-end wit-offset-bottom--lg">
      <b-field>
        <b-button type="is-primary" class="wit-offset-left--auto wit-block">
          Save changes
        </b-button>
      </b-field>
    </div>

    <Card class="wit-offset-bottom--sm" type="error">
      <template #title>
        Danger Zone
      </template>

      <div class="wit-offset-bottom--sm wit-flex wit-flex--align-center wiz-border--bottom wit-padding-bottom--sm">
        <div class="wit-flex__item--grow">
          <strong class="wit-block wit-offset-bottom--xs">Hide profile</strong>
          <p>Hide profile</p>
        </div>

        <b-button v-if="user.isActive" type="is-warning" class="wit-font-weight--700">
          Hide
        </b-button>

        <b-button v-else type="is-success" class="wit-font-weight--700">
          Unhide
        </b-button>
      </div>

      <div class="wit-flex wit-flex--align-center">
        <div class="wit-flex__item--grow">
          <strong class="wit-block wit-offset-bottom--xs">Delete profile</strong>
          <p>Hide profile</p>
        </div>

        <b-button type="is-danger" class="wit-font-weight--700">
          Delete
        </b-button>
      </div>
    </Card>

    <pre>
        {{ user }}
    </pre>
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

        canEditPassword () {
            return this.user.hasLocalProfile
        }
    },

    data () {
        return {
            login: '',
            password: '',
            discordTag: '',
            displayName: '',
            steamProfileUrl: '',
            steamTradeLink: '',
            isGuardProtected: true,
            avatarId: 1
        }
    },

    created () {
        // this.user = this.$store.state.user

        this.login = this.user.login
        this.discordTag = this.user.discordTag
        this.displayName = this.user.displayName
        this.steamProfileUrl = this.user.steamProfileUrl
        this.steamTradeLink = this.user.steamTradeLink
        this.isGuardProtected = this.user.isGuardProtected
        this.avatarId = this.user.avatarId

        // if (!this.user.isPasswordSet) {
        //     this.password = this.$t('Settings_NotAvailableInOauth')
        // }
        //
        // console.log(this.user.login)

        // console.log(this.$store)

        // this.$store.commit('add', 'Test')

        // console.log('Created')

        // console.log()
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
