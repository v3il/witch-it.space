<template>
    <div class="wis-user-pages">
        <h3 class="wis-user-pages__title">
            {{ title }}
        </h3>

        <ul class="m-0 p-0">
            <NavigationItem
                v-for="link in links"
                :key="link.to"
                :link="link"
                class="mb-1"
            />
        </ul>
    </div>
</template>

<script setup>
defineProps({
    links: {
        required: true,
        type: Array
    },

    title: {
        required: true,
        type: String
    }
})
</script>

<style scoped lang="scss">
    .wis-user-pages {
        margin-left: 12px;
        margin-right: 12px;
    }

    .wis-user-pages__title {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgb(129, 140, 248);
        padding: 10px 16px;
    }
</style>
