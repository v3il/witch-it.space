import { User } from '../models'
import { extractOtherUsersPublicData } from '../util'

const r = () => Math.floor(Math.random() * 100)

const getProfiles = async (request, response) => {
    // todo: sorting by orders count
    const users = await User.findAll({
        where: {
            isPublic: true
        }
    })

    const profiles = users.map((user) => {
        const whimsicals = r()
        const veryRares = r()
        const rares = r()
        const common = r()
        const uncommons = r()

        return {
            ...extractOtherUsersPublicData(user),
            ordersCount: whimsicals + veryRares + rares + common + uncommons,
            wishlistCount: r(),
            whimsicals,
            veryRares,
            rares,
            common,
            uncommons
        }
    })
    response.send({ profiles })
}

const profilesController = {
    getProfiles
}

export { profilesController }
