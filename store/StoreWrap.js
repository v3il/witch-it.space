export class StoreWrap {
    static wrap (moduleName, moduleMapping) {
        return new StoreWrap(moduleName, {
            State: moduleMapping.State ?? {},
            Getters: moduleMapping.Getters ?? {},
            Actions: moduleMapping.Actions ?? {},
            Mutations: moduleMapping.Mutations ?? {}
        })
    }

    #moduleName = ''

    constructor (moduleName, moduleMapping) {
        this.#moduleName = moduleName

        this.PATH = moduleName
        this.State = moduleMapping.State
        this.Getters = moduleMapping.Getters
        this.Actions = moduleMapping.Actions
        this.Mutations = moduleMapping.Mutations

        this.F = {
            State: this.#wrapPart(moduleMapping.State),
            Getters: this.#wrapPart(moduleMapping.Getters),
            Actions: this.#wrapPart(moduleMapping.Actions),
            Mutations: this.#wrapPart(moduleMapping.Mutations)
        }
    }

    #wrapPart (part) {
        const wrapperPart = {}
        const prefix = this.#moduleName ? `${this.#moduleName}/` : this.#moduleName

        Object.entries(part).forEach(([key, value]) => {
            wrapperPart[key] = `${prefix}${value}`
        })

        return wrapperPart
    }
}
