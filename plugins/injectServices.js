import { AuthService } from '~/service/AuthService'

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            authService: new AuthService()
        }
    }
})
