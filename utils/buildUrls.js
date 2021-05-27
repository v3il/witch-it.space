export const buildAvatarUrl = (avatarId) => {
    return `images/${avatarId}.png`
}

export const buildUserMarketUrl = (userId) => {
    return `/profiles/${userId}/market`
}

export const buildUserWishlistUrl = (userId) => {
    return `/profiles/${userId}/wishlist`
}
