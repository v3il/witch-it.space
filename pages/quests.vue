<template>
  <div class="quests">
    <div class="quests__header wit-flex wit-flex--justify-end wit-flex--align-center wit-offset-bottom--sm wit-flex--wrap-reverse">
      <p v-if="!isUpdateAvailable" class="wit-color--warning wit-offset-bottom--xxs wit-offset-top--xxs">
        {{ $t('Quests_UpdateAvailableIn', [timeToNextUpdate]) }}
      </p>

      <b-button type="is-primary" class="wit-transition wit-offset-left--sm" :disabled="!isUpdateAvailable" @click="updateQuests">
        {{ $t('Quests_UpdateQuests') }}
      </b-button>
    </div>

    <p class="wit-offset-bottom--sm wit-text--right">
      {{ $t('Quests_LastUpdate', [formattedLastUpdate]) }}
    </p>

    <div class="quests__body">
      <Card class="wit-offset-bottom--md">
        <template #title>
          {{ $t('Quests_WeeklyQuestsTitle') }}
        </template>

        <template v-if="weeklyQuests.length">
          <QuestView
            v-for="quest in weeklyQuests"
            :key="quest.id"
            :quest="quest"
            class="qv"
            :can-replace="canReplaceWeeklyQuests"
            @replace="replaceQuest"
            @finalize="finalizeQuest"
          />
        </template>

        <EmptyState v-else />
      </Card>

      <Card>
        <template #title>
          {{ $t('Quests_DailyQuestsTitle') }}
        </template>

        <template v-if="dailyQuests.length">
          <QuestView
            v-for="quest in dailyQuests"
            :key="quest.id"
            class="qv"
            :quest="quest"
            :can-replace="canReplaceDailyQuests"
            @replace="replaceQuest"
            @finalize="finalizeQuest"
          />
        </template>

        <EmptyState v-else />
      </Card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QuestView from '@/components/quests/QuestView'
import { config } from '@/shared'
import { Quest } from '@/store/Types'
import Card from '@/components/Card'
import EmptyState from '@/components/quests/EmptyState'

export default {

    components: {
        QuestView,
        Card,
        EmptyState
    },

    middleware: ['fetchUser'],

    data: () => ({
        isUpdateAvailable: true,
        timeToNextUpdate: '00:00',
        formattedLastUpdate: '',
        intervalId: 0,
        lastUpdateTimeoutId: 0
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
            .then(() => {
                this.setTimer()
                this.formatLastUpdate()
            })
            .catch(console.error)

        this.$eventBus.$on('localeChanged', this.formatLastUpdate)
    },

    destroyed () {
        this.stopTimer()
    },

    methods: {
        updateQuests () {
            this.$store.dispatch(Quest.F.Actions.UPDATE_QUESTS)
                .then(() => {
                    this.setTimer()
                    this.formatLastUpdate()
                })
                .catch(console.error)
        },

        replaceQuest (quest) {
            const questTask = this.$t(`Quests_${quest.questTask}`)

            this.$buefy.dialog.confirm({
                title: this.$t('Quests_ReplaceQuestTitle'),
                message: `${this.$t('Quests_WannaReplaceQuest')}<p class="wit-quest-title">${questTask}</p><p class="wit-color--Y400">${this.$t('Quests_UndoneAction')}</p>`,
                confirmText: this.$t('Quests_ReplaceQuestConfirmButtonTitle'),
                cancelText: this.$t('Quests_CancelButtonTitle'),
                onConfirm: async () => {
                    try {
                        const isSuccess = await this.$store.dispatch(Quest.F.Actions.REPLACE_QUEST, quest.id)

                        console.log(isSuccess)
                    } catch (e) {
                        console.error(e)
                    }
                }
            })
        },

        finalizeQuest (quest) {
            const questTask = this.$t(`Quests_${quest.questTask}`)

            this.$buefy.dialog.confirm({
                title: this.$t('Quests_FinalizeQuestTitle'),
                message: `${this.$t('Quests_WannaFinalizeQuest')}<p class="wit-quest-title">${questTask}</p><p class="wit-color--Y400">${this.$t('Quests_FinalizeQuestNote')}</p>`,
                confirmText: this.$t('Quests_FinalizeQuestConfirmButtonTitle'),
                cancelText: this.$t('Quests_CancelButtonTitle'),
                onConfirm: async () => {
                    try {
                        const isSuccess = await this.$store.dispatch(Quest.F.Actions.FINALIZE_QUEST, quest.id)

                        console.log(isSuccess)
                    } catch (e) {
                        console.error(e)
                    }
                }
            })
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
        },

        formatLastUpdate () {
            clearTimeout(this.lastUpdateTimeoutId)
            this.lastUpdateTimeoutId = setTimeout(this.formatLastUpdate, 10 * 1000)
            this.formattedLastUpdate = Date.fromTimestamp(this.questsUpdateTimestamp).humanizeTimeDiff()
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
        border-bottom: 1px solid var(--quest-divider-color);
    }
}

.quests__header {
    //margin: var(--offset-xs) 0;
}
</style>
