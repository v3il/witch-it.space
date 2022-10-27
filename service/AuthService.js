export class AuthService {
    login ({ login, password }) {
        return useFetch('/api/auth/login', {
            method: 'POST',
            body: { login, password }
        })
    }

    register ({ login, password }) {
        return useFetch('/api/auth/register', {
            method: 'POST',
            body: { login, password }
        })
    }
}
