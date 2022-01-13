import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";

Vue.config.productionTip = false;

//Hao-Wen's section
// const config = {
//   apiKey: 'your_api_key',
//   clientId: 'your_client_id.apps',
//   scope: '',
//   discoveryDocs: []
// }
// Vue.use(VueGoogleApi,config);
//End of Hao-Wen's section

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
