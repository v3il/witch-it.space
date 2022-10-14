export const ManagePageTabs = Object.freeze({
    OFFERS: 'offers',
    AVAILABLE_ITEMS: 'availableItems',

    get values () {
        return [ManagePageTabs.OFFERS, ManagePageTabs.AVAILABLE_ITEMS]
    }
})

export const WishlistListTabs = Object.freeze({
    MARKET: 'market',
    WISHLIST: 'wishlist',

    get values () {
        return [WishlistListTabs.MARKET, WishlistListTabs.WISHLIST]
    }
})

export const WishlistListSidebarTabs = Object.freeze({
    PROFILE: 'profile',
    FILTERS: 'filters',

    get values () {
        return [WishlistListSidebarTabs.PROFILE, WishlistListSidebarTabs.FILTERS]
    }
})
