<template>
  <div>
    <b-notification type="is-info" class="wit-offset-bottom--sm wit-line-height--md">
      {{ $t('Quests_Note') }}
    </b-notification>

    <Card class="wit-offset-bottom--sm" vertical-paddings="xs">
      <div class="quests__header wit-flex wit-flex--justify-between wit-flex--align-center wit-flex--wrap-reverse">
        <p class="wit-offset-right--sm wit-padding-top--xs wit-padding-bottom--xs">
          <span class="wit-color--muted">{{ $t('Quests_LastUpdate') }}</span>
          {{ formattedLastUpdate || $t('Time_Never') }}
        </p>

        <div class="wit-position--relative wit-padding-top--xs wit-padding-bottom--xs">
          <b-tag v-if="!isUpdateAvailable" type="is-warning" class="counter">
            {{ timeToNextUpdate }}
          </b-tag>

          <b-button type="is-primary" class="wit-transition" :disabled="!isUpdateAvailable" @click="updateQuests">
            {{ $t('Quests_UpdateQuests') }}
          </b-button>
        </div>
      </div>
    </Card>

    <div class="wit-flex wit-flex--wrap wit-flex--align-start" style="margin: 0 -8px;">
      <QuestsColumn
        class="wit-offset-bottom--md wit-quests__column"
        :title="$t('Quests_WeeklyQuestsTitle')"
        :quests="weeklyQuests"
        :is-loading="isLoading"
        :can-replace-quests="canReplaceWeeklyQuests"
        @replace="replaceQuest"
        @finalize="finalizeQuest"
      />

      <QuestsColumn
        class="wit-quests__column"
        :title="$t('Quests_DailyQuestsTitle')"
        :quests="dailyQuests"
        :is-loading="isLoading"
        :can-replace-quests="canReplaceDailyQuests"
        @replace="replaceQuest"
        @finalize="finalizeQuest"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import QuestView from '@/components/quests/QuestView'
import { config } from '@/shared'
import { Quest } from '@/store/Types'
import Card from '@/components/basic/Card.vue'
import EmptyState from '@/components/basic/EmptyState.vue'
import Loader from '@/components/basic/Loader.vue'
import { showPopup } from '@/utils'
import { StoreModules } from '@/store/index.js'
import QuestsColumn from '@/components/quests/QuestsColumn.vue'

export default {
    name: 'QuestsView',

    components: {
        // QuestView,
        Card,
        // EmptyState,
        // Loader,
        QuestsColumn
    },

    // data () {
    //     return {
    // isUpdateAvailable: true,
    // timeToNextUpdate: '00:00',
    // formattedLastUpdate: this.$t('Time_LessThanAMinuteAgo'),
    // intervalId: 0,
    // lastUpdateTimeoutId: 0
    // }
    // },

    computed: {
        ...mapState(StoreModules.QUESTS, [
            // 'weeklyQuests',
            // 'dailyQuests',
            'isLoading',
            'canReplaceDailyQuests',
            'canReplaceWeeklyQuests',
            'questsUpdateTimestamp',
            'timeToNextUpdate',
            'isUpdateAvailable',
            'formattedLastUpdate'
        ]),

        ...mapGetters(StoreModules.QUESTS, [
            'weeklyQuests',
            'dailyQuests'
        ])
    },

    created () {
        this.fetchUserQuests().catch(this.$showError)

        // const { error } = await this.$store.dispatch(Quest.F.Actions.FETCH_QUESTS)
        //
        // if (error) {
        //     return this.$showError({ message: this.$t('Error_QuestsFetchingFailed') })
        // }
        //
        // this.setTimer()
        // this.formatLastUpdate()
        //
        // this.$eventBus.$on('localeChanged', this.formatLastUpdate)
    },

    // destroyed () {
    //     this.stopTimer()
    //     clearTimeout(this.lastUpdateTimeoutId)
    // },

    methods: {
        ...mapActions(StoreModules.QUESTS, {
            fetchUserQuests: 'fetchUserQuests',
            updateUserQuests: 'updateUserQuests',
            replaceUserQuest: 'replaceUserQuest',
            finalizeUserQuest: 'finalizeUserQuest'
        }),

        updateQuests () {
            return this.updateUserQuests().catch(this.$showError)
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

            this.replaceUserQuest(quest.id)
                .then(() => this.$showSuccess(this.$t('Success_QuestReplacing')))
                .catch(() => this.$showError({ message: this.$t('Error_QuestReplacingFailed') }))
        },

        async finalizeQuest (quest) {
            const questTask = this.$t(`Quests_${quest.questTask}`)

            const isConfirmed = await this.$showConfirm({
                popupTitle: this.$t('Quests_FinalizeQuestTitle'),
                content: `${this.$t('Quests_WannaFinalizeQuest')}<p class="wit-quest-title">${questTask}</p>`
            })

            if (!isConfirmed) {
                return
            }

            this.finalizeUserQuest(quest.id)
                .then(() => this.$showSuccess(this.$t('Success_QuestFinalization')))
                .catch(() => this.$showError({ message: this.$t('Error_QuestFinalizationFailed') }))
        }

        // setTimer () {
        //     this.intervalId = setInterval(this.updateTimer, 1000)
        //     this.updateTimer()
        // },
        //
        // stopTimer () {
        //     clearInterval(this.intervalId)
        // },
        //
        // updateTimer () {
        //     const nextUpdate = this.questsUpdateTimestamp + config.QUESTS_UPDATE_TIMEOUT
        //     const diff = nextUpdate - Math.floor(Date.now() / 1000)
        //
        //     this.isUpdateAvailable = diff <= 0
        //
        //     if (this.isUpdateAvailable) {
        //         this.timeToNextUpdate = '00:00'
        //         return this.stopTimer()
        //     }
        //
        //     const seconds = diff % 60
        //     const minutes = Math.floor((diff - seconds) / 60)
        //
        //     this.timeToNextUpdate = `${this.formatNumber(minutes)}:${this.formatNumber(seconds)}`
        // },
        //
        // formatNumber (number) {
        //     return number < 10 ? `0${number}` : number
        // },
        //
        // formatLastUpdate () {
        //     if (!this.questsUpdateTimestamp) {
        //         return this.formattedLastUpdate = this.$t('Time_Never')
        //     }
        //
        //     clearTimeout(this.lastUpdateTimeoutId)
        //     this.lastUpdateTimeoutId = setTimeout(this.formatLastUpdate, 10 * 1000)
        //     this.formattedLastUpdate = Date.fromTimestamp(this.questsUpdateTimestamp).humanizeTimeDiff()
        // }
    }
}
</script>

<style scoped lang="scss">
//.wit-quest-view {
//    padding: 16px 0;
//
//    &:not(:last-child) {
//        border-bottom: var(--default-border);
//    }
//}

.wit-quests__column {
    flex: 1 1 450px;
    margin: 0 var(--offset-xs);
}

.counter {
    position: absolute;
    top: -4px;
    right: -12px;
    margin: 0;
    z-index: 2;
    font-weight: bold;
}
</style>
