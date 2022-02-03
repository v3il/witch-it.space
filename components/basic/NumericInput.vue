<template>
  <div>
    <input
      v-model="tempValue"
      type="number"
      class="wit-number-input input"
      @change="onChange"
      @keydown.enter.prevent="onChange"
      @keydown.exact.up.prevent="incrementValue(step)"
      @keydown.exact.down.prevent="decrementValue(step)"
      @keydown.shift.up.prevent="incrementValue($options.SHIFT_STEP)"
      @keydown.shift.down.prevent="decrementValue($options.SHIFT_STEP)"
      @keydown.ctrl.up.prevent="incrementValue($options.CTRL_STEP)"
      @keydown.ctrl.down.prevent="decrementValue($options.CTRL_STEP)"
    >
  </div>
</template>

<script>
export default {
    name: 'NumericInput',

    SHIFT_STEP: 10,
    CTRL_STEP: 100,

    props: {
        value: {
            required: true,
            type: Number
        },

        min: {
            type: Number,
            required: false,
            default: null
        },

        max: {
            type: Number,
            required: false,
            default: null
        },

        step: {
            type: Number,
            required: false,
            default: 1
        }
    },

    data: () => ({
        tempValue: 1
    }),

    watch: {
        value: {
            immediate: true,
            handler (value) {
                this.tempValue = value
            }
        }
    },

    methods: {
        emitEvent (value) {
            this.$emit('change', value)
        },

        onChange () {
            if (this.tempValue === '') {
                this.tempValue = Number.isInteger(this.min) ? this.min : 1
            }

            const numericValue = Number.parseInt(this.tempValue)
            const validatedNumber = this.validateNumber(numericValue)

            this.emitEvent(validatedNumber)
        },

        incrementValue (step) {
            const newValue = this.tempValue + step
            this.tempValue = this.validateNumber(newValue)

            this.emitEvent(this.tempValue)
        },

        decrementValue (step) {
            const newValue = this.tempValue - step
            this.tempValue = this.validateNumber(newValue)

            this.emitEvent(this.tempValue)
        },

        validateNumber (number) {
            if (Number.isInteger(this.min) && number < this.min) {
                return this.min
            }

            if (Number.isInteger(this.max) && number > this.max) {
                return this.max
            }

            return number
        }
    }
}
</script>

<style lang="scss">
.wit-number-input {
    height: 36px;
    width: 40px;
    padding: var(--offset-xs) var(--offset-xs);
    text-align: center;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
}
</style>
