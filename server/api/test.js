import { userService } from '~/server/services'

export default defineEventHandler(async (event) => {
    const user = await userService.getById(2)

    return { user: user.getPublicData() }
})
