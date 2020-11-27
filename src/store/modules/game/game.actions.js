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
    this._vm.$socket.emit("BROADCAST_SOCKET_JOIN_GAME", gameId);

    commit('SET_GAME_STATE', playerObj.gameId);
    commit('INIT_PLAYER', playerObj.playerId);
    this._vm.$socket.emit("BROADCAST_SOCKET_KEEP_ALIVE", playerObj.playerId);

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

    commit('INIT_PLAYER', playerObj.playerId);
    this._vm.$socket.emit("BROADCAST_SOCKET_KEEP_ALIVE", playerObj);

    return new Promise((resolve, reject) => {
      GameDataService.joinCurrentGame(playerObj)
        .then(() => {
          this._vm.$socket.emit("BROADCAST_SOCKET_UPDATE_GAME_DATA", gameId);
          resolve;
        })
        .catch((err) => {
          reject(err);
        });
    });

  },
  GET_LATEST_GAME_DATA({commit, state}) {
    const data = {
      gameId: state.gameId,
      playerId: state.playerId
    };
    this._vm.$socket.emit("BROADCAST_SOCKET_KEEP_ALIVE", data);
    if (data.playerId !== null) {
      return new Promise((resolve, reject) => {
        GameDataService.getLatestGameData(data)
          .then((response) => {
            commit('UPDATE_GAME_DATA', response.data);
            if (state.playerState > 1) {
              commit('UPDATE_CURRENT_QUESTION', response.data.currentQuestion);
            }
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
            this._vm.$socket.emit("BROADCAST_SOCKET_UPDATE_GAME_DATA", gameId);
            commit('SET_DEALER');
            resolve;
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  SKIP_QUESTION({state}) {
    const gameId = state.gameId;
    const data = {
      gameId: state.gameId
    };
    return new Promise((resolve, reject) => {
      GameDataService.skipQuestion(data)
        .then(() => {
          this._vm.$socket.emit("BROADCAST_SOCKET_GET_CURRENT_QUESTION", gameId);
          resolve();
        })
        .catch((err) => {
          reject(err);
        }),state;
    });
  },
  GET_CURRENT_QUESTION({commit, state}) {
    const data = {
      gameId: state.gameId
    };
    return new Promise((resolve, reject) => {
      GameDataService.getCurrentQuestion(data)
        .then((response) => {
          commit('UPDATE_CURRENT_QUESTION', response.data);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  SUBMIT_ROUND({commit, state}) {
    const gameId = state.gameId;
    const currentCard = {
      currentCard: state.currentCard
    };

    return new Promise((resolve, reject) => {
      GameDataService.submitRound(currentCard)
        .then((response) => {
          this._vm.$socket.emit("BROADCAST_SOCKET_GET_ROUND_IN_PLAY", gameId);
          commit('UPDATE_ROUND_IN_PLAY', response.data);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  SET_WINNER({state}, playerId) {
    const data = {
      playerId: playerId,
      gameId: state.gameId,
    };

    return new Promise((resolve, reject) => {
      GameDataService.setWinner(data)
        .then(() => {
          this._vm.$socket.emit("BROADCAST_SOCKET_UPDATE_GAME_DATA", state.gameId);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  GET_ROUND_IN_PLAY({commit, state}) {
    const gameId = {
      gameId: state.gameId
    };

    return new Promise((resolve, reject) => {
      GameDataService.getRoundInPlay(gameId)
        .then((response) => {
          commit('UPDATE_ROUND_IN_PLAY', response.data);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
export default actions;
