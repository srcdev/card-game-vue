import Vue from "vue";
import Vuex from "vuex";
import gameStore from "./modules/game/index";

Vue.use(Vuex);
console.log(`Primary store mounted`);
export default new Vuex.Store({
    modules: {
        gameStore
    },
});
