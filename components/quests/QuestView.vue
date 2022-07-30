<template>
  <div class="wis-quest-view">
    <div class="wit-flex wit-flex--column wit-flex--justify-between wit-block--full-height">
      <div class="wis-quest-view__info">
        <QuestHeader :quest-type="quest.questType" :is-completed="isCompleted" class="wit-offset-bottom--sm" />

        <h3 class="wit-offset-bottom--sm wis-quest-view__name">
          {{ $t(`Quests_${quest.questTask}`) }}
        </h3>

        <QuestReward :quest="quest" />
        <QuestSeparator />
        <QuestProgress :objective="quest.objective" :progress="quest.progress" />
      </div>

      <div>
        <!--        <p class="wit-text&#45;&#45;center wit-offset-bottom&#45;&#45;xsm wit-font-size&#45;&#45;xxs1 reward wit-font-weight&#45;&#45;400">-->
        <!--          <b-tag type="is-primary" rounded>-->
        <!--            {{ quest.progress }} / {{ quest.objective }}-->
        <!--          </b-tag>-->
        <!--          &lt;!&ndash;<span class="wit-color&#45;&#45;muted">(33%)</span>&ndash;&gt;-->
        <!--        </p>-->
        <div :style="{'--w': progress + '%'}" class="pb" />

        <div class="wis-quest-view__info wit-flex wit-flex--justify-end">
          <b-button type="is-transparent" class="wis-btn--rounded wit-offset-left--auto">
            <i class="mdi mdi-18px mdi-refresh wit-offset-right--xs" />
            Replace
          </b-button>
        </div>
      </div>
    </div>

    <!--        <ItemView-->
    <!--          :item="rewardItem"-->
    <!--          add-border-->
    <!--          add-tooltip-->
    <!--          :item-count="quest.rewardCount"-->
    <!--          class="wit-quest-item__reward-img wit-flex__item&#45;&#45;no-shrink wit-offset-right&#45;&#45;sm"-->
    <!--        />-->

    <!--    <div class="wit-flex__item&#45;&#45;grow wit-offset-right&#45;&#45;md">-->
    <!--      <div class="wit-flex wit-flex&#45;&#45;align-baseline wit-offset-bottom&#45;&#45;sm">-->
    <!--        <p class="wit-line-height&#45;&#45;sm">-->
    <!--          {{ $t(`Quests_${quest.questTask}`) }}-->
    <!--        </p>-->
    <!--      </div>-->

    <!--      <b-progress :value="progress" show-value format="percent" class="wit-quest-item__mobile-progressbar">-->
    <!--        <p class="wit-color&#45;&#45;dark wit-font-weight&#45;&#45;700 wit-font-size&#45;&#45;xxs">-->
    <!--          {{ quest.progress }} / {{ quest.objective }} ({{ progress.toFixed() }}%)-->
    <!--        </p>-->
    <!--      </b-progress>-->
    <!--    </div>-->

    <!--    <div class="wit-flex wit-flex&#45;&#45;align-self-center wit-quest__action-container">-->
    <!--      <b-button-->
    <!--        v-if="isCompleted"-->
    <!--        v-tooltip="$t('Quests_GetReward')"-->
    <!--        type="is-success"-->
    <!--        class="wit-transition wit-quest__action-button"-->
    <!--        @click="onQuestFinalize"-->
    <!--      >-->
    <!--        <i class="mdi mdi-gift mdi-18px" />-->
    <!--      </b-button>-->

    <!--      <b-button-->
    <!--        v-else-->
    <!--        v-tooltip="$t('Quests_UpdateQuest')"-->
    <!--        type="is-danger"-->
    <!--        class="wit-transition wit-quest__action-button"-->
    <!--        :disabled="!canBeReplaced"-->
    <!--        @click="onQuestReplace"-->
    <!--      >-->
    <!--        <i class="mdi mdi-refresh mdi-18px" />-->
    <!--      </b-button>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { computed, useContext, useStore } from '@nuxtjs/composition-api'
import { QuestHeader, QuestReward, QuestSeparator, QuestProgress } from './questView/index.js'
import CircleProgressBar from '@/components/basic/CircleProgressBar.vue'
import ItemName from '@/components/ItemName'
import ItemImage from '@/components/ItemImage'
import ItemView from '@/components/items/ItemView.vue'
import { Card } from '@/components/basic'

export default {
    name: 'QuestView',

    components: {
        CircleProgressBar,
        ItemName,
        ItemImage,
        ItemView,
        Card,
        QuestHeader,
        QuestReward,
        QuestSeparator,
        QuestProgress
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

    setup (props) {
        const isCompleted = computed(() => props.quest.progress >= props.quest.objective)
        const questType = computed(() => props.quest.questType)

        return { isCompleted }
    },

    computed: {
        progress () {
            return Math.min(100, this.quest.progress / this.quest.objective * 100)
        },

        canBeReplaced () {
            return !this.isCompleted && this.canReplace
        },

        // isCompleted () {
        //     return this.quest.progress >= this.quest.objective
        // },

        rewardItem () {
            return this.$itemsService.getById(this.quest.rewardId) ?? {}
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
.wis-quest-view {
    //height: 20rem;
    background-color: var(--card-bg-color);
    border-radius: 24px;
}

.wis-quest-view__name {
    font-weight: 500;
    font-size: 1rem;
    line-height: 24px;
}

.wis-quest-view__info {
    padding: 24px;
}

.tag {
    background-color: rgb(59 130 246 / 1) !important;
    color: var(--white) !important;
    font-weight: 600;
    font-size: 0.75rem;
    padding: 0.125rem 0.75rem;
    border-radius: 9999px;
}

.separator {
    border-top: 2px solid rgba(241, 245, 249, 0.12);
    width: 3rem;
    height: 0.25rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
}

.reward {
    line-height: 1.25rem;
    font-size: 0.8125rem;
}

.pb {
    height: 0.125rem;
    background-color: #e0e7ff;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        width: var(--w);
        background-color: var(--primary);
    }
}

.wit-quest-item__mobile-progressbar {
    --progress-border-radius: var(--offset-xxs);
    --progress-value-background-color: var(--primary);
    --progress-bar-background-color: rgb(242, 242, 242);
    --progress-height: var(--offset-sm);
}

.wit-quest-item__reward-img {
    width: 48px;
}

.wit-quest__action-button {
    padding: 0 var(--offset-xs);
}

@media (max-width: 600px) {
    .wit-quest-item__reward-img {
        width: 48px;
    }

    .wit-quest__action-container {
        align-self: flex-start;
    }
}
</style>
