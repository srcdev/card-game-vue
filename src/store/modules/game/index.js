import state from "./game.state";
import { actions } from "./game.actions";
import { getters } from "./game.getters";
import { mutations } from "./game.mutations";

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
//import axios from "axios";
console.log(`Game store mounted`);

// const state = () => ({
//     infoText: "This is info text from gameStore",
//     isReady: false,
//     userData: null
// });

// const getters = {
//     getInfoText: state => {
//         return state.infoText;
//     }
// };

// const actions = {};

// const mutations = {};

// export default {
//     namespaced: true,
//     state,
//     getters,
//     actions,
//     mutations
// };
