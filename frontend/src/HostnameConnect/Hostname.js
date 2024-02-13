// frontend/src/config/config.js
// const LOCALHOST_IP = "https://worksocial.onrender.com";

const settings = {
  devRunMode: 100,
  withConsole: true,
};
const hostname = `https://worksocial.onrender.com`;

// function localImageServerUrl() {
//   // URL pour votre serveur d'images local
//   return `${LOCALHOST_IP}:5000/assets/upload/`;
// }

// Utilisez export direct au lieu de module.exports
export { settings, hostname };
