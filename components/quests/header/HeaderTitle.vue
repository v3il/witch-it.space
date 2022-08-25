<template>
  <h1 class="wis-user-card__title wit-text--overflow">
    {{ $t('Quests_HeaderTitle') }} ___!___
  </h1>
</template>

<script>
export default {
    name: 'HeaderTitle'

}
</script>

<style scoped lang="scss">
.wis-user-card__title {
    letter-spacing: -1px;
    font-size: 32px;
    line-height: 50px;

    &.compact {
        font-size: 20px;
        line-height: 36px;
    }

    @media (max-width: 769px) {
        letter-spacing: -0.025em;
        line-height: 1.75rem;
        font-size: 1.25rem;
    }
}
</style>
