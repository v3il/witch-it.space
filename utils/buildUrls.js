export const buildItemUrl = (itemId) => {
    if (itemId === 900) {
        return 'https://res.cloudinary.com/dtwlvvhcp/image/upload/v1646760833/items/900_gpxswe.webp'
    }

    return `/images/items/${itemId}.webp`
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
