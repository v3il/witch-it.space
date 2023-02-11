<template>
    <transition name="fade150">
        <Button v-if="isVisible" class="scroll-top wis-btn--rounded flex justify-content-center p-button-secondary" @click="scrollToTop">
            <Icon name="mdi:chevron-up" size="24" />
        </Button>
    </transition>
</template>

<script setup>
const isVisible = ref(false)
const scrollHandler = () => (isVisible.value = window.scrollY > 600)

onMounted(() => {
    window.addEventListener('scroll', scrollHandler, { passive: true })
})

onDeactivated(() => {
    window.removeEventListener('scroll', scrollHandler)
})

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<style scoped lang="scss">
.scroll-top {
    position: fixed;
    right: 16px;
    bottom: 16px;
    width: 46px;
    height: 46px;
    max-height: none;
    border-radius: 50%;
    padding: 0;
    min-width: 0;
    z-index: 10;
}
</style>
