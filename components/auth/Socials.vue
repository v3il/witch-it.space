<template>
  <div class="wit-flex wit-flex--center social-links">
    <a
      v-for="social in $options.socials"
      :key="social"
      :href="`/api/auth/${social}`"
      class="wit-flex wit-flex--center social-links__link wit-offset-right--xs"
    >
      <span class="mdi" :class="`mdi-${social}`" />
    </a>
  </div>
</template>

<script>
export default {
    name: 'Socials',

    socials: [
        'steam',
        'discord',
        'google'
    ]
}
</script>

<style scoped>
.social-links__link {
    width: var(--offset-xlg);
    height: var(--offset-xlg);
    font-size: var(--text-size-sm);
    background: var(--primary);
    color: var(--white);
    border-radius: var(--offset-xxs);
}
</style>
