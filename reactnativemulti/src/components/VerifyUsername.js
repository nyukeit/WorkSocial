import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { hostname } from './HostnameConnect/Hostname';

const VerifyUsername = ({ username, onVerification }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (username && username.length > 0) { // Assurez-vous de ne pas vérifier les noms d'utilisateur vides
      verifyUsername(username);
    }
  }, [username]);

  const verifyUsername = async (username) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      // Assurez-vous que l'URL est correcte et correspond à votre configuration serveur
      const url = `${hostname}/verify-username?username=${encodeURIComponent(username)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.isAvailable) {
        onVerification(true, '');
      } else {
        onVerification(false, "Ce nom d'utilisateur est déjà pris.");
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du nom d'utilisateur", error);
      onVerification(false, 'Erreur lors de la vérification. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      {isLoading && <Text>Vérification...</Text>}
      {errorMessage && <Text>{errorMessage}</Text>}
    </View>
  );
};

export default VerifyUsername;
