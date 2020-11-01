<template>
  <header class="wit-transition">
    Header

    {{ $store.state.locale.locale }}

    <!--    <input type="checkbox" :checked="theme === 'dark'" @change="onC">Theme {{ theme }}-->

    <ThemeSwitcher />
    <Dropdown :value="'en'" :variants="$options.values" />
  </header>
</template>

<script>
// import { createNamespacedHelpers } from 'vuex'
//
// const { mapState, mapMutations } = createNamespacedHelpers('theme')

import ThemeSwitcher from '@/components/ThemeSwitcher'
import Dropdown from '@/components/base/Dropdown'

export default {
    name: 'TopNavBar',

    values: [
        { value: 'en', label: 'English', img: 'flags/us.svg' },
        { value: 'ua', label: 'Ukrainian', img: 'flags/ua.svg' },
        { value: 'ru', label: 'Russian', img: 'flags/ru.svg' }
    ],

    components: {
        ThemeSwitcher,
        Dropdown
    },

    // computed: {
    //     ...mapState(['theme'])
    // },

    methods: {
        // ...mapMutations(['setTheme']),

        // onSubmit () {
        //
        // },

        // onC (theme) {
        //     // const theme = target.checked ? 'dark' : 'light'
        //     console.log(2, theme)
        //     this.$emit('changeTheme', theme)
        //
        //     // window.document.body.classList.toggle('body--light', theme === 'light')
        //     // window.document.body.classList.toggle('body--dark', theme === 'dark')
        //
        //     // this.setTheme(theme)
        // }
    }
}
</script>

<style scoped>
    header {
        background-color: var(--header-bg);
        height: 70px;
        position: sticky;
    }
</style>
