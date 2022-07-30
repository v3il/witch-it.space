<template>
  <div class="wit-flex wit-flex--align-start">
    <ItemView
      :item="rewardItem"
      add-border
      add-tooltip
      class="wis-quest-reward__image wit-flex__item--no-shrink wit-offset-right--sm"
    />

    <p class="wis-quest-reward__name">
      <span class="wit-color--muted wit-offset-top--xxs">{{ quest.rewardCount }} &times;</span>
      <span class="wit-block">{{ rewardItem.name }}</span>
    </p>
  </div>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'
import ItemView from '@/components/items/ItemView.vue'

export default {
    name: 'QuestReward',

    components: {
        ItemView
    },

    props: {
        quest: {
            type: Object,
            required: true
        }
    },

    setup (props) {
        const { $itemsService } = useContext()
        const rewardItem = computed(() => $itemsService.getById(props.quest.rewardId) ?? {})

        return { rewardItem }
    }
}
</script>

<style scoped lang="scss">
.wis-quest-reward__image {
    width: 48px;
}

.wis-quest-reward__name {
    line-height: 1.5;
}
</style>
