<template>
  <div>
    Settings

    <Quests :quests="weeklyQuests" :can-replace="canReplaceWeeklyQuests" @replace="r" @finalize="f" />
    <hr>
    <Quests :quests="dailyQuests" :can-replace="canReplaceDailyQuests" @replace="r" @finalize="f" />

    <button @click="l">
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
        // weeklyQuests: [],
        // dailyQuests: [],
        // canReplaceDailyQuests: false,
        // canReplaceWeeklyQuests: false,
        // questsUpdateTimestamp: 0,
        formattedTime: '',
        tsId: 0
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

    async created () {
        await this.$store.dispatch(Quest.F.Actions.FETCH_QUESTS)

        this.tsId = setInterval(this.recalcTimer, 1000)
        this.recalcTimer()
    },

    destroyed () {
        return clearInterval(this.tsId)
    },

    methods: {
        l () {
            this.$store.dispatch(Quest.F.Actions.UPDATE_QUESTS)

            this.tsId = setInterval(this.recalcTimer, 1000)
            this.recalcTimer()
        },

        r (quest) {
            this.$store.dispatch(Quest.F.Actions.REPLACE_QUEST, quest.id)
        },

        f (quest) {
            this.$store.dispatch(Quest.F.Actions.FINALIZE_QUEST, quest.id)
        },

        recalcTimer () {
            const nextUpdate = this.questsUpdateTimestamp + config.QUESTS_UPDATE_TIMEOUT
            const diff = nextUpdate - Math.floor(Date.now() / 1000)

            console.log(diff)

            if (diff <= 0) {
                this.formattedTime = '00:00'
                return clearInterval(this.tsId)
            }

            const secs = diff % 60
            const mins = Math.floor((diff - secs) / 60)

            this.formattedTime = `${mins}:${secs}`
        }
    }
}
</script>
