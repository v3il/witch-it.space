import { getTranslation } from '@/shared'

export default function ({ store }) {
    const $t = (textId, replacements = []) => {
        const lngSet = store.getters['locale/lngSet']
        return getTranslation(lngSet, textId, replacements)
    }

    // eslint-disable-next-line no-extend-native
    Date.prototype.getTimestamp = function () {
        return Math.floor(this.getTime() / 1000)
    }

    Date.fromTimestamp = function (timestamp) {
        return new Date(timestamp * 1000)
    }

    // eslint-disable-next-line no-extend-native
    Date.prototype.humanizeTimeDiff = function () {
        const targetTimestamp = this.getTimestamp()
        const nowTimestamp = new Date().getTimestamp()
        const diff = nowTimestamp - targetTimestamp

        const ONE_MINUTE = 60

        if (diff < ONE_MINUTE) {
            return $t('Time_LessThanAMinuteAgo')
        }

        const ONE_HOUR = 60 * 60

        if (diff < ONE_HOUR) {
            return $t('Time_NMinutesAgo', [Math.floor(diff / ONE_MINUTE)])
        }

        return Date.fromTimestamp(targetTimestamp).toLocaleString()
    }
}
