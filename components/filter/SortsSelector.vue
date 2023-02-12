<template>
    <div>
        <div class="mb-3 flex align-items-center justify-content-between w-full">
            <h3>{{ $t('SortBy') }}</h3>

            <Button class="p-button-text p-1" @click="emit('reset-sorts')">
                <Icon name="mdi:undo-variant" class="color-muted" size="20" />
            </Button>
        </div>

        <div class="flex align-items-center">
            <Dropdown
                :options="availableSorts"
                :model-value="sorts.sortBy"
                option-label="label"
                option-value="value"
                expanded
                class="flex-1 mr-3"
                :value="sorts.sortBy"
                @update:model-value="updateOrderBy"
            />

            <Button class="wit-filter__order-button p-button-text p-1" @click="toggleOrder">
                <Icon :name="iconClass" size="20" class="color-muted" />
            </Button>
        </div>
    </div>
</template>

<script setup>
import { SortOrders } from '@/shared/items/index.js'
import { useFilters } from '~/composables/useFilters'

const { $t } = useTranslate()

defineProps({
    sorts: {
        required: true,
        type: Object
    },

    availableSorts: {
        required: true,
        type: Array
    }
})

const { sorts } = useFilters()

const isAscendingOrder = computed(() => sorts.value.order === SortOrders.ASC)
const iconClass = computed(() => isAscendingOrder.value ? 'mdi:sort-ascending' : 'mdi:sort-descending')

const emit = defineEmits(['update-order-by', 'toggle-order', 'reset-sorts'])

const updateOrderBy = orderBy => emit('update-order-by', orderBy)
const toggleOrder = () => emit('toggle-order')
</script>
