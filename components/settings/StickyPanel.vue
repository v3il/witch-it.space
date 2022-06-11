<template>
  <Card class="wit-settings__sticky-panel">
    <div class="wit-flex wit-flex--justify-between">
      <div class="wit-settings__tabs-container wit-offset-right--sm">
        <Tabs :modes="$options.modes" :selected-mode="activeTab" expanded @switch="onModeChange">
          <template #tab0>
            {{ $t('Wishlist_TopTabs_Account') }}
          </template>

          <template #tab1>
            {{ $t('Wishlist_TopTabs_Market') }}
          </template>
        </Tabs>
      </div>

      <b-button type="is-primary" class="wit-offset-left--auto wit-block" @click="$emit('update')">
        {{ $t('Settings_Save') }}
      </b-button>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/basic/Card.vue'
import Tabs from '@/components/basic/Tabs'
import { Routes } from '@/shared/index.js'

const Modes = {
    ACCOUNT: 'account',
    MARKET: 'market'
}

export default {
    name: 'StickyPanel',

    modes: Object.values(Modes),

    components: {
        Card,
        Tabs
    },

    computed: {
        activeTab () {
            return this.$route.fullPath === Routes.SETTINGS ? Modes.ACCOUNT : Modes.MARKET
        }
    },

    methods: {
        onModeChange (mode) {
            if (this.activeTab === mode) {
                return
            }

            const route = mode === Modes.ACCOUNT ? Routes.SETTINGS : Routes.SETTINGS_MARKET
            this.$router.replace(route)
        }
    }
}
</script>

<style scoped>
.wit-settings__sticky-panel {
    position: sticky;
    top: -1px;
    z-index: 2;
    border-bottom: 16px solid #222736;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.wit-settings__tabs-container {
    width: 225px;
}
</style>
