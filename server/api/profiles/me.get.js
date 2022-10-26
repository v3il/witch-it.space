import { useUserCookies } from '~/server/composables/useUserCookies'

export default defineEventHandler(async (event) => {
    const { getUserFromCookies } = useUserCookies()
    const user = await getUserFromCookies(event)

    return { profile: user ? user.getPublicData() : null }
})
