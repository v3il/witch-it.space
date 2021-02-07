export const validateSteamTradeURL = (tradeURL) => {
    const trimmedURL = tradeURL.trim()

    if (!trimmedURL.startsWith('https://steamcommunity.com/tradeoffer/new')) {
        return 'Error_WrongSteamTradeURL'
    }

    return null
}
