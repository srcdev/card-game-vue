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
  SET_PLAYER_DATA: (state, payload) => {
    state.playerData = payload;
    state.playerId = payload.playerid;
    state.playerState = 1;
    state.playerHand = payload.hand;
  },
  START_GAME(state, payload) {
    state.gameData = payload;
    state.gameId = payload.gameid;
    state.gameState = 1;
    state.gameCreated = true;
    state.gameCreatedById = payload.gamecreatedbyid;
    state.gameCreatedByName = payload.gamecreatedbyname;
  }
};
export default mutations;
