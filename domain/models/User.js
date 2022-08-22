export class User {
    static create (data) {
        return new User(data)
    }

    constructor (data) {
        this.id = data.id
        this.displayName = data.displayName
        this.login = data.login
        this.steamId = data.steamId
        this.steamTradeLink = data.steamTradeLink
        this.discordId = data.discordId
        this.googleId = data.googleId
        this.marketNote = data.marketNote
        this.wishlistNote = data.wishlistNote
        this.questsUpdateTimestamp = data.questsUpdateTimestamp
        this.avatarId = data.avatarId
        this.marketSize = data.marketSize
        this.wishlistSize = data.wishlistSize
        this.canReplaceDailyQuests = data.canReplaceDailyQuests
        this.canReplaceWeeklyQuests = data.canReplaceWeeklyQuests
        this.isGuardProtected = data.isGuardProtected
        this.isPublic = data.isPublic
        this.switchRarities = data.switchRarities
        this.tradeWithGuardedOnly = data.tradeWithGuardedOnly
        this.discountAvailable = data.discountAvailable
        this.tradeDuplicatesOnly = data.tradeDuplicatesOnly
        this.inventorySyncTime = data.inventorySyncTime
        this.wishlistUpdateTime = data.wishlistUpdateTime
        this.marketUpdateTime = data.marketUpdateTime
    }

    get isVerified () {
        return !!this.steamId && !!this.discordId && !!this.steamTradeLink
    }

    get hasSteamGuard () {
        return this.isGuardProtected
    }

    toJSON () {
        return { ...this }
    }
}
