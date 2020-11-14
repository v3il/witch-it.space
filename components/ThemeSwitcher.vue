<template>
  <!--  <Switcher-->
  <!--    :value="theme"-->
  <!--    :values="['light', 'dark']"-->
  <!--    icon-left="mdi-white-balance-sunny"-->
  <!--    icon-right="mdi-moon-waxing-crescent"-->
  <!--    @change="onThemeChange"-->
  <!--  />-->

  <b-button
    type="is-ghost"
    class="wit-offset-right--xs wit-transition--background wit-flex wit-flex--center"
    @click.native="onThemeChange"
  >
    <b-icon size="is-small" class="is-size-5" type="is-warning" :icon="iconName" />
  </b-button>

<!--  <b-field>-->
<!--    <b-switch-->
<!--      :value="isDarkTheme"-->
<!--      @input="onThemeChange"-->
<!--    >-->
<!--      -->

<!--            <b-button-->
<!--              type="is-link"-->
<!--              class="wit-offset-right&#45;&#45;xs wit-transition&#45;&#45;background wit-flex wit-flex&#45;&#45;center"-->
<!--            >-->
<!--              -->
<!--            </b-button>-->
<!--    </b-switch>-->
<!--  </b-field>-->
</template>

<script>
import { mapState } from 'vuex'
// import Switcher from '@/components/base/Switcher'
import { Theme } from '@/store'
import { Themes } from '@/shared'

// const { mapState, mapActions } = createNamespacedHelpers('theme')

export default {
    name: 'ThemeSwitcher',

    // components: {
    //     Switcher
    // },

    computed: {
        ...mapState(Theme.PATH, [
            'theme'
        ]),

        isDarkTheme () {
            return this.theme === Themes.DARK
        },

        iconName () {
            return this.isDarkTheme ? 'moon-waxing-crescent' : 'white-balance-sunny'
        }
    },

    methods: {
        // ...mapActions(['setTheme']),

        onThemeChange () {
            console.log(1)
            console.log(this.isDarkTheme ? Themes.LIGHT : Themes.DARK)
            this.$store.dispatch(Theme.Actions.SET_THEME, this.isDarkTheme ? Themes.LIGHT : Themes.DARK)

            // this.setTheme(theme)
        }
    }
}
</script>

<style scoped>

</style>
