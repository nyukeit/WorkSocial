// Hostname.js
const LOCALHOST_IP = "http://192.168.1.62";

let settings = {
  devRunMode: 100,
  withConsole: true,
};
let hostname = `${LOCALHOST_IP}:5000`;

// function localImageServerUrl() {
//   // URL pour votre serveur d'images local
//   return `${LOCALHOST_IP}:5000/assets/upload/`;
// }

// Utilisez export direct au lieu de module.exports
export { settings, hostname };
