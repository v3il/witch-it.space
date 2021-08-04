<template>
  <div class="a wit-flex wit-flex--column wit-flex--justify-between">
    <img class="wiz-header__logo" src="/images/hey.webp" alt="Hey!" style="max-height: 60px;">

    <div class="wit-flex wit-flex--column">
      <b-button
        v-for="link in links"
        :key="link.to"
        type="is-ghost"
        class="is-large wit-transition wit-link"
        :to="link.to"
        tag="nuxt-link"
        :class="getLinkClasses(link)"
      >
        <b-icon class="is-size-5 wit-color--Y400" :icon="link.icon" />
      </b-button>
    </div>

    <b-dropdown
      animation="fade150"
      :class="'wit-block--full-height wit-transition--background wit-dropdown--offset-xs wit-offset-bottom--sm'"
      style="display: flex; justify-content: center; border-radius: 4px; cursor: pointer; height: 35px; width: 100%;"
      position="is-top-right"
      append-to-body
      @active-change="() => {}"
    >
      <template #trigger>
        <div class="wit-flex wit-flex--center wit-block--full-height" style="width: 32px;">
          <i class="mdi mdi-dots-grid mdi-24px wit-color--Y400" />
        </div>
      </template>

      <div style="width: 600px; height: 600px;">
        Filters
      </div>
    </b-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { User } from '@/store'
import { buildUserMarketUrl, buildUserWishlistUrl } from '@/utils'
import { Routes } from '@/shared'

export default {
    name: 'LeftNavBar',

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

        activeLink () {
            return this.links.find(({ to }) => to === this.$route.path)
        }
    },

    methods: {
        getLinkClasses (link) {
            return {
                active: link === this.activeLink
            }
        }
    }
}
</script>

<style scoped lang="scss">
.wit-link {
    border-radius: 0;

    &:hover,
    &.active {
        background-color: rgba(239, 242, 247, 0.05);
    }
}
</style>
