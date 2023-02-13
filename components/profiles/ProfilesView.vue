<template>
    <div v-if="profiles.length" class="wit-flex wit-flex--wrap wis-profiles__grid">
        <ProfileView
            v-for="profile in profiles"
            :key="profile.id"
            :profile="profile"
            class="wis-profiles__profile"
        />
    </div>

    <EmptyState v-else :message="$t('Profiles_NoProfiles')" />
</template>

<script setup>
const { $t } = useTranslate()

defineProps({
    profiles: {
        required: true,
        type: Array
    }
})
</script>

<style scoped lang="scss">
.wis-profiles__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-auto-rows: max-content;
    gap: 24px;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(auto-fill, 275px);
        justify-content: center;
    }
}
</style>
