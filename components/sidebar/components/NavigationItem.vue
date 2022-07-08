<template>
  <li class="wis-navigation-item" :class="itemClasses">
    <NuxtLink :to="to" class="wit-flex wit-flex--align-center wis-navigation-item__link">
      <i class="mdi mdi-24px wit-offset-right--sm" :class="iconClass" />
      <span>{{ $t(label) }}</span>
    </NuxtLink>
  </li>
</template>

<script>
import { computed, useRoute } from '@nuxtjs/composition-api'

export default {
    name: 'NavigationItem',

    props: {
        icon: {
            required: true,
            type: String
        },

        label: {
            required: true,
            type: String
        },

        to: {
            required: true,
            type: String
        }
    },

    setup (props) {
        const route = useRoute()
        const iconClass = computed(() => `mdi-${props.icon}`)
        const itemClasses = computed(() => ({ active: route.value.path === props.to }))

        return { iconClass, itemClasses }
    }
}
</script>

<style scoped lang="scss">
    .wis-navigation-item {
        --opacity: 0.6;

        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 10px 16px;
        font-size: 13px;
        font-weight: 500;
        line-height: 20px;
        text-decoration: none;
        border-radius: 6px;

        &.active,
        &:hover {
            --opacity: 1;

            background-color: #2c3344;
        }
    }

    .wis-navigation-item__link {
        width: 100%;
        opacity: var(--opacity);
        color: var(--white);
    }
</style>
