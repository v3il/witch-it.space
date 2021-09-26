<template>
  <header style="height: 70px; position: sticky;" class="wit-background--content wit-transition">
    Header

    <!--    <input type="checkbox" :checked="theme === 'dark'" @change="onC">Theme {{ theme }}-->

    <ThemeSwitcher />
  </header>
</template>

<script>
// import { createNamespacedHelpers } from 'vuex'
//
// const { mapState, mapMutations } = createNamespacedHelpers('theme')

import ThemeSwitcher from '@/components/ThemeSwitcher'

export default {
    name: 'TopNavBar',

    components: {
        ThemeSwitcher
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
