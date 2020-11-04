import { http } from "../helpers/http-common";

class GameDataService {

    createNewGame(data) {
        return http.post("/games/createNewGame", data);
    }

}

export default new GameDataService();
