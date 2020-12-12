<template>
  <div>
    Settings

    <Quests :quests="weeklyQuests" :can-replace="canReplaceWeeklyQuests" @replace="replaceQuest" @finalize="finalizeQuest" />
    <hr>
    <Quests :quests="dailyQuests" :can-replace="canReplaceDailyQuests" @replace="replaceQuest" @finalize="finalizeQuest" />

    <button @click="updateQuests">
      Load
    </button>

    <p>{{ formattedTime }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Quests from '@/components/quests/Quests'
import { config } from '@/shared'
import { Quest } from '@/store/Types'

export default {

    components: {
        Quests
    },

    middleware: ['fetchUser'],

    data: () => ({
        formattedTime: '',
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
            .then(() => this.setTimer())
            .catch(console.error)
    },

    destroyed () {
        this.stopTimer()
    },

    methods: {
        updateQuests () {
            this.$store.dispatch(Quest.F.Actions.UPDATE_QUESTS)
                .then(() => this.setTimer())
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

            if (diff <= 0) {
                this.formattedTime = '00:00'
                return this.stopTimer()
            }

            const seconds = diff % 60
            const minutes = Math.floor((diff - seconds) / 60)

            this.formattedTime = `${minutes}:${seconds}`
        }
    }
}
</script>
