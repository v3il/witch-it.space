<template>
    <div>
        <h1 class="wis-settings__section-title">
            <BurgerButton class="wis-settings__burger-button" @click="onBurgerClick" />
            {{ $t('Settings_AccountActions') }}
        </h1>

        <DangerZone />
    </div>
</template>

<script setup>
const emit = defineEmits(['menu-opened'])

const onBurgerClick = () => emit('menu-opened')

const { $t } = useTranslate()
</script>
