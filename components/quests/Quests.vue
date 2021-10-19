<template>
  <div>
    <table v-if="quests.length" class="table">
      <Quest
        v-for="quest in quests"
        :key="quest.id"
        :quest="quest"
        :can-replace="canReplace"
        :allow="allow"
        @replace="$emit('replace', quest)"
        @finalize="$emit('finalize', quest)"
      />
    </table>

    <p v-else>
      No quests
    </p>
  </div>
</template>

<script>
import Quest from './Quest'

export default {
    name: 'Quests',

    components: {
        Quest
    },

    props: {
        quests: Array,
        canReplace: Boolean,
        allow: Boolean
    }
}
</script>

<style scoped>
table {
    width: 100%;
}

</style>
