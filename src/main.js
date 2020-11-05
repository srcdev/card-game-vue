import Vue from 'vue'
import Vuex from "vuex";
import VueRouter from 'vue-router';
import App from './App.vue'
import store from "./store/index";
import VueSocketIO from 'vue-socket.io';
import { WEBSOCKETS_IP, WEBSOCKETS_PORT } from "./config.js";

Vue.config.productionTip = false
Vue.use(Vuex);

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: [],
});

Vue.use(new VueSocketIO({
    debug: true,
    connection: `http://${WEBSOCKETS_IP}:${WEBSOCKETS_PORT}`,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    //options: { path: "/my-app/" } //Optional options
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
