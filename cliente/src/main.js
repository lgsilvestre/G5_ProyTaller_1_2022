import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios";
import 'material-design-icons-iconfont/dist/material-design-icons.css'

//axios.defaults.withCredentials = true;

if(process.env.NODE_ENV == "development"){
axios.defaults.baseURL = "http://localhost:5001/adogtame-1fa85/us-central1/appNode/";
}else{
  axios.defaults.baseURL = "https://us-central1-adogtame-1fa85.cloudfunctions.net/appNode/";
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
