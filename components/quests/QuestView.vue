<template>
  <div class="wit-quest-item wit-flex wit-flex--align-start">
    <ItemView :item="rewardItem" add-border :item-count="quest.rewardCount" class="wit-quest-item__reward-img wit-flex__item--no-shrink wit-offset-right--sm" />

    <div class="wit-flex__item--grow wit-offset-right--md">
      <div class="wit-flex wit-flex--align-center wit-offset-bottom--sm wit-font-size--sm">
        <b-icon icon="bullseye-arrow" size="is-small" class="is-size-4 wit-offset-right--xs" />
        <p>{{ $t(`Quests_${quest.questTask}`) }}</p>
      </div>

      <!--      <div class="wit-flex wit-flex&#45;&#45;align-center wit-offset-bottom&#45;&#45;sm wit-color&#45;&#45;muted">-->
      <!--        <b-icon icon="gift" size="is-small" class="is-size-5 wit-offset-right&#45;&#45;xs" />-->
      <!--        <p>{{ quest.rewardCount }} x <ItemName :item="rewardItem" /></p>-->
      <!--      </div>-->

      <b-progress :value="progress" show-value format="percent" class="wit-quest-item__mobile-progressbar wit-offset-bottom--md1 wit-none--desktop1">
        <p class="wit-color--dark wit-font-weight--700">
          {{ quest.progress }} / {{ quest.objective }} ({{ progress.toFixed() }}%)
        </p>
      </b-progress>
    </div>

    <div class="wit-flex wit-flex--align-self-center">
      <b-button
        v-if="isCompleted"
        v-tooltip="$t('Quests_GetReward')"
        type="is-success"
        size="is-small1"
        class="wit-transition wit-offset-right--xxs1"
        style="padding: 0 8px;"
        @click="onQuestFinalize"
      >
        <i class="mdi mdi-gift mdi-18px" />

        <!--        <div class="wit-flex wit-flex&#45;&#45;center">-->
        <!--          <b-icon icon="gift" size="is-small" class="is-size-6 wit-offset-right&#45;&#45;none" />-->
        <!--          &lt;!&ndash;          {{ $t('Quests_GetReward') }}&ndash;&gt;-->
        <!--        </div>-->
      </b-button>

      <b-button
        v-else
        v-tooltip="$t('Quests_UpdateQuest')"
        type="is-danger is-light1"
        size="is-small1"
        class="wit-transition"
        :disabled="!canBeReplaced"
        style="padding: 0 8px;"
        @click="onQuestReplace"
      >
        <i class="mdi mdi-refresh-circle mdi-18px" />

        <!--        <div class="wit-flex wit-flex&#45;&#45;center">-->
        <!--          <b-icon icon="refresh-circle" size="is-small" class="is-size-5 wit-offset-right&#45;&#45;none" />-->
        <!--          &lt;!&ndash;          {{ $t('Quests_UpdateQuest') }}&ndash;&gt;-->
        <!--        </div>-->
      </b-button>
    </div>

    <!--    <CircleProgressBar :radius="45" :stroke-width="7" :value="progress" class="wit-none&#45;&#45;mobile">-->
    <!--      <p class="wit-offset-bottom&#45;&#45;xxs">-->
    <!--        {{ quest.progress }} / {{ quest.objective }}-->
    <!--      </p>-->
    <!--      <p class="wit-font-size&#45;&#45;xxs wit-color&#45;&#45;muted">-->
    <!--        ({{ progress.toFixed() }}%)-->
    <!--      </p>-->
    <!--    </CircleProgressBar>-->
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

    @media screen and (max-width: 768px) {
        & {
            //width: 35px;
        }
    }
}
</style>
