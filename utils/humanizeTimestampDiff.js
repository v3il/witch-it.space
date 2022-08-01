import { buildDateFromTimestamp } from './buildDateFromTimestamp.js'

export const humanizeTimestampDiff = (targetTimestamp, { $t }) => {
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

    return buildDateFromTimestamp(targetTimestamp).toLocaleString()
}
