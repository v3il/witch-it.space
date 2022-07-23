<template>
  <div class="wis-notifications-center">
    <i class="mdi mdi-bell-outline mdi-24px" style="color: #94a3b8;" />

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
}

.wis-notifications-center__tag {
    position: absolute;
    top: -4px;
    right: -2px;
    font-weight: 500;
    font-size: 0.75rem;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    background-color: var(--error-light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
}
</style>
