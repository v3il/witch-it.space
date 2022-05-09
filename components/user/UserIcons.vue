<template>
  <div class="wis-user-icons wit-flex1 wit-flex--column1 wit-block--full-width">
    <!--    <b-tooltip-->
    <!--          v-for="icon in visibleIcons"-->
    <!--          :key="icon.id"-->
    <!--      :label="$t(icon.tooltipText)"-->
    <!--      class="wis-user-icon"-->
    <!--      :class="[`wis-user-icon&#45;&#45;${iconSize}`, icon.iconColorClass]"-->
    <!--      square-->
    <!--    >-->
    <div
      v-for="icon in icons"
      :key="icon.id"
      class="wit-flex wit-flex--align-center wit-block--full-height1 wis-user-icon wit-offset-bottom--xs"
      :class="[]"
    >
      <i class="mdi mdi-20px" :class="[icon.iconClass, icon.iconColorClass]" />
      <span class="wit-offset-left--xs wit-line-height--sm">{{ $t(icon.label) }}</span>
    </div>
    <!--    </b-tooltip>-->
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
        }

        // showMainOnly: {
        //     required: false,
        //     type: Boolean,
        //     default: false
        // }
    },

    computed: {
        iconSizeClass () {
            return `mdi-${this.iconSize}px1`
        }

        // visibleIcons () {
        //     return this.icons.filter(icon => icon.isVisible)
        // }
    },

    created () {
        this.icons = [
            // this.getSteamGuardIcon(),
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
                iconClass: 'mdi-shield-check' || this.getIconClass(isGuarded),
                iconColorClass: this.getIconColorClass(isGuarded),
                label: 'UserView_SteamGuardEnabled'
            }
        },

        getIsStrictRarityIcon () {
            const switchRarities = this.profile.settings.switchRarities

            return {
                id: 2,
                iconClass: /* 'mdi-swap-vertical-circle' || */ this.getIconClass(switchRarities),
                iconColorClass: this.getIconColorClass(switchRarities),
                label: switchRarities ? 'UserView_MaterialsReplacementEnabled' : 'UserView_MaterialsReplacementDisabled'
            }
        },

        getWorkingWithSteamGuardedIcon () {
            const tradeWithGuardedOnly = this.profile.settings.tradeWithGuardedOnly

            return {
                id: 3,
                iconClass: /* 'mdi-shield-off' || */ this.getIconClass(tradeWithGuardedOnly),
                iconColorClass: this.getIconColorClass(tradeWithGuardedOnly),
                label: 'UserView_TradingAnyUser'
            }
        },

        getBargainIcon () {
            const discountAvailable = this.profile.settings.discountAvailable

            return {
                id: 4,
                iconClass: 'mdi-database-arrow-down' || this.getIconClass(discountAvailable),
                iconColorClass: this.getIconColorClass(discountAvailable),
                label: 'UserView_BargainAvailable'
            }
        },

        getIsTradingDupsIcon () {
            const tradeDuplicatesOnly = this.profile.settings.tradeDuplicatesOnly

            return {
                id: 5,
                iconClass: 'mdi-alert-box' || this.getIconClass(tradeDuplicatesOnly),
                iconColorClass: this.getIconColorClass(tradeDuplicatesOnly),
                label: 'UserView_TradingAnyItem'
            }
        },

        getIconClass (isEnabled) {
            return isEnabled ? 'mdi-check' : 'mdi-close'
        },

        getIconColorClass (isEnabled) {
            return isEnabled ? 'wis-user-icon--success' : 'wis-user-icon--error'
        }
    }
}
</script>

<style scoped lang="scss">
$icon-size: 12px;

.wis-user-icon {
    .mdi {
        position: relative;
        //border: 2px solid var(--color);
        //border-radius: 50%;
        color: var(--color);
        flex-shrink: 0;
        //box-sizing: content-box;
        //padding: 8px;
    }

    //&.wis-user-icon--18 {
    //    width: 36px;
    //    height: 36px;
    //}

    .wis-user-icon--success {
        --color: var(--green-400);
    }

    .wis-user-icon--error {
        --color: var(--danger);

        & + span {
            color: var(--danger);
        }
    }

    .wis-user-icon--warning {
        --color: var(--warning);
    }

    //.wis-user-icon--warning,
    //.wis-user-icon--error {
    //    &::after {
    //        background: var(--color);
    //        content: "!";
    //        display: flex;
    //        position: absolute;
    //        width: $icon-size;
    //        height: $icon-size;
    //        top: -4px;
    //        right: -2px;
    //        border-radius: 50%;
    //        align-items: center;
    //        justify-content: center;
    //        font-size: $icon-size;
    //        line-height: $icon-size;
    //        color: #2a3042;
    //        font-weight: bold;
    //    }
    //}

    //&:not(:last-child) {
    //    margin-right: var(--offset-sm);
    //}
}
</style>
