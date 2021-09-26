<template>
  <div class="wit-flex wit-flex--center">
    <span class="mdi mdi-white-balance-sunny wit-color--warning wit-offset-right--xs" />
    <Switcher :values="['light', 'dark']" :value="theme" @change="onThemeChange" />
    <span class="mdi mdi-moon-waning-crescent wit-color--primary wit-offset-left--xs" />
    {{ theme }}
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Switcher from '@/components/base/Switcher'

const { mapState, mapActions } = createNamespacedHelpers('theme')

export default {
    name: 'ThemeSwitcher',

    components: {
        Switcher
    },

    computed: {
        ...mapState(['theme'])
    },

    methods: {
        ...mapActions(['setTheme']),

        onThemeChange (theme) {
            this.setTheme(theme)
        }
    }
}
</script>

<style scoped>

</style>
