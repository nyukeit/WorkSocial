import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {hostname} from './HostnameConnect/Hostname';

const VerifyEmail = ({email, onVerification}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (email && email.includes('@')) {
      // Validation basique de l'email
      verifyEmail(email);
    }
  }, [email]);

  const verifyEmail = async email => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const url = `${hostname}/verify-email?email=${encodeURIComponent(email)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.isAvailable) {
        onVerification(true, '');
      } else {
        onVerification(false, 'Cet email est déjà utilisé.');
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email", error);
      onVerification(
        false,
        'Erreur lors de la vérification. Veuillez réessayer.',
      );
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

export default VerifyEmail;
