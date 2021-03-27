import { http } from "../helpers/http-common";

class GameDataService {

    createNewGame(data) {
        return http.post("/games/createNewGame", data);
    }

    joinCurrentGame(data) {
        return http.post("/games/joinCurrentGame", data);
    }

    leaveCurrentGame(data) {
        return http.post("/games/leaveCurrentGame", data);
    }

    getLatestGameData(data) {
        return http.post("/games/getLatestGameData", data);
    }

    setDealer(data) {
      return http.post("/games/setDealer", data);
    }

    submitRound(data) {
      return http.post("/games/submitRound", data);
    }

    skipQuestion(data) {
      return http.post("/games/skipQuestion", data);
    }

    getCurrentQuestion(data) {
      return http.post("/games/getCurrentQuestion", data);
    }

    getRoundInPlay(data) {
      return http.post("/games/getRoundInPlay", data);
    }

    setWinner(data) {
      return http.post("/games/setWinner", data);
    }

    getWinner(data) {
      return http.post("/games/getWinner", data);
    }

    swapAnswer(data) {
      return http.post("/games/swapAnswer", data);
    }

}

export default new GameDataService();
