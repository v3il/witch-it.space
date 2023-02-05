<template>
    <form @submit.prevent="onSubmit">
        <label for="username" class="w-full block mb-2">{{ $t('Login_LoginInputTitle') }}</label>
        <InputText
            id="username"
            v-model="login"
            type="text"
            :placeholder="$t('Login_LoginInputPlaceholder')"
            class="w-full mb-4"
        />

        <label for="password" class="w-full block mb-2">{{ $t('Login_PasswordInputTitle') }}</label>
        <InputText
            id="password"
            v-model="password"
            type="password"
            :placeholder="$t('Login_PasswordInputPlaceholder')"
            class="w-full mb-4"
        />

        <template v-if="!isLogin">
            <label for="confirm-password" class="w-full block mb-2">{{ $t('Register_RepeatPassword') }}</label>
            <InputText
                id="confirm-password"
                v-model="confirmPassword"
                type="password"
                :placeholder="$t('Login_PasswordInputPlaceholder')"
                class="w-full mb-4"
            />
        </template>

        <Button type="submit" class="p-button-raised p-button-rounded w-full justify-content-center">
            {{ buttonText }}
        </Button>
    </form>
</template>

<script setup>
const { $t } = useTranslate()
// const store = useStore()
const router = useRouter()

const props = defineProps({
    mode: {
        required: true,
        type: String,
        validator: value => ['login', 'register'].includes(value)
    }
})

const login = ref('')
const password = ref('')
const confirmPassword = ref('')

const isLogin = computed(() => props.mode === 'login')
const buttonText = computed(() => isLogin.value ? $t('SignIn') : $t('CreateYourAccount'))

const triggerLogin = () => {
    // const loginError = validateLogin(login.value)
    //
    // if (loginError) {
    //     return $showError($t(loginError))
    // }
    //
    // const passwordError = validatePassword(password.value)
    //
    // if (passwordError) {
    //     return $showError($t(passwordError))
    // }
    //
    // store.dispatch('user/login', { login: login.value, password: password.value })
    //     .then(() => router.replace(Routes.MAIN))
    //     .catch(error => $showError(error.message))
}

const triggerRegister = () => {
    // const loginError = validateLogin(login.value)
    //
    // if (loginError) {
    //     return $showError($t(loginError))
    // }
    //
    // const passwordError = validatePassword(password.value)
    //
    // if (passwordError) {
    //     return $showError($t(passwordError))
    // }
    //
    // if (password.value !== confirmPassword.value) {
    //     return $showError($t('Error_PasswordsAreNotIdentical'))
    // }
    //
    // store.dispatch('user/register', { login: login.value, password: password.value })
    //     .then(() => router.replace(Routes.MAIN))
    //     .catch(error => $showError(error.message))
}

const onSubmit = () => isLogin.value ? triggerLogin() : triggerRegister()

// import { computed, ref, useContext, useRouter, useStore } from '@nuxtjs/composition-api'
// import { Routes, validateLogin, validatePassword } from '@/shared/index.js'
//
// export default {
//     name: 'AuthForm',
//
//     props: {
//         mode: {
//             required: true,
//             type: String,
//             validator: value => ['login', 'register'].includes(value)
//         }
//     },
//
//     setup (props) {
//         const { $t, $showError } = useContext()
//         const store = useStore()
//         const router = useRouter()
//
//         const login = ref('')
//         const password = ref('')
//         const confirmPassword = ref('')
//
//         const isLogin = computed(() => props.mode === 'login')
//         const buttonText = computed(() => isLogin.value ? $t('SignIn') : $t('CreateYourAccount'))
//
//         const triggerLogin = () => {
//             const loginError = validateLogin(login.value)
//
//             if (loginError) {
//                 return $showError($t(loginError))
//             }
//
//             const passwordError = validatePassword(password.value)
//
//             if (passwordError) {
//                 return $showError($t(passwordError))
//             }
//
//             store.dispatch('user/login', { login: login.value, password: password.value })
//                 .then(() => router.replace(Routes.MAIN))
//                 .catch(error => $showError(error.message))
//         }
//
//         const triggerRegister = () => {
//             const loginError = validateLogin(login.value)
//
//             if (loginError) {
//                 return $showError($t(loginError))
//             }
//
//             const passwordError = validatePassword(password.value)
//
//             if (passwordError) {
//                 return $showError($t(passwordError))
//             }
//
//             if (password.value !== confirmPassword.value) {
//                 return $showError($t('Error_PasswordsAreNotIdentical'))
//             }
//
//             store.dispatch('user/register', { login: login.value, password: password.value })
//                 .then(() => router.replace(Routes.MAIN))
//                 .catch(error => $showError(error.message))
//         }
//
//         const onSubmit = () => isLogin.value ? triggerLogin() : triggerRegister()
//
//         return {
//             login,
//             password,
//             confirmPassword,
//             isLogin,
//             buttonText,
//             onSubmit
//         }
//     }
// }
</script>
