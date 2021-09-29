<template>
  <header class="wit-transition wit-header">
    <div class="wit-flex wit-flex--justify-end wit-flex--align-center wit-block--full-height">
      <ThemeSwitcher class="wit-offset-right--sm" />
      <LocaleSwitcher />
    </div>

    {{ $store.state.locale.locale }}

    <!--    <input type="checkbox" :checked="theme === 'dark'" @change="onC">Theme {{ theme }}-->
  </header>
</template>

<script>
// import { createNamespacedHelpers } from 'vuex'
//
// const { mapState, mapMutations } = createNamespacedHelpers('theme')

import ThemeSwitcher from '@/components/ThemeSwitcher'
import LocaleSwitcher from '@/components/LocaleSwitcher'

export default {
    name: 'TopNavBar',

    components: {
        ThemeSwitcher,
        LocaleSwitcher
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
    .wit-header {
        background-color: var(--header-bg);
        height: 70px;
        position: sticky;
        padding: 0 var(--offset-xs);
    }
</style>
