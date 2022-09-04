<template>
  <div>
    <h1 class="wis-settings__section-title">
      <BurgerButton class="wis-settings__burger-button" @click="onBurgerClick" />
      {{ $t('Settings_Tabs_Security_Title') }}
    </h1>

    <h2 class="wis-settings__section-subtitle">
      {{ $t('Settings_LoginAndPassword') }}
    </h2>

    <b-field class="wit-offset-bottom--md" :label="$t('Login_LoginInputTitle')">
      <b-input
        :value="securitySettings.login"
        disabled
        type="text"
        icon="account"
        :placeholder="$t('Login_LoginInputPlaceholder')"
        class="wis-input-right-icon wis-input--lg wis-input--transparent wit-offset-bottom--xxs"
        custom-class="wit-transition"
      />
    </b-field>

    <b-field :label="$t('Login_PasswordInputTitle')" class="wit-offset-bottom--md" :message="$t('Register_PasswordInputHelp')">
      <template #label>
        <p class="wit-offset-bottom--xs">
          {{ $t('Login_PasswordInputTitle') }}
        </p>

        <p v-if="!hasLocalProfile" class="wit-color--warning wit-font-size--xxs wit-line-height--sm">
          {{ $t('Settings_NotSetWhenOauth') }}
        </p>
      </template>

      <b-input
        :value="securitySettings.password"
        type="password"
        autocomplete="new-password"
        :disabled="!hasLocalProfile"
        :placeholder="$t('Login_PasswordInputPlaceholder')"
        class="wis-input-right-icon wis-input--lg wis-input--transparent wit-offset-bottom--xxs"
        custom-class="wit-transition"
        icon="form-textbox-password"
        @input="onPasswordChange"
      />
    </b-field>

    <SettingsActions @update="saveAccountSettings" />

    <hr class="wis-settings__separator">

    <h2 class="wis-settings__section-subtitle">
      {{ $t('Settings_SocialNetworks') }}
    </h2>

    <p class="wit-color--muted wit-offset-bottom--lg wit-line-height--md">
      {{ $t('Settings_ConnectSocialDescription') }}
    </p>

    <SocialNetworks />
  </div>
</template>

<script>
import { computed, ref, useContext, useStore } from '@nuxtjs/composition-api'
import SettingsActions from '@/components/settings/SettingsActions.vue'
import SocialNetworks from '@/components/settings/SocialNetworks.vue'
import BurgerButton from '@/components/basic/BurgerButton.vue'

export default {
    name: 'SecuritySettings',

    components: {
        SettingsActions,
        SocialNetworks,
        BurgerButton
    },

    setup (_, { emit }) {
        const { $showSuccess, $showError, $t } = useContext()
        const store = useStore()
        const user = computed(() => store.state.user.user)
        const hasLocalProfile = computed(() => user.value.hasLocalProfile)

        const securitySettings = ref({
            login: user.value.login ?? '',
            password: ''
        })

        const onPasswordChange = password => securitySettings.value.password = password
        const onBurgerClick = () => emit('menu-opened')

        const saveAccountSettings = () => {
            store.dispatch('user/updateSecuritySettings', securitySettings.value)
                .then(() => $showSuccess($t('Settings_SettingsUpdated')))
                .catch($showError)
        }

        return {
            securitySettings,
            hasLocalProfile,
            onPasswordChange,
            saveAccountSettings,
            onBurgerClick
        }
    }
}
</script>
