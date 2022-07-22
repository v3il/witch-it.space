<template>
  <div class="wis-not-found">
    <Error404Image class="wis-not-found__image" />

    <h1 class="wis-not-found__title">
      {{ $t('Error404_Title') }}
    </h1>

    <p class="wis-not-found__subtitle">
      {{ $t('Error404_Subtitle') }}
    </p>

    <nuxt-link class="wis-not-found__link" :to="linkUrl">
      {{ linkTitle }}
    </nuxt-link>
  </div>
</template>

<script>
import Error404Image from '@/components/errors/Error404Image.vue'

export default {
    name: 'NotFound',

    components: { Error404Image },

    props: {
        linkTitle: {
            required: true,
            type: String
        },

        linkUrl: {
            required: true,
            type: String
        }
    }
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
    max-width: 40rem;
    margin-bottom: 6rem;
}

.wis-not-found__title {
    margin-bottom: 8px;
    letter-spacing: -0.025em;
    font-size: 3rem;
    line-height: 1;
    font-weight: 800;
    text-align: center;
}

.wis-not-found__subtitle {
    margin-bottom: 3rem;
    font-weight: 500;
    letter-spacing: -0.025em;
    font-size: 1.125rem;
    color: rgb(148, 163, 184);
    text-align: center;
    line-height: 1.5;
}

.wis-not-found__link {
    font-weight: 500;
    text-decoration: underline;
}

@media (max-width: 600px) {
    .wis-not-found__image {
        margin-bottom: 3rem;
    }

    .wis-not-found__title {
        font-size: 2rem;
    }

    .wis-not-found__subtitle {
        font-size: 1rem;
    }
}
</style>
