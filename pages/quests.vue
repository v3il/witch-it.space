<template>
  <div class="quests">
    <div class="quests__header wit-flex wit-flex--justify-end wit-flex--align-center wit-offset-bottom--sm wit-flex--wrap-reverse">
      <p v-if="!isUpdateAvailable" class="wit-color--Y400 wit-offset-bottom--xxs wit-offset-top--xs">
        {{ $t('Quests_UpdateAvailableIn', [timeToNextUpdate]) }}
      </p>

      <b-button type="is-primary" class="wit-transition wit-offset-left--sm" :disabled="!isUpdateAvailable" @click="updateQuests">
        {{ $t('Quests_UpdateQuests') }}
      </b-button>
    </div>

    <div class="quests__body">
      <Card>
        <template #title>
          {{ $t('Quests_WeeklyQuestsTitle') }}
        </template>

        <QuestView
          v-for="quest in weeklyQuests"
          :key="quest.id"
          :quest="quest"
          class="qv"
          :can-replace="canReplaceWeeklyQuests"
          @replace="replaceQuest"
          @finalize="finalizeQuest"
        />
      </Card>

      <Card>
        <template #title>
          {{ $t('Quests_DailyQuestsTitle') }}
        </template>

        <QuestView
          v-for="quest in dailyQuests"
          :key="quest.id"
          class="qv"
          :quest="quest"
          :can-replace="canReplaceDailyQuests"
          @replace="replaceQuest"
          @finalize="finalizeQuest"
        />
      </Card>

      <!--      <h3 class="wit&#45;&#45;font-size&#45;&#45;sm wit-offset-bottom&#45;&#45;sm">-->
      <!--        {{ $t('Quests_WeeklyQuestsTitle') }}-->
      <!--      </h3>-->

      <!--      <QuestView v-for="quest in weeklyQuests" :key="quest.id" :quest="quest" :can-replace="canReplaceWeeklyQuests" @replace="replaceQuest" />-->

      <!--      <Quests class="wit-offset-bottom&#45;&#45;md" :quests="weeklyQuests" :can-replace="canReplaceWeeklyQuests" @replace="replaceQuest" @finalize="finalizeQuest" />-->

      <!--      <h3 class="wit&#45;&#45;font-size&#45;&#45;sm wit-offset-bottom&#45;&#45;sm">-->
      <!--        {{ $t('Quests_DailyQuestsTitle') }}-->
      <!--      </h3>-->

      <!--      <QuestView v-for="quest in dailyQuests" :key="quest.id" :quest="quest" :can-replace="canReplaceDailyQuests" @replace="replaceQuest" />-->
      <!--      <Quests class="wit-offset-bottom&#45;&#45;md" :quests="dailyQuests" :can-replace="canReplaceDailyQuests" @replace="replaceQuest" @finalize="finalizeQuest" />-->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import Quests from '@/components/quests/Quests'
import QuestView from '@/components/quests/QuestView'
import { config } from '@/shared'
import { Quest } from '@/store/Types'
import Card from '@/components/Card'

export default {

    components: {
        // Quests,
        QuestView,
        Card
    },

    middleware: ['fetchUser'],

    data: () => ({
        isUpdateAvailable: true,
        timeToNextUpdate: '00:00',
        intervalId: 0
    }),

    computed: {
        ...mapState(Quest.PATH, [
            'weeklyQuests',
            'dailyQuests',
            'isLoaded',
            'canReplaceDailyQuests',
            'canReplaceWeeklyQuests',
            'questsUpdateTimestamp'
        ])
    },

    created () {
        this.$store.dispatch(Quest.F.Actions.FETCH_QUESTS)
            .then(this.setTimer)
            .catch(console.error)
    },

    destroyed () {
        this.stopTimer()
    },

    methods: {
        updateQuests () {
            this.$store.dispatch(Quest.F.Actions.UPDATE_QUESTS)
                .then(this.setTimer)
                .catch(console.error)
        },

        replaceQuest (quest) {
            this.$store.dispatch(Quest.F.Actions.REPLACE_QUEST, quest.id)
                .catch(console.error)
        },

        finalizeQuest (quest) {
            this.$store.dispatch(Quest.F.Actions.FINALIZE_QUEST, quest.id)
                .catch(console.error)
        },

        setTimer () {
            this.intervalId = setInterval(this.updateTimer, 1000)
            this.updateTimer()
        },

        stopTimer () {
            clearInterval(this.intervalId)
        },

        updateTimer () {
            const nextUpdate = this.questsUpdateTimestamp + config.QUESTS_UPDATE_TIMEOUT
            const diff = nextUpdate - Math.floor(Date.now() / 1000)

            this.isUpdateAvailable = diff <= 0

            if (this.isUpdateAvailable) {
                this.timeToNextUpdate = '00:00'
                return this.stopTimer()
            }

            const seconds = diff % 60
            const minutes = Math.floor((diff - seconds) / 60)

            this.timeToNextUpdate = `${this.formatNumber(minutes)}:${this.formatNumber(seconds)}`
        },

        formatNumber (number) {
            return number < 10 ? `0${number}` : number
        }
    }
}
</script>

<style scoped lang="scss">
.quests {
    padding: var(--offset-xxlg) 0;
    max-width: 800px;
    margin: 0 auto;
}

.qv {
    padding: 16px 0;

    &:not(:last-child) {
        //margin-bottom: 16px;
        border-bottom: 1px solid #32394e;
    }
}

.quests__header {
    margin: var(--offset-xs) 0;
}
</style>
