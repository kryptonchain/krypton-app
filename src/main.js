import Vue from "vue";
import App from "./App.vue";

import "@ionic/core/css/ionic.bundle.css";
import Ionic, { IonicVueRouter } from "@modus/ionic-vue";

Vue.config.productionTip = false;

Vue.use(Ionic);
Vue.use(IonicVueRouter);

const router = new IonicVueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("./components/Home.vue")
    },
    {
      path: "/wallet",
      name: "Wallet",
      component: () => import("./components/Wallet.vue")
    }
  ]
});

new Vue({ router, render: h => h(App) }).$mount("#app");
