import User from '~/server/models/User'

export default defineEventHandler(async (event) => {
    const user = await User.query().findById(4)

    return { user: user.getPublicData() }
})
