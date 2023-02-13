import AccountSettings from '@/components/settings/AccountSettings.vue'
import SecuritySettings from '@/components/settings/SecuritySettings.vue'
import MarketSettings from '@/components/settings/MarketSettings.vue'
import AccountActions from '@/components/settings/AccountActions.vue'

export const tabs = [
    {
        id: 'account',
        title: 'Settings_Tabs_Account_Title',
        description: 'Settings_Tabs_Account_Description',
        icon: 'account-circle-outline',
        component: AccountSettings
    },
    {
        id: 'security',
        title: 'Settings_Tabs_Security_Title',
        description: 'Settings_Tabs_Security_Description',
        icon: 'lock-outline',
        component: SecuritySettings
    },
    // {
    //     id: 'market',
    //     title: 'Settings_Tabs_Market_Title',
    //     description: 'Settings_Tabs_Market_Description',
    //     icon: 'shopping-outline',
    //     component: MarketSettings
    // },
    {
        id: 'actions',
        title: 'Settings_AccountActions',
        description: 'Settings_Tabs_Market_Description',
        icon: 'close-octagon',
        component: AccountActions,
        isDanger: true
    }
]
