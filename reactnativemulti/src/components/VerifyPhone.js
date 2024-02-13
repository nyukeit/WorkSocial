import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {hostname} from './HostnameConnect/Hostname';

const VerifyPhone = ({phone, onVerification}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (phone && phone.length >= 10) {
      // Assurez-vous que le numéro de téléphone a un format valide
      verifyPhone(phone);
    }
  }, [phone]);

 const verifyPhone = async phone => {
   setIsLoading(true);
   setErrorMessage('');
   try {
     const url = `${hostname}/verify-phone?phone=${encodeURIComponent(phone)}`;
     const response = await fetch(url);
     if (
       response.ok &&
       response.headers.get('Content-Type').includes('application/json')
     ) {
       const data = await response.json();
       if (data.isAvailable) {
         onVerification(true, '');
       } else {
         onVerification(false, 'Ce numéro de téléphone est déjà utilisé.');
       }
     } else {
       // Gérer les cas où la réponse n'est pas JSON ou n'est pas un succès
       throw new Error('Réponse non-JSON ou erreur du serveur');
     }
   } catch (error) {
     console.error(
       'Erreur lors de la vérification du numéro de téléphone',
       error,
     );
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

export default VerifyPhone;
