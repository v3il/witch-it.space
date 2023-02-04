<template>
    <transition name="fade150">
        <Button v-if="isVisible" type="is-secondary" class="wis-scroll-top wis-btn--rounded" @click="scrollToTop">
            <i class="mdi mdi-chevron-up mdi-24px" />
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
.wis-scroll-top {
    position: fixed;
    right: 16px;
    bottom: 16px;
    width: 45px;
    height: 45px;
    max-height: none;
    border-radius: 50%;
    padding: 0;
    min-width: 0;
    z-index: 10;
}
</style>
