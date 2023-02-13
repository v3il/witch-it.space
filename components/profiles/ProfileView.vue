<template>
    <div class="wis-user-view">
        <div class="wis-user-view__section flex align-items-center flex-column">
            <UserAvatar :user="profile" class="wis-user-view__avatar mb-3" />

            <div class="flex flex-column align-items-center">
                <h5 class="wit-text--overflow mb-3 text-lg">
                    {{ profile.displayName }}
                </h5>

                <div class="wis-user-view__tags">
                    <div class="wis-user-view__tag" :class="isVerifiedTagClass">
                        <div class="flex align-items-center">
                            {{ $t('Verified') }}:
                            <Icon :name="isVerifiedIconClass" class="ml-1" size="16" />
                        </div>
                    </div>

                    <div class="wis-user-view__tag" :class="hasSteamGuardTagClass">
                        <div class="flex align-items-center">
                            Steam Guard:
                            <Icon :name="hasSteamGuardIconClass" class="ml-1" size="16" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex border-top-default w-full">
            <NuxtLink :to="marketUrl" class="wis-user-view_button">
                {{ $t('Market') }}
                <span v-if="profile.marketSize" class="color-muted text-xs">({{ profile.marketSize }})</span>
            </NuxtLink>

            <NuxtLink :to="wishlistUrl" class="wis-user-view_button">
                {{ $t('Wishlist') }}
                <span v-if="profile.wishlistSize" class="color-muted text-xs">({{ profile.wishlistSize }})</span>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { buildUserMarketUrl, buildUserWishlistUrl } from '@/utils'

const props = defineProps({
    profile: {
        required: true,
        type: Object
    }
})

const isVerified = computed(() => props.profile.isVerified)
const marketUrl = computed(() => buildUserMarketUrl(props.profile.id))
const wishlistUrl = computed(() => buildUserWishlistUrl(props.profile.id))

const isVerifiedTagClass = computed(() => isVerified.value ? 'success' : 'danger')
const isVerifiedIconClass = computed(() => isVerified.value ? 'mdi:check' : 'mdi:close')

const hasSteamGuard = computed(() => props.profile.isGuardProtected)
const hasSteamGuardTagClass = computed(() => hasSteamGuard.value ? 'success' : 'danger')
const hasSteamGuardIconClass = computed(() => hasSteamGuard.value ? 'mdi:check' : 'mdi:close')

const { $t } = useTranslate()
</script>

<style scoped lang="scss">
.wis-user-view {
    border-radius: 8px;
    background-color: var(--card-bg-color);
    overflow: hidden;
    position: relative;
    border: 1px solid #64748b;
}

.wis-user-view__section {
    padding: 24px 4px 0;
}

.wis-user-view__avatar {
    width: 64px;
    height: 64px;
    display: block;
    border-radius: 16px;
}

.wis-user-view__tags {
    padding: 0 4px;
    margin-bottom: 24px;
    display: flex;
    flex-wrap: wrap;
}

.wis-user-view__tag {
    --icon-color: #fff;

    background-color: transparent;
    border: 1px solid #64748b;
    margin-left: 4px;
    margin-right: 4px !important;
    color: var(--muted-text-color);
    border-radius: 99px;
    padding: 4px 8px;
    font-size: 12px;

    & .icon {
        color: var(--icon-color);
    }

    &.success {
        --icon-color: var(--success);
    }

    &.danger {
        --icon-color: var(--danger);
    }
}

.wis-user-view_button {
    padding: 16px 0;
    flex-basis: 50%;
    height: auto;
    border-radius: 0;
    color: white !important;
    text-decoration: none !important;
    text-align: center;
    border: 1px solid transparent;

    &:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }

    &:first-child {
        border-bottom-left-radius: inherit;
        border-right: 1px solid rgba(241, 245, 249, 0.12);
    }

    &:last-child {
        border-bottom-right-radius: inherit;
    }
}
</style>
