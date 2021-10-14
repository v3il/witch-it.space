<template>
  <div class="wit-flex wit-flex--center">
    <b-tooltip v-for="social in $options.socials" :key="social.value" :label="social.label" type="is-primary is-dark" square>
      <b-button
        :href="`/api/auth/${social.value}`"
        tag="a"
        type="is-link"
        class="wit-offset-right--xs wit-transition--background wit-flex wit-flex--center"
      >
        <b-icon size="is-small" class="is-size-5" :icon="social.icon" />
      </b-button>
    </b-tooltip>
  </div>
</template>

<script>
export default {
    name: 'Socials',

    socials: [
        { value: 'steam', icon: 'steam', label: 'Steam' },
        { value: 'discord', icon: 'discord', label: 'Discord' },
        { value: 'google', icon: 'google-plus', label: 'Google' }
    ]
}
</script>
