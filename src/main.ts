import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { initialize } from './firebase';

Vue.config.productionTip = false;

initialize();

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
