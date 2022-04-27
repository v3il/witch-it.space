<template>
  <div>
    <div class="wit-flex wit-flex--align-baseline wit-flex--justify-between wit-offset-bottom--xs">
      <h3>
        {{ $t('Items_Filters_Character') }}
      </h3>

      <b-button type="is-ghost" size="is-small" @click="$emit('reset')">
        <b-icon size="is-small" class="is-size-5 wit-color--muted" icon="undo-variant" />
      </b-button>
    </div>

    <Tabs :modes="$options.tabs" :selected-mode="selectedCharacter" expanded size="xs" @switch="$emit('update', $event)">
      <template #tab0>
        {{ $t('Items_Filters_Character_Any') }}
      </template>

      <template #tab1>
        {{ $t('Items_Filters_Character_Hunter') }}
      </template>

      <template #tab2>
        {{ $t('Items_Filters_Character_Witch') }}
      </template>
    </Tabs>
  </div>
</template>

<script>
import Tabs from '@/components/basic/Tabs.vue'

export default {
    name: 'CharacterSelector',

    tabs: ['', 'hunter', 'witch'],

    components: {
        Tabs
    },

    props: {
        selectedCharacter: {
            required: true,
            type: String
        }
    }
}
</script>
