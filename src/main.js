import Vue from 'vue'
import Vuex from "vuex";
import VueRouter from 'vue-router';
import App from './App.vue'
import store from "./store/index";
import VueSocketIO from 'vue-socket.io';
import "./styles/main.scss";

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

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [],
});

Vue.use(new VueSocketIO({
    debug: true,
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
