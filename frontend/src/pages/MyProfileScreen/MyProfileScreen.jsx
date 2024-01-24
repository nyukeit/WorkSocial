// MyProfileScreen.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatWebSocket from "../../components/ChatPrivate/ChatWebSocket/ChatWebSocket";
import { hostname } from "../../HostnameConnect/Hostname";
import "./MyProfileScreen.css";
import ImageWithJWT from "../../utils/ImageWithJWT";

function MyProfileScreen() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  // const ChatWebSocketRef = useRef();
  const userIdLoggedIn = localStorage.getItem("userId");
  // recuperer le userToken du local storage
  const token = localStorage.getItem("userToken");
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const chatManagerRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${hostname}/users/${userId}`, {
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
  const handleEditProfile = () => {
    navigate("/EditProfileScreen"); // Redirige vers la page de modification du profil
  };

  const showChatButton = userIdLoggedIn !== userId;
  const handleOpenChat = () => {
    setIsChatModalOpen(true);
  };
  const handleCloseChat = () => {
    setIsChatModalOpen(false);
  };

  if (!user) {
    return <div>Chargement...</div>;
  }
  const imageName = user.ProfileImage.split("\\").pop();
  const imageUrl = `${hostname}/upload/${imageName}`;
  return (
    <div className="my-profile-container">
      <h1>Profil de l'utilisateur</h1>
      <ImageWithJWT imageUrl={imageUrl} token={token} alt={user.FirstName} />
      <p>
        Nom : {user.FirstName} {user.LastName}
      </p>
      <p>Age : {user.Age}</p>
      <p>Genre : {user.Gender}</p>
      <p>Email : {user.Email}</p>
      <p>Adresse : {user.Address}</p>
      <p>Date de naissance : {user.BirthDate}</p>
      <p>Biographie : {user.Biography}</p>
      <button
        type="button"
        onClick={handleEditProfile}
        className="edit-profile-button"
      >
        Modifier le Profil
      </button>
      {showChatButton && (
        <button type="button" onClick={handleOpenChat}>
          Chat
        </button>
      )}

      {isChatModalOpen && (
        <div className="chat-modal-overlay">
          <ChatWebSocket ref={chatManagerRef} onClose={handleCloseChat} />
        </div>
      )}
    </div>
  );
}

export default MyProfileScreen;
