import { useTranslate } from '~/composables/useTranslate'
import { useValidators } from '~/composables/useValidators'
import { useUserCookies } from '~/server/composables/useUserCookies'
import { userService } from '~/server/services'

export default defineEventHandler(async (event) => {
    const { $t } = useTranslate()
    const { validateLogin, validatePassword } = useValidators()
    const { getUserFromCookies } = useUserCookies()

    await console.log(getUserFromCookies(event))

    return { profile: getUserFromCookies(event) }
})
