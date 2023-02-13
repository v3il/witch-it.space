<template>
    <Message
        severity="error"
        :closable="false"
        :icon="null"
        class="wis-settings-message wit-line-height--md wit-font-size--xs mt-0 mb-4"
    >
        <header class="wis-settings-message__header">
            <h3 class="font-normal">
                {{ $t('Settings_NotVerifiedAccountTitle') }}
            </h3>
        </header>

        <div class="wis-settings-message__content">
            <p class="color-white line-height-3 mb-2">
                {{ $t('Settings_NotVerifiedAccountMessage') }}
            </p>

            <ul class="wit-color--warning wit-settings__todo-list pl-3">
                <li v-if="!isSteamConnected">
                    {{ $t('Settings_NotVerifiedAccountTask1') }}
                </li>

                <li v-if="!hasTradeLink">
                    {{ $t('Settings_NotVerifiedAccountTask3') }}
                </li>
            </ul>
        </div>
    </Message>
</template>

<script setup>
import { useCurrentUserStore } from '~/store/currentUser'

const { $t } = useTranslate()

const currentUserStore = useCurrentUserStore()
const user = computed(() => currentUserStore.currentUser)

const isSteamConnected = computed(() => user.value.isSteamConnected)
const hasTradeLink = computed(() => !!user.value.steamTradeLink)
</script>

<style scoped lang="scss">
.wis-settings-message {
    background: #222736;
    border-width: 1px;
    border-color: var(--danger);
    padding-top: 0;

    :deep(.p-message-icon) {
        display: none;
    }

    :deep(.p-message-wrapper) {
        padding: 0;
    }
}

.wis-settings-message__header {
    background-color: var(--danger);
    padding: 12px 16px;
    color: var(--white);
    font-size: 14px;
}

.wis-settings-message__content {
    padding: 16px 24px;
    font-size: 16px;
}

.wit-settings__todo-list {
    list-style: decimal;
    line-height: var(--line-height-lg);
    color: var(--warning);
}
</style>
