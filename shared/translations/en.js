export const en = {
    errors: {
        wrongOauth2Token: 'Неправильный OAuth2 код',
        authFailed: 'При авторизации возникла ошибка',
        actionForbidden: 'Действие запрещено',
        wrongLogin: 'Пользователя с таким логином не существует',
        wrongPassword: 'Неправильный пароль',
        invalidLogin: 'Некорректный логин',
        invalidPassword: 'Некорректный пароль (минимум 8 символов)',
        notUniqueLogin: 'Пользователь с таким логином уже зарегистрирован в системе',
        Error_BadRequest: 'Bad req'
    },

    welcome_back: 'Welcome Back!',
    sign_in_to_continue: 'Sign in to continue to Witch It.Zone',
    login: 'Login',
    enter_login: 'Enter Login',
    password: 'Password',
    enter_password: 'Enter Password',
    login_in: 'Sign In',
    dont_have_account: 'Don\'t have an account?',
    sign_up: 'Sign Up Now',
    crafted_by: 'Crafted for Witch It community by !D',
    register: 'Sign up',

    Quests_LastUpdate: 'Last update: %s',

    Time_NMinutesAgo: (minutes) => {
        const word = minutes === 1 ? 'minute' : 'minutes'
        return `${minutes} ${word} ago`
    },
    Time_LessThanAMinuteAgo: 'less than a minute ago'
}
