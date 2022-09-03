<template>
  <div>
    <div class="wit-offset-bottom--md wit-flex wit-flex--align-center wiz-border--bottom wit-padding-bottom--md">
      <div class="wit-flex__item--grow">
        <span class="wit-block wit-offset-bottom--xsm wit-font-size--xsplus">Steam</span>

        <p v-if="isSteamConnected" class="wit-color--success">
          {{ $t('Settings_ProfileIsConnected') }}
        </p>

        <p v-else class="wit-color--warning">
          {{ $t('Settings_ProfileIsNotConnected') }}
        </p>
      </div>

      <b-button v-if="isSteamConnected" type="is-danger is-light" class="wit-font-weight--700" @click="onDisconnectSocial('steam')">
        {{ $t('Settings_Disconnect') }}
      </b-button>

      <b-button v-else type="is-success is-light" class="wit-font-weight--700" @click="connectSocial('steam')">
        {{ $t('Settings_Connect') }}
      </b-button>
    </div>

    <div class="wit-offset-bottom--md wit-flex wit-flex--align-center wiz-border--bottom wit-padding-bottom--md">
      <div class="wit-flex__item--grow">
        <span class="wit-block wit-offset-bottom--xsm wit-font-size--xsplus">Discord</span>

        <p v-if="isDiscordConnected" class="wit-color--success">
          {{ $t('Settings_ProfileIsConnected') }}
        </p>

        <p v-else class="wit-color--warning">
          {{ $t('Settings_ProfileIsNotConnected') }}
        </p>
      </div>

      <b-button v-if="isDiscordConnected" type="is-danger is-light" class="wit-font-weight--700" @click="onDisconnectSocial('discord')">
        {{ $t('Settings_Disconnect') }}
      </b-button>

      <b-button v-else type="is-success is-light" class="wit-font-weight--700" @click="connectSocial('discord')">
        {{ $t('Settings_Connect') }}
      </b-button>
    </div>

    <div class="wit-flex wit-flex--align-center">
      <div class="wit-flex__item--grow">
        <span class="wit-block wit-offset-bottom--xsm wit-font-size--xsplus">Google</span>

        <p v-if="isGoogleConnected" class="wit-color--success">
          {{ $t('Settings_ProfileIsConnected') }}
        </p>

        <p v-else class="wit-color--warning">
          {{ $t('Settings_ProfileIsNotConnected') }}
        </p>
      </div>

      <b-button v-if="isGoogleConnected" type="is-danger is-light" class="wit-font-weight--700" @click="onDisconnectSocial('google')">
        {{ $t('Settings_Disconnect') }}
      </b-button>

      <b-button v-else type="is-success is-light" class="wit-font-weight--700" @click="connectSocial('google')">
        {{ $t('Settings_Connect') }}
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Card from '@/components/basic/Card.vue'
import { StoreModules, User } from '@/store'
import { showPopup } from '@/utils'

export default {
    name: 'SocialNetworks',

    components: {
        Card
    },

    // props: {
    //     profile: {
    //         required: true,
    //         type: Object
    //     }
    // },

    computed: {
        ...mapGetters(StoreModules.USER, [
            'isSteamConnected',
            'isDiscordConnected',
            'isGoogleConnected'
        ])
    },

    methods: {
        ...mapActions(StoreModules.USER, {
            authUsingSocials: 'authUsingSocials',
            disconnectSocial: 'disconnectSocial'
        }),

        connectSocial (socialName) {
            this.authUsingSocials(socialName)
                .then(() => this.$showSuccess(this.$t('Settings_AccountConnected')))
                .catch(this.$showError)
        },

        async onDisconnectSocial (socialName) {
            const isConfirmed = await this.$showConfirm({
                content: this.$t('Settings_WannaDisconnectSocial'),
                popupTitle: this.$t('Settings_DisconnectSocialTitle')
            })

            if (!isConfirmed) {
                return
            }

            this.disconnectSocial(socialName)
                .then(() => this.$showSuccess(this.$t('Settings_AccountDisconnected')))
                .catch(this.$showError)
        }
    }
}
</script>
