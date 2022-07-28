<template>
  <div class="wis-quest-actions">
    <b-button type="is-primary" class="wis-btn--rounded">
      <i class="mdi mdi-18px wit-offset-right--xs mdi-refresh" />
      {{ $t('Quests_UpdateQuests') }}
    </b-button>

    <b-tag v-if="!isUpdateAvailable" type="is-warning" class="wit-quests__counter">
      {{ timeToNextUpdate }}
    </b-tag>
  </div>
</template>

<script>
export default {
    name: 'QuestActions',

    setup () {
        return {
            isUpdateAvailable: true,
            timeToNextUpdate: ''
        }
    }
}
</script>

<style scoped lang="scss">
.wis-quest-actions {
    margin: var(--offset-sm) 0 var(--offset-sm) var(--offset-sm);

    @media (max-width: 600px) {
        margin-bottom: 0;
        margin-left: 0;
    }
}
</style>
