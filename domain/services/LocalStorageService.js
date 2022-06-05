export class LocalStorageService {
    #storage

    constructor (storage) {
        this.#storage = storage
    }

    get (key) {
        return JSON.parse(this.#storage.getItem(this.#buildFullKey(key)))
    }

    set (key, data) {
        this.#storage.setItem(this.#buildFullKey(key), JSON.stringify(data))
    }

    #buildFullKey (key) {
        return `wis-${key}`
    }
}
