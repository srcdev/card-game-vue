import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist';
import game from "./modules/game/index";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.sessionStorage,
})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  modules: {
    game
  },
});
