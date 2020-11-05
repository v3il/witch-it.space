export const extractUserPublicData = user => ({
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
    inventorySyncTime: user.inventorySyncTime
})
