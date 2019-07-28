import Vue from "vue";
import AppComponent from "./components/AppComponent.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(AppComponent)
}).$mount("#app");
