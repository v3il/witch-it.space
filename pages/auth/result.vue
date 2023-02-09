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
    const errorTextCode = router.currentRoute.value.query.error
    const error = errorTextCode ? $t(errorTextCode) : null

    window.opener.postMessage({
        result: { error }
    }, config.SERVER_ORIGIN)
})
</script>
