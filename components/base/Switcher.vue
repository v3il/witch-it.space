<template>
  <label class="switcher" :class="labelClass">
    <input type="checkbox" class="wit-none switcher__input" :value="isFirstValueSelected" @change="onChange">
    <div class="switcher__ball" />
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
        left: 3px;
    }

    .switcher--right .switcher__ball {
        left: 33px;
    }
</style>
