<template>
  <Card type="error">
    <template #title>
      <h2 class="wit-font-size--sm wit-offset-bottom--sm">
        {{ $t('Settings_DangerZone') }}
      </h2>
    </template>

    <div class="wit-offset-bottom--sm wit-flex wit-flex--align-center wiz-border--bottom wit-padding-bottom--sm">
      <div class="wit-flex__item--grow">
        <span class="wit-block wit-offset-bottom--xs">{{ $t('Settings_HideProfile') }}</span>

        <p v-if="isPublicProfile" class="wit-color--success">
          {{ $t('Settings_ProfileIsVisible') }}
        </p>

        <p v-else class="wit-color--warning">
          {{ $t('Settings_ProfileIsHidden') }}
        </p>
      </div>

      <b-button :type="toggleButtonType" class="wit-font-weight--700" @click="toggleProfileVisibility">
        {{ $t('Change') }}
      </b-button>
    </div>

    <div class="wit-flex wit-flex--align-center">
      <div class="wit-flex__item--grow">
        <span class="wit-block wit-offset-bottom--xs">{{ $t('Settings_DeleteProfile') }}</span>

        <p class="wit-color--danger">
          {{ $t('Settings_DeleteProfileHint') }}
        </p>
      </div>

      <b-button type="is-danger" class="wit-font-weight--700" @click="deleteProfile">
        {{ $t('Delete') }}
      </b-button>
    </div>
  </Card>
</template>

<script>
import { mapActions } from 'vuex'
import Card from '@/components/basic/Card.vue'
import { StoreModules, User } from '@/store'
import { showPopup } from '@/utils'

export default {
    name: 'DangerZone',

    components: {
        Card
    },

    props: {
        profile: {
            required: true,
            type: Object
        }
    },

    computed: {
        isPublicProfile () {
            return this.profile.isPublic
        },

        toggleButtonType () {
            return this.isPublicProfile ? 'is-warning' : 'is-success'
        }
    },

    methods: {
        ...mapActions(StoreModules.USER, {
            deleteProfile: 'deleteProfile',
            toggleProfile: 'toggleProfile'
        }),

        toggleProfileVisibility () {
            this.isPublicProfile ? this.makeProfilePrivate() : this.makeProfilePublic()
        },

        makeProfilePublic () {
            this.toggleProfile(true)
                .then(() => this.$showSuccess(this.$t('Settings_ProfileVisibilityChanged')))
                .catch(this.$showError)
        },

        async makeProfilePrivate () {
            const isConfirmed = await this.$showConfirm({
                content: this.$t('Settings_WannaMakePrivate'),
                popupTitle: this.$t('Settings_MakePrivatePopupTitle')
            })

            if (!isConfirmed) {
                return
            }

            this.toggleProfile(false)
                .then(() => this.$showSuccess(this.$t('Settings_ProfileVisibilityChanged')))
                .catch(this.$showError)
        },

        async deleteProfile () {
            const isConfirmed = await this.$showConfirm({
                content: this.$t('Settings_WannaRemoveProfile'),
                popupTitle: this.$t('Settings_RemoveProfileTitle')
            })

            if (isConfirmed) {
                this.toggleProfile(false).catch(this.$showError)
            }
        }
    }
}
</script>
