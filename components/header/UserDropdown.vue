<template>
  <Dropdown position="bottom-end" class="wit-block--full-height">
    <template #trigger>
      <b-button type="is-ghost" class="wit-block--full-height wit-user-dropdown wit-transition--background">
        <div class="wit-flex wit-flex--align-center wit-block--full-height">
          <img
            class="wit-user-dropdown__image wit-offset-right--xs"
            :src="avatarUrl"
            alt="Avatar"
          >

          <span>{{ user.displayName }}</span>
        </div>
      </b-button>
    </template>

    <template #items>
      <DropdownItem>
        <nuxt-link to="/settings" class="wit-flex wit-flex--align-center wit-color--white">
          <b-icon size="is-small" class="is-size-5 wit-offset-right--xxs" icon="cog-sync" />
          <span>{{ $t('Settings') }}</span>
        </nuxt-link>
      </DropdownItem>

      <DropdownItem @click="onLogout">
        <div class="wit-flex wit-flex--align-center wit-color--danger">
          <b-icon size="is-small" class="is-size-5 wit-offset-right--xxs" icon="logout-variant" />
          <span>{{ $t('Logout') }}</span>
        </div>
      </DropdownItem>
    </template>
  </Dropdown>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { StoreModules, User } from '@/store/index.js'
import { buildAvatarUrl } from '@/utils/index.js'
import Dropdown from '@/components/basic/dropdown/Dropdown.vue'
import DropdownItem from '@/components/basic/dropdown/DropdownItem.vue'

export default {
    name: 'UserDropdown',

    components: {
        Dropdown,
        DropdownItem
    },

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ]),

        avatarUrl () {
            return buildAvatarUrl(this.user.avatarId)
        }
    },

    methods: {
        ...mapActions(StoreModules.USER, {
            logout: 'logout'
        }),

        onLogout () {
            this.logout().catch(this.$showError)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-user-dropdown {
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
    height: var(--offset-lg);
    width: var(--offset-lg);
    max-height: none;
    border-radius: var(--offset-xxs);
}
</style>
