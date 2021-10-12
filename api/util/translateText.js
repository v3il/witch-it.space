import { ru, ua, en, Locales, getTranslation } from '../../shared'

export const translateText = (textId, locale = 'en', replacements = []) => {
    const lngSet = {
        [Locales.UA]: ua,
        [Locales.EN]: en,
        [Locales.RU]: ru
    }[locale] ?? {}

    return getTranslation(lngSet, textId, replacements)
}
