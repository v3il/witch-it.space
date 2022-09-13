<template>
  <div class="wis-auth-panel">
    <AuthPanelLeft />
    <AuthPanelRight :mode="mode" class="wis-auth-panel__right" />
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'
import AuthForm from '@/components/auth/AuthForm.vue'
import Logo from '@/components/sidebar/components/Logo.vue'
import Socials from '@/components/auth/Socials.vue'
import AuthPanelLeft from '@/components/auth/AuthPanelLeft.vue'
import AuthPanelRight from '@/components/auth/AuthPanelRight.vue'

export default {
    name: 'AuthPanel',

    components: {
        Logo,
        AuthForm,
        Socials,
        AuthPanelLeft,
        AuthPanelRight
    },

    props: {
        mode: {
            required: true,
            type: String,
            validator: value => ['login', 'register'].includes(value)
        }
    },

    setup (props) {
        const login = ref('')
        const password = ref('')
        const confirmPassword = ref('')

        const isLogin = computed(() => props.mode === 'login')

        const onSubmit = () => {}

        return {
            login,
            password,
            confirmPassword,
            isLogin,
            onSubmit
        }
    }
}
</script>

<style scoped lang="scss">
.wis-auth-panel {
    max-width: 72rem;
    display: flex;
    flex-wrap: wrap;
    background-color: var(--card-bg-color);
    border-radius: 16px;
    width: 100%;
    overflow: hidden;

    @media (max-width: 1200px) {
        //flex-direction: column;
        max-width: 400px;
    }
}

//.wis-auth-panel__right {
//    padding: 4rem;
//}
//
//.wis-auth-panel__right-content {
//    width: 20rem;
//}
//
//.wis-auth-panel__logo {
//    display: block;
//    width: 100px;
//    border-radius: 8px;
//}
//
//.wis-auth-panel__title {
//    letter-spacing: -0.025em;
//    line-height: 1.25;
//    font-weight: 800;
//    font-size: 2rem;
//    margin-bottom: 8px;
//}
</style>
