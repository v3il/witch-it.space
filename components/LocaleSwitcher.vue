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
        { value: 'ua', label: 'Ukrainian', img: 'flags/ua.svg' },
        { value: 'ru', label: 'Russian', img: 'flags/ru.svg' }
    ],

    components: {
        Dropdown
    },

    computed: {
        ...mapState(['locale'])
    },

    methods: {
        ...mapActions(['setLocale']),

        onLocaleChange (locale) {
            this.setLocale(locale)
        }
    }
}
</script>

<style scoped>

</style>
