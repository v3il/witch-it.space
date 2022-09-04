<template>
  <div>
    <h1 class="wis-settings__section-title">
      <BurgerButton class="wis-settings__burger-button" @click="onBurgerClick" />
      {{ $t('Settings_Tabs_Account_Title') }}
    </h1>

    <h2 class="wis-settings__section-subtitle">
      {{ $t('Settings_ProfileSettingsAndAppearance') }}
    </h2>

    <b-field :label="$t('Settings_DisplayName')" class="wit-offset-bottom--md" :message="$t('Settings_DisplayNameFieldHint')">
      <b-input
        :value="accountSettings.displayName"
        maxlength="15"
        has-counter
        :placeholder="$t('Settings_DisplayNamePlaceholder')"
        icon="account"
        class="wis-input-right-icon wis-input--lg wis-input--transparent wit-offset-bottom--xxs"
        custom-class="wit-transition"
        @input="onDisplayNameChange"
      />
    </b-field>

    <b-field :label="$t('Settings_ProfileAvatar')" class="wit-offset-bottom--xlg">
      <AvatarPicker :selected-avatar-id="accountSettings.avatarId" @change="onAvatarChange" />
    </b-field>

    <h2 class="wis-settings__section-subtitle">
      {{ $t('Settings_SteamSettings') }}
    </h2>

    <b-field :label="$t('Settings_SteamTradeURL')" class="wit-offset-bottom--md" :type="tradeUrlFieldType">
      <b-input
        :value="accountSettings.steamTradeLink"
        placeholder="https://steamcommunity.com/tradeoffer/new/?partner=XXXXXX&token=XXXXXX"
        custom-class="wit-transition"
        icon="swap-vertical-circle-outline"
        class="wis-input-right-icon wis-input--lg wis-input--transparent wit-offset-bottom--xxs"
        @input="onTradeLinkChange"
      />
    </b-field>

    <label class="wit-flex wit-offset-bottom--lg">
      <span class="wit-flex__item--grow">{{ $t('Settings_IsGuardProtected') }}</span>
      <b-switch :value="accountSettings.isGuardProtected" class="wit-flex__item--no-shrink" @input="onSteamGuardChange" />
    </label>

    <SettingsActions @update="saveAccountSettings" />

    <hr class="wis-settings__separator">

    <DangerZone />
  </div>
</template>

<script>
import { computed, ref, useContext, useStore } from '@nuxtjs/composition-api'
import AvatarPicker from '@/components/settings/AvatarPicker'
import SettingsActions from '@/components/settings/SettingsActions.vue'
import DangerZone from '@/components/settings/DangerZone.vue'
import BurgerButton from '@/components/basic/BurgerButton.vue'

export default {
    name: 'AccountSettings',

    components: {
        AvatarPicker,
        SettingsActions,
        DangerZone,
        BurgerButton
    },

    setup (_, { emit }) {
        const { $showSuccess, $showError, $t } = useContext()
        const store = useStore()
        const user = computed(() => store.state.user.user)

        const accountSettings = ref({
            displayName: user.value.displayName ?? '',
            steamTradeLink: user.value.steamTradeLink ?? '',
            isGuardProtected: user.value.isGuardProtected,
            avatarId: user.value.avatarId
        })

        const tradeUrlFieldType = computed(() => user.value.steamTradeLink ? '' : 'is-danger')

        const onDisplayNameChange = displayName => accountSettings.value.displayName = displayName
        const onAvatarChange = avatarId => accountSettings.value.avatarId = avatarId
        const onTradeLinkChange = steamTradeLink => accountSettings.value.steamTradeLink = steamTradeLink
        const onSteamGuardChange = isGuardProtected => accountSettings.value.isGuardProtected = isGuardProtected
        const onBurgerClick = () => emit('menu-opened')

        const saveAccountSettings = () => {
            store.dispatch('user/updateAccountSettings', accountSettings.value)
                .then(() => $showSuccess($t('Settings_SettingsUpdated')))
                .catch($showError)
        }

        return {
            accountSettings,
            tradeUrlFieldType,
            onDisplayNameChange,
            onAvatarChange,
            onTradeLinkChange,
            onSteamGuardChange,
            saveAccountSettings,
            onBurgerClick
        }
    }
}
</script>
