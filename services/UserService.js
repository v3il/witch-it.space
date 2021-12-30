export class UserService {
    #axiosInstance = null

    constructor (axiosInstance) {
        this.#axiosInstance = axiosInstance
    }

    async fetch (userId) {
        try {
            const { data } = await this.#axiosInstance.get(`/api/user/${userId}`)
            return {
                error: null,
                profile: data.profile
            }
        } catch (e) {
            return {
                error: e.message
            }
        }
    }

    async fetchAll () {
        try {
            const { data } = await this.#axiosInstance.get('/api/profiles')
            return {
                error: null,
                profiles: data.profiles.sort((a, b) => b.userStat.marketSize - a.userStat.marketSize)
            }
        } catch (e) {
            return {
                error: e.message
            }
        }
    }
}
