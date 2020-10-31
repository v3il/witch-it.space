<template>
  <div class="layout">
    <TopNavBar />

    <main>
      {{ theme }}
      <Nuxt />
    </main>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('theme')

export default {
    name: 'Default',

    head () {
        return {
            bodyAttrs: {
                class: `body--${this.theme}`
            }
        }
    },

    computed: {
        ...mapState(['theme'])
    },

    methods: {
        // ...mapMutations(['setTheme']),
        //
        // onThemeChange (theme) {
        //     this.setTheme(theme)
        // }
    }
}
</script>
