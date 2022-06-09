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

        <p v-if="isPublic" class="wit-color--success">
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

      <b-button type="is-danger" class="wit-font-weight--700" @click="onDeleteProfile">
        {{ $t('Delete') }}
      </b-button>
    </div>
  </Card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Card from '@/components/basic/Card.vue'
import { StoreModules } from '@/store'

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
        ...mapGetters(StoreModules.USER, [
            'isPublic'
        ]),

        toggleButtonType () {
            return this.isPublic ? 'is-warning' : 'is-success'
        }
    },

    methods: {
        ...mapActions(StoreModules.USER, {
            deleteProfile: 'deleteProfile',
            toggleProfile: 'toggleProfile'
        }),

        toggleProfileVisibility () {
            this.isPublic ? this.makeProfilePrivate() : this.makeProfilePublic()
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

        async onDeleteProfile () {
            const isConfirmed = await this.$showConfirm({
                content: this.$t('Settings_WannaRemoveProfile'),
                popupTitle: this.$t('Settings_RemoveProfileTitle')
            })

            if (isConfirmed) {
                this.deleteProfile().catch(this.$showError)
            }
        }
    }
}
</script>
