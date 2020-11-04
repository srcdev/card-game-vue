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
    console.log(`Mutation --> START_GAME()`);
    console.log(payload);
    state.gameId = '212121-21-21-2-121-4343-2';
    state.gameState = 1;
    state.playerIsDealer = true;
  }
};
export default mutations;
