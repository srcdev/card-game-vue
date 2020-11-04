export const mutations = {
  updateInfoText: (state, payload) => {
    console.log("updateInfoText mutations");
    state.infoText = payload;
  },
  setAppReady: (state) => {
    setTimeout(() => {
      state.appReady = true;
    }, 500);
  },
  SET_GAME_STATE: (state, payload) => {
    state.gameId = payload;
    state.gameState = 1;
    state.gameCreated = true;
  },
  START_GAME(state, payload) {
    state.gameId = payload.gameid;
    state.gameState = 1;
    state.gameCreated = true;
  }
};
export default mutations;
