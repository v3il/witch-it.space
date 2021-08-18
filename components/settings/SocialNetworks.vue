<template>
  <Card class="wit-offset-bottom--xlg">
    <template #title>
      {{ $t('Settings_SocialNetworks') }}
    </template>

    <template #description>
      <p>{{ $t('Settings_ConnectSocialDescription') }}</p>
    </template>

    <div class="wit-offset-bottom--sm wit-flex wit-flex--align-center wiz-border--bottom wit-padding-bottom--sm">
      <div class="wit-flex__item--grow">
        <strong class="wit-block wit-offset-bottom--xs">Steam</strong>
        <p v-if="profile.isSteamConnected" class="wit-color--success">
          {{ $t('Settings_ProfileIsConnected') }}
        </p>
        <p v-else class="wit-color--warning">
          {{ $t('Settings_ProfileIsNotConnected') }}
        </p>
      </div>

      <b-button v-if="profile.isSteamConnected" type="is-danger is-light" class="wit-font-weight--700" @click="disconnectSocial('steam')">
        {{ $t('Settings_Disconnect') }}
      </b-button>

      <b-button v-else type="is-success is-light" class="wit-font-weight--700" @click="connectSocial('steam')">
        {{ $t('Settings_Connect') }}
      </b-button>
    </div>

    <div class="wit-offset-bottom--sm wit-flex wit-flex--align-center wiz-border--bottom wit-padding-bottom--sm">
      <div class="wit-flex__item--grow">
        <strong class="wit-block wit-offset-bottom--xs">Discord</strong>
        <p v-if="profile.isDiscordConnected" class="wit-color--success">
          {{ $t('Settings_ProfileIsConnected') }}
        </p>
        <p v-else class="wit-color--warning">
          {{ $t('Settings_ProfileIsNotConnected') }}
        </p>
      </div>

      <b-button v-if="profile.isDiscordConnected" type="is-danger is-light" class="wit-font-weight--700" @click="disconnectSocial('discord')">
        {{ $t('Settings_Disconnect') }}
      </b-button>

      <b-button v-else type="is-success is-light" class="wit-font-weight--700" @click="connectSocial('discord')">
        {{ $t('Settings_Connect') }}
      </b-button>
    </div>

    <div class="wit-flex wit-flex--align-center">
      <div class="wit-flex__item--grow">
        <strong class="wit-block wit-offset-bottom--xs">Google</strong>
        <p v-if="profile.isGoogleConnected" class="wit-color--success">
          {{ $t('Settings_ProfileIsConnected') }}
        </p>
        <p v-else class="wit-color--warning">
          {{ $t('Settings_ProfileIsNotConnected') }}
        </p>
      </div>

      <b-button v-if="profile.isGoogleConnected" type="is-danger is-light" class="wit-font-weight--700" @click="disconnectSocial('google')">
        {{ $t('Settings_Disconnect') }}
      </b-button>

      <b-button v-else type="is-success is-light" class="wit-font-weight--700" @click="connectSocial('google')">
        {{ $t('Settings_Connect') }}
      </b-button>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import { User } from '@/store'
import { showPopup } from '@/utils'

export default {
    name: 'SocialNetworks',

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
        async connectSocial (socialName) {
            try {
                await this.$store.dispatch(User.F.Actions.AUTH_USING_SOCIALS, socialName)
                this.$showSuccess(this.$t('Settings_AccountConnected'))
            } catch (error) {
                this.$showError(error)
            }
        },

        disconnectSocial (socialName) {
            showPopup(this, {
                title: this.$t('Settings_DisconnectSocialTitle'),
                message: this.$t('Settings_WannaDisconnectSocial'),
                confirmText: this.$t('Confirm'),
                cancelText: this.$t('Cancel'),
                onConfirm: async () => {
                    try {
                        await this.$store.dispatch(User.F.Actions.DISCONNECT_SOCIAL, socialName)
                        this.$showSuccess(this.$t('Settings_AccountDisconnected'))
                    } catch (error) {
                        this.$showError(error)
                    }
                }
            })
        }
    }
}
</script>
