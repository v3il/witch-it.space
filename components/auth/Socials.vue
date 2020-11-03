<template>
  <div class="wit-flex wit-flex--center social-links">
    <a href="/api/auth/steam" class="social-links__link wit-offset-right--xs"><span class="mdi mdi-steam" /></a>
    <a href="/api/auth/discord" class="social-links__link wit-offset-right--xs"><span class="mdi mdi-discord" /></a>
    <a href="/api/auth/google" class="social-links__link wit-offset-right--xs"><span class="mdi mdi-google" /></a>
  </div>
</template>

<script>
export default {
    name: 'Socials'
}
</script>

<style scoped>
.social-links__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 39px;
    height: 39px;
    font-size: 20px;
    margin-right: 8px;
    background: #626ed4;
    color: white;
    border-radius: 4px;
}
</style>
