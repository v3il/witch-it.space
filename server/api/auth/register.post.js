import { userService } from '~/server/services'
import { useValidators } from '~/composables/useValidators'
import { useTranslate } from '~/composables/useTranslate'
import { useUserCookies } from '~/server/composables/useUserCookies'
import { config } from '~/shared/config'

export default defineEventHandler(async (event) => {
    const { $t } = useTranslate()
    const { validateLogin, validatePassword } = useValidators()
    const { signUser } = useUserCookies()

    const { login, password } = await readBody(event)

    const isValidLogin = validateLogin(login)
    const isValidPassword = validatePassword(password)

    if (!(isValidPassword && isValidLogin)) {
        throw createError({
            statusCode: 400,
            message: $t('Error_BadRequest')
        })
    }

    const userWithSameLogin = await userService.getByLogin(login)

    if (userWithSameLogin) {
        throw createError({
            statusCode: 400,
            message: $t('Error_NotUniqueLogin')
        })
    }

    const encryptedPassword = await userService.encryptPassword(password)

    const user = await userService.createUser({
        login,
        displayName: login,
        password: encryptedPassword,
        locale: config.DEFAULT_LOCALE,
        theme: config.DEFAULT_THEME
    })

    signUser(event, user)

    return { success: true }
})
