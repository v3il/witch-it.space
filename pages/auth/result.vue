<template>
    <div />
</template>

<script setup>
import { config } from '~/shared/config'

const router = useRouter()
const { $t } = useTranslate()

definePageMeta({
    layout: 'blank'
})

onMounted(() => {
    console.error(router.currentRoute)

    const errorTextCode = router.currentRoute.value.query.error
    const error = errorTextCode ? $t(errorTextCode) : null

    console.error(window.opener)

    window.opener.postMessage({
        authResult: { error }
    }, config.SERVER_ORIGIN)
})
</script>
