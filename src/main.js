import Vue from 'vue'
import Vuex from "vuex";
import VueRouter from 'vue-router';
import App from './App.vue'
import store from "./store/index";
import VueSocketIO from 'vue-socket.io';
import Icons from "@/plugins/Icons";
import ConfirmModal from "@/plugins/ConfirmModal";
import "./styles/main.scss";

Vue.component('icons', Icons)
Vue.component('confirm-modal', ConfirmModal)

Vue.config.productionTip = true

const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

Vue.use(Vuex);

const routes = [];
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes,
});

Vue.use(VueRouter);


Vue.use(new VueSocketIO({
  debug: process.env.VUE_APP_WEBSOCKETS_DEBUG,
  connection: `http://${process.env.VUE_APP_WEBSOCKETS_IP}:${process.env.VUE_APP_WEBSOCKETS_PORT}`,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
