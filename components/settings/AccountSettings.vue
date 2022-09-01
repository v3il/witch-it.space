<template>
  <div>
    <!--    <Card class="wit-offset-bottom&#45;&#45;sm">-->
    <!--      <template #title>-->

    <h1 class="wit-font-size--lg wit-line-height--xxs wit-font-weight--700 wit-offset-bottom--lg">
      {{ $t('Settings_Tabs_Account_Title') }}
    </h1>

    <h2 class="wit-offset-bottom--xs wit-font-weight--400" style="font-size: 1.125rem;">
      {{ $t('Settings_ProfileSettingsAndAppearance') }}
    </h2>

    <p class="wit-offset-bottom--lg wit-color--muted">
      Following information is publicly displayed, be careful!
    </p>
    <!--      </template>-->

    <!--    <b-field class="wit-offset-bottom&#45;&#45;sm">-->
    <!--      <template #label>-->
    <!--        <p class="wit-offset-bottom&#45;&#45;xs">-->
    <!--          {{ $t('Login_LoginInputTitle') }}-->
    <!--        </p>-->

    <!--        <p v-if="!hasLocalProfile" class="wit-color&#45;&#45;warning wit-font-size&#45;&#45;xxs">-->
    <!--          {{ $t('Settings_NotSetWhenOauth') }}-->
    <!--        </p>-->
    <!--      </template>-->

    <!--      <b-input-->
    <!--        :value="settings.login"-->
    <!--        disabled-->
    <!--        type="text"-->
    <!--        :placeholder="$t('Login_LoginInputPlaceholder')"-->
    <!--        custom-class="wit-transition"-->
    <!--      />-->
    <!--    </b-field>-->

    <!--    <b-field :label="$t('Login_PasswordInputTitle')" class="wit-offset-bottom&#45;&#45;sm" :message="$t('Register_PasswordInputHelp')">-->
    <!--      <template #label>-->
    <!--        <p class="wit-offset-bottom&#45;&#45;xs">-->
    <!--          {{ $t('Login_PasswordInputTitle') }}-->
    <!--        </p>-->

    <!--        <p v-if="hasLocalProfile" class="wit-color&#45;&#45;warning wit-font-size&#45;&#45;xxs">-->
    <!--          {{ $t('Settings_PasswordFieldHint') }}-->
    <!--        </p>-->

    <!--        <p v-else class="wit-color&#45;&#45;warning wit-font-size&#45;&#45;xxs">-->
    <!--          {{ $t('Settings_NotSetWhenOauth') }}-->
    <!--        </p>-->
    <!--      </template>-->

    <!--      <b-input-->
    <!--        :value="settings.password"-->
    <!--        type="password"-->
    <!--        autocomplete="new-password"-->
    <!--        :disabled="!hasLocalProfile"-->
    <!--        :placeholder="$t('Login_PasswordInputPlaceholder')"-->
    <!--        custom-class="wit-transition"-->
    <!--        @input="onPasswordChange"-->
    <!--      />-->
    <!--    </b-field>-->

    <b-field :label="$t('Settings_DisplayName')" class="wit-offset-bottom--lg" :message="$t('Settings_DisplayNameFieldHint')">
      <b-input
        :value="settings.displayName"
        maxlength="15"
        has-counter
        :placeholder="$t('Settings_DisplayNamePlaceholder')"
        custom-class="wit-transition"
        @input="onDisplayNameChange"
      />
    </b-field>

    <b-field :label="$t('Settings_ProfileAvatar')" class="wit-offset-bottom--xxlg">
      <AvatarPicker :selected-avatar-id="settings.avatarId" @change="onAvatarChange" />
    </b-field>

    <hr>
    <!--    </Card>-->

    <!--    <Card>-->
    <!--      <template #title>-->
    <h2 class="wit-font-size--sm wit-offset-bottom--lg">
      {{ $t('Settings_SteamSettings') }}
    </h2>
    <!--      </template>-->

    <b-field :label="$t('Settings_SteamTradeURL')" class="wit-offset-bottom--lg" :type="tradeUrlFieldType">
      <b-input :value="settings.steamTradeLink" placeholder="https://steamcommunity.com/tradeoffer/new/?partner=XXXXXX&token=XXXXXX" custom-class="wit-transition" @input="onTradeLinkChange" />
    </b-field>

    <b-field class="wit-offset-bottom--none" :label="$t('Settings_IsGuardProtected')">
      <b-switch :value="settings.isGuardProtected" @input="onGuardChange">
        {{ settings.isGuardProtected ? $t('Yes') : $t('No') }}
      </b-switch>
    </b-field>
    <!--    </Card>-->
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
        settings: {
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
                ...this.settings,
                ...changedSettings
            })
        }
    }
}
</script>
