export class AuthService {
    login ({ login, password }) {
        return useFetch('/api/auth/login', {
            method: 'POST',
            body: { login, password }
        })
    }
}
