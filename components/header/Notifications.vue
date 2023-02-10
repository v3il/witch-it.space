<template>
    <div class="wis-notifications-center">
        <Icon name="mdi:bell-outline" size="24" />

        <span class="wis-notifications-center__tag">
            {{ 3 }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'Notifications'
}
</script>

<style scoped>
.wis-notifications-center {
    position: relative;
    color: #94a3b8;
    height: 100%;
    padding: 16px;
}

.wis-notifications-center__tag {
    position: absolute;
    top: 8px;
    right: 12px;
    font-weight: 500;
    font-size: 0.75rem;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    background-color: var(--danger);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    color: var(--white);
}
</style>
