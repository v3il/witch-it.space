<template>
  <b-button
    type="is-ghost"
    class="wit-transition--background wit-flex wit-flex--center wit-theme-switcher"
    @click="onThemeChange"
  >
    <b-icon class="is-size-5 wit-color--Y400" :icon="iconName" />
  </b-button>
</template>

<script>
import { mapState } from 'vuex'
import { Theme } from '@/store'
import { Themes } from '@/shared'

export default {
    name: 'ThemeSwitcher',

    computed: {
        ...mapState(Theme.PATH, [
            Theme.State.THEME
        ]),

        isDarkTheme () {
            return this.theme === Themes.DARK
        },

        iconName () {
            return this.isDarkTheme ? 'white-balance-sunny' : 'moon-waning-crescent'
        }
    },

    methods: {
        onThemeChange () {
            this.$store.dispatch(Theme.F.Actions.SET_THEME, this.isDarkTheme ? Themes.LIGHT : Themes.DARK)
        }
    }
}
</script>

<style scoped lang="scss">
    .wit-theme-switcher {
        box-shadow: none;
        box-sizing: content-box;
        width: 70px;
        height: 70px;
        padding: 0;

        &:focus,
        &:active,
        &:hover {
            box-shadow: none;
            background-color: var(--theme-switcher-hover-background);
        }
    }
</style>
