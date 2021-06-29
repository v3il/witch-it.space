export class WishlistService {
    #axiosInstance = null

    constructor (axiosInstance) {
        this.#axiosInstance = axiosInstance
    }

    async fetch (userId) {
        const { data } = await this.#axiosInstance.get(`/api/wishlist?userId=${userId}`)
        return data.wishlist
    }
}
