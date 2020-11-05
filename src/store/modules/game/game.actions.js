import GameDataService from "../../../services/GameDataService";
import uniqueID from "../../../helpers/uniqueID";

let playerObj = {
  playerId: null,
  playerName: null,
  hand: {},
  gameId: null,
  gameName: null,
  gameRating: null,
  playerIsDealer: false,
  roundPlayed: false,
  winCount: 0,
  userCreatedGame: false  
};

export const actions = {
  updateInfoText({commit}, payload) {
    console.log("updateInfoText action");
    commit('updateInfoText', payload);
  },
  START_GAME({commit}, payload) {

    playerObj.playerId = uniqueID();
    playerObj.playerName = payload.playerName;
    playerObj.gameId = uniqueID();
    playerObj.gameName = payload.gameName;
    playerObj.gameRating = payload.gameRating;

    commit('SET_PLAYER_ID', playerObj.playerId);

    return new Promise((resolve, reject) => {
      GameDataService.createNewGame(playerObj)
        .then((response) => {
          commit('SET_PLAYER_DATA', response.data);
          resolve(response.data.gameid);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  JOIN_GAME({commit, state}, payload) {
    playerObj.playerId = uniqueID();
    playerObj.playerName = payload.playerName;
    playerObj.gameId = state.gameId;

    commit('SET_PLAYER_ID', playerObj.playerId);

    return new Promise((resolve, reject) => {
      GameDataService.joinCurrentGame(playerObj)
        .then((response) => {
          commit('SET_PLAYER_DATA', response.data);
          resolve(response.data.gameid);
        })
        .catch((err) => {
          reject(err);
        });
    });

  }
};
export default actions;
