<template>
  <Switcher
    :value="theme"
    :values="['light', 'dark']"
    icon-left="mdi-white-balance-sunny"
    icon-right="mdi-moon-waxing-crescent"
    @change="onThemeChange"
  />
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
