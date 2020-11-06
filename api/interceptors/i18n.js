import { Cookies, config } from '../../shared'

export const i18n = (request, response, next) => {
    const { [Cookies.LOCALE]: locale, [Cookies.THEME]: theme } = request.cookies

    request.locale = config.AVAILABLE_LOCALES.includes(locale) ? locale : config.DEFAULT_LOCALE
    request.theme = config.AVAILABLE_THEMES.includes(theme) ? theme : config.DEFAULT_THEME

    next()
}
