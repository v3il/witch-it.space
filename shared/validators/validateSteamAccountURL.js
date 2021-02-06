export const validateSteamAccountURL = (accountURL) => {
    const trimmedURL = accountURL.trim()

    if (!/(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+/.test(trimmedURL)) {
        return 'Error_WrongSteamAccountURL'
    }

    return null
}
