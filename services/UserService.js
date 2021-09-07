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
                user: data.user,
                marketSize: data.marketSize,
                wishlistSize: data.wishlistSize
            }
        } catch (e) {
            return {
                error: e.message
            }
        }
    }
}
