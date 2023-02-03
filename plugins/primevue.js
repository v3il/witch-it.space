import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Slider from 'primevue/slider'
import SelectButton from 'primevue/selectbutton'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true })
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component('Slider', Slider)
    nuxtApp.vueApp.component('SelectButton', SelectButton)
})
