export const validateSteamTradeURL = (tradeURL) => {
    if (!tradeURL) {
        return 'Error_WrongSteamTradeURL'
    }

    const trimmedURL = String(tradeURL).trim()

    if (!trimmedURL.startsWith('https://steamcommunity.com/tradeoffer/new')) {
        return 'Error_WrongSteamTradeURL'
    }

    return null
}
