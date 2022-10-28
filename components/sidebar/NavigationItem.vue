<template>
    <li class="wis-navigation-item" :class="itemClasses">
        <NuxtLink :to="link.to" class="flex align-items-center wis-navigation-item__link">
            <div class="wis-navigation-item__label-wrap">
                <Icon :name="iconName" size="24" class="wis-navigation-item__icon mr-3" />
                <span>{{ $t(link.label) }}</span>
            </div>

            <span v-if="link.badge" class="wis-navigation-item__tag ml-auto">
                {{ link.badge }}
            </span>

            <span v-if="link.hasMark" v-tooltip.top="$t('ActionRequired')" class="ml-auto wis-navigation-item__mark">
                <Icon name="mdi:alert-circle-outline" size="20" />
            </span>
        </NuxtLink>
    </li>
</template>

<script setup>
const { $t } = useTranslate()

const props = defineProps({
    link: {
        required: true,
        type: Object
    }
})

const router = useRouter()

const iconName = computed(() => `mdi:${props.link.icon}`)
const itemClasses = computed(() => ({ active: router.currentRoute.value.path === props.link.to }))
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
        color: var(--danger);
    }
</style>
