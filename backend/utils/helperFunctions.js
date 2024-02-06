// backend/src/utils/helperFunctions.js

/**
 * Génère un code de vérification aléatoire composé de lettres et de chiffres.
 * @param {number} length - La longueur du code de vérification.
 * @returns {string} - Le code de vérification généré.
 */
function generateVerificationCode(length = 8) {
  // Définissez les caractères possibles pour le code. Inclut les lettres majuscules et minuscules et les chiffres.
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  // Générez un code de la longueur spécifiée.
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

module.exports = { generateVerificationCode };
