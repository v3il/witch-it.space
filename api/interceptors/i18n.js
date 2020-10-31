import { Cookies, config } from '../../shared'

export const i18n = (request, response, next) => {
    const { [Cookies.LOCALE]: locale } = request.cookies
    request.locale = config.AVAILABLE_LOCALES.includes(locale) ? locale : config.DEFAULT_LOCALE

    next()
}
