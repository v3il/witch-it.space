<template>
    <li class="wis-navigation-item" :class="itemClasses">
        <NuxtLink :to="link.to" class="wit-flex wit-flex--align-center wis-navigation-item__link">
            <div class="wis-navigation-item__label-wrap">
                <i class="mdi mdi-24px wit-offset-right--sm wis-navigation-item__icon" :class="iconClass" />
                <span>{{ $t(link.label) }}</span>
            </div>

            <span v-if="link.badge" class="wis-navigation-item__tag wit-offset-left--auto">
                {{ link.badge }}
            </span>

            <span v-if="link.hasMark" v-tooltip="$t('ActionRequired')" class="wit-offset-left--auto wis-navigation-item__mark">
                <i class="mdi mdi-alert-circle-outline mdi-20px wit-color--danger" />
            </span>
        </NuxtLink>
    </li>
</template>

<script setup>
// import { computed, useRoute } from '@nuxtjs/composition-api'

const props = defineProps({
    link: {
        required: true,
        type: Object
    }
})

const router = useRouter()

const iconClass = computed(() => `mdi-${props.link.icon}`)
const itemClasses = computed(() => ({ active: router.currentRoute.value.path === props.link.to }))

// export default {
//     name: 'NavigationItem',
//
//     props: {
//
//     },
//
//     setup (props) {
//         return { iconClass, itemClasses }
//     }
// }
</script>

<style scoped lang="scss">
    .wis-navigation-item {
        --text-opacity: 0.8;
        --icon-opacity: 0.6;

        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 13px;
        font-weight: 500;
        line-height: 20px;
        text-decoration: none;
        border-radius: 6px;

        &.active,
        &:hover {
            --text-opacity: 1;
            --icon-opacity: 1;

            background-color: #2c3344;
        }
    }

    .wis-navigation-item__icon {
        opacity: var(--icon-opacity);
    }

    .wis-navigation-item__label-wrap {
        display: flex;
        align-items: center;
        opacity: var(--text-opacity);
    }

    .wis-navigation-item__link {
        width: 100%;
        color: var(--white);
        padding: 10px 16px;
    }

    .wis-navigation-item__tag {
        font-weight: 600;
        font-size: 10px;
        padding-left: 0.625rem;
        padding-right: 0.625rem;
        background-color: var(--dark-pink);
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20px;
    }

    .wis-navigation-item__mark {
        height: 20px;
    }
</style>
