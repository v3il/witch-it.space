<template>
  <label class="switcher wit-flex wit-flex--justify-between" :class="labelClass">
    <input type="checkbox" class="wit-none switcher__input" :value="isFirstValueSelected" @change="onChange">
    <span class="switcher__ball wit-block" />
    <span v-if="iconLeft" class="mdi wit-offset-right--xxs switcher__icon" :class="iconLeft" />
    <span v-if="iconRight" class="mdi wit-offset-left--xxs switcher__icon" :class="iconRight" />
  </label>
</template>

<script>
export default {
    name: 'Switcher',

    props: {
        values: {
            required: true,
            type: Array
        },

        value: {
            required: true,
            type: String
        },

        type: {
            type: String,
            required: false,
            default: 'primary'
        },

        iconLeft: {
            type: String,
            required: false,
            default: null
        },

        iconRight: {
            type: String,
            required: false,
            default: null
        }
    },

    computed: {
        isFirstValueSelected () {
            return this.value === this.values[0]
        },

        labelClass () {
            return [{
                'switcher--left': this.isFirstValueSelected,
                'switcher--right': !this.isFirstValueSelected
            }, `switcher--${this.type}`]
        }
    },

    methods: {
        onChange () {
            this.$emit('change', this.isFirstValueSelected ? this.values[1] : this.values[0])
        }
    }
}
</script>

<style scoped lang="scss">
    .switcher {
        width: 56px;
        height: 24px;
        border-radius: 2rem;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        position: relative;
        margin-bottom: 0;
        padding: 4px;

        &--primary {
            background-color: var(--primary);
        }
    }

    .switcher__ball {
        position: absolute;
        background-color: var(--switcher-ball-bg);
        height: 20px;
        width: 20px;
        border-radius: 50%;
        transition: left var(--default-transition), background-color var(--default-transition);
    }

    .switcher--left .switcher__ball {
        left: 2px;
    }

    .switcher--right .switcher__ball {
        left: 34px;
    }

    .switcher__icon {
        width: 50%;
        line-height: 24px;
        display: block;
        height: 24px;
        text-align: center;
        font-size: 16px;
        color: var(--warning);
    }
</style>
