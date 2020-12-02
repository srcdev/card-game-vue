import axios from "axios";

const defaultOptions = {
  baseURL: `http://${process.env.VUE_APP_IPADDRESS}${process.env.VUE_APP_HTTP_PORT}/api`,
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
