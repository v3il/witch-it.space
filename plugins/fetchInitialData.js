import { useProfilesStore } from '~/store/profiles'
import { useItemsStore } from '~/store/items'
import { useCurrentUserStore } from '~/store/currentUser'

export default defineNuxtPlugin(async (nuxtApp) => {
    if (!process.server) {
        return
    }

    const profilesStore = useProfilesStore(nuxtApp.$pinia)
    const itemsStore = useItemsStore(nuxtApp.$pinia)
    const currentUserStore = useCurrentUserStore(nuxtApp.$pinia)

    await currentUserStore.fetchCurrentUser()
    await profilesStore.fetchProfiles()
    await itemsStore.fetchItems()
})
