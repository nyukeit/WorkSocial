import React, { useState } from "react";
import axios from "axios";

console.info();

function ConnexionScreen() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { mail, pass } = event.target.elements;
    const emailValue = mail.value;
    const passwordValue = pass.value;

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          Email: emailValue,
          Password: passwordValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.info("Réponse du serveur:", response.data);

      // Attendre la résolution de la promesse avant de traiter la réponse
      if (response.status === 200) {
        if (response.data.emailNotFound) {
          // L'email n'a pas été trouvé dans la base de données
          setErrorMessages({ name: "mail", message: "Email non trouvé" });
        } else {
          // Mettre à jour l'état en cas de connexion réussie
          setIsSubmitted(true);
        }
      } else {
        console.error("Erreur lors de la requête. Statut:", response.status);
        setErrorMessages({ name: "pass", message: "Mot de Passe Invalide" });
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      if (error.response) {
        console.error("Réponse du serveur:", error.response.data);
        if (error.response.data.emailNotFound) {
          setErrorMessages({ name: "mail", message: "Email non trouvé" });
        } else {
          setErrorMessages({ name: "pass", message: "Mot de Passe Invalide" });
        }
      } else {
        setErrorMessages({ name: "pass", message: "Mot de Passe Invalide" });
      }
    }
  };

  // Générer le code pour le message d'erreur
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // Formulaire de connexion
  const renderForm = (
    <div className="form-connexion">
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="mail">eMail</label>
          <input type="email" id="mail" name="mail" required />
          {renderErrorMessage("mail")}
        </div>
        <div className="input">
          <label htmlFor="pass">Mot de passe</label>
          <input type="password" id="pass" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button">
          <input type="submit" value="Soumettre" />
        </div>
      </form>
    </div>
  );

  // Composant de formulaire de connexion
  return (
    <div className="container">
      <div className="login-form">
        <div className="title">Connexion</div>
        {isSubmitted ? <div>Connexion réussie !!</div> : renderForm}
      </div>
    </div>
  );
}

export default ConnexionScreen;
