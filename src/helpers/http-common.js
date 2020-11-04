import axios from "axios";
import { IPADDRESS, HTTP_PORT} from "../config.js";

const defaultOptions = {
    baseURL: `http://${IPADDRESS}${HTTP_PORT}/api`,
    headers: {
        "Content-type": "application/json"
    }
};

function generateHttpOpenClient(){

    let instance = axios.create(defaultOptions);
    return instance;

}

const http = generateHttpOpenClient();

export { http };
