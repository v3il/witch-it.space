<template>
  <tr>
    <td style="padding: 0 8px;">
      <div style="display: flex; align-items: center;" class="wit-color--white">
        {{ $t(`Quests_${quest.questTask}`) }}
        <button style="margin-left: 8px;" :disabled="!canReplace" @click="$emit('replace')">
          R
        </button>

        <button style="margin-left: 8px;" @click="$emit('finalize')">
          F
        </button>
      </div>
    </td>
    <td>
      <img :src="quest.rewardItem.iconUrl" :alt="quest.rewardItem.iconUrl" :title="quest.rewardItem.name" width="50" height="50">
      <div class="counter">
        x{{ quest.rewardCount }}
      </div>
    </td>
    <td class="progress-cell">
      <div class="progress" :style="{ width: `${Math.min(100, quest.progress / quest.objective * 100)}%` }" />
      <span style="z-index: 2; position: relative;">{{ quest.progress }} / {{ quest.objective }}</span>
    </td>
  </tr>
</template>

<script>
export default {
    name: 'Quest',

    props: {
        quest: Object,
        canReplace: Boolean,
        allow: Boolean
    }

}
</script>

<style scoped>
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
</style>
