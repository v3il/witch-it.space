import { userService } from '~/server/services'
import { useValidators } from '~/composables/useValidators'
import { useTranslate } from '~/composables/useTranslate'
import { useUserCookies } from '~/server/composables/useUserCookies'

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
            message: $t('Error_NoUserWithLogin')
        })
    }

    const savedUser = await userService.getByLoginWithPassword(login)

    if (!savedUser) {
        throw createError({
            statusCode: 404,
            message: $t('Error_NoUserWithLogin')
        })
    }

    const isCorrectPassword = await userService.checkPasswords(password, savedUser.password)

    if (!isCorrectPassword) {
        throw createError({
            statusCode: 400,
            message: $t('Error_WrongPassword')
        })
    }

    signUser(event, savedUser)
})
