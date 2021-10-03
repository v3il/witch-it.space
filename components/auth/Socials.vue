<template>
  <div class="wit-flex wit-flex--center">
    <b-button
      v-for="social in $options.socials"
      :key="social"
      :href="`/api/auth/${social}`"
      tag="a"
      type="is-link"
      class="wit-offset-right--xs wit-transition--background wit-flex wit-flex--center"
    >
      <b-icon size="is-small" class="is-size-5" :icon="social" />
    </b-button>
  </div>
</template>

<script>
export default {
    name: 'Socials',

    socials: [
        'steam',
        'discord',
        'google-plus'
    ]
}
</script>
