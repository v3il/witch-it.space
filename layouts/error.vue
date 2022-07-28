<template>
  <div class="wis-block--max-width wit-offset-left--auto wit-offset-right--auto wit-block--full-width wit-flex wit-flex--center">
    <Error404 class="wit-block--full-width" :link-title="error.linkTitle ?? ''" :link-url="error.linkUrl ?? ''" />
  </div>
</template>

<script>
import { Error404 } from '@/components/errors/index.js'

export default {
    name: 'Error',

    components: {
        Error404
    },

    layout: 'default',

    props: {
        error: {
            type: Object,
            required: true
        }
    }
}
</script>
