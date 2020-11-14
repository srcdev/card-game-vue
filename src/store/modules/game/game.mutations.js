export const mutations = {
  setAppReady: (state) => {
    setTimeout(() => {
      state.appReady = true;
    }, 500);
  },
  SET_PLAYER_ID: ( state, payload) => {
    state.playerId = payload;
  },
  SET_GAME_STATE: (state, gameId) => {
    state.gameId = gameId;
    state.gameState = 1;
    state.gameCreated = true;
  },
  SET_PLAYER_DATA: (state, payload) => {
    state.gameName = payload.gameName;
    state.gameState = payload.gameState;
    state.gameCreatedById = payload.gameCreatedById;
    state.gameCreatedByName = payload.gameCreatedByName;
    state.playerData = payload.playerData;
    state.playersObj = payload.playersObj;
    state.playerState = 1;
    state.playerIsAdmin = (payload.gameCreatedById === state.playerId);
    state.playerCount = payload.playerCount;
  },
  UPDATE_GAME_DATA: (state, payload) => {
    const dealerId = payload.dealerId;
    const playerId = state.playerId;
    state.gameState = payload.gameState;
    state.gameName = payload.gameName;
    state.gameCreatedById = payload.gameCreatedById;
    state.gameCreatedByName = payload.gameCreatedByName;
    state.playerCount = payload.playerCount;
    state.currentQuestion = payload.currentQuestion;
    if (state.playerId !== null) {
      state.gameCreated = true;
      state.dealerData = payload.dealerData;
      state.playersObj = payload.playersObj;
      state.playerData = payload.playerData;
      state.playerHand = payload.playerData.hand;
      state.playerState = payload.gameState;
      state.playerIsDealer = (dealerId === playerId);
    }
  },
  // START_GAME(state, payload) {
  // }
};
export default mutations;
