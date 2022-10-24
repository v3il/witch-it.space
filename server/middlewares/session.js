import { useUserCookies } from '~/server/composables/useUserCookies'

export default defineEventHandler(async (event) => {
    const { getUserFromCookies } = useUserCookies()

    await console.log(getUserFromCookies(event))
})
