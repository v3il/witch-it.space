<template>
  <b-dropdown animation="fade150" class="wit-block--full-height wit-locale-switcher wit-transition--background" :class="dropdownClasses" position="is-bottom-left" @active-change="updateStatus">
    <template #trigger>
      <div class="wit-flex wit-flex--align-center wit-block--full-height">
        <img v-if="selectedLocale.img" :src="selectedLocale.img" :alt="selectedLocale.label" class="wit-offset-right--xs wit-locale-switcher__img">
        <span class="wit-inline-block">{{ selectedLocale.label }}</span>
        <b-icon size="is-small" class="is-size-5 wit-offset-left--xs" icon="menu-down" />
      </div>
    </template>

    <b-dropdown-item v-for="locale in $options.locales" :key="locale.value" :value="true" class="wit-transition--background" @click="onLocaleChange(locale.value)">
      <div class="wit-flex wit-flex--align-center">
        <img v-if="locale.img" :src="locale.img" :alt="locale.label" class="wit-offset-right--xs wit-locale-switcher__img">
        <span class="wit-inline-block">{{ locale.label }}</span>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapState } from 'vuex'
import { Locale } from '@/store'
import { Locales } from '@/shared'

export default {
    name: 'LocaleSwitcher',

    locales: [
        { value: Locales.EN, label: 'English', img: 'flags/us.svg' },
        { value: Locales.UA, label: 'Українська', img: 'flags/ua.svg' },
        { value: Locales.RU, label: 'Русский', img: 'flags/ru.svg' }
    ],

    data: () => ({
        isOpen: false
    }),

    computed: {
        ...mapState(Locale.PATH, [
            'locale'
        ]),

        selectedLocale () {
            return this.$options.locales.find(({ value }) => value === this.locale)
        },

        dropdownClasses () {
            return {
                open: this.isOpen
            }
        }
    },

    methods: {
        updateStatus (isOpen) {
            this.isOpen = isOpen
        },

        onLocaleChange (locale) {
            if (this.locale === locale) {
                return
            }

            this.$store.dispatch(Locale.Actions.SET_LOCALE, locale)
        }
    }
}
</script>

<style scoped lang="scss">
    .wit-locale-switcher {
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

    .wit-locale-switcher__img {
        height: 16px;
    }
</style>
