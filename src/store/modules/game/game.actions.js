export const actions = {
  updateInfoText({commit}, payload) {
    console.log("updateInfoText action");
    commit('updateInfoText', payload);
  },
  START_GAME({commit}, payload) {
    console.log(`Action --> START_GAME()`);
    console.log(payload);
    /*
    * Do Axios call to API to get game data
    **/
    commit('START_GAME', payload);
  }
};
export default actions;

