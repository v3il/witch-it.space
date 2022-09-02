<template>
  <div class="wit-flex wit-flex--wrap wit-flex--align-center">
    <button
      v-for="avatarId in $options.avatarIds"
      :key="avatarId"
      :class="getAvatarClasses(avatarId)"
      type="is-ghost"
      class="wit-offset-right--xs wit-avatar-picker__btn wit-offset-bottom--xs"
      @click="onAvatarSelected(avatarId)"
    >
      <img
        :src="getAvatarURL(avatarId)"
        :alt="avatarId"
        class="wit-avatar-picker__img"
      >
    </button>
  </div>
</template>

<script>
import { buildAvatarUrl } from '@/utils/index.js'

export default {
    name: 'AvatarPicker',
    avatarIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],

    model: {
        event: 'change',
        prop: 'selectedAvatarId'
    },

    props: {
        selectedAvatarId: {
            required: true,
            type: Number
        }
    },

    methods: {
        getAvatarURL (id) {
            return buildAvatarUrl(id)
        },

        getAvatarClasses (avatarId) {
            return {
                active: avatarId === this.selectedAvatarId
            }
        },

        onAvatarSelected (avatarId) {
            if (this.selectedAvatarId === avatarId) {
                return
            }

            this.$emit('change', avatarId)
        }
    }
}
</script>

<style scoped lang="scss">
$avatar-size: 60px;

.wit-avatar-picker__btn {
    padding: 0;
    border: 3px solid transparent;
    border-radius: var(--offset-xxs);
    width: $avatar-size;
    height: $avatar-size;
    background-color: transparent;
    cursor: pointer;

    &.active {
        border-color: var(--primary);
    }
}

.wit-avatar-picker__img {
    height: 100%;
    width: 100%;
    border-radius: inherit;
}
</style>
