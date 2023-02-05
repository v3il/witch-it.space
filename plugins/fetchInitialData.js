import { useProfilesStore } from '~/store/profiles'

export default defineNuxtPlugin(async (nuxtApp) => {
    if (!process.server) {
        return
    }

    const profilesStore = useProfilesStore(nuxtApp.$pinia)

    await profilesStore.fetchProfilesCount()
})
