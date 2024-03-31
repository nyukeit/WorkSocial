/**
 * Description placeholder
 * @date 3/31/2024 - 11:26:10 AM
 *
 * @export
 * @returns {*}
 */

// Import Modules
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Import Assets
import Logo from "../../assets/images/logo.png";
import ImageWithJWT from "../../utils/ImageWithJWT";

// Import Contexts
import { useAuth } from "../../utils/useConnecte";

// Import Components
import DropdownMenu from "./DropdownMenu";
import "./BarNav.css";

export default function BarNav() {
  // Contexts
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  // Variables
  const user = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;
  const token = localStorage.getItem("userToken");
  const firstName = user ? user.FirstName : "Visiteur";
  const imageName =
    user && user.ProfileImage
      ? user.ProfileImage.split("\\").pop()
      : "default-profile-image.png";
  const imageUrl = user
    ? `${import.meta.env.VITE_BACKEND_URL}/upload/${imageName}`
    : "default-profile-image-url";

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      logout();
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
    }
  };

  const newDay = new Date();
  const options = {
    day: "numeric",
    weekday: "long",
  };
  const today = newDay.toLocaleDateString("fr-FR", options);

  return (
    <div>
      {isLoggedIn ? (
        <nav className="BarNav-loggedIn">
          <div className="logo">
            <img src={Logo} alt="logo" className="navbar_logo" />
          </div>
          <ul className="NavLinks-BarNav">
            <span className="today">{today}</span>
            <li className="profileItem">
              <div className="profile-image">
                <ImageWithJWT imageUrl={imageUrl} token={token} alt="Profile" />
              </div>
              <div className="salutation">
                <DropdownMenu userName={firstName} onLogout={handleLogout} />
              </div>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="BarNav-loggedOut">
          <div className="logo">
            <img src={Logo} alt="logo" className="navbar_logo" />
          </div>
          <ul className="NavLinks-BarNav landing-links">
            <li>
              <Link to="/connexion">
                <i className="fas fa-sign-in-alt" /> Connexion
              </Link>
            </li>
            <li>
              <Link to="/inscription" id="inscription-button">
                <i className="fas fa-user-plus" /> Inscription
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
