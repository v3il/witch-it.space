<template>
  <div class="layout">
    <LeftNavBar class="a" />
    <!--    <div class="a wit-flex wit-flex&#45;&#45;column wit-flex&#45;&#45;justify-between">-->
    <!--      <img class="wiz-header__logo" src="/images/hey.png" alt="Hey!" style="max-height: 60px;">-->

    <!--      <div class="wit-flex wit-flex&#45;&#45;column">-->
    <!--        <b-button type="is-ghost" class="is-large">-->
    <!--          <b-icon class="is-size-5 wit-color&#45;&#45;Y400" icon="shopping-music" />-->
    <!--        </b-button>-->

    <!--        <b-button type="is-ghost" class="is-large">-->
    <!--          <b-icon class="is-size-5 wit-color&#45;&#45;Y400" icon="heart-multiple" />-->
    <!--        </b-button>-->

    <!--        <b-button type="is-ghost" class="is-large">-->
    <!--          <b-icon class="is-size-5 wit-color&#45;&#45;Y400" icon="account-group" />-->
    <!--        </b-button>-->

    <!--        <b-button type="is-ghost" class="is-large">-->
    <!--          <b-icon class="is-size-5 wit-color&#45;&#45;Y400" icon="view-grid" />-->
    <!--        </b-button>-->

    <!--        <b-button type="is-ghost" class="is-large">-->
    <!--          <b-icon class="is-size-5 wit-color&#45;&#45;Y400" icon="file-tree" />-->
    <!--        </b-button>-->

    <!--        <b-button type="is-ghost" class="is-large">-->
    <!--          <b-icon class="is-size-5 wit-color&#45;&#45;Y400" icon="cog-sync" />-->
    <!--        </b-button>-->
    <!--      </div>-->

    <!--      <b-button type="is-ghost" class="is-large">-->
    <!--        <b-icon class="is-size-5 wit-color&#45;&#45;Y400" icon="dots-grid" />-->
    <!--      </b-button>-->
    <!--    </div>-->

    <div class="b">
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
          :closable="false"
        >
          {{ notificationMessage }}
        </b-notification>
      </main>
    </div>
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
    .a {
        position: fixed;
        width: 60px;
        background: #2a3142; //var(--secondary);
        height: 100vh;
    }

    .b {
        margin-left: 60px;
    }

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
