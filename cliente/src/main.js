import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios";

//axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5001/adogtame-1fa85/us-central1/appNode/";

Vue.config.productionTip = false

import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
Vue.component(VueCropper);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
