const isDev = process.env.NODE_ENV !== "production";

function ipAddress() {
    // return isDev ? "localhost" : "cards.uuwuu.co.uk"; // <-- When running from Raspberry Pi on home network
    return isDev ? "localhost" : "api.uuwuu.co.uk";
}

function httpPort() {
    // return isDev ? "localhost" : "cards.uuwuu.co.uk"; // <-- When running from Raspberry Pi on home network
    return isDev ? ":8080" : "";
}

const IPADDRESS = ipAddress();
const WEBSOCKETS_IP = "192.168.1.145";
const WEBSOCKETS_PORT = 3434;
const HTTP_PORT = httpPort();
const NUXT_PORT = 3000;

export { IPADDRESS, WEBSOCKETS_IP, WEBSOCKETS_PORT, HTTP_PORT, NUXT_PORT };
