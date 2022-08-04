import { onDeactivated, onMounted, ref } from '@nuxtjs/composition-api'

export const useStickyUserHeader = () => {
    const isStickyHeaderVisible = ref(false)
    const scrollHandler = () => isStickyHeaderVisible.value = window.scrollY > 300 && window.innerWidth > 770

    onMounted(() => {
        window.addEventListener('scroll', scrollHandler, { passive: true })
    })

    onDeactivated(() => {
        window.removeEventListener('scroll', scrollHandler)
    })

    return { isStickyHeaderVisible }
}
