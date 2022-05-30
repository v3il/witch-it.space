<template>
  <div class="wit-quest-item wit-flex wit-flex--align-start">
    <ItemView :item="rewardItem" add-border :item-count="quest.rewardCount" class="wit-quest-item__reward-img wit-flex__item--no-shrink wit-offset-right--sm" />

    <div class="wit-flex__item--grow wit-offset-right--md">
      <div class="wit-flex wit-flex--align-baseline wit-offset-bottom--sm">
        <!--        <i class="mdi mdi-bullseye-arrow mdi-18px wit-offset-right&#45;&#45;xs" />-->
        <p>{{ $t(`Quests_${quest.questTask}`) }}</p>
      </div>

      <b-progress :value="progress" show-value format="percent" class="wit-quest-item__mobile-progressbar">
        <p class="wit-color--dark wit-font-weight--700 wit-font-size--xxs">
          {{ quest.progress }} / {{ quest.objective }} ({{ progress.toFixed() }}%)
        </p>
      </b-progress>
    </div>

    <div class="wit-flex wit-flex--align-self-center">
      <b-button
        v-if="isCompleted"
        v-tooltip="$t('Quests_GetReward')"
        type="is-success"
        class="wit-transition"
        style="padding: 0 8px;"
        @click="onQuestFinalize"
      >
        <i class="mdi mdi-gift mdi-18px" />
      </b-button>

      <b-button
        v-else
        v-tooltip="$t('Quests_UpdateQuest')"
        type="is-danger"
        class="wit-transition"
        :disabled="!canBeReplaced"
        style="padding: 0 8px;"
        @click="onQuestReplace"
      >
        <i class="mdi mdi-refresh mdi-18px" />
      </b-button>
    </div>
  </div>
</template>

<script>
import CircleProgressBar from '@/components/basic/CircleProgressBar.vue'
import ItemName from '@/components/ItemName'
import ItemImage from '@/components/ItemImage'
import ItemView from '@/components/items/ItemView.vue'

export default {
    name: 'QuestView',

    components: {
        CircleProgressBar,
        ItemName,
        ItemImage,
        ItemView
    },

    props: {
        quest: {
            type: Object,
            required: true
        },

        canReplace: {
            type: Boolean,
            required: true
        }
    },

    computed: {
        progress () {
            return Math.min(100, this.quest.progress / this.quest.objective * 100)
        },

        canBeReplaced () {
            return !this.isCompleted && this.canReplace
        },

        isCompleted () {
            return this.quest.progress >= this.quest.objective
        },

        rewardItem () {
            return this.$itemsService.getById(this.quest.rewardId)
        }
    },

    methods: {
        onQuestReplace () {
            this.$emit('replace', this.quest)
        },

        onQuestFinalize () {
            this.$emit('finalize', this.quest)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-quest-item__mobile-progressbar {
    --progress-border-radius: var(--offset-xxs);
    --progress-value-background-color: var(--primary);
    --progress-bar-background-color: rgb(242, 242, 242);
    --progress-height: var(--offset-sm);
}

.wit-quest-item__reward-img {
    width: 56px;
}
</style>
