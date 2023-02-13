<template>
    <div>
        <div class="wit-flex wit-flex--align-center">
            <div class="wit-flex__item--grow">
                <span class="wit-block wit-offset-bottom--sm wit-font-size--xsplus">{{ $t('Settings_HideProfile') }}</span>

                <p v-if="isPublicProfile" class="wit-color--success">
                    {{ $t('Settings_ProfileIsVisible') }}
                </p>

                <p v-else class="wit-color--warning">
                    {{ $t('Settings_ProfileIsHidden') }}
                </p>
            </div>

            <Button :type="toggleButtonType" class="wit-font-weight--700" @click="toggleProfile">
                {{ $t('Change') }}
            </Button>
        </div>

        <hr class="wis-settings__separator">

        <div class="wit-flex wit-flex--align-center">
            <div class="wit-flex__item--grow">
                <span class="wit-block wit-offset-bottom--sm wit-font-size--xsplus">{{ $t('Settings_DeleteProfile') }}</span>

                <p class="wit-color--danger">
                    {{ $t('Settings_DeleteProfileHint') }}
                </p>
            </div>

            <Button type="is-danger" class="wit-font-weight--700" @click="deleteProfile">
                {{ $t('Delete') }}
            </Button>
        </div>
    </div>
</template>

<script setup>
import { useCurrentUserStore } from '~/store/currentUser'

const { $t } = useTranslate()
const { showError, showSuccess } = useNotification()

const currentUserStore = useCurrentUserStore()
const user = computed(() => currentUserStore.currentUser)

const isPublicProfile = computed(() => user.value.isPublic)
const toggleButtonType = computed(() => isPublicProfile.value ? 'is-warning' : 'is-success')

function toggleProfile () {
    const isPublicProfile = this.$store.getters['user/isPublic']
    isPublicProfile ? this.makeProfilePrivate() : this.makeProfilePublic()
}

function makeProfilePublic () {
    // this.$store.dispatch('user/toggleProfile', true)
    //     .then(() => this.$showSuccess(this.$t('Settings_ProfileVisibilityChanged')))
    //     .catch(this.$showError)
}

async function makeProfilePrivate () {
    // const isConfirmed = await this.$showConfirm({
    //     content: this.$t('Settings_WannaMakePrivate'),
    //     popupTitle: this.$t('Settings_MakePrivatePopupTitle')
    // })
    //
    // if (isConfirmed) {
    //     this.$store.dispatch('user/toggleProfile', false)
    //         .then(() => this.$showSuccess(this.$t('Settings_ProfileVisibilityChanged')))
    //         .catch(this.$showError)
    // }
}

async function deleteProfile () {
    // const isConfirmed = await this.$showConfirm({
    //     content: this.$t('Settings_WannaRemoveProfile'),
    //     popupTitle: this.$t('Settings_RemoveProfileTitle')
    // })
    //
    // if (isConfirmed) {
    //     this.$store.dispatch('user/deleteProfile').catch(this.$showError)
    // }
}

// // import SettingsActions from '@/components/settings/Settin?etworks.vue'
//
// export default {
//     name: 'DangerZone',
//
//     components: {
//         SettingsActions,
//         SocialNetworks
//     },
//
//     setup () {
//         const store = useStore()
//
//
//
//         return { isPublicProfile, toggleButtonType }
//     },
//
//     methods: {
//         toggleProfile () {
//             const isPublicProfile = this.$store.getters['user/isPublic']
//             isPublicProfile ? this.makeProfilePrivate() : this.makeProfilePublic()
//         },
//
//         makeProfilePublic () {
//             this.$store.dispatch('user/toggleProfile', true)
//                 .then(() => this.$showSuccess(this.$t('Settings_ProfileVisibilityChanged')))
//                 .catch(this.$showError)
//         },
//
//         async makeProfilePrivate () {
//             const isConfirmed = await this.$showConfirm({
//                 content: this.$t('Settings_WannaMakePrivate'),
//                 popupTitle: this.$t('Settings_MakePrivatePopupTitle')
//             })
//
//             if (isConfirmed) {
//                 this.$store.dispatch('user/toggleProfile', false)
//                     .then(() => this.$showSuccess(this.$t('Settings_ProfileVisibilityChanged')))
//                     .catch(this.$showError)
//             }
//         },
//
//         async deleteProfile () {
//             const isConfirmed = await this.$showConfirm({
//                 content: this.$t('Settings_WannaRemoveProfile'),
//                 popupTitle: this.$t('Settings_RemoveProfileTitle')
//             })
//
//             if (isConfirmed) {
//                 this.$store.dispatch('user/deleteProfile').catch(this.$showError)
//             }
//         }
//     }
// }
</script>
