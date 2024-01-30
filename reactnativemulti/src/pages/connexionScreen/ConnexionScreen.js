// ConnexionScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DisplayURL from '../../utils/DisplayURL';
import { hostname } from '../../components/HostnameConnect/Hostname';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../utils/useConnecte';


const styles = Platform.OS === 'web'
  ? require('./styles.web').default
  : require('./styles.mobile').default;

const ConnexionScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigation = useNavigation();
  const { login } = useAuth();
  const token = AsyncStorage.getItem("userToken");
  console.log("Token lors de la connexion:", token); // Ajoutez ceci pour le debug
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error('Erreur lors de la sauvegarde des données', e);
    }
  };

 const handleSubmit = async () => {
  try {
    const response = await fetch(`${hostname}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      const { authToken, user } = data; // Extraction de authToken et user
      login(authToken, user.User_ID.toString()); // Mise à jour de l'état global
      await storeData("userToken", authToken);
      await storeData("userId", user.User_ID.toString());
      await storeData("username", user.Username);
      await storeData("firstName", user.FirstName);
      await storeData("user", JSON.stringify(user));
      setIsSubmitted(true);
      // Navigation vers l'écran d'accueil
      navigation.navigate('HomeScreen');

    } else {
      setErrorMessages({
        name: "pass",
        message: data.message || "Erreur de connexion",
      });
    }
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
  }
};

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <Text style={styles.errorMessage}>{errorMessages.message}</Text>
    );

  return (
    <View style={styles.container}>
        <DisplayURL style={styles.urlText} />
      <Text style={styles.title}>Page de Connexion</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      {renderErrorMessage("pass")}
      <Button title="Connexion" onPress={handleSubmit} />
      <TouchableOpacity onPress={() => navigation.navigate('InscriptionScreen')}>
        <Text>Vous n'avez pas de compte ? Inscrivez-vous</Text>
      </TouchableOpacity>
      {isSubmitted && <Text>Connexion réussie !!</Text>}
    </View>
  );
};

export default ConnexionScreen;

