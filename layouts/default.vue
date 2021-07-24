<template>
  <div class="layout">
    <LeftNavBar v-if="user" :links="navbarLinks" class="layout__left" />

    <div class="layout__right">
      <Nuxt />

      <!--      <main class="layout__main" />-->

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
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { User, Theme } from '@/store'
import { getNavbarLinks } from '@/shared'

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
        ...mapState(Theme.PATH, [Theme.State.THEME]),
        ...mapState(User.PATH, [User.State.USER]),

        notificationClass () {
            return {
                success: 'is-success',
                error: 'is-danger'
            }[this.notificationType] ?? ''
        }
    },

    created () {
        this.navbarLinks = getNavbarLinks(this.user)

        this.$eventBus.$on('showNotification', ({
            type,
            message
        }) => {
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
    .layout__left {
        position: fixed;
        width: var(--left-navbar-width);
        background: var(--left-navbar-bg);
        height: 100vh;
    }

    .layout__left + .layout__right {
        margin-left: var(--left-navbar-width);
    }

    .layout__main {
        padding: 0 var(--offset-md) var(--offset-md);
    }

    .layout__notification {
        max-width: 400px;
        position: fixed;
        right: var(--offset-sm);
        bottom: var(--offset-sm);
    }

    @media screen and (max-width: 1024px) {
        .layout__main {
            padding: 0 var(--offset-sm) var(--offset-sm);
        }

        .layout__left {
            display: none;
        }

        .layout__right {
            margin-left: 0 !important;
        }
    }
</style>
