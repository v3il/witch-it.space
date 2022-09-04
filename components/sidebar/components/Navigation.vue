<template>
  <div class="wis-user-pages">
    <h3 class="wis-user-pages__title">
      {{ title }}
    </h3>

    <ul>
      <NavigationItem
        v-for="link in links"
        :key="link.to"
        :link="link"
        class="wit-offset-bottom--xxs"
      />
    </ul>
  </div>
</template>

<script>
import NavigationItem from '@/components/sidebar/components/NavigationItem.vue'

export default {
    name: 'Navigation',

    components: { NavigationItem },

    props: {
        links: {
            required: true,
            type: Array
        },

        title: {
            required: true,
            type: String
        }
    }
}
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
