<template>
  <div class="wis-user-icons wit-flex wit-flex--center">
    <b-tooltip
      v-for="icon in visibleIcons"
      :key="icon.id"
      :label="$t(icon.tooltipText)"
      class="wis-user-icon"
      square
    >
      <div class="wit-flex wit-flex--center wit-block--full-height">
        <i class="mdi" :class="[iconSizeClass, icon.iconClass, icon.iconColorClass]" />
      </div>
    </b-tooltip>

    <!--      <b-tooltip :label="allowMaterialsReplacementTooltipText" class="wis-user-icon" square>-->
    <!--          <div class="wit-flex wit-flex&#45;&#45;center wit-block&#45;&#45;full-height">-->
    <!--              <i class="mdi mdi-swap-horizontal-circle-outline mdi-24px" :class="allowMaterialsReplacementClass" />-->
    <!--          </div>-->
    <!--      </b-tooltip>-->

    <!--      <b-tooltip :label="allowMaterialsReplacementTooltipText" class="wis-user-icon" square>-->
    <!--          <div class="wit-flex wit-flex&#45;&#45;center wit-block&#45;&#45;full-height">-->
    <!--              <i class="mdi mdi-shield-alert mdi-24px" :class="allowMaterialsReplacementClass" />-->
    <!--          </div>-->
    <!--      </b-tooltip>-->

    <!--      <b-tooltip :label="allowMaterialsReplacementTooltipText" class="wis-user-icon" square>-->
    <!--          <div class="wit-flex wit-flex&#45;&#45;center wit-block&#45;&#45;full-height">-->
    <!--              <i class="mdi mdi-database-arrow-down mdi-24px" :class="allowMaterialsReplacementClass" />-->
    <!--          </div>-->
    <!--      </b-tooltip>-->

    <!--      <b-tooltip :label="allowMaterialsReplacementTooltipText" class="wis-user-icon" square>-->
    <!--          <div class="wit-flex wit-flex&#45;&#45;center wit-block&#45;&#45;full-height">-->
    <!--              <i class="mdi mdi-content-duplicate mdi-24px" :class="allowMaterialsReplacementClass" />-->
    <!--          </div>-->
    <!--      </b-tooltip>11-->
  </div>
</template>

<script>
export default {
    name: 'UserIcons',

    props: {
        profile: {
            required: true,
            type: Object
        },

        iconSize: {
            required: false,
            type: Number,
            default: 24
        },

        showMainOnly: {
            required: false,
            type: Boolean,
            default: false
        }
    },

    computed: {
        steamGuardStatusIcon () {
            return this.profile.isGuardProtected ? 'mdi-shield-check' : 'mdi-shield-remove'
        },

        steamGuardStatusClass () {
            return this.profile.isGuardProtected ? 'wit-color--success' : 'wit-color--danger'
        },

        steamGuardStatusTooltipText () {
            const id = this.profile.isGuardProtected ? 'UserView_SteamGuardEnabled' : 'UserView_SteamGuardDisabled'
            return this.$t(id)
        },

        allowMaterialsReplacementClass () {
            return this.profile.isStrictRarity ? 'wit-color--success' : 'wit-color--danger'
        },

        allowMaterialsReplacementTooltipText () {
            const id = this.profile.isStrictRarity ? 'UserView_MaterialsReplacementEnabled' : 'UserView_MaterialsReplacementDisabled'
            return this.$t(id)
        },

        iconSizeClass () {
            return `mdi-${this.iconSize}px`
        },

        visibleIcons () {
            return this.icons.filter(icon => icon.isVisible)
        }
    },

    created () {
        this.icons = [
            this.getSteamGuardIcon(),
            this.getIsStrictRarityIcon(),
            this.getWorkingWithSteamGuardedIcon(),
            this.getBargainIcon(),
            this.getIsTradingDupsIcon()
        ]
    },

    methods: {
        getSteamGuardIcon () {
            const isGuarded = this.profile.isGuardProtected

            return {
                id: 1,
                iconClass: isGuarded ? 'mdi-shield-check' : 'mdi-shield-remove',
                iconColorClass: isGuarded ? 'wit-color--success' : 'wit-color--danger',
                tooltipText: isGuarded ? 'UserView_SteamGuardEnabled' : 'UserView_SteamGuardDisabled',
                isVisible: true
            }
        },

        getIsStrictRarityIcon () {
            const isStrictRarity = this.profile.isStrictRarity

            return {
                id: 2,
                iconClass: 'mdi-swap-horizontal-circle-outline',
                iconColorClass: isStrictRarity ? 'wit-color--success' : 'wit-color--danger',
                tooltipText: isStrictRarity ? 'UserView_MaterialsReplacementEnabled' : 'UserView_MaterialsReplacementDisabled',
                isVisible: !this.showMainOnly
            }
        },

        getWorkingWithSteamGuardedIcon () {
            const onlyGuarded = this.profile.onlyGuarded

            return {
                id: 3,
                iconClass: 'mdi-shield-alert',
                iconColorClass: onlyGuarded ? 'wit-color--success' : 'wit-color--danger',
                tooltipText: onlyGuarded ? 'UserView_TradingOnlyGuarded' : 'UserView_TradingAnyUser',
                isVisible: !this.showMainOnly
            }
        },

        getBargainIcon () {
            const isBargainAvailable = this.profile.isBargainAvailable

            return {
                id: 4,
                iconClass: 'mdi-database-arrow-down',
                iconColorClass: isBargainAvailable ? 'wit-color--success' : 'wit-color--danger',
                tooltipText: isBargainAvailable ? 'UserView_BargainAvailable' : 'UserView_BargainNotAvailable',
                isVisible: !this.showMainOnly
            }
        },

        getIsTradingDupsIcon () {
            const isTradingOnlyDups = this.profile.isTradingOnlyDups

            return {
                id: 5,
                iconClass: 'mdi-content-duplicate',
                iconColorClass: isTradingOnlyDups ? 'wit-color--success' : 'wit-color--danger',
                tooltipText: isTradingOnlyDups ? 'UserView_TradingOnlyDupes' : 'UserView_TradingAnyItem',
                isVisible: !this.showMainOnly
            }
        }
    }
}
</script>

<style scoped lang="scss">
.wis-user-icon {
    border: 1px solid var(--user-view-border);
    border-radius: 50%;
    width: 40px;
    height: 40px;

    &:not(:last-child) {
        margin-right: var(--offset-sm);
    }
}
</style>
