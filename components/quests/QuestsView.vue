<template>
  <div>
    <!--    <b-notification v-if="!isBannerHidden" type="is-info" class="wit-offset-bottom&#45;&#45;sm wit-line-height&#45;&#45;md" @close="onBannerClose">-->
    <!--      {{ $t('Quests_Note') }}-->
    <!--    </b-notification>-->

    <!--    <Card class="wit-offset-bottom&#45;&#45;md" vertical-paddings="xs">-->
    <!--      <div class="quests__header wit-flex wit-flex&#45;&#45;justify-between wit-flex&#45;&#45;align-center wit-flex&#45;&#45;wrap-reverse">-->
    <!--        <p class="wit-offset-right&#45;&#45;sm wit-padding-top&#45;&#45;xs wit-padding-bottom&#45;&#45;xs wis-quests__last-update">-->
    <!--          <span class="wit-color&#45;&#45;muted">{{ $t('Quests_LastUpdate') }}</span>-->
    <!--          {{ formattedLastUpdate || $t('Time_Never') }}-->
    <!--        </p>-->

    <!--        <div class="wit-position&#45;&#45;relative wit-padding-top&#45;&#45;xs wit-padding-bottom&#45;&#45;xs wis-quests__button-container">-->
    <!--          <b-tag v-if="!isUpdateAvailable" type="is-warning" class="wit-quests__counter">-->
    <!--            {{ timeToNextUpdate }}-->
    <!--          </b-tag>-->

    <!--          <b-button-->
    <!--            type="is-primary"-->
    <!--            class="wit-transition wis-quests__button"-->
    <!--            :disabled="!isUpdateAvailable"-->
    <!--            expanded-->
    <!--            @click="updateQuests"-->
    <!--          >-->
    <!--            {{ $t('Quests_UpdateQuests') }}-->
    <!--          </b-button>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </Card>-->

    <QuestsGrid
      class="wit-offset-bottom--lg"
      :quests="weeklyQuests"
    />

    <!--    <div class="separator" />-->

    <QuestsGrid
      :quests="dailyQuests"
    />
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
import { localStorageService } from '@/domain/index.js'
import { QuestsGrid } from '@/components/quests'

const QUESTS_BANNER_KEY = 'QuestsBannerHidden'

export default {
    name: 'QuestsView',

    components: {
        Card,
        QuestsColumn,
        QuestsGrid
    },

    data: () => ({
        isBannerHidden: true
    }),

    computed: {
        ...mapState(StoreModules.QUESTS, [
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
    },

    mounted () {
        this.isBannerHidden = false // this.$localStorageService.get(QUESTS_BANNER_KEY) === true
    },

    methods: {
        ...mapActions(StoreModules.QUESTS, {
            fetchUserQuests: 'fetchUserQuests',
            updateUserQuests: 'updateUserQuests',
            replaceUserQuest: 'replaceUserQuest',
            finalizeUserQuest: 'finalizeUserQuest'
        })

        // onBannerClose () {
        //     this.isBannerHidden = false
        //     this.$localStorageService.set(QUESTS_BANNER_KEY, true)
        // },

        // updateQuests () {
        //     return this.updateUserQuests().catch(this.$showError)
        // },

        // async replaceQuest (quest) {
        //     const questTask = this.$t(`Quests_${quest.questTask}`)
        //
        //     const isConfirmed = await this.$showConfirm({
        //         popupTitle: this.$t('Quests_ReplaceQuestTitle'),
        //         content: `${this.$t('Quests_WannaReplaceQuest')}<p class="wit-quest-title">${questTask}</p>`
        //     })
        //
        //     if (!isConfirmed) {
        //         return
        //     }
        //
        //     this.replaceUserQuest(quest.id)
        //         .then(() => this.$showSuccess(this.$t('Success_QuestReplacing')))
        //         .catch(() => this.$showError({ message: this.$t('Error_QuestReplacingFailed') }))
        // },
        //
        // async finalizeQuest (quest) {
        //     const questTask = this.$t(`Quests_${quest.questTask}`)
        //
        //     const isConfirmed = await this.$showConfirm({
        //         popupTitle: this.$t('Quests_FinalizeQuestTitle'),
        //         content: `${this.$t('Quests_WannaFinalizeQuest')}<p class="wit-quest-title">${questTask}</p>`
        //     })
        //
        //     if (!isConfirmed) {
        //         return
        //     }
        //
        //     this.finalizeUserQuest(quest.id)
        //         .then(() => this.$showSuccess(this.$t('Success_QuestFinalization')))
        //         .catch(() => this.$showError({ message: this.$t('Error_QuestFinalizationFailed') }))
        // }
    }
}
</script>

<style scoped lang="scss">
.separator {
    border-top: 2px solid rgba(241, 245, 249, 0.12);
    width: 16rem;
    height: 0.25rem;
    margin: 1.5rem auto;
}

.wit-quests__counter {
    position: absolute;
    top: -4px;
    right: -12px;
    margin: 0;
    z-index: 2;
    font-weight: bold;
}

@media (max-width: 600px) {
    .wis-quests__button-container {
        width: 100%;
    }

    .wis-quests__last-update {
        width: 100%;
        text-align: center;
        margin-right: 0 !important;
    }
}
</style>
