import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { useAuth } from "../../utils/useConnecte";
import "./BarNav.css";
import ImageWithJWT from "../../utils/ImageWithJWT";
import { hostname } from "../../HostnameConnect/Hostname";
import DropdownMenu from "./DropdownMenu";

function BarNav() {
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
  };

  return (
    <nav className="BarNav">
      <div className="Logo">
        <img src={Logo} alt="logo" className="navbar_logo" />
      </div>
      {isLoggedIn ? (
        <ul className="NavLinks">
          <li>
            <Link to="/feed">
              <i className="fas fa-home" /> Feed
            </Link>
          </li>
          <li>
            <Link to="/members">
              <i className="fas fa-users" /> Membres
            </Link>
          </li>
          <li>
            <Link to="/surveys">
              <i className="fas fa-poll" /> Surveys
            </Link>
          </li>
          <li>
            <Link to="/posts">
              <i className="fas fa-edit" /> Posts
            </Link>
          </li>
          <li>
            <Link to="/events">
              <i className="fas fa-calendar-alt" /> Events
            </Link>
          </li>
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
        </ul>
      ) : (
        <ul className="NavLinks">
          <li>
            <Link to="/connexion">Connexion</Link>
          </li>
          <li>
            <Link to="/inscription">Inscription</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default BarNav;
