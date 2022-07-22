<template>
  <div class="wis-not-found">
    <NotFoundImage class="wis-not-found__image" />

    <h1 class="wis-not-found__title">
      Ooops... 404!
    </h1>

    <p class="wis-not-found__subtitle">
      The page you requested could not be found.
    </p>

    <nuxt-link to="/profiles">
      Back to Dashboard
    </nuxt-link>
  </div>
</template>

<script>
import NotFoundImage from '@/components/basic/notFound/NotFoundImage.vue'

export default {
    name: 'NotFound',

    components: { NotFoundImage }
}
</script>

<style scoped>
.wis-not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
}

.wis-not-found__image {
    max-width: 48rem;
    margin-bottom: 6rem;
}

.wis-not-found__title {
    margin-bottom: 8px;
    letter-spacing: -0.025em;
    font-size: 3rem;
    line-height: 1;
    font-weight: 800;
}

.wis-not-found__subtitle {
    margin-bottom: 3rem;
    font-weight: 500;
    letter-spacing: -0.025em;
    font-size: 1.125rem;
    color: rgb(148, 163, 184);
}

@media (max-width: 600px) {
    .wis-not-found__image {
        margin-bottom: 3rem;
    }
}
</style>
