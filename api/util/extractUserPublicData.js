export const extractUserPublicData = user => ({
    id: user.id,
    discordTag: user.discordTag,
    displayName: user.displayName,
    steamTradeLink: user.steamTradeLink,
    isGuardProtected: user.isGuardProtected,
    isActive: user.isActive,
    avatarId: user.avatarId,
    locale: user.locale,
    inventorySyncTime: user.inventorySyncTime
})
