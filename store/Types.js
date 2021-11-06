import { StoreWrap } from '@/store/StoreWrap'

export const Root = StoreWrap.wrap('', {})

export const Locale = StoreWrap.wrap('locale', {
    State: {
        LOCALE: 'locale'
    },

    Actions: {
        SET_LOCALE: 'setLocale'
    },

    Mutations: {
        SET_LOCALE: 'setLocale'
    }
})

export const Theme = StoreWrap.wrap('theme', {
    State: {
        THEME: 'theme'
    },

    Actions: {
        SET_THEME: 'setTheme'
    },

    Mutations: {
        SET_THEME: 'setTheme'
    }
})

export const User = StoreWrap.wrap('user', {
    State: {
        USER: 'user'
    },

    Actions: {
        FETCH_USER: 'fetchUser',
        LOGIN: 'login',
        REGISTER: 'register',
        AUTH_USING_SOCIALS: 'auth',
        LOGOUT: 'logout',
        DISCONNECT_SOCIAL: 'disconnectSocial',
        UPDATE_SETTINGS: 'updateSettings',
        TOGGLE_PROFILE: 'toggleProfile',
        REMOVE_PROFILE: 'toggleProfile'
    },

    Mutations: {
        SET_USER: 'setUser',
        UPDATE_USER_DATA: 'updateUserData'
    }
})

export const Quest = StoreWrap.wrap('quest', {
    Actions: {
        FETCH_QUESTS: 'fetchQuests',
        UPDATE_QUESTS: 'updateQuests',
        REPLACE_QUEST: 'replaceQuest',
        FINALIZE_QUEST: 'finalizeQuest'
    },

    Mutations: {
        SET_DATA: 'setData',
        SET_LOADING: 'setLoading'
    }
})
