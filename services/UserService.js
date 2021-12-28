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
                user: data.user
            }
        } catch (e) {
            return {
                error: e.message,
                user: null
            }
        }
    }
}
