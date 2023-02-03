import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Slider from 'primevue/slider'
import SelectButton from 'primevue/selectbutton'
import { defineNuxtPlugin } from '#app'
import { Test } from '~/service/Test'

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            testService: new Test()
        }
    }
})
