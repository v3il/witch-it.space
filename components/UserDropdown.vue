<template>
  <b-dropdown
    animation="fade150"
    class="wit-block--full-height wit-user-dropdown wit-transition--background"
    :class="dropdownClasses"
    position="is-bottom-left"
    @active-change="updateStatus"
  >
    <template #trigger>
      <div class="wit-flex wit-flex--align-center wit-block--full-height">
        <div class="login-page__image-block wit-offset-right--xs wit-flex wit-flex--center">
          <img
            class="wit-user-dropdown__image"
            :src="`images/${user.avatarId}.png`"
            alt="Hey!"
            width="36px"
            height="36px"
            style="border-radius: 50%;"
          >
        </div>

        {{ user.displayName }}

        <!--        <b-icon size="is-small" class="is-size-5 wit-offset-left&#45;&#45;xs" icon="menu-down" />-->
      </div>
    </template>

    <b-dropdown-item class="wit-transition--background">
      <nuxt-link to="/settings" class="wit-flex wit-flex--align-center wit-color--white">
        <b-icon size="is-small" class="is-size-5 wit-offset-right--xs" icon="cog-sync" />
        <span class="wit-inline-block">{{ $t('Settings') }}</span>
      </nuxt-link>
    </b-dropdown-item>

    <b-dropdown-item class="wit-transition--background" @click="logout">
      <div class="wit-flex wit-flex--align-center wit-color--danger">
        <b-icon size="is-small" class="is-size-5 wit-offset-right--xs" icon="logout-variant" />
        <span class="wit-inline-block">{{ $t('Logout') }}</span>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapState } from 'vuex'
import { User } from '@/store'
import { Routes } from '@/shared'

export default {
    name: 'UserDropdown',

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ]),

        dropdownClasses () {
            return {
                open: this.isOpen
            }
        }
    },

    data: () => ({
        isOpen: false
    }),

    methods: {
        updateStatus (isOpen) {
            this.isOpen = isOpen
        },

        logout () {
            this.$store.dispatch(User.F.Actions.LOGOUT)
                .then(() => this.$router.replace(Routes.LOGIN))
        }
    }
}
</script>

<style scoped lang="scss">
.wit-user-dropdown {
    --dropdown-item-padding: var(--offset-xs) var(--offset-md);

    color: white;
    padding: var(--offset-sm);
    cursor: pointer;

    &.open,
    &:active,
    &:focus,
    &:hover {
        color: white;
        text-decoration: none;
        background-color: var(--locale-switcher-hover-background);
    }
}

.wit-user-dropdown__image {
    height: 28px;
    width: 28px;
    max-height: none;
}
</style>
