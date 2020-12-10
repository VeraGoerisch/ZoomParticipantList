import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VeeValidate from 'vee-validate';
import VueConfetti from 'vue-confetti';

Vue.use(ElementUI);
Vue.use(VeeValidate);
Vue.use(VueConfetti);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
