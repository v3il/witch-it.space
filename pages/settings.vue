<template>
  <div>
    <div class="wit-settings">
      <SettingsTabs />

      <div class="wit-flex__item--grow bbbbb">
        <div class="aaa">
          <NotVerifiedProfileMessage v-if="!isVerified" :profile="user" class="wit-offset-bottom--sm" />
          <AccountSettings :profile="user" :settings="settings" class="wit-offset-bottom--sm" @change="onSettingsChange" />
          <!--          <SocialNetworks :profile="user" class="wit-offset-bottom&#45;&#45;sm" />-->
          <!--          <MarketSettings :settings="settings" class="wit-offset-bottom&#45;&#45;sm" @change="onSettingsChange" />-->
          <!--          <NotesEditor :settings="settings" class="wit-offset-bottom&#45;&#45;xlg" @input="onSettingsChange" />-->
          <!--          <DangerZone :profile="user" />-->

          <StickyPanel class="wit-offset-bottom--sm" @update="triggerSettingsUpdate" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { StoreModules } from '@/store'
import { validateDisplayName, validatePassword, validateSteamTradeURL } from '@/shared/validators'
import TopTabs from '@/components/header/TopTabs.vue'
import DangerZone from '@/components/settings/DangerZone'
import NotVerifiedProfileMessage from '@/components/settings/NotVerifiedProfileMessage'
import StickyPanel from '@/components/settings/StickyPanel'
import TopNavBar from '@/components/header/TopNavBar.vue'
import AccountSettings from '@/components/settings/AccountSettings.vue'
import SocialNetworks from '@/components/settings/SocialNetworks.vue'
import MarketSettings from '@/components/settings/MarketSettings.vue'
import NoteEditor from '@/components/settings/NoteEditor.vue'
import NotesEditor from '@/components/settings/NotesEditor.vue'
import { SettingsTabs } from '@/components/settings/index.js'

export default {
    components: {
        TopTabs,
        DangerZone,
        NotVerifiedProfileMessage,
        StickyPanel,
        TopNavBar,
        NoteEditor,
        AccountSettings,
        SocialNetworks,
        MarketSettings,
        NotesEditor,
        SettingsTabs
    },

    middleware: ['isAuthorized'],

    data: () => ({
        settings: {
            login: '',
            password: '',
            displayName: '',
            steamTradeLink: '',
            isGuardProtected: true,
            avatarId: 1,

            isStrictRarity: false,
            onlyGuarded: false,
            isBargainAvailable: false,
            isTradingOnlyDups: false,
            marketNote: '',
            wishlistNote: ''
        }
    }),

    computed: {
        ...mapState(StoreModules.USER, [
            'user'
        ]),

        ...mapGetters(StoreModules.USER, [
            'isVerified'
        ])
    },

    created () {
        this.settings.login = this.user.login ?? ''
        this.settings.displayName = this.user.displayName ?? ''
        this.settings.steamTradeLink = this.user.steamTradeLink ?? ''
        this.settings.isGuardProtected = this.user.isGuardProtected
        this.settings.avatarId = this.user.avatarId

        this.settings.switchRarities = this.user.switchRarities
        this.settings.tradeWithGuardedOnly = this.user.tradeWithGuardedOnly
        this.settings.discountAvailable = this.user.discountAvailable
        this.settings.tradeDuplicatesOnly = this.user.tradeDuplicatesOnly
        this.settings.marketNote = this.user.marketNote ?? ''
        this.settings.wishlistNote = this.user.wishlistNote ?? ''
    },

    methods: {
        ...mapActions(StoreModules.USER, {
            updateSettings: 'updateSettings'
        }),

        onSettingsChange (settings) {
            this.settings = settings
        },

        onMarketSettingsChange (marketSettings) {
            this.marketSettings = marketSettings
        },

        triggerSettingsUpdate () {
            const errors = []

            if (this.settings.password) {
                errors.push(validatePassword(this.settings.password))
            }

            errors.push(
                validateDisplayName(this.settings.displayName),
                validateSteamTradeURL(this.settings.steamTradeLink)
            )

            const firstError = errors.find(error => error !== null)

            if (firstError) {
                return this.$showError(this.$t(firstError))
            }

            const settings = {
                displayName: this.settings.displayName,
                steamTradeLink: this.settings.steamTradeLink,
                isGuardProtected: this.settings.isGuardProtected,
                avatarId: this.settings.avatarId,
                switchRarities: this.settings.switchRarities,
                tradeWithGuardedOnly: this.settings.tradeWithGuardedOnly,
                discountAvailable: this.settings.discountAvailable,
                tradeDuplicatesOnly: this.settings.tradeDuplicatesOnly,
                marketNote: this.settings.marketNote,
                wishlistNote: this.settings.wishlistNote
            }

            if (this.settings.password) {
                settings.password = this.settings.password
            }

            this.updateSettings(settings)
                .then(() => {
                    this.$showSuccess(this.$t('Settings_SettingsUpdated'))
                    this.settings.password = ''
                })
                .catch(this.$showError)
        }
    }
}
</script>

<style scoped lang="scss">
.wit-settings {
    display: flex;
    //padding: var(--offset-sm);
    max-height: 100vh;
    //height: 100vh;
    //max-width: 850px;
    //margin: 0 auto;
}

.bbbbb {
    padding: 48px;
    margin-left: 384px;
    height: calc(100vh - var(--header-height));
    overflow-y: auto;

    @media (max-width: 1200px) {
        margin-left: 0;
    }
}

.aaa {
    max-width: 768px;
}
</style>
