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

        <div class="field mb-4">
            <label for="password" class="w-full block mb-2">{{ $t('Login_PasswordInputTitle') }}</label>
            <InputText
                id="password"
                v-model="password"
                type="password"
                :placeholder="$t('Login_PasswordInputPlaceholder')"
                class="w-full mb-2"
            />
            <small class="color-muted">{{ $t('Register_PasswordInputHelp') }}</small>
        </div>

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
import { Routes } from '~/shared/Routes'
import { useCurrentUserStore } from '~/store/currentUser'

const { $t } = useTranslate()
const router = useRouter()
const { showError } = useNotification()
const { validatePassword, validateLogin } = useValidators()
const { $authService } = useNuxtApp()
const currentUserStore = useCurrentUserStore()

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

const triggerLogin = async () => {
    const isValidLogin = validateLogin(login.value)

    if (!isValidLogin) {
        return showError({
            description: $t('Error_LoginIsTooShort')
        })
    }

    const isValidPassword = validatePassword(password.value)

    if (!isValidPassword) {
        return showError({
            description: $t('Error_InvalidPassword')
        })
    }

    const { error } = await $authService.login({ login: login.value, password: password.value })

    if (error.value) {
        return showError({ description: error.value.data.message })
    }

    await currentUserStore.fetchMyProfile()

    router.replace(Routes.MAIN)
}

const triggerRegister = async () => {
    const isValidLogin = validateLogin(login.value)

    if (!isValidLogin) {
        return showError({
            description: $t('Error_LoginIsTooShort')
        })
    }

    const isValidPassword = validatePassword(password.value)

    if (!isValidPassword) {
        return showError({
            description: $t('Error_InvalidPassword')
        })
    }

    if (password.value !== confirmPassword.value) {
        return showError({
            description: $t('Error_PasswordsAreNotIdentical')
        })
    }

    const { error } = await $authService.register({ login: login.value, password: password.value })

    if (error.value) {
        return showError({ description: error.value.data.message })
    }

    await currentUserStore.fetchMyProfile()

    router.replace(Routes.MAIN)
}

const onSubmit = () => isLogin.value ? triggerLogin() : triggerRegister()
</script>
