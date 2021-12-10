<template>
  <b-navbar class="wiz-header">
    <template #brand>
      <b-navbar-item class="wit-paddings--none wit-font-size--sm">
        <slot name="brand" />

        <!--        <p class="wit-offset-right&#45;&#45;sm">-->
        <!--          {{ activeLink ? $t(activeLink.textId) : '' }}-->
        <!--        </p>-->

        <!--        <b-dropdown-->
        <!--          v-if="0"-->
        <!--          animation="fade150"-->
        <!--          class="wit-block&#45;&#45;full-height wiz-background&#45;&#45;transparent"-->
        <!--          position="is-bottom-right"-->
        <!--        >-->
        <!--          <template #trigger>-->
        <!--            <b-icon class="is-size-5 wit-color&#45;&#45;muted wit-flex wit-block&#45;&#45;full-height" icon="help-box" />-->
        <!--          </template>-->

        <!--          <div class="wit-paddings&#45;&#45;xs">-->
        <!--            Test-->
        <!--          </div>-->
        <!--        </b-dropdown>-->
      </b-navbar-item>
    </template>

    <template #start>
      <!--      <div class="wit-paddings&#45;&#45;none">-->
      <slot name="topMenu" />
      <!--      </div>-->
    </template>

    <template #end>
      <b-navbar-item tag="div" class="wit-header__locale-switcher wit-paddings--none wiz-background--transparent">
        <LocaleSwitcher />
      </b-navbar-item>

      <b-navbar-item tag="div" class="wit-header__theme-switcher wit-paddings--none wiz-background--transparent">
        <ThemeSwitcher />
      </b-navbar-item>

      <b-navbar-item v-if="user" tag="div" class="wit-header__user-dropdown wit-paddings--none wiz-background--transparent">
        <UserDropdown class="wit-offset-left--none" />
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import { User } from '@/store'
import UserDropdown from '@/components/UserDropdown'
import { Routes } from '@/shared'
import { buildUserMarketUrl, buildUserWishlistUrl } from '@/utils'

export default {
    name: 'TopNavBar',

    components: {
        ThemeSwitcher,
        LocaleSwitcher,
        UserDropdown
    },

    props: {
        links: {
            type: Array,
            required: !true
        }
    },

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ]),

        activeLink () {
            return null // this.links.find(({ to }) => to === this.$route.path)
        }
    },

    created () {
        // this.links = get
    },

    methods: {
        getLinkClasses (link) {
            return {
                // active: link === this.activeLink
            }
        }
    }
}
</script>

<style scoped lang="scss">
.wiz-header {
    background-color: var(--header-bg);
    min-height: var(--header-height);
    height: var(--header-height);
    padding: 0 var(--offset-md);
    position: sticky;
    top: 0;
}

.wiz-header__link {
    padding: 0 var(--offset-sm);

    &.active,
    &:active,
    &:focus,
    &:hover {
        color: white;
        text-decoration: none;
        background-color: var(--locale-switcher-hover-background);
    }
}

.wiz-header__logo {
    max-height: var(--header-height);
    height: 100%;
}

@media screen and (max-width: 1024px) {
    .wiz-header {
        padding: 0;
    }

    .wiz-header__link {
        padding: var(--offset-xs) var(--offset-sm);
    }

    .wit-header__locale-switcher,
    .wit-header__theme-switcher {
        border-right: var(--default-border);
    }

    .wit-header__user-dropdown {
        margin-left: auto;
        border-left: var(--default-border);
    }
}
</style>
