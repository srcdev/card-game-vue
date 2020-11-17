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
  START_GAME({commit}, payload) {
    const gameId = uniqueID();
    playerObj.playerId = uniqueID();
    playerObj.playerName = payload.playerName;
    playerObj.gameId = gameId;
    playerObj.gameName = payload.gameName;
    playerObj.gameRating = payload.gameRating;
    this._vm.$socket.emit("JOIN_GAME", gameId);

    commit('SET_GAME_STATE', playerObj.gameId);
    commit('SET_PLAYER_ID', playerObj.playerId);

    return new Promise((resolve, reject) => {
      GameDataService.createNewGame(playerObj)
        .then((response) => {
          commit('SET_PLAYER_DATA', response.data);
          resolve(response.data.gameId);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  JOIN_GAME({commit, state}, payload) {
    const gameId = state.gameId;
    this._vm.$socket.emit("JOIN_GAME", gameId);
    playerObj.playerId = uniqueID();
    playerObj.playerName = payload.playerName;
    playerObj.gameId = gameId;

    commit('SET_PLAYER_ID', playerObj.playerId);

    return new Promise((resolve, reject) => {
      GameDataService.joinCurrentGame(playerObj)
        .then(() => {
          this._vm.$socket.emit("BROADCAST_UPDATE_GAME_DATA", gameId);
          resolve;
        })
        .catch((err) => {
          reject(err);
        });
    });

  },
  GET_LATEST_GAME_DATA({commit, state}) {
    const playerData = {
      gameId: state.gameId,
      playerId: state.playerId
    };
    if (playerData.playerId !== null) {
      return new Promise((resolve, reject) => {
        GameDataService.getLatestGameData(playerData)
          .then((response) => {
            commit('UPDATE_GAME_DATA', response.data);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  },
  SET_DEALER({commit, state}, playerId) {
    const gameId = state.gameId;
    const playerData = state.playersObj[playerId];

    return new Promise((resolve, reject) => {
      GameDataService.setDealer(playerData)
        .then((response) => {
          if (response.data.statusCode === 200) {
            commit('SET_DEALER');
            this._vm.$socket.emit("BROADCAST_UPDATE_GAME_DATA", gameId);
            resolve(response);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  SKIP_QUESTION({commit, state}) {
    const gameId = {
      gameId: state.gameId
    };
    return new Promise((resolve, reject) => {
      GameDataService.skipQuestion(gameId)
        .then((response) => {
          if (response.data.statusCode === 200) {
            commit('UPDATE_CURRENT_QUESTION', response.data);
            resolve();
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  SUBMIT_ROUND({state}) {
    console.log(`SUBMIT_ROUND`);
    console.log(state.currentCard);
  }
};
export default actions;
