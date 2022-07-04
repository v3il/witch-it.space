<template>
  <div class="wit-flex wit-flex--column">
    <div class="wit-flex wit-flex--align-center wit-flex--justify-between wis-logo-wrapper">
      <Logo class="wis-logo" />

      <div class="wit-flex wit-flex--align-center">
        <Notifications class="wit-offset-right--xsm" />
        <UserDropdown />
      </div>
    </div>

    <div class="wit-flex wit-flex--column wit-flex--justify-center wit-block--full-height">
      <b-button
        v-for="link in links"
        :key="link.to"
        type="is-ghost"
        class="is-large wit-transition wit-link"
        :to="link.to"
        tag="nuxt-link"
      >
        <div class="wit-link__icon-container wit-position--relative" :class="getLinkClass(link)">
          <b-icon class="is-size-5 wit-color--Y400" :icon="link.icon" />
        </div>
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { User } from '@/store/index.js'
import Logo from '@/components/sidebar/Logo.vue'
import Notifications from '@/components/sidebar/Notifications.vue'
import UserDropdown from '@/components/sidebar/UserDropdown.vue'

export default {
    name: 'LeftNavBar',

    components: {
        Logo,
        Notifications,
        UserDropdown
    },

    props: {
        links: {
            type: Array,
            required: true
        }
    },

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ]),

        ...mapGetters(User.PATH, [
            User.Getters.IS_VERIFIED
        ])
    },

    methods: {
        getLinkClass (link) {
            return {
                'wit-indicator wit-indicator--6px': !this.isVerified && link.withIndicator
            }
        }
    }
}
</script>

<style scoped lang="scss">
.wis-logo-wrapper {
    padding: var(--offset-sm) var(--offset-sm) var(--offset-sm) var(--offset-md);
}

.wis-logo {
    width: 48px;
    height: auto;
}

.wit-link {
    border-radius: 0;

    &:hover,
    &.nuxt-link-exact-active {
        background-color: rgba(239, 242, 247, 0.05);
    }
}

.wit-link__icon-container {
    height: 1.5em;
    width: 1.5em;
}
</style>
