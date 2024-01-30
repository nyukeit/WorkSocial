import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Platform } from "react-native";
import UserCard from "../../../components/UserCard/UserCard";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hostname } from '../../../components/HostnameConnect/Hostname';

const styles = Platform.OS === 'web'
  ? require('./styles.web').default
  : require('./styles.mobile').default;
function MembersScreen() {
  const [users, setUsers] = useState([]);
  const [openChats, setOpenChats] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.info(token);
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
  const isWeb = Platform.OS === 'web';

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
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
  <View style={styles.container}>
    <Text style={styles.title}>Liste des Membres</Text>
    <ScrollView>
      <View style={styles.cardsContainer}>
        {users.map((user) => {
          const chatInfo = isWeb ? openChats.find(
            (chat) => chat.userId === user.User_ID
          ) : null;
          const chatPosition = chatInfo ? chatInfo.position : 0;

          return (
            <UserCard
              key={user.User_ID}
              user={user}
              onOpenChat={() => handleOpenChat(user.User_ID)}
              onCloseChat={() => handleCloseChat(user.User_ID)}
              chatPosition={chatPosition}
              showChatButton={isWeb} // Ajout de cette prop
            />
          );
        })}
      </View>
    </ScrollView>
  </View>
);
}

export default MembersScreen;