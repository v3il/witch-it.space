<template>
  <div class="layout">
    <TopNavBar class="layout__header" />

    <main class="layout__main">
      <Nuxt />

      <b-notification
        v-if="isNotificationVisible"
        :type="notificationClass"
        aria-close-label="Close notification"
        role="alert"
        animation="fade150"
        class="layout__notification"
      >
        {{ notificationMessage }}
      </b-notification>
    </main>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('theme')

export default {
    name: 'Default',

    data: () => ({
        isNotificationVisible: false,
        notificationType: '',
        notificationMessage: '',
        notificationTimeoutId: 0
    }),

    head () {
        return {
            bodyAttrs: {
                class: `body--${this.theme}`
            }
        }
    },

    computed: {
        ...mapState(['theme']),

        notificationClass () {
            return {
                success: 'is-success',
                error: 'is-danger'
            }[this.notificationType] ?? ''
        }
    },

    created () {
        this.$eventBus.$on('showNotification', ({ type, message }) => {
            clearTimeout(this.notificationTimeoutId)
            this.isNotificationVisible = true
            this.notificationType = type
            this.notificationMessage = message
            this.notificationTimeoutId = setTimeout(this.closeActiveNotification, 7000)
        })
    },

    mounted () {
        document.documentElement.style.setProperty('--scrollbar-width', this.getScrollbarWidth() + 'px')
    },

    methods: {
        closeActiveNotification () {
            this.isNotificationVisible = false
        },

        getScrollbarWidth () {
            const outer = document.createElement('div')
            outer.style.visibility = 'hidden'
            outer.style.position = 'absolute'
            outer.style.left = '-2000px'
            outer.style.overflow = 'scroll'
            document.body.appendChild(outer)

            const inner = document.createElement('div')
            outer.appendChild(inner)

            const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth)

            outer.parentNode.removeChild(outer)

            return scrollbarWidth
        }
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

    .layout__notification {
        max-width: 400px;
        position: fixed;
        right: var(--offset-sm);
        bottom: var(--offset-sm);
    }
</style>
