import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import InscriptionStep1 from './InscriptionStep1';
import InscriptionStep2 from './InscriptionStep2';
import InscriptionStep3 from './InscriptionStep3';
import InscriptionStep4 from './InscriptionStep4';
import InscriptionStep5 from './InscriptionStep5';
import {hostname} from '../../../components/HostnameConnect/Hostname';



const InscriptionScreen = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigation = useNavigation();

  const onNextStep = newData => {
    setFormData({...formData, ...newData});
    setStep(step + 1);
  };

  const onPreviousStep = () => {
    if (step > 1 && step < 5) {
      setStep(step - 1);
    }
  };
const onFinalSubmit = async finalData => {
  const completeData = {...formData, ...finalData}; // Combinez les données existantes avec les dernières données reçues
  const formDataToSend = new FormData(); // Préparer un objet FormData pour l'envoi

  // Itérer sur chaque clé de completeData pour construire formDataToSend
  Object.keys(completeData).forEach(key => {
    if (key === 'image') {
      // Spécial traitement pour les images
      const localUri = completeData[key];
      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image';
      formDataToSend.append('ProfileImage', {
        uri: localUri,
        name: filename,
        type,
      });
    } else {
      // Ajouter d'autres données comme champs texte
      formDataToSend.append(key, completeData[key]);
    }
  });

  try {
    // Envoyer la demande POST à votre API pour créer un utilisateur
    const response = await fetch(`${hostname}/users`, {
      method: 'POST',
      body: formDataToSend,
    });

    if (response.ok) {
      // Si la réponse est réussie
      let userId;
      let email = completeData.Email; // Prendre l'email depuis les données complètes

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const responseBody = await response.json(); // Traiter la réponse JSON
        userId = responseBody.userId; // Supposons que votre API renvoie userId dans le corps de la réponse
      } else {
        const locationHeader = response.headers.get('location');
        userId = locationHeader ? locationHeader.split('/users/')[1] : null; // Extraire userId de l'en-tête Location
      }

      // Si userId est défini, procéder avec la demande de vérification
      if (userId) {
        const verificationResponse = await fetch(
          `${hostname}/request-verification`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userId, email}),
          },
        );

        if (verificationResponse.ok) {
          console.log('Demande de code de vérification envoyée avec succès.');
          // Mettre à jour formData avec userId et email pour les utiliser dans la dernière étape
          setFormData(prevFormData => ({...prevFormData, userId, email}));
          setStep(5); // Passer à l'étape 5
        } else {
          const verificationErrorText = await verificationResponse.text();
          console.error(
            `Erreur lors de l'envoi du code de vérification : ${verificationErrorText}`,
          );
        }
      } else {
        console.error('UserId non trouvé dans la réponse.');
      }
    } else {
      const errorText = await response.text();
      console.error(`Erreur lors de l'inscription : ${errorText}`);
    }
  } catch (error) {
    console.error('Erreur lors de la requête:', error);
  }
};




  return (
    <View style={styles.container}>
      {step === 1 && (
        <InscriptionStep1 onNextStep={onNextStep} formData={formData} />
      )}
      {step === 2 && (
        <InscriptionStep2
          onNextStep={onNextStep}
          onPreviousStep={onPreviousStep}
          formData={formData}
        />
      )}
      {step === 3 && (
        <InscriptionStep3
          onNextStep={onNextStep}
          onPreviousStep={onPreviousStep}
          formData={formData}
        />
      )}
      {step === 4 && (
        <InscriptionStep4
          onFinalSubmit={onFinalSubmit}
          onPreviousStep={onPreviousStep}
          formData={formData}
        />
      )}
      {step === 5 && (
        <InscriptionStep5
          formData={formData}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default InscriptionScreen;