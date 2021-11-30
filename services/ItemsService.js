export class ItemsService {
    #items = {}
    #isLoaded = false
    #axiosInstance = null

    constructor (axiosInstance) {
        this.#axiosInstance = axiosInstance
    }

    getById (id) {
        return this.#items[String(id)]
    }

    toList () {
        return Object.values(this.#items)
    }

    async fetch () {
        if (this.#isLoaded) {
            return
        }

        const { data } = await this.#axiosInstance.get('/api/items')
        this.#items = data.items
        this.#isLoaded = true
    }
}
