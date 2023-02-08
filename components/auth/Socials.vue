<template>
    <div class="flex justify-content-center align-items-center">
        <Button
            v-for="social in socials"
            :key="social.value"
            class="flex justify-content-center align-items-center social-button"
            @click="onSocialClicked(social)"
        >
            <Icon :name="'mdi:' + social.icon" size="20" />
        </Button>
    </div>
</template>

<script setup>
import { config } from '~/shared/config'
import { useCurrentUserStore } from '~/store/currentUser'
import { Routes } from '~/shared/Routes'

const router = useRouter()
const currentUserStore = useCurrentUserStore()

const socials = [
    { value: 'steam', icon: 'steam', label: 'Steam' },
    { value: 'discord', icon: 'discord', label: 'Discord' },
    { value: 'google', icon: 'google', label: 'Google' }
]

const authUsingSocial = (socialName) => {
    const AUTH_WINDOW_TARGET = 'AuthWindow'

    const windOrigin = location.origin
    const config2 = useRuntimeConfig()

    const REDIRECT_URL = `${windOrigin}/api/auth/discord/callback`
    const url = `https://discord.com/api/oauth2/authorize?client_id=${config2.discordClientId}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=identify`

    // const authUsingDiscord = (request, response) => {
    //     response.redirect(`https://discord.com/api/oauth2/authorize?client_id=${config2.discordClientId}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=identify`)
    // }

    console.error(config.SERVER_ORIGIN)

    return new Promise((resolve, reject) => {
        const authWindow = openWindow(url, {
            tagName: AUTH_WINDOW_TARGET
        })

        const intervalId = setInterval(() => {
            if (authWindow.closed) {
                clearInterval(intervalId)
                // eslint-disable-next-line prefer-promise-reject-errors
                reject(null)
            }
        }, 500)

        const handler = ({ origin, data }) => {
            console.error(data.authResult)

            if (origin !== windOrigin || !data.authResult) {
                return
            }

            const { error } = data.authResult

            authWindow?.close()
            window.removeEventListener('message', handler, false)
            error ? reject(new Error(error)) : resolve()
        }

        window.addEventListener('message', handler, false)
    })
}

const onSocialClicked = (social) => {
    // await useFetch(`/api/auth/${social.value}/start`)

    authUsingSocial(social.value)
        .then(() => currentUserStore.fetchMyProfile())
        .then(() => console.log(currentUserStore.myProfile))
    //     .then(() => router.replace(Routes.MAIN))

    // store.dispatch('user/authUsingSocials', social.value)
    //     .then(() => router.replace(Routes.MAIN))
    //     .catch(error => error && $showError(error.message))
}

// import { useContext, useRouter, useStore } from '@nuxtjs/composition-api'
// import { Routes } from '@/shared/index.js'

// export default {
//     name: 'Socials',
//
//     setup () {
//         const { $showError } = useContext()
//         const store = useStore()
//         const router = useRouter()
//
//         const socials = [
//             { value: 'steam', icon: 'steam', label: 'Steam' },
//             { value: 'discord', icon: 'discord', label: 'Discord' },
//             { value: 'google', icon: 'google', label: 'Google' }
//         ]
//
//         const onSocialClicked = (social) => {
//             store.dispatch('user/authUsingSocials', social.value)
//                 .then(() => router.replace(Routes.MAIN))
//                 .catch(error => error && $showError(error.message))
//         }
//
//         return { socials, onSocialClicked }
//     }
// }
</script>

<style scoped lang="scss">
.social-button {
    flex: 1;
    border: 1px solid rgb(100 116 139);
    background-color: transparent;
    height: 40px;
    border-radius: 9999px;
    cursor: pointer;
    color: var(--muted-text-color);

    &:not(:last-child) {
        margin-right: 8px;
    }

    &:hover {
        color: var(--muted-text-color);
        background-color: rgba(0, 0, 0, 0.05);
    }
}
</style>
