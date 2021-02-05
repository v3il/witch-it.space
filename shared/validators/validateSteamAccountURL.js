export const validateSteamAccountURL = (accountURL) => {
    const trimmedURL = accountURL.trim()

    if (!trimmedURL.test(/(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+/)) {
        return 'Error_WrongSteamAccountURL'
    }

    return null
}
