import { itemsService } from '~/server/services'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    await console.error(body)

    return 1

    // const loginSchema = joi.string().min(4).required()
    // const passwordSchema = joi.string().min(6).required()
    // const { error: loginError } = loginSchema.validate(request.body.login)
    // const { error: passwordError } = passwordSchema.validate(request.body.password)
    //
    // if (loginError || passwordError) {
    //     return response.emitBadRequest(request.$t('Error_NoUserWithLogin'))
    // }
    //
    // const { login, password } = request.body
    // const savedUser = await userService.getByLoginWithPassword(login)
    //
    // if (!savedUser) {
    //     return response.emitBadRequest(request.$t('Error_NoUserWithLogin'))
    // }
    //
    // const isCorrectPassword = await userService.checkPasswords(password, savedUser.password)
    //
    // if (!isCorrectPassword) {
    //     return response.emitBadRequest(request.$t('Error_WrongPassword'))
    // }
})
