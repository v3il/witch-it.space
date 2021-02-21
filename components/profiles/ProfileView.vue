<template>
  <div class="wis-profile-view wit-paddings--xs wit-background--content wit-position--relative">
    <div class="wit-flex">
      <img
        :src="`images/${profile.avatarId}.png`"
        alt="Hey!"
        width="36px"
        height="36px"
        style="border-radius: 50%;"
        class="wit-offset-right--xs wit-flex--align-self-start"
      >

      <div>
        <p class="wit--font-size--sm wit-offset-bottom--xxs">
          {{ profile.displayName }}
        </p>
        <p class="wit-color--muted wit-offset-bottom--xxs">
          0 offers
        </p>
        <div class="wit-flex">
          <div class="wit-item-image--very-rare co">
            0
          </div>
          <div class="wit-item-image--whimsical co">
            0
          </div>
        </div>
      </div>
    </div>

    <div class="wit-background--primary wit-position--absolute lock">
      <b-icon icon="lock" size="is-small" class="is-size-6" />
    </div>
  </div>
</template>

<script>
// import Card from '@/components/Card'

export default {
    name: 'ProfileView',

    // components: {
    //     Card
    // },

    props: {
        profile: {
            required: true,
            type: Object
        }
    }
}
</script>

<style scoped lang="scss">
.wis-profile-view {
    border-radius: 8px;
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
</style>
