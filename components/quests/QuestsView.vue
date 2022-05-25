<template>
  <div>
    <b-notification
      type="is-warning is-light1"
      aria-close-label="Close notification"
      role="alert"
      class="wit-offset-bottom--lg"
    >
      {{ $t('Quests_Note') }}
    </b-notification>

    <Card class="wit-offset-bottom--sm">
      <div class="quests__header wit-flex wit-flex--justify-between wit-flex--align-center wit-flex--wrap-reverse">
        <p class="wit-offset-bottom--sm1 wit-text--right">
          {{ $t('Quests_LastUpdate', [formattedLastUpdate]) }}
        </p>

        <div>
          <p v-if="!isUpdateAvailable" class="wit-color--warning wit-offset-bottom--xs wit-offset-top--xs">
            {{ $t('Quests_UpdateAvailableIn', [timeToNextUpdate]) }}
          </p>

          <b-button type="is-primary" class="wit-transition wit-offset-left--sm" :disabled="!isUpdateAvailable" @click="updateQuests">
            {{ $t('Quests_UpdateQuests') }}
          </b-button>
        </div>
      </div>
    </Card>

    <div class="wit-flex wit-flex--wrap wit-flex--align-start" style="margin: 0 -8px;">
      <Card class="wit-offset-bottom--md wit-quests__column">
        <template #title>
          <h2 class="wit-font-size--sm wit-offset-bottom--sm">
            {{ $t('Quests_WeeklyQuestsTitle') }}
          </h2>
        </template>

        <div v-if="isLoading" class="wit-padding-top--md wit-padding-bottom--md">
          <Loader />
        </div>

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

        <EmptyState v-else :text="$t('Quests_NoQuests')" icon="microsoft-xbox-controller-battery-empty" />
      </Card>

      <Card class="wit-quests__column">
        <template #title>
          <h2 class="wit-font-size--sm wit-offset-bottom--sm">
            {{ $t('Quests_DailyQuestsTitle') }}
          </h2>
        </template>

        <div v-if="isLoading" class="wit-padding-top--md wit-padding-bottom--md">
          <Loader />
        </div>

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

        <EmptyState v-else :text="$t('Quests_NoQuests')" icon="microsoft-xbox-controller-battery-empty" />
      </Card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QuestView from '@/components/quests/QuestView'
import { config } from '@/shared'
import { Quest } from '@/store/Types'
import Card from '@/components/basic/Card.vue'
import EmptyState from '@/components/basic/EmptyState.vue'
import Loader from '@/components/basic/Loader.vue'
import { showPopup } from '@/utils'

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

        async replaceQuest (quest) {
            const questTask = this.$t(`Quests_${quest.questTask}`)

            const isConfirmed = await this.$showConfirm({
                popupTitle: this.$t('Quests_ReplaceQuestTitle'),
                content: `${this.$t('Quests_WannaReplaceQuest')}<p class="wit-quest-title">${questTask}</p>`
            })

            if (!isConfirmed) {
                return
            }

            this.$store.dispatch(Quest.F.Actions.REPLACE_QUEST, quest.id)
                .then(({ isSuccess }) => {
                    this.$showSuccess(this.$t('OffersRemoved', [isSuccess]))
                })
                .catch(this.$showError)

            // showPopup(this, {
            //     title: this.$t('Quests_ReplaceQuestTitle'),
            //     message: `${this.$t('Quests_WannaReplaceQuest')}<p class="wit-quest-title">${questTask}</p>${this.$t('Quests_UndoneAction')}`,
            //     confirmText: this.$t('Confirm'),
            //     cancelText: this.$t('Cancel'),
            //     onConfirm: async () => {
            //         const { isSuccess, error } = await this.$store.dispatch(Quest.F.Actions.REPLACE_QUEST, quest.id)
            //
            //         if (error || !isSuccess) {
            //             return this.$showError({ message: this.$t('Error_QuestReplacingFailed') })
            //         }
            //
            //         return this.$showSuccess({ message: this.$t('Success_QuestReplacing') })
            //     }
            // })
        },

        finalizeQuest (quest) {
            const questTask = this.$t(`Quests_${quest.questTask}`)

            showPopup(this, {
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
        border-bottom: var(--default-border);
    }
}

.wit-quests__column {
    flex: 1 1 450px;
    margin: 0 var(--offset-xs);
}
</style>
