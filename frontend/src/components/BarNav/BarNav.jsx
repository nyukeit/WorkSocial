import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { useAuth } from "../../utils/useConnecte";
import "./BarNav.css";
import ImageWithJWT from "../../utils/ImageWithJWT";
import { hostname } from "../../HostnameConnect/Hostname";
import DropdownMenu from "./DropdownMenu";

function BarNav() {
  const [showModal, setShowModal] = useState(false);
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
    } finally {
      handleCloseModal();
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const renderModal = showModal && (
    <div className="modal">
      <div className="modal-content">
        <p>Voulez-vous vraiment vous déconnecter ?</p>
        <button type="button" onClick={handleLogout}>
          Oui
        </button>
        <button type="button" onClick={handleCloseModal}>
          Non
        </button>
      </div>
    </div>
  );

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
              <Link to="/surveys">Sendage</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <button type="button" onClick={handleOpenModal}>
                Deconnexion
              </button>
            </li>
          </>
        )}
      </ul>
      {renderModal}
    </nav>
  );
}

export default BarNav;
