import { Test } from '~/service/Test'

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            testService: new Test(),

            t: key => key + 1
        }
    }
})
