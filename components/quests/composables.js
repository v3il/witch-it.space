import { computed } from '@nuxtjs/composition-api'

export const useQuestCompleted = (quest) => {
    const isCompleted = computed(() => quest.progress >= quest.objective)

    return { isCompleted }
}
