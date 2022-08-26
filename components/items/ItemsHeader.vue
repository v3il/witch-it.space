<template>
  <HeaderPanel>
    <div class="wis-block--max-width wit-offset-left--auto wit-offset-right--auto wit-flex--wrap">
      <Title :title="$t('Items_Title')" />

      <Description>
        <div v-html="description" />
      </Description>
    </div>
  </HeaderPanel>
</template>

<script>
import { computed, useContext } from '@nuxtjs/composition-api'
import { HeaderPanel } from '@/components/basic'
import { Description, Title } from '@/components/basic/header'

export default {
    name: 'UserHeader',

    components: {
        HeaderPanel,
        Title,
        Description
    },

    setup () {
        const { $itemsService, $t } = useContext()
        const description = computed(() => $t('Items_Description', [$itemsService.count, $itemsService.tradableCount]))

        return { description }
    }
}
</script>
