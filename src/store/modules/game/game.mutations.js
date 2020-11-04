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
  SET_GAME_ID: (state, payload) => {
    state.gameId = payload;
    state.gameState = 1;
  },
  START_GAME(state, payload) {
    state.gameId = payload.gameid;
    state.gameState = payload.gameState;
  }
};
export default mutations;
