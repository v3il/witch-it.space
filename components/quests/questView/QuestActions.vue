<template>
  <b-button v-if="isCompleted" type="is-success" class="wis-btn--rounded" @click="finalizeQuest">
    <i class="mdi mdi-18px mdi-gift wit-offset-right--xs" />
    {{ $t('Quests_GetReward') }}
  </b-button>

  <b-button v-else :disabled="!canReplaceQuest" type="is-transparent" class="wis-btn--rounded" @click="replaceQuest">
    <i class="mdi mdi-18px mdi-refresh wit-offset-right--xs" />
    {{ $t('Quests_UpdateQuest') }}
  </b-button>
</template>

<script>
import { computed, useContext, useStore } from '@nuxtjs/composition-api'
import ConfirmPopup from '@/components/basic/offers/ConfirmPopup.vue'
import { useQuestCompleted } from '@/components/quests/composables.js'
import ItemName from '@/components/ItemName.vue'

export default {
    name: 'QuestActions',

    components: {
        ConfirmPopup,
        ItemName
    },

    props: {
        quest: {
            required: true,
            type: Object
        }
    },

    setup (props) {
        const { $t, $showSuccess, $showError } = useContext()
        const { isCompleted } = useQuestCompleted(props.quest)
        const store = useStore()

        const canReplaceQuest = computed(() => {
            return props.quest.questType === 'Weekly'
                ? store.state.quest.canReplaceWeeklyQuests
                : store.state.quest.canReplaceDailyQuests
        })

        const triggerReplaceQuest = () => {
            store.dispatch('quest/replaceUserQuest', props.quest.id)
                .then(() => $showSuccess($t('Success_QuestReplacing')))
                .catch(() => $showError({ message: $t('Error_QuestReplacingFailed') }))
        }

        const triggerFinalizeQuest = () => {
            store.dispatch('quest/finalizeUserQuest', props.quest.id)
                .then(() => $showSuccess($t('Success_QuestFinalization')))
                .catch(() => $showError({ message: $t('Error_QuestFinalizationFailed') }))
        }

        return { isCompleted, canReplaceQuest, triggerReplaceQuest, triggerFinalizeQuest }
    },

    methods: {
        // todo: move to CAPI
        async replaceQuest () {
            if (!this.canReplaceQuest) {
                return
            }

            const questTask = this.$t(`Quests_${this.quest.questTask}`)

            const isConfirmed = await this.$showConfirm({
                popupTitle: this.$t('Quests_ReplaceQuestTitle'),
                content: `${this.$t('Quests_WannaReplaceQuest')}<p class="wit-quest-title">${questTask}</p>`
            })

            if (isConfirmed) {
                this.triggerReplaceQuest()
            }
        },

        // todo: move to CAPI
        async finalizeQuest () {
            if (!this.isCompleted) {
                return
            }

            const questTask = this.$t(`Quests_${this.quest.questTask}`)

            const isConfirmed = await this.$showConfirm({
                popupTitle: this.$t('Quests_FinalizeQuestTitle'),
                content: `${this.$t('Quests_WannaFinalizeQuest')}<p class="wit-quest-title">${questTask}</p>`
            })

            if (isConfirmed) {
                this.triggerFinalizeQuest()
            }
        }
    }
}
</script>
