export const extractUserPublicData = (user) => {
    const isSteamConnected = !!user.steamId
    const isGoogleConnected = !!user.googleId
    const isDiscordConnected = !!user.discordId
    const isAnySocialConnected = isSteamConnected || isDiscordConnected || isGoogleConnected

    return {
        id: user.id,
        discordTag: user.discordTag,
        displayName: user.displayName,
        steamTradeLink: user.steamTradeLink,
        steamProfileUrl: user.steamProfileUrl,
        isGuardProtected: user.isGuardProtected,
        isActive: user.isActive,
        avatarId: user.avatarId,
        locale: user.locale,
        theme: user.theme,
        inventorySyncTime: user.inventorySyncTime,
        isSteamConnected,
        isGoogleConnected,
        isDiscordConnected,
        isAnySocialConnected,
        hasLocalProfile: !!user.password
    }
}
