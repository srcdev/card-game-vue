import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist';
import localForage from 'localforage';
import game from "./modules/game/index";

Vue.use(Vuex);

const vuexStorage = new VuexPersist({
  key: 'persistedGameData',
  storage: localForage,
//  storage: window.sessionStorage,
  asyncStorage: true,
  reducer: state => ({
    gameId: state.game.gameId,
  })    
})

export default new Vuex.Store({
  plugins: [vuexStorage.plugin],
  modules: {
    game
  },
});
