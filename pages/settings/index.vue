<template>
  <div>
    <AccountSettings :profile="user" :account-settings="settings" @change="$emit('settingsChange', $event)" />
    <SocialNetworks :profile="user" />
  </div>
</template>

<script>
import AccountSettings from '@/components/settings/AccountSettings'
import SocialNetworks from '@/components/settings/SocialNetworks'

export default {
    components: {
        AccountSettings,
        SocialNetworks
    },

    props: {
        settings: {
            required: true,
            type: Object
        },

        user: {
            required: true,
            type: Object
        }
    }
}
</script>
