<template>
  <div class="wit-quest-item wit-flex wit-flex--align-start">
    <ItemImage :item="quest.rewardItem" :item-count="quest.rewardCount" class="wit-quest-item__reward-img wit-flex__item--no-shrink wit-offset-right--sm" />

    <div class="wit-flex__item--grow wit-offset-right--sm">
      <div class="wit-flex wit-flex--align-center wit-offset-bottom--xs wit-font-size--sm">
        <b-icon icon="bullseye-arrow" size="is-small" class="is-size-4 wit-offset-right--xs" />
        <p>{{ $t(`Quests_${quest.questTask}`) }}</p>
      </div>

      <div class="wit-flex wit-flex--align-center wit-offset-bottom--sm wit-color--muted">
        <b-icon icon="gift" size="is-small" class="is-size-5 wit-offset-right--xs" />
        <p>{{ quest.rewardCount }} x <ItemName :item="quest.rewardItem" /></p>
      </div>

      <b-progress :value="progress" show-value format="percent" class="wit-quest-item__mobile-progressbar wit-offset-bottom--md wit-none--desktop">
        <p class="wit-color--dark wit-font-weight--700">
          {{ quest.progress }} / {{ quest.objective }} ({{ progress.toFixed() }}%)
        </p>
      </b-progress>

      <div class="wit-flex wit-flex--align-center">
        <b-button type="is-success" size="is-small" class="wit-transition wit-offset-right--xxs" :disabled="!isCompleted" @click="onQuestFinalize">
          <div class="wit-flex wit-flex--center">
            <b-icon icon="gift" size="is-small" class="is-size-6 wit-offset-right--none" />
            {{ $t('Quests_GetReward') }}
          </div>
        </b-button>

        <b-button type="is-danger is-light" size="is-small" class="wit-transition" :disabled="!canBeReplaced" @click="onQuestReplace">
          <div class="wit-flex wit-flex--center">
            <b-icon icon="refresh-circle" size="is-small" class="is-size-5 wit-offset-right--none" />
            {{ $t('Quests_UpdateQuest') }}
          </div>
        </b-button>
      </div>
    </div>

    <CircleProgressBar :radius="45" :stroke-width="7" :value="progress" class="wit-none--mobile">
      <p class="wit-offset-bottom--xxs">
        {{ quest.progress }} / {{ quest.objective }}
      </p>
      <p class="wit-font-size--xxs wit-color--muted">
        ({{ progress.toFixed() }}%)
      </p>
    </CircleProgressBar>
  </div>
</template>

<script>
import CircleProgressBar from '@/components/basic/CircleProgressBar.vue'
import ItemName from '@/components/ItemName'
import ItemImage from '@/components/ItemImage'

export default {
    name: 'QuestView',

    components: {
        CircleProgressBar,
        ItemName,
        ItemImage
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
    --progress-value-background-color: rgb(2, 164, 153);
    --progress-bar-background-color: rgb(242, 242, 242);
}

.wit-quest-item__reward-img {
    width: 70px;

    @media screen and (max-width: 768px) {
        & {
            width: 35px;
        }
    }
}
</style>
