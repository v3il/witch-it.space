<template>
  <Dropdown position="bottom-end" class="wit-block--full-height">
    <template #trigger>
      <b-button type="is-ghost" class="wit-block--full-height wit-locale-switcher wit-transition--background">
        <div class="wit-flex wit-flex--align-center">
          <img v-if="selectedLocale.img" :src="selectedLocale.img" :alt="selectedLocale.label" class="wit-offset-right--xs wit-locale-switcher__img">
          <span class="wit-line-height--xs">{{ selectedLocale.label }}</span>
        </div>
      </b-button>
    </template>

    <template #items>
      <DropdownItem v-for="locale in $options.locales" :key="locale.value" @click="onLocaleChange(locale.value)">
        <div class="wit-flex wit-flex--align-center">
          <img v-if="locale.img" :src="locale.img" :alt="locale.label" class="wit-offset-right--xs wit-locale-switcher__img">
          <span class="wit-line-height--xs">{{ locale.label }}</span>
        </div>
      </DropdownItem>
    </template>
  </Dropdown>
</template>

<script>
import { mapState } from 'vuex'
import { Locale } from '@/store/index.js'
import { Locales } from '@/shared/index.js'
import { buildFlagUrl } from '@/utils/buildUrls.js'
import Dropdown from '@/components/basic/dropdown/Dropdown.vue'
import DropdownItem from '@/components/basic/dropdown/DropdownItem.vue'

export default {
    name: 'LocaleSwitcher',

    locales: [
        { value: Locales.EN, label: 'English', img: buildFlagUrl(Locales.EN) }
        // { value: Locales.UA, label: 'Українська', img: buildFlagUrl(Locales.UA) }
        // { value: Locales.RU, label: 'Русский', img: buildFlagUrl(Locales.RU) }
    ],

    components: {
        Dropdown,
        DropdownItem
    },

    computed: {
        ...mapState(Locale.PATH, [
            Locale.State.LOCALE
        ]),

        selectedLocale () {
            return this.$options.locales.find(({ value }) => value === this.locale)
        }
    },

    methods: {
        onLocaleChange (locale) {
            if (this.locale === locale) {
                return
            }

            this.$store.dispatch(Locale.F.Actions.SET_LOCALE, locale)
            this.$eventBus.$emit('localeChanged', locale)
        }
    }
}
</script>

<style scoped lang="scss">
    .wit-locale-switcher {
        color: white;
        padding: var(--offset-sm);
        cursor: pointer;

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
