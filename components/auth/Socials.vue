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
const socials = [
    { value: 'steam', icon: 'steam', label: 'Steam' },
    { value: 'discord', icon: 'discord', label: 'Discord' },
    { value: 'google', icon: 'google', label: 'Google' }
]

const onSocialClicked = (social) => {
    console.error(social)

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
