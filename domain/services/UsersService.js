import { User } from '@/domain/models/index.js'

export class UsersService {
    #axiosInstance = null

    setAxios (axiosInstance) {
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

            // return data.profiles // .map(profile => User.create(profile))

            return {
                // error: null,
                profiles: data.profiles
            }
        } catch (e) {
            return {
                error: e.message
            }
        }
    }
}
