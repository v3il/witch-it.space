<template>
  <div class="wis-quest-view">
    <div class="wit-flex wit-flex--column wit-flex--justify-between wit-block--full-height">
      <div class="wis-quest-view__info">
        <QuestHeader :quest="quest" class="wit-offset-bottom--sm" />

        <h3 style="font-weight: 500; font-size: 1rem; line-height: 24px;" class="wit-offset-bottom--sm">
          {{ $t(`Quests_${quest.questTask}`) }}
        </h3>

        <!--        <div class="separator" />-->

        <!--        <h3 class="wit-color&#45;&#45;muted wit-flex wit-flex&#45;&#45;align-center wit-offset-bottom&#45;&#45;sm reward wit-font-weight&#45;&#45;400">-->
        <!--          <i class="mdi mdi-18px mdi-gift wit-offset-right&#45;&#45;xs" />-->
        <!--          Reward:-->
        <!--        </h3>-->

        <div class="wit-flex wit-flex--align-start">
          <ItemView
            :item="rewardItem"
            add-border
            add-tooltip
            class="wit-quest-item__reward-img wit-flex__item--no-shrink wit-offset-right--sm"
          />

          <p style="line-height: 1.5;">
            <span class="wit-color--muted wit-offset-top--xxs">{{ quest.rewardCount }} &times; </span>
            <span class="wit-block">{{ rewardItem.name }}</span>
            <!--            {{ quest.rewardCount }} <span class="wit-color&#45;&#45;muted">&times;</span>-->
          </p>
        </div>
      </div>

      <div>
        <p class="wit-text--center wit-offset-bottom--xsm wit-font-size--xxs1 reward wit-font-weight--400">
          <b-tag type="is-primary" rounded>
            {{ quest.progress }} / {{ quest.objective }}
          </b-tag>
          <!--<span class="wit-color&#45;&#45;muted">(33%)</span>-->
        </p>
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
import QuestHeader from './questView/QuestHeader.vue'
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
        QuestHeader
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
    height: 20rem;
    background-color: var(--card-bg-color);
    border-radius: 24px;
}

.wis-quest-view__info {
    padding: 24px;
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
