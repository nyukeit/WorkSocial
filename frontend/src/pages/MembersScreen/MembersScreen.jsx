import React, { useState } from "react";
import "./MembersScreen.css";
import UserCard from "../../components/UserCard/UserCard";
import { useUser } from "../../contexts/UserContext";

function MembersScreen() {
  const [openChats, setOpenChats] = useState([]);

  const { users } = useUser();
  const token = localStorage.getItem("userToken");
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${hostname}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erreur de réseau");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  const handleOpenChat = (userId) => {
    setOpenChats((oldChats) => [
      ...oldChats,
      { userId, position: oldChats.length * 300 },
    ]);
  };

  const handleCloseChat = (userId) => {
    setOpenChats((oldChats) =>
      oldChats.filter((chat) => chat.userId !== userId)
    );
  };

  return (
    <div>
      <h1>Liste des Membres</h1>
      <div className="users-list">
        {users.map((user) => {
          const chatInfo = openChats.find(
            (chat) => chat.userId === user.User_ID
          );
          const chatPosition = chatInfo ? chatInfo.position : 0; // Fournir une valeur par défaut si non trouvé

          return (
            <UserCard
              key={user.User_ID}
              user={user}
              onOpenChat={() => handleOpenChat(user.User_ID)}
              onCloseChat={() => handleCloseChat(user.User_ID)}
              chatPosition={chatPosition}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MembersScreen;
