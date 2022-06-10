<template>
  <div>
    <Card class="wit-offset-bottom--sm">
      <template #title>
        <h2 class="wit-font-size--sm wit-offset-bottom--sm">
          {{ $t('Settings_ProfileSettingsAndAppearance') }}
        </h2>
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

    <Card>
      <template #title>
        <h2 class="wit-font-size--sm wit-offset-bottom--sm">
          {{ $t('Settings_SteamSettings') }}
        </h2>
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
import Card from '@/components/basic/Card.vue'
import AvatarPicker from '@/components/settings/AvatarPicker'

export default {
    name: 'AccountSettings',

    components: {
        Card,
        AvatarPicker
    },

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

    computed: {
        hasLocalProfile () {
            return this.profile.hasLocalProfile
        },

        tradeUrlFieldType () {
            return this.profile.steamTradeLink ? '' : 'is-danger'
        }
    },

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
    }
}
</script>
