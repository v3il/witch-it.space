import AccountSettings from '@/components/settings/AccountSettings.vue'
import SecuritySettings from '@/components/settings/SecuritySettings.vue'

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
    {
        id: 'market',
        title: 'Settings_Tabs_Market_Title',
        description: 'Settings_Tabs_Market_Description',
        icon: 'shopping-outline',
        component: AccountSettings
    },
    {
        id: 'danger',
        title: 'Settings_DangerZone',
        description: 'Settings_Tabs_AccountActions_Description',
        icon: 'alert-circle-outline',
        component: AccountSettings,
        isDanger: true
    }
]
