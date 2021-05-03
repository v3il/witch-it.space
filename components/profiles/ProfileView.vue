<template>
  <Card class="wis-profile-view wit-background--content wit-position--relative wis-profiles__profile">
    <div class="wit-flex">
      <img
        :src="`images/${profile.avatarId}.png`"
        alt="Hey!"
        class="wit-offset-right--sm wit-flex--align-self-start im"
      >
      <div class="wit-offset-right--xs wit-flex__item--grow wit-overflow--hidden">
        <h5 class="wit-color--primary wit-offset-bottom--xs wit-font-size--xs1 hh">
          {{ profile.displayName }}
        </h5>
        <p class="wit-color--muted1 wit-offset-bottom--xs">
          0 offers
        </p>
        <p class="">
          Steam Guard
        </p>
        <!--        <div class="wit-flex">-->
        <!--          <b-button-->
        <!--            type="is-link"-->
        <!--            class="wit-offset-right&#45;&#45;xs wit-transition&#45;&#45;background wit-flex wit-flex&#45;&#45;center"-->
        <!--          >-->
        <!--            <b-icon size="is-small" class="is-size-5" icon="steam" />-->
        <!--          </b-button>-->
        <!--        </div>-->
      </div>

      <div class="wit-flex wit-flex--column">
        <b-button
          type="is-link"
          class="wit-offset-bottom--xs wit-transition--background wit-flex wit-flex--center bb"
        >
          <b-icon size="is-small" class="is-size-6" icon="steam" />
        </b-button>

        <b-button
          type="is-link"
          class="wit-transition--background wit-flex wit-flex--center bb"
        >
          <b-icon size="is-small" class="is-size-6" icon="discord" />
        </b-button>
      </div>
    </div>
    <!--      <div data-v-4b953864="" class="wit-background&#45;&#45;primary wit-position&#45;&#45;absolute lock">-->
    <!--      <span data-v-4b953864="" class="icon is-size-6 is-small"><i class="mdi mdi-lock" /></span>-->
    <!--    </div>-->
  </Card>

<!--  <div class="wis-profile-view wit-paddings&#45;&#45;xs wit-background&#45;&#45;content wit-position&#45;&#45;relative">-->
<!--    <div class="wit-flex">-->
<!--      <img-->
<!--        :src="`images/${profile.avatarId}.png`"-->
<!--        alt="Hey!"-->
<!--        width="36px"-->
<!--        height="36px"-->
<!--        style="border-radius: 50%;"-->
<!--        class="wit-offset-right&#45;&#45;xs wit-flex&#45;&#45;align-self-start"-->
<!--      >-->

<!--      <div>-->
<!--        <p class="wit&#45;&#45;font-size&#45;&#45;sm wit-offset-bottom&#45;&#45;xxs">-->
<!--          {{ profile.displayName }}-->
<!--        </p>-->
<!--        <p class="wit-color&#45;&#45;muted wit-offset-bottom&#45;&#45;xxs">-->
<!--          0 offers-->
<!--        </p>-->
<!--        <div class="wit-flex">-->
<!--          <div class="wit-item-image&#45;&#45;very-rare co">-->
<!--            0-->
<!--          </div>-->
<!--          <div class="wit-item-image&#45;&#45;whimsical co">-->
<!--            0-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="wit-background&#45;&#45;primary wit-position&#45;&#45;absolute lock">-->
<!--      <b-icon icon="lock" size="is-small" class="is-size-6" />-->
<!--    </div>-->
<!--  </div>-->
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
    }
}
</script>

<style scoped lang="scss">
.wis-profile-view {
    border-radius: 8px;
    background-color: #2a3042;
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
