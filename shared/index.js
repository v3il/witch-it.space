export { raritiesManager, eventsManager, slotsManager } from './items'
export { Routes } from './Routes'
export { Cookies } from './Cookies'
export { OfferTypes } from './OfferTypes'
export { config, Themes, Locales } from './config'
export { ru, ua, en } from './translations'
export { getNavbarLinks } from './getNavbarLinks'
export { getCurrentTimestamp } from './getCurrentTimestamp'
export { validateSteamTradeURL, validateLogin, validatePassword, validateDisplayName, validateAvatarId } from './validators'

export const getTranslation = (lngSet, textId, replacements = []) => {
    let text = lngSet[textId]

    if (!text) {
        return `No text with id: ${textId}`
    }

    if (typeof text === 'function') {
        return text.apply(null, replacements)
    }

    replacements.forEach((replacement, index) => {
        text = text.replace('%s', replacement.toString())
        text = text.replace(new RegExp(`{${index}\\|(.*?)\\|(.*?)\\|}`), (part) => {
            const [, singleForm, pluralForm] = part.split('|')
            return replacement === 1 ? singleForm : pluralForm
        })
    })

    return text
}
