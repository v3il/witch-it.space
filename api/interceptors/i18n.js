import { config } from '../../shared/config'

export const i18n = (request, response, next) => {
    const { [config.LOCALE_COOKIE_NAME]: locale } = request.cookies
    request.locale = config.AVAILABLE_LOCALES.includes(locale) ? locale : config.DEFAULT_LOCALE

    next()
}
