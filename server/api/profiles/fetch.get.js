import { userService } from '~/server/services'

export default defineEventHandler(async () => {
    const users = await userService.getPublicProfiles()
    const profiles = users.map(user => user.getPublicData())

    return { profiles }
})
