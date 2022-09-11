<template>
  <div class="wis-auth-panel__left">
    <img
      src="https://ik.imagekit.io/igo1qzk1oe2z/witch_it_space/hey_FUluxceLg.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1662754137677"
      alt="hey"
      class="wis-auth-panel__logo wit-offset-bottom--lg"
    >
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'
import AuthForm from '@/components/auth/AuthForm.vue'
import Logo from '@/components/sidebar/components/Logo.vue'
import Socials from '@/components/auth/Socials.vue'

export default {
    name: 'AuthPanelLeft'

    // components: {
    //     Logo,
    //     AuthForm,
    //     Socials
    // }
}
</script>

<style scoped lang="scss">
.wis-auth-panel__left {
    //background-color: rgb(30 41 59);
    flex: 1 1 auto;
    border-right: 1px solid rgb(241, 245, 249, 0.12);
    padding: 4rem 7rem;
    position: relative;
    background: url(https://ik.imagekit.io/igo1qzk1oe2z/witch_it_space/background_HeXF3atDe.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1662903732135) no-repeat center;
    background-size: 100% 100%;
}

.wis-auth-panel__bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.wis-auth-panel__logo {
    display: block;
    width: 100px;
    border-radius: 8px;
}
</style>
