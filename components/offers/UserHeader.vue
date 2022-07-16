<template>
  <div class="wis-user-card">
    <div class="wit-flex wit-flex--align-center wis-block--max-width wit-offset-left--auto wit-offset-right--auto wit-flex--wrap">
      <img src="https://ik.imagekit.io/igo1qzk1oe2z/avatars/9.webp" alt="" style="width: 64px; height: 64px; border-radius: 4px;">

      <div class="wit-offset-left--sm wit-flex__item--grow">
        <h1 style="letter-spacing: -0.9px; font-size: 36px; line-height: 49.5px;">
          !D's wishlist
        </h1>

        <p style="color: rgb(148, 163, 184); line-height: 24px;" class="wit-flex wit-flex--align-center">
          <i class="mdi mdi-bell mdi-18px wit-offset-right--xs" />
          Last market update: 2 days ago
        </p>
      </div>

      <div class="wit-flex wit-flex__item--no-shrink wit-offset-top--sm wit-offset-bottom--sm">
        <b-button type="is-secondary" class="wit-offset-right--xs wis-btn--rounded">
          <i class="mdi mdi-email mdi-18px wit-offset-right--xs" />
          Message
        </b-button>

        <b-button type="is-primary" class="wis-btn--rounded">
          <i class="mdi mdi-swap-vertical-circle mdi-18px wit-offset-right--xs" />
          Send a trade offer
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'UserHeader',

    setup (props) {

    }
}
</script>

<style scoped lang="scss">
.wis-user-card {
    background-color: var(--dark-gray);
    //height: 300px;
    border-bottom: 1px solid var(--border-color);
    padding: 48px 32px;
}
</style>
