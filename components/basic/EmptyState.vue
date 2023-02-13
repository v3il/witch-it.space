<template>
    <div class="flex flex-column align-items-center p-4">
        <img
            src="https://ik.imagekit.io/igo1qzk1oe2z/witch_it_space/Witch_fD00VUVeX.png"
            alt="Empty State"
            class="wis-empty-state__image mb-3"
        >

        <p class="text-center color-muted">
            {{ message }}
        </p>
    </div>
</template>

<script setup>
defineProps({
    message: {
        required: true,
        type: String
    }
})
</script>

<style scoped lang="scss">
.wis-empty-state__image {
    max-height: 300px;
    height: 100%;
}
</style>
