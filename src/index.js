import VueBankCard from "./components/VueBankCard";

export function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component(VueBankCard.name, VueBankCard);
}

const plugin = { install };

// Install by default if included from script tag
let GlobalVue = null;

if (typeof window !== "undefined") {
    GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

export default VueBankCard;
