<template>
  <div class="wit-quest-item wit-flex wit-flex--align-start">
    <ItemImage :item="quest.rewardItem" :item-count="quest.rewardCount" class="wit-quest-item__reward-img wit-flex__item--no-shrink wit-offset-right--sm" />
    <!--    <div class="wit-offset-right&#45;&#45;sm wit-position&#45;&#45;relative">-->
    <!--      <img-->
    <!--        :src="quest.rewardItem.iconUrl"-->
    <!--        :class="itemImageClass"-->
    <!--        :alt="quest.rewardItem.name"-->
    <!--        :title="quest.rewardItem.name"-->
    <!--        width="70"-->
    <!--        height="70"-->
    <!--      >-->
    <!--      <div class="counter">-->
    <!--        x{{ quest.rewardCount }}-->
    <!--      </div>-->
    <!--    </div>-->

    <div class="wit-flex__item--grow wit-offset-right--sm">
      <div class="wit-flex wit-flex--align-center wit-offset-bottom--xs" style="font-size: 20px;">
        <b-icon icon="bullseye-arrow" size="is-small" class="is-size-4 wit-offset-right--xs" />
        <p>{{ $t(`Quests_${quest.questTask}`) }}</p>
      </div>

      <div class="wit-flex wit-flex--align-center wit-offset-bottom--sm" style="color: #9ca8b3 !important;">
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
      <p class="wit-color--white-half wit-font-size--xxs">
        ({{ progress.toFixed() }}%)
      </p>
    </CircleProgressBar>

    <!--    <div class="pie-wrapper progress-60" :style="{'&#45;&#45;progress': progress}">-->
    <!--      <span class="label wit-flex wit-flex&#45;&#45;center">-->
    <!--        <p>{{ quest.progress }} / {{ quest.objective }}</p>-->
    <!--        <p>{{ progress }}%</p>-->
    <!--      </span>-->
    <!--      <div class="pie">-->
    <!--        <div class="left-side half-circle" />-->
    <!--        <div class="right-side half-circle" />-->
    <!--      </div>-->
    <!--    </div>-->
  </div>

<!--  <tr>-->
<!--    <td style="padding: 0 8px;">-->
<!--      <div style="display: flex; align-items: center;" class="wit-color&#45;&#45;white">-->
<!--        {{ $t(`Quests_${quest.questTask}`) }}-->
<!--        <button style="margin-left: 8px;" :disabled="!canReplace" @click="$emit('replace')">-->
<!--          R-->
<!--        </button>-->

<!--        <button style="margin-left: 8px;" @click="$emit('finalize')">-->
<!--          F-->
<!--        </button>-->
<!--      </div>-->
<!--    </td>-->
<!--    <td>-->
<!--      <img :src="quest.rewardItem.iconUrl" :alt="quest.rewardItem.iconUrl" :title="quest.rewardItem.name" width="50" height="50">-->
<!--      <div class="counter">-->
<!--        x{{ quest.rewardCount }}-->
<!--      </div>-->
<!--    </td>-->
<!--    <td class="progress-cell">-->
<!--      <b-progress type="is-success" :value="60" show-value>-->
<!--        10/10-->
<!--      </b-progress>-->
<!--      <div class="progress" :style="{ width: `${Math.min(100, quest.progress / quest.objective * 100)}%` }" />-->
<!--      <span style="z-index: 2; position: relative;">{{ quest.progress }} / {{ quest.objective }}</span>-->
<!--    </td>-->
<!--  </tr>-->
</template>

<script>
import CircleProgressBar from '@/components/quests/CircleProgressBar'
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
        },

        itemNameClass () {
            return {
                veryrare: 'wit-color--very-rare',
                whimsical: 'wit-color--whimsical'
            }[this.quest.rewardItem.tagRarity]
        },

        itemImageClass () {
            return {
                veryrare: 'wit-border--very-rare',
                whimsical: 'wit-border--whimsical'
            }[this.quest.rewardItem.tagRarity]
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

.progress-cell {
    position: relative;
    width: 50px;
}

td {
    border: 1px solid lightgreen;
    border-collapse: collapse;
}

table td:first-child {
    width: 150px;
}

table td:nth-child(2) {
    width: 50px;
    position: relative;
}

table td:last-child {
    color: red;
    background-color: #121212;
    position: relative;
}

.progress {
    background-color: lightgreen;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
}

.counter {
    position: absolute;
    top: 0;
    right: 0;
    background: lightgreen;
    color: #121212;
    font-weight: 700;
    padding: 2px;
    border-bottom-left-radius: 6px;
    font-size: 10px;
}

// -- vars
$bg-color: #34495e;
$default-size: 100px;
$label-font-size: 20px;
$label-font-size-redo: 20px;

// -- mixins
@mixin size($width, $height) {
    height: $height;
    width: $width;
}

@mixin draw-progress($progress, $color) {
    .pie {
        .half-circle {
            border-color: $color;
        }

        .left-side {
            transform: rotate($progress * 3.6deg);
        }

        //@if $progress <= 50 {
        //    .right-side {
        //        display: none;
        //    }
        //}
        //
        //@else {
        //    clip: rect(auto, auto, auto, auto);
        //
        //    .right-side {
        //        transform: rotate(180deg);
        //    }
        //}
    }
}

@mixin draw-progress--solid($progress, $color, $bg-color) {
    background: linear-gradient(to right, $color 50%, $bg-color 50%);

    &::before {
        @if $progress <= 50 {
            background: $bg-color;
            transform: rotate((100 - (50 - $progress)) / 100 * 360deg * -1);
        }

        @else {
            background: $color;
            transform: rotate((100 - $progress) / 100 * 360deg);
        }
    }
}

// -- selectors
.set-size {
    font-size: 10em;
}

.charts-container {
    &::after {
        clear: both;
        content: '';
        display: table;
    }
}

.pie-wrapper {
    @include size($default-size, $default-size);
    @include draw-progress(70, var(--primary));

    float: left;
    margin: 15px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &:nth-child(3n + 1) {
        clear: both;
    }

    .pie {
        @include size(100%, 100%);

        clip: rect(0, $default-size, $default-size, $default-size / 2);
        left: 0;
        position: absolute;
        top: 0;

        .half-circle {
            @include size(100%, 100%);

            border: ($default-size / 10) solid #3498db;
            border-radius: 50%;
            clip: rect(0, $default-size / 2, $default-size, 0);
            left: 0;
            position: absolute;
            top: 0;
        }
    }

    .label {
        //background: $bg-color;
        border-radius: 50%;
        color: #ecf0f1;
        cursor: default;
        display: block;
        font-size: $label-font-size;
        text-align: center;
        //line-height: $label-font-size-redo * 0.7;
    }

    &.style-2 {
        .label {
            background: none;
            color: #7f8c8d;

            .smaller {
                color: #bdc3c7;
            }
        }
    }
}
</style>
