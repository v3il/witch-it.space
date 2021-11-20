export { raritiesManager } from './items'
export { Routes } from './Routes'
export { Cookies } from './Cookies'
export { config, Themes, Locales } from './config'
export { ru, ua, en } from './translations'
export { validateSteamTradeURL, validateLogin, validatePassword, validateDiscordTag, validateDisplayName, validateAvatarId, validateSteamAccountURL } from './validators'

export const getTranslation = (lngSet, textId, replacements = []) => {
    let text = lngSet[textId]

    if (!text) {
        return `No text with id: ${textId}`
    }

    if (typeof text === 'function') {
        return text.apply(null, replacements)
    }

    replacements.forEach((replacement) => {
        text = text.replace('%s', replacement.toString())
    })

    return text
}
