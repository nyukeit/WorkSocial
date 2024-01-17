import React from "react";
import { useNavigate } from "react-router-dom";
import "./DeconnexionScreen.css";

function DeconnexionScreen() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Supprimez le token de session ou les données d'authentification
      localStorage.removeItem("userToken"); // ou sessionStorage, selon ce que vous utilisez
      localStorage.removeItem("userId");
      // Redirection vers la page de connexion ou d'accueil après déconnexion
      navigate("/ConnexionScreen");
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
    }
  };

  return (
    <div className="logout-container">
      <h1>Vous êtes maintenant déconnecté</h1>
      <button type="button" onClick={handleLogout}>
        Se reconnecter
      </button>
    </div>
  );
}

export default DeconnexionScreen;
