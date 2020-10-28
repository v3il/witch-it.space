<template>
  <header style="height: 70px; position: sticky;" class="wit-background--content wit-transition">
    Header

    <input type="checkbox" :checked="theme === 'dark'" @change="onC">Theme {{ theme }}
  </header>
</template>

<script>
// import { createNamespacedHelpers } from 'vuex'
//
// const { mapState, mapMutations } = createNamespacedHelpers('theme')

export default {
    name: 'TopNavBar',

    props: {
        theme: {
            required: true,
            type: String
        }
    },

    // computed: {
    //     ...mapState(['theme'])
    // },

    methods: {
        // ...mapMutations(['setTheme']),

        onSubmit () {

        },

        onC ({ target }) {
            const theme = target.checked ? 'dark' : 'light'
            this.$emit('changeTheme', theme)

            // window.document.body.classList.toggle('body--light', theme === 'light')
            // window.document.body.classList.toggle('body--dark', theme === 'dark')

            // this.setTheme(theme)
        }
    }
}
</script>
