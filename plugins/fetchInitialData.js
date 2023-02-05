import { useProfilesStore } from '~/store/profiles'
import { useItemsStore } from '~/store/items'

export default defineNuxtPlugin(async (nuxtApp) => {
    if (!process.server) {
        return
    }

    const profilesStore = useProfilesStore(nuxtApp.$pinia)
    const itemsStore = useItemsStore(nuxtApp.$pinia)

    await profilesStore.fetchProfiles()
    await itemsStore.fetchItems()
})
