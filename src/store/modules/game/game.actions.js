import GameDataService from "../../../services/GameDataService";

function uniqueID(){
  function chr4(){
    return Math.random().toString(16).slice(-4);
  }
  return chr4() + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() + chr4() + chr4();
}

export const actions = {
  updateInfoText({commit}, payload) {
    console.log("updateInfoText action");
    commit('updateInfoText', payload);
  },
  START_GAME({commit}, payload) {
    const gameData = payload;
    const gameId = uniqueID()
    const playerId = uniqueID()
    gameData['gameId'] = gameId;
    gameData['playerId'] = playerId;

    return new Promise((resolve, reject) => {
      GameDataService.createNewGame(gameData)
        .then((response) => {
          commit('START_GAME', response.data);
          resolve(response.data.gameid);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
export default actions;
