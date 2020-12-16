<template>
  <div class="quest-item wit-flex wit-offset-bottom--md">
    <div class="wit-offset-right--sm wit-position--relative">
      <img :src="quest.rewardItem.iconUrl" :alt="quest.rewardItem.iconUrl" :title="quest.rewardItem.name" width="50" height="50">
      <div class="counter">
        x{{ quest.rewardCount }}
      </div>
    </div>

    <div class="wit-flex__item--grow">
      <div class="wit-flex wit-flex--align-center wit-offset-bottom--xs">
        <b-icon icon="bullseye-arrow" size="is-small" class="is-size-5 wit-offset-right--xs" />
        <p>{{ $t(`Quests_${quest.questTask}`) }}</p>
      </div>

      <div class="wit-flex wit-flex--align-center wit-offset-bottom--xs">
        <b-icon icon="gift" size="is-small" class="is-size-5 wit-offset-right--xs" />
        <p><span class="wit-color--danger">{{ quest.rewardCount }} x </span>{{ quest.rewardItem.name }}</p>
      </div>

      <b-progress type="is-success" :value="progress" class="wit-color--primary" show-value>
        <span style="color: black; font-weight: bold;">{{ quest.progress }} / {{ quest.objective }}</span>
      </b-progress>
    </div>

    <b-button type="is-danger is-light" class="wit-transition wit-offset-left--sm">
      {{ $t('Quests_UpdateQuest') }}
    </b-button>

    <div class="pie-wrapper progress-60" :style="{'--progress': progress}">
      <span class="label wit-flex wit-flex--center">
        <p>{{ quest.progress }} / {{ quest.objective }}</p>
        <p>{{ progress }}%</p>
      </span>
      <div class="pie">
        <div class="left-side half-circle" />
        <div class="right-side half-circle" />
      </div>
    </div>
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
export default {
    name: 'QuestView',

    props: {
        quest: Object,
        canReplace: Boolean,
        allow: Boolean
    },

    computed: {
        progress () {
            return Math.min(100, this.quest.progress / this.quest.objective * 100)
        }
    }

}
</script>

<style scoped lang="scss">
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

        @if $progress <= 50 {
            .right-side {
                display: none;
            }
        }

        @else {
            clip: rect(auto, auto, auto, auto);

            .right-side {
                transform: rotate(180deg);
            }
        }
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
    @include draw-progress(50, var(--primary));

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
