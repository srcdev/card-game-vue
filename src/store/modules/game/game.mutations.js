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
  SET_PLAYER_ID: ( state, payload) => {
    state.playerId = payload;
  },
  SET_GAME_STATE: (state, gameId) => {
    console.log(`MUTATION: SET_GAME_STATE --> ${gameId}`);
    state.gameId = gameId;
    state.gameState = 1;
    state.gameCreated = true;
  },
  SET_PLAYER_DATA: (state, payload) => {
    state.gameData = payload;
    state.gameId = payload.gameid;
    state.gameName = payload.gamename;
    state.gameState = 1;
    state.gameCreated = true;
    state.gameCreatedById = payload.gamecreatedbyid;
    state.gameCreatedByName = payload.gamecreatedbyname;
    state.playerData = payload.players[state.playerId];
    state.playerState = 1;
    state.playerHand = payload.players[state.playerId].hand;
  },
  // START_GAME(state, payload) {
  // }
};
export default mutations;
