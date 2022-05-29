export class QuestsService {
    #axiosInstance = null
    #itemsService = null

    constructor ({ itemsService }) {
        this.#itemsService = itemsService
    }

    setAxios (axiosInstance) {
        this.#axiosInstance = axiosInstance
    }

    fetch () {
        return this.#axiosInstance.$get('/api/quests')
    }
}
