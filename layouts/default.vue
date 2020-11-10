<template>
  <div class="layout">
    <TopNavBar class="layout__header" />

    <main class="layout__main">
      <Nuxt />

      <b-notification
        v-if="hasErrors"
        type="is-danger is-light is-bottom-right"
        aria-close-label="Close notification"
        role="alert"
        style="    max-width: 400px;
    position: absolute;
    right: 20px;
    bottom: 20px;"
        auto-close
        :duration="5000"
        @close="resetErrors"
      >
        {{ firstError }}
      </b-notification>
    </main>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters, mapMutations } from 'vuex'

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
        ...mapGetters(['hasErrors', 'firstError']),
        ...mapState(['theme'])
    },

    methods: {
        ...mapMutations(['resetErrors'])
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
