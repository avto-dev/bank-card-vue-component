import Vue from "vue";
import VueBankCard from "../src/index";
import App from "./App";

Vue.component("VueBankCard", VueBankCard);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
