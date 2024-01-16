import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import "./BarNav.css";

function BarNav() {
  return (
    <nav className="BarNav">
      <div className="Logo">
        <img src={Logo} alt="logo" className="navbar_logo" />
      </div>

      <ul className="NavLinks">
        <li>
          <Link to="/HomeScreen">Accueil</Link>
        </li>
        {/* <li><Link to="/PostScreen">Posts</Link></li> */}
        <li>
          <Link to="/ConnexionScreen">Connexion</Link>
        </li>
        <li>
          <Link to="/InscriptionScreen">Inscription</Link>
        </li>
        {/* <li><Link to="/EventsScreen">Events</Link></li>
             <li><Link to="/Sendage">Sendage</Link></li> */}
      </ul>
    </nav>
  );
}

export default BarNav;
