<template>
  <div class="card wit-color--white">
    <div class="card-body">
      <h4 class="card-title mb-4">
        <slot name="title" />
      </h4>

      <slot />
    </div>
  </div>
</template>

<script>
export default {
    name: 'Card'
}
</script>

<style scoped lang="scss">
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #2a3042;
    background-clip: border-box;
    border: 0 solid #2e3648;
    border-radius: 0.25rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
}

.card-body {
    flex: 1 1 auto;
    padding: 1.25rem 1.25rem;
}

.card-title {
    font-size: 16px;
    font-family: Sarabun, sans-serif;
    font-weight: 600;
    margin-bottom: 1rem !important;
    line-height: 1.2;
    margin-top: 0;
}
</style>
