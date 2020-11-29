import state from "@/store/modules/game/game.state";
import { actions } from "@/store/modules/game/game.actions";
import { getters } from "@/store/modules/game/game.getters";
import { mutations } from "@/store/modules/game/game.mutations";

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
