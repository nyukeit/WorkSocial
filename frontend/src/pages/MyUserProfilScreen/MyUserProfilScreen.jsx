import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UserBar from "../../components/UserBar/UserBar";
import "./MyUserProfilScreen.css";
import ImageWithJWT from "../../utils/ImageWithJWT";

function MyUserProfilScreen() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const userIdLoggedIn = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.VITE_BACKEND_URL}/users/${userIdLoggedIn}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              "Content-Type": "application/json",
            },
          }
        );

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
  const showModifyProfileButton = userIdLoggedIn === userId;

  const imageUrl = `${import.meta.VITE_BACKEND_URL}/upload/${
    user.ProfileImage
  }`;
  return (
    <div className="container">
      <UserBar />
      <div className="innerContainer">
        {/* <h2 className="page-title">User Profile</h2> */}
        <div className="profilePage-leftSection">
          <div className="profilePage-image">
            <ImageWithJWT imageUrl={imageUrl} alt={user.FirstName} />
          </div>
          <div className="profilePage-userInfo">
            <h4>
              {user.FirstName} {user.LastName}
            </h4>
            <p>{user.Email}</p>
            <p>{user.Biography}</p>
            {showModifyProfileButton && (
              <Link to="/editprofil" className="linkButton">
                <Button type="button">Modifier</Button>
              </Link>
            )}
          </div>
        </div>
        <div className="profilePage-rightSection">
          <Tabs defaultActiveKey="posts" className="mb-3">
            <Tab eventKey="posts" title="Posts">
              {/* Afficher les posts de l'utilisateur ici */}
            </Tab>
            <Tab eventKey="events" title="Events">
              {/* Afficher les événements de l'utilisateur ici */}
            </Tab>
            <Tab eventKey="surveys" title="Surveys">
              {/* Afficher les sondages de l'utilisateur ici */}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default MyUserProfilScreen;
