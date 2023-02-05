import { AuthService } from '~/service/AuthService'

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            authService: new AuthService(),

            t: key => key + 1 // todo: remove later
        }
    }
})
