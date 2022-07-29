<template>
  <div class="wit-flex wit-flex--align-center wit-flex--justify-between">
    <b-tag type="is-warning" rounded class="tag">
      Weekly
    </b-tag>

    <i class="mdi mdi-18px mdi-check-decagram" style="color: rgb(22, 163, 74);" />
  </div>
</template>

<script>
import { useContext, useStore } from '@nuxtjs/composition-api'

export default {
    name: 'QuestHeader',

    props: {
        quest: {
            required: true,
            type: Object
        }
    },

    setup () {
        // const store = useStore()
        // const { $showError } = useContext()
        //
        // const updateQuests = () => {
        //     return store.dispatch('quest/updateUserQuests').catch($showError)
        // }
        //
        // return { updateQuests }
    }
}
</script>

<style scoped lang="scss">
.tag {
    background-color: rgb(59 130 246 / 1) !important;
    color: var(--white) !important;
    font-weight: 600;
    font-size: 0.75rem;
    padding: 0.125rem 0.75rem;
    border-radius: 9999px;
}
</style>
