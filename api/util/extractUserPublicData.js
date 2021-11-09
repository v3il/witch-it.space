export const extractUserPublicData = (user) => {
    const isSteamConnected = !!user.steamId
    const isGoogleConnected = !!user.googleId
    const isDiscordConnected = !!user.discordId
    const isAnySocialConnected = isSteamConnected || isDiscordConnected || isGoogleConnected

    return {
        id: user.id,
        login: user.login,
        discordTag: user.discordTag,
        displayName: user.displayName,
        steamTradeLink: user.steamTradeLink,
        steamProfileUrl: user.steamProfileUrl,
        isGuardProtected: user.isGuardProtected,
        isPublic: user.isPublic,
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

export const extractOtherUsersPublicData = (user) => {
    const discordDMUrl = user.discordId ? `discord:///channels/@me/${user.discordId}` : null

    return {
        id: user.id,
        displayName: user.displayName,
        avatarId: user.avatarId,
        isGuardProtected: user.isGuardProtected,
        steamProfileUrl: user.steamProfileUrl,
        discordDMUrl
    }
}
