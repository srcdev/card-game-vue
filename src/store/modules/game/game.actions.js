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
    const gameId = '212121-21-21-2-121-4343-2';
    commit('START_GAME', payload);
    return new Promise(resolve => {
      //setTimeout(() => {
        resolve(gameId);
      //}, 0);
    });
  }
};
export default actions;

