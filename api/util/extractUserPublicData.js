export const extractUserPublicData = (user) => {
    const isSteamConnected = !!user.steamId
    const isGoogleConnected = !!user.googleId
    const isDiscordConnected = !!user.discordId
    const isAnySocialConnected = isSteamConnected || isDiscordConnected || isGoogleConnected
    const discordDMUrl = user.discordId ? `discord:///channels/@me/${user.discordId}` : null
    const steamProfileUrl = user.steamId ? `https://steamcommunity.com/profiles/${user.steamId}` : null
    const isVerified = isSteamConnected && isDiscordConnected && user.steamTradeLink

    return {
        id: user.id,
        login: user.login,
        displayName: user.displayName,
        steamTradeLink: user.steamTradeLink,
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
        discordDMUrl,
        steamProfileUrl,
        hasLocalProfile: !!user.password,
        marketNote: user.marketNote,
        wishlistNote: user.wishlistNote,
        isStrictRarity: user.isStrictRarity,
        onlyGuarded: user.onlyGuarded,
        isBargainAvailable: user.isBargainAvailable,
        isTradingOnlyDups: user.isTradingOnlyDups,
        isVerified
    }
}

export const extractOtherUsersPublicData = (user) => {
    const isSteamConnected = !!user.steamId
    const isDiscordConnected = !!user.discordId
    const discordDMUrl = user.discordId ? `discord:///channels/@me/${user.discordId}` : null
    const steamProfileUrl = user.steamId ? `https://steamcommunity.com/profiles/${user.steamId}` : null
    const isVerified = isSteamConnected && isDiscordConnected && user.steamTradeLink

    return {
        id: user.id,
        displayName: user.displayName,
        avatarId: user.avatarId,
        isGuardProtected: user.isGuardProtected,
        steamTradeLink: user.steamTradeLink,
        discordDMUrl,
        steamProfileUrl,
        offersCount: Math.floor(Math.random() * 10),
        marketNote: user.marketNote,
        wishlistNote: user.wishlistNote,
        isStrictRarity: user.isStrictRarity,
        onlyGuarded: user.onlyGuarded,
        isBargainAvailable: user.isBargainAvailable,
        isTradingOnlyDups: user.isTradingOnlyDups,
        isVerified
    }
}
