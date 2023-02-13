<template>
    <div>
        <h1 class="wis-settings__section-title">
            <BurgerButton class="wis-settings__burger-button" @click="onBurgerClick" />
            {{ $t('Settings_Tabs_Account_Title') }}
        </h1>

        <h2 class="wis-settings__section-subtitle">
            {{ $t('Settings_ProfileSettingsAndAppearance') }}
        </h2>

        <div class="mb-4">
            <label for="displayName" class="w-full block mb-3">{{ $t('Settings_DisplayName') }}</label>

            <div class="field mb-2 p-input-icon-left w-full">
                <i class="pi pi-user" />
                <InputText
                    id="displayName"
                    v-model="accountSettings.displayName"
                    :placeholder="$t('Settings_DisplayNamePlaceholder')"
                    class="w-full"
                    maxlength="15"
                />
            </div>

            <small class="color-muted">{{ $t('Settings_DisplayNameFieldHint') }}</small>
        </div>

        <div class="mb-4">
            <label for="displayName" class="w-full block mb-3">{{ $t('Settings_ProfileAvatar') }}</label>
            <AvatarPicker :selected-avatar-id="accountSettings.avatarId" @change="onAvatarChange" />
        </div>

        <hr class="wis-settings__separator">

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

        <hr class="wis-settings__separator">

        <SettingsActions @update="saveAccountSettings" />
    </div>
</template>

<script setup>
// import AvatarPicker from '@/components/settings/AvatarPicker'
// import SettingsActions from '@/components/settings/SettingsActions.vue'
// import BurgerButton from '@/components/basic/BurgerButton.vue'

import { useCurrentUserStore } from '~/store/currentUser'

const { $t } = useTranslate()
const { showError, showSuccess } = useNotification()

const currentUserStore = useCurrentUserStore()
const user = computed(() => currentUserStore.currentUser)

const accountSettings = ref({
    displayName: user.value.displayName ?? '',
    steamTradeLink: user.value.steamTradeLink ?? '',
    isGuardProtected: user.value.isGuardProtected,
    avatarId: user.value.avatarId
})

const tradeUrlFieldType = computed(() => user.value.steamTradeLink ? '' : 'is-danger')

const onDisplayNameChange = displayName => (accountSettings.value.displayName = displayName)
const onAvatarChange = avatarId => (accountSettings.value.avatarId = avatarId)
const onTradeLinkChange = steamTradeLink => (accountSettings.value.steamTradeLink = steamTradeLink)
const onSteamGuardChange = isGuardProtected => (accountSettings.value.isGuardProtected = isGuardProtected)

const emit = defineEmits(['menu-opened'])
const onBurgerClick = () => emit('menu-opened')

const saveAccountSettings = () => {
    // store.dispatch('user/updateAccountSettings', accountSettings.value)
    //     .then(() => $showSuccess($t('Settings_SettingsUpdated')))
    //     .catch($showError)
}

// export default {
//     name: 'AccountSettings',
//
//     components: {
//         AvatarPicker,
//         SettingsActions,
//         BurgerButton
//     },
//
//     setup (_, { emit }) {
//         const { $showSuccess, $showError, $t } = useContext()
//         const store = useStore()
//         const user = computed(() => store.state.user.user)
//
//         const accountSettings = ref({
//             displayName: user.value.displayName ?? '',
//             steamTradeLink: user.value.steamTradeLink ?? '',
//             isGuardProtected: user.value.isGuardProtected,
//             avatarId: user.value.avatarId
//         })
//
//         const tradeUrlFieldType = computed(() => user.value.steamTradeLink ? '' : 'is-danger')
//
//         const onDisplayNameChange = displayName => accountSettings.value.displayName = displayName
//         const onAvatarChange = avatarId => accountSettings.value.avatarId = avatarId
//         const onTradeLinkChange = steamTradeLink => accountSettings.value.steamTradeLink = steamTradeLink
//         const onSteamGuardChange = isGuardProtected => accountSettings.value.isGuardProtected = isGuardProtected
//         const onBurgerClick = () => emit('menu-opened')
//
//         const saveAccountSettings = () => {
//             store.dispatch('user/updateAccountSettings', accountSettings.value)
//                 .then(() => $showSuccess($t('Settings_SettingsUpdated')))
//                 .catch($showError)
//         }
//
//         return {
//             accountSettings,
//             tradeUrlFieldType,
//             onDisplayNameChange,
//             onAvatarChange,
//             onTradeLinkChange,
//             onSteamGuardChange,
//             saveAccountSettings,
//             onBurgerClick
//         }
//     }
// }
</script>
