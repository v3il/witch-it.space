<template>
  <div class="wis-auth-panel">
    <AuthPanelLeft />
    <AuthPanelRight :mode="mode" class="wis-auth-panel__right" />
  </div>
</template>

<script>
import AuthPanelLeft from '@/components/auth/AuthPanelLeft.vue'
import AuthPanelRight from '@/components/auth/AuthPanelRight.vue'

export default {
    name: 'AuthPanel',

    components: {
        AuthPanelLeft,
        AuthPanelRight
    },

    props: {
        mode: {
            required: true,
            type: String,
            validator: value => ['login', 'register'].includes(value)
        }
    }
}
</script>

<style scoped lang="scss">
.wis-auth-panel {
    max-width: 66rem;
    display: flex;
    flex-wrap: wrap;
    background-color: var(--card-bg-color);
    border-radius: 16px;
    width: 100%;
    overflow: hidden;

    @media (max-width: 1200px) {
        max-width: 400px;
    }
}
</style>
