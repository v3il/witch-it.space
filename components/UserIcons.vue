<template>
  <div class="wis-user-icons wit-flex wit-flex--center">
    <b-tooltip
      v-for="icon in visibleIcons"
      :key="icon.id"
      :label="$t(icon.tooltipText)"
      class="wis-user-icon"
      :class="[`wis-user-icon--${iconSize}`, icon.iconColorClass]"
      square
    >
      <div class="wit-flex wit-flex--center wit-block--full-height">
        <i class="mdi" :class="[icon.iconClass, iconSizeClass]" />
      </div>
    </b-tooltip>
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
            default: 18
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
                iconClass: 'mdi-shield-check',
                iconColorClass: isGuarded ? 'wis-user-icon--success' : 'wis-user-icon--error',
                tooltipText: isGuarded ? 'UserView_SteamGuardEnabled' : 'UserView_SteamGuardDisabled',
                isVisible: true
            }
        },

        getIsStrictRarityIcon () {
            const switchRarities = this.profile.settings.switchRarities

            return {
                id: 2,
                iconClass: 'mdi-swap-vertical-circle',
                iconColorClass: switchRarities ? 'wis-user-icon--success' : 'wis-user-icon--warning',
                tooltipText: switchRarities ? 'UserView_MaterialsReplacementEnabled' : 'UserView_MaterialsReplacementDisabled',
                isVisible: !this.showMainOnly
            }
        },

        getWorkingWithSteamGuardedIcon () {
            const tradeWithGuardedOnly = this.profile.settings.tradeWithGuardedOnly

            return {
                id: 3,
                iconClass: 'mdi-shield-off',
                iconColorClass: tradeWithGuardedOnly ? 'wis-user-icon--warning' : 'wis-user-icon--success',
                tooltipText: tradeWithGuardedOnly ? 'UserView_TradingOnlyGuarded' : 'UserView_TradingAnyUser',
                isVisible: !this.showMainOnly
            }
        },

        getBargainIcon () {
            const discountAvailable = this.profile.settings.discountAvailable

            return {
                id: 4,
                iconClass: 'mdi-database-arrow-down',
                iconColorClass: discountAvailable ? 'wis-user-icon--success' : 'wis-user-icon--warning',
                tooltipText: discountAvailable ? 'UserView_BargainAvailable' : 'UserView_BargainNotAvailable',
                isVisible: !this.showMainOnly
            }
        },

        getIsTradingDupsIcon () {
            const tradeDuplicatesOnly = this.profile.settings.tradeDuplicatesOnly

            return {
                id: 5,
                iconClass: 'mdi-numeric-1-box-multiple',
                iconColorClass: tradeDuplicatesOnly ? 'wis-user-icon--warning' : 'wis-user-icon--success',
                tooltipText: tradeDuplicatesOnly ? 'UserView_TradingOnlyDupes' : 'UserView_TradingAnyItem',
                isVisible: !this.showMainOnly
            }
        }
    }
}
</script>

<style scoped lang="scss">
$icon-size: 12px;

.wis-user-icon {
    border: 2px solid var(--color);
    border-radius: 50%;

    .mdi {
        color: var(--color);
    }

    &.wis-user-icon--18 {
        width: 36px;
        height: 36px;
    }

    &.wis-user-icon--success {
        --color: var(--success);
    }

    &.wis-user-icon--error {
        --color: var(--danger);
    }

    &.wis-user-icon--warning {
        --color: var(--warning);
    }

    &.wis-user-icon--warning,
    &.wis-user-icon--error {
        &::after {
            background: var(--color);
            content: "!";
            display: flex;
            position: absolute;
            width: $icon-size;
            height: $icon-size;
            top: -4px;
            right: -2px;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            font-size: $icon-size;
            line-height: $icon-size;
            color: #2a3042;
            font-weight: bold;
        }
    }

    &:not(:last-child) {
        margin-right: var(--offset-sm);
    }
}
</style>
