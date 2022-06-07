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

      <b-button :type="toggleButtonType" class="wit-font-weight--700" @click="toggleProfile">
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
import Card from '@/components/basic/Card.vue'
import { User } from '@/store'
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
        toggleProfile () {
            this.isPublicProfile ? this.makeProfilePrivate() : this.makeProfilePublic()
        },

        async makeProfilePublic () {
            try {
                await this.$store.dispatch(User.F.Actions.TOGGLE_PROFILE, true)
                this.$showSuccess(this.$t('Settings_ProfileVisibilityChanged'))
            } catch (error) {
                this.$showError(error)
            }
        },

        makeProfilePrivate () {
            showPopup(this, {
                title: this.$t('Settings_MakePrivatePopupTitle'),
                message: this.$t('Settings_WannaMakePrivate'),
                confirmText: this.$t('Confirm'),
                cancelText: this.$t('Cancel'),
                onConfirm: async () => {
                    try {
                        await this.$store.dispatch(User.F.Actions.TOGGLE_PROFILE, false)
                        this.$showSuccess(this.$t('Settings_ProfileVisibilityChanged'))
                    } catch (error) {
                        this.$showError(error)
                    }
                }
            })
        },

        deleteProfile () {
            showPopup(this, {
                title: this.$t('Settings_RemoveProfileTitle'),
                message: this.$t('Settings_WannaRemoveProfile'),
                confirmText: this.$t('Confirm'),
                cancelText: this.$t('Cancel'),
                onConfirm: () => {
                    this.$store.dispatch(User.F.Actions.REMOVE_PROFILE).catch(this.$showError)
                }
            })
        }
    }
}
</script>
