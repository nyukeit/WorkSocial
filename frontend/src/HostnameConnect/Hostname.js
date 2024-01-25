// frontend/src/config/config.js
const LOCALHOST_IP = "http://localhost";

const settings = {
  devRunMode: 100,
  withConsole: true,
};
const hostname = `${LOCALHOST_IP}:5000`;

// function localImageServerUrl() {
//   // URL pour votre serveur d'images local
//   return `${LOCALHOST_IP}:5000/assets/upload/`;
// }

// Utilisez export direct au lieu de module.exports
export { settings, hostname };
