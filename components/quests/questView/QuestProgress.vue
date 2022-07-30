<template>
  <div class="wit-flex wit-flex--align-center">
    <span class="wit-color--muted wit-offset-right--xs">
      {{ $t('Progress') }}:
    </span>

    <b-tag rounded class="wis-progress__tag">
      {{ progress }} / {{ objective }}
    </b-tag>
  </div>
</template>

<script>
export default {
    name: 'QuestProgress',

    props: {
        progress: {
            required: true,
            type: Number
        },

        objective: {
            required: true,
            type: Number
        }
    }
}
</script>

<style scoped>
.wis-progress__tag {
    color: var(--white);
    font-weight: 600;
    font-size: 0.75rem;
    padding: 0.125rem 0.75rem;
    border-radius: 9999px;
    background-color: rgb(59 130 246 / 1);
}
</style>
