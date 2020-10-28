<template>
  <div class="layout">
    <TopNavBar :theme="theme" @changeTheme="onC" />

    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapMutations } = createNamespacedHelpers('theme')

export default {
    name: 'Default',

    // middleware: ['getTheme'],

    computed: {
        ...mapState(['theme'])
    },

    head () {
        return {
            bodyAttrs: {
                class: `body--${this.theme}`
            }
        }
    },

    methods: {
        ...mapMutations(['setTheme']),

        onC (theme) {
            // const theme = target.checked ? 'dark' : 'light'

            // window.document.body.classList.toggle('body--light', theme === 'light')
            // window.document.body.classList.toggle('body--dark', theme === 'dark')

            this.setTheme(theme)
        }
    }
}
</script>
