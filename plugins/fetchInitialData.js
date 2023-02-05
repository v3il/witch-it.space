import { useProfilesStore } from '~/store/profiles'

export default defineNuxtPlugin(async (nuxtApp) => {
    const todos = useProfilesStore(nuxtApp.$pinia)

    await todos.fetchProfilesCount()
})
