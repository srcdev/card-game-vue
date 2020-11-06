import { http } from "../helpers/http-common";

class GameDataService {

    createNewGame(data) {
        return http.post("/games/createNewGame", data);
    }

    joinCurrentGame(data) {
        return http.post("/games/joinCurrentGame", data);
    }

    getLatestGameData(data) {
        return http.post("/games/getLatestGameData", data);
    }

}

export default new GameDataService();
