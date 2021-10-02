<template>
  <Dropdown :value="locale" :variants="$options.values" class="wit-block--full-height wit-dropdown--locale-switcher" @change="onLocaleChange" />
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Dropdown from '@/components/base/Dropdown'

const { mapState, mapActions } = createNamespacedHelpers('locale')

export default {
    name: 'LocaleSwitcher',

    values: [
        { value: 'en', label: 'English', img: 'flags/us.svg' },
        { value: 'ua', label: 'Українська', img: 'flags/ua.svg' },
        { value: 'ru', label: 'Русский', img: 'flags/ru.svg' }
    ],

    components: {
        Dropdown
    },

    computed: {
        ...mapState(['locale'])
    },

    methods: {
        ...mapActions(['setLocale']),

        async onLocaleChange (locale) {
            console.log(locale)

            // this.switchLocalePath(locale)
            // this.$i18n.setLocale(locale)
            // this.$i18n.setLocaleCookie(locale)
            // this.$router.replace(this.switchLocalePath(locale))

            if (this.locale === locale) {
                return
            }

            await this.setLocale(locale)
            // // this.$router.go(0)
            //
            // this.$i18n.setLocaleCookie(locale)
            // this.$i18n.setLocale(locale)

            // if (this.locale === locale) {
            //     return
            // }
            //
            // await this.setLocale(locale)
            this.$router.go(0)
            // this.$forceUpdate()
        }
    }
}
</script>

<style scoped>

</style>
