import { config } from '../config'

export const i18n = (request, response, next) => {
    const { locale } = request.query
    request.locale = config.AVAILABLE_LOCALES.includes(locale) ? locale : config.DEFAULT_LOCALE

    next()
}
