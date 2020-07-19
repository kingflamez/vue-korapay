import Vue from 'vue'
import App from './App.vue'
import Korapay from 'vue-korapay'
import VueCurrencyInput from 'vue-currency-input'

const pluginOptions = {
  /* see config reference */
  globalOptions: {currency: 'NGN', distractionFree: false}
}

Vue.config.productionTip = false
Vue.use(Korapay, {public_key: 'pk_********************'})
Vue.use(VueCurrencyInput, pluginOptions)

new Vue({
  render: h => h(App)
}).$mount('#app')
