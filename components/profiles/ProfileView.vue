<template>
  <Card class="wis-profile-view wit-background--content wit-position--relative wis-profiles__profile" @click.native="onClick">
    <div class="wit-flex">
      <img
        :src="`images/${profile.avatarId}.png`"
        alt="Hey!"
        class="wit-offset-right--sm wit-flex--align-self-start im"
      >
      <div class="wit-offset-right--xs wit-flex__item--grow wit-overflow--hidden">
        <h5 class="wit-color--primary wit-offset-bottom--xs wit-font-size--sm hh">
          {{ profile.displayName }}
        </h5>
        <p class="wit-color--muted1 wit-offset-bottom--xs">
          0 offers
        </p>
        <p class="">
          Steam Guard enabled
        </p>
      </div>

      <div class="wit-flex wit-flex--column">
        <b-button
          type="is-link"
          tag="a"
          :href="profile.steamProfileUrl"
          target="_blank"
          class="wit-offset-bottom--xs wit-transition--background wit-flex wit-flex--center bb"
          data-social-link
        >
          <b-icon size="is-small" class="is-size-6" icon="steam" />
        </b-button>

        <b-button
          type="is-link"
          tag="a"
          :href="profile.discordProfileUrl"
          target="_blank"
          class="wit-transition--background wit-flex wit-flex--center bb"
          data-social-link
        >
          <b-icon size="is-small" class="is-size-6" icon="discord" />
        </b-button>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'

export default {
    name: 'ProfileView',

    components: {
        Card
    },

    props: {
        profile: {
            required: true,
            type: Object
        }
    },

    methods: {
        onClick ({ target }) {
            if (target.closest('[data-social-link]')) {
                return
            }

            this.$router.push(`/profiles/${this.profile.id}/market`)
        }
    }
}
</script>

<style scoped lang="scss">
.wis-profile-view {
    border-radius: 8px;
    background-color: #2a3042;
    cursor: pointer;
}

.co {
    border: 1px solid var(--item-whimsical);
    //border-radius: 50%;
    border-radius: 4px;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
}

.lock {
    right: 0;
    top: 0;
}

.im {
    border-radius: 50%;
    padding: 4px;
    background-color: #32394e;
    border: 1px solid #2e3648;
    width: 60px;
    height: 60px;
}

.mb-1 {
    font-size: 18px !important;
    color: #626ed4 !important;
}

.bb {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

.hh {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
