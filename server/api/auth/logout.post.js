import { Cookies } from '~/shared/Cookies'

export default defineEventHandler((event) => {
    deleteCookie(event, Cookies.TOKEN)
    return { success: true }
})
