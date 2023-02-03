import { ua, en } from '~/shared/translations'

export const useTranslate = () => {
    return {
        $t: (textId, replacements = []) => {
            let text = en[textId]

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
    }
}
