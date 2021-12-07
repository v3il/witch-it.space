export class UserService {
    #axiosInstance = null

    constructor (axiosInstance) {
        this.#axiosInstance = axiosInstance
    }

    async fetch (userId) {
        try {
            const { data } = await this.#axiosInstance.get(`/api/wishlist?userId=${userId}`)
            return {
                error: null,
                wishlist: data.wishlist
            }
        } catch (e) {
            return {
                error: e.message,
                wishlist: null
            }
        }
    }
}
