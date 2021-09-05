export const buildItemUrl = (itemName) => {
    return `/images/items/${itemName}.webp`
}

export const buildAvatarUrl = (avatarId) => {
    return `/images/avatars/${avatarId}.webp`
}

export const buildUserMarketUrl = (userId) => {
    return `/profiles/${userId}`
}

export const buildUserWishlistUrl = (userId) => {
    return `/profiles/${userId}/wishlist`
}

export const buildRarityFilterUrl = (userId, rarity) => {
    return `${buildUserMarketUrl(userId)}?rarity=${rarity}`
}
