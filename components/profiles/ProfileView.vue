<template>
  <Card class="wis-profile-view wit-background--content wit-position--relative wit-cursor--pointer" @click="onProfileClick">
    <div class="wit-flex">
      <img
        :src="avatarUrl"
        alt="Avatar"
        class="wit-offset-right--sm wit-flex--align-self-start wis-profile-view__avatar"
      >
      <div class="wit-offset-right--xs wit-flex__item--grow wit-overflow--hidden">
        <h5 class="wit-color--primary wit-offset-bottom--xs wit-font-size--sm wit-text--overflow">
          {{ profile.displayName }}
        </h5>
        <p class="wit-offset-bottom--xs">
          {{ $t('OffersAvailable', [profile.offersCount]) }}
        </p>
        <p class="wit-flex wit-flex--align-center">
          Steam Guard:
          <b-icon v-if="profile.isGuardProtected" size="is-small" class="is-size-6 wit-color--success wit-offset-left--xxs" icon="shield-check" />
          <b-icon v-else size="is-small" class="is-size-6 wit-color--danger wit-offset-left--xxs" icon="shield-remove" />
        </p>
      </div>

      <div class="wit-flex wit-flex--column">
        <b-button
          v-if="profile.steamProfileUrl"
          type="is-link"
          tag="a"
          :href="profile.steamProfileUrl"
          target="_blank"
          class="wit-offset-bottom--xs wit-transition--background wit-flex wit-flex--center wis-profile-view__social-btn"
          @click.stop
        >
          <b-icon size="is-small" class="is-size-5" icon="steam" />
        </b-button>

        <b-button
          v-if="profile.discordDMUrl"
          type="is-link"
          tag="a"
          :href="profile.discordDMUrl"
          target="_blank"
          class="wit-transition--background wit-flex wit-flex--center wis-profile-view__social-btn"
          @click.stop
        >
          <b-icon size="is-small" class="is-size-5" icon="discord" />
        </b-button>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import { buildAvatarUrl, buildUserMarketUrl } from '@/utils'

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

    computed: {
        avatarUrl () {
            return buildAvatarUrl(this.profile.avatarId)
        }
    },

    methods: {
        onProfileClick () {
            this.$router.push(buildUserMarketUrl(this.profile.id))
        }
    }
}
</script>

<style scoped lang="scss">
.wis-profile-view {
    border-radius: var(--offset-xs);
    min-height: 110px;
}

.wis-profile-view__avatar {
    $avatar-size: 60px;

    border-radius: 50%;
    padding: var(--offset-xxs);
    background-color: var(--gray-200);
    border: 1px solid var(--gray-300);
    width: $avatar-size;
    height: $avatar-size;
}

.wis-profile-view__social-btn {
    $button-size: var(--offset-lg);

    width: $button-size;
    height: $button-size;
    border-radius: 50%;
}
</style>
