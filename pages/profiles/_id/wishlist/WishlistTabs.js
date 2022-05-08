export const ManageWishlistTabs = Object.freeze({
    MY_WISHLIST: 'myWishlist',
    NON_WISHLIST_ITEMS: 'nonWishlistItems',

    get values () {
        return [ManageWishlistTabs.MY_WISHLIST, ManageWishlistTabs.NON_WISHLIST_ITEMS]
    }
})

export const WishlistListSidebarTabs = Object.freeze({
    PROFILE: 'profile',
    FILTERS: 'filters',

    get values () {
        return [WishlistListSidebarTabs.PROFILE, WishlistListSidebarTabs.FILTERS]
    }
})
