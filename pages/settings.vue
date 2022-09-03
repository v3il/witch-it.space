<template>
  <div>
    <div class="wit-settings">
      <OnPageSettingsTabs :tabs="tabs" :current-tab="currentTab" class="wit-settings__onpage-tabs" @switch="onTabSwitch" />

      <SidebarPanel :is-visible="isTabsOpen" from="left" @close="isTabsOpen = false">
        <SettingsTabs :tabs="tabs" :current-tab="currentTab" :is-open="isTabsOpen" @switch="onTabSwitch" />
      </SidebarPanel>

      <div class="wit-flex__item--grow bbbbb">
        <div class="aaa">
          <div class="wit-flex wit-flex--justify-end">
            <button class="wit-inline-block wit-offset-left--auto" @click="isTabsOpen = !isTabsOpen">
              Open
            </button>
          </div>

          <NotVerifiedProfileMessage v-if="!isVerified" :profile="user" class="wit-offset-bottom--lg" />

          <component :is="componentName" />

          <!--          <AccountSettings :profile="user" :settings="settings" class="wit-offset-bottom&#45;&#45;sm" @change="onSettingsChange" />-->
          <!--          <SocialNetworks :profile="user" class="wit-offset-bottom&#45;&#45;sm" />-->
          <!--          <MarketSettings :settings="settings" class="wit-offset-bottom&#45;&#45;sm" @change="onSettingsChange" />-->
          <!--          <NotesEditor :settings="settings" class="wit-offset-bottom&#45;&#45;xlg" @input="onSettingsChange" />-->
          <!--          <DangerZone :profile="user" />-->

          <!--          <StickyPanel class="wit-offset-bottom&#45;&#45;sm" @update="triggerSettingsUpdate" />-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { computed, ref } from '@nuxtjs/composition-api'
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
import { SettingsTabs, OnPageSettingsTabs } from '@/components/settings/index.js'
import { tabs } from '@/components/settings/tabs/tabs.js'
import SecuritySettings from '@/components/settings/SecuritySettings.vue'
import { SidebarPanel } from '@/components/basic/index.js'

export default {
    components: {
        TopTabs,
        DangerZone,
        NotVerifiedProfileMessage,
        StickyPanel,
        TopNavBar,
        NoteEditor,
        AccountSettings,
        SecuritySettings,
        SocialNetworks,
        MarketSettings,
        NotesEditor,
        SettingsTabs,
        SidebarPanel,
        OnPageSettingsTabs
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

    setup () {
        const isTabsOpen = ref(false)
        const currentTab = ref(tabs[0])
        const componentName = computed(() => currentTab.value.component)

        const onTabSwitch = (tab) => {
            currentTab.value = tab
        }

        return { isTabsOpen, tabs, currentTab, componentName, onTabSwitch }
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
    position: relative;
    //height: 100vh;
    //max-width: 850px;
    //margin: 0 auto;
}

.bbbbb {
    padding: 48px;
    margin-left: 384px;
    height: calc(100vh - var(--header-height));
    overflow-y: auto;
}

.aaa {
    max-width: 768px;
}

@media (max-width: 1200px) {
    .bbbbb {
        margin-left: 0;
        padding: 32px 24px;
    }

    .wit-settings__onpage-tabs {
        display: none;
    }
}
</style>

<style lang="scss">
.wis-settings__section-title {
    line-height: 1;
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 32px;
}

.wis-settings__section-subtitle {
    font-weight: 400;
    font-size: 1.125rem;
    margin-bottom: 32px;
}

.wis-settings__separator {
    margin: 40px 0;
}
</style>
