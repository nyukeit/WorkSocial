import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./MyProfil.css";
import { hostname } from "../../HostnameConnect/Hostname";

function MyProfil() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  // const ChatWebSocketRef = useRef();
  const userIdLoggedIn = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${hostname}/users/${userIdLoggedIn}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorBody = await response.text();
          console.error(
            "Erreur lors de la récupération des données de l'utilisateur",
            errorBody
          );
          return;
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur:",
          error
        );
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Chargement...</div>;
  }
  return (
    <div className="my-profile-container">
      <h1>Profil de l'utilisateur</h1>
      <table>
        <tbody>
          <tr>
            <td>Nom :</td>
            <td>{user.FirstName}</td>
          </tr>
          <tr>
            <td>Prénom :</td>
            <td>{user.LastName}</td>
          </tr>
          <tr>
            <td>Age :</td>
            <td>{user.Age}</td>
          </tr>
          <tr>
            <td>Genre :</td>
            <td>{user.Gender}</td>
          </tr>
          <tr>
            <td>Email :</td>
            <td>{user.Email}</td>
          </tr>
          <tr>
            <td>Adresse :</td>
            <td>{user.Address}</td>
          </tr>
          <tr>
            <td>Date de naissance :</td>
            <td>{user.BirthDate}</td>
          </tr>
          <tr>
            <td>Biographie :</td>
            <td>{user.Biography}</td>
          </tr>
        </tbody>
      </table>
      <button type="button">
        <Link to="/EditProfil">Modifier votre profil</Link>
      </button>
    </div>
  );
}

export default MyProfil;
