import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import "./UserCard.css";
import { useNavigate } from "react-router-dom";
import ChatWebSocket from "../ChatPrivate/ChatWebSocket/ChatWebSocket";
import ImageWithJWT from "../../utils/ImageWithJWT";
import getCompanies from "../../services/companyApi";

function UserCard({ user, onOpenChat, onCloseChat, chatPosition }) {
  // Variables
  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
  const [isChatWebSocketOpen, setIsChatWebSocketOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalMinimized, setIsModalMinimized] = useState(false);
  const userIdLoggedIn = localStorage.getItem("userId");
  const userCompany = companies
    ? companies.find((company) => company.Company_ID === user.Company_ID)
    : [];
  const handleCardClick = () => {
    navigate(`/profile/${user.User_ID}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate(`/profile/${user.User_ID}`);
    }
  };

  const handleChatClick = (e) => {
    e.stopPropagation();
    onOpenChat();
    setIsChatWebSocketOpen(true);
  };

  const imageUrl = [
    `${import.meta.env.VITE_BACKEND_URL}/upload/${user.ProfileImage}`,
    `${import.meta.env.VITE_BACKEND_URL}/upload/${userCompany.Logo}`,
  ];

  return (
    <>
      <div
        className="user-card"
        onClick={handleCardClick}
        onKeyPress={handleKeyPress}
        role="button"
        tabIndex={0}
      >
        <div className="user-info">
          <ImageWithJWT imageUrl={imageUrl[0]} alt={user.FirstName} />
          <h2>
            {user.FirstName} {user.LastName}
          </h2>
          <p>{user.Role}</p>
        </div>
        <div className="user-footer">
          <div className="company">
            <div className="company-logo">
              <ImageWithJWT imageUrl={imageUrl[1]} alt={userCompany.Name} />
            </div>
            <span>{userCompany.Name}</span>
          </div>
          {userIdLoggedIn && userIdLoggedIn !== String(user.User_ID) && (
            <button
              className="chat-button"
              type="button"
              onClick={handleChatClick}
            >
              <i className="fa-regular fa-comments" /> Chat
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
    </>
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
    Role: PropTypes.string,
    Company_ID: PropTypes.number,
  }).isRequired,
  onOpenChat: PropTypes.func.isRequired,
  onCloseChat: PropTypes.func.isRequired,
  chatPosition: PropTypes.number.isRequired,
  // token: PropTypes.string.isRequired,
};

export default UserCard;
