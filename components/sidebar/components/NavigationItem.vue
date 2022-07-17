<template>
  <li class="wis-navigation-item" :class="itemClasses">
    <NuxtLink :to="link.to" class="wit-flex wit-flex--align-center wis-navigation-item__link">
      <div class="wis-navigation-item__label-wrap">
        <i class="mdi mdi-24px wit-offset-right--sm" :class="iconClass" />
        <span>{{ $t(link.label) }}</span>
      </div>

      <span v-if="link.badge" class="wis-navigation-item__tag wit-offset-left--auto">
        {{ link.badge }}
      </span>
    </NuxtLink>
  </li>
</template>

<script>
import { computed, useRoute } from '@nuxtjs/composition-api'

export default {
    name: 'NavigationItem',

    props: {
        link: {
            required: true,
            type: Object
        }
    },

    setup (props) {
        const route = useRoute()
        const iconClass = computed(() => `mdi-${props.link.icon}`)
        const itemClasses = computed(() => ({ active: route.value.path === props.link.to }))

        return { iconClass, itemClasses }
    }
}
</script>

<style scoped lang="scss">
    .wis-navigation-item {
        --opacity: 0.8;

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

    .wis-navigation-item__label-wrap {
        display: flex;
        align-items: center;
        opacity: var(--opacity);
    }

    .wis-navigation-item__link {
        width: 100%;
        color: var(--white);
    }

    .wis-navigation-item__tag {
        font-weight: 600;
        font-size: 10px;
        padding-left: 0.625rem;
        padding-right: 0.625rem;
        color: #000;
        background-color: rgb(45 212 191);
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        //width: 16px;
        height: 20px;
    }
</style>
