<template>
  <header class="wit-transition wit-header wit-flex wit-flex--justify-between">
    <img class="login-page__image" src="images/hey.png" alt="Hey!">

    <ul class="wit-flex wit-flex--align-center">
      <li class="wit-offset-right--md">
        <nuxt-link to="/" class="wit-flex wit-flex--align-center wit-color--white">
          <!--          <b-icon size="is-small" class="is-size-5 wit-offset-right&#45;&#45;xs" icon="cog-sync" />-->
          <span class="wit-inline-block">Мой маркет</span>
        </nuxt-link>
      </li>
      <li class="wit-offset-right--md">
        <nuxt-link to="/" class="wit-flex wit-flex--align-center wit-color--white">
          <!--          <b-icon size="is-small" class="is-size-5 wit-offset-right&#45;&#45;xs" icon="cog-sync" />-->
          <span class="wit-inline-block">Список желаний</span>
        </nuxt-link>
      </li>
      <li class="wit-offset-right--md">
        <nuxt-link to="/" class="wit-flex wit-flex--align-center wit-color--white">
          <!--          <b-icon size="is-small" class="is-size-5 wit-offset-right&#45;&#45;xs" icon="cog-sync" />-->
          <span class="wit-inline-block">Профили</span>
        </nuxt-link>
      </li>
      <li class="wit-offset-right--md">
        <nuxt-link to="/" class="wit-flex wit-flex--align-center wit-color--white">
          <!--          <b-icon size="is-small" class="is-size-5 wit-offset-right&#45;&#45;xs" icon="cog-sync" />-->
          <span class="wit-inline-block">Предметы</span>
        </nuxt-link>
      </li>
      <li class="wit-offset-right--md">
        <nuxt-link to="/" class="wit-flex wit-flex--align-center wit-color--white">
          <!--          <b-icon size="is-small" class="is-size-5 wit-offset-right&#45;&#45;xs" icon="cog-sync" />-->
          <span class="wit-inline-block">Квесты</span>
        </nuxt-link>
      </li>
    </ul>

    <div class="wit-flex wit-flex--justify-end wit-flex--align-center wit-block--full-height">
      <ThemeSwitcher />
      <LocaleSwitcher />
      <UserDropdown v-if="user" class="wit-offset-left--none" />
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import { User } from '@/store'
import UserDropdown from '@/components/UserDropdown'

export default {
    name: 'TopNavBar',

    components: {
        ThemeSwitcher,
        LocaleSwitcher,
        UserDropdown
    },

    computed: {
        ...mapState(User.PATH, [
            User.State.USER
        ])
    }
}
</script>

<style scoped>
.wit-header {
    background-color: var(--header-bg);
    height: 70px;
    position: sticky;
    padding: 0 var(--offset-sm);
    z-index: 50;
}
</style>
