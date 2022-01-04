import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
// import VueGoogleApi from "vue-google-api";

Vue.config.productionTip = false;

const config = {
  apiKey: 'your_api_key',
  clientId: 'your_client_id.apps',
  scope: '',
  discoveryDocs: []
}
// Vue.use(VueGoogleApi,config);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
