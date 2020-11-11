export const Root = {
    Getters: {
        HAS_ERRORS: 'hasErrors',
        FIRST_ERROR: 'firstError'
    },

    Mutations: {
        SET_ERRORS: 'setErrors',
        RESET_ERRORS: 'resetErrors'
    }
}

export const Locale = {
    PATH: 'locale',

    State: {
        LOCALE: 'locale/locale'
    },

    Actions: {
        SET_LOCALE: 'locale/setLocale'
    },

    Mutations: {
        SET_LOCALE: 'locale/setLocale'
    }
}

export const Theme = {
    PATH: 'theme',

    State: {
        THEME: 'theme/theme'
    },

    Actions: {
        SET_THEME: 'theme/setTheme'
    },

    Mutations: {
        SET_THEME: 'theme/setTheme'
    }
}

export const User = {
    PATH: 'user',

    State: {
        THEME: 'user/user'
    },

    Actions: {
        FETCH_USER: 'user/fetchUser',
        LOGIN: 'user/login'
    },

    Mutations: {
        SET_USER: 'user/setUser'
    }
}
