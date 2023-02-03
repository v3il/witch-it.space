<template>
    <h1 class="text-3xl font-bold underline">
        {{ data }}
    </h1>

    <Button label="Submit" icon="pi pi-check" icon-pos="right" @click="push" />
    <!--    <Slider v-model="model" :step="20" :min="50" :max="200" class="w-200" />-->

    <SelectButton v-model="selectedCity" :options="cities" option-label="name" />
</template>

<script setup>
import { useFiltersStore } from '~/store/test'
const { data } = await useFetch('/api/test')

const filtersStore = useFiltersStore()
// const filtersList = filtersStore.filtersList1

function push () {
    // console.error(filtersStore.update2())

    filtersStore.update2()
}

const { $testService } = useNuxtApp()

console.error($testService.test())

const selectedCity = ref(null)
const cities = [
    { name: 'London', code: 'LND' },
    { name: 'Paris', code: 'PRS' },
    { name: 'Rome', code: 'RM' }
]

// console.error(filtersStore.filtersList1)
// console.error(1)
</script>

<style scoped>

</style>
