export { Routes } from './Routes'
export { Cookies } from './Cookies'
export { config, Themes, Locales } from './config'
export { ru, ua, en } from './translations'

export const getTranslation = (lngSet, textId, replacements) => {
    let text = lngSet[textId]

    if (!text) {
        return `No text with id: ${textId}`
    }

    replacements.forEach((replacement) => {
        text = text.replace('%s', replacement.toString())
    })

    return text
}
