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
