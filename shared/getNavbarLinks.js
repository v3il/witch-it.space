import { buildUserMarketUrl, buildUserWishlistUrl } from '../utils'
import { Routes } from './Routes'

export const getNavbarLinks = user => [
    { to: buildUserMarketUrl(user?.id), textId: 'MainMenu_MyMarket', icon: 'shopping-music' },
    { to: buildUserWishlistUrl(user?.id), textId: 'MainMenu_MyWishlist', icon: 'heart-multiple' },
    { to: Routes.PROFILES, textId: 'MainMenu_Profiles', icon: 'account-group' },
    { to: Routes.ITEMS, textId: 'MainMenu_Items', icon: 'view-grid' },
    { to: Routes.QUESTS, textId: 'MainMenu_Quests', icon: 'file-tree' },
    { to: Routes.SETTINGS, textId: 'MainMenu_Settings', icon: 'cog-sync' }
]
