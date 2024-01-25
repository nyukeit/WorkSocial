import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { useAuth } from "../../utils/useConnecte";
import "./BarNav.css";

function BarNav() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const firstName = isLoggedIn ? localStorage.getItem("firstName") : "Visiteur";
  // Déclaration de handleCloseModal avant son utilisation
  const handleCloseModal = () => {
    setShowLogoutModal(false);
    setShowConfirmationModal(false);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await fetch("http://localhost:5000/logout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      logout();
      navigate("/HomeScreen");
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
    } finally {
      handleCloseModal();
    }
  };

  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleOpenConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Exécuter l'action liée au clic lorsque la touche "Enter" est enfoncée
      handleOpenLogoutModal();
    }
  };

  return (
    <nav className="BarNav">
      <div className="Logo">
        <img src={Logo} alt="logo" className="navbar_logo" />
      </div>
      <ul className="NavLinks">
        <li>
          <Link to="/HomeScreen">Accueil</Link>
        </li>
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/ConnexionScreen">Connexion</Link>
            </li>
            <li>
              <Link to="/InscriptionScreen">Inscription</Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/MembersScreen">Membres</Link>
            </li>
            <li>
              <Link to="/SendageScreen">Sendage</Link>
            </li>
            <li className="welcome-message">
              <button
                type="button"
                onClick={handleOpenLogoutModal}
                onKeyDown={handleKeyDown}
              >
                Bonjour {firstName}
                {isLoggedIn && <span className="logout-arrow">▼</span>}
              </button>
            </li>
          </>
        )}
      </ul>
      {showLogoutModal && (
        <div className="modal">
          <div className="modal-content">
            {firstName} {/* Ceci affiche le firstName */}
            <button type="button" onClick={handleCloseLogoutModal}>
              <Link to="/MyProfil">Modifier votre profil</Link>
            </button>
            <button type="button" onClick={handleOpenConfirmationModal}>
              Déconnexion
            </button>
          </div>
        </div>
      )}
      {showConfirmationModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <button type="button" onClick={handleLogout}>
              Oui
            </button>
            <button type="button" onClick={handleCloseConfirmationModal}>
              Annuler
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default BarNav;
