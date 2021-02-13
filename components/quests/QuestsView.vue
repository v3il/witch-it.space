<template>
  <div>
    <div class="quests__header wit-flex wit-flex--justify-end wit-flex--align-center wit-offset-bottom--sm wit-flex--wrap-reverse">
      <p v-if="!isUpdateAvailable" class="wit-color--warning wit-offset-bottom--xs wit-offset-top--xs">
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

        <Loader v-if="isLoading" />

        <template v-else-if="weeklyQuests.length">
          <QuestView
            v-for="quest in weeklyQuests"
            :key="quest.id"
            :quest="quest"
            class="wit-quest-view"
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

        <Loader v-if="isLoading" />

        <template v-else-if="dailyQuests.length">
          <QuestView
            v-for="quest in dailyQuests"
            :key="quest.id"
            class="wit-quest-view"
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
import Loader from '@/components/quests/Loader'

export default {
    name: 'QuestsView',

    components: {
        QuestView,
        Card,
        EmptyState,
        Loader
    },

    data () {
        return {
            isUpdateAvailable: true,
            timeToNextUpdate: '00:00',
            formattedLastUpdate: this.$t('Time_LessThanAMinuteAgo'),
            intervalId: 0,
            lastUpdateTimeoutId: 0
        }
    },

    computed: {
        ...mapState(Quest.PATH, [
            'weeklyQuests',
            'dailyQuests',
            'isLoading',
            'canReplaceDailyQuests',
            'canReplaceWeeklyQuests',
            'questsUpdateTimestamp'
        ])
    },

    async created () {
        const { error } = await this.$store.dispatch(Quest.F.Actions.FETCH_QUESTS)

        if (error) {
            return this.$showError({ message: this.$t('Error_QuestsFetchingFailed') })
        }

        this.setTimer()
        this.formatLastUpdate()

        this.$eventBus.$on('localeChanged', this.formatLastUpdate)
    },

    destroyed () {
        this.stopTimer()
        clearTimeout(this.lastUpdateTimeoutId)
    },

    methods: {
        async updateQuests () {
            const { error } = await this.$store.dispatch(Quest.F.Actions.UPDATE_QUESTS)

            if (error) {
                return this.$showError({ message: error })
            }

            this.setTimer()
            this.formatLastUpdate()
        },

        replaceQuest (quest) {
            const questTask = this.$t(`Quests_${quest.questTask}`)

            this.$buefy.dialog.confirm({
                title: this.$t('Quests_ReplaceQuestTitle'),
                message: `${this.$t('Quests_WannaReplaceQuest')}<p class="wit-quest-title">${questTask}</p>${this.$t('Quests_UndoneAction')}`,
                confirmText: this.$t('Confirm'),
                cancelText: this.$t('Cancel'),
                onConfirm: async () => {
                    const { isSuccess, error } = await this.$store.dispatch(Quest.F.Actions.REPLACE_QUEST, quest.id)

                    if (error || !isSuccess) {
                        return this.$showError({ message: this.$t('Error_QuestReplacingFailed') })
                    }

                    return this.$showSuccess({ message: this.$t('Success_QuestReplacing') })
                }
            })
        },

        finalizeQuest (quest) {
            const questTask = this.$t(`Quests_${quest.questTask}`)

            this.$buefy.dialog.confirm({
                title: this.$t('Quests_FinalizeQuestTitle'),
                message: `${this.$t('Quests_WannaFinalizeQuest')}<p class="wit-quest-title">${questTask}</p>${this.$t('Quests_FinalizeQuestNote')}`,
                confirmText: this.$t('Quests_FinalizeQuestConfirmButtonTitle'),
                cancelText: this.$t('Quests_CancelButtonTitle'),
                onConfirm: async () => {
                    const { isSuccess, error } = await this.$store.dispatch(Quest.F.Actions.FINALIZE_QUEST, quest.id)

                    if (error || !isSuccess) {
                        return this.$showError({ message: this.$t('Error_QuestFinalizationFailed') })
                    }

                    return this.$showSuccess({ message: this.$t('Success_QuestFinalization') })
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
            if (!this.questsUpdateTimestamp) {
                return this.formattedLastUpdate = this.$t('Time_Never')
            }

            clearTimeout(this.lastUpdateTimeoutId)
            this.lastUpdateTimeoutId = setTimeout(this.formatLastUpdate, 10 * 1000)
            this.formattedLastUpdate = Date.fromTimestamp(this.questsUpdateTimestamp).humanizeTimeDiff()
        }
    }
}
</script>

<style scoped lang="scss">
.wit-quest-view {
    padding: 16px 0;

    &:not(:last-child) {
        border-bottom: 1px solid var(--quest-divider-color);
    }
}
</style>
