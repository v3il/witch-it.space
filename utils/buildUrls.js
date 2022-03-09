const CDN_BASE_URL = 'https://ik.imagekit.io/igo1qzk1oe2z'

export const buildItemUrl = (itemId) => {
    return `${CDN_BASE_URL}/items/${itemId}.webp`
}

export const buildFlagUrl = (flagId) => {
    return `${CDN_BASE_URL}/flags/${flagId}.svg`
}

export const buildAvatarUrl = (avatarId) => {
    return `${CDN_BASE_URL}/avatars/${avatarId}.webp`
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
