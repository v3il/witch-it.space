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
        <div class="wit-user-dropdown__image-block wit-offset-right--xs wit-flex wit-flex--center">
          <img
            class="wit-user-dropdown__image"
            :src="avatarUrl"
            alt="Avatar"
          >
        </div>

        <div class="username">
          {{ user.displayName }}
        </div>
      </div>
    </template>

    <b-dropdown-item class="wit-transition--background">
      <nuxt-link to="/settings" class="wit-flex wit-flex--align-center wit-color--white">
        <b-icon size="is-small" class="is-size-5 wit-offset-right--xs" icon="cog-sync" />
        <span class="wit-inline-block username">{{ $t('Settings') }}</span>
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
import { buildAvatarUrl } from '@/utils'

export default {
    name: 'UserDropdown',

    data: () => ({
        isOpen: false
    }),

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ]),

        dropdownClasses () {
            return {
                open: this.isOpen
            }
        },

        avatarUrl () {
            return buildAvatarUrl(this.user.avatarId)
        }
    },

    methods: {
        updateStatus (isOpen) {
            this.isOpen = isOpen
        },

        logout () {
            this.$store.dispatch(User.F.Actions.LOGOUT).catch(this.$showError)
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

.wit-user-dropdown__image-block.with-error {
    position: relative;

    &::before {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        top: -8px;
        right: -8px;
        background-color: var(--danger);
        animation: pulse 10s infinite linear;
        will-change: opacify;
        border: 3px solid #36394c;
        box-sizing: content-box;
    }
}

.wit-user-dropdown__image {
    height: 32px;
    width: 32px;
    max-height: none;
    border-radius: 4px;
}
</style>
