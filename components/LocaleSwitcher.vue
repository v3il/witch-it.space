<template>
  <Dropdown :value="locale" :variants="$options.values" class="wit-block--full-height" @change="onLocaleChange" />
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
            if (this.locale === locale) {
                return
            }

            await this.setLocale(locale)
            this.$router.go(0)
        }
    }
}
</script>

<style scoped>

</style>
