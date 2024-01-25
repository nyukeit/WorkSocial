import React, { useState } from "react";
import PropTypes from "prop-types";
import "./UserCard.css";
import { useNavigate } from "react-router-dom";
import ChatWebSocket from "../ChatPrivate/ChatWebSocket/ChatWebSocket";
import { hostname } from "../../HostnameConnect/Hostname";
import ImageWithJWT from "../../utils/ImageWithJWT";

function UserCard({ user, onOpenChat, onCloseChat, chatPosition }) {
  const [isChatWebSocketOpen, setIsChatWebSocketOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalMinimized, setIsModalMinimized] = useState(false);
  const userIdLoggedIn = localStorage.getItem("userId");
  const handleCardClick = () => {
    navigate(`/profile/${user.User_ID}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate(`/profile/${user.User_ID}`);
    }
  };

  function translateGender(gender) {
    const genderTranslations = {
      male: "Homme",
      female: "Femme",
      other: "Autre",
    };

    return genderTranslations[gender.toLowerCase()] || gender;
  }

  const handleChatClick = (e) => {
    e.stopPropagation();
    onOpenChat();
    setIsChatWebSocketOpen(true);
  };
  // const imageName = user.ProfileImage.split("\\").pop();
  const imageUrl = `${hostname}/upload/${user.ProfileImage}`;
  return (
    <div>
      <div
        className="user-card"
        onClick={handleCardClick}
        onKeyPress={handleKeyPress}
        role="button"
        tabIndex={0}
      >
        <ImageWithJWT imageUrl={imageUrl} alt={user.FirstName} />
        <div className="user-info">
          <h2>
            {user.FirstName} {user.LastName}
          </h2>
          <p>Age: {user.Age}</p>
          <p>{translateGender(user.Gender)}</p>
          {userIdLoggedIn && userIdLoggedIn !== String(user.User_ID) && (
            <button type="button" onClick={handleChatClick}>
              Chat
            </button>
          )}
        </div>
      </div>
      {isChatWebSocketOpen && (
        <ChatWebSocket
          onClose={() => {
            onCloseChat();
            setIsChatWebSocketOpen(false);
          }}
          onMinimize={() => setIsModalMinimized(!isModalMinimized)}
          isMinimized={isModalMinimized}
          user={user}
          userId={user.User_ID}
          position={chatPosition}
        />
      )}
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    User_ID: PropTypes.number.isRequired,
    ProfileImage: PropTypes.string,
    FirstName: PropTypes.string,
    LastName: PropTypes.string,
    Age: PropTypes.number,
    Gender: PropTypes.string,
    Email: PropTypes.string,
    Address: PropTypes.string,
    BirthDate: PropTypes.string,
  }).isRequired,
  onOpenChat: PropTypes.func.isRequired,
  onCloseChat: PropTypes.func.isRequired,
  chatPosition: PropTypes.number.isRequired,
  // token: PropTypes.string.isRequired,
};

export default UserCard;
