<template>
  <div class="layout">
    <TopNavBar class="layout__header" />

    <main class="layout__main">
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
    }
}
</script>

<style scoped lang="scss">
    .layout__main {
        padding: 0 var(--offset-md) var(--offset-md);

        @media screen and (max-width: 768px) {
            padding: 0 var(--offset-sm) var(--offset-sm);
        }
    }
</style>
