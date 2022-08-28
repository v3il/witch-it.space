<template>
  <HeaderPanel>
    <div class="wis-block--max-width wit-offset-left--auto wit-offset-right--auto wit-flex--wrap">
      <Title :title="$t('Profiles_HeaderTitle')" />

      <Description>
        <div v-html="description" />
      </Description>
    </div>
  </HeaderPanel>
</template>

<script>
import { computed, useContext, useStore } from '@nuxtjs/composition-api'
import { UserAvatar } from '@/components/user'
import { LastUpdate, HeaderActions } from '@/components/quests/header'
import { HeaderPanel } from '@/components/basic/index.js'
import { Title, Description } from '@/components/basic/header'

export default {
    name: 'QuestsHeader',

    components: {
        HeaderPanel,
        Title,
        Description
    },

    setup () {
        const { $t } = useContext()
        const store = useStore()

        const description = computed(() => $t('Profiles_Description', [
            store.getters['profiles/profilesCount'],
            store.getters['profiles/verifiedProfilesCount']
        ]))

        return { description }
    }
}
</script>
