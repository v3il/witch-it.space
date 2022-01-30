<template>
  <div class="zpc-editable-input">
    <label class="zpc-input__label">{{ label }}</label>
    <b-input v-model="tempValue" class="a wit-color--white1" custom-class="wit-color--white" />

    <!--    <input-->
    <!--      :id="labelId"-->
    <!--      v-model="tempValue"-->
    <!--      type="number"-->
    <!--      class="zpc-input__input"-->
    <!--      @change="onChange"-->
    <!--      @keydown.enter.prevent="onChange"-->
    <!--      @keydown.exact.up.prevent="incrementValue(step)"-->
    <!--      @keydown.exact.down.prevent="decrementValue(step)"-->
    <!--      @keydown.shift.up.prevent="incrementValue($options.SHIFT_STEP)"-->
    <!--      @keydown.shift.down.prevent="decrementValue($options.SHIFT_STEP)"-->
    <!--      @keydown.ctrl.up.prevent="incrementValue($options.CTRL_STEP)"-->
    <!--      @keydown.ctrl.down.prevent="decrementValue($options.CTRL_STEP)"-->
    <!--    >-->
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
        },

        label: {
            type: String,
            required: false,
            default: ''
        }
    },

    data: () => ({
        tempValue: 1
    }),

    computed: {
        maxNumberLength () {
            if (this.max) {
                return this.max.toString().length
            }
            return null
        },

        labelId () {
            return `input__label__${this.label}__${Math.random().toString().slice(2, 6)}`
        }
    },

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
            const numericValue = Number.parseFloat(this.tempValue)
            const validatedNumber = this.validateNumber(numericValue)
            this.tempValue = this.roundNumber(validatedNumber)
            this.emitEvent(this.tempValue)
        },

        incrementValue (step) {
            const newValue = this.tempValue + step
            const validatedNumber = this.validateNumber(newValue)
            this.tempValue = this.roundNumber(validatedNumber)
            this.emitEvent(this.tempValue)
        },

        decrementValue (step) {
            const newValue = this.tempValue - step
            const validatedNumber = this.validateNumber(newValue)
            this.tempValue = this.roundNumber(validatedNumber)
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
        },

        roundNumber (number) {
            if (!Number.isInteger(this.maxNumberLength)) {
                return number
            }
            return Number.parseFloat(number.toFixed(this.maxNumberLength + 1).substr(0, this.maxNumberLength))
        }
    }
}
</script>

<style lang="scss">
.zpc-editable-input {
    position: relative;
}

.a {
    height: 36px;
    width: 36px;

    input {
        height: 100%;
        padding: var(--offset-xs) var(--offset-xs);
        text-align: center;
    }
}
</style>
