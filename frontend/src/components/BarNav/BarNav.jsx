import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { useAuth } from "../../utils/useConnecte";
import "./BarNav.css";
import ImageWithJWT from "../../utils/ImageWithJWT";
import { hostname } from "../../HostnameConnect/Hostname";
import DropdownMenu from "./DropdownMenu";

function BarNav() {
  // const [showLogoutModal, setShowLogoutModal] = useState(false);
  // const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { isLoggedIn, logout } = useAuth();
  const user = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  const firstName = user ? user.FirstName : "Visiteur";
  const imageName =
    user && user.ProfileImage
      ? user.ProfileImage.split("\\").pop()
      : "default-profile-image.png";
  const imageUrl = user
    ? `${hostname}/upload/${imageName}`
    : "default-profile-image-url";

  // const handleCloseModal = () => {
  //   setShowLogoutModal(false);
  //   setShowConfirmationModal(false);
  // };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/logout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      logout();
      navigate("/feed");
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
    }
    //  finally {
    //   handleCloseModal();
    // }
  };

  // const handleOpenLogoutModal = () => {
  //   setShowLogoutModal(true);
  // };

  // const handleCloseLogoutModal = () => {
  //   setShowLogoutModal(false);
  // };

  // const handleOpenConfirmationModal = () => {
  //   setShowConfirmationModal(true);
  // };

  // const handleCloseConfirmationModal = () => {
  //   setShowConfirmationModal(false);
  // };
  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     handleOpenLogoutModal();
  //   }
  // };

  return (
    <nav className="BarNav">
      <div className="Logo">
        <img src={Logo} alt="logo" className="navbar_logo" />
      </div>
      <ul className="NavLinks">
        <li className="profileItem">
          <div className="profile-image">
            <ImageWithJWT imageUrl={imageUrl} token={token} alt="Profile" />
          </div>
          <div className="salutation">
            {isLoggedIn && (
              <DropdownMenu userName={firstName} onLogout={handleLogout} />
            )}
          </div>
        </li>
        <li>
          <Link to="/feed">Accueil</Link>
        </li>
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/connexion">Connexion</Link>
            </li>
            <li>
              <Link to="/inscription">Inscription</Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/members">Membres</Link>
            </li>

            <li>
              <Link to="/posts">Posts</Link>
            </li>
            {/* <li className="welcome-message">
              <button
                type="button"
                onClick={handleOpenLogoutModal}
                onKeyDown={handleKeyDown}
              >
                Bonjour {firstName}
                {isLoggedIn && <span className="logout-arrow">▼</span>}
              </button>
            </li> */}
          </>
        )}
      </ul>
      {/* {showLogoutModal && (
        <div className="modal">
          <div className="modal-content">
            {firstName} 
            <button type="button" onClick={handleCloseLogoutModal}>
              <Link to="/myprofil">Modifier votre profil</Link>
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
      )} */}
    </nav>
  );
}

export default BarNav;
